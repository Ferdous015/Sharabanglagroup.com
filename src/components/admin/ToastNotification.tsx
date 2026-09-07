import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

export interface ToastNotificationProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const duration = toast.duration ?? (toast.type === 'error' ? 6000 : 4000);
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, duration);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  const getToastStyles = () => {
    switch (toast.type) {
      case 'error':
        return {
          bg: 'bg-red-900/95 text-white border-red-700 shadow-xl',
          icon: AlertCircle,
          iconColor: 'text-red-300',
        };
      case 'warning':
        return {
          bg: 'bg-amber-900/95 text-white border-amber-700 shadow-xl',
          icon: AlertTriangle,
          iconColor: 'text-amber-300',
        };
      case 'info':
        return {
          bg: 'bg-slate-900/95 text-white border-slate-700 shadow-xl',
          icon: Info,
          iconColor: 'text-blue-300',
        };
      case 'success':
      default:
        return {
          bg: 'bg-[#0E5C2E] text-white border-[#1E9B4C]/40 shadow-xl',
          icon: CheckCircle2,
          iconColor: 'text-[#4ADE80]',
        };
    }
  };

  const { bg, icon: Icon, iconColor } = getToastStyles();

  return (
    <div
      className={`pointer-events-auto p-4 rounded-xl border backdrop-blur-xs flex items-start gap-3 transition-all animate-slideUp ${bg}`}
      role="alert"
    >
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
      <div className="flex-1 text-xs">
        {toast.title && (
          <div className="font-bold text-sm mb-0.5">{toast.title}</div>
        )}
        <div className="leading-snug opacity-95">{toast.message}</div>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="p-1 -mr-1 -mt-1 text-white/70 hover:text-white rounded-lg transition-colors cursor-pointer"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
