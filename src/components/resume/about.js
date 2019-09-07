import React, { Component } from 'react'
import { connect } from 'react-redux'
import { history } from '../../configureStore'
import { Button, List, InputItem, TextareaItem, WhiteSpace, WingBlank, Toast } from 'antd-mobile'
import { push } from 'connected-react-router'
import { testEvent } from '../../redux/actions'
import { getData,post } from '../../services'

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
        getData('/getData').then(res=>{
            console.log(res);
            if(res.user&& res.user.length>0){
                //找历史记录
                this.setState({
                    name:res.user[0].fields.name,
                    talk:res.user[0].fields.p_word,
                    city:res.user[0].fields.city,
                    district:res.user[0].fields.state,
                    street:res.user[0].fields.street
                })
            }
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
                <TextareaItem
                        title="人生格言"
                        placeholder="座右铭~"
                        clear
                        data-seed="logId"
                        autoHeight
                        rows={3}
                        value={this.state.talk}
                        onChange={val=>{this.setState({talk:val})}}
                        ref={el =>  this.txtWords=el}
                    />
                <WhiteSpace />

                <WingBlank>
                    <Button type="primary" onClick={() => {
                        console.log(this.state);
                        post('/addIntro2/',{
                            name:this.state.name,
                            p_word:this.state.talk,
                            city:this.state.city,
                            state:this.state.district,
                            street:this.state.street,
                        }).then(res=>{
                            console.log(res)
                            if(res.status===1){
                                Toast.info('修改成功', 3, null, false);
                            }
                        })
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