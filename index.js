/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Initializer } from 'react-native-baidumap-sdk'


try {
    Initializer.init('EubmlR0HLgCDFUClm8lQMjGn3ZHeDLct').catch(e => console.log(e))
} catch(e) {
    console.log(e)
}

AppRegistry.registerComponent(appName, () => App);
