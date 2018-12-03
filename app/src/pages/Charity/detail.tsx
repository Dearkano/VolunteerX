import React, { useEffect, useState } from 'react'
import { css } from 'emotion'
import { Accordion, List, Icon, Button, Modal, InputItem } from 'antd-mobile'
import { getCharityWork } from '../../services/charity'
import { ICharityWorks, ICommonweal, IBeneficiary } from '@volunteerx'
import { getCommwealById } from '../../services/commonweal'
import { getBeneficiaryById } from '../../services/beneficiary'
import clock from '../../assets/clock.png'
import people from '../../assets/people.png'
import flag from '../../assets/flag.png'
import award from '../../assets/award.png'
import type from '../../assets/type.png'
import vote from '../../assets/upvote.png'
import user from '../../assets/user.png'
import dayjs from 'dayjs'
import ListItem from 'antd-mobile/lib/list/ListItem'
import { voteAction } from '../../services/charity'

const prompt = Modal.prompt
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
    text-align: left;
    width: 100%;
    padding: 10px;
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
    align-self: flex-start;
    margin-left: 10px;
  }
`
const imageStyle = css`
  && {
    width: 100%;
    border-radius: 20px;
    margin-bottom: 10px;
    padding: 10px;
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
  const [data, setData] = useState<ICharityWorks | null>(null)
  const [issuer, setIssuer] = useState<ICommonweal | null>(null)
  const [beneficiary, setBeneficiary] = useState<IBeneficiary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [info, setInfo] = useState('确认')
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    ;(async () => {
      const res = await getCharityWork(id)
      res.fail().succeed(async (newData: ICharityWorks) => {
        const res1 = await getCommwealById(newData.issuer)
        res1.fail().succeed(async newIssuer => {
          const res2 = await getBeneficiaryById(newData.beneficiary)
          res2.fail().succeed(newBeneficiary => {
            setData(newData)
            setIssuer(newIssuer)
            setBeneficiary(newBeneficiary)
            setIsLoading(false)
          })
        })
      })
    })()
  }, [])

  if (isLoading || !data || !issuer || !beneficiary) {
    return <Icon type="loading" size="lg" />
  }
  const onChange = () => null
  const goVote = async (balance: string) => await voteAction(id, parseInt(balance, 10))

  return (
    <div className={bodyStyle}>
      <div className={bodyStyle} style={{ marginBottom: '3rem' }}>
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
            <div className={opStyle}>{beneficiary.name}</div>
          </ListItem>
          <ListItem
            align="middle"
            thumb={<img style={{ backgroundColor: '#669cea' }} className={iconStyle} src={award} />}
          >
            <div className={opStyle}>{data.targetBalance}公益通证</div>
          </ListItem>
          <ListItem
            thumb={<img style={{ backgroundColor: '#e6a887' }} className={iconStyle} src={vote} />}
            className={opStyle}
          >
            <div className={opStyle}>{data.receivedVoteToken}</div>
          </ListItem>
          <ListItem
            thumb={<img style={{ backgroundColor: '#abd270' }} className={iconStyle} src={type} />}
            className={opStyle}
          >
            <div className={opStyle}>{data.type}</div>
          </ListItem>
        </List>

        <Accordion
          style={{ marginTop: '10px' }}
          defaultActiveKey="0"
          className="my-accordion"
          onChange={onChange}
        >
          <Accordion.Panel
            header={
              <div style={{ color: '#1296db', fontSize: '14px', textAlign: 'left' }}>活动详情</div>
            }
          >
            <div style={{ padding: '10px' }}>{data.description}</div>
          </Accordion.Panel>
        </Accordion>

        <Accordion
          style={{ marginTop: '10px' }}
          defaultActiveKey="0"
          className="my-accordion"
          onChange={onChange}
        >
          <Accordion.Panel
            header={
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ color: '#1296db', fontSize: '14px', textAlign: 'left' }}>
                  已投票志愿者
                </div>
                <div
                  style={{ opacity: 0.6, fontSize: '14px', textAlign: 'left', marginRight: '5px' }}
                >
                  {data.voteEntities.length}
                </div>
              </div>
            }
          >
            <List className="my-list">
              {data.voteEntities.map(voteEntity => (
                <List.Item
                  thumb={
                    <img
                      style={{ width: '25px', height: '25px', borderRadius: '50%', padding: '3px' }}
                      src={user}
                    />
                  }
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '14px',
                      opacity: 0.8,
                    }}
                  >
                    <div>{voteEntity.volunteer}</div>
                    <div>{voteEntity.balance}</div>
                  </div>
                </List.Item>
              ))}
            </List>
          </Accordion.Panel>
        </Accordion>
      </div>
      <Button
        type="primary"
        style={{ position: 'fixed' }}
        className={buttonStyle}
        onClick={() =>
          prompt(
            '捐献项目投票',
            '请输入投票数额',
            [
              {
                text: '关闭',
              },
              {
                text: '确认',
                onPress: async (value: string) => await goVote(value),
              },
            ],
            'default',
            '',
            ['输入数额']
          )
        }
      >
        我要投票
      </Button>
    </div>
  )
}

const buttonStyle = css`
  && {
    bottom: 0;
    z-index: 1011;
    font-size: 14px;
    width: 100%;
    color: #fff;
  }
`
