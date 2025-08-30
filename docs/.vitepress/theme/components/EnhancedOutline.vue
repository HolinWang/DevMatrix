<template>
  <div class="enhanced-outline">
    <div class="outline-header">
      <span class="outline-icon">📋</span>
      <span class="outline-title">目录导航</span>
    </div>
    <div class="outline-content">
      <a
        v-for="item in outlineItems"
        :key="item.id"
        :href="item.link"
        :class="['outline-item', { active: item.isActive }]"
        :data-level="item.level"
        @click="scrollToSection(item.link)"
      >
        <span class="item-icon">{{ getIcon(item.text, item.level) }}</span>
        <span class="item-text">{{ item.text }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EnhancedOutline',
  data() {
    return {
      outlineItems: [],
      currentSection: ''
    }
  },
  mounted() {
    this.generateOutline()
    this.setupScrollListener()
  },
  methods: {
    generateOutline() {
      const headings = document.querySelectorAll('h1, h2, h3, h4')
      this.outlineItems = Array.from(headings).map(heading => {
        const level = parseInt(heading.tagName.charAt(1))
        const text = heading.textContent.replace(/[🎨📋⚡🎯🧠📦🔧🎨🚀✨🔹📊🎛️📋]/g, '').trim()
        const id = heading.id || this.generateId(text)
        
        return {
          id,
          text,
          level,
          link: `#${id}`,
          isActive: false
        }
      })
    },
    
    generateId(text) {
      return text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    },
    
    getIcon(text, level) {
      // 根据文本内容和层级返回图标
      const iconMap = {
        '概述': '📋',
        '修炼要点': '⚡',
        '核心概念': '🧠',
        '盒模型组成': '📦',
        '盒模型类型': '🔧',
        '实战练习': '🎨',
        '在线练习': '🚀',
        '总结': '✨',
        '核心目标': '🎯',
        '练习目标': '🎯',
        '练习内容': '📋',
        '内容区域': '🔹',
        '内边距': '🔹',
        '边框': '🔹',
        '外边距': '🔹',
        '标准盒模型 vs IE盒模型': '📊',
        'Display属性与盒模型': '🎛️'
      }
      
      // 根据层级返回默认图标
      const levelIcons = {
        2: '📖',
        3: '📝',
        4: '🔹'
      }
      
      return iconMap[text] || levelIcons[level] || '📄'
    },
    
    scrollToSection(link) {
      const targetId = link.substring(1)
      const targetElement = document.getElementById(targetId)
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    },
    
    setupScrollListener() {
      window.addEventListener('scroll', this.updateActiveSection)
    },
    
    updateActiveSection() {
      const headings = document.querySelectorAll('h1, h2, h3, h4')
      const scrollPosition = window.scrollY + 100
      
      let currentSection = ''
      
      headings.forEach(heading => {
        const rect = heading.getBoundingClientRect()
        if (rect.top <= 100) {
          currentSection = heading.id
        }
      })
      
      this.outlineItems.forEach(item => {
        item.isActive = item.link === `#${currentSection}`
      })
    }
  },
  
  beforeUnmount() {
    window.removeEventListener('scroll', this.updateActiveSection)
  }
}
</script>

<style scoped>
.enhanced-outline {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
}

.outline-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #3498db;
}

.outline-icon {
  font-size: 18px;
  margin-right: 8px;
}

.outline-title {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
}

.outline-content {
  max-height: 400px;
  overflow-y: auto;
}

.outline-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin: 4px 0;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-decoration: none;
  color: #495057;
  font-size: 14px;
  line-height: 1.4;
  cursor: pointer;
}

.outline-item:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.outline-item.active {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
}

.item-icon {
  margin-right: 8px;
  font-size: 12px;
  transition: transform 0.2s ease;
}

.outline-item:hover .item-icon {
  transform: scale(1.2);
}

.outline-item.active .item-icon {
  animation: pulse 2s infinite;
}

.item-text {
  flex: 1;
}

/* 不同层级的缩进 */
.outline-item[data-level="2"] {
  padding-left: 16px;
}

.outline-item[data-level="3"] {
  padding-left: 24px;
}

.outline-item[data-level="4"] {
  padding-left: 32px;
}

/* 滚动条美化 */
.outline-content::-webkit-scrollbar {
  width: 6px;
}

.outline-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.outline-content::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 3px;
}

.outline-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
}

/* 动画效果 */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* 响应式设计 */
@media (max-width: 960px) {
  .enhanced-outline {
    padding: 16px;
  }
  
  .outline-item {
    padding: 6px 10px;
    font-size: 13px;
  }
}
</style> 