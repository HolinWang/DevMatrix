import DefaultTheme from 'vitepress/theme'
import GlobalMusicPlayer from './components/GlobalMusicPlayer.vue'
import EnhancedOutline from './components/EnhancedOutline.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('GlobalMusicPlayer', GlobalMusicPlayer)
    app.component('EnhancedOutline', EnhancedOutline)
  }
}
