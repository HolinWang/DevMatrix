<template>
  <ClientOnly>
    <div class="global-music-player">
      <SimpleMusicPlayer />
    </div>
  </ClientOnly>
</template>

<script>
import SimpleMusicPlayer from './SimpleMusicPlayer.vue'

export default {
  name: 'GlobalMusicPlayer',
  components: {
    SimpleMusicPlayer
  },
  mounted() {
    // 确保组件在所有页面都显示
    console.log('GlobalMusicPlayer mounted on:', this.$route?.path || 'unknown page')
  }
}
</script>

<style scoped>
.global-music-player {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}
</style> 