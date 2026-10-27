import { useEffect } from "react";

const blockedClipboardEvents = [
  "copy",
  "cut",
  "paste",
  "contextmenu",
  "selectstart",
  "dragstart",
] as const;

export const useAssessmentProtection = () => {
  useEffect(() => {
    let screenshotWarningTimeout: number | undefined;

    const preventDefault = (event: Event) => {
      event.preventDefault();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const isScreenshotKey =
        event.code === "PrintScreen" ||
        ["printscreen", "prtscr", "snapshot"].includes(key);
      const hasModifier = event.ctrlKey || event.metaKey;
      const blockedModifierShortcut =
        hasModifier && ["a", "c", "p", "s", "u", "v", "x"].includes(key);
      const blockedDeveloperShortcut =
        event.ctrlKey &&
        event.shiftKey &&
        ["c", "i", "j"].includes(key);

      if (
        blockedModifierShortcut ||
        blockedDeveloperShortcut ||
        event.key === "F12" ||
        event.key === "F5" ||
        isScreenshotKey ||
        (event.ctrlKey && key === "r")
      ) {
        event.preventDefault();
      }

      if (isScreenshotKey) {
        document.documentElement.classList.add("assessment-screenshot-warning");
        window.clearTimeout(screenshotWarningTimeout);
        screenshotWarningTimeout = window.setTimeout(() => {
          document.documentElement.classList.remove(
            "assessment-screenshot-warning"
          );
        }, 2000);
      }
    };

    const printStyles = document.createElement("style");
    printStyles.textContent = `
      html.assessment-screenshot-warning::after {
        content: "Screenshot attempt detected";
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        display: grid;
        place-items: center;
        background: #fff;
        color: #111827;
        font: bold 20px sans-serif;
      }

      @media print {
        .assessment-protected > * {
          visibility: hidden !important;
        }

        .assessment-protected::after {
          content: "Assessment content is not available in print.";
          position: fixed;
          inset: 0;
          display: grid;
          place-items: center;
          color: #111827;
          font: bold 20px sans-serif;
          visibility: visible !important;
        }
      }
    `;
    document.head.appendChild(printStyles);

    blockedClipboardEvents.forEach((eventName) => {
      document.addEventListener(eventName, preventDefault, true);
    });
    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      blockedClipboardEvents.forEach((eventName) => {
        document.removeEventListener(eventName, preventDefault, true);
      });
      window.removeEventListener("keydown", handleKeyDown, true);
      window.clearTimeout(screenshotWarningTimeout);
      document.documentElement.classList.remove(
        "assessment-screenshot-warning"
      );
      printStyles.remove();
    };
  }, []);
};
