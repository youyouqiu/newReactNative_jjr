/**
 * @flow
 * Created by Rabbit on 2018/8/15.
 */
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { AppRouter } from './router';
import { AuthRouter } from './AuthRouter';

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('AppRouter')
        }, 2000)
    }

    render() {
        return (
            <View>
                <ActivityIndicator />
                <Text>哈哈哈</Text>
            </View>
        )
    }
}

class AppRouterNavigator extends React.Component {
    static router = AppRouter.router;
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return <AppRouter navigation={this.props.navigation} />;
    }
}

export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            AppRouter: AppRouterNavigator,
            AuthRouter: AuthRouter
        },
        {
            initialRouteName: 'AuthLoading'
        }
    )
);
