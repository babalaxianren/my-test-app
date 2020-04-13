/**
 * Infinity 是全局对象（global object）的一个属性，即它是一个全局变量。
 * Infinity 的初始值是 Number.POSITIVE_INFINITY。Infinity（正无穷大）大于任何值。该值和数学意义上的无穷大很像，例如任* 何正值乘以 Infinity 为 Infinity, 任何数值除以 Infinity 为 0。
 * 在 ECMAScript 5 的规范中， Infinity 是只读的（实现于 JavaScript 1.8.5 / Firefox 4）。
 */

/**
 * UMI_ENV
 * 指定覆盖默认配置的配置文件。比如 UMI_ENV=prod umi build，那么则会用 .umirc.prod.js 覆盖 .umirc.js。或者是 config/
 * config.prod.js 覆盖 config/config.js。注意是覆盖而不是替换，.umirc.prod.js 中没有的配置者会使用 .umirc.js 中的配
 * 置。
 * 另外，开发模式下 .umirc.local.js 或者 config/config.local.js 中的配置永远是优先级最高的。
 */

/**
 * 网页中出现的所有标签 : new Set([...document.querySelectorAll('*')]
 */

/**
 * devDependencies：开发环境使用
 * dependencies：生产环境使用
 * 例如：webpack，gulp等打包工具，这些都是我们开发阶段使用的，代码提交线上时，不需要这些工具，所以我们将它放入devDependencies即可，但是像jquery这类插件库，是我们生产环境所使用的，所以如要放入dependencies，如果未将jquery安装到dependencies，那么项目就可能报错，无法运行，所以类似这种项目必须依赖的插件库，我们则必须打入dependencies中，这下子都明白了吧。
 */

/**
 * 很多时候我们不需要一次性加载所有的JS文件，而应该在不同阶段去加载所需要的代码。webpack内置了强大的分割代码的功能可以实现按需* 加载。
 * 比如，我们在点击了某个按钮之后，才需要使用使用对应的JS文件中的代码，需要使用 import() 语法：
 * document.getElementById('btn').onclick = function() {
      import('./handle').then(fn => fn.default());
 * }
 * 复制代码import() 语法，需要 @babel/plugin-syntax-dynamic-import 的插件支持，但是因为当前 @babel/preset-env 预设中* 已经包含了 @babel/plugin-syntax-dynamic-import，因此我们不需要再单独安装和配置。
 * 直接 npm run build 进行构建，构建结果如下：
 * webpack 遇到 import(****) 这样的语法的时候，会这样处理：
 * 以**** 为入口新生成一个 Chunk
 * 当代码执行到 import 所在的语句时，才会加载该 Chunk 所对应的文件（如这里的1.bundle.8bf4dc.js）
 * 大家可以在浏览器中的控制台中，在 Network 的 Tab页 查看文件加载的情况，只有点击之后，才会加载对应的 JS 。
 */

/**
 * umi 按需加载
 * 按需加载组件：
 * import dynamic from 'umi/dynamic';
 * const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));
 * const App = dynamic({
 *  loader: async function() {
 *      await delay(1000);
 *      return () => <div>I will render after 1s</div>;
 *      },
 * });
 */


/**
 * 以下是: notes
 * https://juejin.im/post/5e8153bf6fb9a03c840d509d#heading-8
 */

/**
 * webpack 学习:
 * ref :umi webpack 拓展 => https://github.com/neutrinojs/webpack-chain
 * 初级: https://juejin.im/post/5e6518946fb9a07c820fbaaf#heading-12
 */

/**
 * render
 * React组件中必须要提供的方法。当state或者props任一数据有更新时都会执行。
 * render() 是一个纯函数，因此，不要在其中执行setState诸如此类的操作。render必须有一个返回值，返回的数据类型可以有:
 * 【 null、String、Number、Array、Boolean。】
 * 【 React elements 】
 * 【 Fragment 】
 * 【 Portal 】
 */

/**
 * endsWith,startsWith
 */

/**
 * 1.http & https 的区别，http经历了哪些层？各层都做什么？tcp/ip
 * 2.vue和react的实现原理及二者区别，虚拟dom的优点
 * 3.js事件机制（冒泡和捕获）
 * 4.react生命周期
 * 5.跨域问题 & 同源
 * 6.性能优化的处理:https://mp.weixin.qq.com/s/FbZa_WkUHJ5yQHJjgiUwiw
 * 7.兼容性解决办法
 * 8.vue更新数据的实现原理
 * 9:JS垃圾回收机制
 */



