import React, { useState } from 'react'
import { Drawer, List, NavBar, Icon } from 'antd-mobile'
import ListItem from 'antd-mobile/lib/list/ListItem'
import { Router, RouteComponentProps, navigate } from '@reach/router'

import container from './containers/user'

import charityIcon from './assets/charity.png'
import volunteerIcon from './assets/volunteer.png'
import homeIcon from './assets/zhu-ye.png'
import logo from './assets/logo.png'
import register from './assets/register.png'
import issueIcon from './assets/issue.png'
import logoutIcon from './assets/logout.png'

import IssueCharityWorks from './pages/Charity/issue'
import IssueVolunteerWorks from './pages/Volunteer/issue'
import CharityWorks from './pages/Charity'
import CharityWork from './pages/Charity/detail'
import VolunteerWorks from './pages/Volunteer'
import VolunteerWork from './pages/Volunteer/detail'
import Logon from './pages/Logon'
import UserInfo from './components/UserInfo'
import Register from './pages/Register'

function App() {
  const [open, setOpen] = useState(false)
  const onOpenChange = () => setOpen(prev => !prev)
  interface Props {
    // tslint:disable-next-line:no-any
    source: any
    content: string
    cl: () => void
  }
  const Item = (props: Props) => {
    const { source, content, cl } = props

    return (
      <ListItem
        onClick={() => {
          onOpenChange()
          cl()
        }}
        thumb={<img src={source} />}
      >
        {content}
      </ListItem>
    )
  }
  const sidebar = (
    <List style={{ border: '' }}>
      <UserInfo
        isLogIn={container.state.isLogIn}
        myInfo={container.state.myInfo}
        type={container.state.type}
        closeDrawer={onOpenChange}
      />
      <Item source={homeIcon} content="主页" cl={() => navigate('/')} />
      <Item source={volunteerIcon} content="志愿者" cl={() => navigate('/volunteerworks')} />
      <Item source={charityIcon} content="公益捐赠" cl={() => navigate('/charityworks')} />
      {container.state.isLogIn && (
        <>
          <Item
            source={issueIcon}
            content="发布捐赠项目"
            cl={() => navigate('/issue/charityworks')}
          />
          <Item
            source={issueIcon}
            content="发布公益项目"
            cl={() => navigate('/issue/volunteerworks')}
          />
          <Item
            source={logoutIcon}
            content="注销"
            cl={() => {
              container.LOG_OUT()
              navigate('/')
            }}
          />
        </>
      )}
        <Item source={register} content="注册" cl={() => navigate('/register')} />
    </List>
  )

  return (
    <div>
      <NavBar icon={<Icon type="ellipsis" />} onLeftClick={onOpenChange}>
        <img style={{ width: '100px' }} src={logo} />
      </NavBar>
      <Drawer
        className="my-drawer"
        style={{
          minHeight: document.documentElement ? document.documentElement.clientHeight : 1080,
          backgroundColor:'#fff'
        }}
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 20 }}
        sidebar={sidebar}
        open={open}
        onOpenChange={onOpenChange}
      >
        <Router>
          <Route path="/charityworks" component={CharityWorks} />
          <Route path="/logon" component={Logon} />
          <Route path="/volunteerworks" component={VolunteerWorks} />
          <Route path="/issue/charityworks" component={IssueCharityWorks} />
          <Route path="/issue/volunteerworks" component={IssueVolunteerWorks} />
          <Route path="/volunteerwork/:id" component={VolunteerWork} />
          <Route path="/charitywork/:id" component={CharityWork} />
          <Route path="/register" component={Register} />
        </Router>
      </Drawer>
    </div>
  )
}

const Route: React.FunctionComponent<
  RouteComponentProps & {
    // @types/react 里 createElement 签名很混乱
    // tslint:disable-next-line:no-any
    component: any
    // component: React.FunctionComponent<any>
  }
> = props => {
  const { path, component, ...otherProps } = props

  return React.createElement(component, otherProps)
}

export default App
