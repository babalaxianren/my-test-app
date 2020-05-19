
let instance = null;
window.TALKFUN = null;

export default class TalkFun {

    constructor() {
        this.TALKFUN = null;
        this.connectStatus = false;

        //单例模式判断是否已经实例化了该对象
        if (instance == null) {
            instance = this;
            this.init();
        }
        return instance;
    }

    init() {
        let _MT = window.MT;
        if (typeof _MT === 'undefined') {
            this.init();
        } else {
            let ascess_token = "gN3EGZjJGZ2MjY3YDMwcTY4ATN5cjYmFGO5IWOkFDOzwHf81nI1kDNwADMx8VN5IjM5kjI6ISZtFmbyJCLwojIhJCLdtlOiIHd0FmIsYTO5YjN4kDO1EjOiUWbpR3ZlJnIsIyM5MzM3IDO1EjI6ICZphnIsUjN0MTM6ICZpBnIsAjOiQWanJCL1kDNwADMxojIkl2XlNnc192YiwiIiojIyFGdhZXYiwCM6IiclRmbldmIsYTOzMTN5kDO1EjOiUmcpBHelJCL1kjMykTO6ICZp12bvJnIsISZiZGO1xFNmRWN1xlZhVjN1xlI6ISZtFmbrNWauJCLi4WatRWYwNnI6ISZs9mciwiIxIDO4UzMiojIklWdiwSN2QzMxojIkl2XyVmb0JXYwJye";
            let HT = new _MT.SDK.main(ascess_token);
            this.TALKFUN = HT;
            let _this = this;
            this.TALKFUN.on('connect', function () {
                console.log('TalkFun通信 => 连接成功...')
                _this.connectStatus = true;
            })
        }
    }
    /** 白板播放器-课件播放器 */
    whiteboardPlayer(payload) {
        if (!this.connectStatus) { console.log('TalkFun通信未连接'); return; }
        const { docContainer = "", docplayerId = "", callback = () => { } } = payload;
        this.TALKFUN && this.TALKFUN.whiteboardPlayer(docContainer, docplayerId, callback)
    }
    
    videoPlayer(payload) {
        if (!this.connectStatus) { console.log('TalkFun通信未连接'); return; }
        const { cameraContainer = "", cameraId = "", callback = () => { } } = payload;
        this.TALKFUN && this.TALKFUN.camera(cameraContainer, cameraId, callback);
    }




}


