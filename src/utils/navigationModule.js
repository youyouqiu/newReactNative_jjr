/**
 * 路由跳转，路由返回
 * Created by zhl on 2019/08/15.
 */

import { NavigationActions } from 'react-navigation';

let _navigator;

function setNavigatorRef(navigatorRef) {
    _navigator = navigatorRef
}

function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    );
}

function goBack(routeName?: string) {
    _navigator.dispatch(NavigationActions.back(routeName));
}

export default {
    navigate,
    setNavigatorRef, // 设置Ref
    goBack
}
