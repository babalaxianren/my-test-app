
import { Toast } from 'antd-mobile';

/** 支付宝支付sdk */
{/*<script src="https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js"></script> */ }

/** 
 *  微信支付开发文档: https://pay.weixin.qq.com/wiki/doc/api/sl.html
 *  用户在微信内部调起微信支付，属 JS支付 :https://pay.weixin.qq.com/wiki/doc/api/jsapi_sl.php?chapter=7
 *  用户在微信环境以外，调起微信支付，属 H5支付 :https://pay.weixin.qq.com/wiki/doc/api/H5_sl.php?chapter=15_1
 * <script src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script> 
 */

// 微信浏览器内部调用微信支付
export const onBridgeReady = (data) => {/** data: 由服务端向微信支付平台请求的 */
    window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        {
            "appId": data.appId,     //公众号名称，由商户传入     
            "timeStamp": data.timeStamp,         //时间戳，自1970年以来的秒数     
            "nonceStr": data.nonceStr, //随机串     
            "package": data.package,
            "signType": data.signType,         //微信签名方式：     
            "paySign": data.paySign //微信签名 
        },
        function (res) {
            if (res.err_msg === "get_brand_wcpay_request:ok") {
                Toast.info('支付成功', 1);
                // 使用以上方式判断前端返回,微信团队郑重提示：
                // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                // 最终支付结果，由服务端向微信支付平台查询
            } else {
                Toast.fail('微信支付失败，请重新支付', 1);
            }
        });
}

// 微信WeixinJSBridge初始化准备
export const initWeChatPay = (data) => {/** data由服务端返回 */
    if (typeof window.WeixinJSBridge === "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {/** 兼容IE */
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    } else {
        onBridgeReady(data);
    }
}


