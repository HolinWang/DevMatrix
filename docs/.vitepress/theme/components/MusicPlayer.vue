<template>
  <div class="music-player" :class="{ 'player-minimized': minimized }">
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
      <!-- 播放器头部 -->
      <div class="player-header">
        <h3>{{ playlist.length === 1 ? '背景音乐' : '音乐播放器' }}</h3>
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
          <img v-if="currentTrack.cover" :src="currentTrack.cover" :alt="currentTrack.title">
          <div v-else class="default-cover">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- 播放控制 -->
      <div class="controls">
        <button class="control-btn" @click="previousTrack" :disabled="playlist.length <= 1" v-if="playlist.length > 1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </button>
        
        <button class="play-btn" @click="togglePlay" :disabled="loading">
          <svg v-if="loading" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="loading-spin">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <svg v-else-if="!isPlaying" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        </button>
        
        <button class="control-btn" @click="nextTrack" :disabled="playlist.length <= 1" v-if="playlist.length > 1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
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

      <!-- 播放列表 - 单曲模式下隐藏 -->
      <div v-if="playlist.length > 1" class="playlist">
        <div class="playlist-header">
          <span>播放列表</span>
          <button class="shuffle-btn" @click="toggleShuffle" :class="{ active: shuffle }">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
            </svg>
          </button>
        </div>
        <div class="playlist-items">
          <div 
            v-for="(track, index) in playlist" 
            :key="index"
            class="playlist-item"
            :class="{ active: currentTrackIndex === index }"
            @click="playTrack(index)"
          >
            <span class="track-number">{{ index + 1 }}</span>
            <span class="track-title">{{ track.title }}</span>
            <span class="track-duration">{{ track.duration || '--:--' }}</span>
          </div>
        </div>
      </div>

      <!-- 错误提示 -->
      <div v-if="error" class="error-message">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span>{{ error }}</span>
      </div>
    </div>

    <!-- 音频元素 -->
    <audio 
      ref="audioElement"
      @loadedmetadata="onLoadedMetadata"
      @timeupdate="onTimeUpdate"
      @ended="onEnded"
      @error="onError"
      @loadstart="onLoadStart"
      @canplay="onCanPlay"
      preload="metadata"
    ></audio>
  </div>
</template>

<script>
export default {
  name: 'MusicPlayer',
  data() {
    return {
      minimized: false,
      isPlaying: false,
      loading: false,
      error: null,
      currentTime: 0,
      duration: 0,
      volume: 50,
      shuffle: false,
      currentTrackIndex: 0,
      hasRestoredState: false,
      playlist: [
        {
          title: 'Life',
          artist: '背景音乐',
          url: '/music/life.mp3',
          cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop',
          duration: '3:45'
        }
      ]
    }
  },
  computed: {
    currentTrack() {
      return this.playlist[this.currentTrackIndex] || {}
    },
    progressPercent() {
      return this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0
    }
  },
  mounted() {
    this.initAudio()
    this.loadTrack()
    
    // 恢复保存的播放状态
    this.restorePlaybackState()
    
    // 单曲模式下自动播放（如果没有保存的状态）
    if (this.playlist.length === 1 && !this.hasRestoredState) {
      setTimeout(() => {
        this.togglePlay()
      }, 1000) // 延迟1秒自动播放
    }
    
    // 监听页面卸载，保存状态
    window.addEventListener('beforeunload', this.savePlaybackState)
    
    // 定期保存播放状态（每30秒）
    this.stateSaveInterval = setInterval(() => {
      if (this.isPlaying) {
        this.savePlaybackState()
      }
    }, 30000)
    
    // 监听页面可见性变化，暂停/恢复播放
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
  },
  
  beforeUnmount() {
    // 组件卸载前保存状态
    this.savePlaybackState()
    window.removeEventListener('beforeunload', this.savePlaybackState)
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
    
    // 清除定时器
    if (this.stateSaveInterval) {
      clearInterval(this.stateSaveInterval)
    }
  },
  methods: {
    initAudio() {
      this.$refs.audioElement.volume = this.volume / 100
    },
    
    loadTrack() {
      const track = this.currentTrack
      if (track.url) {
        this.loading = true
        this.error = null
        this.$refs.audioElement.src = track.url
        this.$refs.audioElement.load()
      }
    },
    
    togglePlay() {
      if (this.loading) return
      
      if (this.isPlaying) {
        this.$refs.audioElement.pause()
      } else {
        this.$refs.audioElement.play().catch(err => {
          console.error('播放失败:', err)
          this.error = '播放失败，请检查音频文件'
        })
      }
      this.isPlaying = !this.isPlaying
      this.savePlaybackState()
    },
    
    previousTrack() {
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--
      } else {
        this.currentTrackIndex = this.playlist.length - 1
      }
      this.loadTrack()
      if (this.isPlaying) {
        this.$refs.audioElement.play().catch(err => {
          console.error('播放失败:', err)
          this.error = '播放失败，请检查音频文件'
        })
      }
    },
    
    nextTrack() {
      if (this.currentTrackIndex < this.playlist.length - 1) {
        this.currentTrackIndex++
      } else {
        this.currentTrackIndex = 0
      }
      this.loadTrack()
      if (this.isPlaying) {
        this.$refs.audioElement.play().catch(err => {
          console.error('播放失败:', err)
          this.error = '播放失败，请检查音频文件'
        })
      }
    },
    
    playTrack(index) {
      this.currentTrackIndex = index
      this.loadTrack()
      this.$refs.audioElement.play().catch(err => {
        console.error('播放失败:', err)
        this.error = '播放失败，请检查音频文件'
      })
      this.isPlaying = true
    },
    
    toggleShuffle() {
      this.shuffle = !this.shuffle
    },
    
    toggleMinimize() {
      this.minimized = !this.minimized
    },
    
    seek(event) {
      const rect = event.currentTarget.getBoundingClientRect()
      const percent = (event.clientX - rect.left) / rect.width
      this.$refs.audioElement.currentTime = percent * this.duration
    },
    
    updateVolume() {
      this.$refs.audioElement.volume = this.volume / 100
      this.savePlaybackState()
    },
    
    formatTime(seconds) {
      if (isNaN(seconds)) return '0:00'
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins}:${secs.toString().padStart(2, '0')}`
    },
    
    onLoadStart() {
      this.loading = true
      this.error = null
    },
    
    onCanPlay() {
      this.loading = false
      this.error = null
    },
    
    onLoadedMetadata() {
      this.duration = this.$refs.audioElement.duration
    },
    
    onTimeUpdate() {
      this.currentTime = this.$refs.audioElement.currentTime
    },
    
    onEnded() {
      if (this.playlist.length === 1) {
        // 单曲模式下循环播放
        this.$refs.audioElement.currentTime = 0
        this.$refs.audioElement.play().catch(err => {
          console.error('循环播放失败:', err)
        })
      } else if (this.shuffle) {
        this.currentTrackIndex = Math.floor(Math.random() * this.playlist.length)
        this.loadTrack()
        if (this.isPlaying) {
          this.$refs.audioElement.play().catch(err => {
            console.error('播放失败:', err)
          })
        }
      } else {
        this.nextTrack()
      }
    },
    
    onError() {
      this.loading = false
      this.error = '音频加载失败，请检查网络连接'
      console.error('音频加载失败')
    },
    
    // 保存播放状态到localStorage
    savePlaybackState() {
      const state = {
        isPlaying: this.isPlaying,
        currentTime: this.currentTime,
        volume: this.volume,
        currentTrackIndex: this.currentTrackIndex,
        timestamp: Date.now()
      }
      localStorage.setItem('musicPlayerState', JSON.stringify(state))
    },
    
    // 恢复播放状态
    restorePlaybackState() {
      const savedState = localStorage.getItem('musicPlayerState')
      if (savedState) {
        try {
          const state = JSON.parse(savedState)
          // 检查状态是否过期（超过1小时）
          if (Date.now() - state.timestamp < 3600000) {
            this.volume = state.volume || 50
            this.currentTrackIndex = state.currentTrackIndex || 0
            this.hasRestoredState = true
            
            // 恢复音量
            this.$refs.audioElement.volume = this.volume / 100
            
            // 恢复播放状态
            if (state.isPlaying) {
              setTimeout(() => {
                this.togglePlay()
              }, 500)
            }
          }
        } catch (e) {
          console.error('恢复播放状态失败:', e)
        }
      }
    },
    
    // 供外部调用的恢复状态方法
    restoreState(state) {
      if (state) {
        this.volume = state.volume || 50
        this.currentTrackIndex = state.currentTrackIndex || 0
        this.hasRestoredState = true
        
        if (state.isPlaying) {
          this.togglePlay()
        }
      }
    },
    
    // 处理页面可见性变化
    handleVisibilityChange() {
      if (document.hidden) {
        // 页面隐藏时暂停播放
        if (this.isPlaying) {
          this.$refs.audioElement.pause()
          this.isPlaying = false
        }
      } else {
        // 页面显示时恢复播放
        const savedState = localStorage.getItem('musicPlayerState')
        if (savedState) {
          try {
            const state = JSON.parse(savedState)
            if (state.isPlaying && !this.isPlaying) {
              this.$refs.audioElement.play().catch(err => {
                console.error('恢复播放失败:', err)
              })
              this.isPlaying = true
            }
          } catch (e) {
            console.error('恢复播放状态失败:', e)
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.music-player {
  position: relative;
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

.loading-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.player-container {
  width: 320px;
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

.track-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.default-cover {
  color: #ccc;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 20px;
  gap: 16px;
}

/* 单曲模式下的样式优化 */
.player-container:has(.controls:only-child) .controls {
  gap: 0;
}

.control-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s;
}

.control-btn:hover:not(:disabled) {
  background: #f0f0f0;
  color: #333;
}

.control-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
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

.play-btn:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.play-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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

.playlist {
  border-top: 1px solid #f0f0f0;
}

.playlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #fafafa;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.shuffle-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
}

.shuffle-btn:hover,
.shuffle-btn.active {
  background: #f0f0f0;
  color: #667eea;
}

.playlist-items {
  max-height: 200px;
  overflow-y: auto;
}

.playlist-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f5f5f5;
}

.playlist-item:hover {
  background: #f8f9fa;
}

.playlist-item.active {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  color: #667eea;
}

.track-number {
  width: 20px;
  font-size: 12px;
  color: #999;
  margin-right: 12px;
}

.playlist-item.active .track-number {
  color: #667eea;
}

.playlist-item .track-title {
  flex: 1;
  font-size: 13px;
  margin: 0;
}

.track-duration {
  font-size: 12px;
  color: #999;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #fee;
  color: #c33;
  font-size: 12px;
  border-top: 1px solid #fcc;
}

.error-message svg {
  flex-shrink: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .music-player {
    bottom: 10px;
    right: 10px;
  }
  
  .player-container {
    width: 280px;
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