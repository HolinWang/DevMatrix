---
title: 修炼 05：神识凝聚 - 闭包与作用域
---

# 修炼 05：神识凝聚

## 闭包与作用域

[← 返回上一节](/lessons/lesson-04/) | [回首页](/)

凝聚神识，深入理解JavaScript的作用域和闭包机制。

### 修炼要点

- 理解JavaScript的作用域机制
- 掌握闭包的概念和用法
- 学会利用闭包进行数据封装
- 避免闭包陷阱和内存泄漏

### 核心概念

#### 作用域类型

```javascript
// 全局作用域
let globalVar = '全局变量';

// 函数作用域
function cultivate() {
  let localVar = '局部变量';
  console.log(globalVar); // 可以访问全局变量
  console.log(localVar);  // 可以访问局部变量
}

// 块级作用域
if (true) {
  let blockVar = '块级变量';
  console.log(blockVar); // 可以访问
}
// console.log(blockVar); // 错误：无法访问
```

#### 闭包机制

```javascript
// 基础闭包
function createCounter() {
  let count = 0;
  
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// 闭包封装私有变量
function createCultivator(name) {
  let level = 1;
  let techniques = [];
  
  return {
    getName: () => name,
    getLevel: () => level,
    cultivate: (technique) => {
      techniques.push(technique);
      level++;
      return `${name}修炼${technique}，境界提升到${level}`;
    },
    getTechniques: () => [...techniques] // 返回副本
  };
}

const cultivator = createCultivator('张三');
console.log(cultivator.cultivate('炼气诀')); // 张三修炼炼气诀，境界提升到2
```

#### 闭包陷阱

```javascript
// 常见陷阱：循环中的闭包
function createFunctions() {
  const functions = [];
  
  for (var i = 0; i < 3; i++) {
    functions.push(function() {
      return i;
    });
  }
  
  return functions;
}

const funcs = createFunctions();
console.log(funcs[0]()); // 3 (不是0)
console.log(funcs[1]()); // 3 (不是1)
console.log(funcs[2]()); // 3 (不是2)

// 解决方案1：使用let
function createFunctionsFixed1() {
  const functions = [];
  
  for (let i = 0; i < 3; i++) {
    functions.push(function() {
      return i;
    });
  }
  
  return functions;
}

// 解决方案2：使用IIFE
function createFunctionsFixed2() {
  const functions = [];
  
  for (var i = 0; i < 3; i++) {
    (function(index) {
      functions.push(function() {
        return index;
      });
    })(i);
  }
  
  return functions;
}
```

### 实战练习

1. 实现一个模块化的功法管理系统
2. 创建带有私有状态的修仙者类
3. 练习闭包在事件处理中的应用

[← 返回第一境目录](/realms/realm-01/)
