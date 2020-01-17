/**
 * @flow
 * Created by Rabbit on 2018/8/9.
 */

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {scaleSize} from '../../utils/screenUtil'
import {Button} from 'teaset'

type Props = {
    errorStyle?: string, // 错误页样式
    errorText?: string, // 错误文字
    errorTextStyle?: any, // 错误文字样式
    imageSource?: string, // 图片
    imageSourceStyle?: any, // 图片样式
    btnStyle?: string, // 按钮样式
    btnTitle?: string, // 按钮文字或者element
    btnTitleStyle?: any, // 按钮文字样式
    onErrorPress?: any
};
export default class ErrorView extends React.Component<Props> {
    static defaultProps = {
        errorText: '出错啦，请稍后重试',
        btnTitle: '点击刷新',
        imageSource: null
    };

    render() {
        const {
            errorText,
            btnTitle,
            imageSource,
            errorStyle,
            errorTextStyle,
            btnTitleStyle,
            btnStyle,
            imageSourceStyle,
            onErrorPress
        } = this.props;
        return (
            <View style={[styles.container, errorStyle]}>
                <Image
                    style={[styles.imageSourceStyle, imageSourceStyle]}
                    source={imageSource}
                />
                <Text style={[styles.errorText, errorTextStyle]}>{errorText}</Text>
                <Button 
                    onPress={onErrorPress}
                    style={[styles.btnStyle, btnStyle]}
                    title={btnTitle} 
                    titleStyle={[styles.btnTitleStyle, btnTitleStyle]} 
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: 200
    },
    imageSourceStyle: {
        width: scaleSize(302),
        height: scaleSize(302),
        marginTop: scaleSize(169),
        borderRadius: scaleSize(100)
    },
    errorText: {
        fontSize: scaleSize(24),
        color: '#aeaeae'
    },
    btnStyle: {
        width: scaleSize(153),
        height: scaleSize(48),
        borderWidth: 1,
        borderRadius: scaleSize(4),
        borderColor: '#10b0ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scaleSize(66)
    },
    btnTitleStyle: {
        color: '#10b0ff',
        fontSize: scaleSize(24),
    }
});
