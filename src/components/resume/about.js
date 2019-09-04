import React, { Component } from 'react'
import { connect } from 'react-redux'
import { history } from '../../configureStore'
import { Button, List, InputItem, TextareaItem, WhiteSpace, WingBlank, Toast } from 'antd-mobile'
import { push } from 'connected-react-router'
import { testEvent } from '../../redux/actions'
import { allComments } from '../../services'

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            talk: '',
            city: '',
            district: '',
            street: ''
        }

    }
    componentDidMount() {
        document.title = "简介编辑";

        //找历史记录
        this.setState({
            name: '宋小秋'
        })
    }
    render() {
        return (
            <List renderHeader={() => '你想改啥呀~'}>
                <InputItem
                    type='text'
                    placeholder=""
                    clear
                    value={this.state.name}
                    onChange={val => { this.setState({ name: val }) }}
                    ref={el => this.txtName = el}
                >你的名字</InputItem>
                <WhiteSpace />
                <InputItem
                    type='text'
                    placeholder=""
                    clear
                    value={this.state.talk}
                    onChange={val => { this.setState({ talk: val }) }}
                    ref={el => this.txtTalk = el}
                >人生格言</InputItem>
                <WhiteSpace />
                <InputItem
                    type='text'
                    placeholder=""
                    clear
                    value={this.state.city}
                    onChange={val => { this.setState({ city: val }) }}
                    ref={el => this.txtCity = el}
                >城市</InputItem>
                <WhiteSpace />
                <InputItem
                    type='text'
                    placeholder=""
                    clear
                    value={this.state.district }
                    onChange={val => { this.setState({ district : val }) }}
                    ref={el => this.txtDistrict  = el}
                >区县</InputItem>
                <WhiteSpace />
                <InputItem
                    type='text'
                    placeholder=""
                    clear
                    value={this.state.street}
                    onChange={val => { this.setState({ street: val }) }}
                    ref={el => this.txtStreet = el}
                >街道</InputItem>
                <WhiteSpace />

                <WingBlank>
                    <Button type="primary" onClick={() => {
                        console.log(this.state);
                        Toast.info('假装修改成功', 3, null, false);
                    }}>提交</Button>
                    <WhiteSpace />
                    <Button onClick={() => {
                        this.props.back();
                    }}>返回</Button>
                </WingBlank>

                <WhiteSpace />
            </List>
        )
    }
}

const mapStateToProps = state => {
    //console.log('main inject:');
    return {}
}

const mapDispatchToProps = dispatch => ({
    back: () => { history.goBack() },
    move: () => { dispatch(push({ pathname: '/search' })) },
})

export default connect(mapStateToProps, mapDispatchToProps)(About);