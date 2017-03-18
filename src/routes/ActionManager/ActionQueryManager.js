/**
 * Created by lilu on 2017/3/18.
 */
/**
 * Created by lilu on 2017/3/7.
 */
/**
 * Created by lilu on 2017/2/28.
 */
/**
 * Created by lilu on 2017/2/18.
 */
import React, {Component, PropTypes} from 'react'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Button, Tabs, Switch} from 'antd'
import ActioList from '../../components/ActionManager/ActionListManager/ActionList'
import {getAppUserList} from '../../selector/ActionManager/actionListManager'
import ActionListManager from './ActionListManager'
import ActionListManger from './ActionListManager'
// import UserSearch from '../../components/users/search'
// import CategoryModal from '../../components/ShopManager/CategoryManager/CategoryModal'
// import CategoryManager from './CategoryManager'
// const TabPane = Tabs.TabPane;

class ActionQueryManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      modalType: 'create',
      selectedItem: {},
      modalRandomKey: -1
    }
    console.log('hahaha')
  }

  componentDidMount() {
    // this.props.dispatch({type: 'shopCategoryManager/query'})
  }

  add() {
    this.setState({modalVisible: true, modalType: 'create'})

    this.props.dispatch({type: 'shopCategoryManager/openModal', payload: {}})
  }

  onOk(data) {
    this.props.dispatch({
      type: 'shopCategoryManager/' + this.state.modalType,
      payload: data
    })
    this.props.dispatch({type: 'shopCategoryManager/closeModal'})

    // console.log('data====>',data)
    // this.setState({modalVisible:false,modalRandomKey:this.state.modalRandomKey-1})
  }

  onCancel() {
    this.props.dispatch({type: 'shopCategoryManager/closeModal'})

    // this.setState({modalVisible:false,modalRandomKey:this.state.modalRandomKey-1})
  }

  onModify(data) {
    this.setState({modalVisible: true, modalType: 'update'})
    console.log('modalvisible', this.state.modalVisible)

    this.props.dispatch({type: 'shopCategoryManager/openModal', payload: data})

  }

  onDelete(itemId) {
    this.props.dispatch({
      type: 'personManage/delete',
      payload: itemId
    })
  }
  checkStatus(payload){
    // console.log('payload',payload)
    if(payload==true){
      this.props.dispatch({type:'shopCategoryManager/query',payload:{status:1}})

    }else{
      this.props.dispatch({type:'shopCategoryManager/query'})
    }
  }

  updateActionEnable(payload,record){
    console.log('payload',payload,record)
    this.props.dispatch({type:'shopCategoryManager/updateCategoryStatus',payload:{id:record,status:payload?1:0}})

  }
  // console.log('personList====>',personList)
  render() {
    // console.log('personList===>',this.props.roleList)

    return (
      <ActionListManager>
        <div className='content-inner'>
          <div>是否仅显示可见:<Switch checkedChildren={'是'} unCheckedChildren={'否'} defaultChecked={true} onChange={(status)=>{this.checkStatus(status)}}></Switch></div>
          <br/>
          {/*<Tabs defaultActiveKey="categoryManager" >*/}
          {/*<TabPane tab = '分类管理' key = 'categoryManager'>*/}
          <Button size='large' type='ghost' onClick={()=> {
            this.add()
          }}>创建活动 </Button>
          <ActioList
            updateActionEnable={(payload,record)=>{this.updateActionEnable(payload,record)}}
            dataSource={this.props.actionList}
            onEditItem={(payload)=> {
              this.onModify(payload)
            }}
            onDeleteItem={(payload)=> {
              this.onDelete(payload)
            }}
            pagination={{total: this.props.actionList.length, pageSize: 10}}
          />
          {/*</TabPane>*/}
          {/*</Tabs>*/}
          {/*<CategoryModal*/}
            {/*visible={this.state.modalVisible}*/}
            {/*type={this.state.modalType}*/}
            {/*onOk={(payload)=> {*/}
              {/*this.onOk(payload)*/}
            {/*}}*/}
            {/*onCancel={()=> {*/}
              {/*this.onCancel()*/}
            {/*}}*/}
            {/*item={this.state.selectedItem}*/}
            {/*tagList={this.props.tagList}*/}
            {/*modalKey={this.state.modalRandomKey}*/}
          {/*/>*/}
        </div>
      </ActionListManager>
    )
  }
}


function mapStateToProps(state) {
  let actionList = getAppUserList(state)
  return {
    actionList: actionList,

  }
}

export default connect(mapStateToProps)(ActionQueryManager)
