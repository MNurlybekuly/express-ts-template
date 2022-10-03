import { Request, Response } from 'express';
import { httpsRequest } from '@helpers/httpsRequest';

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
    const hashResponse: any = await httpsRequest(callOptions, callData);

    const participantOptions = { ...options, path: `${contollerPath}/participant/create` };
    const participantData = JSON.stringify({
        phone: req.body.phone,
        iin: req.body.iin,
        name: req.body.name,
        surname: req.body.surname,
        callHash: hashResponse.callHash,
    });

    const participantResponse = await httpsRequest(participantOptions, participantData);
    res.send(participantResponse);
};
