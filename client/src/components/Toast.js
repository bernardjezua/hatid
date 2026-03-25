import React, { useEffect, useState } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-300 transform ${
      visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
    }`}>
      <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl shadow-premium border ${
        type === 'success' ? 'bg-primary-forest text-white border-white/10' : 'bg-red-500 text-white border-white/10'
      }`}>
        <div className="h-8 w-8 rounded-xl bg-white/20 flex items-center justify-center text-xl">
          {type === 'success' ? '🌱' : '⚠️'}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest opacity-70">Notification</p>
          <p className="font-bold">{message}</p>
        </div>
        <button 
          onClick={() => setVisible(false)}
          className="ml-4 p-1 hover:bg-white/10 rounded-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
