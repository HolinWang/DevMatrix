import DefaultTheme from 'vitepress/theme'
import GlobalMusicPlayer from './components/GlobalMusicPlayer.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('GlobalMusicPlayer', GlobalMusicPlayer)
  }
}
