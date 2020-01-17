import React,{Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import BaseContainer from '../components/BaseContainer'


class MovieDetail extends Component{

    constructor(props){
        super(props)
        this.state={
            loading: true
        }
    }
    
    goBack = () => {
        this.props.navigation.goBack()
    }
    
    componentDidMount () {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 3000)
    }

    render(){
        return(
            <BaseContainer loading={this.state.loading} title='哈哈哈，我是内容页'>
                <TouchableOpacity style={{marginTop: 50}} onPress={this.goBack}>
                    <Text>teststsas</Text>
                </TouchableOpacity>
                <View>
                    <Text>
                        我是测试内容文档
                    </Text>
                </View>
            </BaseContainer>
        )
    }
}
  
export default MovieDetail