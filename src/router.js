import React from 'react'
import {Router, Route, IndexRoute, hashHistory} from 'dva/router'

import App from './routes/app'
import PersonManage from './routes/BGManager/personManager'
import TopicManage from './routes/topicManager/topicManager'
import TopicCategoryManager from './routes/topicManager/topicCategoryManager'
import TopicDetail from './routes/topicManager/TopicDetail'
import UserInfoManage from './routes/UserInfo/userInfo'
import ShopCategoryManage from './routes/ShopManager/CategoryQuery'
import ShopTagManage from './routes/ShopManager/TagManager'
import ShopCategoryChoosen from './routes/ShopManager/CategoryChoosen'
import ShopDetailsManager from './routes/ShopManager/ShopDetailsManager'
import ShopListManager from './routes/ShopManager/ShopListManager'
import AppUserListManager from './routes/AppUserManager/AppUserListManager'
import AppUserDetailManager from './routes/AppUserManager/AppUserDetailManager'
import MessagePushIndex from './routes/MessagePush/MessagePushIndex'

import Welcome from './routes/welcome'
import err from './routes/error'
export default function ({history, app}) {


  const routes =
    <Route path="/" breadcrumbName='仪表盘' component={App}>
      <IndexRoute component={Welcome}/>
      <Route path="/BGManager/personListManager" breadcrumbName="用户列表管理" component={PersonManage}/>
      <Route path="/BGManager/appUserManager" breadcrumbName="app用户管理">
        <IndexRoute component={AppUserListManager}/>
        <Route path="/BGManager/appUserManager/appUserDetailManager" breadcrumbName="app用户详情" component={AppUserDetailManager}/>
      </Route>
      <Route path="/adminUserInfoManager" breadcrumbName="个人信息" component={UserInfoManage}/>
      <Route path="/shopManager/shopCategoryManager" breadcrumbName="店铺分类管理" >
        <IndexRoute   component={ShopCategoryManage}/>
        <Route path="/shopManager/shopCategoryManager/ShopTagManager" breadcrumbName="店铺标签管理" component={ShopTagManage}/>
        <Route path="/shopManager/shopCategoryManager/ShopCategoryChoosen" breadcrumbName="精选分类管理" component={ShopCategoryChoosen}/>
      </Route>
      <Route path="/shopManager/shopInfoManager" breadcrumbName="店铺信息管理" >
        <IndexRoute   component={ShopListManager}/>
        <Route path="/shopManager/shopInfoManager/shopDetailsManager" breadcrumbName="店铺详情管理" component={ShopDetailsManager}/>
      </Route>
      <Route path="/topicManager/contentManager" breadcrumbName="内容管理" component={TopicManage}/>
      <Route path="/topicManager/topicDetail" breadcrumbName="话题详情" component={TopicDetail}/>
      <Route path="/topicManager/topicCategoryManager" breadcrumbName="分类管理" component={TopicCategoryManager}/>
      <Route path="/messagePushManager/messagePushIndex" breadcrumbName="消息推送" component={MessagePushIndex}/>
      <Route path="*" component={err}/>
    </Route>

  return <Router history={history} routes={routes}/>
}
