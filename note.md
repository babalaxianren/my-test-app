# 1.http & https & tcp/ip 

- *** HTTP （ HyperText Transfer Protocol，超文本传输协议 ***
- https://juejin.im/entry/587222418d6d810058929f55

- http 是Tcp / IP协议族的子集，tcp / ip协议族分为四层.
    【 发送端 ： 应用层(http层) -> 传输层（TCP层）-> 网络层（IP层）-> 链路层（网络层/以太网硬件）】
    【 接收端 ： 链路层 -> 网络层 -> 传输层 -> 应用层 】

- 1.应用层：
    应用层一般是我们编写的应用程序，其决定了向用户提供的应用服务。应用层可以通过系统调用与传输层进行通信。
    处于应用层的协议非常多，比如：FTP（File Transfer Protocol，文件传输协议）、 DNS（Domain Name       System，域名系统）和我们本章讨论的HTTP （ HyperText Transfer Protocol，超文本传输协议）等。

- 2.传输层：
    传输层通过系统调用向应用层提供处于网络连接中的两台计算机之间的数据传输功能。
    在传输层有两个性质不同的协议：TCP（Transmission Control Protocol ，传输控制协议）和UDP（User Data  Protocol，用户数据报协议）。

- 3.网络层：
    网络层用来处理在网络上流动的数据包，数据包是网络传输的最小数据单位。该层规定了通过怎样的路径（传输路线）到达 对方计算机，并把数据包传输给对方。
4.链路层：
    链路层用来处理连接网络的硬件部分，包括控制操作系统、硬件设备驱动、NIC（Network Interface Card ，网络适 配器）以及光纤等物理可见部分。硬件上的范畴均在链路层的作用范围之内。

- TCP协议三次握手的描述如下：

    从上面的介绍可知，传输层协议主要有两个：TCP协议和UDP协议。 TCP协议相对于UDP协议的特点是：TCP协议提供面向连  接、字节流和可靠的传输。
    使用TCP协议进行通信的双方必须先建立连接，然后才能开始传输数据。TCP 连接是全双工的，也就是说双方的数据读写可以通过一个连接进行。为了确保连接双方可靠性，在双方建立连接时，TCP协议采用了三次握手（Three - way handshaking ）策略。

    第一次握手：客户端发送带有SYN标志的连接请求报文段，然后进入 SYN_SEND状态，等待服务端的确认。

    第二次握手：服务端接收到客户端的SYN报文段后，需要发送 ACK信息对这个SYN报文段进行确认。同时，还要发送自己的SYN 请求信息。服务端会将上述的信息放到一个报文段（SYN + ACK报文段）中，一并发送给客户端，此时服务端将会进入SYN_RECV 状态。

    第三次握手：客户端接收到服务端的SYN + ACK报文段后，会向服务端发送 ACK确认报文段，这个报文段发送完毕后，客户端和服务端都进入ESTABLISHED状态，完成TCP 三次握手。

    当三次握手完成后，TCP协议会为连接双方维持连接状态。为了保证数据传输成功，接收端在接收到数据包后必须发送ACK 报文作为确认。如果在指定的时间内（这个时间称为重新发送超时时间），发送端没有接收到接收端的ACK报文，那么就会重发超时的数据。

- *** HTTPS（Hyper Text Transfer Protocol over Secure Socket Layer），是以安全为目标的HTTP通道 ***
- https://juejin.im/post/59e4c02151882578d02f4aca

    HTTPS（全称：Hyper Text Transfer Protocol over Secure Socket Layer），是以安全为目标的HTTP通道，简单讲是HTTP的安全版。即HTTP下加入SSL层，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL。 现在它被广泛用于万维网上安全敏感的通讯，例如交易支付方面。

- http & https 的区别
    1. HTTP 是明文传输，HTTPS 通过 SSL\TLS 进行了加密
    2. HTTP 的端口号是 80，HTTPS 是 443
    3. HTTPS 需要到 CA 申请证书，一般免费证书很少，需要交费
    4. HTTPS 的连接很简单，是无状态的；HTTPS 协议是由 SSL+HTTP 协议构建的可进行加密传输、身份认证的网络协议，比 HTTP 协议安全。
- 为什么要使用https？
    1. 建立一个信息安全通道，来保证数据传输的安全
    2. 确认网站的真实性，防止钓鱼网站

- http 请求的报文字段：
- https://juejin.im/post/5af557a3f265da0b9265a498#heading-20



# 2.JS垃圾回收机制 【 Garbage Collection 】
- https://juejin.im/post/5a6b3fcaf265da3e2c385375

- 什么是内存泄漏？
- https://www.ituring.com.cn/book/1460
    内存泄漏（Memory Leak）是指程序中己动态分配的堆内存由于某种原因程序未释放或无法释放，造成系统内存的浪费，导致程序运行速度减慢甚至系统崩溃等严重后果。

    1. 什么是循环引用？
    2. Garbage Collection是什么？它是怎么工作的？
    3. 为什么引用计数算法将会导致内存无法释放？
    4. JavaScript（或者说JavaScript引擎）还有多少垃圾回收算法?

- 内存的必备的基础概念
    堆(HEAP)是用关于动态存放对象的内存空间 ,而对象在JavaScript里面是引用类型.
    mutator，这个词意思晦涩，在GC里面代表应用程序本身，我们暂且理解为mutator需要大量的内存。
    allocator，mutator将需要内存的申请提交到此，allocator负责从堆中调取足够内存空间供mutator使用。

- 常用的垃圾回收算法
- 1. 引用计数法：
    让所有对象实现记录下有多少“程序”在引用自己，让各对象都知道自己的“人气指数”。
    回收被引用数为0的内存。
    优势：
        可即刻回收垃圾，当被引用数值为0时，对象马上会把自己作为空闲空间连到空闲链表上，也就是说。在变成垃圾的时候就立刻被回收。
        因为是即时回收,那么‘程序’不会暂停去单独使用很长一段时间的GC，那么最大暂停时间很短。
        不用去遍历堆里面的所有活动对象和非活动对象

    劣势：
        计数器需要占很大的位置，因为不能预估被引用的上限，打个比方，可能出现32位即2的32次方个对象同时引用一个对象，那么计数器就需要32位。
        *** 最大的劣势是无法解决循环引用无法回收的问题 这就是前文中IE9之前出现的问题 ***
    注：该算法已经逐渐被 ‘标记-清除’ 算法替代，在V8引擎里面，使用最多的就是 标记-清除算法。

- 2. 标记清除算法：
    主要将GC的垃圾回收过程分为两个阶段：
    1. 标记阶段：把所有活动对象做上标记。
    2. 清除阶段：把没有标记（也就是非活动对象）销毁。

    标记阶段：
        根可以理解成我们的全局作用域，GC从全局作用域的变量，沿作用域逐层往里遍历（对，是深度遍历），当遍历到堆中对象时，说明该对象被引用着，则打上一个标记，继续递归遍历（因为肯定存在堆中对象引用另一个堆中对象），直到遍历到最后一个（最深的一层作用域）节点。
    标记清除阶段：
        又要遍历，这次是遍历整个堆，回收没有打上标记的对象。

    优势：
        实现简单，打标记也就是打或者不打两种可能，所以就一位二进制位就可以表示
        解决了循环引用问题

    缺点：
        造成碎片化（有点类似磁盘的碎片化）
        再分配时遍次数多，如果一直没有找到合适的内存块大小，那么会遍历空闲链表(保存堆中所有空闲地址空间的地址形成的链表）一直遍历到尾端
    注：这种GC方式是一个定时运行的任务，也就是说当程序运行一段时间后，统一GC。
    
- 3. 复制算法：
    复制算法就是只把某个空间的活动对象复制到其他空间。
    将一个内存空间分为两部分，一部分是From空间，另一部分是To空间，将From空间里面的活动对象复制到To空间，然后释放掉整个From空间，然后此刻将From空间和To空间的身份互换，那么就完成了一次GC。


# 3.PropTypes校验器
-   MyComponent.propTypes = {

-       *** 你可以将属性声明为以下 JS 原生类型  .isRequired标记必传的参数  *** 
            requiredArray: PropTypes.array.isRequired,
            optionalArray: PropTypes.array,
            optionalBool: PropTypes.bool,
            optionalFunc: PropTypes.func,
            optionalNumber: PropTypes.number,
            optionalObject: PropTypes.object,
            optionalString: PropTypes.string,
            optionalSymbol: PropTypes.symbol,

-       *** 任何可被渲染的元素（包括数字、字符串、子元素或数组） ***
            optionalNode: PropTypes.node,

-       *** 一个 React 元素***
            optionalElement: PropTypes.element,

-       *** 你也可以声明属性为某个类的实例，这里使用 JS 的instanceof 操作符实现。 
            optionalMessage: PropTypes.instanceOf(Message),

-       *** 你也可以限制你的属性值是某个特定值之一 ***
            optionalEnum: PropTypes.oneOf(['News', 'Photos']),

-       *** 限制它为列举类型之一的对象 ***
            optionalUnion: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.instanceOf(Message)
            ]),

-       *** 一个指定元素类型的数组 ***
            optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

-       *** 一个指定类型的对象 ***
            optionalObjectOf: PropTypes.objectOf(PropTypes.number),

-       *** 一个指定属性及其类型的对象 ***
            optionalObjectWithShape: PropTypes.shape({
                color: PropTypes.string,
                fontSize: PropTypes.number
            }),

-       *** 你也可以在任何 PropTypes 属性后面加上 `isRequired` 后缀，这样如果这个属性父组件没有提供时，会打印警告信息 ***
            requiredFunc: PropTypes.func.isRequired,

-       *** 任意类型的数据 ***
            requiredAny: PropTypes.any.isRequired,

-       *** 
            自定义验证器。它应该在验证失败时返回一个 Error 对象而不是 `console.warn` 或抛出异常。
            不过在 `oneOfType` 中它不起作用。 
        ***
            customProp: function(props, propName, componentName) {
                if (!/matchme/.test(props[propName])) {
                return new Error(
                    'Invalid prop `' + propName + '` supplied to' +
                    ' `' + componentName + '`. Validation failed.'
                );
                }
            },

-       *** 
            不过你可以提供一个自定义的 `arrayOf` 或 `objectOf` 验证器，它应该在验证失败时返回一个 Error 对象。
            它被用于验证数组或对象的每个值。验证器前两个参数的第一个是数组或对象本身，第二个是它们对应的键。 
        ***
        customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
            if (!/matchme/.test(propValue[key])) {
            return new Error(
                'Invalid prop `' + propFullName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
            }
        })
    };

# 4.JS事件机制（冒泡和捕获）


# 5.同源/跨域问题 & 常见跨域问题的解决方案
- http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html
- https://juejin.im/post/5aaa44e2f265da2373142e27

- 同源的概念：协议/域名/端口 三者必须相同。同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据（包括cookie共享等）。

- 同源策略下非同源网站的，会受到如下限制：
- （1） Cookie、LocalStorage 和 IndexDB 无法读取。
- （2） DOM 无法获得。
- （3） AJAX 请求不能发送。

- 如何在必要的时候规避同源策略的限制？
-   1.cookie
    http://www.aaa.com/a.html & http://www.aaa.com/b.html 两个网页一级域名相同，二级域名不同，此时解决cookie同源限制的方法有：
        (1).两个网页下分别设置 document.domain = 'aaa.com';
        (2).Set-Cookie: key=value; domain=.example.com; path=/   设置cookie时，指定域名，这样同域名下网站cookie可以共享。
    注：此方法仅适用于Cookie 和 iframe 窗口，localstorage和indexDB无法通过此种办法规避同源限制。

-   2.iframe
    如果两个网页不同源，就无法拿到对方的DOM。典型的例子是iframe窗口和window.open方法打开的窗口，它们与父窗口无法通信。

    解决完全不同源的窗口的通信问题
        (1).片段识别符（fragment identifier）
        (2).window.name
        (3).跨文档通信API（Cross-document messaging）
        ...................


# 6.发布订阅模式
- 当一个对象的状态发送改变时，所有依赖于它的对象都将得到状态改变的通知，eg:emit on
- 作用：
        * 广泛应用于异步编程中(替代了传递回调函数)
        * 对象之间松散耦合的编写代码



# 7.前端鉴权
- 参考：https://juejin.im/post/5c6e6063f265da2da53ec8f3
- 常见的鉴权方式有四种：
-    1.HTTP Basic Authentication (HTTP基本认证) （401）
-    2.session-cookie
-    3.Token 验证(包括JWT 【JSON Web Tokens】,SSO 【Single Sign On】)
-    4.OAuth(开放授权) ：http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html

- 1.HTTP Basic Authentication (HTTP基本认证)
        这种认证方式是浏览器遵守http协议实现的基本授权方式,HTTP协议进行通信的过程中，HTTP协议定义了基本认证认证允许HTTP服务器对客户端进行用户身份证的方法。（目前基本没有再使用这种认证方式的,一些老项目的内网认证可能还会有.）

- 2.session-cookie
        这个方式是利用服务器端的session（会话）和浏览器端的cookie来实现前后端的认证，由于http请求时是无状态的，服务器正常情况下是不知道当前请求之前有没有来过，这个时候我们如果要记录状态，就需要在服务器端创建一个会话(session),将同一个客户端的请求都维护在各自得会会话中，每当请求到达服务器端的时候，先去查一下该客户端有没有在服务器端创建session，如果有则已经认证成功了，否则就没有认证。

        认证过程:
        1，服务器在接受客户端首次访问时在服务器端创建session，然后保存session(我们可以将session保存在内存中，也可以保存在redis中，推荐使用后者)，然后给这个session生成一个唯一的标识字符串,然后在响应头中种下这个唯一标识字符串。
        2.签名。这一步只是对sid进行加密处理，服务端会根据这个secret密钥进行解密。（非必需步骤）
        3.浏览器中收到请求响应的时候会解析响应头，然后将sid保存在本地cookie中，浏览器在下次http请求的请求头中会带上该域名下的cookie信息，
        4.服务器在接受客户端请求时会去解析请求头cookie中的sid，然后根据这个sid去找服务器端保存的该客户端的session，然后判断该请求是否合法。

        弊端:
        服务器内存消耗大: 用户每做一次应用认证,应用就会在服务端做一次记录,以方便用户下次请求时使用,通常来讲session保存在内存中,随着认证用户的增加,服务器的消耗就会很大.
        易受到CSRF攻击: 基于cookie的一种跨站伪造攻击, 基于cookie来进行识别用户的话,用户本身就携带了值,cookie被截获,用户就很容易被伪造.

- 3.Token 验证(包括JWT,SSO)
        token是用户身份的验证方式，我们通常叫它：令牌。当用户第一次登录后，服务器生成一个token并将此token返回给客户端，以后客户端只需带上这个token前来请求数据即可，无需再次带上用户名和密码。

        总的来说就是客户端在首次登陆以后，服务端再次接收http请求的时候，就只认token了，请求只要每次把token带上就行了，服务器端会拦截所有的请求，然后校验token的合法性，合法就放行，不合法就返回401（鉴权失败）
        Token优点与缺点

        优点:
        Token 完全由应用管理，所以它可以避开同源策略. (Cookie是不允许垮域访问的,token不存在)
        Token 可以避免 CSRF 攻击(也是因为不需要cookie了)
        Token 可以是无状态的，可以在多个服务间共享
        Token 支持手机端访问(Cookie不支持手机端访问)
        服务器只需要对浏览器传来的token值进行解密，解密完成后进行用户数据的查询，如果查询成功，则通过认证.所以，即时有了多台服务器，服务器也只是做了token的解密和用户数据的查询，它不需要在服务端去保留用户的认证信息或者会话信息，这就意味着基于token认证机制的应用不需要去考虑用户在哪一台服务器登录了，这就为应用的扩展提供了便利，解决了session扩展性的弊端。

        缺点:
        占带宽: 正常情况下token要比 session_id更大，需要消耗更多流量，挤占更多带宽.(不过几乎可以忽略)
        性能问题: 相比于session-cookie来说，token需要服务端花费更多的时间和性能来对token进行解密验证.其实Token相比于session-cookie来说就是一个"时间换空间"的方案.
        Token与session的区别

        1. 使用Token,服务端不需要保存状态. 在session中sessionid 是一个唯一标识的字符串，服务端是根据这个字符串，来查询在服务器端保持的session，这里面才保存着用户的登陆状态。但是token本身就是一种登陆成功凭证，他是在登陆成功后根据某种规则生成的一种信息凭证，他里面本身就保存着用户的登陆状态。服务器端只需要根据定义的规则校验这个token是否合法就行。

        2. Token不需要借助cookie的. session-cookie是需要cookie配合的，那么在http代理客户端的选择上就只有浏览器了，因为只有浏览器才会去解析请求响应头里面的cookie,然后每次请求再默认带上该域名下的cookie。但是我们知道http代理客户端不只有浏览器，还有原生APP等等，这个时候cookie是不起作用的，或者浏览器端是可以禁止cookie的(虽然可以，但是这基本上是属于吃饱没事干的人干的事)，但是token 就不一样，他是登陆请求在登陆成功后再请求响应体中返回的信息，客户端在收到响应的时候，可以把他存在本地的cookie,storage，或者内存中，然后再下一次请求的请求头重带上这个token就行了。简单点来说cookie-session机制他限制了客户端的类型，而token验证机制丰富了客户端类型。

        3. 时效性。session-cookie的sessionid实在登陆的时候生成的而且在登出事时一直不变的，在一定程度上安全就会低，而token是可以在一段时间内动态改变的。

        4. 可扩展性。token验证本身是比较灵活的，一是token的解决方案有许多，常用的是JWT,二来我们可以基于token验证机制，专门做一个鉴权服务，用它向多个服务的请求进行统一鉴权。

3.单点登录（Single Sign On）
        单点登录（Single Sign On），简称为 SSO，是目前比较流行的企业业务整合的解决方案之一。SSO的定义是在多个应用系统中，用户只需要登录一次就可以访问所有相互信任的应用系统。

# 8.表单提交的方法 & 出发的通信层

# 9.Chromium-安全
- http://47.98.159.95/my_blog/browser-security/003.html
- CSP(Content-Security-Policy)内容安全策略
- https://www.jianshu.com/p/28cfa8508237

- XSS 攻击:跨站脚本攻击

    XSS 全称是 Cross Site Scripting(即跨站脚本)，为了和 CSS 区分，故叫它XSS。XSS 攻击是指浏览器中执行恶意脚本(无论是跨域还是同域)，从而拿到用户的信息并进行操作。

    - 这些操作一般可以完成下面这些事情:

    1.窃取Cookie。
    2.监听用户行为，比如输入账号密码后直接发送到黑客服务器。
    3.修改 DOM 伪造登录表单。
    4.在页面中生成浮窗广告。
    5.通常情况，XSS 攻击的实现有三种方式——存储型、反射型和文档型。原理都比较简单，先来一一介绍一下。

    - 存储型
    存储型，顾名思义就是将恶意脚本存储了起来，确实，存储型的 XSS 将脚本存储到了服务端的数据库，然后在客户端执行这些脚本，从而达到攻击的效果。

    常见的场景是留言评论区提交一段脚本代码，如果前后端没有做好转义的工作，那评论内容存到了数据库，在页面渲染过程中直接执行, 相当于执行一段未知逻辑的 JS 代码，是非常恐怖的。这就是存储型的 XSS 攻击。

- CSRF 攻击:跨站请求伪造

    CSRF(Cross-site request forgery), 即跨站请求伪造，指的是黑客诱导用户点击链接，打开黑客的网站，然后黑客利用用户目前的登录状态发起跨站请求。

    黑客通过在诱导用户点击其链接，图片，表单等时，将已登陆的用户信息发送到自己网站，从而跨站伪造用户请求。
    CSRF攻击中重要的一环就是自动发送目标站点下的 Cookie,然后就是这一份 Cookie 模拟了用户的身份。因此在Cookie上面下文章是防范的不二之选。

    - 防范措施
    1. 利用Cookie的SameSite属性
    服务端设置cookie的samesite属性，拒绝非同源网站的请求。
    SameSite可以设置为三个值，Strict、Lax和None：
    a.
        在Strict模式下，浏览器完全禁止第三方请求携带Cookie。比如请求sanyuan.com网站只能在sanyuan.com域名当中请求才能携带 Cookie，在其他网站请求都不能。
    b.
        在Lax模式，就宽松一点了，只能在 get方法 提交表单 或者 a标签发送get请求的情况下可以携带 Cookie，其他情况均不能。
    c.
        在None模式下，也就是默认模式，请求会自动携带上 Cookie。

    2. 验证来源站点
    这就需要要用到请求头中的两个字段: Origin和Referer。
    其中，Origin只包含域名信息，而Referer包含了具体的 URL 路径。
    当然，这两者都是可以伪造的，通过 Ajax 中自定义请求头即可，安全性略差。

    3. CSRF Token
    CSRF Token的原理：
    首先，浏览器向服务器发送请求时，服务器生成一个字符串，将其植入到返回的页面中。
    然后浏览器如果要发送请求，就必须带上这个字符串，然后服务器来验证是否合法，如果不合法则不予响应。这个字符串也就是CSRF Token，通常第三方站点无法拿到这个 token, 因此也就是被服务器给拒绝。

    CSRF(Cross-site request forgery), 即跨站请求伪造，指的是黑客诱导用户点击链接，打开黑客的网站，然后黑客利用用户目前的登录状态发起跨站请求。
    CSRF攻击一般会有三种方式:
    - 自动 GET 请求
    - 自动 POST 请求
    - 诱导点击发送 GET 请求。
    防范措施: 利用 Cookie 的 SameSite 属性、验证来源站点和CSRF Token。

- (传统RSA版本)HTTPS为什么让数据传输更安全
    谈到HTTPS, 就不得不谈到与之相对的HTTP。HTTP的特性是明文传输，因此在传输的每一个环节，数据都有可能被第三方窃取或者篡改，具体来说，HTTP 数据经过 TCP 层，然后经过WIFI路由器、运营商和目标服务器，这些环节中都可能被中间人拿到数据并进行篡改，也就是我们常说的中间人攻击。
    HTTPS并不是一个新的协议, 而是一个加强版的HTTP。其原理是在HTTP和TCP之间建立了一个中间层，当HTTP和TCP通信时并不是像以前那样直接通信，直接经过了一个中间层进行加密，将加密后的数据包传给TCP, 响应的，TCP必须将数据包解密，才能传给上面的HTTP。这个中间层也叫安全层。安全层的核心就是对数据加解密。

    对称加密和非对称加密：
    对称加密, 是最简单的方式，指的是加密和解密用的是同样的密钥。
    非对称加密, 如果有 A、 B 两把密钥，如果用 A 加密过的数据包只能用 B 解密，反之，如果用 B 加密过的数据包只能用 A 解密。
    ---待续














