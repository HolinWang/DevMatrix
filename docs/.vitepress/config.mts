import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "凡人修仙传：前端版",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '修炼录', link: '/' },
      { text: '修炼秘籍', link: '/markdown-examples' },
      { text: '音乐播放器', link: '/music-player-guide' }
    ],

    sidebar: [
      {
        text: '修炼秘籍',
        items: [
          { text: 'Markdown 示例', link: '/markdown-examples' },
          { text: '运行时 API 示例', link: '/api-examples' }
        ]
      },
      {
        text: '工具指南',
        items: [
          { text: '背景音乐播放器', link: '/music-player-guide' },
          { text: '音乐播放器测试', link: '/test-music' },
          { text: '全局播放器测试', link: '/test-global-music' },
          { text: '自动播放测试', link: '/test-autoplay' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
