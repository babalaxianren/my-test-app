import request  from '@/utils/request'

export async function fetchPageData() {
    return request('/api/home_datas',
        {
            method: 'GET',
        }
    )
}