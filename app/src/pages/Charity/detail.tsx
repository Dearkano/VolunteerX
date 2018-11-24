import React, { useEffect, useState } from 'react'
import { css } from 'emotion'
import { Accordion, List, Icon, WingBlank, Button } from 'antd-mobile'
import { getCharityWork } from '../../services/charity'
import { ICharityWorks, ICommonweal, IBeneficiary } from '@volunteerx'
import { getCommwealById } from '../../services/commonweal'
import { getBeneficiaryById } from '../../services/beneficiary'
import container from '../../containers/user'

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
  const [data, setData] = useState<ICharityWorks | null>(null)
  const [issuer, setIssuer] = useState<ICommonweal | null>(null)
  const [beneficiary, setBeneficiary] = useState<IBeneficiary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAttend, setIsAttend] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const myId = container.state.myInfo ? container.state.myInfo.id : ''
  useEffect(() => {
    (async () => {
      const res = await getCharityWork(id)
      res.fail()
        .succeed(async (newData: ICharityWorks) => {
          const res1 = await getCommwealById(newData.issuer)
          res1.fail()
            .succeed(
              async newIssuer => {
                const res2 = await getBeneficiaryById(newData.beneficiary)
                res2.fail()
                  .succeed(
                    newBeneficiary => {
                      setData(newData)
                      setIssuer(newIssuer)
                      setBeneficiary(newBeneficiary)
                      for (const voteEntity of newData.voteEntities) {
                        if (voteEntity.volunteer === myId) {
                          setIsAttend(true)
                        }
                      }
                      setIsLoading(false)
                    }
                  )

              }
            )
        })
    })()
  }, [])
  const onChange = () => null
  const attend = () => {
    setIsPending(true)
  }

  if (isLoading || !data || !issuer || !beneficiary) {
    return <Icon type="loading" size="lg" />
  }

  return (
    <WingBlank>
      <div className={bodyStyle}>
        <div className={titleStyle}>{data.title}</div>
        <img src={data.imageUrl} className={imageStyle} />
        <div>{data.description}</div>
        <div className={mesStyle}>截止日期：{new Date(data.deadline).toLocaleString()}</div>
        <div className={mesStyle}>目标金额:{data.targetBalance}</div>
        <div className={mesStyle}>已获得投票:{data.receivedVoteToken}</div>
        <div className={mesStyle}>受益人:{beneficiary.name}</div>
        <div className={mesStyle}>发行组织:{issuer.name}</div>
        <Button
          disabled={isPending}
          onClick={attend}
        >
          {isPending ? '...' : isAttend ? '已报名' : '报名'}
        </Button>
        <Accordion defaultActiveKey="0" className="my-accordion" onChange={onChange}>
          <Accordion.Panel header={`参与投票的志愿者(${data.voteEntities.length})`} >
            <List className="my-list">
              {data.voteEntities.map(voteEntity => (
                <List.Item>{voteEntity.volunteer}{voteEntity.balance}</List.Item>
              ))}
            </List>
          </Accordion.Panel>
        </Accordion>
      </div >
    </WingBlank>
  )
}
