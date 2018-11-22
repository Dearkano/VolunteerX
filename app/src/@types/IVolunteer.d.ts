declare module '@volunteerx' {
  export interface IVolunteer {
    IDCard: string
    voteTokenBalance: number
    finishedVolunteerWorks: string[]
    unFinishedVolunteerWorks: string[]
    myCharityWorks: string[]
    id: string
    name: string
    password: string
    balance: number
  }
}
