import React, { useState } from 'react'
import { List, Icon } from 'antd-mobile'
import { authorizeToken } from '../../services/commonweal'
import authorize from '../../assets/authorize.png'
import confirm from '../../assets/confirm.png'
import people from '../../assets/people.png'
import { css } from 'emotion'
interface Props {
  volunteer: string
  finished: boolean
  projectId: string
}

const iconStyle = css`
  && {
    width: 20px;
    height: 20px;
    padding: 3px;
    border-radius: 50%;
  }
`

export default (props: Props) => {
  const { volunteer, finished, projectId } = props
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState(finished)
  const confirmWork = async (volunteerId: string) => {
    setIsLoading(true)
    const res = await authorizeToken(volunteerId, projectId)
    res.fail(() => setStatus(false)).succeed(() => setStatus(true))
    setIsLoading(false)
  }

  return (
    <List.Item thumb={ <img style={{ backgroundColor: '#6acbac' }} className={iconStyle} src={people} />}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{volunteer}</div>
        {isLoading ? (
          <Icon type="loading" />
        ) : (
          <img
            onClick={status ? () => {} : () => confirmWork(volunteer)}
            style={{ backgroundColor: '#fff' }}
            className={iconStyle}
            src={status ? confirm : authorize}
          />
        )}
      </div>
    </List.Item>
  )
}
