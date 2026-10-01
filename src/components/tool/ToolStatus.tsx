import React from 'react';
import { Loader2, CheckCircle2, AlertTriangle, Inbox, UploadCloud } from 'lucide-react';

export interface ProcessingStateProps {
  message?: string;
  subMessage?: string;
}

export const ProcessingState: React.FC<ProcessingStateProps> = ({
  message = 'Processing your request...',
  subMessage = 'This runs locally in your browser memory and will finish shortly.',
}) => (
  <div
    role="status"
    aria-live="polite"
    className="flex flex-col items-center justify-center p-8 sm:p-12 text-center"
  >
    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
      <Loader2 className="w-6 h-6 animate-spin text-emerald-600" aria-hidden="true" />
    </div>
    <p className="text-base font-semibold text-slate-800">{message}</p>
    <p className="text-xs text-slate-500 mt-1 max-w-sm">{subMessage}</p>
  </div>
);

export interface SuccessStateProps {
  title?: string;
  message?: string;
  action?: React.ReactNode;
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  title = 'Processing Completed Successfully',
  message = 'Your output is ready. Download or copy the results below.',
  action,
}) => (
  <div
    role="status"
    aria-live="polite"
    className="flex flex-col items-center justify-center p-6 text-center bg-emerald-50/40 border border-emerald-200/80 rounded-2xl mb-6"
  >
    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
    </div>
    <p className="text-sm font-semibold text-emerald-900">{title}</p>
    <p className="text-xs text-emerald-700 mt-0.5">{message}</p>
    {action && <div className="mt-3">{action}</div>}
  </div>
);

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'An Error Occurred',
  message = 'Failed to process the operation. Please verify your inputs and try again.',
  onRetry,
}) => (
  <div
    role="alert"
    aria-live="assertive"
    className="flex flex-col items-center justify-center p-6 text-center bg-rose-50 border border-rose-200 rounded-2xl my-4"
  >
    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-2">
      <AlertTriangle className="w-5 h-5" aria-hidden="true" />
    </div>
    <p className="text-sm font-semibold text-rose-900">{title}</p>
    <p className="text-xs text-rose-700 mt-0.5 max-w-md">{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
      >
        Try Again
      </button>
    )}
  </div>
);

export interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Data Available',
  message = 'Upload a file or enter input to view results.',
  actionText,
  onAction,
}) => (
  <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center mb-3">
      <Inbox className="w-6 h-6" aria-hidden="true" />
    </div>
    <p className="text-sm font-semibold text-slate-700">{title}</p>
    <p className="text-xs text-slate-500 mt-1 max-w-sm">{message}</p>
    {actionText && onAction && (
      <button
        type="button"
        onClick={onAction}
        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
      >
        <UploadCloud className="w-4 h-4" aria-hidden="true" />
        <span>{actionText}</span>
      </button>
    )}
  </div>
);
