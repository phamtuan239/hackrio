import { Error } from '../types/error'

type ErrorRespone = {
  name: string
  error: any
  status: number
}

export const mapToApiUrl = <T>(prefixApi: string, obj: any): T => {
  for (const property in obj) {
    obj[property] = prefixApi + obj[property]
  }
  return obj
}

export const mapErrorApi = (error: any): ErrorRespone => {
  return {
    name: error.response?.data?.name,
    error: error.response?.data?.error,
    status: error.response?.status
  }
}

export const mapError = (error: Error | Error[] | null): string[] => {
  if (error && error instanceof Array) {
    return error.map((err) => `${err.param}: ${err.msg}`)
  } else if (error !== null) {
    return [`${error.param}: ${error.msg}`]
  }
  return []
}
