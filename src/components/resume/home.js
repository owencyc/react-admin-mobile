import React, { Component } from 'react'
import { connect } from 'react-redux'
import { history } from '../../configureStore'
import { Button,List,InputItem,TextareaItem,WhiteSpace,WingBlank,Toast } from 'antd-mobile'
import { push } from 'connected-react-router'
import { testEvent } from '../../redux/actions'
import { getData,post } from '../../services'

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            work:'',
            description:''
        }
        
    }
    componentDidMount(){
        document.title="概要编辑";
        getData('/getData').then(res=>{
            console.log(res);
            if(res.user&& res.user.length>0){
                //找历史记录
                this.setState({
                    work:res.user[0].fields.work,
                    description:res.user[0].fields.word
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
                        value={this.state.work}
                        onChange={val=>{this.setState({work:val})}}
                        ref={el =>  this.txtWork=el}
                    >职业</InputItem>


                    <TextareaItem
                        title="简单描述"
                        placeholder="稍微说说自己叭~"
                        clear
                        data-seed="logId"
                        autoHeight
                        value={this.state.description}
                        onChange={val=>{this.setState({description:val})}}
                        ref={el =>  this.txtDescription=el}
                    />
                    <WhiteSpace />

                    <WingBlank>
                        <Button type="primary" onClick={() => {
                            console.log(this.state);
                            post('/addIntro/',{
                                work:this.state.work,
                                word:this.state.description
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
    //console.log(state.reducer1);
    return {}
  }

const mapDispatchToProps = dispatch => ({
    back:()=>{history.goBack()},
    move:()=>{dispatch(push({ pathname: '/search' }))},
  })

export default connect(mapStateToProps, mapDispatchToProps)(Home);