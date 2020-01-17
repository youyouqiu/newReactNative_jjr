import React,{Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {connect} from 'react-redux'
import {MapView} from 'react-native-baidumap-sdk'
import BaseContainer from '../components/BaseContainer'


class MovieDetail extends Component{

    constructor(props) {
        super(props)
        this.state = {
            error: {
                isError: true,
                errorText: '错误啦',
                onErrorPress: this.onErrorPress
            }
        }
    }

    changeUserInfo = () => {
        this.props.dispatch({
            type: 'user/updateUserAsync',
            payload: {
                status: 11111
            }
        })
    }

    goto = () => {
        this.props.navigation.navigate('contentPage', 'hasdias')
    }

    componentDidMount () {
    }

    onErrorPress = () => {
        this.setState({
            error: {
                ...this.state.error,
                isError: false
            }
        })
    }

    render(){
        const {error} = this.state
        return(
            <BaseContainer error={error}  title='哈哈哈，我是地图页'>
                <View>
                    <TouchableOpacity style={{marginTop: 50}} onPress={this.goBack}>
                        <Text>goback</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 50}} onPress={this.changeUserInfo}>
                        <Text>改变用户信息</Text>
                    </TouchableOpacity>
                    <MapView center={{ latitude: 39.2, longitude: 112.4 }} style={{width: 300, height: 300}}/>
                </View>
            </BaseContainer>
        )
    }
}

const mapStateToProps = ({user})=> {
    return {user}
}
export default connect(mapStateToProps)(MovieDetail)
