import React,{Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

export default class MovieDetail extends Component{
    
    gotoPath = () => {
        this.props.navigation.navigate('test', 'hasdias')
    }

    render(){
        return(
            <View>
                <TouchableOpacity style={{marginTop: 50}} onPress={this.gotoPath}>
                    <Text>AAAAAAAAA</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
