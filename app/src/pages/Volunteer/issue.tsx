import React, { useState, useRef, useEffect } from 'react'
import { navigate } from '@reach/router'
import { List, InputItem, DatePicker, Button, TextareaItem, ImagePicker } from 'antd-mobile'
import { createForm } from 'rc-form'
import { IVolunteerWorks } from '@volunteerx';
import { issueVolunteerWorks } from '../../services/volunteer'
import { uploadImage } from '../../services/qiniu'

interface Props {
  // tslint:disable-next-line:no-any
  form: any
}

export default createForm()((props: Props) => {
  const { getFieldProps } = props.form
  const [date, setDate] = useState(new Date())
  const [imageUrl, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  // tslint:disable-next-line:no-any
  const [files, setFiles] = useState<any>([])
  const submit = () => {
    setIsLoading(true)
    props.form.validateFields(async (error: string, value: IVolunteerWorks) => {
      const res = await issueVolunteerWorks({ ...value, imageUrl, deadline: date.toString(), })
      res.fail()
        .succeed(
          () => {
            setIsLoading(false)
            navigate('/volunteerworks')
          }
        )
    });
  }

  // tslint:disable-next-line:no-any
  const onChange = async (e: any) => {
    setFiles(e)
    const response = await uploadImage(e)
    if (response.status === 200) {
      const data = await response.json()
      setUrl(`http://cdn.vaynetian.com/${data.key}`)
    }
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
        {...getFieldProps('award')}
        placeholder="请输入奖励金额"
        type="number"
        clear
      >奖励
      </InputItem>
      <InputItem
        {...getFieldProps('maxParticipants')}
        placeholder="请输入最大人数"
        type="numebr"
        clear
      >最大人数
      </InputItem>
      <DatePicker
        value={date}
        onChange={setDate}
      >
        <List.Item arrow="horizontal">截止日期</List.Item>
      </DatePicker>
      <ImagePicker
        files={files}
        onChange={onChange}
        multiple={false}
      />
      <TextareaItem
        {...getFieldProps('description')}
        placeholder="请输入简介"
        title="简介"
        rows={5}
        clear
      />
      <Button
        onClick={submit}
        disabled={isLoading}
      >
        {isLoading ? '提交中' : '提交'}
      </Button>

    </List>
  )
}
)
