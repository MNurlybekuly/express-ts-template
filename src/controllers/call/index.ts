import { Request, Response } from 'express';
import { httpsRequest } from '@helpers/httpsRequest';
import { handleResponse } from '@server/helpers/handleResponse';

const hostname = process.env.BROKER_HOSTNAME;
const contollerPath = process.env.BROKER_CONTROLLER_PATH;
const auth = `${process.env.BROKER_USERNAME}:${process.env.BROKER_PASSWORD}`;

const options = {
    hostname,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    auth,
};

export const getCallRequest = async (req: Request, res: Response) => {
    const callOptions = { ...options, path: `${contollerPath}/call/request` };
    const callData = JSON.stringify({ reason: req.body.reason });

    let callHash = '';

    try {
        const hashResponse: any = await httpsRequest(callOptions, callData);
        if (hashResponse.status === 'ERROR') {
            throw new Error(hashResponse.message);
        }

        callHash = hashResponse.callHash;
    } catch (e: any) {
        res.send(handleResponse(false, e.message || 'something went wrong'));
    }

    const participantOptions = { ...options, path: `${contollerPath}/participant/create` };
    const participantData = JSON.stringify({
        phone: req.body.phone,
        iin: req.body.iin,
        name: req.body.name,
        surname: req.body.surname,
        callHash: callHash,
    });

    try {
        const participantResponse: any = await httpsRequest(participantOptions, participantData);
        if (participantResponse.status === 'ERROR') {
            throw new Error(participantResponse.message);
        }

        res.send(participantResponse);
    } catch (e: any) {
        res.send(handleResponse(false, e.message || 'something went wrong'));
    }
};
