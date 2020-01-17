import Permissions from 'react-native-permissions'
import {Alert, Platform, Linking} from 'react-native';
import OpenSettings from 'react-native-open-settings'

const ios = Platform.OS === 'ios'

export const CheckPermission = async (permission) => {
    return Permissions.request(permission).then(response => {
        if (response === 'denied' || response === 'undetermined' || response === 'restricted') { // 用户已拒绝过一次授权
            Alert('提示', '请到设置-应用-铺侦探中开启对应权限', [
                {
                    text: '取消',
                    onPress: () => console.log('cancel'),
                    style: 'cancel',
                },
                { text: '去设置', onPress: () => {
                    if (ios) {
                        Linking.openURL('app-settings:').catch(err => console.log('error', err))
                    } else {
                        OpenSettings.openSettings()
                    }
                }},
            ])
        } else if (response === 'authorized') {
            return true
        } else {
            return false
        }
    }).catch(e => {
        console.log(e)
        return false
    })
}