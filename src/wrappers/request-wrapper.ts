import { Envelop } from '../generated/Generic.js'

export class RequestWrapper {
    public static WrapRegisterCommand(name: string, uri: string, type: string, version: string): Envelop {
        return {
            type: 'Ironyx.ServiceIndex.RegisterCommand',
            version: 'v1',
            payload: JSON.stringify({ name: name, uri: uri, types: [{ type: type, version: version }] }),
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
