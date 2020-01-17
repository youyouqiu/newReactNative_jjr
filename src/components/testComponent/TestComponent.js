import React, {Component} from 'react'
import {View, Text} from 'react-native'

const ScrollableTabView = require('react-native-scrollable-tab-view');

export class TestComponent extends Component {

    render() {
        return (
            <View style={{paddingTop: 50, height: '100%'}}>
                <XKJScrollTabView>
                    <View tabLabel="React" style={{height: 100}}>
                        <Text>1111</Text>
                    </View>
                    <View tabLabel="Flow" style={{height: 100}}>
                        <Text>1111</Text>
                    </View>
                    <View tabLabel="Jest" style={{height: 100}}>
                        <Text>1111</Text>
                    </View>
                </XKJScrollTabView>
            </View>
        )
    }
}

export class XKJScrollTabView extends Component {


    render() {
        console.log('props',this.props);
        return (
            <ScrollableTabView style={{height: 200, backgroundColor: '#ff8853'}}>
                {this.props.children}
            </ScrollableTabView>
        )
    }

}