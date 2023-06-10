import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as i,c as o,a as n,b as s,f as t,d as c}from"./app-12e502b6.js";const l={},u=n("h1",{id:"结构体",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#结构体","aria-hidden":"true"},"#"),s(" 结构体")],-1),d=n("p",null,"推荐学习：",-1),r={href:"https://www.bilibili.com/video/BV1hv411x7we?p=3",target:"_blank",rel:"noopener noreferrer"},k={href:"https://geektutu.com/post/hpg-struct-alignment.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://segmentfault.com/a/1190000040528007",target:"_blank",rel:"noopener noreferrer"},v={href:"https://mp.weixin.qq.com/s?__biz=MzUxNzA2NzEzNw==&mid=2247483840&idx=1&sn=31a8fc0819e6cc050ace3f5af7a121d9&scene=19#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},b=c(`<h2 id="前言知识" tabindex="-1"><a class="header-anchor" href="#前言知识" aria-hidden="true">#</a> 前言知识</h2><ul><li>字 <code>word</code> :是用于表示其自然的数据单位，也叫<code>machine word</code>。字是电脑用来一次性处理事务的一个固定长度。</li><li>字长：计算机进行一次整数运算所能处理的二进制数据的位数 字的长度</li><li>字节<code>byte</code> ：1字节=8位(1 <code>byte</code> = 8 bit)</li><li>位 <code>bit</code></li></ul><h2 id="什么是内存对齐" tabindex="-1"><a class="header-anchor" href="#什么是内存对齐" aria-hidden="true">#</a> 什么是内存对齐</h2><p>CPU 访问内存时，并不是逐个字节访问，而是以字长（word size）为单位访问，提高内存访问效率。比如 64 位的 CPU ，字长为 8 字节，那么 CPU 访问内存的单位也是 8 字节。</p><p>为保证程序顺利高效运行，编译器会把各种数据类型安排到合适的地址并占用合适长度，确保CPU访问内存次数减少，这就是<strong>内存对齐。</strong></p><h3 id="为什么需要内存对齐" tabindex="-1"><a class="header-anchor" href="#为什么需要内存对齐" aria-hidden="true">#</a> 为什么需要内存对齐</h3><p>CPU 始终以字长访问内存，如果不进行内存对齐，很可能增加 CPU 访问内存的次数，影响性能。</p><p>以32位CPU举例：</p><figure><img src="https://geektutu.com/post/hpg-struct-alignment/memory_alignment.png" alt="memory alignment" tabindex="0" loading="lazy"><figcaption>memory alignment</figcaption></figure><p>每次读取会按照字长作为单位去读取内存数据。</p><p>如果非内存对齐，那么在读取 b 数据时候，就需要分两次读，第一次读取地址 0-3 取 3 （一个字节）第二次读取地址 4-7 取 4-5（两个字节），在进行拼接。</p><p>如果内存对齐，那么无论读取 a 还是 b 数据，都是可以通过一次读取字长来获得。</p><p>总结：合理的内存对齐可以提高内存读写的性能，并且便于实现变量操作的原子性。</p><h2 id="对齐系数" tabindex="-1"><a class="header-anchor" href="#对齐系数" aria-hidden="true">#</a> 对齐系数</h2><p>每种类型的对齐值就是他的对齐系数，内存对齐要求<strong>数据存储地址以及占用字节数是内存对齐的倍数。</strong></p><blockquote><p>怎么确定每个类型的对齐值呢？</p></blockquote><p>这个与平台上的编译器有关。每个特定平台上的编译器都有自己的默认&quot;对齐系数&quot;，常用平台默认对齐系数如下：</p><ul><li>32位系统对齐系数是4</li><li>64位系统对齐系数是8</li></ul><p>而数据类型的对齐系数是<strong>取类型大小与平台的对齐系数种较小的那个</strong>，注意<strong>同一个类型在不同平台上的对齐系数不同。</strong></p><figure><img src="https://cdn.jsdelivr.net/gh/baici1/img-typora/20211115203810.png" alt="image-20211115203810278" tabindex="0" loading="lazy"><figcaption>image-20211115203810278</figcaption></figure><p><code>unsafe</code> 标准库提供了 <code>Alignof</code> 方法，可以返回一个类型的对齐值。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token punctuation">{</span>
	<span class="token keyword">var</span> x <span class="token builtin">string</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Alignof</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//8</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>为什么不统一使用平台最大对齐值呢或者就采用各个类型对应的对齐值？</p></blockquote><p>举例：当前平台是 64 位的，最大对齐系数为 8byte</p><p>存储类型为 int8 占 1 字节</p><figure><img src="https://cdn.jsdelivr.net/gh/baici1/img-typora/20211115210832.png" alt="image-20211115210832404" tabindex="0" loading="lazy"><figcaption>image-20211115210832404</figcaption></figure><p>假设要在 32 位平台，最大对齐系数为 4byte</p><p>存储类型为 int64 占 8 字节</p><figure><img src="https://cdn.jsdelivr.net/gh/baici1/img-typora/20211115212145.png" alt="image-20211115212145440" tabindex="0" loading="lazy"><figcaption>image-20211115212145440</figcaption></figure><p>目的都是减少浪费，提高性能。</p><p>注意：<strong>你要明白对齐系数到底是什么？他是一种帮助变量根据自身的存储容量来更好选择存储地址的一个值。</strong></p><p><strong>他只是来帮助你在一串内存中更好的选择存储地址，存储变量，减少内存访问次数。</strong></p><p>所有的行为与选择都是为了减少内存浪费和提高性能的。</p><h2 id="结构体内存对齐规则" tabindex="-1"><a class="header-anchor" href="#结构体内存对齐规则" aria-hidden="true">#</a> 结构体内存对齐规则</h2><blockquote><p>怎么确定一个结构体的对齐系数</p></blockquote><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token punctuation">{</span>
	<span class="token keyword">type</span> T <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		a <span class="token builtin">int8</span> <span class="token comment">//1</span>
		b <span class="token builtin">int64</span> <span class="token comment">//8</span>
		c <span class="token builtin">int32</span> <span class="token comment">//4</span>
		d <span class="token builtin">int16</span> <span class="token comment">//2</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Alignof</span><span class="token punctuation">(</span>T<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">//8</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span>T<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">//24</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先确定结构体中每一个成员的值，选择最大的作为结构体的对齐系数。</p><blockquote><p>看看结构体如何存储</p></blockquote><p>首先，结构体的起始地址需要是对齐系数的倍数。结构体的每一个字段都要把起始地址当作地址0，根据对齐系数决定自己放在哪儿。</p><p>接下来，逐个分析每个字段：</p><ul><li>a 是第一个字段，他的对齐系数为 1，所以从第 0 个位置开始占据 1 个字节</li><li>b 是第二个字段，他的对齐系数为 8，所以不能从位置 1 开始，开始位置需要时 8 的倍数，所以从第 8 个位置开始占据 8 个字节</li><li>c 是第三个字段，他的对齐系数为 4，接下来的位置（索引为 16）满足 4 的倍数，所以第 16 个位置开始占据 4 个字节</li><li>d 是第四个字段，他的对齐系数为 2，第 20 个位置满足 2 的倍数，所以第 20 个位置开始占据 2 个字节</li></ul><p>所有成员都放好了，其实还没有结束。</p><p>第二个要求：占据的字节满足结构体对齐系数的倍数</p><p>如果到第四个字段结束，它只占据了 22 个字节，不满足倍数，还需要扩展 2 个字节，以满足 8 的倍数。</p><p>最终这个结构体类型大小是 24 字节</p><figure><img src="https://cdn.jsdelivr.net/gh/baici1/img-typora/20211116125055.png" alt="image-20211116125055315" tabindex="0" loading="lazy"><figcaption>image-20211116125055315</figcaption></figure><blockquote><p>如果改变字段的顺序，他的类型大小会发生改变吗？</p></blockquote><p>答：会的！</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> demo1 <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	a <span class="token builtin">int8</span>
	b <span class="token builtin">int16</span>
	c <span class="token builtin">int32</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> demo2 <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	a <span class="token builtin">int8</span>
	c <span class="token builtin">int32</span>
	b <span class="token builtin">int16</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span>demo1<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 8</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span>demo2<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 12</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至于为什么你可以通过方法去分析理由！</p><blockquote><p>空的结构体会怎么对齐？</p></blockquote><p>空的结构体大小为 0，作为其他的结构体字段时候，会不需要内存对齐。但是有一种情况除外：当空的结构体为其他结构体的最后一个字段时候，会需要内存对齐。因为如果有指针指向该字段, 返回的地址将在结构体之外，如果此指针一直存活不释放对应的内存，就会有内存泄露的问题（该内存不因结构体释放而释放）。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> demo3 <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	c <span class="token builtin">int32</span>
	a <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> demo4 <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	a <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	c <span class="token builtin">int32</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span>demo3<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 8</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span>demo4<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 4</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我猜测他的内存对齐与上一个字段一致。</p>`,54);function g(f,h){const a=p("ExternalLinkIcon");return i(),o("div",null,[u,n("blockquote",null,[d,n("p",null,[n("a",r,[s("内存对齐"),t(a)])]),n("p",null,[n("a",k,[s("Go struct 内存对齐"),t(a)])]),n("p",null,[n("a",m,[s("【Golang】详解内存对齐"),t(a)])]),n("p",null,[n("a",v,[s("Dig101:Go之聊聊struct的内存对齐"),t(a)])])]),b])}const w=e(l,[["render",g],["__file","06.结构体.html.vue"]]);export{w as default};
