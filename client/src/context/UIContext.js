import React, { createContext, useContext, useState, useCallback } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const [modal, setModal] = useState(null); // { title, message, onConfirm, onCancel, confirmText, cancelText }
    const [toasts, setToasts] = useState([]); // Array of { id, message, type: 'success' | 'error' | 'info' }

    const showConfirm = useCallback((config) => {
        return new Promise((resolve) => {
            setModal({
                ...config,
                onConfirm: () => {
                    setModal(null);
                    resolve(true);
                },
                onCancel: () => {
                    setModal(null);
                    resolve(false);
                }
            });
        });
    }, []);

    const showToast = useCallback((message, type = 'success', duration = 3000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    return (
        <UIContext.Provider value={{ showConfirm, showToast }}>
            {children}
            
            {/* Modal Overlay */}
            {modal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-primary-forest/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[32px] shadow-2xl p-8 max-w-sm w-full border border-white/20 animate-in zoom-in-95 duration-200">
                        <h3 className="text-2xl font-black text-primary-900 mb-2">{modal.title || 'Are you sure?'}</h3>
                        <p className="text-neutral-500 mb-8 leading-relaxed font-medium">{modal.message}</p>
                        <div className="flex gap-3">
                            <button 
                                onClick={modal.onCancel}
                                className="flex-1 px-6 py-3 rounded-2xl font-bold text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 transition-colors"
                            >
                                {modal.cancelText || 'Cancel'}
                            </button>
                            <button 
                                onClick={modal.onConfirm}
                                className="flex-1 px-6 py-3 rounded-2xl font-bold bg-primary-forest text-white shadow-lg shadow-primary-forest/20 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                {modal.confirmText || 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Container */}
            <div className="fixed bottom-8 right-8 z-[1000] flex flex-col gap-3 pointer-events-none">
                {toasts.map(toast => (
                    <div 
                        key={toast.id}
                        className={`pointer-events-auto px-6 py-4 rounded-2xl shadow-xl border flex items-center gap-3 animate-in slide-in-from-right-10 duration-300 ${
                            toast.type === 'error' 
                            ? 'bg-red-50 border-red-100 text-red-600' 
                            : 'bg-white border-neutral-100 text-primary-900'
                        }`}
                    >
                        {toast.type === 'error' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <div className="h-5 w-5 rounded-full bg-primary-sage/30 flex items-center justify-center text-[10px]">✨</div>
                        )}
                        <span className="font-bold text-sm tracking-tight">{toast.message}</span>
                    </div>
                ))}
            </div>
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) throw new Error('useUI must be used within a UIProvider');
    return context;
};
