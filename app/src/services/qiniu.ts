import { POST } from '../utils/fetch'

// tslint:disable-next-line:no-any
export async function uploadImage(files: any) {
  const file = files[0].file
  // tslint:disable-next-line:max-line-length
  const token = '9v6-757_VQ0n1SGjF-PIUVkRwpQNI0fb5y65eP3x:MiB7dUAaE86D7cwhIpW_IFrsXAM=:eyJzY29wZSI6InZvbHVudGVlcngiLCJkZWFkbGluZSI6MTU0NDU1Mjg3M30='
  const headers = new Headers()
  headers.append('Authorization', `Uptoken ${token}`)
  const formdata = new FormData()

  formdata.append('contentType', 'multipart/form-data')
  formdata.append('token', token)
  formdata.append('file', file, file.name)

  // tslint:disable-next-line:max-line-length
  return await fetch('http://upload.qiniup.com', { headers, method: 'POST', body: formdata })
}
