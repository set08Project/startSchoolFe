import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import LittleHeader from "@/components/static/LittleHeader";

const ClockingScreen = () => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      },
      /* verbose= */ false
    );

    const onScanSuccess = (decodedText: string) => {
      // decodedText is the URL or data
      console.log(`Code matched = ${decodedText}`);
      
      // If it's the backend URL, redirect to it
      // Standard QR format: https://.../api/qr-scan/:schoolID/:studentID start
      if (decodedText.includes("/api/qr-scan")) {
        // Stop the scanner and redirect
        scanner.clear().then(() => {
          window.location.href = decodedText;
        }).catch(err => {
          console.error("Failed to clear scanner before redirect", err);
          window.location.href = decodedText;
        });
      }
    };

    const onScanFailure = (error: any) => {
      // Quietly ignore scan failures to avoid spamming the console
    };

    scanner.render(onScanSuccess, onScanFailure);

    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner during cleanup", error));
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      <LittleHeader name="Attendance Scanner" />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10">
        <div className="max-w-[450px] w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 flex flex-col">
          
          {/* Header Info */}
          <div className="p-8 text-center bg-slate-50/50">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white mb-4 shadow-lg shadow-blue-200">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Scanner Active</h2>
            <p className="text-slate-500 font-medium text-sm mt-1 mx-auto max-w-[240px]">
              Align the student QR code within the scanning frame
            </p>
          </div>
          
          {/* Scanner Viewport */}
          <div className="px-8 pb-8">
             <div className="relative group">
                {/* Decorative corners */}
                <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-blue-600 rounded-tl-2xl z-10 pointer-events-none"></div>
                <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-blue-600 rounded-tr-2xl z-10 pointer-events-none"></div>
                <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-blue-600 rounded-bl-2xl z-10 pointer-events-none"></div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-blue-600 rounded-br-2xl z-10 pointer-events-none"></div>
                
                {/* The Scanner */}
                <div id="reader" className="overflow-hidden rounded-3xl border border-slate-100 bg-slate-900 shadow-inner"></div>
                
                {/* Scanning Beam (Visual effect) */}
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/30 blur-sm animate-[scan_2s_infinite] z-20 pointer-events-none"></div>
             </div>
          </div>
          
          {/* Footer Info */}
          <div className="p-6 mt-auto bg-slate-50/50 border-t border-slate-100 flex items-center justify-center gap-3">
             <div className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </div>
             <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">
               Secure Attendance System
             </span>
          </div>
        </div>
        
        {/* Simple Guide */}
        <div className="mt-8 flex flex-col items-center">
            <div className="px-6 py-3 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 text-slate-500 text-xs font-medium shadow-sm transition-all hover:bg-white/80">
                Facing issues? Try cleaning your camera lens
            </div>
        </div>
      </div>

      <style>{`
        #reader { border: none !important; }
        #reader video { border-radius: 20px !important; object-fit: cover !important; }
        #reader__dashboard_section_csr button {
          background-color: #1e3a8a !important;
          color: white !important;
          border-radius: 8px !important;
          padding: 8px 16px !important;
          border: none !important;
          font-weight: 600 !important;
          margin: 10px 0 !important;
          cursor: pointer !important;
        }
        #reader__dashboard_section_csr select {
          padding: 6px !important;
          border-radius: 6px !important;
          border: 1px solid #e2e8f0 !important;
        }
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(300px); }
        }
        #reader__status_span { display: none !important; }
        #reader__camera_selection { margin-bottom: 10px !important; width: 100% !important; }
      `}</style>
    </div>
  );
};

export default ClockingScreen;
