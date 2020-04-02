/**
 *  element 正则
 */
const TagRegUtils = {
    imgReg: /<img\b.*?(?:\>|\/>)/gi,
    imgSrcReg: /<img.*?src="(.*?)".*?\/?>/i,
}



export default {
    TagRegUtils,
}