import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o,c as l,a as n,b as s,f as a,d as t}from"./app-12e502b6.js";const d={},p=n("h1",{id:"gpm",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#gpm","aria-hidden":"true"},"#"),s(" GPM")],-1),r=n("p",null,"推荐学习：",-1),u={href:"https://mp.weixin.qq.com/s?__biz=Mzg5NjIwNzIxNQ==&mid=2247484382&idx=1&sn=cbf22d781d90a2991c6b41d9f592c164&chksm=c005d3def7725ac8bf7555b5fb3533ed33808e84f4ec05926ead12cdf28ee2469c7d0dec8225&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},m={href:"https://juejin.cn/post/6976839612241018888#heading-3",target:"_blank",rel:"noopener noreferrer"},v={href:"https://juejin.cn/post/6976538466863546382#heading-0",target:"_blank",rel:"noopener noreferrer"},b={href:"https://zhuanlan.zhihu.com/p/323271088",target:"_blank",rel:"noopener noreferrer"},k={href:"https://juejin.cn/post/6886321367604527112#heading-0",target:"_blank",rel:"noopener noreferrer"},g=t(`<h2 id="hello-world" tabindex="-1"><a class="header-anchor" href="#hello-world" aria-hidden="true">#</a> hello world！</h2><p>我们一直写 <code>Go</code> 程序，你是否考虑过，一个 <code>hello word！</code>他是如何运行起来的。我们来深挖一波！！</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段程序编译后成为为一个可执行文件，执行时候可执行文件被加载到内存中。相信大家在学校里面学过编译原理，一段简单的汇编代码会分成多个段：数据段，代码段，堆栈段，子程序等等。</p><blockquote><p>数据段</p></blockquote><p>对于数据段，有很多重要的全局变量，我们一起来看看。</p><ul><li>主协程：g0 与 主线程 m0</li></ul><p>协程对应的数据结构是 <code>runtime.g</code>，工作线程对应的数据结构是 <code>runtime.m</code>。\`\`</p><p><code>g0</code> 就是主协程对应的 <code>g</code>，与其他协程不同，他的协程栈实际上是在主线程栈上分配的。</p><p><code>m0</code> 是主线程对应的 <code>m</code>。</p><p><code>g0</code> 持有 <code>m0</code> 的指针，<code>m0</code> 也记录着 <code>g0</code> 的指针。一开始 <code>m0</code> 上执行的协程正是 <code>g0</code>。<code>m0</code> 与 <code>g0</code> 就联系起来了。</p><ul><li>allgs，allm，allp</li></ul><p><code>allgs</code> 记录着所有的 <code>g</code>。</p><p><code>allm</code> 记录着所有的 <code>m</code>。</p><p><code>allp</code> 记录着所有的 <code>p</code>。</p><ul><li>sched</li></ul><p>最初 <code>Go</code> 语言的调度模型里面只有 <code>M</code> 和 <code>G</code>，所以会有一个 <code>G run queue</code> 里面都是待执行的 <code>G</code> ，每个 M 来到队列获取一个 <code>G</code> 时候都会加锁。多个 <code>M</code> 会分担多个 <code>G</code> 的任务，途中会因为前面的 M 频繁加锁和解锁而发生等待，影响程序的并发性能。</p><p>为了解决这个问题，又引入了一个 <code>P</code>，<code>P</code> 对应的数据结构是 <code>runtime.p</code>。他有一个 <code>runq [256]guintptr</code> ，通过把一个 <code>P</code> 关联到一个 <code>M</code>，这个 <code>M</code> 就可以从 <code>P</code> 的本地 <code>runq</code> 这里获取待执行的 <code>G</code>，不用每次都与其他的 <code>M</code> 在队列中争抢任务了，性能也会提升。</p><p>全局 <code>runq</code> 保存在 全局变量 <code>sched</code> 中，<code>sched</code> 代表是调度器，对应的数据结构是 <code>runtime.schedt</code>。这里记录着所有空闲的 <code>M</code>，空闲的 <code>P</code>，以及许多与调度相关的内容。</p><p>如果一个 <code>P</code> 的本地 <code>runq</code> 已满，那么等待执行的 <code>G</code> 会被放到这个全局 <code>runq</code> 中。<code>M</code> 执行 <code>G</code> 过程如下：</p><ol><li><code>M</code> 会先去执行对应的 <code>P</code> 本地 <code>runq</code> 中待执行的 <code>G</code>，</li><li>如果没有的话，再到调度器这里全局 <code>runq</code> 领取任务。</li><li>如果也没有了，就会从别的 <code>P</code> 那里分担一部分的 <code>G</code> 过来执行。</li></ol><figure><img src="https://cdn.jsdelivr.net/gh/baici1/img-typora/20211204194241.png" alt="image-20211204194241881" tabindex="0" loading="lazy"><figcaption>image-20211204194241881</figcaption></figure><blockquote><p>代码段</p></blockquote><p>对于这段程序编译成的代码段，程序入口并不是 <code>main.main</code>，不同平台下程序开始进入入口不同。简单的流程如下：</p><ul><li>进入后再进行一系列检查与初始化等准备工作后，</li><li>当 <code>main.goroutine</code> 创建后会被加入到当前 <code>P</code> 的本地队列中，</li><li>然后通过 <code>mstart</code> 函数开启调度循环，队列中只有 <code>main.goroutine</code> 正在等待执行，所以 <code>g0</code> 会切换成 <code>main.goroutine</code>，</li><li>执行入口就是 <code>runtime.main</code>，他会做一些准备工作，监控线程，包初始化等，</li><li>然后就要调用 <code>main.main</code> 了，终于输出了 <code>hello world！</code>。</li></ul><figure><img src="https://cdn.jsdelivr.net/gh/baici1/img-typora/20211204193223.png" alt="image-20211204193223832" tabindex="0" loading="lazy"><figcaption>image-20211204193223832</figcaption></figure><p>在这里只是简单的用一个例子去介绍了一些相关的代码与变量，后续会进行详细解答。</p><h2 id="详解-gpm" tabindex="-1"><a class="header-anchor" href="#详解-gpm" aria-hidden="true">#</a> 详解 GPM</h2><p>我们在前面总说 <code>GPM</code> ，那么他们分别代表什么意思呢？</p><ul><li><code>G</code> 代表 <code>Goroutine</code>，<code>Golang</code> 中的协程，通过 <code>Goroutine</code> 封装的代码片段将以协程方式并发执行，是GPM调度器调度的基本单位。</li><li><code>P</code> 代表 <code>Processor</code>，<code>GPM</code> 调度器中关联内核级线程与协程的中间调度器，帮助线程去执行协程的任务。</li><li><code>M</code> 代表 <code>Machine</code>，是内核线程的封装，<code>Goroutine</code>的执行提供了底层线程能力支持。</li></ul><blockquote><p>白话解释：<code>M</code> 需要去执行 <code>G</code> 的任务，为了更高并发执行性能，我们引入 <code>P</code>，来起到帮助作用。</p></blockquote><h3 id="m" tabindex="-1"><a class="header-anchor" href="#m" aria-hidden="true">#</a> M</h3><p>我们来看看 M 的结构：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> m <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   g0      <span class="token operator">*</span>g  <span class="token comment">//g 结构体指针，主协程对应的 g0  </span>
   mstartfn      <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//函数类型，对应着当前内核线程需要执行的 Goroutine 函数片段</span>
   curg          <span class="token operator">*</span>g      <span class="token comment">//g 结构体指针，对应着当前该 M 相关联(要执行)的 G。</span>
   p             puintptr  <span class="token comment">//地址类型，对应着当前该 M 关联的 P。</span>
   nextp         puintptr <span class="token comment">//地址类型，标识下一个可能与该 M 存在关联的 P。</span>
   oldp          puintptr  <span class="token comment">//地址类型，记录上一个与该 M 关联的 P。</span>
   lockedg       guintptr <span class="token comment">//地址类型，标识当前正在锁定该 M 的G，通过 LockOSThread 进行 G 和 M 的锁定，一旦 G 和 M 锁定后，该 G 只可由该 M 执行。</span>
   spinning      <span class="token builtin">bool</span> <span class="token comment">//布尔类型，表示当前是否正在自旋，自旋则代表当前 M 正在寻找可执行的 G。</span>
   incgo         <span class="token builtin">bool</span> <span class="token comment">//布尔类型，表示当前是否正在执行 cgo 调用。</span>
   ncgo          <span class="token builtin">int32</span> <span class="token comment">//int32类型，表示当前正在执行的 cgo 调用数目。</span>
   <span class="token comment">// 忽略</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="p" tabindex="-1"><a class="header-anchor" href="#p" aria-hidden="true">#</a> P</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> <span class="token punctuation">(</span>
   _Pidle <span class="token operator">=</span> <span class="token boolean">iota</span> <span class="token comment">//当前p尚未与任何m关联，处于空闲状态 -&gt;0</span>
   _Prunning <span class="token comment">//当前p已经和m关联，并且正在运行g代码 -&gt;1</span>
   _Psyscall  <span class="token comment">//当前p正在执行系统调用 -&gt;2</span>
   _Pgcstop <span class="token comment">//当前p需要停止调度，一般在GC前或者刚被创建时 -&gt;3</span>
   _Pdead <span class="token comment">//当前p已死亡，不会再被调度 -&gt;4</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> p <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   status      <span class="token builtin">uint32</span>  <span class="token comment">//表示当前P的状态，为上述五个状态之一</span>
   schedtick   <span class="token builtin">uint32</span>  <span class="token comment">//调度计数器，每被调度一次则自增1</span>
   syscalltick <span class="token builtin">uint32</span>  <span class="token comment">//系统调用计数器，每进行一次系统调用则自增1</span>
   m           muintptr <span class="token comment">//即将要关联的m，M的nextp字段对应着该P</span>
   runqhead <span class="token builtin">uint32</span> <span class="token comment">//可运行G队列头，标识目前正在运行的G</span>
   runqtail <span class="token builtin">uint32</span>  <span class="token comment">//可运行G队列尾</span>
   runq     <span class="token punctuation">[</span><span class="token number">256</span><span class="token punctuation">]</span>guintptr <span class="token comment">//可运行的G队列，默认容量为256个G</span>
   runnext guintptr <span class="token comment">//下一个将要运行的G</span>
   gFree <span class="token keyword">struct</span> <span class="token punctuation">{</span> <span class="token comment">//空闲G列表，存储着状态为Gdead的G，当其数目过多时，将会被转移到调度器全局G列表，用于被其他P再次使用（相当于一个G缓存池）</span>
      gList
      n <span class="token builtin">int32</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>P</code> 的生命周期：</p><figure><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8b1bab3f170480aac6592b2aa8afa57~tplv-k3u1fbpfcp-watermark.awebp" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h3 id="g" tabindex="-1"><a class="header-anchor" href="#g" aria-hidden="true">#</a> G</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> <span class="token punctuation">(</span>
   _Gidle <span class="token operator">=</span> <span class="token boolean">iota</span> <span class="token comment">//当前 G 刚被分配，还未初始化 -&gt;0</span>
   _Grunnable <span class="token comment">//正在可运行队列等待运行 -&gt;1</span>
   _Grunning  <span class="token comment">//正在运行中，执行G函数 -&gt;2</span>
   _Gsyscall  <span class="token comment">//正在执行系统调用 -&gt;3</span>
   _Gwaiting  <span class="token comment">//正在被阻塞，一般是该G正在执行网络I/O操作，或正在执行time.Timer、time.Sleep -&gt;4</span>
   _Gmoribund_unused <span class="token comment">//_Gmoribund_unused is currently unused, but hardcoded in gdb -&gt;5</span>
   _Gdead  <span class="token comment">//已经使用完正在闲置，放入空闲G列表中，可被再次使用（和P不同，P处于Pdead状态则无法被再次调度） -&gt;6</span>
  _Genqueue_unused <span class="token comment">//_ Genqueue _ unused 当前未使用。 -&gt;7</span>
   _Gcopystack <span class="token comment">//表示当前 G 的栈正在被移动，可能是因为栈的收缩或扩容 -&gt;8</span>
   _Gscan         <span class="token operator">=</span> <span class="token number">0x1000</span> <span class="token comment">//表明当前正在进行GC扫描，由于在GC扫描的过程中肯定会处于某个前置状态， </span>
   _Gscanrunnable <span class="token operator">=</span> _Gscan <span class="token operator">+</span> _Grunnable <span class="token comment">//代表当前 G 正等待运行，同时栈正被 GC 扫描  // 0x1001</span>
   _Gscanrunning  <span class="token operator">=</span> _Gscan <span class="token operator">+</span> _Grunning <span class="token comment">//表示正处于 Grunning状态，同时栈在被 GC 扫描 // 0x1002</span>
   _Gscansyscall  <span class="token operator">=</span> _Gscan <span class="token operator">+</span> _Gsyscall <span class="token comment">//表示正处于 Gwaiting状态，同时栈在被 GC 扫描 // 0x1003</span>
   _Gscanwaiting  <span class="token operator">=</span> _Gscan <span class="token operator">+</span> _Gwaiting <span class="token comment">//表示正处于 Gsyscall状态，同时栈在被 GC 扫描 // 0x1004</span>
    _Gscanpreempted <span class="token operator">=</span> _Gscan <span class="token operator">+</span> _Gpreempted <span class="token comment">// 0x1009</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> g <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   stack       stack   <span class="token comment">// offset known to runtime/cgo //当前G所被分配的栈内存空间，由lo及hi两个内存指针组成</span>
   stackguard0 <span class="token builtin">uintptr</span> <span class="token comment">// offset known to liblink g0的最大栈内存地址，当超过了这个数值则需要进行栈扩张</span>
   stackguard1 <span class="token builtin">uintptr</span> <span class="token comment">//普通用户G的最大栈内存地址，当超过了这个数值则需要进行栈扩张</span>
   m              <span class="token operator">*</span>m      <span class="token comment">// current m; offset known to arm liblink 当前关联该G实例的M实例</span>
   sched          gobuf  <span class="token comment">//记录G上下文环境，用于上下文切换</span>
   atomicstatus   <span class="token builtin">uint32</span> <span class="token comment">//G的状态值，表示上述几个状态</span>
   waitreason     waitReason <span class="token comment">// if status==Gwaiting 处于Gwaiting的原因</span>
   preempt        <span class="token builtin">bool</span>       <span class="token comment">// preemption signal, duplicates stackguard0 = st 当前G是否可抢占</span>
   startpc        <span class="token builtin">uintptr</span>         <span class="token comment">// pc of goroutine function 当前G所绑定的函数内存地址</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>G</code> 生命周期：</p><figure><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c6c550b00bcd41ea9a3ff4222e87e40e~tplv-k3u1fbpfcp-watermark.awebp" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h3 id="sched-调度器" tabindex="-1"><a class="header-anchor" href="#sched-调度器" aria-hidden="true">#</a> sched (调度器)</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> schedt <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   <span class="token comment">// 全局唯一id</span>
   goidgen  <span class="token builtin">uint64</span>
   <span class="token comment">// 记录的最后一次从i/o中查询G的时间</span>
   lastpoll <span class="token builtin">uint64</span>
   <span class="token comment">// 互斥锁 </span>
   lock mutex
   <span class="token comment">// M的空闲链表，通过m.schedlink组成一个M空闲链表</span>
   midle        muintptr
   <span class="token comment">// 正处于自旋状态的M数量</span>
   nmidle       <span class="token builtin">int32</span>
   <span class="token comment">// 已经被锁定且正在自旋的M数量</span>
   nmidlelocked <span class="token builtin">int32</span>
   <span class="token comment">// 下一个M的id，或者是目前已存在的M数量</span>
   mnext        <span class="token builtin">int64</span>
   <span class="token comment">// M数量的最大值</span>
   maxmcount    <span class="token builtin">int32</span>
   <span class="token comment">// 已被释放掉的M数量</span>
   nmfreed      <span class="token builtin">int64</span>
   <span class="token comment">// 系统所开启的协程数量（非用户协程）</span>
   ngsys <span class="token builtin">uint32</span>
   <span class="token comment">// 空闲P列表</span>
   pidle      puintptr
   <span class="token comment">// 空闲的P数量</span>
   npidle     <span class="token builtin">uint32</span>
   <span class="token comment">// 全局的G队列</span>
   <span class="token comment">// 根据runqhead可以获取队列头的G及g.schedlink形成G链表</span>
   runqhead guintptr
   runqtail guintptr
   <span class="token comment">// 全局G队列大小</span>
   runqsize <span class="token builtin">int32</span>
   <span class="token comment">// 等待释放的M列表</span>
   freem <span class="token operator">*</span>m
   <span class="token comment">// 是否需要暂停调度（通常因为GC带来的STW）</span>
   gcwaiting  <span class="token builtin">uint32</span>
   <span class="token comment">// 需要停止但是仍为停止的P数量</span>
   stopwait   <span class="token builtin">int32</span>
   <span class="token comment">// 实现stopwait事件通知</span>
   stopnote   note
   <span class="token comment">// 停止调度期间是否进行系统监控任务</span>
   sysmonwait <span class="token builtin">uint32</span>
   <span class="token comment">// 实现sysmonwait事件通知</span>
   sysmonnote note
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="核心容器" tabindex="-1"><a class="header-anchor" href="#核心容器" aria-hidden="true">#</a> 核心容器</h3><figure><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c64fb28175494bb0b2419bd1fe0d760e~tplv-k3u1fbpfcp-watermark.awebp" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h2 id="详解调度过程" tabindex="-1"><a class="header-anchor" href="#详解调度过程" aria-hidden="true">#</a> 详解调度过程</h2><h2 id="系统初始化" tabindex="-1"><a class="header-anchor" href="#系统初始化" aria-hidden="true">#</a> 系统初始化</h2><p>Go 程序的引导程序启动进行系统初始化，核心步骤：</p><ol><li></li></ol>`,50);function h(G,f){const e=c("ExternalLinkIcon");return o(),l("div",null,[p,n("blockquote",null,[r,n("p",null,[n("a",u,[s("【Golang】一个Hello World程序的执行"),a(e)])]),n("p",null,[n("a",m,[s("Golang并发编程-GPM调度过程源码分析"),a(e)])]),n("p",null,[n("a",v,[s("Golang并发编程-GPM协程调度模型原理及结构分析"),a(e)])]),n("p",null,[n("a",b,[s("[典藏版]Golang调度器GPM原理与调度全分析"),a(e)])]),n("p",null,[n("a",k,[s("Golang并发调度的GMP模型"),a(e)])])]),g])}const w=i(d,[["render",h],["__file","17.GPM.html.vue"]]);export{w as default};
