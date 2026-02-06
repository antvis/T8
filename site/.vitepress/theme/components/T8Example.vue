<template>
  <div class="t8-example">
    <div class="example-header">
      <button @click="showCode = !showCode" class="toggle-code-btn">{{ showCode ? 'Hide' : 'Show' }} T8 Syntax</button>
    </div>
    <div v-if="showCode" class="code-display">
      <pre><code>{{ syntax }}</code></pre>
    </div>
    <div class="render-container" :class="containerClass" ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{
  syntax: string;
  mode?: 'streaming' | 'dark' | 'custom-plugin';
  containerClass?: string;
}>();

const container = ref<HTMLElement | null>(null);
const showCode = ref(false);
let textInstance: any = null;
let unmount: (() => void) | null = null;

onMounted(async () => {
  if (!container.value) return;

  try {
    // Dynamically import T8 from source to avoid SSR issues
    const { Text } = await import('../../../../src/index.ts');

    textInstance = new Text(container.value);

    if (props.mode === 'streaming') {
      // Streaming render
      (async () => {
        let chunk = '';
        for (let i = 0; i < props.syntax.length; i += 10) {
          chunk += props.syntax.slice(i, i + 10);
          textInstance.render(chunk);
          await new Promise((resolve) => setTimeout(resolve, 160));
        }
      })();
    } else if (props.mode === 'dark') {
      // Dark theme with custom settings
      textInstance.theme('dark', { fontSize: 12, lineHeight: 20 }).render(props.syntax);
    } else if (props.mode === 'custom-plugin') {
      // Custom plugin example
      const { createDimensionValue } = await import('../../../../src/plugin/presets/createDimensionValue.ts');

      const dimensionValueDescriptor = {
        style: () => ({
          color: 'red',
          fontSize: 19,
        }),
        tooltip: false,
      };

      const dimensionPlugin = createDimensionValue(dimensionValueDescriptor, 'overwrite');
      textInstance.registerPlugin(dimensionPlugin);
      textInstance.render(props.syntax);
    } else {
      // Default render
      textInstance.theme('light').render(props.syntax);
    }
  } catch (error) {
    console.error('Failed to load T8:', error);
  }
});

onBeforeUnmount(() => {
  if (unmount) {
    unmount();
  }
  if (textInstance) {
    textInstance.unmount?.();
  }
});
</script>

<style scoped>
.t8-example {
  margin: 1.5rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.example-header {
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  background-color: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.toggle-code-btn {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  background-color: transparent;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-code-btn:hover {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}

.code-display {
  padding: 1rem;
  background-color: var(--vp-code-block-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  max-height: 400px;
  overflow: auto;
}

.code-display pre {
  margin: 0;
  padding: 0;
  background: transparent;
}

.code-display code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--vp-code-color);
  white-space: pre-wrap;
  word-break: break-word;
}

.render-container {
  padding: 1.5rem;
  min-height: 200px;
  background-color: var(--vp-c-bg);
}

.render-container.dark {
  background-color: #1a1a1a;
  color: #ffffff;
}
</style>
