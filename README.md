# 防百度 amis 低代码编辑器

## 响应式

画布区域如何实现PC端和移动端的响应式布局？

基于 @container 查询 实现响应式布局。
@container 查询，可以实时匹配指定为容器元素的尺寸，开发者可以基于不同的尺寸范围，对内部的元素进行特定的样式设置与布局实现。

- @media 匹配的是浏览器窗体，而 @container 匹配的是某个元素；
- 随着 CSS 容器查询一起出现的还有 CSS 容器查询单位，包括：cqw, cqh, cqi, cqb, cqmin 和 cqmax；从某种程度上讲，cqw, cqh、cqmin、cqmax 单位和 vw, vh、vmin、vmax 单位语法和含义是一致的，只是一个是相对于容器尺寸，另外一个是相对于视区（ViewPort）尺寸
  - cqw：表示容器查询宽度（Container Query Width）占比。1cqw 等于容器宽度的 1%。假设容器宽度是 1000px，则此时 1cqw 对应的计算值就是 10px；
  - cqh：表示容器查询宽度（Container Query Height）占比。1cqw 等于容器高度的 1%；
  - cqi：表示容器查询内联方向尺寸（Container Query Inline-Size）占比。默认情况下，Inline-Size 指的就是水平方向，对应的是宽度，因此，1cqi 通常可以看成是容器宽度的 1%；
  - cqb：表示容器查询块级方向尺寸（Container Query Block-Size）占比。默认情况下，Block-Size 指的就是垂直方向，对应的是高度，因此，1cqb 通常可以看成是容器高度的 1%；
  - cqmin：表示容器查询较小尺寸的（Container Query Min）占比，例如容器尺寸是 300px*400px，则 100cqmin 对应的是尺寸较小的宽度 300px，而非高度；
  - cqmax：表示容器查询较大尺寸的（Container Query Min）占比；
- 如果希望元素在某个尺寸范围内出现较为明显的布局或样式变化，那么就需要用到 @container 规则；凡是写在 @container 规则中的 CSS 语句，都会寻找最近的容器元素，并进行匹配；
- 如果页面中没有任何元素是容器元素（也就是没有元素设置 container 属性），则 @container 是不会执行的，同时 cqw 单位会按照浏览器窗体尺寸就像计算（等同于 vw）。所以 @container 规则生效的前提就是需要先声明容器元素，使用的是 CSS container 属性；
- container 属性是 container-type 和 container-name 这两个属性的缩写；
  - container-type 的属性值包括：normal、size、inline-size；其中 normal 是默认值，表示不建立容器元素，size 表示水平和垂直方向都建立，inline-size 是只在水平方向建立，会给元素同时应用 layout、style 和 inline-size 容器状态；
  - container-name 的作用是给容器元素命名，这个属性在页面中存在多个容器元素的时候很有用；

eg:

```html
<!-- 容器定义 -->
<div class="card-container">
  <div class="card">
    <img src="thumbnail.jpg">
    <div class="content">
      <h3>卡片标题</h3>
      <p>响应式内容...</p>
    </div>
  </div>
</div>

<style>
.card-container {
  /* 简写：container: <name> / <type> */
  container: card-container / inline-size;
}

/* 默认样式 */
.card {
  display: block;
  background: white;
  border-radius: 8px;
}

/* 容器宽度 ≥ 400px 时切换布局 */
@container card-container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 120px 1fr;
    align-items: center;
  }
}

/* 容器宽度 ≥ 600px 时优化排版 */
@container card-container (min-width: 600px) {
  .card {
    grid-template-columns: 200px 1fr;
    padding: 2rem;
  }
  .card h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
}
</style>

```

### 兼容方案

需要兼容旧版 Chromium（<105）或 Firefox（<110）
npm install --save container-query-polyfill

容器查询兼容性检查
  - css 中可以通过 @supports 检查浏览器是否支持某个属性，
  @supports not (container-type: inline-size) {}

  - js 中可以通过 CSS.supports() 检查浏览器是否支持某个属性，
  if (!CSS.supports('container-type', 'inline-size')) {}

在 HTML 中加载：
```html
<!-- <script src="node_modules/container-query-polyfill/dist/container-query-polyfill.umd.js"></script> -->
 <!-- 仅在不支持的浏览器加载 -->
<script>
if (!('container' in document.documentElement.style)) {
  document.write('<script src="/path/to/container-query-polyfill.js"></script>');
}
</script>
```

或通过动态导入：

```js
if (!CSS.supports('container-type', 'inline-size')) {
  import('container-query-polyfill').then(() => {
    console.log('Container query polyfill loaded');
  });
}
```
