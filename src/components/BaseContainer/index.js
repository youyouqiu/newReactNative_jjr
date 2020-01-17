import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import NavigatorBar from './NavigatorBar'
import PropTypes from 'prop-types'
import { Theme } from 'teaset';
import ErrorView from '../ErrorView'


class BaseContainer extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        navBar: PropTypes.element, // 自定义导航栏
        isHiddenNavBar: PropTypes.bool, //是否隐藏导航栏
        contentBgColor: PropTypes.string, // 内容页背景颜色
        contentViewStyle: PropTypes.object, // 内容页样式
        style: PropTypes.object, // 页面大体样式
    }

    _renderNavView = () => {
        const {navBar} = this.props
        if (typeof(navBar) === 'undefined') {
            return <NavigatorBar {...this.props}/>
        } else { 
            return navBar
        }
    }

    _renderContent = () => { // 渲染内容页面
        const {loading, children, error} = this.props
        if (loading) {
            return <ActivityIndicator size="large" color="red" />
        } else if (error && error.isError) {
            return (
                <ErrorView {...error}/>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    {children}
                </View>
            )
        }
    }

    _renderBottom = () => { // 渲染底部页面
        
    }

    render() {

        const {isHiddenNavBar, contentBgColor = '#F8F8F8', style, contentViewStyle} = this.props
        const marginTop = !isHiddenNavBar ? Theme.statusBarHeight + Theme.navBarContentHeight : 0;

        return (
            <View style={[styles.container, style]}>
                {!isHiddenNavBar && this._renderNavView()}
                <View style={[styles.contentView, { marginTop, backgroundColor: contentBgColor }, contentViewStyle]}>
                    {this._renderContent()}
                    {this._renderBottom()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentView: {
        flex: 1
    }
})

export default BaseContainer;
