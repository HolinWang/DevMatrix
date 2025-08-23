import DefaultTheme from 'vitepress/theme'
import GlobalMusicPlayer from './components/GlobalMusicPlayer.vue'
import './styles/custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('GlobalMusicPlayer', GlobalMusicPlayer)
  }
}
