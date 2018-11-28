import React, { useEffect, useState } from 'react'
import { css } from 'emotion'
import { Accordion, List, Icon, Button } from 'antd-mobile'
import { getVolunteerWork } from '../../services/volunteer'
import { IVolunteerWorks, ICommonweal } from '@volunteerx'
import { getCommwealById } from '../../services/commonweal'
import clock from '../../assets/clock.png'
import people from '../../assets/people.png'
import flag from '../../assets/flag.png'
import award from '../../assets/award.png'
import type from '../../assets/type.png'
import dayjs from 'dayjs'
import ListItem from 'antd-mobile/lib/list/ListItem'
const bodyStyle = css`
  && {
    display: flex;
    flex-direction: column;
    background-color: #f4f4f4;
  }
`
const titleStyle = css`
  && {
    font-size: 20px;
    color: #000;
    text-align:left;
    width:100%;
    padding:10px;
  }
`
const mesStyle = css`
  && {
    display: flex;
    margin-top: 5px;
    margin-bottom: 5px;
    border: #1296db solid thin;
    width: fit-content;
    align-items: center;
    border-radius: 3px;
    align-self:flex-start;
    margin-left:10px;
  }
`
const imageStyle = css`
  && {
    width: 100%;
    margin-bottom:10px;
    padding:10px;
    border-radius:20px;
  }
`
const timeStyle = css`
  && {
    font-size: 12px;
    padding-left: 5px;
    padding-right: 5px;
    color: #1296db;
  }
`
const clockStyle = css`
  && {
    background-color: #1296db;
    width: 20px;
    height: 20px;
  }
`
const opStyle = css`
  && {
    font-size: 14px;
  }
`

const iconStyle = css`
  && {
    width: 20px;
    height: 20px;
    padding: 3px;
    border-radius: 50%;
  }
`
const headStyle = css`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
  }
`

interface Props {
  id: string
}

export default (props: Props) => {
  const { id } = props
  const [data, setData] = useState<IVolunteerWorks | null>(null)
  const [issuer, setIssuer] = useState<ICommonweal | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    ;(async () => {
      const res = await getVolunteerWork(id)
      res.fail().succeed(async (newData: IVolunteerWorks) => {
        const res1 = await getCommwealById(newData.issuer)
        res1.fail().succeed(newIssuer => {
          setData(newData)
          setIssuer(newIssuer)
          setIsLoading(false)
        })
      })
    })()
  }, [])

  if (isLoading || !data || !issuer) {
    return <Icon type="loading" size="lg" />
  }
  const onChange = () => null

  return (
      <div className={bodyStyle}>
        <div className={headStyle}>
          <img src={data.imageUrl} className={imageStyle} />
          <div className={titleStyle}>{data.title}</div>
          <div className={mesStyle}>
            <img className={clockStyle} src={clock} />
            <div className={timeStyle}>{dayjs(data.deadline).fromNow()}</div>
          </div>
        </div>
        <List>
          <ListItem
            align="middle"
            thumb={<img style={{ backgroundColor: '#e976f2' }} className={iconStyle} src={flag} />}
          >
            <div className={opStyle}>{issuer.name}</div>
          </ListItem>
          <ListItem
            align="middle"
            thumb={
              <img style={{ backgroundColor: '#6acbac' }} className={iconStyle} src={people} />
            }
          >
            <div className={opStyle}>{data.maxParticipants}人</div>
          </ListItem>
          <ListItem
            align="middle"
            thumb={<img style={{ backgroundColor: '#669cea' }} className={iconStyle} src={award} />}
          >
            <div className={opStyle}>{data.award}投票通证</div>
          </ListItem>
          {/*<ListItem thumb={<img style={{backgroundColor:'#abd270'}} className={iconStyle} src={type}/>} className={opStyle}>>{data.type}</ListItem>*/}
        </List>

        <Accordion style={{marginTop:'10px'}} defaultActiveKey="0" className="my-accordion" onChange={onChange}>
          <Accordion.Panel header={<div style={{ color: '#1296db',fontSize:'14px',textAlign:'left' }}>活动详情</div>}>
            <div style={{padding:'10px'}}>{data.description}</div>
          </Accordion.Panel>
        </Accordion>

        <Accordion style={{marginTop:'10px'}} defaultActiveKey="0" className="my-accordion" onChange={onChange}>
          <Accordion.Panel 
          header={
          <div style={{display:'flex',justifyContent:'space-between'}}>
          <div style={{ color: '#1296db',fontSize:'14px',textAlign:'left' }}>已报名志愿者</div>
          <div style={{ opacity:0.6 ,fontSize:'14px',textAlign:'left', marginRight:'5px' }}>{data.volunteers.length}/{data.maxParticipants}</div>
          </div>}
          
          >
            <List className="my-list">
              {data.volunteers.map(volunteer => (
                <List.Item>{volunteer}</List.Item>
              ))}
            </List>
          </Accordion.Panel>
          <Accordion.Panel
            header={`完成任务的志愿者(${data.confirmedVolunteers.length})`}
            className="pad"
          >
            <List className="my-list">
              {data.confirmedVolunteers.map(volunteer => (
                <List.Item>{volunteer}</List.Item>
              ))}
            </List>
          </Accordion.Panel>
        </Accordion>
        <Button type="primary"  style={{position:'fixed'}} className={buttonStyle}>我要报名</Button>
    </div>
  )
}

const buttonStyle = css`&&{
  bottom:0;
  z-index:1011;
  font-size:14px;
  width:100%;
  color:#fff;
}`
