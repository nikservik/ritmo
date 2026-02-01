import {
    defineConfig,
} from '@vite-pwa/assets-generator/config'
import type { Preset } from '@vite-pwa/assets-generator/config';

const preset: Preset = {
  transparent: {
    sizes: [64, 152, 192, 512],
    favicons: [[48, 'favicon.ico']],
    padding: 0
  },
  maskable: {
    sizes: [512]
  },
  apple: {
    sizes: [180]
  }
}

export default defineConfig({
    headLinkOptions: {
        preset: '2023',
    },
    preset,
    images: ['public/ritmo.png'],
})
