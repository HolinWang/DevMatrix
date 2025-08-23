<template>
  <div>
    <!-- 使用默认主题的布局 -->
    <Layout>
      <template #aside-outline-before>
        <slot name="aside-outline-before" />
      </template>
      <template #aside-outline-after>
        <slot name="aside-outline-after" />
      </template>
      <template #aside-ads-before>
        <slot name="aside-ads-before" />
      </template>
      <template #aside-ads-after>
        <slot name="aside-ads-after" />
      </template>
      <template #doc-footer-before>
        <slot name="doc-footer-before" />
      </template>
      <template #doc-before>
        <slot name="doc-before" />
      </template>
      <template #doc-after>
        <slot name="doc-after" />
      </template>
      <template #doc-top>
        <slot name="doc-top" />
      </template>
      <template #doc-bottom>
        <slot name="doc-bottom" />
      </template>
      <template #content-top>
        <slot name="content-top" />
      </template>
      <template #content-bottom>
        <slot name="content-bottom" />
      </template>
      <template #page-top>
        <slot name="page-top" />
      </template>
      <template #page-bottom>
        <slot name="page-bottom" />
      </template>
      <template #nav-bar-title-before>
        <slot name="nav-bar-title-before" />
      </template>
      <template #nav-bar-title-after>
        <slot name="nav-bar-title-after" />
      </template>
      <template #nav-bar-content-before>
        <slot name="nav-bar-content-before" />
      </template>
      <template #nav-bar-content-after>
        <slot name="nav-bar-content-after" />
      </template>
      <template #nav-screen-content-before>
        <slot name="nav-screen-content-before" />
      </template>
      <template #nav-screen-content-after>
        <slot name="nav-screen-content-after" />
      </template>
    </Layout>
    
    <!-- 全局音乐播放器 -->
    <GlobalMusicPlayer />
  </div>
</template>

<script>
import { Layout as VPLayout } from 'vitepress/theme'
import GlobalMusicPlayer from './GlobalMusicPlayer.vue'

export default {
  name: 'CustomLayout',
  components: {
    Layout: VPLayout,
    GlobalMusicPlayer
  }
}
</script> 