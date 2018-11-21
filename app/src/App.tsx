import React, { useState } from 'react'
import { Drawer, List, NavBar, Icon } from 'antd-mobile'
import ListItem from 'antd-mobile/lib/list/ListItem'
import { navigate } from '@reach/router'
import charityIcon from './assets/aixinjuanzeng.png'
import volunteerIcon from './assets/gonggongfuwu.png'
import homeIcon from './assets/zhuye.png'

function App() {
  const [open, setOpen] = useState(false)
  const onOpenChange = () => setOpen(prev => !prev)
  const sidebar = (
    <List>
      <ListItem thumb={<img src={homeIcon} />}>主页</ListItem>
      <ListItem thumb={<img src={volunteerIcon} />}>志愿者</ListItem>
      <ListItem thumb={<img src={charityIcon} />}>公益捐赠</ListItem>
    </List >);

  return (
    <div>
      <NavBar icon={<Icon type="ellipsis" />} onLeftClick={onOpenChange}>VolunteerX</NavBar>
      <Drawer
        className="my-drawer"
        style={{
          minHeight: document.documentElement ? document.documentElement.clientHeight : 1080,
        }}
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
        sidebar={sidebar}
        open={open}
        onOpenChange={onOpenChange}
      >
      </Drawer>
    </div>);
}

export default App;
