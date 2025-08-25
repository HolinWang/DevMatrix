---
title: 修炼 02：呼吸吐纳 - CSS盒模型与布局
---

# 修炼 02：呼吸吐纳

## CSS盒模型与布局

[← 返回上一节](/lessons/lesson-01/) | [回首页](/)

呼吸吐纳是前端基础流程管理的类比，此处填写示例和要点。

### 修炼要点

- 深入理解CSS盒模型
- 掌握盒模型的各个组成部分
- 学会使用盒模型进行布局

### 核心概念

#### 盒模型组成

```css
/* 标准盒模型 */
.box {
  width: 200px;          /* 内容宽度 */
  height: 100px;         /* 内容高度 */
  padding: 20px;         /* 内边距 */
  border: 2px solid #333; /* 边框 */
  margin: 10px;          /* 外边距 */
}

/* IE盒模型 */
.box-ie {
  box-sizing: border-box;
  width: 200px; /* 包含padding和border的总宽度 */
}
```

#### 盒模型类型

```css
/* 块级元素 */
div {
  display: block;
  width: 100%;
  margin: 10px 0;
}

/* 行内元素 */
span {
  display: inline;
  width: auto; /* 无效 */
  margin: 10px 0; /* 只有左右margin有效 */
}

/* 行内块元素 */
.inline-block {
  display: inline-block;
  width: 200px; /* 有效 */
  margin: 10px; /* 有效 */
}
```

### 实战练习

1. 创建一个包含多种盒模型的页面布局
2. 练习使用padding、margin、border进行间距控制
3. 理解不同display属性的盒模型差异

[← 返回第一境目录](/realms/realm-01/)
