import React, { Component } from 'react'
import { connect } from 'react-redux'
import { history } from '../../configureStore'
import { Button,List,InputItem,TextareaItem,WhiteSpace,WingBlank,Toast,ListView,Modal,SwipeAction,Card,PullToRefresh } from 'antd-mobile'
import { push } from 'connected-react-router'
import { testEvent } from '../../redux/actions'
import { allComments } from '../../services'

const alert = Modal.alert;

class Verse extends Component {
    constructor(props){
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          });
        let verses=[
            {
                author:'陈小澄',
                words:'心若向阳，无谓悲伤'
            }
        ]
        this.state={
            dataSource,
            verses,
            author:'',
            words:''
        }
        
    }
    componentDidMount(){
        document.title="那些话儿";
        //找历史记录
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.verses)
        })
    }
    delData=(guid)=>{
        alert('警告', '确认删除该金玉良言？', [
          { text: '否' },
          { text: '是', onPress: () => {
            Toast.info('删除成功了哦~', 3, null, false);
          }},
        ])
      }
    render() {
        const separator = (sectionID, rowID) => (
            <div
              key={`${sectionID}-${rowID}`}
              style={{
                backgroundColor: '#F5F5F9',
                height: 8,
                borderTop: '1px solid #ECECED',
                borderBottom: '1px solid #ECECED',
              }}
            />
          );
          const row = (rowData, sectionID, rowID) => (
            <SwipeAction
                style={{ backgroundColor: 'gray' }}
                autoClose
                right={[
                  {
                    text: '删除',
                    onPress: () => {this.delData(rowData.guid)},
                    style: { backgroundColor: '#F4333C', color: 'white' },
                  },
                ]}
              >
                  <Card full >
                    <Card.Body>
                      <div>{rowData.words}</div>
                    </Card.Body>
                    <Card.Footer extra={<div>{rowData.author}</div>} />
                  </Card>
                </SwipeAction>
          );
        return (
            <div style={{width: '100%', height: '100%'}}>
                <List renderHeader={() => '你想改啥呀~'}>
                <InputItem
                        type='text'
                        placeholder=""
                        clear
                        value={this.state.author}
                        onChange={val=>{this.setState({author:val})}}
                        ref={el =>  this.txtAuthor=el}
                    >作者</InputItem>


                    <TextareaItem
                        title="金玉良言"
                        placeholder="那些让你难忘的话儿~"
                        clear
                        data-seed="logId"
                        autoHeight
                        value={this.state.words}
                        onChange={val=>{this.setState({words:val})}}
                        ref={el =>  this.txtWords=el}
                    />

                    <WingBlank>
                        <Button type="primary" onClick={() => {
                            console.log(this.state);
                            let tmp=[...this.state.verses,{author:this.state.author,words:this.state.words}]
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(tmp)
                            })
                            Toast.info('假装增加成功', 3, null, false);
                        }}>增加</Button>
                        <WhiteSpace />
                        <Button onClick={() => {
                            this.props.back();
                        }}>返回</Button>
                    </WingBlank>

                    <WhiteSpace />
                </List>
                <ListView
                  style={{ width: '100%', height: '100%' }}
                  key='0'
                  ref={el => this.lv = el}
                  dataSource={this.state.dataSource}
                  renderHeader={() => <span>看看过往~</span>}
                  renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                      没有啦~
                  </div>)}
                  renderRow={row}
                  renderSeparator={separator}
                  useBodyScroll={false}
                  pullToRefresh={<PullToRefresh
                      refreshing={this.state.refreshing}
                      onRefresh={this.onRefresh}
                  />}
                  pageSize={10}
                  onEndReached={this.onEndReached}
                  onEndReachedThreshold={10}
              />
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    //console.log('main inject:');
    return {}
  }

const mapDispatchToProps = dispatch => ({
    back:()=>{history.goBack()},
    move:()=>{dispatch(push({ pathname: '/search' }))},
  })

export default connect(mapStateToProps, mapDispatchToProps)(Verse);