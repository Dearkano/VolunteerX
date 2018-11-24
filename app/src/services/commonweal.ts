import { GET } from '../utils/fetch'

export const getCommwealById = (id: string) => GET(`Commonweal/${id}`)
