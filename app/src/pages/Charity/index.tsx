import React, { useState, useEffect } from 'react'
import { css } from 'emotion'
import { List, Card, Icon, WhiteSpace, WingBlank } from 'antd-mobile'
import { ICharityWorks } from '@volunteerx'
import { getCharityWorks } from '../../services/charity'
import dayjs from 'dayjs'
import { navigate } from '@reach/router';

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
  const [data, setData] = useState<ICharityWorks[]>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    (async () => {
      const res = await getCharityWorks()
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
              <Card key={item.id} onClick={() => navigate(`/charitywork/${item.id}`)}>
                <Card.Body>
                  <img style={{ width: '100%' }} src={item.imageUrl} />
                  <div className={titleStyle}>{item.title}</div>
                  <div className={optionStyle}>
                    <div>目标金额: {item.targetBalance}</div>
                    <div>截止日期:{dayjs(item.deadline).fromNow()}</div>
                    <div>类型: {item.type}</div>
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
