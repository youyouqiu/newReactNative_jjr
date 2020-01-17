// import * as authService from '../services/auth'

export default {
    namespace: 'user',
    state: {
        userInfo: {},
        status: 404, // 401: 登录之后token认证失效， 200：正常用户， 404：未登录
        refreshToken: '',
    },
    reducers: {
        updateUserComplete(state, { payload }) {
            return {...state, ...payload }
        },
    },
    effects: {
        *updateUserAsync({payload}, {select, put}) { // 更新跟用户所有有关的信息
            let userInfo = yield select(state => state.user);
            userInfo = {
                ...userInfo,
                ...payload
            }
            // yield call(storage.save, {key: 'user', data: JSON.stringify(userInfo), expires: null})to
            storage.save({key: 'user', data: userInfo})
            yield put({
                type: 'updateUserComplete',
                payload: userInfo
            })
        }
    },
}
