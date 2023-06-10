import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o,c as l,a as n,b as s,f as e,d as t}from"./app-12e502b6.js";const p="/assets/image-20230530232846985-423cbaee.png",u={},d=n("h1",{id:"github-action",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#github-action","aria-hidden":"true"},"#"),s(" Github Action")],-1),r=n("h2",{id:"基本介绍",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#基本介绍","aria-hidden":"true"},"#"),s(" 基本介绍")],-1),k=n("p",null,"GitHub Actions 是一种持续集成和持续交付 (CI/CD) 平台，可以执行一些操作，例如运行测试、打包并部署、发布项目等，你也不用写很复杂得脚本去实现，直接引用别人写好的 action 最后组成一个 actions 组合来达到你的目的。",-1),m={href:"https://docs.github.com/zh/actions/quickstart",target:"_blank",rel:"noopener noreferrer"},v=t(`<h2 id="相关部分" tabindex="-1"><a class="header-anchor" href="#相关部分" aria-hidden="true">#</a> 相关部分</h2><h3 id="workflow-工作流" tabindex="-1"><a class="header-anchor" href="#workflow-工作流" aria-hidden="true">#</a> workflow 工作流</h3><p>工作流可运行一个或者多个任务，你可以自己设定触发机制，自动触发或者手动触发。</p><p>工作流存储在 <code>.github/workflows</code> 文件夹中，以 <code>yaml</code> 格式进行配置，一个 <code>yaml</code> 代表一个工作流。</p><h3 id="event-事件" tabindex="-1"><a class="header-anchor" href="#event-事件" aria-hidden="true">#</a> event 事件</h3><p>设置触发工作流运行得特定机制，例如当有人在仓库中提交文件，需要重新对项目进行打包并部署，那么你需要将触发机制设置为 <code>push</code> 操作。</p><p>在 <code>yaml</code> 文件中你需要配置得是 <code>on</code>。</p><p>举个例子：我现在需要配置只要仓库有 <code>push</code> 操作就会运行该工作流。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token comment"># 触发条件，这里设置为 push，也就是只有在 push 时才会触发</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span>
      <span class="token comment"># 确保这是你正在使用的分支名称</span>
      <span class="token punctuation">-</span> main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),b={href:"https://docs.github.com/zh/actions/using-workflows/events-that-trigger-workflows#about-events-that-trigger-workflows",target:"_blank",rel:"noopener noreferrer"},h=t(`<blockquote><p>注意：不一定所有事情都是用于触发机制，也有设置上下文操作得。</p></blockquote><h3 id="job-任务" tabindex="-1"><a class="header-anchor" href="#job-任务" aria-hidden="true">#</a> job 任务</h3><p>任务是工作流中在同一运行器中执行得一组步骤。每个步骤按顺序执行得。你也可以去配置任务与其他任务之间得关系，设置条件或者并发运行等。</p><p>在 <code>yaml</code> 文件中是如下配置：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
	<span class="token comment"># 第一个 job 的 id</span>
  <span class="token key atrule">deploy-pages</span><span class="token punctuation">:</span>
  	<span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token comment"># job 名称</span>
  	<span class="token key atrule">runs-on</span><span class="token punctuation">:</span> <span class="token comment"># 运行环境：window/Ubuntu/macOS等</span>
  	<span class="token key atrule">if</span><span class="token punctuation">:</span> <span class="token comment"># 设置条件</span>
  	<span class="token key atrule">steps</span><span class="token punctuation">:</span> <span class="token comment"># 设置步骤</span>
  	<span class="token punctuation">...</span>还有很多配置
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>相关的配置请参考官方文档。</p><h3 id="step-步骤" tabindex="-1"><a class="header-anchor" href="#step-步骤" aria-hidden="true">#</a> step 步骤</h3><p>就是你要干的动作/活动，你可以运行相关命令，或者选择其他的 <code>action</code> 进行运行等。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>      <span class="token key atrule">steps</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token comment"># 名称</span>
          <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token comment"># 运行命令</span>
          <span class="token key atrule">env</span><span class="token punctuation">:</span> <span class="token comment"># 设置一些环境变量</span>
          <span class="token key atrule">uses</span><span class="token punctuation">:</span> <span class="token comment"># 选择合适 action 进行执行</span>
          	<span class="token key atrule">with</span><span class="token punctuation">:</span> <span class="token comment"># action的一些配置</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实例部署" tabindex="-1"><a class="header-anchor" href="#实例部署" aria-hidden="true">#</a> 实例部署</h2><blockquote><p>场景：使用 <code>Github Action</code> 对 <code>vuepress</code> 项目进行打包并部署</p></blockquote><p>在 <code>.github/workflows</code> 文件夹中创建一个 <code>yaml</code> 文件。</p><p>相关配置如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> 部署文档

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">workflow_call</span><span class="token punctuation">:</span>
    <span class="token key atrule">secrets</span><span class="token punctuation">:</span>
      <span class="token comment"># 获取 ACCESS_TOKEN 权限</span>
      <span class="token key atrule">ACCESS_TOKEN</span><span class="token punctuation">:</span>
        <span class="token key atrule">required</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token comment"># 触发条件，这里设置为 push，也就是只有在 push 时才会触发</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span>
      <span class="token comment"># 确保这是你正在使用的分支名称</span>
      <span class="token punctuation">-</span> main

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">deploy-pages</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest <span class="token comment"># 设置运行环境</span>
    <span class="token comment"># 接下来的步骤</span>
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token comment"># 检查并获取仓库源码，包括子模块</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">fetch-depth</span><span class="token punctuation">:</span> <span class="token number">0</span>
          <span class="token comment"># 如果你文档需要 Git 子模块，取消注释下一行</span>
          <span class="token key atrule">submodules</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token comment"># 设置 Node.js 环境</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Set up Node.js
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token number">18</span>
      <span class="token comment"># 安装 pnpm</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install pnpm
        <span class="token key atrule">run</span><span class="token punctuation">:</span> npm install <span class="token punctuation">-</span>g pnpm
      <span class="token comment"># 安装依赖</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies
        <span class="token key atrule">run</span><span class="token punctuation">:</span> pnpm install <span class="token punctuation">-</span><span class="token punctuation">-</span>no<span class="token punctuation">-</span>frozen<span class="token punctuation">-</span>lockfile
      <span class="token comment"># 打包并构建文档</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 构建文档
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">NODE_OPTIONS</span><span class="token punctuation">:</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>max_old_space_size=8192
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
          pnpm run docs<span class="token punctuation">:</span>build
      <span class="token comment"># 创建 CNAME 文件，设置自定义域名</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Create CNAME
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          echo &quot;yay-docs.yangdiy.cn&quot; &gt; CNAME
          mv CNAME src/.vuepress/dist</span>

      <span class="token comment"># 查看 workflow 的文档来获取更多信息</span>
      <span class="token comment"># @see https://github.com/crazy-max/ghaction-github-pages</span>
      <span class="token comment"># 部署到 GitHub Pages</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to GitHub Pages
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> crazy<span class="token punctuation">-</span>max/ghaction<span class="token punctuation">-</span>github<span class="token punctuation">-</span>pages@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># 部署到 gh-pages 分支</span>
          <span class="token key atrule">target_branch</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages
          <span class="token comment"># 部署目录为 VuePress 的默认输出目录</span>
          <span class="token key atrule">build_dir</span><span class="token punctuation">:</span> src/.vuepress/dist
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token comment"># @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret</span>
          <span class="token key atrule">GITHUB_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.ACCESS_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里需要设置 <code>ACCESS_TOKEN</code>，步骤如下：</p><ul><li>在 <code>个人账号-&gt;setting-&gt; Developer settings-&gt; Personal access tokens-&gt;Tokens</code> 里面进行创建 <code>Token</code> ，关于权限的选择，选择关于 <code>workflows &amp; repo</code> 就可以了，设置相关的期限。</li><li>在 <code>个人仓库-&gt; Settings-&gt; Secrets and variables-&gt; Actions </code> 里面填写刚才的 <code>Token</code> 。注意：名称要与文件内容保持一致。</li></ul><h3 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h3><ol><li>自定义域名后，页面没有样式，如下图所示：</li></ol><figure><img src="`+p+'" alt="image-20230530232846985" tabindex="0" loading="lazy"><figcaption>image-20230530232846985</figcaption></figure><p>解决方案：</p>',20),g={href:"https://%3CUSERNAME%3E.github.io/",target:"_blank",rel:"noopener noreferrer"},y=t(`<ul><li>如果你的域名是 <code>https://&lt;USERNAME&gt;.github.io/</code> 或者 自定义域名，你需要将 <code>base</code> 设置成 <code>/</code></li><li>如果你的域名是 <code>https://github.com/&lt;USERNAME&gt;/&lt;REPO&gt;</code> ，你需要将 <code>base</code> 设置成 <code>/&lt;REPO&gt;/</code></li></ul><blockquote><p>注意：<code>base</code> 的斜杠数量和方向</p></blockquote><ol start="2"><li>项目配置为自己 <code>GitHub pages</code> 自定义域名</li></ol><p>场景：在部署时候，每次工作流生成的打包文件会覆盖之前，所以项目的域名总是 <code>GitHub Pages</code> 默认域名，但是我希望他是一个自定义域名。</p><p>解决方案：</p><p>本质上你通过 <code>github pages</code> 设置的自定义域名就是在你的项目中加入了一个 <code>CNAME</code> 文件，文件内容是你的域名。基于该原因有这样以下的解决方案：</p><ul><li>利用 <code>Git</code> 进行提交</li><li>打包后加入文件</li></ul><p>第一种方案会遇到权限问题，总是会报如下错：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>remote: Permission to baici1/yay-docs.git denied to github-actions<span class="token punctuation">[</span>bot<span class="token punctuation">]</span>.
fatal: unable to access <span class="token string">&#39;https://github.com/baici1/yay-docs.git/&#39;</span><span class="token builtin class-name">:</span> The requested URL returned error: <span class="token number">403</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>第二种方案就比较简单，加入以下代码即可实现：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Create CNAME
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          echo &quot;yay-docs.yangdiy.cn&quot; &gt; CNAME
          mv CNAME src/.vuepress/dist</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,12),_={href:"https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html",target:"_blank",rel:"noopener noreferrer"},f={href:"https://docs.github.com/en/actions/quickstart",target:"_blank",rel:"noopener noreferrer"};function w(E,x){const a=i("ExternalLinkIcon");return o(),l("div",null,[d,r,k,n("p",null,[n("a",m,[s("官方文档"),e(a)])]),v,n("p",null,[s("触发事件有很多，你可以参考"),n("a",b,[s("官方文档"),e(a)]),s("进行选择。")]),h,n("p",null,[s("这与你的部署域名有关系，需要修改的配置 "),n("a",g,[s("base选项"),e(a)])]),y,n("p",null,[n("a",_,[s("https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html"),e(a)])]),n("p",null,[n("a",f,[s("https://docs.github.com/en/actions/quickstart"),e(a)])])])}const A=c(u,[["render",w],["__file","GithubAction.html.vue"]]);export{A as default};
