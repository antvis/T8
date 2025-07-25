<template>
  <div class="markdown-copy-buttons">
    <div class="markdown-copy-buttons-inner">
      <button ref="copyBtn" class="copy" @click="copyMarkdown">
        <span v-html="copied ? iconCheck : iconCopy"></span> Copy as Markdown
      </button>
      <button ref="downloadBtn" class="download" @click="downloadMarkdown">
        <span v-html="downloaded ? iconCheck : iconDownload"></span> Download as Markdown
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { cleanUrl } from '../utils/file-utils';
import { downloadFile } from '../utils/download-utils';

//#region SVG Icons
const iconCheck =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>';
const iconCopy =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-icon lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
const iconDownload =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download-icon lucide-download"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>';
//#endregion

const copied = ref(false);
const downloaded = ref(false);

const currentURL = window.location.origin + window.location.pathname;

/** Copies markdown content from the current page to clipboard */
async function copyMarkdown(): Promise<void> {
  try {
    const url = `${cleanUrl(currentURL)}.md`;
    const response = await fetch(url);
    const text = await response.text();
    await navigator.clipboard.writeText(text);

    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (error) {
    console.error('❌ Error copying markdown:', error);
  }
}

/** Downloads markdown content from the current page as a file */
async function downloadMarkdown(): Promise<void> {
  try {
    const cleanedUrl = cleanUrl(currentURL);
    const url = `${cleanedUrl}.md`;
    const response = await fetch(url);
    const text = await response.text();

    downloadFile(`${cleanedUrl.split('/').pop()}.md`, text, 'text/markdown');

    downloaded.value = true;
    setTimeout(() => {
      downloaded.value = false;
    }, 2000);
  } catch (error) {
    console.error('❌ Error downloading markdown:', error);
  }
}
</script>

<style scoped>
.markdown-copy-buttons {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 16px;
}

.markdown-copy-buttons-inner {
  margin: 16px 0;
  display: flex;
  gap: 12px;
}

.markdown-copy-buttons button {
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition:
    background 0.2s,
    border 0.2s;
}

.markdown-copy-buttons img {
  vertical-align: middle;
}
</style>
