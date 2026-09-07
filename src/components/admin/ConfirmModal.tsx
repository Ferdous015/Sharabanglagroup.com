import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, HelpCircle, Info, Trash2, X } from 'lucide-react';

export type ConfirmVariant = 'primary' | 'danger' | 'warning' | 'info';

export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmVariant;
  icon?: React.ElementType;
  isLoading?: boolean;
  loadingText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary',
  icon: CustomIcon,
  isLoading = false,
  loadingText = 'Processing...',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          iconBg: 'bg-red-50 text-red-600 border border-red-200',
          defaultIcon: Trash2,
          buttonClass: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white focus:ring-red-500 shadow-xs',
        };
      case 'warning':
        return {
          iconBg: 'bg-amber-50 text-amber-600 border border-amber-200',
          defaultIcon: AlertTriangle,
          buttonClass: 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white focus:ring-amber-500 shadow-xs',
        };
      case 'info':
        return {
          iconBg: 'bg-blue-50 text-blue-600 border border-blue-200',
          defaultIcon: Info,
          buttonClass: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white focus:ring-blue-500 shadow-xs',
        };
      case 'primary':
      default:
        return {
          iconBg: 'bg-[#EAF6EE] text-[#0E5C2E] border border-[#0E5C2E]/20',
          defaultIcon: HelpCircle,
          buttonClass: 'bg-[#0E5C2E] hover:bg-[#0A4724] active:bg-[#07361B] text-white focus:ring-[#0E5C2E] shadow-xs',
        };
    }
  };

  const { iconBg, defaultIcon: DefaultIcon, buttonClass } = getVariantStyles();
  const IconComponent = CustomIcon || DefaultIcon;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E2E8E4] space-y-4 animate-scaleUp">
        <div className="flex items-start justify-between">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBg}`}>
            <IconComponent className="w-6 h-6" />
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="p-1.5 rounded-lg text-[#8C95A6] hover:text-[#2B2B2B] hover:bg-[#F0F2F1] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 id="confirm-modal-title" className="font-heading font-bold text-lg text-[#2B2B2B]">
            {title}
          </h3>
          <div className="text-xs sm:text-sm text-[#5A6170] mt-1.5 leading-relaxed">
            {message}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E8E4]/60">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#5A6170] hover:bg-[#F0F2F1] hover:text-[#2B2B2B] transition-colors cursor-pointer disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-60 flex items-center gap-2 cursor-pointer ${buttonClass}`}
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{loadingText}</span>
              </>
            ) : (
              <span>{confirmText}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
