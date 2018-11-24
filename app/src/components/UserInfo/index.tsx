import React, { useState, useEffect } from 'react'
import { css } from 'emotion'
import { IVolunteer, IBank, ICommonweal, IBeneficiary } from '@volunteerx';
import Avatar from 'antd/es/avatar'
import { navigate } from '@reach/router';
interface Props {
  /**
   * 是否登录
   */
  isLogIn: boolean
  /**
   * 个人账户信息
   */
  myInfo: IVolunteer | IBank | ICommonweal | IBeneficiary | null
  type: string
  closeDrawer: () => void
}

const root = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 12px 0;

  /** <List> has style padding-top: 8px */
  padding-bottom: 5px;
`

const UserInfo: React.FunctionComponent<Props> = ({ isLogIn, myInfo, type, closeDrawer }) => (
  <div
    className={root}
    onClick={() => {
      isLogIn ? navigate('usercenter') : navigate('/logon')
      closeDrawer()
    }}
  >
    <Avatar size="large">{type ? type : 'V'}</Avatar>
    <div>{isLogIn ? myInfo && myInfo.name : '登陆'}</div>
  </div>
)

export default UserInfo
