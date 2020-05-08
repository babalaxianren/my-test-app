/**
 * 字体压缩
 * https://github.com/ecomfe/fontmin
 * https://www.jianshu.com/p/2ff1fa28e22a
 */
var Fontmin = require('fontmin')

var fontmin = new Fontmin()
    // 字体文件路径
    .src('src/assets/font/YouSheBiaoTiHei.ttf')
    // 中间件
    .use(Fontmin.glyph({
        // text: ' 输入暗号加小队今日已满员明新继续发车哦来晚了所有集结完毕看战况吧～我的PK进行中30天束活动介绍推荐录音全部知道成功考鸭相见绩学会时间管理话题保底六点五排榜争做习冠军及整体雅思跟哥走停不屠冲使快乐霸养计划愧是啊复一把过服就总即正义最棒爱向前越努力幸运打烊附锦鲤佑你终于等到奖品香吗起上分突击口语作者联盟当积极子学习金手抓剩余天名恭喜您获得!们将在48内通注册用机码与取系并放我们未开始元+!～ ,01235679ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    }))
    .use(Fontmin.ttf2woff({
        deflate: true
    }))
    // 输出
    .dest('src/assets/font/compressFont')

fontmin.run(function (err, files) {
    if (err) throw err
})
