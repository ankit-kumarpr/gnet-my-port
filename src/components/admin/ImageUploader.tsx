"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon, Link as LinkIcon, Check } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  value: string;
  publicId?: string;
  onChange: (url: string, publicId?: string) => void;
  folder?: string;
  recommendedSize?: string;
}

export default function ImageUploader({
  label,
  value,
  publicId,
  onChange,
  folder = "grandeur-net/projects",
  recommendedSize = "16:9 aspect ratio (e.g. 1920x1080)",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualMode, setManualMode] = useState(false);
  const [manualUrl, setManualUrl] = useState(value || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.asset.secure_url, data.asset.public_id);
    } catch (err: any) {
      setError(err.message || "Failed to upload image. You can paste an image URL instead.");
      setManualMode(true);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleManualApply = () => {
    if (manualUrl.trim()) {
      onChange(manualUrl.trim(), "");
      setError(null);
    }
  };

  const handleClear = () => {
    onChange("", "");
    setManualUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-medium text-[#A5B2C0] uppercase tracking-wider">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setManualMode(!manualMode)}
          className="text-[11px] font-mono text-[#00D6A0] hover:underline flex items-center gap-1"
        >
          {manualMode ? (
            <>
              <Upload className="w-3 h-3" />
              <span>Switch to File Upload</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-3 h-3" />
              <span>Paste Direct URL</span>
            </>
          )}
        </button>
      </div>

      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-white/[0.1] bg-[#070D14] group">
          <div className="aspect-[16/9] w-full max-h-56 relative overflow-hidden bg-black/40 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt={label}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-medium backdrop-blur-md transition-colors"
              >
                Replace File
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition-colors"
                title="Remove Image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-2.5 bg-[#0C1721] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#A5B2C0] truncate">
            <span className="truncate max-w-[80%]">{value}</span>
            <span className="text-[#00D6A0] font-semibold shrink-0">Attached</span>
          </div>
        </div>
      ) : manualMode ? (
        <div className="flex gap-2">
          <input
            type="url"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="https://images.unsplash.com/... or Cloudinary URL"
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#0C1721] border border-white/[0.1] focus:border-[#00D6A0] text-sm text-[#F5F8FA] placeholder:text-[#A5B2C0]/40 outline-none"
          />
          <button
            type="button"
            onClick={handleManualApply}
            className="px-4 py-2.5 rounded-xl bg-[#00D6A0] hover:bg-[#00BF8F] text-[#050A0B] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Apply</span>
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-white/[0.12] hover:border-[#00D6A0]/50 rounded-2xl p-6 bg-[#0C1721]/60 hover:bg-[#0C1721] transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-2 group"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <Loader2 className="w-7 h-7 text-[#00D6A0] animate-spin" />
              <span className="text-xs font-mono text-[#A5B2C0]">
                Uploading and optimizing with Cloudinary...
              </span>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#A5B2C0] group-hover:text-[#00D6A0] group-hover:scale-105 transition-all">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#F5F8FA]">
                  Click to upload image or drag and drop
                </p>
                <p className="text-xs text-[#A5B2C0]/70 mt-0.5">
                  PNG, JPG, WebP, AVIF up to 10MB ({recommendedSize})
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs font-mono text-red-400 mt-1">
          {error}
        </p>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
        className="hidden"
      />
    </div>
  );
}
