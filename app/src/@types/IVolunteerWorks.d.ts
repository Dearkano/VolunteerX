declare module '@volunteerx' {
  export interface IVolunteerWorks {
    // 最大参与志愿者数
    maxParticipants: number
    // 奖励token金额
    award: number
    // 参与的志愿者
    volunteers: string[]
    // 完成项目的志愿者
    confirmedVolunteers: string[]
    // 未完成项目的志愿者
    unConfirmedVolunteers: string[]
    // 公益活动标识符id
    id: string
    // 活动标题
    title: string
    // 活动介绍
    description: string
    // 活动发起公益组织
    issuer: string
    // 活动截止日期
    deadline: string
    // 活动状态 同公益活动
    status: string
    // 活动图片
    imageUrl:string
  }
}
