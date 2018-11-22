import React, { useState } from 'react'
import { Drawer, List, NavBar, Icon } from 'antd-mobile'
import ListItem from 'antd-mobile/lib/list/ListItem'
import { Router, RouteComponentProps, navigate } from '@reach/router'
import charityIcon from './assets/aixinjuanzeng.png'
import volunteerIcon from './assets/gonggongfuwu.png'
import homeIcon from './assets/zhuye.png'
import IssueCharityWorks from './pages/Charity/issue'
import CharityWorks from './pages/Charity'

function App() {
  const [open, setOpen] = useState(false)
  const onOpenChange = () => setOpen(prev => !prev)
  interface Props {
    // tslint:disable-next-line:no-any
    source: any,
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
      </ListItem>)
  }
  const sidebar = (
    <List>
      <Item source={homeIcon} content="主页" cl={() => navigate('/')} />
      <Item source={volunteerIcon} content="志愿者" cl={() => navigate('/volunteerworks')} />
      <Item source={charityIcon} content="公益捐赠" cl={() => navigate('/charityworks')} />
      <Item source={charityIcon} content="发布捐赠项目" cl={() => navigate('/issue/charityworks')} />
      <Item source={charityIcon} content="发布志愿者项目" cl={() => navigate('/issue/volunteerworks')} />
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
        <Router>
          <Route path="/charityworks" component={CharityWorks} />
          <Route path="/issue/charityworks" component={IssueCharityWorks} />
        </Router>
      </Drawer>

    </div>);
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
