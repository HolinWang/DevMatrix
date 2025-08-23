# VitePress 背景音乐播放器

为你的 VitePress 博客添加一个美观的背景音乐播放器！

## 🎵 功能特性

- ✅ 完整的音乐播放控制（播放/暂停/上一首/下一首）
- ✅ 进度条拖拽和音量调节
- ✅ 播放列表管理和随机播放
- ✅ 最小化/展开界面切换
- ✅ 响应式设计，支持移动端
- ✅ 美观的现代化UI设计
- ✅ 错误处理和加载状态
- ✅ 支持多种音频格式

## 🚀 快速开始

### 1. 项目结构

```
docs/
├── .vitepress/
│   ├── theme/
│   │   ├── components/
│   │   │   ├── MusicPlayer.vue    # 音乐播放器组件
│   │   │   └── Layout.vue         # 布局组件
│   │   ├── styles/
│   │   │   └── custom.css         # 自定义样式
│   │   └── index.js               # 主题配置
│   └── config.mts                 # VitePress配置
├── public/
│   └── music/                     # 音乐文件目录
│       ├── README.md              # 音乐文件说明
│       └── sample-playlist.json   # 示例播放列表
└── music-player-guide.md          # 使用指南
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动开发服务器

```bash
pnpm docs:dev
```

### 4. 访问页面

打开浏览器访问 `http://localhost:5173`，你会在页面右下角看到音乐播放器！

## 🎨 界面预览

### 完整界面
- 播放器头部：标题和最小化按钮
- 当前播放信息：歌曲标题、艺术家、封面
- 播放控制：上一首、播放/暂停、下一首
- 进度条：显示播放进度，支持点击跳转
- 音量控制：滑块调节音量
- 播放列表：显示所有歌曲，支持点击播放

### 最小化界面
- 圆形播放按钮
- 播放时显示动画效果
- 点击展开完整界面

## 📝 自定义配置

### 添加自己的音乐

1. 将音乐文件放入 `docs/public/music/` 目录
2. 编辑 `docs/.vitepress/theme/components/MusicPlayer.vue`
3. 在 `playlist` 数组中添加音乐信息：

```javascript
{
  title: '你的音乐标题',
  artist: '艺术家名称',
  url: '/music/your-music-file.mp3',
  cover: '/music/cover-image.jpg', // 可选
  duration: '3:45' // 可选
}
```

### 支持的音频格式

- MP3
- WAV
- OGG
- M4A

### 在线音乐

也可以使用在线音乐链接：

```javascript
{
  title: '在线音乐',
  artist: '艺术家',
  url: 'https://example.com/music.mp3',
  cover: 'https://example.com/cover.jpg'
}
```

## 🛠️ 技术实现

### 核心技术

- **Vue.js 3**: 组件化开发
- **VitePress**: 静态站点生成
- **HTML5 Audio API**: 音频播放控制
- **CSS3**: 动画和样式设计

### 主要组件

1. **MusicPlayer.vue**: 核心播放器组件
   - 音频控制逻辑
   - 播放状态管理
   - 用户界面交互

2. **Layout.vue**: 布局组件
   - 包装所有页面
   - 集成音乐播放器

3. **主题配置**: 
   - 注册组件
   - 应用布局
   - 自定义样式

## 📱 响应式设计

- **桌面端**: 完整功能界面
- **移动端**: 自适应布局，优化触摸操作
- **平板端**: 中等尺寸界面

## 🎯 使用场景

- 个人博客背景音乐
- 学习网站氛围营造
- 作品展示页面配乐
- 冥想/放松网站

## 🔧 故障排除

### 常见问题

1. **音乐无法播放**
   - 检查音频文件路径
   - 确认浏览器支持
   - 检查网络连接

2. **播放器不显示**
   - 确认主题配置正确
   - 检查组件注册

3. **样式问题**
   - 确认CSS文件正确导入
   - 检查浏览器兼容性

### 调试方法

1. 打开浏览器开发者工具
2. 查看控制台错误信息
3. 检查网络面板
4. 确认Vue组件渲染

## 📄 许可证

本项目采用 MIT 许可证。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 支持

如果你遇到问题或有建议，请：

1. 查看 [使用指南](./docs/music-player-guide.md)
2. 提交 Issue
3. 联系开发者

---

享受你的音乐时光！🎶 