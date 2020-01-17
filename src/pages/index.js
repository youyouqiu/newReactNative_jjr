import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation'
import {View, Image} from 'react-native'

import AMovie from './a';
import BMovie from './b'
import CMovie from './c'
import DMovie from './d'
import EMovie from './e'

const AppNavigator = createBottomTabNavigator(
    {
        A: AMovie,
        B: BMovie,
        Home: {
            screen: CMovie,
            navigationOptions: {
                tabBarLabel: () => {return <View style={{height: 50, backgroundColor: 'red'}}><Image style={{width: 50, height: 50}} source={require('../images/icons/main.png')} /></View>}
            }
        },
        D: DMovie,
        E: EMovie,
    }
)

const AppContainer = createAppContainer(AppNavigator);
export default class Navigator extends React.Component {
    render() {
        return <AppContainer />;
    }
}