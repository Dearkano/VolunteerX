declare module '@volunteerx' {
  export interface ICharityWorks {
    type: string
    targetBalance: number,
    receivedVoteToken: number,
    volunteers: string[],
    beneficiary: string,
    id: string,
    title: string,
    description: string,
    issuer: string,
    deadline: string,
    status: string
    imageUrl:string
  }
}
