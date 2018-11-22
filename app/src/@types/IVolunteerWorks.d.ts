declare module '@volunteerx' {
  export interface IVolunteerWorks {
    maxParticipants: number,
    award: number,
    volunteers: string[],
    confirmedVolunteers: string[],
    unConfirmedVolunteers: string[],
    id: string,
    title: string,
    description: string,
    issuer: string,
    deadline: string,
    status: string
  }
}
