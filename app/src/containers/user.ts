import { Container } from '../hooks/useContainer'
import { IVolunteer, ICommonweal, IBank, IBeneficiary } from '@volunteerx'

interface State {
  /**
   * 是否登录
   */
  isLogIn: boolean
  /**
   * 个人账户信息
   */
  myInfo: IVolunteer | IBank | ICommonweal | IBeneficiary | null
  /**
   * 账户类型
   */
  type: string
}

class UserContainer extends Container<State> {
  constructor() {
    super()

    this.state = {
      isLogIn: false,
      myInfo: null,
      type: '',
    }
  }

  LOG_IN = (data: IVolunteer | IBank | ICommonweal | IBeneficiary, type: string) => {
    this.setState({
      type,
      isLogIn: true,
      myInfo: data,
    })
  }

  LOG_OUT = () => {
    this.setState({
      isLogIn: false,
      myInfo: null,
    })
  }
}

export default new UserContainer()
