import { GET, POST } from '../utils/fetch'
import { ICharityWorks } from '@volunteerx';
import generateHash from 'random-hash';

export function issueCharityWorks(value: ICharityWorks) {
  const issuer = 'zghszh'
  const data: ICharityWorks = {
    ...value,
    issuer,
    id: `charityworks-${issuer}-${generateHash()}`,
    voteEntities: [],
    receivedVoteToken: 0,
    status: 'underway',
  }

  return POST('CharityWork', {
    params: {
      ...data,
    },
  })
}

export const getCharityWorks = () => GET('CharityWork')
export const getCharityWork = (id: string) => GET(`CharityWork/${id}`)
