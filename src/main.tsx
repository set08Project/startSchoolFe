import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerSW } from "virtual:pwa-register";
import { processQueue, defaultProcessor } from '@/lib/offlineQueue';
import { mutate } from 'swr';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New Content Now Available, Please Reload!")) {
      updateSW(true);
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
