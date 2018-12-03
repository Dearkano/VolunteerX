import { GET, POST } from '../utils/fetch'
import { IVolunteerWorks } from '@volunteerx';
import generateHash from 'random-hash';

export function issueVolunteerWorks(value: IVolunteerWorks) {
  const issuer = 'zghszh'
  const data: IVolunteerWorks = {
    ...value,
    issuer,
    id: `volunteerworks-${issuer}-${generateHash()}`,
    volunteers: [],
    confirmedVolunteers: [],
    unConfirmedVolunteers: [],
    status: 'underway',
  }

  return POST('VolunteerWork', {
    params: {
      ...data,
    },
  })
}

export const getVolunteerWorks = () => GET('VolunteerWork')

export const getVolunteerWork = (id: string) => GET(`VolunteerWork/${id}`)

export const applyForVolunteerWork = (id:string) => POST('applyForVolunteerWork',{
  params:{
    volunteerId:'zyzwf',
    projectId:id
  }
})
