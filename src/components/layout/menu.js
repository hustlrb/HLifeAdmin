import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'

// import { menu } from '../../utils'
import {connect} from 'dva'
// const topMenus = menu.map(item => item.key)

const getMenus = function (menuArray, siderFold, parentPath) {
  const topMenus = menuArray.map(item => item.key)
  parentPath = parentPath || '/'
 // console.log('payload',menuArray,siderFold,parentPath)
  return menuArray.map(item => {
    if (item.child) {
      return (
        <Menu.SubMenu key={item.key} title={<span>{item.icon ? <Icon type={item.icon} /> : ''}{siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>}>
          {getMenus(item.child, siderFold, parentPath + item.key + '/')}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.key}>
          <Link to={parentPath + item.key}>
            {item.icon ? <Icon type={item.icon} /> : ''}
            {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
          </Link>
        </Menu.Item>
      )
    }
  })
}

function Menus ({ siderFold, darkTheme, location, isNavbar, handleClickNavMenu, navOpenKeys, changeOpenKeys,menuList }) {
  const menuItems = getMenus(menuList, siderFold)

  const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => !(navOpenKeys.indexOf(key) > -1))
    const latestCloseKey = navOpenKeys.find(key => !(openKeys.indexOf(key) > -1))
    let nextOpenKeys = []
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey)
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey)
    }
    changeOpenKeys(nextOpenKeys)
  }
  const getAncestorKeys = (key) => {
    const map = {
      navigation2: ['navigation']
    }
    return map[key] || []
  }
  // 菜单栏收起时，不能操作openKeys
  let menuProps = !siderFold ? {
    onOpenChange,
    openKeys: navOpenKeys
  } : {}

  return (
    <Menu
      {...menuProps}
      mode={siderFold ? 'vertical' : 'inline'}
      theme={darkTheme ? 'dark' : 'light'}
      onClick={handleClickNavMenu}
      defaultSelectedKeys={[location.pathname.split('/')[location.pathname.split('/').length - 1] || 'dashboard']}>
      {menuItems}
    </Menu>
  )
}

export default Menus
