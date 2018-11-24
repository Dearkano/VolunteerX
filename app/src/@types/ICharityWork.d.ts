declare module '@volunteerx' {
  interface VoteEntity{
    volunteer:string
    balance:number
  }
  export interface ICharityWorks {
    // 项目类型 ex 自然灾害 教育捐赠
    type: string
    // 目标金额
    targetBalance: number
    // 已获得投票数
    receivedVoteToken: number
    // 参与的志愿者
    voteEntities: VoteEntity[]
    // 受捐人
    beneficiary: string
    // 项目标识符id
    id: string
    // 项目标题
    title: string
    // 项目介绍
    description: string
    // 项目发起公益组织
    issuer: string
    // 项目截止日期
    deadline: string
    // 项目状态 ex : underway finished abort
    status: string
    // 项目图片
    imageUrl:string
  }
}
