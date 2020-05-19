
import Panda from './publish_subcribe';
let instance = null;
export default class BugCat {

    constructor() {
        this.description = "";
        this.cats = [];

        //单例模式判断是否已经实例化了该对象
        if (instance == null) {
            instance = this;
            this.initModule();
        }
        return instance;
    }

    initModule() {
        let panda = new Panda();
        


    }






}