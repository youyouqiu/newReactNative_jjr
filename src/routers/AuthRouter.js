/**
 * Created by zhl on 2019/8/15.
 */

import { createStackNavigator } from 'react-navigation';

import Login from '../pages/login';
import Register from '../pages/login/register';

export const AuthRouter = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: () => ({
                header: null
            })
        },
        Register: {
            screen: Register,
            navigationOptions: () => ({
                header: null
            })
        }
    },
    {
        defaultNavigationOptions: () => ({
            header: null,
            gesturesEnabled: true
        }),
        // headerTransitionPreset: 'fade-in-place',
        // headerMode: 'float',
        mode: 'modal'
    }
);
