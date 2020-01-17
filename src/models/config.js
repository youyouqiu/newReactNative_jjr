// import * as authService from '../services/auth'
import requestUrl from '../constants/requestUrl'

export default {
    namespace: 'config',
    state: {
        requestUrl: {
            ...requestUrl.production
        } // 请求接口的地址
    },
    reducers: {
        updateRequestUrl(state, { payload }) {
            return {...state, requestUrl: payload }
        },
    },    
    effects: {
        
    },
}
