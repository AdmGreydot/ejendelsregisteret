/**
 * HEIC/HEIF is the iPhone's default photo format, but only Safari can display
 * it, and the storage buckets only accept PNG/JPEG/WEBP. HEIC files are
 * therefore converted to JPEG in the browser before preview and upload.
 */

/**
 * Added to `accept` so desktop file pickers stop greying out .heic files.
 * iOS may then hand over the HEIC original instead of converting it itself,
 * which is fine: toUploadable converts it either way.
 */
export const HEIC_ACCEPT = ".heic,.heif";

export const isHeicFile = (file: File) =>
  /\.hei[cf]$/i.test(file.name.trim()) ||
  file.type === "image/heic" ||
  file.type === "image/heif";

/**
 * Returns the file unchanged unless it is HEIC, in which case it returns a
 * JPEG copy named .jpg. The converter is ~3 MB of WASM, so it is only loaded
 * the first time a HEIC file actually shows up.
 */
export async function toUploadable(file: File): Promise<File> {
  if (!isHeicFile(file)) return file;

  const { heicTo } = await import("heic-to");
  const jpeg = await heicTo({ blob: file, type: "image/jpeg", quality: 0.9 });
  const name = file.name.trim().replace(/\.hei[cf]$/i, "") + ".jpg";

  return new File([jpeg], name, {
    type: "image/jpeg",
    lastModified: file.lastModified,
  });
}
