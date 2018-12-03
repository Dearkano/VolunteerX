import React, { useState } from 'react'
import { List, InputItem, Button, WingBlank, PickerView } from 'antd-mobile'
import { createForm } from 'rc-form'
import ListItem from 'antd-mobile/lib/list/ListItem'
import { navigate } from '@reach/router'
import container from '../../containers/user'

// tslint:disable-next-line:no-any
export default createForm()((props: any) => {
  const { getFieldProps } = props.form;
  const userTypes = [
    [
      { label: '志愿者', value: 'Volunteer' },
      { label: '公益组织', value: 'Commonweal' },
      { label: '捐献人', value: 'Donor' },
      { label: '银行', value: 'Bank' },
      { label: '管理员', value: 'Manager' },
    ],
  ]
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState(['Volunteer'])
  const [tip, setTip] = useState('')
  const submit = () => {
    const type = value[0]
    setIsLoading(true)
    props.form.validateFields(
      async (error: string, values: { userName: string, password: string }) => {
        if (type !== 'Manager') {
          const res = await fetch(`http://111.231.120.224:3000/api/${type}/${values.userName}`)
          if (res.status === 200) {
            const data = await res.json()
            const password = data.password
            if (values.password === password) {
              setIsLoading(false)
              container.LOG_IN(data, type)
              navigate('/')
            } else {
              setIsLoading(false)
              setTip('用户名或密码错误！')
            }
          } else {
            setIsLoading(false)
            setTip('用户名或密码错误！')
          }
        }
      })
  }
  const onChange = (v: string[]) => {
    setValue(v)
  }

  return (
    <WingBlank>

      <List style={{ marginTop: '20px' }}>
        <ListItem style={{ zIndex: 1 }}>
          <PickerView
            onChange={onChange}
            value={value}
            data={userTypes}
            cascade={false}
          />
        </ListItem>
        <InputItem
          {...getFieldProps('userName')}

        >
          用户名
        </InputItem>
        <InputItem
          {...getFieldProps('password')}
          type="password"
        >
          密码
        </InputItem>
        <Button
          disabled={isLoading}
          onClick={submit}
          type="primary"
        >{isLoading ? '...' : '登陆'}
        </Button>
        <ListItem style={{ color: 'red' }}>{tip}</ListItem>
      </List>
    </WingBlank>
  )
}
)
