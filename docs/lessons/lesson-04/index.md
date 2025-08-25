---
title: 修炼 04：经脉疏通 - JavaScript基础语法
---

# 修炼 04：经脉疏通

## JavaScript基础语法

[← 返回上一节](/lessons/lesson-03/) | [回首页](/)

疏通JavaScript经脉，掌握基础语法，为后续修炼打下坚实基础。

### 修炼要点

- 掌握JavaScript基础语法
- 理解变量、数据类型和运算符
- 学会函数定义和调用
- 掌握控制流程语句

### 核心概念

#### 变量与数据类型

```javascript
// 变量声明
let name = '修仙者';
const age = 25;
var oldWay = '不推荐';

// 数据类型
let string = '字符串';
let number = 42;
let boolean = true;
let array = [1, 2, 3];
let object = { name: '张三', level: '炼气期' };
let nullValue = null;
let undefinedValue = undefined;
```

#### 函数定义

```javascript
// 函数声明
function cultivate(technique) {
  return `修炼${technique}功法`;
}

// 函数表达式
const meditate = function(time) {
  return `冥想${time}分钟`;
};

// 箭头函数
const breakthrough = (level) => `突破到${level}境界`;
```

#### 控制流程

```javascript
// 条件判断
if (level >= 10) {
  console.log('可以突破到下一境界');
} else if (level >= 5) {
  console.log('继续修炼');
} else {
  console.log('基础太差，需要补课');
}

// 循环
for (let i = 0; i < 10; i++) {
  console.log(`第${i + 1}次修炼`);
}

// 数组方法
const techniques = ['炼气', '筑基', '金丹'];
techniques.forEach(tech => console.log(`学习${tech}功法`));
```

### 实战练习

1. 创建一个修仙者信息管理系统
2. 实现基础的功法修炼计算器
3. 练习数组和对象的操作

[← 返回第一境目录](/realms/realm-01/)
