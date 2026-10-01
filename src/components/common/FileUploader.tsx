import React, { useRef, useState } from 'react';
import { UploadCloud, File, X, AlertCircle, CheckCircle2, Image as ImageIcon } from 'lucide-react';

interface FileUploaderProps {
  accept?: string;
  maxSizeBytes?: number; // default 50MB
  onFileSelect: (file: File) => void;
  onClear?: () => void;
  selectedFile?: File | null;
  helperText?: string;
  allowedTypesLabel?: string;
  multiple?: boolean;
  onFilesSelect?: (files: File[]) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  accept = '*/*',
  maxSizeBytes = 50 * 1024 * 1024, // 50MB
  onFileSelect,
  onClear,
  selectedFile = null,
  helperText = 'Drop files here or click to browse',
  allowedTypesLabel = 'All files supported up to 50MB',
  multiple = false,
  onFilesSelect,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateAndProcessFile = (file: File): boolean => {
    setErrorMessage(null);

    // Size validation
    if (file.size > maxSizeBytes) {
      setErrorMessage(`File is too large (${formatFileSize(file.size)}). Maximum allowed size is ${formatFileSize(maxSizeBytes)}.`);
      return false;
    }

    // Type validation
    if (accept && accept !== '*/*') {
      const allowedPatterns = accept.split(',').map((p) => p.trim().toLowerCase());
      const fileName = file.name.toLowerCase();
      const fileType = file.type.toLowerCase();

      const isMatch = allowedPatterns.some((pattern) => {
        if (pattern.startsWith('.')) {
          return fileName.endsWith(pattern);
        }
        if (pattern.endsWith('/*')) {
          const prefix = pattern.replace('/*', '');
          return fileType.startsWith(prefix);
        }
        return fileType === pattern;
      });

      if (!isMatch) {
        setErrorMessage(`Invalid file format. Allowed formats: ${allowedTypesLabel || accept}`);
        return false;
      }
    }

    // Generate preview if image
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }

    onFileSelect(file);
    return true;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (multiple && onFilesSelect && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelect(Array.from(e.dataTransfer.files));
      return;
    }
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (multiple && onFilesSelect && e.target.files && e.target.files.length > 0) {
      onFilesSelect(Array.from(e.target.files));
      return;
    }
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setErrorMessage(null);
    if (onClear) onClear();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
        id="file-upload-input"
      />

      {/* Selected State */}
      {selectedFile ? (
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 bg-emerald-50/50 border border-emerald-200 rounded-2xl gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="File preview"
                className="w-14 h-14 object-cover rounded-xl border border-emerald-200 shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <File className="w-6 h-6" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {selectedFile.name}
                </p>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {formatFileSize(selectedFile.size)} · Ready to process
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Change file
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              title="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Empty / Drop Area */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-emerald-500 bg-emerald-50/60 scale-[0.99]'
              : 'border-slate-300 hover:border-emerald-500 hover:bg-slate-50/70'
          }`}
        >
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-2xs">
            <UploadCloud className="w-7 h-7" />
          </div>
          <h3 className="text-base font-semibold text-slate-800">
            {helperText}
          </h3>
          <p className="text-xs text-slate-500 mt-1.5">
            {allowedTypesLabel}
          </p>
          <button
            type="button"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <span>Choose from Device</span>
          </button>
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="mt-3 flex items-center gap-2 p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl animate-in fade-in duration-150">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
