import React, { Component } from 'react'
import { connect } from 'react-redux'
import { history } from '../../configureStore'
import { Button,List,InputItem,TextareaItem,WhiteSpace,WingBlank,Toast } from 'antd-mobile'
import { push } from 'connected-react-router'
import { testEvent } from '../../redux/actions'
import { allComments } from '../../services'

class About extends Component {
    constructor(props){
        super(props);
        this.state={
            work:'',
            description:''
        }
        
    }
    componentDidMount(){
        document.title="概要编辑";

        //找历史记录
        this.setState({
            work:'音乐老师'
        })
    }
    render() {
        return (
            <List renderHeader={() => '你想改啥呀~'}>
                    <InputItem
                        type='text'
                        placeholder=""
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
    console.log(state.reducer1);
    return state.reducer1
  }

const mapDispatchToProps = dispatch => ({
    back:()=>{history.goBack()},
    move:()=>{dispatch(push({ pathname: '/search' }))},
  })

export default connect(mapStateToProps, mapDispatchToProps)(About);