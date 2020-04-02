import { fetchPageData } from '@/services/home.js'

export default {
    namescape: "home",
    state: {
        title: "",
        author: ""
    },
    effects: {
        *queryPageData({ payload }, { call, put, select }) {
            const res = yield call(fetchPageData);
            // console.log('res---node console', res)
            const { data, message, status } = res || {};
            if (status) { console.log('status:' + status + ',errorMessage:' + message); return; }
            const { title, author } = data;
            yield put({
                type: 'updateStatesInHome',
                data: { title: title, author: author }
            })
        },

    },
    reducers: {
        updateStatesInHome(state, action) {
            return {
                ...state,
                ...action.data
            }
        }

    }

}