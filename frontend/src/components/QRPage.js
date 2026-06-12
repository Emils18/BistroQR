// frontend/src/components/QRPage.js

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRPage = () => {
  const destinationUrl = `${window.location.origin}/`;

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[65vh] anim-fade-in">
      
      {/* Phone-styled Mockup Scanning Frame container */}
      <div className="glass-card rounded-[36px] p-8 max-w-sm w-full text-center border border-stone-200/80 shadow-2xl relative overflow-hidden anim-scale-bounce">
        
        {/* Glossy top speaker bar detail */}
        <div className="w-16 h-3.5 bg-stone-100 rounded-full mx-auto mb-6 border border-stone-200/40 shadow-inner" />

        <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">Interactive Scanner</h2>
        <p className="text-stone-400 text-[11px] mt-1 mb-8 leading-relaxed px-4">
          Point your device camera at this viewport to open the instant-order menu and checkout drawer on your phone.
        </p>
        
        {/* QR Scanner Viewport Frame */}
        <div className="relative bg-stone-50 p-6 rounded-[24px] inline-block shadow-inner border border-stone-200/40 overflow-hidden">
          
          {/* Laser scanning bar layer (anim-laser defined in index.css) */}
          <div className="scanner-line absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_8px_#e85d04] anim-laser pointer-events-none" />

          {/* Render target vectors */}
          <div className="relative z-10 p-2 bg-white rounded-xl shadow-md">
            <QRCodeSVG 
              value={destinationUrl}
              size={150}
              level={"H"}
              includeMargin={false}
            />
          </div>
          
          {/* Mock framing corner guides */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-orange-500/80 rounded-tl" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-orange-500/80 rounded-tr" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-orange-500/80 rounded-bl" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-orange-500/80 rounded-br" />
        </div>

        {/* Dynamic target address card */}
        <div className="mt-8 space-y-1 bg-stone-50/80 p-3 rounded-2xl border border-stone-200/60 shadow-sm">
          <p className="text-[9px] text-stone-400 uppercase tracking-widest font-black">Target Gateway</p>
          <p className="text-[10px] text-stone-600 font-mono break-all leading-normal px-2">
            {destinationUrl}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRPage;