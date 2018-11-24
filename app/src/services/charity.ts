import { GET, POST } from '../utils/fetch'
import { ICharityWorks } from '@volunteerx'
import generateHash from 'random-hash'
import container from '../containers/user'

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

export function vote(id: string, balance: number) {
  const myId = container.state.myInfo ? container.state.myInfo.id : ''

  return POST('vote', {
    params: {
      balance,
      volunteerId: myId,
      projectId: id,
    },
  })
}
