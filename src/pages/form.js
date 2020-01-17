import React,{Component} from 'react';
import {TouchableOpacity, View, Text, TextInput, Button} from 'react-native';
import BaseContainer from '../components/BaseContainer'
import {createForm} from 'rc-form'
import PropTypes from 'prop-types'

class FromItem extends React.PureComponent {
    static propTypes = {
        label: PropTypes.string,
        onChange: PropTypes.func,
        value: PropTypes.string,
        error: PropTypes.array,
    };
    getError = error => {
        if (error) {
            return error.map(info => {
                return (
                    <Text key={info}>
                        {info}
                    </Text>
                );
            });
        }
        return null;
    };
    render() {
        const { label, onChange, value, error } = this.props;
        return (
            <View>
                <TextInput
                    value={value || ''}
                    label={`${label}：`}
                    duration={150}
                    onChangeText={onChange}
                    highlightColor="#40a9ff"
                    underlineColorAndroid="#40a9ff"
                />
                <View>{this.getError(error)}</View>
            </View>
        );
    }
}

class MovieDetail extends Component{

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount () {
    }

    submit = () => {
        this.props.form.validateFields((error) => {
            if (error) return;
        });
    }

    test = async() => {
        let res = await storage.load({key: 'user'})
        console.log(res)
    }

    render(){
        const { getFieldDecorator, getFieldError } = this.props.form
        return(
            <BaseContainer title='哈哈哈，我是form表单'>
                <View>
                    <TouchableOpacity style={{marginTop: 50}} onPress={this.test}>
                        <Text>test</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>简单的手机号验证</Text>
                    {getFieldDecorator('username', {
                        validateFirst: true,
                        rules: [
                            { required: true, message: '请输入手机号!' },
                            {
                                pattern: /^1\d{10}$/,
                                message: '请输入正确的手机号!',
                            },
                            {
                                validator: (rule, value, callback) => {
                                    this.checkUserNameOne(value, callback);
                                },
                                message: '手机号已经被注册!',
                            },
                        ],
                        trigger: 'onChange'
                    })(
                        <FromItem
                            autoFocus
                            placeholder="手机号"
                            error={getFieldError('username')}
                        />
                    )}
                    <Button color="#40a9ff" onPress={this.submit} title="登陆" />
                </View>
            </BaseContainer>
        )
    }
}

export default createForm()(MovieDetail)
