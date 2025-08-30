---
title: 修炼 04：经脉疏通 - JavaScript基础语法
---

# 🧠 修炼 04：经脉疏通

## 📋 概述

[← 返回上一节](/lessons/lesson-03/) | [回首页](/)

经脉疏通是前端修炼的核心基础，JavaScript就像经脉一样，是连接HTML和CSS的桥梁，为网页注入生命和交互能力。掌握JavaScript基础语法是成为前端高手的必经之路，从变量声明到函数定义，从控制流程到对象操作，每一个概念都是构建复杂应用的基础。

## ⚡ 修炼要点

### 🎯 核心目标

- 深入理解JavaScript基础语法和核心概念
- 掌握变量、数据类型和运算符的使用
- 学会函数定义、调用和作用域
- 掌握控制流程语句和循环结构
- 理解数组和对象的基本操作

### 🔧 技术要点

- ES6+新特性（let/const、箭头函数、模板字符串等）
- 数据类型和类型转换
- 函数式编程基础概念
- 错误处理和调试技巧
- 浏览器开发者工具的使用

## 🧠 核心概念

### 📦 变量与数据类型

JavaScript是一种动态类型语言，变量可以存储不同类型的数据。

#### 🔹 变量声明

```javascript
// 现代JavaScript推荐使用let和const
let name = '修仙者';           // 可变变量
const age = 25;               // 常量，不可重新赋值
var oldWay = '不推荐使用';     // 旧语法，存在作用域问题

// 解构赋值
let [a, b, c] = [1, 2, 3];
let {name: userName, level} = {name: 'HOLIN', level: '炼气期'};

// 模板字符串
let message = `欢迎${name}来到修仙世界，当前境界：${level}`;
```

#### 🔹 数据类型

```javascript
// 基本数据类型
let string = '字符串';                    // String
let number = 42;                         // Number
let boolean = true;                      // Boolean
let nullValue = null;                    // Null
let undefinedValue = undefined;          // Undefined
let symbol = Symbol('unique');           // Symbol (ES6)

// 引用数据类型
let array = [1, 2, 3, '修仙'];           // Array
let object = {                           // Object
    name: 'HOLIN',
    level: '炼气期',
    techniques: ['炼气', '筑基', '金丹']
};
let function = function() {};            // Function

// 类型检查
console.log(typeof string);              // "string"
console.log(Array.isArray(array));       // true
console.log(Object.prototype.toString.call(object)); // "[object Object]"
```

#### 🔹 运算符

```javascript
// 算术运算符
let a = 10, b = 3;
console.log(a + b);    // 13
console.log(a - b);    // 7
console.log(a * b);    // 30
console.log(a / b);    // 3.333...
console.log(a % b);    // 1
console.log(a ** b);   // 1000 (幂运算)

// 比较运算符
console.log(a > b);    // true
console.log(a >= b);   // true
console.log(a == '10'); // true (类型转换)
console.log(a === '10'); // false (严格相等)

// 逻辑运算符
let isCultivator = true;
let hasTechnique = false;
console.log(isCultivator && hasTechnique); // false
console.log(isCultivator || hasTechnique); // true
console.log(!hasTechnique);                // true

// 三元运算符
let status = age >= 18 ? '成年修仙者' : '未成年修仙者';
```

### 🔧 函数与作用域

函数是JavaScript的核心概念，支持多种定义方式。

#### 🔹 函数定义

```javascript
// 函数声明
function cultivate(technique) {
    return `修炼${technique}功法`;
}

// 函数表达式
const meditate = function(time) {
    return `冥想${time}分钟`;
};

// 箭头函数 (ES6)
const breakthrough = (level) => `突破到${level}境界`;

// 箭头函数多行
const calculatePower = (base, multiplier) => {
    let power = base * multiplier;
    if (power > 100) {
        return '实力超群';
    }
    return '继续努力';
};

// 默认参数
function practice(technique = '基础功法', hours = 1) {
    return `修炼${technique}${hours}小时`;
}

// 剩余参数
function learnTechniques(master, ...techniques) {
    return `${master}传授了${techniques.length}种功法：${techniques.join('、')}`;
}
```

#### 🔹 作用域与闭包

```javascript
// 全局作用域
let globalLevel = 1;

// 函数作用域
function levelUp() {
    let localExp = 100;
    globalLevel += 1;
    console.log(`经验值：${localExp}，当前等级：${globalLevel}`);
}

// 块级作用域 (ES6)
if (true) {
    let blockVar = '块级变量';
    const blockConst = '块级常量';
}
// console.log(blockVar); // ReferenceError

// 闭包
function createCultivator(name) {
    let level = 1;
    let exp = 0;
    
    return {
        getName: () => name,
        getLevel: () => level,
        gainExp: (amount) => {
            exp += amount;
            if (exp >= 100) {
                level += 1;
                exp = 0;
                console.log(`${name}升级了！当前等级：${level}`);
            }
        }
    };
}

let cultivator = createCultivator('HOLIN');
cultivator.gainExp(50);
cultivator.gainExp(60); // 升级！
```

### 🎛️ 控制流程

控制流程是程序逻辑的核心，包括条件判断和循环。

#### 🔹 条件判断

```javascript
// if-else 语句
function checkLevel(level) {
    if (level >= 10) {
        return '可以突破到筑基期';
    } else if (level >= 5) {
        return '继续修炼炼气期';
    } else {
        return '基础太差，需要补课';
    }
}

// switch 语句
function getTechnique(level) {
    switch (level) {
        case 1:
        case 2:
        case 3:
            return '基础炼气诀';
        case 4:
        case 5:
        case 6:
            return '中级炼气诀';
        case 7:
        case 8:
        case 9:
            return '高级炼气诀';
        case 10:
            return '筑基功法';
        default:
            return '未知功法';
    }
}

// 三元运算符
let canBreakthrough = level >= 10 ? '可以突破' : '继续修炼';
```

#### 🔹 循环结构

```javascript
// for 循环
for (let i = 0; i < 10; i++) {
    console.log(`第${i + 1}次修炼`);
}

// for...of 循环 (ES6)
const techniques = ['炼气', '筑基', '金丹', '元婴'];
for (let tech of techniques) {
    console.log(`学习${tech}功法`);
}

// for...in 循环 (遍历对象属性)
const cultivator = {
    name: 'HOLIN',
    level: 5,
    techniques: ['炼气诀', '御剑术']
};

for (let key in cultivator) {
    console.log(`${key}: ${cultivator[key]}`);
}

// while 循环
let exp = 0;
while (exp < 100) {
    exp += 10;
    console.log(`当前经验：${exp}`);
}

// do...while 循环
let attempts = 0;
do {
    attempts++;
    console.log(`第${attempts}次尝试突破`);
} while (attempts < 3);

// 数组方法
const skills = ['炼气', '筑基', '金丹'];
skills.forEach((skill, index) => {
    console.log(`技能${index + 1}: ${skill}`);
});

// map 方法
const levels = [1, 2, 3, 4, 5];
const powerLevels = levels.map(level => level * 10);
console.log(powerLevels); // [10, 20, 30, 40, 50]

// filter 方法
const highLevels = levels.filter(level => level >= 3);
console.log(highLevels); // [3, 4, 5]
```

### 📊 数组与对象

数组和对象是JavaScript中最重要的数据结构。

#### 🔹 数组操作

```javascript
// 数组创建
let techniques = ['炼气诀', '御剑术', '炼丹术'];
let levels = new Array(1, 2, 3, 4, 5);

// 数组方法
techniques.push('阵法');           // 添加到末尾
techniques.unshift('基础功法');     // 添加到开头
let lastTech = techniques.pop();    // 移除并返回最后一个
let firstTech = techniques.shift(); // 移除并返回第一个

// 数组切片
let subTechniques = techniques.slice(1, 3); // ['御剑术', '炼丹术']

// 数组拼接
let allTechniques = techniques.concat(['符箓', '炼器']);

// 数组查找
let index = techniques.indexOf('御剑术'); // 1
let hasTechnique = techniques.includes('炼丹术'); // true

// 数组排序
let numbers = [3, 1, 4, 1, 5, 9];
numbers.sort((a, b) => a - b); // [1, 1, 3, 4, 5, 9]

// 数组反转
techniques.reverse();
```

#### 🔹 对象操作

```javascript
// 对象创建
let cultivator = {
    name: 'HOLIN',
    level: 5,
    techniques: ['炼气诀', '御剑术'],
    cultivate: function(hours) {
        return `${this.name}修炼了${hours}小时`;
    }
};

// 对象属性访问
console.log(cultivator.name);           // 点语法
console.log(cultivator['level']);       // 方括号语法

// 对象方法调用
console.log(cultivator.cultivate(2));

// 对象属性操作
cultivator.age = 25;                    // 添加属性
delete cultivator.age;                  // 删除属性

// 对象解构
let {name, level, techniques} = cultivator;

// 对象展开运算符 (ES6)
let newCultivator = {
    ...cultivator,
    level: 6,
    newTechnique: '阵法'
};

// 对象方法简写
let simpleObject = {
    name,
    level,
    cultivate(hours) {
        return `${this.name}修炼了${hours}小时`;
    }
};
```

### 🛡️ 错误处理

错误处理是编写健壮代码的重要部分。

```javascript
// try-catch 语句
function safeDivide(a, b) {
    try {
        if (b === 0) {
            throw new Error('除数不能为零');
        }
        return a / b;
    } catch (error) {
        console.error('计算错误:', error.message);
        return null;
    } finally {
        console.log('计算完成');
    }
}

// 自定义错误
class CultivationError extends Error {
    constructor(message, level) {
        super(message);
        this.name = 'CultivationError';
        this.level = level;
    }
}

function breakthrough(level) {
    if (level < 10) {
        throw new CultivationError('等级不足，无法突破', level);
    }
    return '突破成功！';
}
```

## 🎨 实战练习

### 🎯 练习目标

1. 创建一个修仙者信息管理系统
2. 实现基础的功法修炼计算器
3. 练习数组和对象的操作
4. 掌握函数式编程基础

### 🚀 在线练习

<div style="margin: 20px 0; padding: 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; border-left: 4px solid #f7df1e; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
  <h4 style="margin: 0 0 10px 0; color: #2c3e50;">💡 练习提示</h4>
  <p style="margin: 0; color: #495057; font-size: 14px;">在下面的交互式练习中，你可以实时体验JavaScript基础语法的各种特性。尝试修改代码来观察不同的执行结果。</p>
</div>

<iframe 
  src="/javascript-basics-practice.html" 
  width="100%" 
  height="800px"
  frameborder="0"
  style="border: 1px solid #ddd; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15); margin: 20px 0;"
  title="JavaScript基础语法实战练习">
</iframe>

#### 📋 练习内容概览

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">
  <div style="background: #fff; padding: 20px; border-radius: 8px; border-left: 4px solid #e74c3c; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
    <h4 style="margin: 0 0 10px 0; color: #2c3e50;">📦 变量与数据类型</h4>
    <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 14px;">
      <li>let、const、var的区别</li>
      <li>基本数据类型和引用类型</li>
      <li>类型转换和检查</li>
    </ul>
  </div>
  
  <div style="background: #fff; padding: 20px; border-radius: 8px; border-left: 4px solid #3498db; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
    <h4 style="margin: 0 0 10px 0; color: #2c3e50;">🔧 函数与作用域</h4>
    <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 14px;">
      <li>函数声明和表达式</li>
      <li>箭头函数和默认参数</li>
      <li>作用域和闭包概念</li>
    </ul>
  </div>
  
  <div style="background: #fff; padding: 20px; border-radius: 8px; border-left: 4px solid #2ecc71; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
    <h4 style="margin: 0 0 10px 0; color: #2c3e50;">🎛️ 控制流程</h4>
    <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 14px;">
      <li>条件判断语句</li>
      <li>循环结构和数组方法</li>
      <li>错误处理机制</li>
    </ul>
  </div>
  
  <div style="background: #fff; padding: 20px; border-radius: 8px; border-left: 4px solid #f39c12; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
    <h4 style="margin: 0 0 10px 0; color: #2c3e50;">📊 数组与对象</h4>
    <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 14px;">
      <li>数组操作和方法</li>
      <li>对象属性和方法</li>
      <li>解构赋值和展开运算符</li>
    </ul>
  </div>
</div>

### 💡 学习建议

<div style="background: linear-gradient(135deg, #f7df1e 0%, #f39c12 100%); color: white; padding: 20px; border-radius: 12px; margin: 20px 0;">
  <h4 style="margin: 0 0 15px 0;">🎯 高效学习技巧</h4>
  <ul style="margin: 0; padding-left: 20px;">
    <li><strong>理解概念</strong>：先理解变量、函数、作用域等核心概念</li>
    <li><strong>动手实践</strong>：多写代码，在浏览器控制台中测试</li>
    <li><strong>使用开发者工具</strong>：学会使用console.log和断点调试</li>
    <li><strong>渐进学习</strong>：从基础语法开始，逐步学习高级特性</li>
  </ul>
</div>

### 🔧 常见问题解决

<div style="background: #f8f9fa; padding: 20px; border-radius: 12px; border: 1px solid #e9ecef; margin: 20px 0;">
  <h4 style="margin: 0 0 15px 0; color: #2c3e50;">❓ 常见问题</h4>
  
  <div style="margin-bottom: 15px;">
    <h5 style="margin: 0 0 8px 0; color: #495057;">Q: let、const、var有什么区别？</h5>
    <p style="margin: 0; color: #6c757d; font-size: 14px;">A: var有函数作用域和变量提升，let和const有块级作用域，const声明后不能重新赋值。推荐使用let和const。</p>
  </div>
  
  <div style="margin-bottom: 15px;">
    <h5 style="margin: 0 0 8px 0; color: #495057;">Q: 箭头函数和普通函数有什么区别？</h5>
    <p style="margin: 0; color: #6c757d; font-size: 14px;">A: 箭头函数没有自己的this，不能作为构造函数，语法更简洁。普通函数有完整的函数特性。</p>
  </div>
  
  <div style="margin-bottom: 15px;">
    <h5 style="margin: 0 0 8px 0; color: #495057;">Q: 如何理解闭包？</h5>
    <p style="margin: 0; color: #6c757d; font-size: 14px;">A: 闭包是函数能够访问其词法作用域中的变量，即使函数在原始作用域之外执行。常用于数据封装和私有变量。</p>
  </div>
</div>

## ✨ 总结

通过本节的修炼，你已经掌握了JavaScript基础语法的核心概念，包括变量声明、数据类型、函数定义、控制流程、数组对象操作等。这些基础知识是构建复杂JavaScript应用的基石。

### 🎯 关键要点回顾

- **变量声明**：使用let和const，避免var
- **数据类型**：理解基本类型和引用类型的区别
- **函数**：掌握多种函数定义方式和作用域概念
- **控制流程**：熟练使用条件判断和循环结构
- **数据结构**：掌握数组和对象的基本操作

### 🚀 实践建议

1. **多练习**：在浏览器控制台中多写代码测试
2. **理解原理**：深入理解作用域、闭包等概念
3. **工具辅助**：熟练使用开发者工具调试代码
4. **项目实践**：在实际项目中应用这些基础知识

## 🔗 学习链接

### 📚 官方文档

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0;">
  <div style="background: #fff; padding: 20px; border-radius: 12px; border-left: 4px solid #f7df1e; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    <h4 style="margin: 0 0 15px 0; color: #2c3e50;">📖 MDN JavaScript</h4>
    <p style="margin: 0 0 15px 0; color: #495057; font-size: 14px;">Mozilla开发者网络的JavaScript详细文档。</p>
    <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript" target="_blank" style="color: #f7df1e; text-decoration: none; font-weight: bold;">📖 查看文档 →</a>
  </div>
  
  <div style="background: #fff; padding: 20px; border-radius: 12px; border-left: 4px solid #e34c26; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    <h4 style="margin: 0 0 15px 0; color: #2c3e50;">📋 ECMAScript规范</h4>
    <p style="margin: 0 0 15px 0; color: #495057; font-size: 14px;">JavaScript语言的官方规范文档。</p>
    <a href="https://tc39.es/ecma262/" target="_blank" style="color: #e34c26; text-decoration: none; font-weight: bold;">📖 查看规范 →</a>
  </div>
  
  <div style="background: #fff; padding: 20px; border-radius: 12px; border-left: 4px solid #1572b6; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    <h4 style="margin: 0 0 15px 0; color: #2c3e50;">🎯 JavaScript.info</h4>
    <p style="margin: 0 0 15px 0; color: #495057; font-size: 14px;">现代JavaScript教程，深入浅出。</p>
    <a href="https://javascript.info/" target="_blank" style="color: #1572b6; text-decoration: none; font-weight: bold;">📖 开始学习 →</a>
  </div>
</div>

### 🎓 学习资源

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0;">
  <div style="background: #fff; padding: 20px; border-radius: 12px; border-left: 4px solid #28a745; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    <h4 style="margin: 0 0 15px 0; color: #2c3e50;">📖 菜鸟教程JavaScript</h4>
    <p style="margin: 0 0 15px 0; color: #495057; font-size: 14px;">中文JavaScript教程，适合初学者入门。</p>
    <a href="https://www.runoob.com/js/js-tutorial.html" target="_blank" style="color: #28a745; text-decoration: none; font-weight: bold;">📚 开始学习 →</a>
  </div>
  
  <div style="background: #fff; padding: 20px; border-radius: 12px; border-left: 4px solid #17a2b8; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    <h4 style="margin: 0 0 15px 0; color: #2c3e50;">🎮 Codecademy JavaScript</h4>
    <p style="margin: 0 0 15px 0; color: #495057; font-size: 14px;">互动式JavaScript学习平台。</p>
    <a href="https://www.codecademy.com/learn/introduction-to-javascript" target="_blank" style="color: #17a2b8; text-decoration: none; font-weight: bold;">🎮 开始学习 →</a>
  </div>
  
  <div style="background: #fff; padding: 20px; border-radius: 12px; border-left: 4px solid #6f42c1; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    <h4 style="margin: 0 0 15px 0; color: #2c3e50;">🎯 Eloquent JavaScript</h4>
    <p style="margin: 0 0 15px 0; color: #495057; font-size: 14px;">免费的JavaScript编程书籍。</p>
    <a href="https://eloquentjavascript.net/" target="_blank" style="color: #6f42c1; text-decoration: none; font-weight: bold;">📖 在线阅读 →</a>
  </div>
</div>

### 🛠️ 实用工具

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0;">
  <div style="background: #fff; padding: 20px; border-radius: 12px; border-left: 4px solid #dc3545; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    <h4 style="margin: 0 0 15px 0; color: #2c3e50;">🔍 ESLint</h4>
    <p style="margin: 0 0 15px 0; color: #495057; font-size: 14px;">JavaScript代码质量检查和格式化工具。</p>
    <a href="https://eslint.org/" target="_blank" style="color: #dc3545; text-decoration: none; font-weight: bold;">🔍 代码检查 →</a>
  </div>
  
  <div style="background: #fff; padding: 20px; border-radius: 12px; border-left: 4px solid #fd7e14; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    <h4 style="margin: 0 0 15px 0; color: #2c3e50;">🎯 CodePen</h4>
    <p style="margin: 0 0 15px 0; color: #495057; font-size: 14px;">在线代码编辑器和分享平台。</p>
    <a href="https://codepen.io/" target="_blank" style="color: #fd7e14; text-decoration: none; font-weight: bold;">🎯 在线编辑 →</a>
  </div>
  
  <div style="background: #fff; padding: 20px; border-radius: 12px; border-left: 4px solid #20c997; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    <h4 style="margin: 0 0 15px 0; color: #2c3e50;">📐 JSFiddle</h4>
    <p style="margin: 0 0 15px 0; color: #495057; font-size: 14px;">JavaScript、HTML、CSS在线测试工具。</p>
    <a href="https://jsfiddle.net/" target="_blank" style="color: #20c997; text-decoration: none; font-weight: bold;">📐 在线测试 →</a>
  </div>
  
  <div style="background: #fff; padding: 20px; border-radius: 12px; border-left: 4px solid #6f42c1; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    <h4 style="margin: 0 0 15px 0; color: #2c3e50;">🐛 Debug Console</h4>
    <p style="margin: 0 0 15px 0; color: #495057; font-size: 14px;">浏览器开发者工具调试控制台。</p>
    <a href="https://developer.chrome.com/docs/devtools/" target="_blank" style="color: #6f42c1; text-decoration: none; font-weight: bold;">🐛 调试工具 →</a>
  </div>
  
  <div style="background: #fff; padding: 20px; border-radius: 12px; border-left: 4px solid #e83e8c; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    <h4 style="margin: 0 0 15px 0; color: #2c3e50;">📚 TypeScript Playground</h4>
    <p style="margin: 0 0 15px 0; color: #495057; font-size: 14px;">TypeScript在线编译和测试工具。</p>
    <a href="https://www.typescriptlang.org/play" target="_blank" style="color: #e83e8c; text-decoration: none; font-weight: bold;">📚 TypeScript →</a>
  </div>
  
  <div style="background: #fff; padding: 20px; border-radius: 12px; border-left: 4px solid #28a745; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    <h4 style="margin: 0 0 15px 0; color: #2c3e50;">⚡ Node.js REPL</h4>
    <p style="margin: 0 0 15px 0; color: #495057; font-size: 14px;">Node.js交互式命令行环境。</p>
    <a href="https://nodejs.org/" target="_blank" style="color: #28a745; text-decoration: none; font-weight: bold;">⚡ 命令行 →</a>
  </div>
</div>

### 📖 推荐书籍

<div style="background: linear-gradient(135deg, #f7df1e 0%, #f39c12 100%); color: white; padding: 25px; border-radius: 15px; margin: 30px 0;">
  <h3 style="margin: 0 0 20px 0; text-align: center;">📚 JavaScript深入学习推荐</h3>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
    <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 10px;">
      <h4 style="margin: 0 0 10px 0;">《JavaScript高级程序设计》</h4>
      <p style="margin: 0; font-size: 14px; opacity: 0.9;">JavaScript经典教材，深入浅出</p>
    </div>
    <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 10px;">
      <h4 style="margin: 0 0 10px 0;">《你不知道的JavaScript》</h4>
      <p style="margin: 0; font-size: 14px; opacity: 0.9;">深入理解JavaScript核心概念</p>
    </div>
    <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 10px;">
      <h4 style="margin: 0 0 10px 0;">《ES6标准入门》</h4>
      <p style="margin: 0; font-size: 14px; opacity: 0.9;">现代JavaScript语法详解</p>
    </div>
  </div>
</div>

### 🎯 下一步学习

<div style="background: #f8f9fa; padding: 20px; border-radius: 12px; border: 1px solid #e9ecef; margin: 20px 0;">
  <h4 style="margin: 0 0 15px 0; color: #2c3e50;">🚀 继续你的JavaScript修炼之旅</h4>
  <p style="margin: 0 0 15px 0; color: #495057;">掌握JavaScript基础语法后，建议继续学习：</p>
  <ul style="margin: 0; padding-left: 20px; color: #495057;">
    <li><strong>ES6+新特性</strong>：箭头函数、解构赋值、Promise、async/await</li>
    <li><strong>DOM操作</strong>：元素选择、事件处理、动态内容操作</li>
    <li><strong>异步编程</strong>：回调函数、Promise、async/await</li>
    <li><strong>模块化</strong>：ES6模块、CommonJS、AMD</li>
    <li><strong>框架学习</strong>：React、Vue、Angular等现代框架</li>
  </ul>
  <div style="margin-top: 20px; text-align: center;">
    <a href="/lessons/lesson-05/" style="background: linear-gradient(135deg, #f7df1e 0%, #f39c12 100%); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">⚡ 继续学习：ES6+新特性 →</a>
  </div>
</div>

[← 返回第一境目录](/realms/realm-01/)