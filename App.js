import React from 'react';
import dva from './src/utils/dva'
// import Router from './router'
import Index from './src/index';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import userModal from './src/models/user'
import configModal from './src/models/config'

const app = dva({
    initialState: {},
    models: [userModal, configModal],
    onError(e) {
        console.log('onError', e)
    }
})

const storage = new Storage({
    size: 1000,
    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,
    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: null,
    // 读写时在内存中缓存数据。默认启用。
    enableCache: true
})
global.storage = storage;

export default app.start(<Index />)