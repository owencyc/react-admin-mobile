import React, { Component } from 'react'
import { connect } from 'react-redux'
import { history } from '../../configureStore'
import { Button,List,InputItem,Modal,WhiteSpace,WingBlank,Toast,ListView,Slider,SwipeAction,Card,PullToRefresh } from 'antd-mobile'
import { push } from 'connected-react-router'
import { testEvent } from '../../redux/actions'
import { allComments } from '../../services'

const alert = Modal.alert;

class Skill extends Component {
    constructor(props){
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          });
        let skills=[{name:'小提琴',score:100},{name:'钢琴',score:100}]
        this.state={
            dataSource,
            skills,
            work:'',
            description:''
        }
        
    }
    componentDidMount(){
        document.title="技能编辑";
        //找历史记录
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.skills),
            name:'二胡'
        })
    }
    delData=(guid)=>{
        alert('警告', '要舍弃这项技能了吗', [
          { text: '否' },
          { text: '是', onPress: () => {
            Toast.info('舍弃啦~', 3, null, false);
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
                    <Card.Header
                      title='技能点'
                    />
                    <Card.Body>
                      <div>{rowData.name}分数 {rowData.score}</div>
                    </Card.Body>
                  </Card>
                </SwipeAction>
          );
        return (
            <div style={{width: '100%', height: '100%'}}>
                <List renderHeader={() => '你想改啥呀~'}>
                    <InputItem
                        type='text'
                        placeholder=""
                        value={this.state.name}
                        onChange={val=>{this.setState({name:val})}}
                        ref={el =>  this.txtName=el}
                    >技能</InputItem>
                    <WhiteSpace />
                    <WingBlank size="lg">
                        <p className="sub-title">自我评分</p>
                        <Slider
                            defaultValue={90}
                            min={0}
                            max={100}
                            value={this.state.score}
                            onChange={val => { this.setState({score:val}) }}
                        />
                    </WingBlank>
                    <WhiteSpace /><WhiteSpace />

                    <WingBlank>
                        <Button type="primary" onClick={() => {
                            console.log(this.state);
                            let tmp=[...this.state.skills,{name:this.state.name,score:this.state.score}]
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(tmp)
                            })
                            Toast.info('假装添加成功', 3, null, false);
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

export default connect(mapStateToProps, mapDispatchToProps)(Skill);