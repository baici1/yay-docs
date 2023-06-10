const e=JSON.parse('{"key":"v-e7db450c","path":"/language/Go/19.panic_recover.html","title":"panic&recover","lang":"en-US","frontmatter":{"title":"panic&recover","date":"2022-07-01T20:53:31.000Z","category":["语言基础","go"],"author":{"name":"团子","url":"https://github.com/baici1"},"comment":false,"description":"panic &amp; recover 推荐阅读：【Golang】图解panic &amp; recover 前言 之前在 defer 的解析知道，当前执行的 goroutine 持有一个 defer 链表的头指针。其实他也有一个 panic 头指针。","icon":null,"isOriginal":true,"star":false,"article":true,"timeline":true,"image":null,"banner":null,"head":[["meta",{"property":"og:url","content":"https://yay-docs.yangdiy.cn/language/Go/19.panic_recover.html"}],["meta",{"property":"og:site_name","content":"yay-docs"}],["meta",{"property":"og:title","content":"panic&recover"}],["meta",{"property":"og:description","content":"panic &amp; recover 推荐阅读：【Golang】图解panic &amp; recover 前言 之前在 defer 的解析知道，当前执行的 goroutine 持有一个 defer 链表的头指针。其实他也有一个 panic 头指针。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-05-31T15:06:12.000Z"}],["meta",{"property":"article:author","content":"团子"}],["meta",{"property":"article:published_time","content":"2022-07-01T20:53:31.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-31T15:06:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"panic&recover\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-07-01T20:53:31.000Z\\",\\"dateModified\\":\\"2023-05-31T15:06:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"团子\\",\\"url\\":\\"https://github.com/baici1\\"}]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"panic","slug":"panic","link":"#panic","children":[]},{"level":2,"title":"defer 非正常结束","slug":"defer-非正常结束","link":"#defer-非正常结束","children":[]},{"level":2,"title":"recover","slug":"recover","link":"#recover","children":[]},{"level":2,"title":"recoder 非正常结束","slug":"recoder-非正常结束","link":"#recoder-非正常结束","children":[]},{"level":2,"title":"recover 限制","slug":"recover-限制","link":"#recover-限制","children":[]},{"level":2,"title":"后续","slug":"后续","link":"#后续","children":[]}],"git":{"createdTime":1685545572000,"updatedTime":1685545572000,"contributors":[{"name":"Y先生","email":"249337001@qq.com","commits":1}]},"readingTime":{"minutes":7.09,"words":2127},"filePathRelative":"language/Go/19.panic&recover.md","localizedDate":"July 1, 2022","excerpt":"<h1> panic &amp; recover</h1>\\n<blockquote>\\n<p>推荐阅读：<a href=\\"https://mp.weixin.qq.com/s/vcJ6TsnknaCoYhH6XZnNMw\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">【Golang】图解panic &amp; recover</a></p>\\n</blockquote>\\n<h2> 前言</h2>\\n<p>之前在 <code>defer</code> 的解析知道，当前执行的 <code>goroutine</code> 持有一个 <code>defer</code> 链表的头指针。其实他也有一个 <code>panic</code> 头指针。</p>","autoDesc":true}');export{e as data};