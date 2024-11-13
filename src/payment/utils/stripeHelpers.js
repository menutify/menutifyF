import { routesApi } from '../../data/routesPath'

import callAPI from '../../utils/callApi'

export const obtainCustomerId = async (email) => {
  const data = await callAPI.postData(routesApi.caCreateCustomer, { email })
  return data
}
