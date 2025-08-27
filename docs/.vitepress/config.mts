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

    sidebar: {
      '/realms/realm-01/': [
        { text: '⚡ 语义HTML基础', link: '/lessons/lesson-01/#语义html基础' },
        { text: '🎨 CSS盒模型与布局', link: '/lessons/lesson-02/#css盒模型与布局' },
        { text: '🏗️ Flexbox与Grid布局', link: '/lessons/lesson-03/#flexbox与grid布局' },
        { text: '🔄 JavaScript基础语法', link: '/lessons/lesson-04/#javascript基础语法' },
        { text: '🧠 闭包与作用域', link: '/lessons/lesson-05/#闭包与作用域' },
        { text: '⚙️ 事件循环与异步编程', link: '/lessons/lesson-06/#事件循环与异步编程' }
      ],
      '/lessons/lesson-01/': [
        { text: '⚡ 语义HTML基础', link: '/lessons/lesson-01/#语义html基础' },
        { text: '🎨 CSS盒模型与布局', link: '/lessons/lesson-02/#css盒模型与布局' },
        { text: '🏗️ Flexbox与Grid布局', link: '/lessons/lesson-03/#flexbox与grid布局' },
        { text: '🔄 JavaScript基础语法', link: '/lessons/lesson-04/#javascript基础语法' },
        { text: '🧠 闭包与作用域', link: '/lessons/lesson-05/#闭包与作用域' },
        { text: '⚙️ 事件循环与异步编程', link: '/lessons/lesson-06/#事件循环与异步编程' }
      ],
      '/lessons/lesson-02/': [
        { text: '⚡ 语义HTML基础', link: '/lessons/lesson-01/#语义html基础' },
        { text: '🎨 CSS盒模型与布局', link: '/lessons/lesson-02/#css盒模型与布局' },
        { text: '🏗️ Flexbox与Grid布局', link: '/lessons/lesson-03/#flexbox与grid布局' },
        { text: '🔄 JavaScript基础语法', link: '/lessons/lesson-04/#javascript基础语法' },
        { text: '🧠 闭包与作用域', link: '/lessons/lesson-05/#闭包与作用域' },
        { text: '⚙️ 事件循环与异步编程', link: '/lessons/lesson-06/#事件循环与异步编程' }
      ],
      '/lessons/lesson-03/': [
        { text: '⚡ 语义HTML基础', link: '/lessons/lesson-01/#语义html基础' },
        { text: '🎨 CSS盒模型与布局', link: '/lessons/lesson-02/#css盒模型与布局' },
        { text: '🏗️ Flexbox与Grid布局', link: '/lessons/lesson-03/#flexbox与grid布局' },
        { text: '🔄 JavaScript基础语法', link: '/lessons/lesson-04/#javascript基础语法' },
        { text: '🧠 闭包与作用域', link: '/lessons/lesson-05/#闭包与作用域' },
        { text: '⚙️ 事件循环与异步编程', link: '/lessons/lesson-06/#事件循环与异步编程' }
      ],
      '/lessons/lesson-04/': [
        { text: '⚡ 语义HTML基础', link: '/lessons/lesson-01/#语义html基础' },
        { text: '🎨 CSS盒模型与布局', link: '/lessons/lesson-02/#css盒模型与布局' },
        { text: '🏗️ Flexbox与Grid布局', link: '/lessons/lesson-03/#flexbox与grid布局' },
        { text: '🔄 JavaScript基础语法', link: '/lessons/lesson-04/#javascript基础语法' },
        { text: '🧠 闭包与作用域', link: '/lessons/lesson-05/#闭包与作用域' },
        { text: '⚙️ 事件循环与异步编程', link: '/lessons/lesson-06/#事件循环与异步编程' }
      ],
      '/lessons/lesson-05/': [
        { text: '⚡ 语义HTML基础', link: '/lessons/lesson-01/#语义html基础' },
        { text: '🎨 CSS盒模型与布局', link: '/lessons/lesson-02/#css盒模型与布局' },
        { text: '🏗️ Flexbox与Grid布局', link: '/lessons/lesson-03/#flexbox与grid布局' },
        { text: '🔄 JavaScript基础语法', link: '/lessons/lesson-04/#javascript基础语法' },
        { text: '🧠 闭包与作用域', link: '/lessons/lesson-05/#闭包与作用域' },
        { text: '⚙️ 事件循环与异步编程', link: '/lessons/lesson-06/#事件循环与异步编程' }
      ],
      '/lessons/lesson-06/': [
        { text: '⚡ 语义HTML基础', link: '/lessons/lesson-01/#语义html基础' },
        { text: '🎨 CSS盒模型与布局', link: '/lessons/lesson-02/#css盒模型与布局' },
        { text: '🏗️ Flexbox与Grid布局', link: '/lessons/lesson-03/#flexbox与grid布局' },
        { text: '🔄 JavaScript基础语法', link: '/lessons/lesson-04/#javascript基础语法' },
        { text: '🧠 闭包与作用域', link: '/lessons/lesson-05/#闭包与作用域' },
        { text: '⚙️ 事件循环与异步编程', link: '/lessons/lesson-06/#事件循环与异步编程' }
      ],
      // 暂时注释掉其他境的配置，避免死链接错误
      /*
      '/realms/realm-02/': [
        {
          text: '第二境【筑基期】',
          items: [
            { text: '境目录', link: '/realms/realm-02/' },
            { text: '修炼 01：紫府开辟 - 工程化基础与Webpack', link: '/lessons/lesson-07/#工程化基础与webpack' },
            { text: '修炼 02：真元凝结 - Babel与转译工具', link: '/lessons/lesson-08/#babel与转译工具' },
            { text: '修炼 03：时空符阵 - Git版本控制', link: '/lessons/lesson-09/#git版本控制' },
            { text: '修炼 04：法宝库藏 - npm包管理', link: '/lessons/lesson-10/#npm包管理' },
            { text: '修炼 05：灵剑铸造 - TypeScript基础', link: '/lessons/lesson-11/#typescript基础' },
            { text: '修炼 06：神通御法 - ES6+新特性', link: '/lessons/lesson-12/#es6新特性' }
          ]
        }
      ],
      '/realms/realm-03/': [
        {
          text: '第三境【金丹期】',
          items: [
            { text: '境目录', link: '/realms/realm-03/' },
            { text: '修炼 01：金丹祭炼 - React基础与JSX', link: '/lessons/lesson-13/#react基础与jsx' },
            { text: '修炼 02：人剑合一 - React组件与生命周期', link: '/lessons/lesson-14/#react组件与生命周期' },
            { text: '修炼 03：符咒响应 - Vue基础与响应式', link: '/lessons/lesson-15/#vue基础与响应式' },
            { text: '修炼 04：依赖大阵 - Angular基础架构', link: '/lessons/lesson-16/#angular基础架构' },
            { text: '修炼 05：乾坤定法 - Redux/Pinia状态管理', link: '/lessons/lesson-17/#redux-pinia状态管理' },
            { text: '修炼 06：玄机通晓 - Hooks与Composition API', link: '/lessons/lesson-18/#hooks与composition-api' }
          ]
        }
      ],
      '/realms/realm-04/': [
        {
          text: '第四境【元婴期】',
          items: [
            { text: '境目录', link: '/realms/realm-04/' },
            { text: '修炼 01：法相凝结 - HTTP协议与CORS', link: '/lessons/lesson-19/#http协议与cors' },
            { text: '修炼 02：不朽金身 - 缓存策略与CDN', link: '/lessons/lesson-20/#缓存策略与cdn' },
            { text: '修炼 03：分身显圣 - SSR与Next.js/Nuxt.js', link: '/lessons/lesson-21/#ssr与next-js-nuxt-js' },
            { text: '修炼 04：缩地成寸 - 懒加载与代码分割', link: '/lessons/lesson-22/#懒加载与代码分割' },
            { text: '修炼 05：雷阵渡劫 - Jest单元测试', link: '/lessons/lesson-23/#jest单元测试' },
            { text: '修炼 06：天眼断障 - 性能监控与优化', link: '/lessons/lesson-24/#性能监控与优化' }
          ]
        }
      ],
      '/realms/realm-05/': [
        {
          text: '第五境【化神期】',
          items: [
            { text: '境目录', link: '/realms/realm-05/' },
            { text: '修炼 01：天地法则 - WebGL图形渲染', link: '/lessons/lesson-25/#webgl图形渲染' },
            { text: '修炼 02：虚实边界 - Electron跨平台开发', link: '/lessons/lesson-26/#electron跨平台开发' },
            { text: '修炼 03：引擎本源 - V8引擎与事件循环', link: '/lessons/lesson-27/#v8引擎与事件循环' },
            { text: '修炼 04：跨界法身 - WebAssembly与Rust', link: '/lessons/lesson-28/#webassembly与rust' },
            { text: '修炼 05：长生界域 - PWA与离线应用', link: '/lessons/lesson-29/#pwa与离线应用' },
            { text: '修炼 06：微乾坤袋 - 微前端架构', link: '/lessons/lesson-30/#微前端架构' }
          ]
        }
      ],
      '/realms/realm-06/': [
        {
          text: '第六境【炼虚期】',
          items: [
            { text: '境目录', link: '/realms/realm-06/' },
            { text: '修炼 01：混元神柱 - Node.js后端开发', link: '/lessons/lesson-31/#node-js后端开发' },
            { text: '修炼 02：天道统御 - GraphQL API设计', link: '/lessons/lesson-32/#graphql-api设计' },
            { text: '修炼 03：洞天开辟 - Docker容器化', link: '/lessons/lesson-33/#docker容器化' },
            { text: '修炼 04：结界御乱 - BFF架构模式', link: '/lessons/lesson-34/#bff架构模式' },
            { text: '修炼 05：飞升天梯 - CI/CD自动化', link: '/lessons/lesson-35/#ci-cd自动化' },
            { text: '修炼 06：云台仙府 - AWS云服务', link: '/lessons/lesson-36/#aws云服务' }
          ]
        }
      ],
      '/realms/realm-07/': [
        {
          text: '第七境【合体期】',
          items: [
            { text: '境目录', link: '/realms/realm-07/' },
            { text: '修炼 01：器灵参透 - Babel AST编译原理', link: '/lessons/lesson-37/#babel-ast编译原理' },
            { text: '修炼 02：渲染天道 - 浏览器内核与渲染', link: '/lessons/lesson-38/#浏览器内核与渲染' },
            { text: '修炼 03：原生大道 - Web Components', link: '/lessons/lesson-39/#web-components' },
            { text: '修炼 04：创世法则 - 低代码平台开发', link: '/lessons/lesson-40/#低代码平台开发' },
            { text: '修炼 05：优化雷云 - 编译优化技术', link: '/lessons/lesson-41/#编译优化技术' },
            { text: '修炼 06：DOM天劫 - 大规模DOM优化', link: '/lessons/lesson-42/#大规模dom优化' }
          ]
        }
      ],
      '/realms/realm-08/': [
        {
          text: '第八境【大乘期】',
          items: [
            { text: '境目录', link: '/realms/realm-08/' },
            { text: '修炼 01：天道议会 - TC39与ES标准制定', link: '/lessons/lesson-43/#tc39与es标准制定' },
            { text: '修炼 02：神格铸造 - W3C与Web标准', link: '/lessons/lesson-44/#w3c与web标准' },
            { text: '修炼 03：神国衍化 - 开源项目贡献', link: '/lessons/lesson-45/#开源项目贡献' },
            { text: '修炼 04：三界因果 - 性能监控与Sentry', link: '/lessons/lesson-46/#性能监控与sentry' },
            { text: '修炼 05：千星证道 - 高质量开源项目', link: '/lessons/lesson-47/#高质量开源项目' },
            { text: '修炼 06：开宗立派 - 原创工具与框架', link: '/lessons/lesson-48/#原创工具与框架' }
          ]
        }
      ],
      '/realms/realm-09/': [
        {
          text: '第九境【渡劫期】',
          items: [
            { text: '境目录', link: '/realms/realm-09/' },
            { text: '修炼 01：混沌神力 - WebGPU与GPU计算', link: '/lessons/lesson-49/#webgpu与gpu计算' },
            { text: '修炼 02：虚空之门 - Web3.0与区块链', link: '/lessons/lesson-50/#web3-0与区块链' },
            { text: '修炼 03：显圣诸天 - AR/VR技术', link: '/lessons/lesson-51/#ar-vr技术' },
            { text: '修炼 04：演算乾坤 - 量子计算与前端', link: '/lessons/lesson-52/#量子计算与前端' },
            { text: '修炼 05：心魔斩除 - 技术债务管理', link: '/lessons/lesson-53/#技术债务管理' },
            { text: '修炼 06：创世之光 - AI与前端智能化', link: '/lessons/lesson-54/#ai与前端智能化' }
          ]
        }
      ],
      */
      '/': [
        {
          text: '修炼境界',
          items: [
            { text: '第一境【炼气期】', link: '/realms/realm-01/' }
            // 暂时注释掉其他境的链接，避免死链接错误
            // { text: '第二境【筑基期】', link: '/realms/realm-02/' },
            // { text: '第三境【金丹期】', link: '/realms/realm-03/' },
            // { text: '第四境【元婴期】', link: '/realms/realm-04/' },
            // { text: '第五境【化神期】', link: '/realms/realm-05/' },
            // { text: '第六境【炼虚期】', link: '/realms/realm-06/' },
            // { text: '第七境【合体期】', link: '/realms/realm-07/' },
            // { text: '第八境【大乘期】', link: '/realms/realm-08/' },
            // { text: '第九境【渡劫期】', link: '/realms/realm-09/' }
          ]
        },
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
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
