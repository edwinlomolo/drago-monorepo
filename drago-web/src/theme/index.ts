import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { Button } from '@/theme/button'

const colorConfig: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const theme = extendTheme({
  config: colorConfig,
  components: {
    Button,
  },
  fonts: {
    heading: 'var(--font-space-grotesk)',
    body: 'var(--font-space-grotesk)',
  },
  styles: {
    global: () => ({})
  },
})
