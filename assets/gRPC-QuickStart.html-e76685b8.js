import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as l,a as n,b as s,f as t,d as p}from"./app-12e502b6.js";const i="/assets/image-20230608104107433-2d5b2109.png",u={},r=p(`<h1 id="grpc-快速开始" tabindex="-1"><a class="header-anchor" href="#grpc-快速开始" aria-hidden="true">#</a> gRPC 快速开始</h1><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><p>随着网站需要增加的服务增多，例如订单服务、支付服务等，你不可能将其定制化添加在一个项目中，会带来维护困难、分工开发易冲突等问题，所以需要将这些功能和服务进行横向的分割，包装成高内聚低耦合的功能单元模块，不同的功能单元可以交付给不同的团队进行开发和维护，这些功能单元模块可以部署在不同的机器上，防止单个机器带来限制以及提高并发处理能力。</p><blockquote><p>推荐去阅读《大型网站技术架构》，很清晰的讲解了网站架构的历史。</p></blockquote><p>在构建分布式部署和微服务架构的系统时候，会遇到一些问题：</p><ul><li>语言和平台差异：不同服务可能使用了不同编程语言和平台，在使用时候需要做到兼容性处理。</li><li>性能和容错问题：有些通信协议和传输方式可能存在一定性能瓶颈，还有可能受到网络故障、服务不可以等因素影响，需要选择合适通信协议和传输方式。</li><li>精准调用：需要精准去调用某一个服务下的某一个功能，不能够因为某些原因导致调用出错</li><li>….</li></ul><p>还有很多很多问题。问题的解决方法太多太多了，<code>gRPC</code> 框架可以很好的解决这些问题。</p><p><code>gRPC </code>是一种高性能、开源的远程过程调用框架，基于<code>HTTP/2</code>和 <code>ProtoBuf</code> 协议，支持多种编程语言，提供了丰富的功能和易于使用的接口，常用于构建分布式部署和微服务架构的系统。</p><h2 id="调用过程" tabindex="-1"><a class="header-anchor" href="#调用过程" aria-hidden="true">#</a> 调用过程</h2><p>一个程序（称为客户端）调用另一个程序（称为服务器或远程服务）中的函数，过程如下（这整个过程可以抽象成一个购物订单）：</p><ol><li>定义接口（双方地址）：需要确认客户端和服务器之间地址，确认访问对方方式。</li><li>客户端调用（找个快递员A）：客户端应用程序调用本地的代理对象（Proxy Object），并传递参数。代理对象具有与服务器接口相同的方法，但实际上并不执行任何功能。</li><li>打包参数（打包物品）：客户端代理对象将调用信息和参数打包成网络可传输的格式，例如将它们序列化为二进制数据。</li><li>网络传输（快递员骑电动车/摩托车）：打包后的请求通过网络发送到远程服务器。这可能涉及到网络协议、Socket通信、HTTP请求等。</li><li>服务器接收（对方在快递柜找到）：服务器接收到请求后，会根据请求中的信息来确定要调用的具体方法。</li><li>解包参数（对方拆包裹）：服务器解析接收到的请求，将参数从网络传输的格式还原为本地方法可以理解的形式。</li><li>服务器调用（对方使用）：服务器使用解包后的参数调用相应的方法，并执行实际的操作。</li><li>打包结果（对方打包使用感受）：服务器将方法的执行结果打包成网络可传输的格式。</li><li>网络传输（通过网站或者口头告知）：打包后的结果通过网络发送回客户端。</li><li>客户端接收（网站提示店铺）：客户端接收到结果后，将其解包为本地应用程序可以使用的形式。</li><li>返回结果（店铺接受）：客户端代理对象将解包后的结果返回给调用方。</li></ol><p>其实这过程抽象成实际，你到处都可以看到。在这个过程中双方需要隐藏了底层通信细节，使得分布式系统的开发更加方便和灵活，如何实现？关于实现，这个过程中有很多细节需要细细思考，或许可以从一个原始<code>demo</code> 感受下。</p><h2 id="rpc" tabindex="-1"><a class="header-anchor" href="#rpc" aria-hidden="true">#</a> rpc</h2><p>首先，我们采用原生<code>rpc</code>，去实现刚才的过程：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// client.go</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;net/rpc&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//1. 建立连接</span>
	client<span class="token punctuation">,</span> err <span class="token operator">:=</span> rpc<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span><span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;localhost:8008&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;连接失败&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 2.设置结果</span>
	<span class="token keyword">var</span> reply <span class="token builtin">string</span> <span class="token comment">//string有默认值</span>
	<span class="token comment">// 3. 进行调用 选择目标函数，传入参数，结果</span>
	err <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span><span class="token string">&quot;HelloService.Hello&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;123456&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>reply<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;调用失败&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>reply<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// server.go</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;net&quot;</span>
	<span class="token string">&quot;net/rpc&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> HelloService <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>HelloService<span class="token punctuation">)</span> <span class="token function">Hello</span><span class="token punctuation">(</span>request <span class="token builtin">string</span><span class="token punctuation">,</span> reply <span class="token operator">*</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token comment">//返回值是通过修改reply的值</span>
	<span class="token operator">*</span>reply <span class="token operator">=</span> <span class="token string">&quot;hello, &quot;</span> <span class="token operator">+</span> request
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//1. 实例化一个server</span>
	listener<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;:8008&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">//2. 注册处理逻辑 handler，进行绑定</span>
	<span class="token boolean">_</span> <span class="token operator">=</span> rpc<span class="token punctuation">.</span><span class="token function">RegisterName</span><span class="token punctuation">(</span><span class="token string">&quot;HelloService&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>HelloService<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token comment">//3. 启动服务，获取接受的字符串信息</span>
	conn<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> listener<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//当一个新的连接进来的时候，</span>
	<span class="token comment">//4. 根据传递信息,进行处理,并调用函数</span>
	rpc<span class="token punctuation">.</span><span class="token function">ServeConn</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面两个代码已经实现了远程调用，但是有以下问题存在：</p><ul><li>使用方式与本地调用有差异，调用方式更加接近本地调用 <code>.hello(&quot;123456&quot;)</code>。</li><li>双方需要维护一个函数表和地址表，使用上比较麻烦。</li><li>服务端写起来更加简单点，注册处理函数时候更加方便点（字符串和实体一一对应很容易出现错误）</li></ul><p>基于这两个原因，我们进行进一步的升级。</p><ol><li>希望调用方式更加接近本地调用 <code>.hello(&quot;123456&quot;)</code>。</li></ol><p>思考如何接近本地调用？答：去封装一层专门处理 <code>rpc</code> 代码，然后暴露出来，让客户端使用更加贴近本地调用方式。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// client_proxy.go</span>
<span class="token keyword">package</span> client_proxy

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;net/rpc&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> HelloServiceStub <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token operator">*</span>rpc<span class="token punctuation">.</span>Client
<span class="token punctuation">}</span>

<span class="token comment">// 创建初始化对象</span>
<span class="token keyword">func</span> <span class="token function">NewHelloServiceClient</span><span class="token punctuation">(</span>protcol<span class="token punctuation">,</span> address <span class="token builtin">string</span><span class="token punctuation">)</span> HelloServiceStub <span class="token punctuation">{</span>
	conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> rpc<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span>protcol<span class="token punctuation">,</span> address<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;connect error!&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> HelloServiceStub<span class="token punctuation">{</span>conn<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 将调用方法封装在函数中，就可以实现类似的本地调用</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>HelloServiceStub<span class="token punctuation">)</span> <span class="token function">Hello</span><span class="token punctuation">(</span>request <span class="token builtin">string</span><span class="token punctuation">,</span> reply <span class="token operator">*</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span><span class="token string">&quot;HelloService.Hello&quot;</span><span class="token punctuation">,</span> request<span class="token punctuation">,</span> reply<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用方式：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// client.go</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	client_proxy <span class="token string">&quot;demo/new_rpc/client_porxy&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 创建服务对象</span>
	client <span class="token operator">:=</span> client_proxy<span class="token punctuation">.</span><span class="token function">NewHelloServiceClient</span><span class="token punctuation">(</span><span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;localhost:1234&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> reply <span class="token builtin">string</span> <span class="token comment">//string有默认值</span>
	<span class="token comment">// 调用服务中的函数</span>
	err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Hello</span><span class="token punctuation">(</span><span class="token string">&quot;1234&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>reply<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;调用失败&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>reply<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在客户端使用远程服务方式已经实现了。</p><ol start="2"><li>希望不要去记忆一些常用的字符串</li></ol><p>其实这个挺好实现的，创建一个新的文件，将变量暴露出来，后续都是用变量，而不是字符串了。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// hanlder.go</span>
<span class="token keyword">package</span> hanlder

<span class="token keyword">const</span> HelloServiceName <span class="token operator">=</span> <span class="token string">&quot;handler/HelloService&quot;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>希望服务端写起来更加简单，减少错误产生。</li></ol><p>怎么去封装服务端的注册处理函数？答：<code>rpc.RegisterName(&quot;HelloService&quot;, &amp;HelloService{})</code> 将这个代码的参数进行封装：</p><ul><li>字符串通过变量去使用</li><li>对该代码进行封装，只传入实体就可。</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// server_proxy.go</span>
<span class="token keyword">func</span> <span class="token function">RegisterHelloService</span><span class="token punctuation">(</span>srv HelloService<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> rpc<span class="token punctuation">.</span><span class="token function">RegisterName</span><span class="token punctuation">(</span>hanlder<span class="token punctuation">.</span>HelloServiceName<span class="token punctuation">,</span> srv<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>存在一个问题：<code>HelloService</code> 结构体声明和函数的参数类型具有很强的耦合（改了结构体名称，就也要改函数参数的类型）</p><p>解决方式：函数参数类型封装成一个接口类型<code> interface</code>，根据鸭子类型原理就可以解决这个问题了</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// server_proxy.go</span>
<span class="token keyword">package</span> server_proxy

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	hanlder <span class="token string">&quot;demo/new_rpc/handler&quot;</span>
	<span class="token string">&quot;net/rpc&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> HelloServicer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Hello</span><span class="token punctuation">(</span>request <span class="token builtin">string</span><span class="token punctuation">,</span> reply <span class="token operator">*</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
<span class="token punctuation">}</span>

<span class="token comment">// 如果做到解耦 - 我们关系的是函数 鸭子类型</span>
<span class="token keyword">func</span> <span class="token function">RegisterHelloService</span><span class="token punctuation">(</span>srv HelloServicer<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> rpc<span class="token punctuation">.</span><span class="token function">RegisterName</span><span class="token punctuation">(</span>hanlder<span class="token punctuation">.</span>HelloServiceName<span class="token punctuation">,</span> srv<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务端写法：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;demo/new_rpc/server_proxy&quot;</span>
	<span class="token string">&quot;net&quot;</span>
	<span class="token string">&quot;net/rpc&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> HelloService <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>HelloService<span class="token punctuation">)</span> <span class="token function">Hello</span><span class="token punctuation">(</span>request <span class="token builtin">string</span><span class="token punctuation">,</span> reply <span class="token operator">*</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token comment">//返回值是通过修改reply的值</span>
	<span class="token operator">*</span>reply <span class="token operator">=</span> <span class="token string">&quot;hello, &quot;</span> <span class="token operator">+</span> request
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//1. 实例化一个server</span>
	listener<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;:8008&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">//2. 注册处理逻辑 handler，进行绑定</span>
	<span class="token boolean">_</span> <span class="token operator">=</span> server_proxy<span class="token punctuation">.</span><span class="token function">RegisterHelloService</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>HelloService<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token comment">//3. 启动服务，获取接受的字符串信息</span>
	conn<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> listener<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//当一个新的连接进来的时候，</span>
	<span class="token comment">//4. 根据传递信息,进行处理,并调用函数</span>
	rpc<span class="token punctuation">.</span><span class="token function">ServeConn</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整体变化不大，只是改了第 <code>21</code> 行的代码。</p><p>在这里，两个代理文件确实会帮助我们去写业务逻辑代码，写多个功能函数时候，其实都是一样逻辑，大胆的想，可以自动生成吗？同时还有很多地方没有完善，例如跨语言调用等。</p><p>其实这些都可以通过<code>gRPC</code>来实现。</p><h2 id="grpc" tabindex="-1"><a class="header-anchor" href="#grpc" aria-hidden="true">#</a> gRPC</h2><p>生成这些文件，需要 <code>protobuf</code> 的帮助，入门学习可以参考如下：</p>`,42),k={href:"https://juejin.cn/post/7144948875613339685",target:"_blank",rel:"noopener noreferrer"},d={href:"https://zhuanlan.zhihu.com/p/435944782",target:"_blank",rel:"noopener noreferrer"},v=p(`<p>关于环境搭建，请看上一篇《环境搭建》。</p><ol><li>首先，需要定义双方实现的功能相关信息：参数、函数名、返回类型等等</li></ol><div class="language-protobuf line-numbers-mode" data-ext="protobuf"><pre class="language-protobuf"><code><span class="token keyword">syntax</span> <span class="token operator">=</span> <span class="token string">&quot;proto3&quot;</span><span class="token punctuation">;</span> <span class="token comment">// 定义proto 版本号</span>
<span class="token keyword">option</span> go_package <span class="token operator">=</span> <span class="token string">&quot;.;proto&quot;</span><span class="token punctuation">;</span> <span class="token comment">//定义 go 包名，用于生成的 .pd.go 文件</span>

<span class="token keyword">service</span> <span class="token class-name">Greeter</span> <span class="token punctuation">{</span>  <span class="token comment">// 定义消息服务，设置rpc接口服务</span>
    <span class="token keyword">rpc</span> <span class="token function">SayHello</span> <span class="token punctuation">(</span><span class="token class-name">HelloRequest</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token class-name">HelloReply</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 定义消息体</span>
<span class="token keyword">message</span> <span class="token class-name">HelloRequest</span> <span class="token punctuation">{</span>
    <span class="token builtin">string</span> name <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 定义消息体</span>
<span class="token keyword">message</span> <span class="token class-name">HelloReply</span> <span class="token punctuation">{</span>
    <span class="token builtin">string</span> message <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>自动生成文件</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>protoc <span class="token parameter variable">-I</span> <span class="token builtin class-name">.</span> hello.proto <span class="token parameter variable">--go_out</span><span class="token operator">=</span>plugins<span class="token operator">=</span>grpc:. 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>服务端代码</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">//定义一个结构体，作用是实现helloworld中的GreeterServer</span>
<span class="token keyword">type</span> Server <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">// 相关业务函数</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>Server<span class="token punctuation">)</span> <span class="token function">SayHello</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> request <span class="token operator">*</span>proto<span class="token punctuation">.</span>HelloRequest<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>proto<span class="token punctuation">.</span>HelloReply<span class="token punctuation">,</span>
	<span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>proto<span class="token punctuation">.</span>HelloReply<span class="token punctuation">{</span>
		Message<span class="token punctuation">:</span> <span class="token string">&quot;hello &quot;</span> <span class="token operator">+</span> request<span class="token punctuation">.</span>Name<span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//1.实例化gRPC服务</span>
	g <span class="token operator">:=</span> grpc<span class="token punctuation">.</span><span class="token function">NewServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">//2. 服务注册</span>
	proto<span class="token punctuation">.</span><span class="token function">RegisterGreeterServer</span><span class="token punctuation">(</span>g<span class="token punctuation">,</span> <span class="token operator">&amp;</span>Server<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// 3. 监听端口</span>
	lis<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;0.0.0.0:50051&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;failed to listen:&quot;</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    <span class="token comment">//4. 启动服务</span>
	err <span class="token operator">=</span> g<span class="token punctuation">.</span><span class="token function">Serve</span><span class="token punctuation">(</span>lis<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;failed to start grpc:&quot;</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>客户端代码</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//1. 建立服务连接</span>
	conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> grpc<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span><span class="token string">&quot;127.0.0.1:50051&quot;</span><span class="token punctuation">,</span> grpc<span class="token punctuation">.</span><span class="token function">WithTransportCredentials</span><span class="token punctuation">(</span>insecure<span class="token punctuation">.</span><span class="token function">NewCredentials</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    <span class="token comment">// 2.关闭服务</span>
	<span class="token keyword">defer</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 3. 实例化客户端连接</span>
	c <span class="token operator">:=</span> proto<span class="token punctuation">.</span><span class="token function">NewGreeterClient</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>
    <span class="token comment">//4. 客户端调用在proto中定义的SayHello()rpc方法，发起请求，接收服务端响应</span>
	r<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">SayHello</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>proto<span class="token punctuation">.</span>HelloRequest<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;1234&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>Message<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>运行结果</li></ol><figure><img src="`+i+`" alt="image-20230608104107433" tabindex="0" loading="lazy"><figcaption>image-20230608104107433</figcaption></figure><h3 id="流" tabindex="-1"><a class="header-anchor" href="#流" aria-hidden="true">#</a> 流</h3><p><code>grpc</code>的 stream (流) 主要用于传输一些大数据，或者服务端和客户端长时间数据交互，比如聊天机器人。所具备流模式如下：</p><ol><li>服务端数据流</li></ol><p>这种模式是客户端发起一次请求，服务端返回一段连续的数据流。典型的例子是客户端向服务端发送一个股票代码，服务端就把该股票的实时数据源源不断的返回给客户端。</p><ol start="2"><li>客户端数据流</li></ol><p>这种模式是客户端源源不断的向服务端发送数据流，而在发送结束后，由服务端返回一个响应。典型的例子是物联网终端向服务器报送数据。</p><ol start="3"><li>双向数据流</li></ol><p>这种模式是客户端和服务端都可以向对方发送数据流，这个时候双方的数据可以同时互相发送，也就是可以实现实时交互。典型的例子是聊天机器人。</p><p>实现代码：</p><p><code>protobuf</code> 文件</p><div class="language-protobuf line-numbers-mode" data-ext="protobuf"><pre class="language-protobuf"><code><span class="token keyword">syntax</span> <span class="token operator">=</span> <span class="token string">&quot;proto3&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">option</span> go_package <span class="token operator">=</span> <span class="token string">&quot;.;proto&quot;</span><span class="token punctuation">;</span> 
<span class="token keyword">service</span> <span class="token class-name">Greeter</span> <span class="token punctuation">{</span>
    <span class="token keyword">rpc</span> <span class="token function">GetStream</span><span class="token punctuation">(</span><span class="token class-name">StreamReqData</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token keyword">stream</span> <span class="token class-name">StreamResData</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//服务端流模式</span>
    <span class="token keyword">rpc</span> <span class="token function">PutStream</span><span class="token punctuation">(</span><span class="token keyword">stream</span> <span class="token class-name">StreamReqData</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token class-name">StreamResData</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//客户端流模式</span>
    <span class="token keyword">rpc</span> <span class="token function">AllStream</span><span class="token punctuation">(</span><span class="token keyword">stream</span> <span class="token class-name">StreamReqData</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token keyword">stream</span> <span class="token class-name">StreamResData</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//双向流模式</span>
<span class="token punctuation">}</span>

<span class="token keyword">message</span> <span class="token class-name">StreamReqData</span> <span class="token punctuation">{</span>
    <span class="token builtin">string</span> data <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">message</span> <span class="token class-name">StreamResData</span> <span class="token punctuation">{</span>
    <span class="token builtin">string</span> data <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> grpc<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span><span class="token string">&quot;localhost:50052&quot;</span><span class="token punctuation">,</span> grpc<span class="token punctuation">.</span><span class="token function">WithInsecure</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//服务端流模式</span>
	c <span class="token operator">:=</span> proto<span class="token punctuation">.</span><span class="token function">NewGreeterClient</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>
	res<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetStream</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>proto<span class="token punctuation">.</span>StreamReqData<span class="token punctuation">{</span>Data<span class="token punctuation">:</span> <span class="token string">&quot;1234&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		a<span class="token punctuation">,</span> err <span class="token operator">:=</span> res<span class="token punctuation">.</span><span class="token function">Recv</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>Data<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">//客户端流模式</span>
	putS<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">PutStream</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	i <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		i<span class="token operator">++</span>
		<span class="token boolean">_</span> <span class="token operator">=</span> putS<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>proto<span class="token punctuation">.</span>StreamReqData<span class="token punctuation">{</span>
			Data<span class="token punctuation">:</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;1234%d&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
		<span class="token keyword">if</span> i <span class="token operator">&gt;</span> <span class="token number">10</span> <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token comment">//双向流模式</span>
	allStr<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">AllStream</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	wg <span class="token operator">:=</span> sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">{</span><span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			data<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> allStr<span class="token punctuation">.</span><span class="token function">Recv</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;收到客户端消息：&quot;</span> <span class="token operator">+</span> data<span class="token punctuation">.</span>Data<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">//1. 集中学习protobuf， grpc</span>

	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			<span class="token boolean">_</span> <span class="token operator">=</span> allStr<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>proto<span class="token punctuation">.</span>StreamReqData<span class="token punctuation">{</span>Data<span class="token punctuation">:</span> <span class="token string">&quot;312&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
			time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;OldPackageTest/stream_grpc_test/proto&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;google.golang.org/grpc&quot;</span>
	<span class="token string">&quot;net&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> PORT <span class="token operator">=</span> <span class="token string">&quot;:50052&quot;</span>
<span class="token comment">// 定义一个结构体，实现三种数据流的业务逻辑</span>
<span class="token keyword">type</span> server <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>server<span class="token punctuation">)</span> <span class="token function">GetStream</span><span class="token punctuation">(</span>req <span class="token operator">*</span>proto<span class="token punctuation">.</span>StreamReqData<span class="token punctuation">,</span> res proto<span class="token punctuation">.</span>Greeter_GetStreamServer<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	i <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		i<span class="token operator">++</span>
		<span class="token boolean">_</span> <span class="token operator">=</span> res<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>proto<span class="token punctuation">.</span>StreamResData<span class="token punctuation">{</span>
			Data<span class="token punctuation">:</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%v&quot;</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Unix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
		<span class="token keyword">if</span> i <span class="token operator">&gt;</span> <span class="token number">10</span> <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>server<span class="token punctuation">)</span> <span class="token function">PutStream</span><span class="token punctuation">(</span>cliStr proto<span class="token punctuation">.</span>Greeter_PutStreamServer<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> a<span class="token punctuation">,</span> err <span class="token operator">:=</span> cliStr<span class="token punctuation">.</span><span class="token function">Recv</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>Data<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>server<span class="token punctuation">)</span> <span class="token function">AllStream</span><span class="token punctuation">(</span>allStr proto<span class="token punctuation">.</span>Greeter_AllStreamServer<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	wg <span class="token operator">:=</span> sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">{</span><span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			data<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> allStr<span class="token punctuation">.</span><span class="token function">Recv</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;收到客户端消息：&quot;</span> <span class="token operator">+</span> data<span class="token punctuation">.</span>Data<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			<span class="token boolean">_</span> <span class="token operator">=</span> allStr<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>proto<span class="token punctuation">.</span>StreamResData<span class="token punctuation">{</span>Data<span class="token punctuation">:</span> <span class="token string">&quot;我是服务器&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
			time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建连接</span>
	lis<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span> PORT<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    <span class="token comment">//实例化grpc服务</span>
	s <span class="token operator">:=</span> grpc<span class="token punctuation">.</span><span class="token function">NewServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">//服务注册</span>
	proto<span class="token punctuation">.</span><span class="token function">RegisterGreeterServer</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token operator">&amp;</span>server<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token comment">//启动服务</span>
    err <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">Serve</span><span class="token punctuation">(</span>lis<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h2><ol><li>通过生成 <code>.pb.go</code> 文件时候，总是报错。</li></ol><p>报错信息：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>--go_out: protoc-gen-go: plugins are not supported<span class="token punctuation">;</span> use <span class="token string">&#39;protoc --go-grpc_out=...&#39;</span> to generate gRPC

See https://grpc.io/docs/languages/go/quickstart/<span class="token comment">#regenerate-grpc-code for more information.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28),m={href:"https://blog.51cto.com/u_15619895/5259902",target:"_blank",rel:"noopener noreferrer"};function b(g,f){const a=o("ExternalLinkIcon");return c(),l("div",null,[r,n("ul",null,[n("li",null,[n("a",k,[s("https://juejin.cn/post/7144948875613339685"),t(a)])]),n("li",null,[n("a",d,[s("https://zhuanlan.zhihu.com/p/435944782"),t(a)])])]),v,n("p",null,[s("解决方法："),n("a",m,[s("https://blog.51cto.com/u_15619895/5259902"),t(a)])])])}const w=e(u,[["render",b],["__file","gRPC-QuickStart.html.vue"]]);export{w as default};
