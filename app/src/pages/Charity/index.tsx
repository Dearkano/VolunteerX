import React, { useState, useEffect } from 'react'
import { css } from 'emotion'
import { List, Card, Icon, WhiteSpace, WingBlank } from 'antd-mobile'
import { ICharityWorks } from '@volunteerx'
import { getCharityWorks } from '../../services/charity'

const cardStyle = css`&&{
  margin-top:16px
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
            <>
              <Card key={item.id}>
                <Card.Header
                  title={item.title}
                  extra={<span>{item.type}</span>}
                />
                <Card.Body>
                  <div>{item.description}</div>
                </Card.Body>
                <Card.Footer
                  content={item.targetBalance}
                  extra={item.receivedVoteToken}
                />
              </Card>
              <WhiteSpace size="lg" style={{ backgroundColor: 'rgb(245,245,249)' }} />
            </>
          )
        )}
      </List>
      <WhiteSpace size="lg" />
    </WingBlank>
  )
}
