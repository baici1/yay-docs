import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as i,c,a as n,b as s,f as t,d as o}from"./app-12e502b6.js";const l={},u=n("h1",{id:"go语言启动流程",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#go语言启动流程","aria-hidden":"true"},"#"),s(" Go语言启动流程")],-1),d=n("p",null,"推荐阅读：",-1),r={href:"https://golang.design/under-the-hood/zh-cn/part1basic/ch02life/boot/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://juejin.cn/post/6976839612241018888#heading-3",target:"_blank",rel:"noopener noreferrer"},k={href:"http://www.pefish.club/2020/05/08/Golang/1005%E6%B7%B1%E5%85%A5Golang%E5%90%AF%E5%8A%A8%E8%BF%87%E7%A8%8B/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/0voice/Introduction-to-Golang/blob/main/%E6%96%87%E7%AB%A0/%E4%BB%8E%E6%BA%90%E7%A0%81%E8%A7%92%E5%BA%A6%E7%9C%8B%20Golang%20%E7%9A%84%E8%B0%83%E5%BA%A6.md",target:"_blank",rel:"noopener noreferrer"},b=n("strong",null,"从源码角度看 Golang 的调度",-1),g=o(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>每次写 Go 程序我总是好奇他的启动流程，今天我们来扒一扒。</p><p>注：我用的电脑是 <code>win10</code>，所以很多地方并不是以 <code>linux</code> 为主。同时这是我自己的一个学习过程，可能会有错误，希望能够得到指导！</p><p>同时文章中的部分代码会经过处理的，会更注重于核心代码流程。</p><p>希望读者能够懂一点点的汇编语言。</p><h2 id="汇编" tabindex="-1"><a class="header-anchor" href="#汇编" aria-hidden="true">#</a> 汇编</h2><p>Go 程序启动需要对自身运行时进行初始化，其真正的程序入口在 <code>runtime</code> 包里面。</p><p>不同平台的入口文件都不同， 以 <code>AMD64</code> 架构上的 <code>Linux</code> 和 <code>macOS</code> 以及 <code>win10</code> 为例，分别位于：<code>src/runtime/rt0_linux_amd64.s</code> 和 <code>src/runtime/rt0_darwin_amd64.s</code> 以及 <code>src/runtime/rt0_windows_amd64.s</code>。</p><p>这三个文件你都可以看到相类似的入口代码。</p><div class="language-assembly line-numbers-mode" data-ext="assembly"><pre class="language-assembly"><code># runtime/rt0_windows_amd64.s
#以windows 为例，linux 和macos 都是一致，只是名字的改变罢了。
TEXT _rt0_amd64_windows(SB),NOSPLIT,$-8
	JMP	_rt0_amd64(SB)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>JMP</code> 是无条件跳转，接着就跳转到了 <code>_rt0_amd64</code> 这个子程序。</p><blockquote><p>这种做法符合直觉，在程序编译为机器码之后， 依赖特定 CPU 架构的指令集，而操作系统的差异则是直接反应在运行时进行不同的系统级操作上， 例如：系统调用。</p><p><code>rt0</code> 其实是 <code>runtime0</code> 的缩写，意为运行时的创生，随后所有创建的都是 <code>1</code> 为后缀。</p></blockquote><p>操作系统通过入口参数的约定与应用程序进行沟通。程序刚刚启动时，栈指针 SP 的前两个值分别对应 <code>argc</code> 和 <code>argv</code>，分别存储参数的数量和具体的参数的值</p><div class="language-assembly line-numbers-mode" data-ext="assembly"><pre class="language-assembly"><code># runtime/asm_amd64.s
# _rt0_amd64 is common startup code for most amd64 systems when using
# internal linking. This is the entry point for the program from the
# kernel for an ordinary -buildmode=exe program. The stack holds the
# number of arguments and the C-style argv.
#_rt0_amd64 是使用内部链接时大多数 amd64 系统的常见启动代码。这是普通 -buildmode=exe 程序的内核程序的入口点。堆栈保存参数的数量和 C 风格的 argv。
TEXT _rt0_amd64(SB),NOSPLIT,$-8
	MOVQ	0(SP), DI	// argc
	LEAQ	8(SP), SI	// argv
	JMP	runtime·rt0_go(SB)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="rt0-go" tabindex="-1"><a class="header-anchor" href="#rt0-go" aria-hidden="true">#</a> rt0_go</h3><p>接着继续跳转到 <code>rt0_go</code> 子程序里面。</p><p>我们来细细扒一扒这个里面的逻辑。</p><p>这前面一部分就是为了去确定程序入口参数和 <code>CPU</code> 处理器信息。</p><div class="language-assembly line-numbers-mode" data-ext="assembly"><pre class="language-assembly"><code># runtime/asm_amd64.s
TEXT runtime·rt0_go(SB),NOSPLIT|TOPFRAME,$0
	// 将参数向前复制到一个偶数栈上
	MOVQ	DI, AX		// argc
	MOVQ	SI, BX		// argv
	SUBQ	$(4*8+7), SP		// 2args 2auto
	ANDQ	$~15, SP
	MOVQ	AX, 16(SP)
	MOVQ	BX, 24(SP)

	#从给定的（操作系统）堆栈中创建 istack。 _cgo_init 可能会更新 stackguard。
	# 初始化 g0 执行栈
	MOVQ	$runtime·g0(SB), DI
	LEAQ	(-64*1024+104)(SP), BX
	MOVQ	BX, g_stackguard0(DI)
	MOVQ	BX, g_stackguard1(DI)
	MOVQ	BX, (g_stack+stack_lo)(DI)
	MOVQ	SP, (g_stack+stack_hi)(DI)

	// 确定 CPU 处理器的信息
	MOVL	$0, AX
	CPUID
	MOVL	AX, SI
	CMPL	AX, $0
	JE	nocpuinfo
		#弄清楚如何序列化 RDTSC。在英特尔处理器上，LFENCE 就足够了。 AMD 需要 MFENCE。不知道其余的，所以让我们做MFENCE。
	CMPL	BX, $0x756E6547  // &quot;Genu&quot;
	JNE	notintel
	CMPL	DX, $0x49656E69  // &quot;ineI&quot;
	JNE	notintel
	CMPL	CX, $0x6C65746E  // &quot;ntel&quot;
	JNE	notintel
	MOVB	$1, runtime·isIntel(SB)
	MOVB	$1, runtime·lfenceBeforeRdtsc(SB)
# 省略了一大段代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个影响运行时非常重要的操作便是本地线程存储 （Thread Local Storage, TLS）。</p><div class="language-assembly line-numbers-mode" data-ext="assembly"><pre class="language-assembly"><code># runtime/asm_amd64.s
TEXT runtime·rt0_go(SB),NOSPLIT|TOPFRAME,$0
# 省略了一大段代码

notintel:
#ifdef GOOS_darwin
	// 跳过 Darwin 上的 TLS 设置
	JMP ok
#endif
	LEAQ	runtime·m0+m_tls(SB), DI #// DI = m0.tls
	CALL	runtime·settls(SB) # 将 TLS 地址设置到 DI

	// // 使用它进行存储，确保能正常运行
	get_tls(BX)
	MOVQ	$0x123, g(BX)
	MOVQ	runtime·m0+m_tls(SB), AX 
	CMPQ	AX, $0x123 // 判断 TLS 是否设置成功
	JEQ 2(PC)  // 如果相等则向后跳转两条指令
	CALL	runtime·abort(SB) // 使用 INT 指令执行中断
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建全局变量 <code>g0</code> 和 <code>m0</code>，还需要将 <code>m0</code> 和 <code>g0</code> 通过指针进行相互关联。</p><div class="language-assembly line-numbers-mode" data-ext="assembly"><pre class="language-assembly"><code># runtime/asm_amd64.s
TEXT runtime·rt0_go(SB),NOSPLIT|TOPFRAME,$0
# 省略了一大段代码
	// 设置 per-goroutine 和 per-mach“寄存器”
	// 程序刚刚启动，此时位于主线程
	// 当前栈与资源保存在 g0
	// 该线程保存在 m0
	get_tls(BX)
	LEAQ	runtime·g0(SB), CX
	MOVQ	CX, g(BX)
	LEAQ	runtime·m0(SB), AX
	//m0 和 g0 通过指针进行相互关联。
	// save m-&gt;g0 = g0
	MOVQ	CX, m_g0(AX)
	// save m0 to g0-&gt;m
	MOVQ	AX, g_m(CX)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里做一些校验和系统级的初始化工作，包括：运行时类型检查， 系统参数的获取以及影响内存管理和程序调度的相关常量的初始化。</p><div class="language-assembly line-numbers-mode" data-ext="assembly"><pre class="language-assembly"><code># runtime/asm_amd64.s
TEXT runtime·rt0_go(SB),NOSPLIT|TOPFRAME,$0
# 省略了一大段代码

	CLD				// convention is D is always left cleared
	//运行时类型检查
	CALL	runtime·check(SB)

	MOVL	16(SP), AX		// copy argc
	MOVL	AX, 0(SP)
	MOVQ	24(SP), AX		// copy argv
	MOVQ	AX, 8(SP)
	//系统参数的获取
	CALL	runtime·args(SB)
	//影响内存管理的相关常量的初始化。
	CALL	runtime·osinit(SB)
	//程序调度的相关常量的初始化
	CALL	runtime·schedinit(SB)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>马上就要开始运行了！</p><div class="language-assembly line-numbers-mode" data-ext="assembly"><pre class="language-assembly"><code># runtime/asm_amd64.s
TEXT runtime·rt0_go(SB),NOSPLIT|TOPFRAME,$0
# 省略了一大段代码

	// 创建一个新的 goroutine 来启动程序
	MOVQ	$runtime·mainPC(SB), AX		// entry // entry mainPC方法（也就是runtime·main函数，是一个全局变量）压入AX寄存器
	PUSHQ	AX
	PUSHQ	$0			// arg size 压入第一个参数到栈
	CALL	runtime·newproc(SB) // 调用 newproc 函数创建一个新的g
	POPQ	AX
	POPQ	AX

	// 启动这个 M.mstart 
	CALL	runtime·mstart(SB)

	CALL	runtime·abort(SB)	// M.mstart 应该永不返回
	RET

	//防止 debugCallV2 的死代码消除，它旨在由调试器调用。
	MOVQ	$runtime·debugCallV2&lt;ABIInternal&gt;(SB), AX
	RET
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译器负责生成了 <code>main</code> 函数的入口地址，<code>runtime.mainPC</code> 在数据段中被定义为 <code>runtime.main</code> 保存主 <code>goroutine</code> 入口地址：</p><div class="language-assembly line-numbers-mode" data-ext="assembly"><pre class="language-assembly"><code># mainPC 是 runtime.main 的函数值，要传递给 newproc。对 runtime.main 的引用是通过 ABIInternal 进行的，因为 newproc 需要实际的函数（不是 ABI0 包装器）。
DATA	runtime·mainPC+0(SB)/8,$runtime·main&lt;ABIInternal&gt;(SB)
GLOBL	runtime·mainPC(SB),RODATA,$8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当 Go 程序的引导程序启动会调用下面核心函数完成校验与系统初始化：</p><ul><li><code>check</code> ：运行时类型检查</li><li><code>args</code> ： 系统参数的获取</li><li><code>osinit</code> ：影响内存管理的相关常量的初始化</li><li><code>schedinit</code> ：程序调度与内存分配器、回收器的相关常量的初始化</li><li><code>newproc</code>：负责根据主 <code>goroutine</code> （即 <code>main</code>）入口地址创建可被运行时调度的执行单元 <code>G</code>。</li><li><code>mstart</code> ：开始启动调度器的调度循环。</li></ul><p>根据分析，我们知道了，Go 程序既不是从 <code>main.main</code> 直接启动，也不是从 <code>runtime.main</code> 直接启动。 相反，其实际的入口位于 <code>runtime._rt0_amd64_*</code>。随后会转到 <code>runtime.rt0_go</code> 调用。</p><p>程序引导和初始化工作是整个运行时最关键的基础步骤之一。在 <code>schedinit</code> 这个函数的调用过程中， 还会完成整个程序运行时的初始化，包括调度器、执行栈、内存分配器、调度器、垃圾回收器等组件的初始化。 最后通过 <code>newproc</code> 和 <code>mstart</code> 调用进而开始由调度器转为执行主 <code>goroutine</code>。</p><p>启动流程图如下：</p><figure><img src="https://cdn.jsdelivr.net/gh/baici1/img-typora/20211206191645.png" alt="image-20211206191645379" tabindex="0" loading="lazy"><figcaption>image-20211206191645379</figcaption></figure><h2 id="核心函数" tabindex="-1"><a class="header-anchor" href="#核心函数" aria-hidden="true">#</a> 核心函数</h2><p>我们在之前的分析里面了解到一些核心函数，现在我们来简单看看里面的逻辑，到底每个函数具体工作是什么？至于解析背后的原理，我们留到具体的章节去考虑。</p><p><code>check</code> 函数，本质上是对编译器翻译工作的一个校验，再次检验类型的内存大小。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">//# runtime/runtime1.go</span>
<span class="token keyword">func</span> <span class="token function">check</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> <span class="token punctuation">(</span>
		a     <span class="token builtin">int8</span>
		b     <span class="token builtin">uint8</span>
		c     <span class="token builtin">int16</span>
		d     <span class="token builtin">uint16</span>
        <span class="token comment">//省略</span>
	<span class="token punctuation">)</span>
    <span class="token keyword">type</span> x1t <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		x <span class="token builtin">uint8</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">type</span> y1t <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		x1 x1t
		y  <span class="token builtin">uint8</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">var</span> x1 x1t
	<span class="token keyword">var</span> y1 y1t
	<span class="token comment">// 校验 int8 类型 sizeof 是否为 1，下同</span>
	<span class="token keyword">if</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">1</span> <span class="token punctuation">{</span>
		<span class="token function">throw</span><span class="token punctuation">(</span><span class="token string">&quot;bad a&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    <span class="token comment">//省略</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>args</code> 函数，将操作系统传递 <code>argc,argv</code> 两个参数赋值作为全局变量使用</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">//# runtime/runtime1.go</span>
<span class="token keyword">var</span> <span class="token punctuation">(</span>
	argc <span class="token builtin">int32</span>
	argv <span class="token operator">*</span><span class="token operator">*</span><span class="token builtin">byte</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">args</span><span class="token punctuation">(</span>c <span class="token builtin">int32</span><span class="token punctuation">,</span> v <span class="token operator">*</span><span class="token operator">*</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	argc <span class="token operator">=</span> c 
	argv <span class="token operator">=</span> v
	<span class="token function">sysargs</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> v<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://golang.design/under-the-hood/assets/proc-stack.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>那么接下来调用系统特定的 <code>sysargs</code> 函数。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">//runtime/os_dragonfly.go</span>
<span class="token keyword">func</span> <span class="token function">sysargs</span><span class="token punctuation">(</span>argc <span class="token builtin">int32</span><span class="token punctuation">,</span> argv <span class="token operator">*</span><span class="token operator">*</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 跳过 argv, envv 与第一个字符串为路径</span>
	n <span class="token operator">:=</span> argc <span class="token operator">+</span> <span class="token number">1</span>

	<span class="token comment">//跳过 argv, envp 进入 auxv</span>
	<span class="token keyword">for</span> <span class="token function">argv_index</span><span class="token punctuation">(</span>argv<span class="token punctuation">,</span> n<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		n<span class="token operator">++</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// skip NULL separator // 跳过 NULL 分隔符</span>
	n<span class="token operator">++</span>
	<span class="token comment">// 尝试读取 auxv</span>
	auxv <span class="token operator">:=</span> <span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">[</span><span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">28</span><span class="token punctuation">]</span><span class="token builtin">uintptr</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Pointer</span><span class="token punctuation">(</span>argv<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">uintptr</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token operator">*</span>sys<span class="token punctuation">.</span>PtrSize<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token function">sysauxv</span><span class="token punctuation">(</span>auxv<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">sysauxv</span><span class="token punctuation">(</span>auxv <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">uintptr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 依次读取 auxv 键值对</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> auxv<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> _AT_NULL<span class="token punctuation">;</span> i <span class="token operator">+=</span> <span class="token number">2</span> <span class="token punctuation">{</span>
		tag<span class="token punctuation">,</span> val <span class="token operator">:=</span> auxv<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> auxv<span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span>
		<span class="token keyword">switch</span> tag <span class="token punctuation">{</span>
		<span class="token keyword">case</span> _AT_PAGESZ<span class="token punctuation">:</span>
            <span class="token comment">// 读取内存页的大小</span>
			physPageSize <span class="token operator">=</span> val
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里我已经懵了，已经涉及到了操作系统的底层那些内存页等等了。这里就不多去解释。我已经不懂了。😥</p><p><code>osinit</code> 函数，会获取CPU核数，还会获取当前操作系统的页存大小。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">//runtime/os_dragonfly.go</span>
<span class="token keyword">func</span> <span class="token function">osinit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取CPU核数</span>
	ncpu <span class="token operator">=</span> <span class="token function">getncpu</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> physPageSize <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		physPageSize <span class="token operator">=</span> <span class="token function">getPageSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>schedinit</code> 函数，名字上是调度器的一个初始化，其实内部实际上干的事情都是一些核心部分的初始化，例如：栈，内存，gc，线程等等。</p><p>这里的初始化也是有一定顺序规则的，至于为什么，可能是因为前面的函数为后面的函数提供一定的重要数据。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 引导的序列 is:</span>
<span class="token comment">//	call osinit</span>
<span class="token comment">//	call schedinit</span>
<span class="token comment">//	make &amp; queue new G //将new G加入到队列中</span>
<span class="token comment">//	call runtime·mstart </span>
<span class="token comment">// The new G calls runtime·main. </span>
<span class="token keyword">func</span> <span class="token function">schedinit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">lockInit</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>sched<span class="token punctuation">.</span>lock<span class="token punctuation">,</span> lockRankSched<span class="token punctuation">)</span>
    <span class="token comment">//省略 lockinit</span>

	<span class="token comment">//获取 g 的一个对象</span>
	_g_ <span class="token operator">:=</span> <span class="token function">getg</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	sched<span class="token punctuation">.</span>maxmcount <span class="token operator">=</span> <span class="token number">10000</span> <span class="token comment">// 限制最大系统线程数量</span>

	<span class="token comment">// The world starts stopped.  用于lock rank,</span>
	<span class="token function">worldStopped</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token function">moduledataverify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">stackinit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 初始化执行栈</span>
	<span class="token function">mallocinit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 初始化内存分配器</span>
	<span class="token function">fastrandinit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// must run before mcommoninit // 随机数初始化，</span>
	<span class="token function">mcommoninit</span><span class="token punctuation">(</span>_g_<span class="token punctuation">.</span>m<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> 	<span class="token comment">// 初始化当前系统线程 //预分配的 ID 可以作为“id”传递，或者通过传递 -1 来省略。</span>
	<span class="token function">cpuinit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>       <span class="token comment">// must run before alginit // 初始化CPU信息</span>
	<span class="token function">alginit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>       <span class="token comment">// maps must not be used before this call // 主要初始化哈希算法的值</span>
	<span class="token function">modulesinit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>   <span class="token comment">// provides activeModules // activeModules数据初始化，主要是用于gc的数据,</span>
	<span class="token function">typelinksinit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// uses maps, activeModules // 主要初始化activeModules的typemap</span>
	<span class="token function">itabsinit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>     <span class="token comment">// uses activeModules  // 初始化interface相关，</span>

	<span class="token function">sigsave</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>_g_<span class="token punctuation">.</span>m<span class="token punctuation">.</span>sigmask<span class="token punctuation">)</span> <span class="token comment">// 初始化m的signal mask</span>
	initSigmask <span class="token operator">=</span> _g_<span class="token punctuation">.</span>m<span class="token punctuation">.</span>sigmask

	<span class="token function">goargs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">// 参数放到argslice变量中</span>
	<span class="token function">goenvs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">// 环境变量放到envs中</span>
	<span class="token function">parsedebugvars</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">// 初始化一系列debug相关的变量</span>
	<span class="token function">gcinit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">// 垃圾回收器初始化</span>
	<span class="token comment">//调度器加锁</span>
	<span class="token function">lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>sched<span class="token punctuation">.</span>lock<span class="token punctuation">)</span>
	sched<span class="token punctuation">.</span>lastpoll <span class="token operator">=</span> <span class="token function">uint64</span><span class="token punctuation">(</span><span class="token function">nanotime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">// 创建 P</span>
	<span class="token comment">// 通过 CPU 核心数和 GOMAXPROCS 环境变量确定 P 的数量</span>
	procs <span class="token operator">:=</span> ncpu <span class="token comment">// // procs设置成cpu个数</span>
	<span class="token keyword">if</span> n<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token function">atoi32</span><span class="token punctuation">(</span><span class="token function">gogetenv</span><span class="token punctuation">(</span><span class="token string">&quot;GOMAXPROCS&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token operator">&amp;&amp;</span> n <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>  <span class="token comment">// 如果GOMAXPROCS有设置，则覆盖procs的值</span>
		procs <span class="token operator">=</span> n
	<span class="token punctuation">}</span>
    <span class="token comment">// 增加或减少p的实例个数(填procs个p到存放所有p的全局变量allp中)，多了就清理多的p，少了就新建p，但是并没有启动m，m启动后会从这里取p并挂钩上</span>
	<span class="token keyword">if</span> <span class="token function">procresize</span><span class="token punctuation">(</span>procs<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">throw</span><span class="token punctuation">(</span><span class="token string">&quot;unknown runnable goroutine during bootstrap&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    <span class="token comment">//调度器解锁</span>
	<span class="token function">unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>sched<span class="token punctuation">.</span>lock<span class="token punctuation">)</span>
	<span class="token comment">//省略一大段代码</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>newproc</code> 函数，当前 <code>M</code> 的 <code>P</code> 下创建了一个新的 <code>G</code>，其实也就是我们期待的 <code>runtime.main</code>，不会一开始就直接添加到运行队列中，而是放到 <code>P</code> 的本地队列，成为下一个运行的 <code>G</code>。</p><blockquote><p>为什么这里一定要放到 runtime.runnext，不是运行队列中呢？</p></blockquote><p>我的猜测当前是 <code>G0</code>,而且此时其实 <code>m</code> 的对应线程并没有创建出来，现在只是再初始化一些 <code>m</code> 的相关属性，所以不适合直接放入到运行队列中。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">newproc</span><span class="token punctuation">(</span>siz <span class="token builtin">int32</span><span class="token punctuation">,</span> fn <span class="token operator">*</span>funcval<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	argp <span class="token operator">:=</span> <span class="token function">add</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Pointer</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>fn<span class="token punctuation">)</span><span class="token punctuation">,</span> sys<span class="token punctuation">.</span>PtrSize<span class="token punctuation">)</span>
	gp <span class="token operator">:=</span> <span class="token function">getg</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 获取当前goroutine的指针，</span>
	pc <span class="token operator">:=</span> <span class="token function">getcallerpc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 获取伪寄存器PC的内容，函数也是由编译器填充</span>
	<span class="token function">systemstack</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//创建一个新的G</span>
		newg <span class="token operator">:=</span> <span class="token function">newproc1</span><span class="token punctuation">(</span>fn<span class="token punctuation">,</span> argp<span class="token punctuation">,</span> siz<span class="token punctuation">,</span> gp<span class="token punctuation">,</span> pc<span class="token punctuation">)</span> <span class="token comment">//关键函数</span>
		<span class="token comment">//获取P的指针</span>
		_p_ <span class="token operator">:=</span> <span class="token function">getg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>m<span class="token punctuation">.</span>p<span class="token punctuation">.</span><span class="token function">ptr</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">//将新创建的的 G，添加到 runtime.runnext 队列中如果运行队列满了，就添加到全局队列供其他P进行调度</span>
		<span class="token function">runqput</span><span class="token punctuation">(</span>_p_<span class="token punctuation">,</span> newg<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
		<span class="token comment">//尝试再添加一个 P 来执行 G 的。当 G 变为可运行时调用（newproc，ready）。</span>
		<span class="token keyword">if</span> mainStarted <span class="token punctuation">{</span>
			<span class="token function">wakep</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">newproc1</span><span class="token punctuation">(</span>fn <span class="token operator">*</span>funcval<span class="token punctuation">,</span> argp unsafe<span class="token punctuation">.</span>Pointer<span class="token punctuation">,</span> narg <span class="token builtin">int32</span><span class="token punctuation">,</span> callergp <span class="token operator">*</span>g<span class="token punctuation">,</span> callerpc <span class="token builtin">uintptr</span><span class="token punctuation">)</span> <span class="token operator">*</span>g <span class="token punctuation">{</span>
    <span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span>
	_g_ <span class="token operator">:=</span> <span class="token function">getg</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	_p_ <span class="token operator">:=</span> _g_<span class="token punctuation">.</span>m<span class="token punctuation">.</span>p<span class="token punctuation">.</span><span class="token function">ptr</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	newg <span class="token operator">:=</span> <span class="token function">gfget</span><span class="token punctuation">(</span>_p_<span class="token punctuation">)</span> <span class="token comment">//// 从p的dead g列表中获取一个g对象，没有的话就从全局g列表中抓取一批g对象放入p的的dead g列表中，再从中获取。g在运行结束后会重新放入dead g列表等待重复利用</span>
	<span class="token keyword">if</span> newg <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span> <span class="token comment">// 一开始启动应该取不到</span>
		newg <span class="token operator">=</span> <span class="token function">malg</span><span class="token punctuation">(</span>_StackMin<span class="token punctuation">)</span> <span class="token comment">// 新建一个g</span>
		<span class="token function">casgstatus</span><span class="token punctuation">(</span>newg<span class="token punctuation">,</span> _Gidle<span class="token punctuation">,</span> _Gdead<span class="token punctuation">)</span> <span class="token comment">// 设置g的状态从idle到dead</span>
		<span class="token function">allgadd</span><span class="token punctuation">(</span>newg<span class="token punctuation">)</span> <span class="token comment">// 使用 G-&gt; 状态的 Gdead 发布，因此 GC 扫描程序不会查看未初始化的堆栈。</span>
	<span class="token punctuation">}</span>
    <span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span>

    <span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span><span class="token comment">//关于newg的属性配置</span>
	newg<span class="token punctuation">.</span>startpc <span class="token operator">=</span> fn<span class="token punctuation">.</span>fn <span class="token comment">// 将mainPC方法(就是runtime·main方法)指定为这个协程的启动方法</span>
	<span class="token keyword">if</span> _g_<span class="token punctuation">.</span>m<span class="token punctuation">.</span>curg <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		newg<span class="token punctuation">.</span>labels <span class="token operator">=</span> _g_<span class="token punctuation">.</span>m<span class="token punctuation">.</span>curg<span class="token punctuation">.</span>labels
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> <span class="token function">isSystemGoroutine</span><span class="token punctuation">(</span>newg<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		atomic<span class="token punctuation">.</span><span class="token function">Xadd</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>sched<span class="token punctuation">.</span>ngsys<span class="token punctuation">,</span> <span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// Track initial transition?</span>
	newg<span class="token punctuation">.</span>trackingSeq <span class="token operator">=</span> <span class="token function">uint8</span><span class="token punctuation">(</span><span class="token function">fastrand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> newg<span class="token punctuation">.</span>trackingSeq<span class="token operator">%</span>gTrackingPeriod <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span> <span class="token comment">// 判断是不是系统协程（g启动函数包含runtime.*前缀的都是系统协程，除了runtime.main, runtime.handleAsyncEvent）</span>
		newg<span class="token punctuation">.</span>tracking <span class="token operator">=</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span>
	<span class="token function">casgstatus</span><span class="token punctuation">(</span>newg<span class="token punctuation">,</span> _Gdead<span class="token punctuation">,</span> _Grunnable<span class="token punctuation">)</span>  <span class="token comment">// 设置g的状态从dead状态到runnable状态</span>

	（<span class="token operator">...</span>）
	<span class="token function">releasem</span><span class="token punctuation">(</span>_g_<span class="token punctuation">.</span>m<span class="token punctuation">)</span> <span class="token comment">// 放弃独占m</span>

	<span class="token keyword">return</span> newg
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>mstart 函数，主要是启动 M，并且开启调度（我们下一次再讨论这个）。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">//mstart 是 new Ms 的入口点。它是用汇编编写的，使用 ABI0，标记为 TOPFRAME，并调用 mstart0。</span>
<span class="token keyword">func</span> <span class="token function">mstart</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token function">mstart0</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	_g_ <span class="token operator">:=</span> <span class="token function">getg</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	osStack <span class="token operator">:=</span> _g_<span class="token punctuation">.</span>stack<span class="token punctuation">.</span>lo <span class="token operator">==</span> <span class="token number">0</span>
	<span class="token keyword">if</span> osStack <span class="token punctuation">{</span>
<span class="token comment">//从系统堆栈初始化堆栈边界。 Cgo 可能在 stack.hi 中保留了堆栈大小。 minit 可能会更新堆栈边界。注意：这些界限可能不是很准确。我们将 hi 设置为 &amp;size，但它上面还有一些东西。 1024 应该可以弥补这一点，但有点武断。</span>
		size <span class="token operator">:=</span> _g_<span class="token punctuation">.</span>stack<span class="token punctuation">.</span>hi
		<span class="token keyword">if</span> size <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
			size <span class="token operator">=</span> <span class="token number">8192</span> <span class="token operator">*</span> sys<span class="token punctuation">.</span>StackGuardMultiplier
		<span class="token punctuation">}</span>
		_g_<span class="token punctuation">.</span>stack<span class="token punctuation">.</span>hi <span class="token operator">=</span> <span class="token function">uintptr</span><span class="token punctuation">(</span><span class="token function">noescape</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Pointer</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>size<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		_g_<span class="token punctuation">.</span>stack<span class="token punctuation">.</span>lo <span class="token operator">=</span> _g_<span class="token punctuation">.</span>stack<span class="token punctuation">.</span>hi <span class="token operator">-</span> size <span class="token operator">+</span> <span class="token number">1024</span>
	<span class="token punctuation">}</span>
	<span class="token comment">//初始化堆栈保护，以便我们可以开始调用常规</span>
	<span class="token comment">// Go code.</span>
	_g_<span class="token punctuation">.</span>stackguard0 <span class="token operator">=</span> _g_<span class="token punctuation">.</span>stack<span class="token punctuation">.</span>lo <span class="token operator">+</span> _StackGuard
	<span class="token comment">// 这是 g0，所以我们也可以调用 go:systemstack 函数来检查 stackguard1。</span>
	_g_<span class="token punctuation">.</span>stackguard1 <span class="token operator">=</span> _g_<span class="token punctuation">.</span>stackguard0
	<span class="token function">mstart1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// Exit this thread.</span>
	<span class="token keyword">if</span> <span class="token function">mStackIsSystemAllocated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// Windows、Solaris、illumos、Darwin、AIX 和Plan 9 总是system-allocate stack，但是在mstart 之前放在_g_.stack 中，所以上面的逻辑还没有设置osStack。</span>
		osStack <span class="token operator">=</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span>
	<span class="token function">mexit</span><span class="token punctuation">(</span>osStack<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">mstart1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	_g_ <span class="token operator">:=</span> <span class="token function">getg</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token keyword">if</span> _g_ <span class="token operator">!=</span> _g_<span class="token punctuation">.</span>m<span class="token punctuation">.</span>g0 <span class="token punctuation">{</span> <span class="token comment">// 判断是不是g0</span>
		<span class="token function">throw</span><span class="token punctuation">(</span><span class="token string">&quot;bad runtime·mstart&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	_g_<span class="token punctuation">.</span>sched<span class="token punctuation">.</span>g <span class="token operator">=</span> <span class="token function">guintptr</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Pointer</span><span class="token punctuation">(</span>_g_<span class="token punctuation">)</span><span class="token punctuation">)</span>
	_g_<span class="token punctuation">.</span>sched<span class="token punctuation">.</span>pc <span class="token operator">=</span> <span class="token function">getcallerpc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>   <span class="token comment">// 保存pc、sp信息到g0</span>
	_g_<span class="token punctuation">.</span>sched<span class="token punctuation">.</span>sp <span class="token operator">=</span> <span class="token function">getcallersp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token function">asminit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// asm初始化</span>
	<span class="token function">minit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">// m初始化</span>

	<span class="token comment">// Install signal handlers; after minit so that minit can</span>
	<span class="token comment">// prepare the thread to be able to handle the signals.</span>
	<span class="token keyword">if</span> _g_<span class="token punctuation">.</span>m <span class="token operator">==</span> <span class="token operator">&amp;</span>m0 <span class="token punctuation">{</span>
		<span class="token function">mstartm0</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">// 启动m0的signal handler</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> fn <span class="token operator">:=</span> _g_<span class="token punctuation">.</span>m<span class="token punctuation">.</span>mstartfn<span class="token punctuation">;</span> fn <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> _g_<span class="token punctuation">.</span>m <span class="token operator">!=</span> <span class="token operator">&amp;</span>m0 <span class="token punctuation">{</span> <span class="token comment">// 如果不是m0</span>
		<span class="token function">acquirep</span><span class="token punctuation">(</span>_g_<span class="token punctuation">.</span>m<span class="token punctuation">.</span>nextp<span class="token punctuation">.</span><span class="token function">ptr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		_g_<span class="token punctuation">.</span>m<span class="token punctuation">.</span>nextp <span class="token operator">=</span> <span class="token number">0</span>
	<span class="token punctuation">}</span>
	<span class="token function">schedule</span><span class="token punctuation">(</span><span class="token punctuation">)</span>   <span class="token comment">// 进入调度。这个函数会阻塞</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结流程" tabindex="-1"><a class="header-anchor" href="#总结流程" aria-hidden="true">#</a> 总结流程</h2><ul><li>入口：rt0_windows_amd64.s 汇编函数</li><li>初始化 m0,g0</li><li>check ：检查各个类型占用内存大小的正确性</li><li>args ： 设置 <code>argc</code>、<code>argv</code>参数</li><li>osinit ：操作系统相关的 <code>init</code>，比如页大小</li><li>schedinit ：初始化所有 P，初始化其他细节</li><li>newproc ：当前<code>m（m0）</code>的 <code>p</code> 下新建一个 <code>g</code>，指定为 <code>p</code> 的下一个运行的 <code>g</code></li><li>mstart ：m0启动，接着进入调度，这里阻塞</li><li>abort：退出</li></ul><h2 id="进一步参考文章" tabindex="-1"><a class="header-anchor" href="#进一步参考文章" aria-hidden="true">#</a> 进一步参考文章</h2>`,59),f={href:"https://www.jianshu.com/p/d66c2f2e3537",target:"_blank",rel:"noopener noreferrer"},_={href:"http://c.biancheng.net/view/8296.html",target:"_blank",rel:"noopener noreferrer"},h={href:"https://juejin.cn/post/6942509882281033764",target:"_blank",rel:"noopener noreferrer"},y=n("h2",{id:"tips",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#tips","aria-hidden":"true"},"#"),s(" tips")],-1),w=n("blockquote",null,[n("p",null,"自己整体流程过了一遍后，感觉还是有点点糊糊的。可能自己对操作系统的知识还是不够多，不够支撑自己理解整个过程，但是不用慌。慢慢来！加油团子！"),n("p",null,"后续会逐渐学习操作系统，然后补充相关的细节。")],-1);function S(P,A){const a=p("ExternalLinkIcon");return i(),c("div",null,[u,n("blockquote",null,[d,n("p",null,[n("a",r,[s("2.3 Go 程序启动引导"),t(a)])]),n("p",null,[n("a",m,[s("Golang并发编程-GPM调度过程源码分析"),t(a)])]),n("p",null,[n("a",k,[s("《Golang》深入Golang启动过程"),t(a)])]),n("p",null,[n("a",v,[b,t(a)])])]),g,n("blockquote",null,[n("p",null,[n("a",f,[s("MinGW-w64安装教程"),t(a)])]),n("p",null,[n("a",_,[s("Windows平台安装GDB调试器"),t(a)])]),n("p",null,[n("a",h,[s("[go runtime] - go程序启动过程"),t(a)])])]),y,w])}const M=e(l,[["render",S],["__file","16.Go程序启动流程.html.vue"]]);export{M as default};
