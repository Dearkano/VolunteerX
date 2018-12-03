import React, { useState } from 'react'
import { List, InputItem, Button, WingBlank, PickerView } from 'antd-mobile'
import { createForm } from 'rc-form'
import ListItem from 'antd-mobile/lib/list/ListItem'
import { navigate } from '@reach/router'
import container from '../../containers/user'
import { POST } from '@/utils/fetch'

// tslint:disable-next-line:no-any
export default createForm()((props: any) => {
  const { getFieldProps } = props.form
  const userTypes = [
    [
      { label: '志愿者', value: 'Volunteer' },
      { label: '公益组织', value: 'Commonweal' },
      { label: '捐献人', value: 'Donor' },
      { label: '受捐人', value: 'Beneficiary' },
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
    props.form.validateFields(async (error: string, values: any) => {
      const { id, name, password, IDCard } = values
      let params = {
        ...values,
        finishedVolunteerWorks: [],
        unFinishedVolunteerWorks: [],
        voteTokenBalance: 0,
        myCharityWorks: [],
        balance: 0,
      }
      if (type === 'Commonweal') {
        params = {
          ...values,
          balance: 0,
          myVolunteerWorks: [],
          myCharityWorks: [],
        }
      } else if (type === 'Bank') {
        params = {
          ...values,
          balance: 0,
          issuedToken: 0,
        }
      } else if (type === 'Beneficiary' || type === 'Donor') {
        params = {
          ...values,
          balance: 0,
        }
      } 
      if (type !== 'Manager') {
        const res = await POST(type, {
          params,
        })
        res
          .fail(() => {
            setIsLoading(false)
            setTip('注册失败')
          })
          .succeed(() => {
            setIsLoading(false)
            setTip('注册成功！')
          })
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
          <PickerView onChange={onChange} value={value} data={userTypes} cascade={false} />
        </ListItem>
        <InputItem {...getFieldProps('id')}>登陆名</InputItem>
        <InputItem {...getFieldProps('password')} type="password">
          密码
        </InputItem>
        <InputItem {...getFieldProps('name')}>用户名</InputItem>
        {value[0] === 'Volunteer' || value[0] === 'Beneficiary' || value[0] === 'Donor' ? (
          <InputItem {...getFieldProps('IDCard')} type="number">
            身份证号码
          </InputItem>
        ) : null}
        <Button disabled={isLoading} onClick={submit} type="primary">
          {isLoading ? '...' : '注册'}
        </Button>
        <ListItem style={{ color: 'red' }}>{tip}</ListItem>
      </List>
    </WingBlank>
  )
})
