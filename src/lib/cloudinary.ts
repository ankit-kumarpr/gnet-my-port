import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
}

/**
 * Generate server-side signed upload parameters so the client can upload
 * directly to Cloudinary without exposing API secrets.
 */
export function generateSignedUploadParams(folder: string = "grandeur-net/projects") {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  if (!apiSecret || !apiKey || !cloudName) {
    return null;
  }

  const paramsToSign = {
    folder,
    timestamp,
  };

  const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);

  return {
    signature,
    timestamp,
    folder,
    apiKey,
    cloudName,
  };
}

/**
 * Remove an existing Cloudinary asset by public_id
 */
export async function deleteAssetByPublicId(publicId: string): Promise<boolean> {
  if (!publicId) return false;
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return false;
  }
}

/**
 * Server-side direct file/data-URL upload fallback
 */
export async function uploadToCloudinary(
  fileData: string,
  folder: string = "grandeur-net/projects"
): Promise<CloudinaryUploadResult | null> {
  try {
    const result = await cloudinary.uploader.upload(fileData, {
      folder,
      resource_type: "image",
      transformation: [
        { quality: "auto:best" },
        { fetch_format: "auto" },
      ],
    });

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  } catch (err) {
    console.error("Server-side Cloudinary upload failed:", err);
    return null;
  }
}
