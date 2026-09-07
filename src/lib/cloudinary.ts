/**
 * Cloudinary Upload Helper for Sharabangla Group
 * Uploads an image using unsigned upload preset
 */
export async function uploadImageToCloudinary(file: File): Promise<string> {
  const cloudName = 'qa9dkmfm';
  const uploadPreset = 'sbg_uploads';
  const uploadEndpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  if (!file) {
    throw new Error('No file provided for upload.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await fetch(uploadEndpoint, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg =
        errorData?.error?.message ||
        `Upload failed with status ${response.status}: ${response.statusText}`;
      throw new Error(errorMsg);
    }

    const data = await response.json();
    if (!data.secure_url) {
      throw new Error('Cloudinary response did not return a secure_url.');
    }

    return data.secure_url as string;
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    throw new Error(error.message || 'Failed to upload image to Cloudinary');
  }
}
