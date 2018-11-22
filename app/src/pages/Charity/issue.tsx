import React, { useState, useRef } from 'react'
import { List, InputItem, DatePicker, Button } from 'antd-mobile'
import { createForm } from 'rc-form'

interface Props {
  // tslint:disable-next-line:no-any
  form: any
}

export default createForm()((props: Props) => {
  const { getFieldProps } = props.form
  const [date, setDate] = useState(new Date())

  const submit = () => {
    props.form.validateFields((error: string, value: string) => {
      const {title,description,type,beneficiary,deadline}
    });

  }

  return (
    <List>
      <InputItem
        {...getFieldProps('title')}
        placeholder="请输入标题"
        clear
      >标题
      </InputItem>
      <InputItem
        {...getFieldProps('description')}
        placeholder="请输入简介"
        clear
      >简介
      </InputItem>
      <InputItem
        {...getFieldProps('type')}
        placeholder="请输入类型"
        clear
      >类型
      </InputItem>
      <InputItem
        {...getFieldProps('beneficiary')}
        placeholder="请输入受捐助人id"
        clear
      >受捐赠人
      </InputItem>
      <InputItem
        {...getFieldProps('description')}
        placeholder="请输入简介"
        clear
      >简介
      </InputItem>
      <DatePicker
        value={date}
        onChange={setDate}
      >
        <List.Item arrow="horizontal">截止日期</List.Item>
      </DatePicker>

      <Button onClick={submit}>提交</Button>

    </List>
  )
}
)
