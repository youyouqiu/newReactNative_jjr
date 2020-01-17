import { Platform } from 'react-native';
import  {DeviceEventEmitter} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info'

//获取设备信息
function getDeviceInfo(isPhone){
    let deviceinfo = {}
    switch(Platform.OS){
    case 'ios':
        deviceinfo.Source = 1
        break;
    case 'android':
        deviceinfo.Source = 2
        break;
    case 'web':
        deviceinfo.Source = 3
        break;
    }
    deviceinfo.DeviceId = DeviceInfo.getUniqueID()
    deviceinfo.VersionCode = DeviceInfo.getVersion()
    let userInfo = AsyncStorage.getItem('userInfo')
    if(userInfo && userInfo.userInfo){
        deviceinfo.LoginTime = userInfo.userInfo.LoginTime
    }
    deviceinfo.Timestamp =  parseInt(new Date().getTime()/1000)
    if(isPhone){
        deviceinfo.isPhone = true
    }
    return deviceinfo
}

//刷新token
export async function reLogin(){
    let store = global.store
    let url = `${store.getState().config.requestUrl.auth}/connect/token`
    let userInfo = store.getState().user;
    let version
    let res1
    if(userInfo && userInfo.userInfo){ // 因为在405异地登录和406修改密码的状态的状态下用户信息已经被清空。这时走不到这里面来。所以都不能重新进行登录。
        version = DeviceInfo.getReadableVersion()
        let pars = [
            { "parName": "APP_PUSH_ID", "parValue": store.getState().oidc.jpushID },
            { "parName": "APP_OS", "parValue": Platform.OS },
            { "parName": "APP_OS_VERSION", "parValue": Platform.Version },
            { "parName": "APP_VERSION", "parValue": version || '' }
        ];

        const loginData = {
            client_id: 'apigateway',
            grant_type: 'refresh_token',
            username: userInfo.userInfo.name,
            refresh_token: userInfo.refresh_token,
            scope: 'openid offline_access profile',
            client_secret: '123456',
            LoginTime:userInfo.LoginTime,
            UserExtensions: JSON.stringify(pars)
        }

        try {
            res1 = await ApiClient.postFormUrlEncode(url, loginData)
        } catch (error) {
            // alert('111')
            return null
        }

        if (!res1 || !res1.access_token) {
            // alert('333')
            return null
        }
        try{
            let now = Math.round(new Date().valueOf() / 1000);
            var user = {
                access_token: res1.access_token,
                refresh_token: userInfo.refresh_token,
                userInfo: userInfo.userInfo,
                expired: false,
                expires_to: now + res1.expires_in,
                expires_in: res1.expires_in
            }
            store.dispatch({type: 'user/updateUserAsync',
                payload: {
                    user
                }});
        }catch(e){
            // alert('222')
        }
    }
    return res1
}

//检查登录状态
async function checkLoginStatue(res,pUrl,pData){
    let store = global.store
    if(res.status === 401){
        // 刷新Token
        let res1 = await reLogin()
        // alert(JSON.stringify(res1))
        if(res1){
            pData.headers.set('Authorization', `Bearer ${res1.data.access_token}`);
            let data = await fetch(pUrl, pData)
            return data
        } else {
            loginTimeOut(res.status)
            // DeviceEventEmitter.emit('outDate', res.status);
        }
    } else if((res.status === 405 || res.status === 406) && store.getState().oidc.statusCode === 200 ){ //异地登录 //密码修改
        storage.remove({ key: authid })
        // store.dispatch(setInitState()); // 为什么要清空用户信息。
        store.dispatch(setStatusCode(res.status));
        DeviceEventEmitter.emit('setChange',res.status);
    } else if( res.status === 403 ){
        // Toast.show('登录过期，请重新登录！')
        // DeviceEventEmitter.emit('outDate', res.status);
        loginTimeOut(res.status)
    }
    return res
}
//登录过期
function loginTimeOut(code){
    DeviceEventEmitter.emit('outDate', code);
}

const ApiClient = {
    get(url, useToken = true, qs, stoken) {
        let rc = {};
        let startTime = Date.now().valueOf();
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("Content-Type", "application/json");
        headers.append("ReqHeader",JSON.stringify(getDeviceInfo()))
        if (useToken) {
            let user = store.getState().oidc.user || {};
            let token = user.access_token;
            if (user && user.userInfo) {
                rc.userInfo = user.userInfo;
            }
            if(stoken){
                token = stoken;
            }
            rc.token = token;
            headers.append('Authorization', `Bearer ${token}`);
        }

        const options = {
            method: 'GET',
            headers,
            mode: 'cors'
        };
        rc.options = options;
        const params = new URLSearchParams();
        if (qs) {
            Object.keys(qs).forEach(key => params.append(key, qs[key]));
            url = url + "?" + params.toString();
        }
        rc.url = url;
        logRequestStart(rc)
        return fetch(url, options)
            .then((res)=>{
                return checkLoginStatue(res,url,options)
            })
            .then((res) => {
                let endTime = Date.now().valueOf();
                rc.cost = endTime - startTime;
                rc.responseStatus = res.status.toString();
                rc.responseStatusText = res.statusText;
                if (res.ok) {
                    logCost(rc);
                    return res.json();
                }
                logRequestError(rc, res);
                return { code: res.status.toString(),requestError:true, message: res.statusText || '' };
            })
            .then((data) => {
                if(!data.requestError){
                    logResponseError(rc, data);
                }
                return { data };
            })
            .catch((error) => {
                // logException(rc, error);
                // alert(`错误信息${JSON.stringify(error)}`)
                return {data:{code:"500", message: error.message} };
            });
    },
    getPure(url) {
        let rc = {};
        let startTime = Date.now().valueOf();
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("Content-Type", "application/json");
        headers.append("ReqHeader", JSON.stringify(getDeviceInfo()))
        rc.url = url;
        logRequestStart(rc)
        const options = {
            method: 'GET',
            headers,
            mode: 'cors'
        };
        rc.options = options;
        return fetch(url, options)
            .then((res) => {
                let endTime = Date.now().valueOf();
                rc.cost = endTime - startTime;
                rc.responseStatus = res.status.toString();
                rc.responseStatusText = res.statusText;
                if (res.ok) {
                    logCost(rc);
                    return res.json();
                }
                logRequestError(rc, res);
                return { code: res.status.toString(), requestError: true, message: res.statusText || '' };
            })
            .then((data) => {
                if (!data.requestError) {
                    logResponseError(rc, data);
                }
                return { data };

            })
            .catch((error) => {
                //message  stack
                // logException(rc, error);
                return{ data: {code:"500", message:'网络异常' } };
            });
    },
    post(url, body, qs, method = 'POST', stoken) {
        let rc = {};
        let startTime = Date.now().valueOf();
        let user = store.getState().oidc.user || {};
        let token = user.access_token;
        if (user && user.userInfo) {
            rc.userInfo = user.userInfo;
        }
        if(stoken){
            token = stoken;
        }
        rc.token = token;

        // store.dispatch(changeStatus(true));
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("Content-Type", "application/json");
        headers.append("ReqHeader", JSON.stringify(getDeviceInfo()))
        headers.append('Authorization', `Bearer ${token}`);

        var postData = undefined;
        if (body) {
            postData = JSON.stringify(body);
        }
        const options = {
            method: method,
            headers,
            mode: 'cors',
            body: postData
        };
        rc.options = options;

        const params = new URLSearchParams();
        if (qs) {
            Object.keys(qs).forEach(key => params.append(key, qs[key]));
            url = url + "?" + params.toString();
        }
        rc.url = url;
        logRequestStart(rc)
        return fetch(url, options)
             .then((res)=>{
                return checkLoginStatue(res,url,options)
            })
            .then((res) => {
                // if (url.includes('/api/Permission/each')) {
                //     alert(JSON.stringify(res))
                // }
                let endTime = Date.now().valueOf();
                rc.cost = endTime - startTime;
                rc.responseStatus = res.status.toString();
                rc.responseStatusText = res.statusText;
                if (res.ok) {
                    logCost(rc);
                    return res.json();
                } else {
                    logRequestError(rc, res);
                    return { code: res.status.toString(),requestError:true, message: res.statusText || ''};
                }
            })
            .then((data) => {
                if(!data.requestError){
                    logResponseError(rc, data);
                }
                return { data }
            })
            .catch((error) => {
                // logException(rc, error);
                // alert(`错误信息${JSON.stringify(error)}`)
                return {data:{code:"500", message:error.message} };
            });
    },
    postForm(url, body, qs, method = 'POST', headerSetter) {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("ReqHeader",JSON.stringify(getDeviceInfo()))
        if (headerSetter) {
            headerSetter(headers);
        }
        const params = new URLSearchParams();
        if (qs) {
            Object.keys(qs).forEach(key => params.append(key, qs[key]));
            url = url + "?" + params.toString();
        }


        const options = {
            method: method,
            headers,
            mode: 'cors'
        };
        var fd = new FormData();
        if (body) {
            for (var k in body) {
                if (body.hasOwnProperty(k)) {
                    fd.append(k, body[k]);
                }
            }
            options.body = fd;
        }
        return fetch(url, options)
            .then((res) => res.json())
            .then((data) => ({ data }));
    },
    postFormUrlEncode(url, body, qs, method = 'POST', headerSetter,isPhone) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json');
        headers.append("ReqHeader",JSON.stringify(getDeviceInfo(isPhone)))
        if (headerSetter) {
            headerSetter(headers);
        }
        const params = new URLSearchParams();
        if (qs) {
            Object.keys(qs).forEach(key => params.append(key, qs[key]));
            url = url + "?" + params.toString();
        }

        const options = {
            method: method,
            headers,
            mode: 'cors'
        };
        if (body) {
            const bodyParams = new URLSearchParams();

            Object.keys(body).forEach(key => bodyParams.append(key, body[key]));
            options.body = bodyParams.toString();
        }
        return fetch(url, options)
            .then((res) =>{
                if (res.ok) {
                    return res.json();
                } else {
                    return { code: res.status.toString(),requestError:true, message: res.statusText ,bodyText:res._bodyText};
                }
            })
    }
}


export default ApiClient;

