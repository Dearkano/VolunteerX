import React, { useEffect, useState } from 'react'
import { css } from 'emotion'
import { Accordion, List, Icon, WingBlank } from 'antd-mobile'
import { getVolunteerWork } from '../../services/volunteer'
import { IVolunteerWorks, ICommonweal } from '@volunteerx'
import { getCommwealById } from '../../services/commonweal'

const bodyStyle = css`&&{
  display:flex;
  flex-direction:column;
}`
const titleStyle = css`&&{
  font-size:20px;
  color:#000;
}`
const mesStyle = css`&&{
  color:#000;
  font-size:16px;
  text-align:left;
  margin-top:5px;
  margin-bottom:5px;
}`
const imageStyle = css`&&{
  width:100%;
  margin-bottom:10px;
  margin-top:10px;
}`

interface Props {
  id: string
}

export default (props: Props) => {
  const { id } = props
  const [data, setData] = useState<IVolunteerWorks | null>(null)
  const [issuer, setIssuer] = useState<ICommonweal | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    (async () => {
      const res = await getVolunteerWork(id)
      res.fail()
        .succeed(async (newData: IVolunteerWorks) => {
          const res1 = await getCommwealById(newData.issuer)
          res1.fail()
            .succeed(
              newIssuer => {
                setData(newData)
                setIssuer(newIssuer)
                setIsLoading(false)
              }
            )
        })
    })()
  }, [])

  if (isLoading || !data || !issuer) {
    return <Icon type="loading" size="lg" />
  }
  const onChange = () => null

  return (
    <WingBlank>
      <div className={bodyStyle}>
        <div className={titleStyle}>{data.title}</div>
        <img src={data.imageUrl} className={imageStyle} />
        <div>{data.description}</div>
        <div className={mesStyle}>截止日期：{new Date(data.deadline).toLocaleString()}</div>
        <div className={mesStyle}>奖励:{data.award}</div>
        <div className={mesStyle}>最大人数:{data.maxParticipants}</div>
        <div className={mesStyle}>发行组织:{issuer.name}</div>
        <Accordion defaultActiveKey="0" className="my-accordion" onChange={onChange}>
          <Accordion.Panel header={`已报名志愿者(${data.volunteers.length})`} >
            <List className="my-list">
              {data.volunteers.map(volunteer => (
                <List.Item>{volunteer}</List.Item>
              ))}
            </List>
          </Accordion.Panel>
          <Accordion.Panel header={`完成任务的志愿者(${data.confirmedVolunteers.length})`} className="pad">
            <List className="my-list">
              {data.confirmedVolunteers.map(volunteer => (
                <List.Item>{volunteer}</List.Item>
              ))}
            </List>
          </Accordion.Panel>
        </Accordion>
      </div >
    </WingBlank>
  )
}
