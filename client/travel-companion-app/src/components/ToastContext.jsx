import { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });

    // Auto-hide after 3 seconds
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg text-lg font-semibold z-50
            ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}
          `}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);