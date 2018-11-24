import React, { useState, useEffect } from 'react'
import { css } from 'emotion'
import { List, Card, Icon, WhiteSpace, WingBlank } from 'antd-mobile'
import { IVolunteerWorks } from '@volunteerx'
import { getVolunteerWorks } from '../../services/volunteer'
import { navigate } from '@reach/router'
import dayjs from 'dayjs'

const titleStyle = css`&&{
  font-size:18px;
  font-weight:bolder;
  text-align:left;
}`
const optionStyle = css`&&{
  display:flex;
  justify-content:space-around;
  font-size:14px;
  opacity:0.6;
}`

export default () => {
  const [data, setData] = useState<IVolunteerWorks[]>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    (async () => {
      const res = await getVolunteerWorks()
      res.fail()
        .succeed(newData => {
          setIsLoading(false)
          setData(newData)
        })
    })()
  }, [])
  if (isLoading) {
    return <Icon type="loading" size="lg" />
  }

  return (
    <WingBlank size="lg">
      <WhiteSpace size="lg" />
      <List>
        {data.map(
          item => (
            <div key={item.id}>
              <Card key={item.id} onClick={() => navigate(`/volunteerwork/${item.id}`)}>
                <Card.Body>
                  <img style={{ width: '100%' }} src={item.imageUrl} />
                  <div className={titleStyle}>{item.title}</div>
                  <div className={optionStyle}>
                    <div>报名人数: {item.volunteers.length}/{item.maxParticipants}</div>
                    <div>截止日期:{dayjs(item.deadline).fromNow()}</div>
                    <div>奖励:{item.award} </div>
                  </div>
                </Card.Body>
              </Card>
              <WhiteSpace size="lg" style={{ backgroundColor: 'rgb(245,245,249)' }} />
            </div>
          )
        )}
      </List>
      <WhiteSpace size="lg" />
    </WingBlank>
  )
}
