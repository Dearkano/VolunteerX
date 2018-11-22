declare module '@volunteerx' {
  export interface IVolunteer {
    // 志愿者身份证
    IDCard: string
    // 志愿者持有的投票token
    voteTokenBalance: number
    // 志愿者完成的志愿者项目
    finishedVolunteerWorks: string[]
    // 志愿者未完成的志愿者项目
    unFinishedVolunteerWorks: string[]
    // 志愿者参与的公益项目
    myCharityWorks: string[]
    // 志愿者标识符id
    id: string
    // 志愿者姓名
    name: string
    // 志愿者密码
    password: string
    // 志愿者余额
    balance: number
  }
}
