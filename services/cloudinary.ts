import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export { cloudinary }

// ─────────────────────────────────────────────
// Upload a base64 or URL image to Cloudinary
// ─────────────────────────────────────────────

export async function uploadImage(
  source: string, // base64 data URI or remote URL
  folder: string = 'arar-residency'
): Promise<{ url: string; publicId: string }> {
  const result = await cloudinary.uploader.upload(source, {
    folder,
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  })
  return { url: result.secure_url, publicId: result.public_id }
}

// ─────────────────────────────────────────────
// Upload multiple images
// ─────────────────────────────────────────────

export async function uploadImages(
  sources: string[],
  folder: string = 'arar-residency'
): Promise<{ url: string; publicId: string }[]> {
  return Promise.all(sources.map((src) => uploadImage(src, folder)))
}

// ─────────────────────────────────────────────
// Delete an image by publicId
// ─────────────────────────────────────────────

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId)
}

// ─────────────────────────────────────────────
// Generate optimized URL with transformations
// ─────────────────────────────────────────────

export function getOptimizedUrl(
  publicId: string,
  options: { width?: number; height?: number; quality?: string | number } = {}
): string {
  return cloudinary.url(publicId, {
    transformation: [
      {
        width: options.width,
        height: options.height,
        crop: options.width || options.height ? 'fill' : undefined,
        quality: options.quality ?? 'auto',
        fetch_format: 'auto',
      },
    ],
    secure: true,
  })
}

// ─────────────────────────────────────────────
// Generate a signed upload preset for direct client-side uploads
// ─────────────────────────────────────────────

export async function generateSignedUploadParams(folder: string = 'arar-residency') {
  const timestamp = Math.round(new Date().getTime() / 1000)
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET!
  )

  return {
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    folder,
  }
}
