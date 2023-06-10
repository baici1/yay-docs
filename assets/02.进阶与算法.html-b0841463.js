import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o,c as i,a as n,b as s,f as c,d as a}from"./app-12e502b6.js";const l={},u=a(`<h1 id="类" tabindex="-1"><a class="header-anchor" href="#类" aria-hidden="true">#</a> 类</h1><p>内置方法：</p><ul><li><code>__init__</code>：在调用类时自动触发，通过object产生的空对象自动调用__init__()</li><li><code>__new__</code>：在__init__触发前自动触发，调用该类时，内部会通过__new__产生一个新的对象</li><li><code>__getattr__</code>：在 &quot;对象.属性&quot; 获取属性时，若 &quot;没有该属性&quot; 时触发</li><li><code>__getattribute__</code>：在 &quot;对象.属性&quot; 获取属性时，&quot;无论有没有该属性&quot; 都会触发，默认return一个None</li><li><code>__setattr__</code>：当 &quot;对象.属性 = 属性值&quot; ，&quot;添加或修改属性&quot; 时触发</li><li><code>__call__</code>：在调用对象 &quot;对象 + ()&quot; 时触发</li><li><code>__str__</code>：在 &quot;打印对象&quot; 时触发</li><li><code>__getitem__</code>：在对象通过 &quot;对象[key]&quot; 获取属性时触发</li><li><code>__setitem__</code>：在对象通过 &quot;对象[key]=value值&quot; 获取属性时触发</li></ul><h1 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h1><p><code>Python</code> 将函数视为“一等公民”</p><ul><li>函数可以赋值给变量</li><li>函数可以作为函数的参数</li><li>函数可以作为函数的返回值</li></ul><p><code>lambda</code>函数返回函数名作为结果</p><ul><li><code>lambda</code>函数是一种匿名函数，就是没有名字的函数</li><li>使用<code>lambda</code>保留字定义，函数名就是返回结果</li><li><code>lambda</code>函数用于定义简单的、能够在一行内表示的函数</li></ul><p>格式：<code>lambda[para1,para2,…]:expression</code></p><p>特点：</p><ul><li><code>lambda</code>后面没有跟函数名</li><li><code>[para1,para2,…]</code>参数是可选的，任何类型的，参数往往在后面的<code>expression</code>中体现</li><li><code>expression</code>表达式实现匿名函数功能的过程，并返回操作结果，具有通常函数<code>return</code>的功能</li><li>整个匿名函数在一行实现所有定义。</li></ul><p>用例：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> a <span class="token operator">=</span> <span class="token keyword">lambda</span> x<span class="token punctuation">,</span>y<span class="token punctuation">:</span>x<span class="token operator">**</span>y
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> a<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span>
<span class="token number">625</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>什么是装饰器：定义一个函数，该函数是用来为其他函数添加额外的功能</p><ul><li>器指的是工具，可以定义成成函数</li><li>装饰指的是为其他事物添加额外的东西点缀</li></ul><p>用例：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 语法糖：让你开心的语法</span>
<span class="token keyword">import</span> time


<span class="token comment"># 装饰器</span>
<span class="token keyword">def</span> <span class="token function">timmer</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">wrapper</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        start <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
        res <span class="token operator">=</span> func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token comment"># 调用函数参数</span>
        stop <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>stop <span class="token operator">-</span> start<span class="token punctuation">)</span>
        <span class="token keyword">return</span> res

    <span class="token keyword">return</span> wrapper


<span class="token comment"># 在被装饰对象正上方的单独一行写@装饰器名字</span>
<span class="token decorator annotation punctuation">@timmer</span> <span class="token comment"># index=timmer(index) 相当于执行了这句话，后面调用方式不变</span>
<span class="token keyword">def</span> <span class="token function">index</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">)</span><span class="token punctuation">:</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;index %s %s %s&#39;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">)</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@timmer</span> <span class="token comment"># home=timmer(ome)</span>
<span class="token keyword">def</span> <span class="token function">home</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">:</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;welcome %s to home page&#39;</span> <span class="token operator">%</span> name<span class="token punctuation">)</span>


index<span class="token punctuation">(</span>x<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> y<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> z<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">)</span>
home<span class="token punctuation">(</span><span class="token string">&#39;egon&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>模板：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">outter</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">wrapper</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 1、调用原函数</span>
        <span class="token comment"># 2、为其增加新功能</span>
        res <span class="token operator">=</span> func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        <span class="token keyword">return</span> res

    <span class="token keyword">return</span> wrapper
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>迭代器</strong>：</p><ul><li>迭代是Python最强大的功能之一，是访问集合元素的一种方式。</li><li>迭代器是一个可以记住遍历的位置的对象。</li><li>迭代器对象从集合的第一个元素开始访问，直到所有的元素被访问完结束。迭代器只能往前不会后退。</li></ul><p>字符串，列表或元组对象都可用于创建迭代器。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> <span class="token builtin">list</span><span class="token operator">=</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> it <span class="token operator">=</span> <span class="token builtin">iter</span><span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">)</span>    <span class="token comment"># 创建迭代器对象</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> <span class="token keyword">print</span> <span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>it<span class="token punctuation">)</span><span class="token punctuation">)</span>   <span class="token comment"># 输出迭代器的下一个元素</span>
<span class="token number">1</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> <span class="token keyword">print</span> <span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>it<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token number">2</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把一个类作为一个迭代器使用需要在类中实现两个方法 <strong>iter</strong>() 与 <strong>next</strong>() 。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">MyNumbers</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__iter__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">1</span>
    <span class="token keyword">return</span> self
 
  <span class="token keyword">def</span> <span class="token function">__next__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    x <span class="token operator">=</span> self<span class="token punctuation">.</span>a
    self<span class="token punctuation">.</span>a <span class="token operator">+=</span> <span class="token number">1</span>
    <span class="token keyword">return</span> x
 
myclass <span class="token operator">=</span> MyNumbers<span class="token punctuation">(</span><span class="token punctuation">)</span>
myiter <span class="token operator">=</span> <span class="token builtin">iter</span><span class="token punctuation">(</span>myclass<span class="token punctuation">)</span>
 
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>myiter<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>myiter<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>myiter<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>myiter<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>myiter<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>StopIteration</code> 异常用于标识迭代的完成，防止出现无限循环的情况，在 <code>__next__()</code> 方法中我们可以设置在完成指定循环次数后触发 <code>StopIteration</code> 异常来结束迭代。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">MyNumbers</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__iter__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">1</span>
    <span class="token keyword">return</span> self
 
  <span class="token keyword">def</span> <span class="token function">__next__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> self<span class="token punctuation">.</span>a <span class="token operator">&lt;=</span> <span class="token number">20</span><span class="token punctuation">:</span>
      x <span class="token operator">=</span> self<span class="token punctuation">.</span>a
      self<span class="token punctuation">.</span>a <span class="token operator">+=</span> <span class="token number">1</span>
      <span class="token keyword">return</span> x
    <span class="token keyword">else</span><span class="token punctuation">:</span>
      <span class="token comment"># 当抛出这个异常，就会停止迭代</span>
      <span class="token keyword">raise</span> StopIteration
 
myclass <span class="token operator">=</span> MyNumbers<span class="token punctuation">(</span><span class="token punctuation">)</span>
myiter <span class="token operator">=</span> <span class="token builtin">iter</span><span class="token punctuation">(</span>myclass<span class="token punctuation">)</span>
 
<span class="token keyword">for</span> x <span class="token keyword">in</span> myiter<span class="token punctuation">:</span>
  <span class="token keyword">print</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>生成器</strong>：</p><p>生成器是一个返回迭代器的函数，只能用于迭代操作，更简单点理解生成器就是一个迭代器。</p><p>在调用生成器运行的过程中，每次遇到 <code>yield</code> 时函数会暂停并保存当前所有的运行信息，返回 <code>yield</code> 的值, 并在下一次执行 <code>next()</code> 方法时从当前位置继续运行。</p><p>调用一个生成器函数，返回的是一个迭代器对象。</p>`,31),r={href:"https://blog.csdn.net/mieleizhi0522/article/details/82142856/",target:"_blank",rel:"noopener noreferrer"},d=a(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;starting...&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        res <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token number">4</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;res:&quot;</span><span class="token punctuation">,</span>res<span class="token punctuation">)</span>
g <span class="token operator">=</span> foo<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>g<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;*&quot;</span><span class="token operator">*</span><span class="token number">20</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>g<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token triple-quoted-string string">&quot;&quot;&quot;
starting...
4
********************
res: None
4
&quot;&quot;&quot;</span>
<span class="token keyword">def</span> <span class="token function">foo</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;starting...&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">while</span> num<span class="token operator">&lt;</span><span class="token number">10</span><span class="token punctuation">:</span>
        num<span class="token operator">=</span>num<span class="token operator">+</span><span class="token number">1</span>
        <span class="token keyword">yield</span> num
<span class="token keyword">for</span> n <span class="token keyword">in</span> foo<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment">#相当于在执行生成器函数了</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
<span class="token triple-quoted-string string">&quot;&quot;&quot;
starting...
1
2
3
4
5
6
7
8
9
10
&quot;&quot;&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据上面一个例子，我们可以讲 <code>yield</code> 理解成 <code>return</code>，但是他也是迭代器，当运行<code>next</code> 函数时候，下一次的执行语句从上一次的 <code>yield</code> 开始 。</p><h1 id="排序算法" tabindex="-1"><a class="header-anchor" href="#排序算法" aria-hidden="true">#</a> 排序算法</h1>`,3);function k(v,m){const e=p("ExternalLinkIcon");return o(),i("div",null,[u,n("p",null,[s("解释："),n("a",r,[s("https://blog.csdn.net/mieleizhi0522/article/details/82142856/"),c(e)])]),d])}const _=t(l,[["render",k],["__file","02.进阶与算法.html.vue"]]);export{_ as default};
