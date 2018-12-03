import { GET,POST } from '../utils/fetch'

export const getCommwealById = (id: string) => GET(`Commonweal/${id}`)

export const authorizeToken = (volunteerId:string,projectId:string) => POST('authorizeToken',{
    params:{
        volunteerId,
        projectId,
        commonwealId:'zghszh'
    }
})