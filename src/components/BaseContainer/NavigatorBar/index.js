/**
 * @flow
 * Created by Rabbit on 2018/5/21.
 */

import React from 'react';

import { NavigationBar } from 'teaset';
import {scaleSize} from '../../../utils/screenUtil'

import NavigationModule from '../../../utils/navigationModule';

export type Props = {
    leftView?: any,
    style?:any,
    backButtonPress?: any,
    isTopNavigator?: ?boolean,
    isNotBackground?: boolean,
    statusBarStyle?: any,
    title?: string,
    background?: any,
    statusBarHidden?: any,
    ...NavigationBar
};

const NavigatorBar = (props: Props) => {

    function backButtonPress() {
        const { backButtonPress } = props;
        if (backButtonPress) {
            backButtonPress();
        } else {
            NavigationModule.goBack();
        }
    }

    function renderLeftView() {
        const { isTopNavigator, leftView } = props;
        let left;
        if (isTopNavigator || leftView) {
            left = leftView;
        } else {
            left = <NavigationBar.BackButton icon={require('../../../images/icons/back.png')} onPress={backButtonPress} />;
        }
        return left;
    }
    const style = {...props.style, backgroundColor: '#fff'}
    const {statusBarHidden, statusBarStyle, title} = props
    return (
        <NavigationBar
            leftView={renderLeftView()}
            title={title}
            titleStyle={{color: '#000', fontSize: scaleSize(32)}}
            tintColor='#000'
            style={style}
            statusBarHidden={statusBarHidden || false}
            statusBarStyle={statusBarStyle || 'default'}
            {...props}
        />
    );
};

export default NavigatorBar;
