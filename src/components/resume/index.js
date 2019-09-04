import React, { Component } from 'react'
import { connect } from 'react-redux'
import { WingBlank,WhiteSpace,Button } from 'antd-mobile'
import { push } from 'connected-react-router'

class Resume extends Component {
    constructor(props){
        super(props);
        this.state={
            content:''
        }
        
    }
    componentDidMount(){
        document.title="编辑";
    }
    render() {
        
        return (
            <WingBlank>
                <p>你想写些什么了^_^</p>
                <WhiteSpace />
                <Button type='primary' onClick={()=>{this.props.move('/resume-about')}}>概要</Button>
                <WhiteSpace />
                <Button type='primary' onClick={()=>{this.props.move('/resume-about')}}>简介</Button>
                <WhiteSpace />
                <Button type='primary' onClick={()=>{this.props.move('/resume-about')}}>技能</Button>
                <WhiteSpace />
                <Button type='primary' onClick={()=>{this.props.move('/resume-about')}}>那些句子</Button>
                <WhiteSpace />
                <WhiteSpace />
                <Button onClick={()=>{window.open("http://www.pedalo.cn/autumn/"); }}>去看看效果~</Button>
            </WingBlank>
        )
    }
}

const mapStateToProps = state => {
    //console.log('main inject:');
    console.log(state.reducer1);
    return state.reducer1
  }

const mapDispatchToProps = dispatch => ({
    move:(route)=>{dispatch(push({ pathname: route }))},
  })

export default connect(mapStateToProps, mapDispatchToProps)(Resume);