import auth from './auth'

import { mapToApiUrl } from '../../utils/convert'

const PREFIX_API = '/api/v1'

const authUrl = mapToApiUrl<typeof auth>(PREFIX_API, auth)

const ApiUrl = {
  auth: authUrl
}

export default ApiUrl
