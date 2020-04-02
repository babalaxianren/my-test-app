/**
 * 设备相关工具方法
 */
const ua = window.navigator.userAgent;
export const isAndroid = ua.includes('Android') || ua.includes('Adr'); //android终端
export const isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
export const isWechat = /MicroMessenger/i.test(ua); //微信
export const isWeibo = /WeiBo/i.test(ua); //微博
export const isAlipay = /AlipayClient/i.test(ua); //支付宝

/** 
 * 生成设备UUID ：使用该方法生成的uuid，每次安装包更新，对应设备的uuid更新，不可以用于唯一绑定
 * */
export const createDeviceUUID = () => {
    let s = [];
    let hexDigits = '0123456789abcdef';
    for (let i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-';
    let device_id = s.join('');
    return device_id;
}









