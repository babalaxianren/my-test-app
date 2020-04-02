

// mock数据: https://umijs.org/zh/guide/mock-data.html#%E4%BD%BF%E7%94%A8-umi-%E7%9A%84-mock-%E5%8A%9F%E8%83%BD
const home_data = {
    status: 0,
    data: {
        title: '这是自定义的title',
        author: '作者是大灰狼'
    },
    message: "success"
}
export default {/** 参考express */
    "GET /api/home_datas": (req, res) => {/** 模拟真实请求耗时 */
        // console.log('req---',req)
        setTimeout(() => { res.json(home_data) }, 1000)
    }
};