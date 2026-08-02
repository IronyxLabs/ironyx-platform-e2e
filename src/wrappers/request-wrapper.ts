import { Envelop } from '../generated/Generic.js'

export class RequestWrapper {
    public static WrapRegisterCommand(name: string, uri: string, types: { type: string; version: string }[]): Envelop {
        return {
            type: 'Ironyx.ServiceIndex.RegisterCommand',
            version: 'v1',
            payload: JSON.stringify({ name: name, uri: uri, types: types }),
        }
    }

    public static WrapGetRegistrationsQuery(): Envelop {
        return {
            type: 'Ironyx.ServiceIndex.GetRegistrationsQuery',
            version: 'v1',
            payload: JSON.stringify({}),
        }
    }
}
