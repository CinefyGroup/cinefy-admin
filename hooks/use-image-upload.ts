// hooks/useCloudflareImageUpload.ts
import { useState } from "react";

export function useImageUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Get direct upload URL
      const tokenRes = await fetch("/api/cloudflare-token");
      const tokenData = await tokenRes.json();
      console.log(tokenData);
      if (!tokenData?.uploadURL) {
        throw new Error("Failed to get upload URL");
      }

      // Step 2: Upload image to Cloudflare
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch(tokenData.uploadURL, {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData?.result?.id) {
        throw new Error("Image upload failed");
      }

      // Step 3: Return the image URL
      const imageId = uploadData.result.id;
      const deliveryUrl = `${process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_DELIVERY_URL}/${imageId}/public`;

      return deliveryUrl;
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err?.response?.data?.message || err?.message || "Upload failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, loading, error };
}
