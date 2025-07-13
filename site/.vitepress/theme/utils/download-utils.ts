/**
 * Downloads a file with the specified filename and content
 * @param filename The name of the file to download
 * @param content The content of the file (can be a string or Blob)
 * @param blobType The MIME type of the file (defaults to 'text/plain')
 */
export function downloadFile(filename: string, content: string | Blob, blobType = 'text/plain'): void {
  const blob = content instanceof Blob ? content : new Blob([content], { type: blobType });
  const url = URL.createObjectURL(blob);

  Object.assign(document.createElement('a'), {
    href: url,
    download: filename,
  }).click();

  URL.revokeObjectURL(url);
}
