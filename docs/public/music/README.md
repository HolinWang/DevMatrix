# 背景音乐文件

这个目录用于存放背景音乐文件。

## 支持的格式
- MP3
- WAV
- OGG
- M4A

## 如何添加音乐

1. 将音乐文件放入此目录
2. 在 `docs/.vitepress/theme/components/MusicPlayer.vue` 中更新播放列表
3. 确保音乐文件路径正确（相对于 `docs/public` 目录）

## 示例播放列表配置

```javascript
playlist: [
  {
    title: '你的音乐标题',
    artist: '艺术家名称',
    url: '/music/your-music-file.mp3',
    cover: '/music/cover-image.jpg', // 可选
    duration: '3:45' // 可选
  }
]
```

## 注意事项

- 音乐文件应该具有适当的版权许可
- 建议使用压缩过的音频文件以提高加载速度
- 文件大小建议控制在 5MB 以下
- 支持的音乐格式取决于浏览器兼容性

## 免费音乐资源

你可以从以下网站获取免费的音乐资源：
- [Free Music Archive](https://freemusicarchive.org/)
- [ccMixter](http://ccmixter.org/)
- [Incompetech](https://incompetech.com/)
- [Bensound](https://www.bensound.com/)

请确保遵守相关的使用许可协议。 