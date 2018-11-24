import { GET } from '../utils/fetch'

export const getBeneficiaryById = (id: string) => GET(`Beneficiary/${id}`)
