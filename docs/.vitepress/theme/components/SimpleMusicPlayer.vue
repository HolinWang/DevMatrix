<template>
  <div class="simple-music-player" :class="{ 'player-minimized': minimized }">
    <!-- 最小化时的播放按钮 -->
    <div v-if="minimized" class="minimized-player" @click="toggleMinimize">
      <div class="play-icon" :class="{ 'playing': isPlaying }">
        <svg v-if="!isPlaying" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
      </div>
    </div>

    <!-- 完整播放器界面 -->
    <div v-else class="player-container">
      <!-- 自动播放提示 -->
      <div v-if="showAutoplayHint" class="autoplay-hint">
        <span>🎵 点击任意位置开始播放背景音乐</span>
        <button @click="hideAutoplayHint" class="hint-close">×</button>
      </div>
      <!-- 播放器头部 -->
      <div class="player-header">
        <h3>背景音乐</h3>
        <button class="minimize-btn" @click="toggleMinimize">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13H5v-2h14v2z"/>
          </svg>
        </button>
      </div>

      <!-- 当前播放信息 -->
      <div class="current-track">
        <div class="track-info">
          <div class="track-title">{{ currentTrack.title }}</div>
          <div class="track-artist">{{ currentTrack.artist }}</div>
        </div>
        <div class="track-cover">
          <div class="default-cover">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- 播放控制 -->
      <div class="controls">
        <button class="play-btn" @click="togglePlay">
          <svg v-if="!isPlaying" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        </button>
      </div>

      <!-- 进度条 -->
      <div class="progress-container">
        <div class="time-display">
          <span>{{ formatTime(currentTime) }}</span>
          <span>{{ formatTime(duration) }}</span>
        </div>
        <div class="progress-bar" @click="seek">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
      </div>

      <!-- 音量控制 -->
      <div class="volume-control">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
        <input 
          type="range" 
          min="0" 
          max="100" 
          v-model="volume" 
          @input="updateVolume"
          class="volume-slider"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleMusicPlayer',
  data() {
    return {
      minimized: true, // 默认最小化状态
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 30, // 默认音量30%
      showAutoplayHint: false, // 显示自动播放提示
      audioInitialized: false, // 防止重复初始化
      currentTrack: {
        title: 'Life',
        artist: '背景音乐'
      }
    }
  },
  computed: {
    progressPercent() {
      return this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0
    }
  },
  mounted() {
    console.log('🎼 SimpleMusicPlayer 组件已挂载')
    this.initGlobalAudio()
    
    // 开发模式下的调试工具
    if (typeof window !== 'undefined') {
      window.debugMusic = {
        clearState: () => {
          localStorage.removeItem('musicPlayerState')
          console.log('🗑️ 清除播放状态，刷新页面测试自动播放')
        },
        forceAutoplay: () => {
          this.isPlaying = false // 重置状态
          this.autoPlay()
        },
        clearAndPlay: () => {
          localStorage.removeItem('musicPlayerState')
          this.isPlaying = false
          this.autoPlay()
          console.log('🔄 清除状态并立即尝试自动播放')
        },
        getState: () => {
          const state = localStorage.getItem('musicPlayerState')
          return state ? JSON.parse(state) : null
        },
        getAudioInfo: () => {
          const audio = document.getElementById('global-audio')
          return {
            exists: !!audio,
            readyState: audio?.readyState,
            paused: audio?.paused,
            currentTime: audio?.currentTime,
            volume: audio?.volume
          }
        },
        testInteraction: () => {
          console.log('🧪 模拟用户交互')
          // 模拟点击事件
          document.dispatchEvent(new Event('click'))
        }
      }
    }
  },
      methods: {
      initGlobalAudio() {
        if (this.audioInitialized) {
          console.log('🔄 音频已初始化，跳过重复初始化')
          return
        }
        
        // 检查是否已经有全局音频元素
        let globalAudio = document.getElementById('global-audio')
        if (!globalAudio) {
          console.log('🎵 创建新的音频元素')
          globalAudio = document.createElement('audio')
          globalAudio.id = 'global-audio'
          globalAudio.src = '/music/life.mp3'
          globalAudio.preload = 'auto'
          globalAudio.loop = true
          document.body.appendChild(globalAudio)
          
          // 添加事件监听器
          globalAudio.addEventListener('loadedmetadata', this.onLoadedMetadata)
          globalAudio.addEventListener('timeupdate', this.onTimeUpdate)
          globalAudio.addEventListener('ended', this.onEnded)
          globalAudio.addEventListener('error', this.onError)
          
          // 只监听一次加载完成事件
          globalAudio.addEventListener('canplaythrough', () => {
            if (!this.audioInitialized) {
              console.log('🎵 音频首次加载完成')
              this.audioInitialized = true
              this.checkAutoPlay()
            }
          }, { once: true })
          
        } else {
          console.log('🔄 音频元素已存在，同步状态')
          this.audioInitialized = true
          this.syncAudioState()
          // 如果没有保存状态且音频未播放，则自动播放
          const savedState = localStorage.getItem('musicPlayerState')
          if (!savedState && !this.isPlaying) {
            this.autoPlay()
          }
        }
      },
      
      togglePlay() {
        const globalAudio = document.getElementById('global-audio')
        if (globalAudio) {
          if (this.isPlaying) {
            globalAudio.pause()
            this.isPlaying = false
          } else {
            globalAudio.play().then(() => {
              this.isPlaying = true
            }).catch(err => {
              console.error('播放失败:', err)
              this.isPlaying = false
            })
          }
          this.savePlaybackState()
        }
      },
    
    toggleMinimize() {
      this.minimized = !this.minimized
    },
    
          seek(event) {
        const globalAudio = document.getElementById('global-audio')
        if (globalAudio) {
          const rect = event.currentTarget.getBoundingClientRect()
          const percent = (event.clientX - rect.left) / rect.width
          globalAudio.currentTime = percent * this.duration
        }
      },
      
      updateVolume() {
        const globalAudio = document.getElementById('global-audio')
        if (globalAudio) {
          globalAudio.volume = this.volume / 100
          this.savePlaybackState()
        }
      },
    
          formatTime(seconds) {
        if (isNaN(seconds)) return '0:00'
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, '0')}`
      },
      
      savePlaybackState() {
        const state = {
          isPlaying: this.isPlaying,
          currentTime: this.currentTime,
          volume: this.volume,
          timestamp: Date.now()
        }
        localStorage.setItem('musicPlayerState', JSON.stringify(state))
      },
      
      restorePlaybackState() {
        const savedState = localStorage.getItem('musicPlayerState')
        if (savedState) {
          try {
            const state = JSON.parse(savedState)
            if (Date.now() - state.timestamp < 3600000) { // 1小时内有效
              this.volume = state.volume || 30
              this.currentTime = state.currentTime || 0
              const globalAudio = document.getElementById('global-audio')
              if (globalAudio) {
                globalAudio.volume = this.volume / 100
                if (state.currentTime) {
                  globalAudio.currentTime = state.currentTime
                }
                
                if (state.isPlaying) {
                  // 恢复播放状态
                  globalAudio.play().then(() => {
                    this.isPlaying = true
                    console.log('🔄 恢复播放状态成功')
                  }).catch(err => {
                    console.log('恢复播放失败:', err.message)
                    this.setupUserInteractionPlay()
                  })
                }
              }
              console.log('📥 恢复播放状态:', state)
            } else {
              // 状态过期，清除并自动播放
              localStorage.removeItem('musicPlayerState')
              this.autoPlay()
            }
          } catch (e) {
            console.error('恢复播放状态失败:', e)
            // 如果恢复失败，清除状态并自动播放
            localStorage.removeItem('musicPlayerState')
            this.autoPlay()
          }
        }
      },
      
      autoPlay() {
        if (this.isPlaying) {
          console.log('🎵 音乐已在播放中')
          return
        }
        
        console.log('🎯 尝试自动播放音乐')
        const globalAudio = document.getElementById('global-audio')
        
        if (!globalAudio) {
          console.log('❌ 音频元素不存在')
          return
        }
        
        if (globalAudio.readyState < 2) {
          console.log('⏳ 音频尚未加载完成，等待...')
          return
        }
        
        // 恢复或设置音量
        const savedState = localStorage.getItem('musicPlayerState')
        if (savedState) {
          try {
            const state = JSON.parse(savedState)
            this.volume = state.volume || 30
            if (state.currentTime && state.currentTime > 0) {
              globalAudio.currentTime = state.currentTime
            }
          } catch (e) {
            this.volume = 30
          }
        } else {
          this.volume = 30
        }
        
        globalAudio.volume = this.volume / 100
        
        // 尝试播放
        globalAudio.play().then(() => {
          this.isPlaying = true
          this.savePlaybackState()
          console.log('🎵 音乐自动播放成功！音量:', this.volume + '%')
        }).catch(err => {
          console.log('⚠️ 自动播放失败（浏览器策略限制）:', err.message)
          this.showAutoplayHintMessage()
          this.setupUserInteractionPlay()
        })
      },
      
      setupUserInteractionPlay() {
        console.log('👆 设置用户交互监听，等待用户点击/按键/触摸')
        
        const playOnInteraction = () => {
          console.log('🎯 检测到用户交互，尝试播放音乐')
          const globalAudio = document.getElementById('global-audio')
          if (globalAudio && !this.isPlaying) {
            globalAudio.play().then(() => {
              this.isPlaying = true
              this.savePlaybackState()
              this.showAutoplayHint = false // 隐藏提示
              console.log('🎵 用户交互后音乐开始播放成功！')
            }).catch(err => {
              console.error('❌ 用户交互后播放仍然失败:', err)
            })
          }
          
          // 移除所有事件监听器
          document.removeEventListener('click', playOnInteraction)
          document.removeEventListener('keydown', playOnInteraction)
          document.removeEventListener('touchstart', playOnInteraction)
          document.removeEventListener('mousedown', playOnInteraction)
        }
        
        // 添加多种交互事件监听
        document.addEventListener('click', playOnInteraction, { once: true })
        document.addEventListener('keydown', playOnInteraction, { once: true })
        document.addEventListener('touchstart', playOnInteraction, { once: true })
        document.addEventListener('mousedown', playOnInteraction, { once: true })
      },
      
      onLoadedMetadata() {
        const globalAudio = document.getElementById('global-audio')
        if (globalAudio) {
          this.duration = globalAudio.duration
        }
      },
      
      onTimeUpdate() {
        const globalAudio = document.getElementById('global-audio')
        if (globalAudio) {
          this.currentTime = globalAudio.currentTime
        }
      },
      
      onEnded() {
        // 单曲循环播放
        const globalAudio = document.getElementById('global-audio')
        if (globalAudio) {
          globalAudio.currentTime = 0
          this.togglePlay()
        }
      },
      
      onError() {
        console.error('音频加载失败')
      },
      
      checkAutoPlay() {
        const savedState = localStorage.getItem('musicPlayerState')
        if (!savedState) {
          // 没有保存状态，执行自动播放
          console.log('🆕 没有保存状态，开始自动播放')
          this.autoPlay()
        } else {
          // 有保存状态，但如果上次是暂停状态，仍然自动播放
          console.log('📥 检查保存的播放状态')
          const state = JSON.parse(savedState)
          console.log('保存的状态:', state)
          
          // 无论上次是否在播放，都优先自动播放
          this.autoPlay()
        }
      },
      
      syncAudioState() {
        // 同步音频状态（当音频元素已存在时）
        const globalAudio = document.getElementById('global-audio')
        if (globalAudio) {
          this.isPlaying = !globalAudio.paused
          this.currentTime = globalAudio.currentTime
          this.duration = globalAudio.duration
          this.volume = Math.round(globalAudio.volume * 100)
        }
      },
      
      hideAutoplayHint() {
        this.showAutoplayHint = false
      },
      
      showAutoplayHintMessage() {
        this.showAutoplayHint = true
        console.log('💡 显示自动播放提示，等待用户交互')
        
        // 同时显示全局提示
        this.showGlobalHint()
        
        // 5秒后自动隐藏提示
        setTimeout(() => {
          this.showAutoplayHint = false
        }, 5000)
      },
      
      showGlobalHint() {
        // 创建全局提示元素
        let globalHint = document.getElementById('global-music-hint')
        if (!globalHint) {
          globalHint = document.createElement('div')
          globalHint.id = 'global-music-hint'
          globalHint.innerHTML = `
            <div style="
              position: fixed;
              top: 20px;
              right: 20px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 15px 20px;
              border-radius: 10px;
              font-size: 14px;
              font-weight: 500;
              box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
              z-index: 10001;
              animation: slideIn 0.5s ease-out;
              cursor: pointer;
            ">
              🎵 点击任意位置开始播放背景音乐
              <button onclick="this.parentElement.remove()" style="
                background: none;
                border: none;
                color: white;
                margin-left: 10px;
                font-size: 18px;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s;
              " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.2)'" onmouseout="this.style.backgroundColor='transparent'">×</button>
            </div>
            <style>
              @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
              }
            </style>
          `
          document.body.appendChild(globalHint)
          
          // 点击提示时移除
          globalHint.addEventListener('click', () => {
            globalHint.remove()
          })
          
          // 10秒后自动移除
          setTimeout(() => {
            if (globalHint.parentNode) {
              globalHint.remove()
            }
          }, 10000)
        }
      }
  }
}
</script>

<style scoped>
.simple-music-player {
  position: relative;
}

.autoplay-hint {
  position: absolute;
  top: -50px;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
  z-index: 10000;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.hint-close {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.hint-close:hover {
  background: rgba(255, 255, 255, 0.2);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.player-minimized {
  width: 60px;
  height: 60px;
}

.minimized-player {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.minimized-player:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
}

.play-icon {
  color: white;
  transition: all 0.3s ease;
}

.play-icon.playing {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.player-container {
  width: 280px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.player-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.player-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.minimize-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.minimize-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.current-track {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.track-info {
  flex: 1;
  margin-right: 12px;
}

.track-title {
  font-weight: 600;
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
}

.track-artist {
  font-size: 12px;
  color: #666;
}

.track-cover {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.default-cover {
  color: #ccc;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 20px;
}

.play-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  cursor: pointer;
  padding: 12px;
  border-radius: 50%;
  transition: all 0.2s;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.play-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.progress-container {
  padding: 0 20px 16px;
}

.time-display {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: #f0f0f0;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
  transition: width 0.1s;
}

.volume-control {
  display: flex;
  align-items: center;
  padding: 0 20px 16px;
  gap: 12px;
}

.volume-control svg {
  color: #666;
  flex-shrink: 0;
}

.volume-slider {
  flex: 1;
  height: 4px;
  background: #f0f0f0;
  border-radius: 2px;
  outline: none;
  -webkit-appearance: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  cursor: pointer;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .simple-music-player {
    bottom: 10px;
    right: 10px;
  }
  
  .player-container {
    width: 260px;
  }
  
  .player-minimized {
    width: 50px;
    height: 50px;
  }
  
  .minimized-player {
    width: 50px;
    height: 50px;
  }
}
</style> 