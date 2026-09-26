import React, { createContext, useContext, useState, useCallback } from 'react';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastMessage {
  id: string;
  title?: string;
  message: string;
  type?: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info', title?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type, title }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getStyle = (type: ToastType) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-[#004c46] text-white border-emerald-400/40',
          icon: 'check_circle',
          iconColor: 'text-[#a2f1e6]',
        };
      case 'warning':
        return {
          bg: 'bg-amber-900 text-white border-amber-400/40',
          icon: 'warning',
          iconColor: 'text-amber-300',
        };
      case 'error':
        return {
          bg: 'bg-[#ba1a1a] text-white border-red-300/40',
          icon: 'error',
          iconColor: 'text-red-200',
        };
      case 'info':
      default:
        return {
          bg: 'bg-[#191c1d] text-white border-gray-700',
          icon: 'info',
          iconColor: 'text-[#a2f1e6]',
        };
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Floating Snackbars Container (Flutter ScaffoldMessenger style) */}
      <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-70 flex flex-col items-center gap-2 max-w-sm w-full px-4 pointer-events-none">
        {toasts.map((toast) => {
          const style = getStyle(toast.type || 'info');
          return (
            <div
              key={toast.id}
              className={`w-full pointer-events-auto p-3.5 rounded-2xl shadow-xl border flex items-center justify-between gap-3 animate-in slide-in-from-bottom-3 duration-200 backdrop-blur-md ${style.bg}`}
              role="alert"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <span className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 ${style.iconColor}`}>
                  {style.icon}
                </span>
                <div className="min-w-0">
                  {toast.title && (
                    <h5 className="text-[12px] font-bold leading-tight truncate">{toast.title}</h5>
                  )}
                  <p className="text-[12px] opacity-95 leading-snug break-words">{toast.message}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition-colors shrink-0"
                aria-label="Dismiss"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    // Graceful fallback if invoked outside Provider
    return {
      showToast: (msg: string) => {
        console.log(`[Toast]: ${msg}`);
      },
    };
  }
  return context;
};
