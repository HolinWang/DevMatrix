<template>
  <div class="simple-music-player" :class="{ 'player-minimized': minimized }">
    <!-- 最小化时的播放按钮 -->
    <div v-if="minimized" class="minimized-player" @click="toggleMinimize">
      <div class="play-icon" :class="{ 'playing': isPlaying }">
        <svg v-if="!isPlaying" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
      </div>
      <div class="minimized-wave" v-if="isPlaying">
        <div class="wave-bar"></div>
        <div class="wave-bar"></div>
        <div class="wave-bar"></div>
      </div>
    </div>

    <!-- 完整播放器界面 -->
    <div v-else class="player-container">
      <!-- 自动播放提示 -->
      <div v-if="showAutoplayHint" class="autoplay-hint" :class="{ 'wechat-hint': isWeChat, 'mobile-hint': isMobile && !isWeChat }">
        <span v-if="!isWeChat && !isMobile">🎵 点击任意位置开始播放背景音乐</span>
        <span v-else-if="isWeChat">🎵 微信浏览器需要点击播放按钮开始音乐</span>
        <span v-else>🎵 移动端需要点击播放按钮开始音乐</span>
        <button @click="hideAutoplayHint" class="hint-close">×</button>
      </div>
      
      <!-- 播放器头部 -->
      <div class="player-header">
        <div class="header-content">
          <div class="header-icon">🎵</div>
          <h3>背景音乐</h3>
        </div>
        <button class="minimize-btn" @click="toggleMinimize">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13H5v-2h14v2z"/>
          </svg>
        </button>
      </div>

      <!-- 当前播放信息 -->
      <div class="current-track">
        <div class="track-cover">
          <div class="cover-container" :class="{ 'rotating': isPlaying }">
            <div class="cover-inner">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="track-info">
          <div class="track-title">{{ currentTrack.title }}</div>
          <div class="track-artist">{{ currentTrack.artist }}</div>
        </div>
      </div>

      <!-- 播放控制 -->
      <div class="controls">
        <button class="play-btn" @click="togglePlay" :class="{ 'playing': isPlaying, 'wechat-btn': isWeChat }">
          <svg v-if="!isPlaying" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        </button>
        <div v-if="isWeChat && !isPlaying" class="wechat-play-hint">
          点击播放
        </div>
      </div>

      <!-- 进度条 -->
      <div class="progress-container">
        <div class="time-display">
          <span>{{ formatTime(currentTime) }}</span>
          <span>{{ formatTime(duration) }}</span>
        </div>
        <div class="progress-bar" @click="seek">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
          <div class="progress-handle" :style="{ left: progressPercent + '%' }"></div>
        </div>
      </div>

      <!-- 音量控制 -->
      <div class="volume-control">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
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
      isWeChat: false, // 微信浏览器标识
      isMobile: false, // 移动端标识
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
    
    // 确保只在客户端执行
    if (typeof window !== 'undefined') {
      // 检测微信浏览器和移动端
      this.isWeChat = /MicroMessenger/i.test(navigator.userAgent)
      this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      console.log('🔍 设备检测 - 微信:', this.isWeChat, '移动端:', this.isMobile)
      
      this.initGlobalAudio()
      
      // 开发模式下的调试工具
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
        },
        // 微信浏览器专用调试工具
        wechatTest: () => {
          const isWeChat = /MicroMessenger/i.test(navigator.userAgent)
          console.log('📱 微信浏览器检测:', isWeChat)
          console.log('📱 User Agent:', navigator.userAgent)
          if (isWeChat) {
            console.log('📱 触发微信浏览器播放测试')
            this.showWeChatAutoplayHint()
            this.setupWeChatInteractionPlay()
          } else {
            console.log('📱 非微信浏览器')
          }
        },
        forceWeChatPlay: () => {
          const globalAudio = document.getElementById('global-audio')
          if (globalAudio) {
            console.log('📱 强制微信浏览器播放')
            globalAudio.play().then(() => {
              this.isPlaying = true
              console.log('🎵 强制播放成功')
            }).catch(err => {
              console.log('❌ 强制播放失败:', err)
            })
          }
        }
      }
    }
  },
      methods: {
      initGlobalAudio() {
        // 确保只在客户端执行
        if (typeof window === 'undefined') return
        
        if (this.audioInitialized) {
          console.log('🔄 音频已初始化，跳过重复初始化')
          return
        }
        
        // 检测微信浏览器
        const isWeChat = /MicroMessenger/i.test(navigator.userAgent)
        console.log('🔍 检测到微信浏览器:', isWeChat)
        
        // 检查是否已经有全局音频元素
        let globalAudio = document.getElementById('global-audio')
        if (!globalAudio) {
          console.log('🎵 创建新的音频元素')
          globalAudio = document.createElement('audio')
          globalAudio.id = 'global-audio'
          globalAudio.src = '/music/life.mp3'
          globalAudio.preload = 'auto'
          globalAudio.loop = true
          
          // 微信浏览器特殊处理
          if (isWeChat) {
            globalAudio.setAttribute('webkit-playsinline', 'true')
            globalAudio.setAttribute('playsinline', 'true')
            globalAudio.setAttribute('x5-playsinline', 'true')
            globalAudio.setAttribute('x5-video-player-type', 'h5')
            globalAudio.setAttribute('x5-video-player-fullscreen', 'false')
          }
          
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
        if (typeof window === 'undefined') return
        
        const globalAudio = document.getElementById('global-audio')
        if (globalAudio) {
          if (this.isPlaying) {
            globalAudio.pause()
            this.isPlaying = false
          } else {
            // 检测微信浏览器
            const isWeChat = /MicroMessenger/i.test(navigator.userAgent)
            
            if (isWeChat) {
              console.log('📱 微信浏览器播放按钮点击')
              // 微信浏览器需要特殊处理
              const tryPlay = () => {
                globalAudio.play().then(() => {
                  this.isPlaying = true
                  this.savePlaybackState()
                  console.log('🎵 微信浏览器播放成功！')
                }).catch(err => {
                  console.log('⚠️ 微信浏览器播放失败，重试中...', err.message)
                  // 延迟重试
                  setTimeout(() => {
                    if (!this.isPlaying) {
                      tryPlay()
                    }
                  }, 500)
                })
              }
              tryPlay()
            } else {
              globalAudio.play().then(() => {
                this.isPlaying = true
              }).catch(err => {
                console.error('播放失败:', err)
                this.isPlaying = false
              })
            }
          }
          this.savePlaybackState()
        }
      },
    
    toggleMinimize() {
      this.minimized = !this.minimized
    },
    
          seek(event) {
        if (typeof window === 'undefined') return
        
        const globalAudio = document.getElementById('global-audio')
        if (globalAudio) {
          const rect = event.currentTarget.getBoundingClientRect()
          const percent = (event.clientX - rect.left) / rect.width
          globalAudio.currentTime = percent * this.duration
        }
      },
      
      updateVolume() {
        if (typeof window === 'undefined') return
        
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
        if (typeof window === 'undefined') return
        
        const state = {
          isPlaying: this.isPlaying,
          currentTime: this.currentTime,
          volume: this.volume,
          timestamp: Date.now()
        }
        localStorage.setItem('musicPlayerState', JSON.stringify(state))
      },
      
      restorePlaybackState() {
        if (typeof window === 'undefined') return
        
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
        if (typeof window === 'undefined') return
        
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
        
        // 检测移动端和微信浏览器
        const isWeChat = /MicroMessenger/i.test(navigator.userAgent)
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
        
        console.log('📱 设备检测 - 微信:', isWeChat, '移动端:', isMobile, 'iOS:', isIOS)
        
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
        
        // 微信浏览器特殊处理
        if (isWeChat) {
          console.log('📱 微信浏览器，使用特殊播放策略')
          this.showWeChatAutoplayHint()
          this.setupWeChatInteractionPlay()
          return
        }
        
        // 移动端特殊处理
        if (isMobile) {
          console.log('📱 移动端浏览器，使用移动端播放策略')
          this.showMobileAutoplayHint()
          this.setupMobileInteractionPlay()
          return
        }
        
        // 桌面端尝试播放
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
        if (typeof window === 'undefined') return
        
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
      
      // 微信浏览器专用方法
      showWeChatAutoplayHint() {
        this.showAutoplayHint = true
        console.log('💬 显示微信浏览器专用提示')
        
        // 创建微信专用全局提示
        this.showWeChatGlobalHint()
        
        // 10秒后自动隐藏提示
        setTimeout(() => {
          this.showAutoplayHint = false
        }, 10000)
      },
      
      setupWeChatInteractionPlay() {
        if (typeof window === 'undefined') return
        
        console.log('📱 设置微信浏览器专用交互监听')
        
        const playOnWeChatInteraction = () => {
          console.log('🎯 微信浏览器检测到用户交互，尝试播放音乐')
          const globalAudio = document.getElementById('global-audio')
          if (globalAudio && !this.isPlaying) {
            // 微信浏览器需要多次尝试
            const tryPlay = () => {
              globalAudio.play().then(() => {
                this.isPlaying = true
                this.savePlaybackState()
                this.showAutoplayHint = false
                console.log('🎵 微信浏览器音乐播放成功！')
              }).catch(err => {
                console.log('⚠️ 微信浏览器播放失败，重试中...', err.message)
                // 延迟重试
                setTimeout(() => {
                  if (!this.isPlaying) {
                    tryPlay()
                  }
                }, 1000)
              })
            }
            
            tryPlay()
          }
          
          // 移除事件监听器
          document.removeEventListener('touchstart', playOnWeChatInteraction)
          document.removeEventListener('click', playOnWeChatInteraction)
          document.removeEventListener('WeixinJSBridgeReady', playOnWeChatInteraction)
        }
        
        // 微信浏览器专用事件监听
        document.addEventListener('touchstart', playOnWeChatInteraction, { once: true })
        document.addEventListener('click', playOnWeChatInteraction, { once: true })
        
        // 监听微信JS桥接准备完成事件
        if (typeof WeixinJSBridge !== 'undefined') {
          WeixinJSBridge.on('menu:share:appmessage', playOnWeChatInteraction)
        } else {
          document.addEventListener('WeixinJSBridgeReady', playOnWeChatInteraction, { once: true })
        }
      },
      
      showWeChatGlobalHint() {
        if (typeof window === 'undefined') return
        
        // 创建微信专用全局提示元素
        let wechatHint = document.getElementById('wechat-music-hint')
        if (!wechatHint) {
          wechatHint = document.createElement('div')
          wechatHint.id = 'wechat-music-hint'
          wechatHint.innerHTML = `
            <div style="
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 20px 25px;
              border-radius: 15px;
              font-size: 16px;
              font-weight: 500;
              text-align: center;
              box-shadow: 0 10px 30px rgba(102, 126, 234, 0.6);
              z-index: 10002;
              animation: wechatSlideIn 0.5s ease-out;
              max-width: 280px;
              line-height: 1.5;
            ">
              🎵 点击任意位置开始播放背景音乐
              <br><small style="opacity: 0.8; font-size: 14px;">微信浏览器需要用户交互才能播放音频</small>
              <button onclick="this.parentElement.parentElement.remove()" style="
                background: none;
                border: none;
                color: white;
                margin-top: 15px;
                font-size: 16px;
                cursor: pointer;
                padding: 8px 16px;
                border-radius: 20px;
                border: 1px solid rgba(255,255,255,0.3);
                transition: all 0.2s;
              " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.2)'" onmouseout="this.style.backgroundColor='transparent'">知道了</button>
            </div>
            <style>
              @keyframes wechatSlideIn {
                from { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
                to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
              }
            </style>
          `
          document.body.appendChild(wechatHint)
          
          // 点击提示时移除
          wechatHint.addEventListener('click', () => {
            wechatHint.remove()
          })
          
          // 15秒后自动移除
          setTimeout(() => {
            if (wechatHint.parentNode) {
              wechatHint.remove()
            }
          }, 15000)
        }
      },
      
      // 移动端专用方法
      showMobileAutoplayHint() {
        this.showAutoplayHint = true
        console.log('📱 显示移动端专用提示')
        
        // 创建移动端专用全局提示
        this.showMobileGlobalHint()
        
        // 8秒后自动隐藏提示
        setTimeout(() => {
          this.showAutoplayHint = false
        }, 8000)
      },
      
      setupMobileInteractionPlay() {
        if (typeof window === 'undefined') return
        
        console.log('📱 设置移动端专用交互监听')
        
        const playOnMobileInteraction = () => {
          console.log('🎯 移动端检测到用户交互，尝试播放音乐')
          const globalAudio = document.getElementById('global-audio')
          if (globalAudio && !this.isPlaying) {
            // 移动端需要特殊处理
            const tryPlay = () => {
              globalAudio.play().then(() => {
                this.isPlaying = true
                this.savePlaybackState()
                this.showAutoplayHint = false
                console.log('🎵 移动端音乐播放成功！')
              }).catch(err => {
                console.log('⚠️ 移动端播放失败，重试中...', err.message)
                // 延迟重试，移动端可能需要多次尝试
                setTimeout(() => {
                  if (!this.isPlaying) {
                    tryPlay()
                  }
                }, 1000)
              })
            }
            
            tryPlay()
          }
          
          // 移除事件监听器
          document.removeEventListener('touchstart', playOnMobileInteraction)
          document.removeEventListener('click', playOnMobileInteraction)
          document.removeEventListener('touchend', playOnMobileInteraction)
        }
        
        // 移动端专用事件监听
        document.addEventListener('touchstart', playOnMobileInteraction, { once: true })
        document.addEventListener('click', playOnMobileInteraction, { once: true })
        document.addEventListener('touchend', playOnMobileInteraction, { once: true })
      },
      
      showMobileGlobalHint() {
        if (typeof window === 'undefined') return
        
        // 创建移动端专用全局提示元素
        let mobileHint = document.getElementById('mobile-music-hint')
        if (!mobileHint) {
          mobileHint = document.createElement('div')
          mobileHint.id = 'mobile-music-hint'
          mobileHint.innerHTML = `
            <div style="
              position: fixed;
              top: 20px;
              left: 20px;
              right: 20px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 15px 20px;
              border-radius: 12px;
              font-size: 14px;
              font-weight: 500;
              text-align: center;
              box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
              z-index: 10002;
              animation: mobileSlideIn 0.5s ease-out;
              line-height: 1.4;
            ">
              🎵 点击任意位置开始播放背景音乐
              <br><small style="opacity: 0.8; font-size: 12px;">移动端需要用户交互才能播放音频</small>
              <button onclick="this.parentElement.parentElement.remove()" style="
                background: none;
                border: none;
                color: white;
                margin-top: 10px;
                font-size: 14px;
                cursor: pointer;
                padding: 6px 12px;
                border-radius: 15px;
                border: 1px solid rgba(255,255,255,0.3);
                transition: all 0.2s;
              " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.2)'" onmouseout="this.style.backgroundColor='transparent'">知道了</button>
            </div>
            <style>
              @keyframes mobileSlideIn {
                from { transform: translateY(-20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
              }
            </style>
          `
          document.body.appendChild(mobileHint)
          
          // 点击提示时移除
          mobileHint.addEventListener('click', () => {
            mobileHint.remove()
          })
          
          // 12秒后自动移除
          setTimeout(() => {
            if (mobileHint.parentNode) {
              mobileHint.remove()
            }
          }, 12000)
        }
      },
      
      onLoadedMetadata() {
        if (typeof window === 'undefined') return
        
        const globalAudio = document.getElementById('global-audio')
        if (globalAudio) {
          this.duration = globalAudio.duration
        }
      },
      
      onTimeUpdate() {
        if (typeof window === 'undefined') return
        
        const globalAudio = document.getElementById('global-audio')
        if (globalAudio) {
          this.currentTime = globalAudio.currentTime
        }
      },
      
      onEnded() {
        if (typeof window === 'undefined') return
        
        // 单曲循环播放
        const globalAudio = document.getElementById('global-audio')
        if (globalAudio) {
          globalAudio.currentTime = 0
          this.togglePlay()
        }
      },
      
      onError() {
        if (typeof window === 'undefined') return
        console.error('音频加载失败')
      },
      
      checkAutoPlay() {
        if (typeof window === 'undefined') return
        
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
        if (typeof window === 'undefined') return
        
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
        // 确保只在客户端执行
        if (typeof window === 'undefined') return
        
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.autoplay-hint {
  position: absolute;
  top: -45px;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  z-index: 10000;
  animation: slideIn 0.3s ease-out;
}

.autoplay-hint.wechat-hint {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
  font-size: 11px;
}

.autoplay-hint.mobile-hint {
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
  box-shadow: 0 4px 15px rgba(78, 205, 196, 0.4);
  font-size: 11px;
}

@keyframes slideIn {
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.hint-close {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.hint-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.player-minimized {
  width: 48px;
  height: 48px;
}

.minimized-player {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.minimized-player::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.minimized-player:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.minimized-player:hover::before {
  opacity: 1;
}

.play-icon {
  color: white;
  transition: all 0.3s ease;
  z-index: 1;
}

.play-icon.playing {
  animation: gentlePulse 2s ease-in-out infinite;
}

.minimized-wave {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2px;
  z-index: 1;
}

.wave-bar {
  width: 2px;
  height: 8px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1px;
  animation: wave 1.2s ease-in-out infinite;
}

.wave-bar:nth-child(1) { animation-delay: 0s; }
.wave-bar:nth-child(2) { animation-delay: 0.2s; }
.wave-bar:nth-child(3) { animation-delay: 0.4s; }

@keyframes wave {
  0%, 100% { height: 8px; }
  50% { height: 16px; }
}

.player-container {
  width: 240px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.player-container:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.player-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
}

.player-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-icon {
  font-size: 16px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-2px); }
}

.player-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.minimize-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.minimize-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.1);
}

.current-track {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(255, 255, 255, 0.5);
}

.track-info {
  flex: 1;
}

.track-title {
  font-weight: 600;
  font-size: 13px;
  color: #2c3e50;
  margin-bottom: 2px;
  line-height: 1.3;
}

.track-artist {
  font-size: 11px;
  color: #7f8c8d;
  font-weight: 500;
}

.track-cover {
  margin-right: 12px;
}

.cover-container {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.cover-container.rotating {
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.cover-inner {
  color: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
}

.default-cover {
  color: #667eea;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
}

.play-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
}

.play-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.play-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.play-btn:hover::before {
  opacity: 1;
}

.play-btn.playing {
  animation: gentlePulse 2s ease-in-out infinite;
}

.play-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.play-btn.playing {
  animation: pulse 2s infinite;
}

.progress-container {
  padding: 0 16px 12px;
}

.time-display {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #7f8c8d;
  margin-bottom: 6px;
  font-weight: 500;
}

.progress-bar {
  width: 100%;
  height: 3px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.progress-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
  transition: width 0.1s ease;
  position: relative;
}

.progress-handle {
  position: absolute;
  top: 50%;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.progress-bar:hover .progress-handle {
  opacity: 1;
}

.progress-handle {
  position: absolute;
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.volume-control {
  display: flex;
  align-items: center;
  padding: 0 16px 12px;
  gap: 10px;
}

.volume-control svg {
  color: #7f8c8d;
  flex-shrink: 0;
}

.volume-slider {
  flex: 1;
  height: 3px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  outline: none;
  -webkit-appearance: none;
  cursor: pointer;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.volume-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}

@keyframes gentlePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .player-container {
    width: 220px;
  }
  
  .player-minimized {
    width: 44px;
    height: 44px;
  }
  
  .minimized-player {
    width: 44px;
    height: 44px;
  }
  
  .play-icon svg {
    width: 16px;
    height: 16px;
  }
  
  .player-header {
    padding: 10px 14px;
  }
  
  .player-header h3 {
    font-size: 14px;
  }
  
  .current-track {
    padding: 12px 14px;
  }
  
  .track-cover {
    width: 40px;
    height: 40px;
  }
  
  .controls {
    padding: 12px 14px;
  }
  
  .progress-container {
    padding: 0 14px 10px;
  }
  
  .volume-control {
    padding: 0 14px 10px;
  }
}
</style> 