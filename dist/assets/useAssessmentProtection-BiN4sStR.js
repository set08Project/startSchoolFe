import{r as m}from"./index-ZBiEYUt_.js";const u="/assets/oops-transformed-removebg-preview-Bnig3h0J.png",c=["copy","cut","paste","contextmenu","selectstart","dragstart"],f=()=>{m.useEffect(()=>{let s;const o=e=>{e.preventDefault()},r=e=>{const t=e.key.toLowerCase(),i=e.code==="PrintScreen"||["printscreen","prtscr","snapshot"].includes(t),a=(e.ctrlKey||e.metaKey)&&["a","c","p","s","u","v","x"].includes(t),d=e.ctrlKey&&e.shiftKey&&["c","i","j"].includes(t);(a||d||e.key==="F12"||e.key==="F5"||i||e.ctrlKey&&t==="r")&&e.preventDefault(),i&&(document.documentElement.classList.add("assessment-screenshot-warning"),window.clearTimeout(s),s=window.setTimeout(()=>{document.documentElement.classList.remove("assessment-screenshot-warning")},2e3))},n=document.createElement("style");return n.textContent=`
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
    `,document.head.appendChild(n),c.forEach(e=>{document.addEventListener(e,o,!0)}),window.addEventListener("keydown",r,!0),()=>{c.forEach(e=>{document.removeEventListener(e,o,!0)}),window.removeEventListener("keydown",r,!0),window.clearTimeout(s),document.documentElement.classList.remove("assessment-screenshot-warning"),n.remove()}},[])};export{u as o,f as u};
