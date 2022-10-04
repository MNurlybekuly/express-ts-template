interface ResponseInterface {
  status: 'OK' | 'ERROR'
  message: string
  package: any
}

export const handleResponse = (isOK: boolean, message: string, payload?: any): ResponseInterface => {
  return {
    status: isOK ? 'OK' : 'ERROR',
    message,
    package: payload !== undefined ? payload : null
  }
}
