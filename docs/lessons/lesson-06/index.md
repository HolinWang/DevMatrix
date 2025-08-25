---
title: 修炼 06：天道循环 - 事件循环与异步编程
---

# 修炼 06：天道循环

## 事件循环与异步编程

[← 返回上一节](/lessons/lesson-05/) | [回首页](/)

参悟JavaScript事件循环天道，掌握异步编程的精髓。

### 修炼要点

- 理解JavaScript事件循环机制
- 掌握Promise的使用方法
- 学会async/await语法
- 理解异步编程的最佳实践

### 核心概念

#### 事件循环机制

```javascript
// 事件循环示例
console.log('1. 开始修炼');

setTimeout(() => {
  console.log('4. 异步功法修炼完成');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise微任务执行');
});

console.log('2. 同步功法修炼完成');

// 输出顺序：
// 1. 开始修炼
// 2. 同步功法修炼完成
// 3. Promise微任务执行
// 4. 异步功法修炼完成
```

#### Promise基础

```javascript
// Promise创建
const cultivatePromise = new Promise((resolve, reject) => {
  const success = Math.random() > 0.5;
  
  setTimeout(() => {
    if (success) {
      resolve('修炼成功，境界提升');
    } else {
      reject('修炼失败，走火入魔');
    }
  }, 1000);
});

// Promise使用
cultivatePromise
  .then(result => {
    console.log('成功：', result);
  })
  .catch(error => {
    console.log('失败：', error);
  })
  .finally(() => {
    console.log('修炼结束');
  });

// Promise链式调用
function cultivateTechnique(technique) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`修炼${technique}完成`);
    }, 500);
  });
}

cultivateTechnique('炼气诀')
  .then(result => {
    console.log(result);
    return cultivateTechnique('筑基功');
  })
  .then(result => {
    console.log(result);
    return cultivateTechnique('金丹法');
  })
  .then(result => {
    console.log(result);
    console.log('所有功法修炼完成');
  });
```

#### async/await语法

```javascript
// async/await基础用法
async function cultivateAll() {
  try {
    console.log('开始修炼');
    
    const result1 = await cultivateTechnique('炼气诀');
    console.log(result1);
    
    const result2 = await cultivateTechnique('筑基功');
    console.log(result2);
    
    const result3 = await cultivateTechnique('金丹法');
    console.log(result3);
    
    console.log('所有功法修炼完成');
    return '修炼成功';
  } catch (error) {
    console.error('修炼失败：', error);
    throw error;
  }
}

// 并行修炼
async function cultivateParallel() {
  console.log('开始并行修炼');
  
  const promises = [
    cultivateTechnique('炼气诀'),
    cultivateTechnique('筑基功'),
    cultivateTechnique('金丹法')
  ];
  
  const results = await Promise.all(promises);
  console.log('并行修炼结果：', results);
  
  return results;
}

// 错误处理
async function cultivateWithErrorHandling() {
  try {
    const result = await cultivateTechnique('危险功法');
    return result;
  } catch (error) {
    console.error('修炼出错：', error);
    // 可以尝试其他功法
    return await cultivateTechnique('安全功法');
  }
}
```

#### 实际应用

```javascript
// 修仙者管理系统
class CultivatorManager {
  async cultivateTechnique(cultivatorId, technique) {
    try {
      // 模拟API调用
      const response = await fetch(`/api/cultivators/${cultivatorId}/cultivate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ technique })
      });
      
      if (!response.ok) {
        throw new Error('修炼请求失败');
      }
      
      return await response.json();
    } catch (error) {
      console.error('修炼失败：', error);
      throw error;
    }
  }
  
  async getCultivatorInfo(cultivatorId) {
    const response = await fetch(`/api/cultivators/${cultivatorId}`);
    return await response.json();
  }
}

// 使用示例
const manager = new CultivatorManager();

async function main() {
  try {
    const info = await manager.getCultivatorInfo(1);
    console.log('修仙者信息：', info);
    
    const result = await manager.cultivateTechnique(1, '炼气诀');
    console.log('修炼结果：', result);
  } catch (error) {
    console.error('操作失败：', error);
  }
}
```

### 实战练习

1. 实现一个异步的功法修炼系统
2. 创建基于Promise的修仙者状态管理
3. 练习async/await在API调用中的应用

[← 返回第一境目录](/realms/realm-01/)
