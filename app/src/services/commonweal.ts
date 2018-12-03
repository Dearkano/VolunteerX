import { GET, POST } from '../utils/fetch'
import container from '../containers/user'

export const getCommwealById = (id: string) => GET(`Commonweal/${id}`)

export const authorizeToken = (volunteerId: string, projectId: string) =>
  POST('authorizeToken', {
    params: {
      volunteerId,
      projectId,
      commonwealId: container.state.myInfo ? container.state.myInfo.id : '',
    },
  })
