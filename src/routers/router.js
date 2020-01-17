import React from 'react'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Workbench from '../pages/workbench'
import Project from '../pages/project'
import Cmap from '../pages/c'
import Message from '../pages/message'
import Personal from '../pages/personal'
import MapView from '../pages/mapView'
import Form from '../pages/form'
import ContentPage from '../pages/contentPage'
import {View, Image} from 'react-native'
import {TestComponent} from "../components/testComponent/TestComponent";
const ICON = {
    WORK: require('../images/icons/work.png'),
    WORK_ACTIVE: require('../images/icons/work_active.png'),
    PROJECT: require('../images/icons/project.png'),
    PROJECT_ACTIVE: require('../images/icons/project.png'),
    QUICK: require('../images/icons/quick.png'),
    MESSAGE: require('../images/icons/message.png'),
    MESSAGE_ACTIVE: require('../images/icons/message.png'),
    PERSONAL: require('../images/icons/personal.png'),
    PERSONAL_ACTIVE: require('../images/icons/personal.png'),
}
const BottomTabNav = createBottomTabNavigator(
    {
        Workbench: {
            screen: Workbench,
            navigationOptions: {
                title: '工作',
                tabBarIcon: ({focused}) => {return <Image style={{width: 25, height: 25}} source={focused ? ICON.WORK_ACTIVE : ICON.WORK} />}
            }
        },
        Project: {
            screen: Project,
            navigationOptions: {
                title: '房源',
                tabBarIcon: () => {return <Image style={{width: 25, height: 25}} source={ICON.PROJECT} />}
            }
        },
        Cmap: {
            screen: Cmap,
            navigationOptions: {
                // title: 'asdasd'
                tabBarLabel: () => {return <View style={{height: 60}}><Image style={{width: 60, height: 60}} source={ICON.QUICK} /></View>}
            }
        },
        Message: {
            screen: Message,
            navigationOptions: {
                title: '消息',
                tabBarIcon: () => {return <Image style={{width: 25, height: 25}} source={ICON.MESSAGE} />}
            }
        },
        Personal: {
            screen: Personal,
            // screen:TestComponent,
            navigationOptions: {
                title: '我的',
                tabBarIcon: () => {return <Image style={{width: 25, height: 25}} source={ICON.PERSONAL} />}
            }
        },
    },{
        tabBarOptions: {
            activeTintColor: '#000000',
            inactiveTintColor: '#CBCBCB'
        }
    }
)

export const AppRouter = createStackNavigator(
    {
        BottomTabNav: {
            screen: BottomTabNav
        },
        test: {
            screen: MapView
        },
        contentPage: {
            screen: ContentPage
        },
        form: {
            screen: Form
        }
    },
    {
        // 快速定制导航条，所以这里会将全部的导航置空
        defaultNavigationOptions: () => ({
            header: null,
            gesturesEnabled: true
        }),
        // headerMode: 'screen',
        // transitionConfig: iOS
        //     ? dynamicModalTransition
        //     : () => ({
        //         screenInterpolator: StackViewStyleInterpolator.forHorizontal
        //     }),
        // transitionConfig: iOS ? dynamicModalTransition : StackViewStyleInterpolator.forHorizontal,
        // cardOverlayEnabled: true
        // transparentCard: true,
        // headerTransitionPreset: 'fade-in-place',
        // headerMode: 'float',
        // mode: 'modal'
    }
);