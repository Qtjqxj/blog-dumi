---
  title: 处理整屏滚动
  group: 遇到的问题
  order: 2
---

# 处理整屏滚动

## 需求

一般产品首页会使用一整屏来展示信息，为了优化用户体验，要求用户在使用鼠标滚轮或触摸板进行滑动时，一次能够滑动一整屏，实现滚动条的自动定位。


## 解决方案

### 利用 CSS 样式

以 y 轴滚动为例，滚动容器的样式：

```less
overflow-y: auto;
scroll-snap-type: y mandatory;
-webkit-overflow-scrolling: touch;
```
内容的样式：

```less
scroll-snap-align: start;
scroll-snap-stop: always;
```

下面写一个 demo 体验一下：

<code src="../../demos/scroll-screen/demo1.tsx"></code>

## 可能遇到的 bug