---
title: 修炼 03：铸体要诀 - Flexbox与Grid布局
---

# 修炼 03：铸体要诀

## Flexbox与Grid布局

[← 返回上一节](/lessons/lesson-02/) | [回首页](/)

以Flexbox和Grid布局为要诀，构建灵活强大的页面结构。

### 修炼要点

- 掌握Flexbox弹性布局
- 学会CSS Grid网格布局
- 理解两种布局方式的适用场景

### 核心概念

#### Flexbox弹性布局

```css
/* 容器属性 */
.flex-container {
  display: flex;
  flex-direction: row; /* 主轴方向 */
  justify-content: center; /* 主轴对齐 */
  align-items: center; /* 交叉轴对齐 */
  flex-wrap: wrap; /* 换行 */
}

/* 项目属性 */
.flex-item {
  flex: 1; /* flex-grow: 1, flex-shrink: 1, flex-basis: 0% */
  order: 1; /* 排序 */
  align-self: flex-start; /* 单独对齐 */
}
```

#### CSS Grid网格布局

```css
/* 容器属性 */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* 列宽 */
  grid-template-rows: 100px auto 100px; /* 行高 */
  grid-gap: 20px; /* 间距 */
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

/* 项目属性 */
.grid-item {
  grid-column: 1 / 3; /* 跨越列 */
  grid-row: 1 / 2; /* 跨越行 */
  grid-area: header; /* 区域名称 */
}
```

### 实战练习

1. 使用Flexbox创建响应式导航栏
2. 用Grid布局构建页面整体结构
3. 结合Flexbox和Grid创建复杂布局

[← 返回第一境目录](/realms/realm-01/)
