import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerSW } from "virtual:pwa-register";
import { processQueue, defaultProcessor } from '@/lib/offlineQueue';
import { mutate } from 'swr';

const updateSW = registerSW({
  onNeedRefresh() {
    // Only prompt the user once per actual new service worker script (avoid repeat prompts on reload/new tabs)
    try {
      const promptKey = 'ss-sw-prompted-for';
      if (typeof navigator !== 'undefined' && navigator.serviceWorker) {
        navigator.serviceWorker.getRegistration().then((reg) => {
          const waitingUrl = (reg && (reg as any).waiting && (reg as any).waiting.scriptURL) || 'unknown';
          try {
            const alreadyPromptedFor = typeof window !== 'undefined' ? localStorage.getItem(promptKey) : null;
            if (alreadyPromptedFor && alreadyPromptedFor === waitingUrl) {
              // we've already prompted for this exact SW, don't show again
              return;
            }
          } catch (e) {
            // ignore storage errors
          }

          const shouldReload = confirm("New Content Now Available, Please Reload!");
          // persist that we've prompted for this waiting SW so other reloads/tabs won't re-prompt
          try {
            if (typeof window !== 'undefined') localStorage.setItem(promptKey, waitingUrl);
          } catch (e) {}

          if (shouldReload) {
            updateSW(true);
          }
        }).catch((e) => {
          console.error('Failed to access SW registration for update prompting', e);
          // fallback: basic prompt once per session
          try {
            const sessionKey = 'ss-sw-prompted';
            if (typeof window !== 'undefined' && sessionStorage.getItem(sessionKey)) return;
            const ok = confirm("New Content Now Available, Please Reload!");
            if (typeof window !== 'undefined') sessionStorage.setItem(sessionKey, '1');
            if (ok) updateSW(true);
          } catch (err) {}
        });
      } else {
        // no service worker available, fallback to single-session prompt
        const sessionKey = 'ss-sw-prompted';
        if (typeof window !== 'undefined' && sessionStorage.getItem(sessionKey)) return;
        const ok = confirm("New Content Now Available, Please Reload!");
        if (typeof window !== 'undefined') sessionStorage.setItem(sessionKey, '1');
        if (ok) updateSW(true);
      }
    } catch (err) {
      // swallow storage/dialog errors
      console.error('SW update prompt error', err);
    }
  },
  onOfflineReady() {
    console.log("offline ready");
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <App />

  // </React.StrictMode>
);

// process any queued requests when we come back online
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    processQueue(defaultProcessor).catch((err) => console.error('Error processing queue on online event', err));
  });

  // try to process on startup if online
  if (navigator.onLine) {
    processQueue(defaultProcessor).catch((err) => console.error('Error processing queue on startup', err));
  }

  // Listen for messages from service worker to trigger processing
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    navigator.serviceWorker.addEventListener('message', (evt: any) => {
      const data = evt.data;
      if (data && data.type === 'process-queue') {
        processQueue(defaultProcessor).catch((err) => console.error('Error processing queue on SW message', err));
      }
    });
  }

  // BroadcastChannel for cross-tab notifications to revalidate keys
  try {
    const bc = new BroadcastChannel('ss-queue');
    bc.addEventListener('message', (ev) => {
      const d = ev.data;
      if (!d) return;
      if (d.type === 'processed') {
        if (d.key) mutate(d.key);
        else {
          mutate('api/view-classrooms/');
        }
        // show a small notification
        try { (window as any).toast?.success('Background sync: queued item processed'); } catch (e) {}
      }
      if (d.type === 'failed') {
        if (d.key) mutate(d.key);
        else mutate('api/view-classrooms/');
        try { (window as any).toast?.error('Background sync: queued item failed'); } catch (e) {}
      }
    });
  } catch (err) {
    // BroadcastChannel might not be supported
  }
}
