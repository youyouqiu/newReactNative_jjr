import React, { Component } from 'react';
import {Platform} from 'react-native'
import NavigationModule from './utils/navigationModule';
import { TopView } from 'teaset';
import XGPush from 'react-native-xinge-push'
// import {Toast} from 'teaset'
import SplashScreen from 'react-native-splash-screen'

import Index from './routers';

// let { DeviceToken } = NativeModules;


export default class Root extends Component {

    componentDidMount () {
        SplashScreen.hide()
        this._initPush()
    }

    _initPush () {
        //初始化jshare
        if (Platform.OS === 'android') {
            XGPush.init(2100313822, 'AJZ9Q38N1H4U');
        } else {
            XGPush.init(2200313823, 'IV44AG64D4RA');
        }
        XGPush.setHuaweiDebug(true);
        // 小米
        XGPush.initXiaomi('2882303761517876748', '5611787687748');
        // 魅族
        //XGPush.initMeizu('appId', 'appKey');
        // 华为请到 build.gradle manifestPlaceholders 配置
        // 第三方推送开关（华为、小米、魅族）
        XGPush.enableOtherPush(true);
        // 注册
        XGPush.register()
        XGPush.addEventListener('register', this._onRegister);
        // XGPush.addEventListener('message', this._onMessage);
        XGPush.addEventListener('notification', this._onNotification);
    }

    _onRegister(deviceToken) {
        console.log('onRegister: ' + deviceToken)
    }

    /**
     * 通知到达 点击顶部通知消息
     * @param notification {aps: obj, background: bool, clicked: bool, notificationId: uuid, xg: obj}
     * @private
     */
    _onNotification(notification) {
        if (notification.clicked === true) {
        } else {
        }
    }
    
    render() {
        return (
            <TopView>
                <Index 
                    ref={navigatorRef => {
                        NavigationModule.setNavigatorRef(navigatorRef);
                    }}
                />
            </TopView>
        )
    }
}