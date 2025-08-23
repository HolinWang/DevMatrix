import DefaultTheme from 'vitepress/theme'
import GlobalMusicPlayer from './components/GlobalMusicPlayer.vue'
import './styles/custom.css'
import { createApp } from 'vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('GlobalMusicPlayer', GlobalMusicPlayer)
    
    // 创建全局音乐播放器实例
    const globalMusicPlayer = createApp(GlobalMusicPlayer)
    const container = document.createElement('div')
    container.id = 'global-music-player-container'
    document.body.appendChild(container)
    globalMusicPlayer.mount(container)
  }
}
