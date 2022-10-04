import { Request, Response } from 'express'
import { httpsRequest } from '@helpers/httpsRequest'
import { handleResponse } from '@helpers/handleResponse'

const hostname = process.env.BROKER_HOSTNAME !== undefined ? process.env.BROKER_HOSTNAME : '127.0.0.1'
const contollerPath =
  process.env.BROKER_CONTROLLER_PATH !== undefined ? process.env.BROKER_CONTROLLER_PATH : '/controllers'
const username = process.env.BROKER_USERNAME !== undefined ? process.env.BROKER_USERNAME : 'username'
const password = process.env.BROKER_PASSWORD !== undefined ? process.env.BROKER_PASSWORD : 'password'
const auth = `${username}:${password}`

const options = {
  hostname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  auth
}

export const getCallRequest = async (req: Request, res: Response): Promise<void> => {
  const callOptions = { ...options, path: `${contollerPath}/call/request` }
  const callData = JSON.stringify({ reason: req.body.reason })

  let callHash = ''

  try {
    const hashResponse: any = await httpsRequest(callOptions, callData)
    if (hashResponse.status === 'ERROR') {
      throw new Error(hashResponse.message)
    }

    callHash = hashResponse.callHash
  } catch (e: any) {
    const message = e.message !== undefined ? e.message : 'something went wrong'
    res.send(handleResponse(false, message))
  }

  const participantOptions = { ...options, path: `${contollerPath}/participant/create` }
  const participantData = JSON.stringify({
    phone: req.body.phone,
    iin: req.body.iin,
    name: req.body.name,
    surname: req.body.surname,
    callHash
  })

  try {
    const participantResponse: any = await httpsRequest(participantOptions, participantData)
    if (participantResponse.status === 'ERROR') {
      throw new Error(participantResponse.message)
    }

    res.send(participantResponse)
  } catch (e: any) {
    const message = e.message !== undefined ? e.message : 'something went wrong'
    res.send(handleResponse(false, message))
  }
}
