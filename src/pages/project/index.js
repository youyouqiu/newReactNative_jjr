import React,{Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Permissions from 'react-native-permissions'
export default class MovieDetail extends Component{
    
    gotoPath = (path) => {
        this.props.navigation.navigate(path, 'hasdias')
    }

    componentDidMount() {
        console.log('!!!')
        Permissions.request('photo').then(response => {
            console.log('???')
            // Returns once the user has chosen to 'allow' or to 'not allow' access
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            this.setState({photoPermission: response});
        })
    }

    render(){
        return(
            <View>
                <TouchableOpacity style={{marginTop: 50}} onPress={() => this.gotoPath('contentPage')}>
                    <Text>BBBBBBBB</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop: 50}} onPress={() => this.gotoPath('form')}>
                    <Text>formform</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
