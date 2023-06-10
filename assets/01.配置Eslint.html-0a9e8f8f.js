import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as e,c as o,a as n,b as s,f as r,d as c}from"./app-12e502b6.js";const l={},i=n("h1",{id:"配置eslint",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#配置eslint","aria-hidden":"true"},"#"),s(" 配置Eslint")],-1),u=n("h2",{id:"前言",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),s(" 前言")],-1),k=n("blockquote",null,[n("p",null,"其实我之前也看了很多文章，配置eslint。总是配置失败，然后有很奇怪的错误，今天就花了几个小时吧这个eslint全局配置一下。"),n("p",null,"因为现在项目并不是团队合作，所以我一般就直接全局配置，方便使用。")],-1),m={href:"https://eslint.org/",target:"_blank",rel:"noopener noreferrer"},d=c(`<h2 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤" aria-hidden="true">#</a> 步骤</h2><blockquote><ol><li>下载eslint</li></ol></blockquote><figure><img src="https://cdn.jsdelivr.net/gh/baici1/image-host/newimg/20211018193349.png" alt="image-20211018193342775" tabindex="0" loading="lazy"><figcaption>image-20211018193342775</figcaption></figure><p>进入setting.json文件里面，进行简单的配置</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>    <span class="token comment">// 启用Eslint</span>
  <span class="token property">&quot;eslint.enable&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;eslint.options&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;configFile&quot;</span><span class="token operator">:</span> <span class="token string">&quot;填写全局eslint配置文件的路径&quot;</span><span class="token punctuation">,</span>
    <span class="token comment">//指定vscode的eslint所处理的文件的后缀</span>
    <span class="token property">&quot;extensions&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;.js&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;.vue&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;.ts&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;.tsx&quot;</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;editor.codeActionsOnSave&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;source.fixAll.eslint&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><ol start="2"><li>全局安装eslint</li></ol></blockquote><p>命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> i eslint <span class="token parameter variable">-g</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后进入eslint的包内，创建<code>.eslintrc.js</code>文件</p><figure><img src="https://cdn.jsdelivr.net/gh/baici1/image-host/newimg/20211018193708.png" alt="image-20211018193708076" tabindex="0" loading="lazy"><figcaption>image-20211018193708076</figcaption></figure><blockquote><ol start="3"><li>写入相关配置</li></ol></blockquote><p>其实配置可以到网上找。（网上的资源太过于混杂了。我的说不定也不适合你）</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 默认情况下，ESLint会在所有父级组件中寻找配置文件，一直到根目录。ESLint一旦发现配置文件中有   &quot;root&quot;: true，它就会停止在父级目录中寻找。</span>
  <span class="token literal-property property">root</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token comment">// 对Babel解析器的包装使其与 ESLint 兼容。</span>
  <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token string">&quot;babel-eslint&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 代码是 ECMAScript 模块</span>
    <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">&quot;module&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 预定义的全局变量，这里是浏览器环境</span>
    <span class="token literal-property property">browser</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 扩展一个流行的风格指南，即 eslint-config-standard</span>
  <span class="token comment">// https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token string">&quot;standard&quot;</span><span class="token punctuation">,</span>
  <span class="token comment">// required to lint *.vue files</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// 此插件用来识别.html 和 .vue文件中的js代码</span>
    <span class="token string">&quot;html&quot;</span><span class="token punctuation">,</span>
    <span class="token comment">// standard风格的依赖包</span>
    <span class="token string">&quot;standard&quot;</span><span class="token punctuation">,</span>
    <span class="token comment">// standard风格的依赖包</span>
    <span class="token string">&quot;promise&quot;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// 配置的一些规则</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>

    <span class="token comment">/*        &quot;indent&quot;: [&quot;error&quot;,2]
      数组第一个指定是否启用这个规则
          &quot;off&quot; 或 0 - 关闭规则
          &quot;warn&quot; 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
          &quot;error&quot; 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

      数组第二个指定空几个空格
  */</span>
    <span class="token literal-property property">indent</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// allow paren-less arrow functions</span>
    <span class="token comment">// &quot;arrow-parens&quot;: 0,</span>
    <span class="token comment">// allow async-await</span>
    <span class="token comment">// &quot;generator-star-spacing&quot;: 0,</span>
    <span class="token comment">// allow debugger during development</span>
    <span class="token string-property property">&quot;no-debugger&quot;</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">&quot;production&quot;</span> <span class="token operator">?</span> <span class="token number">2</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止条件表达式中出现赋值操作符</span>
    <span class="token string-property property">&quot;no-cond-assign&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用 console</span>
    <span class="token string-property property">&quot;no-console&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在条件中使用常量表达式</span>
    <span class="token comment">// if (false) {</span>
    <span class="token comment">// doSomethingUnfinished();</span>
    <span class="token comment">// } //cuowu</span>
    <span class="token string-property property">&quot;no-constant-condition&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在正则表达式中使用控制字符 ：new RegExp(&quot;\\x1f&quot;)</span>
    <span class="token string-property property">&quot;no-control-regex&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，</span>
    <span class="token comment">// always-multiline：多行模式必须带逗号，单行模式不能带逗号</span>
    <span class="token string-property property">&quot;comma-dangle&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;never&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用 debugger</span>
    <span class="token comment">// 禁止 function 定义中出现重名参数</span>
    <span class="token string-property property">&quot;no-dupe-args&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止对象字面量中出现重复的 key</span>
    <span class="token string-property property">&quot;no-dupe-keys&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止重复的 case 标签</span>
    <span class="token string-property property">&quot;no-duplicate-case&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止空语句块</span>
    <span class="token string-property property">&quot;no-empty&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在正则表达式中使用空字符集 (/^abc[]/)</span>
    <span class="token string-property property">&quot;no-empty-character-class&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止对 catch 子句的参数重新赋值</span>
    <span class="token string-property property">&quot;no-ex-assign&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止不必要的布尔转换</span>
    <span class="token string-property property">&quot;no-extra-boolean-cast&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止不必要的括号 //(a * b) + c;//报错</span>
    <span class="token string-property property">&quot;no-extra-parens&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止不必要的分号</span>
    <span class="token string-property property">&quot;no-extra-semi&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止对 function 声明重新赋值</span>
    <span class="token string-property property">&quot;no-func-assign&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在嵌套的块中出现 function 或 var 声明</span>
    <span class="token string-property property">&quot;no-inner-declarations&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;functions&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止 RegExp 构造函数中无效的正则表达式字符串</span>
    <span class="token string-property property">&quot;no-invalid-regexp&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在字符串和注释之外不规则的空白</span>
    <span class="token string-property property">&quot;no-irregular-whitespace&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在 in 表达式中出现否定的左操作数</span>
    <span class="token string-property property">&quot;no-negated-in-lhs&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止把全局对象 (Math 和 JSON) 作为函数调用 错误：var math = Math();</span>
    <span class="token string-property property">&quot;no-obj-calls&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止直接使用 Object.prototypes 的内置属性</span>
    <span class="token string-property property">&quot;no-prototype-builtins&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止正则表达式字面量中出现多个空格</span>
    <span class="token string-property property">&quot;no-regex-spaces&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用稀疏数组</span>
    <span class="token string-property property">&quot;no-sparse-arrays&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止出现令人困惑的多行表达式</span>
    <span class="token string-property property">&quot;no-unexpected-multiline&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在return、throw、continue 和 break语句之后出现不可达代码</span>
    <span class="token string-property property">&quot;no-unreachable&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求使用 isNaN() 检查 NaN</span>
    <span class="token string-property property">&quot;use-isnan&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制使用有效的 JSDoc 注释</span>
    <span class="token string-property property">&quot;valid-jsdoc&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制 typeof 表达式与有效的字符串进行比较</span>
    <span class="token comment">// typeof foo === &quot;undefimed&quot; 错误</span>
    <span class="token string-property property">&quot;valid-typeof&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>


    <span class="token comment">// ////////////</span>
    <span class="token comment">// 最佳实践 //</span>
    <span class="token comment">// ////////////</span>

    <span class="token comment">// 定义对象的set存取器属性时，强制定义get</span>
    <span class="token string-property property">&quot;accessor-pairs&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制数组方法的回调函数中有 return 语句</span>
    <span class="token string-property property">&quot;array-callback-return&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制把变量的使用限制在其定义的作用域范围内</span>
    <span class="token string-property property">&quot;block-scoped-var&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 限制圈复杂度，也就是类似if else能连续接多少个</span>
    <span class="token string-property property">&quot;complexity&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求 return 语句要么总是指定返回的值，要么不指定</span>
    <span class="token string-property property">&quot;consistent-return&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制所有控制语句使用一致的括号风格</span>
    <span class="token string-property property">&quot;curly&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;all&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// switch 语句强制 default 分支，也可添加 // no default 注释取消此次警告</span>
    <span class="token string-property property">&quot;default-case&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制object.key 中 . 的位置，参数:</span>
    <span class="token comment">// property，&#39;.&#39;号应与属性在同一行</span>
    <span class="token comment">// object, &#39;.&#39; 号应与对象名在同一行</span>
    <span class="token string-property property">&quot;dot-location&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;property&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制使用.号取属性</span>
    <span class="token comment">// 参数： allowKeywords：true 使用保留字做属性名时，只能使用.方式取属性</span>
    <span class="token comment">// false 使用保留字做属性名时, 只能使用[]方式取属性 e.g [2, {&quot;allowKeywords&quot;: false}]</span>
    <span class="token comment">// allowPattern: 当属性名匹配提供的正则表达式时，允许使用[]方式取值,否则只能用.号取值 e.g [2, {&quot;allowPattern&quot;: &quot;^[a-z]+(_[a-z]+)+$&quot;}]</span>
    <span class="token string-property property">&quot;dot-notation&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;allowKeywords&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 使用 === 替代 == allow-null允许null和undefined==</span>
    <span class="token string-property property">&quot;eqeqeq&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;allow-null&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求 for-in 循环中有一个 if 语句</span>
    <span class="token string-property property">&quot;guard-for-in&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用 alert、confirm 和 prompt</span>
    <span class="token string-property property">&quot;no-alert&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用 arguments.caller 或 arguments.callee</span>
    <span class="token string-property property">&quot;no-caller&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 不允许在 case 子句中使用词法声明</span>
    <span class="token string-property property">&quot;no-case-declarations&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止除法操作符显式的出现在正则表达式开始的位置</span>
    <span class="token string-property property">&quot;no-div-regex&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止 if 语句中有 return 之后有 else</span>
    <span class="token string-property property">&quot;no-else-return&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止出现空函数.如果一个函数包含了一条注释，它将不会被认为有问题。</span>
    <span class="token string-property property">&quot;no-empty-function&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止使用空解构模式no-empty-pattern</span>
    <span class="token string-property property">&quot;no-empty-pattern&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在没有类型检查操作符的情况下与 null 进行比较</span>
    <span class="token string-property property">&quot;no-eq-null&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用 eval()</span>
    <span class="token string-property property">&quot;no-eval&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止扩展原生类型</span>
    <span class="token string-property property">&quot;no-extend-native&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止不必要的 .bind() 调用</span>
    <span class="token string-property property">&quot;no-extra-bind&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用不必要的标签</span>
    <span class="token string-property property">&quot;no-extra-label:&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止 case 语句落空</span>
    <span class="token string-property property">&quot;no-fallthrough&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止数字字面量中使用前导和末尾小数点</span>
    <span class="token string-property property">&quot;no-floating-decimal&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止使用短符号进行类型转换(!!fOO)</span>
    <span class="token string-property property">&quot;no-implicit-coercion&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在全局范围内使用 var 和命名的 function 声明</span>
    <span class="token string-property property">&quot;no-implicit-globals&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止使用类似 eval() 的方法</span>
    <span class="token string-property property">&quot;no-implied-eval&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止 this 关键字出现在类和类对象之外</span>
    <span class="token string-property property">&quot;no-invalid-this&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用 __iterator__ 属性</span>
    <span class="token string-property property">&quot;no-iterator&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用标签语句</span>
    <span class="token string-property property">&quot;no-labels&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用不必要的嵌套块</span>
    <span class="token string-property property">&quot;no-lone-blocks&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在循环中出现 function 声明和表达式</span>
    <span class="token string-property property">&quot;no-loop-func&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用魔术数字(3.14什么的用常量代替)</span>
    <span class="token string-property property">&quot;no-magic-numbers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;ignore&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止使用多个空格</span>
    <span class="token string-property property">&quot;no-multi-spaces&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止使用多行字符串，在 JavaScript 中，可以在新行之前使用斜线创建多行字符串</span>
    <span class="token string-property property">&quot;no-multi-str&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止对原生对象赋值</span>
    <span class="token string-property property">&quot;no-native-reassign&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在非赋值或条件语句中使用 new 操作符</span>
    <span class="token string-property property">&quot;no-new&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止对 Function 对象使用 new 操作符</span>
    <span class="token string-property property">&quot;no-new-func&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止对 String，Number 和 Boolean 使用 new 操作符</span>
    <span class="token string-property property">&quot;no-new-wrappers&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用八进制字面量</span>
    <span class="token string-property property">&quot;no-octal&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在字符串中使用八进制转义序列</span>
    <span class="token string-property property">&quot;no-octal-escape&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 不允许对 function 的参数进行重新赋值</span>
    <span class="token string-property property">&quot;no-param-reassign&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用 __proto__ 属性</span>
    <span class="token string-property property">&quot;no-proto&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止使用 var 多次声明同一变量</span>
    <span class="token string-property property">&quot;no-redeclare&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用指定的通过 require 加载的模块</span>
    <span class="token string-property property">&quot;no-return-assign&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止使用 javascript: url</span>
    <span class="token string-property property">&quot;no-script-url&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止自我赋值</span>
    <span class="token string-property property">&quot;no-self-assign&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止自身比较</span>
    <span class="token string-property property">&quot;no-self-compare&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用逗号操作符</span>
    <span class="token string-property property">&quot;no-sequences&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止抛出非异常字面量</span>
    <span class="token string-property property">&quot;no-throw-literal&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用一成不变的循环条件</span>
    <span class="token string-property property">&quot;no-unmodified-loop-condition&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止出现未使用过的表达式</span>
    <span class="token string-property property">&quot;no-unused-expressions&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用未使用过的标签</span>
    <span class="token string-property property">&quot;no-unused-labels&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止不必要的 .call() 和 .apply()</span>
    <span class="token string-property property">&quot;no-useless-call&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止不必要的字符串字面量或模板字面量的连接</span>
    <span class="token string-property property">&quot;no-useless-concat&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用不必要的转义字符</span>
    <span class="token string-property property">&quot;no-useless-escape&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用 void 操作符</span>
    <span class="token string-property property">&quot;no-void&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在注释中使用特定的警告术语</span>
    <span class="token string-property property">&quot;no-warning-comments&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用 with 语句</span>
    <span class="token string-property property">&quot;no-with&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在parseInt()使用基数参数</span>
    <span class="token string-property property">&quot;radix&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求所有的 var 声明出现在它们所在的作用域顶部</span>
    <span class="token string-property property">&quot;vars-on-top&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求 IIFE 使用括号括起来</span>
    <span class="token string-property property">&quot;wrap-iife&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;any&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求或禁止 “Yoda” 条件</span>
    <span class="token string-property property">&quot;yoda&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;never&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求或禁止使用严格模式指令</span>
    <span class="token string-property property">&quot;strict&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>


    <span class="token comment">// ////////////</span>
    <span class="token comment">// 变量声明 //</span>
    <span class="token comment">// ////////////</span>

    <span class="token comment">// 要求或禁止 var 声明中的初始化(初值)</span>
    <span class="token string-property property">&quot;init-declarations&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 不允许 catch 子句的参数与外层作用域中的变量同名</span>
    <span class="token string-property property">&quot;no-catch-shadow&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止删除变量</span>
    <span class="token string-property property">&quot;no-delete-var&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 不允许标签与变量同名</span>
    <span class="token string-property property">&quot;no-label-var&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用特定的全局变量</span>
    <span class="token string-property property">&quot;no-restricted-globals&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止 var 声明 与外层作用域的变量同名</span>
    <span class="token string-property property">&quot;no-shadow&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止覆盖受限制的标识符</span>
    <span class="token string-property property">&quot;no-shadow-restricted-names&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用未声明的变量，除非它们在 /*global */ 注释中被提到</span>
    <span class="token string-property property">&quot;no-undef&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止将变量初始化为 undefined</span>
    <span class="token string-property property">&quot;no-undef-init&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止将 undefined 作为标识符</span>
    <span class="token string-property property">&quot;no-undefined&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止出现未使用过的变量</span>
    <span class="token string-property property">&quot;no-unused-vars&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;vars&quot;</span><span class="token operator">:</span> <span class="token string">&quot;all&quot;</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;args&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 不允许在变量定义之前使用它们</span>
    <span class="token string-property property">&quot;no-use-before-define&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>

    <span class="token comment">// ////////////////////////</span>
    <span class="token comment">// Node.js and CommonJS //</span>
    <span class="token comment">// ////////////////////////</span>

    <span class="token comment">// require return statements after callbacks</span>
    <span class="token string-property property">&quot;callback-return&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求 require() 出现在顶层模块作用域中</span>
    <span class="token string-property property">&quot;global-require&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求回调函数中有容错处理</span>
    <span class="token string-property property">&quot;handle-callback-err&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;^(err|error)$&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止混合常规 var 声明和 require 调用</span>
    <span class="token string-property property">&quot;no-mixed-requires&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止调用 require 时使用 new 操作符</span>
    <span class="token string-property property">&quot;no-new-require&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止对 __dirname 和 __filename进行字符串连接</span>
    <span class="token string-property property">&quot;no-path-concat&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用 p<wbr>rocess.env</span>
    <span class="token string-property property">&quot;no-process-env&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用 process.exit()</span>
    <span class="token string-property property">&quot;no-process-exit&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用同步方法</span>
    <span class="token string-property property">&quot;no-sync&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>

    <span class="token comment">// ////////////</span>
    <span class="token comment">// 风格指南 //</span>
    <span class="token comment">// ////////////</span>

    <span class="token comment">// 指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格</span>
    <span class="token string-property property">&quot;array-bracket-spacing&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;never&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止或强制在单行代码块中使用空格(禁用)</span>
    <span class="token string-property property">&quot;block-spacing&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;never&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制使用一致的缩进 第二个参数为 &quot;tab&quot; 时，会使用tab，</span>
    <span class="token comment">// if while function 后面的{必须与if在同一行，java风格。</span>
    <span class="token string-property property">&quot;brace-style&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;1tbs&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;allowSingleLine&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 双峰驼命名格式</span>
    <span class="token string-property property">&quot;camelcase&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 控制逗号前后的空格</span>
    <span class="token string-property property">&quot;comma-spacing&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;before&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;after&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 控制逗号在行尾出现还是在行首出现 (默认行尾)</span>
    <span class="token comment">// http://eslint.org/docs/rules/comma-style</span>
    <span class="token string-property property">&quot;comma-style&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;last&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// &quot;SwitchCase&quot; (默认：0) 强制 switch 语句中的 case 子句的缩进水平</span>
    <span class="token comment">// 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always</span>
    <span class="token string-property property">&quot;computed-property-spacing&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;never&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 用于指统一在回调函数中指向this的变量名，箭头函数中的this已经可以指向外层调用者，应该没卵用了</span>
    <span class="token comment">// e.g [0,&quot;that&quot;] 指定只能 var that = this. that不能指向其他任何值，this也不能赋值给that以外的其他值</span>
    <span class="token string-property property">&quot;consistent-this&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;that&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制使用命名的 function 表达式</span>
    <span class="token string-property property">&quot;func-names&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 文件末尾强制换行</span>
    <span class="token string-property property">&quot;eol-last&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// &quot;indent&quot;: [2, 4, {</span>
    <span class="token comment">//     &quot;SwitchCase&quot;: 1</span>
    <span class="token comment">// }],</span>
    <span class="token comment">// 强制在对象字面量的属性中键和值之间使用一致的间距</span>
    <span class="token string-property property">&quot;key-spacing&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;beforeColon&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;afterColon&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制使用一致的换行风格</span>
    <span class="token string-property property">&quot;linebreak-style&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;unix&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求在注释周围有空行 ( 要求在块级注释之前有一空行)</span>
    <span class="token string-property property">&quot;lines-around-comment&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;beforeBlockComment&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制一致地使用函数声明或函数表达式，方法定义风格，参数：</span>
    <span class="token comment">// declaration: 强制使用方法声明的方式，function f(){} e.g [2, &quot;declaration&quot;]</span>
    <span class="token comment">// expression：强制使用方法表达式的方式，var f = function() {} e.g [2, &quot;expression&quot;]</span>
    <span class="token comment">// allowArrowFunctions: declaration风格中允许箭头函数。 e.g [2, &quot;declaration&quot;, { &quot;allowArrowFunctions&quot;: true }]</span>
    <span class="token string-property property">&quot;func-style&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制回调函数最大嵌套深度 5层</span>
    <span class="token string-property property">&quot;max-nested-callbacks&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止使用指定的标识符</span>
    <span class="token string-property property">&quot;id-blacklist&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制标识符的最新和最大长度</span>
    <span class="token string-property property">&quot;id-length&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求标识符匹配一个指定的正则表达式</span>
    <span class="token string-property property">&quot;id-match&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在 JSX 属性中一致地使用双引号或单引号</span>
    <span class="token string-property property">&quot;jsx-quotes&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在关键字前后使用一致的空格 (前后腰需要)</span>
    <span class="token string-property property">&quot;keyword-spacing&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制一行的最大长度</span>
    <span class="token string-property property">&quot;max-len&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制最大行数</span>
    <span class="token string-property property">&quot;max-lines&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制 function 定义中最多允许的参数数量</span>
    <span class="token string-property property">&quot;max-params&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制 function 块最多允许的的语句数量</span>
    <span class="token string-property property">&quot;max-statements&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制每一行中所允许的最大语句数量</span>
    <span class="token string-property property">&quot;max-statements-per-line&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求构造函数首字母大写 （要求调用 new 操作符时有首字母大小的函数，允许调用首字母大写的函数时没有 new 操作符。）</span>
    <span class="token string-property property">&quot;new-cap&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;newIsCap&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;capIsNew&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求调用无参构造函数时有圆括号</span>
    <span class="token string-property property">&quot;new-parens&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求或禁止 var 声明语句后有一行空行</span>
    <span class="token string-property property">&quot;newline-after-var&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止使用 Array 构造函数</span>
    <span class="token string-property property">&quot;no-array-constructor&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用按位运算符</span>
    <span class="token string-property property">&quot;no-bitwise&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求 return 语句之前有一空行</span>
    <span class="token string-property property">&quot;newline-before-return&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求方法链中每个调用都有一个换行符</span>
    <span class="token string-property property">&quot;newline-per-chained-call&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用 continue 语句</span>
    <span class="token string-property property">&quot;no-continue&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在代码行后使用内联注释</span>
    <span class="token string-property property">&quot;no-inline-comments&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止 if 作为唯一的语句出现在 else 语句中</span>
    <span class="token string-property property">&quot;no-lonely-if&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止混合使用不同的操作符</span>
    <span class="token string-property property">&quot;no-mixed-operators&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 不允许空格和 tab 混合缩进</span>
    <span class="token string-property property">&quot;no-mixed-spaces-and-tabs&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 不允许多个空行</span>
    <span class="token string-property property">&quot;no-multiple-empty-lines&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;max&quot;</span><span class="token operator">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 不允许否定的表达式</span>
    <span class="token string-property property">&quot;no-negated-condition&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 不允许使用嵌套的三元表达式</span>
    <span class="token string-property property">&quot;no-nested-ternary&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止使用 Object 的构造函数</span>
    <span class="token string-property property">&quot;no-new-object&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止使用一元操作符 ++ 和 --</span>
    <span class="token string-property property">&quot;no-plusplus&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止使用特定的语法</span>
    <span class="token string-property property">&quot;no-restricted-syntax&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止 function 标识符和括号之间出现空格</span>
    <span class="token string-property property">&quot;no-spaced-func&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 不允许使用三元操作符</span>
    <span class="token string-property property">&quot;no-ternary&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用行尾空格</span>
    <span class="token string-property property">&quot;no-trailing-spaces&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止标识符中有悬空下划线_bar</span>
    <span class="token string-property property">&quot;no-underscore-dangle&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止可以在有更简单的可替代的表达式时使用三元操作符</span>
    <span class="token string-property property">&quot;no-unneeded-ternary&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止属性前有空白</span>
    <span class="token string-property property">&quot;no-whitespace-before-property&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制花括号内换行符的一致性</span>
    <span class="token string-property property">&quot;object-curly-newline&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在花括号中使用一致的空格</span>
    <span class="token string-property property">&quot;object-curly-spacing&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制将对象的属性放在不同的行上</span>
    <span class="token string-property property">&quot;object-property-newline&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制函数中的变量要么一起声明要么分开声明</span>
    <span class="token string-property property">&quot;one-var&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;initialized&quot;</span><span class="token operator">:</span> <span class="token string">&quot;never&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求或禁止在 var 声明周围换行</span>
    <span class="token string-property property">&quot;one-var-declaration-per-line&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求或禁止在可能的情况下要求使用简化的赋值操作符</span>
    <span class="token string-property property">&quot;operator-assignment&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制操作符使用一致的换行符</span>
    <span class="token string-property property">&quot;operator-linebreak&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;after&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;overrides&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">&quot;?&quot;</span><span class="token operator">:</span> <span class="token string">&quot;before&quot;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;:&quot;</span><span class="token operator">:</span> <span class="token string">&quot;before&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求或禁止块内填充</span>
    <span class="token string-property property">&quot;padded-blocks&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求对象字面量属性名称用引号括起来</span>
    <span class="token string-property property">&quot;quote-props&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制使用一致的反勾号、双引号或单引号</span>
    <span class="token string-property property">&quot;quotes&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;double&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;avoid-escape&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求使用 JSDoc 注释</span>
    <span class="token string-property property">&quot;require-jsdoc&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求或禁止使用分号而不是 ASI（这个才是控制行尾部分号的，）</span>
    <span class="token string-property property">&quot;semi&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;always&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制分号之前和之后使用一致的空格</span>
    <span class="token string-property property">&quot;semi-spacing&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求同一个声明块中的变量按顺序排列</span>
    <span class="token string-property property">&quot;sort-vars&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在块之前使用一致的空格</span>
    <span class="token string-property property">&quot;space-before-blocks&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;always&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在 function的左括号之前使用一致的空格</span>
    <span class="token string-property property">&quot;space-before-function-paren&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&quot;always&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在圆括号内使用一致的空格</span>
    <span class="token string-property property">&quot;space-in-parens&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;never&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求操作符周围有空格</span>
    <span class="token string-property property">&quot;space-infix-ops&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在一元操作符前后使用一致的空格</span>
    <span class="token string-property property">&quot;space-unary-ops&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;words&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;nonwords&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在注释中 // 或 /* 使用一致的空格</span>
    <span class="token string-property property">&quot;spaced-comment&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;always&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;markers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;global&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;globals&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;eslint&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;eslint-disable&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;*package&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;!&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求或禁止 Unicode BOM</span>
    <span class="token string-property property">&quot;unicode-bom&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求正则表达式被括号括起来</span>
    <span class="token string-property property">&quot;wrap-regex&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>

    <span class="token comment">// ////////////</span>
    <span class="token comment">// ES6.相关 //</span>
    <span class="token comment">// ////////////</span>

    <span class="token comment">// 要求箭头函数体使用大括号</span>
    <span class="token string-property property">&quot;arrow-body-style&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求箭头函数的参数使用圆括号</span>
    <span class="token string-property property">&quot;arrow-parens&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;arrow-spacing&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;before&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;after&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在子类构造函数中用super()调用父类构造函数，TypeScrip的编译器也会提示</span>
    <span class="token string-property property">&quot;constructor-super&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制 generator 函数中 * 号周围使用一致的空格</span>
    <span class="token string-property property">&quot;generator-star-spacing&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;before&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;after&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止修改类声明的变量</span>
    <span class="token string-property property">&quot;no-class-assign&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 不允许箭头功能，在那里他们可以混淆的比较</span>
    <span class="token string-property property">&quot;no-confusing-arrow&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止修改 const 声明的变量</span>
    <span class="token string-property property">&quot;no-const-assign&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止类成员中出现重复的名称</span>
    <span class="token string-property property">&quot;no-dupe-class-members&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 不允许复制模块的进口</span>
    <span class="token string-property property">&quot;no-duplicate-imports&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止 Symbol 的构造函数</span>
    <span class="token string-property property">&quot;no-new-symbol&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 允许指定模块加载时的进口</span>
    <span class="token string-property property">&quot;no-restricted-imports&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在构造函数中，在调用 super() 之前使用 this 或 super</span>
    <span class="token string-property property">&quot;no-this-before-super&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止不必要的计算性能键对象的文字</span>
    <span class="token string-property property">&quot;no-useless-computed-key&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求使用 let 或 const 而不是 var</span>
    <span class="token string-property property">&quot;no-var&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求或禁止对象字面量中方法和属性使用简写语法</span>
    <span class="token string-property property">&quot;object-shorthand&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求使用箭头函数作为回调</span>
    <span class="token string-property property">&quot;prefer-arrow-callback&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求使用 const 声明那些声明后不再被修改的变量</span>
    <span class="token string-property property">&quot;prefer-const&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求在合适的地方使用 Reflect 方法</span>
    <span class="token string-property property">&quot;prefer-reflect&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求使用扩展运算符而非 .apply()</span>
    <span class="token string-property property">&quot;prefer-spread&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求使用模板字面量而非字符串连接</span>
    <span class="token string-property property">&quot;prefer-template&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// Suggest using the rest parameters instead of arguments</span>
    <span class="token string-property property">&quot;prefer-rest-params&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求generator 函数内有 yield</span>
    <span class="token string-property property">&quot;require-yield&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// enforce spacing between rest and spread operators and their expressions</span>
    <span class="token string-property property">&quot;rest-spread-spacing&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制模块内的 import 排序</span>
    <span class="token string-property property">&quot;sort-imports&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求或禁止模板字符串中的嵌入表达式周围空格的使用</span>
    <span class="token string-property property">&quot;template-curly-spacing&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在 yield* 表达式中 * 周围使用空格</span>
    <span class="token string-property property">&quot;yield-star-spacing&quot;</span><span class="token operator">:</span> <span class="token number">2</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这里总之一句话，去寻找符合自己的。可能你的项目会有很多错误，找到对应的eslint规则，去看是否是自己需要的，进行选择使用。</strong></p><h2 id="忠告" tabindex="-1"><a class="header-anchor" href="#忠告" aria-hidden="true">#</a> 忠告</h2><p>可能你的eslint会打印很多很多奇怪的错误，其实分两部分</p><ul><li>你没有下载相关的包或者插件</li></ul><p>你可能会弹出下面的信息，其实就是要你全局安装相关的插件或者包</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>Error - 下午6:53:02<span class="token punctuation">]</span> Request textDocument/codeAction failed.
  Message: Request textDocument/codeAction failed with message: Failed to load plugin <span class="token string">&#39;prettier&#39;</span> declared <span class="token keyword">in</span> <span class="token string">&#39;--config&#39;</span><span class="token builtin class-name">:</span> Cannot <span class="token function">find</span> module <span class="token string">&#39;eslint-plugin-prettier&#39;</span>
Require stack:
- D:<span class="token punctuation">\\</span>Program Files<span class="token punctuation">\\</span>nodejs<span class="token punctuation">\\</span>node_global<span class="token punctuation">\\</span>__placeholder__.js
Referenced from: D:<span class="token punctuation">\\</span>Program Files<span class="token punctuation">\\</span>nodejs<span class="token punctuation">\\</span>node_global<span class="token punctuation">\\</span>.eslintrc.js
  Code: <span class="token parameter variable">-32603</span> 
<span class="token punctuation">[</span>Error - 下午6:53:04<span class="token punctuation">]</span> Request textDocument/codeAction failed.
  Message: Request textDocument/codeAction failed with message: Failed to load plugin <span class="token string">&#39;prettier&#39;</span> declared <span class="token keyword">in</span> <span class="token string">&#39;--config&#39;</span><span class="token builtin class-name">:</span> Cannot <span class="token function">find</span> module <span class="token string">&#39;eslint-plugin-prettier&#39;</span>
Require stack:
- D:<span class="token punctuation">\\</span>Program Files<span class="token punctuation">\\</span>nodejs<span class="token punctuation">\\</span>node_global<span class="token punctuation">\\</span>__placeholder__.js
Referenced from: D:<span class="token punctuation">\\</span>Program Files<span class="token punctuation">\\</span>nodejs<span class="token punctuation">\\</span>node_global<span class="token punctuation">\\</span>.eslintrc.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>你的配置文件有问题（应该写数字而不是<code>error</code>）</li></ul><p>可能弹出的错误</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Request textDocument/codeAction failed.
  Message: Request textDocument/codeAction failed with message: --config:
 Configuration <span class="token keyword">for</span> rule <span class="token string">&quot;brace-style&quot;</span> is invalid:
 Value <span class="token string">&quot;1tabs&quot;</span> should be equal to one of the allowed values.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果出现这种错误，按照他的要求去进行更改即可，即使你改了还是不行的话，你可以选择<strong>删除，或者换一种配置文件，或者去看你的vscode的setting是不是出现配置重复的问题。</strong></p><p style="color:red;">记得搞完配置一定要重启eslint。</p>`,24);function v(b,q){const a=t("ExternalLinkIcon");return e(),o("div",null,[i,u,k,n("p",null,[s("eslint官网："),n("a",m,[s("https://eslint.org/"),r(a)])]),d])}const f=p(l,[["render",v],["__file","01.配置Eslint.html.vue"]]);export{f as default};
