/**
 * 微信权限认证
 * @param {*} payload 
 */

 


/**
 * 微信分享
 * @param {*} payload 
 */
export async function wxReady(payload) {
    return new Promise((resolve) => {
      const wx = window.wx;
      if (typeof wx !== "undefined") {
        wx.config({
          debug: false,
          appId: payload.appid,
          timestamp: payload.timestamp,
          nonceStr: payload.noncestr,
          signature: payload.signature,
          jsApiList: [
            'updateAppMessageShareData',
            'updateTimelineShareData',
            'onMenuShareWeibo',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareQZone'
          ]
        });
        wx.ready(function () {
          let shareData = {
            title: payload.title,
            desc: payload.desc,
            link: payload.link,
            imgUrl: payload.imgUrl,
            success: function () {
              console.log('wx is ready')
            }
          };
          wx.updateAppMessageShareData(shareData)
          wx.updateTimelineShareData(shareData)
          wx.onMenuShareWeibo(shareData)
          wx.onMenuShareTimeline(shareData)
          wx.onMenuShareAppMessage(shareData)
          wx.onMenuShareQQ(shareData)
          wx.onMenuShareQZone(shareData)
        });
        wx.error(function (res) {
          console.log('wx err :', res)
        });
        resolve();
      } else {
        resolve();
      }
    })
  }