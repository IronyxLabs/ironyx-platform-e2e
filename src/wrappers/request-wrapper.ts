import { Envelop } from '../generated/Generic.js'

export class RequestWrapper {
    public static WrapRegisterCommand(name: string, uri: string, type: string, version: string): Envelop {
        return {
            type: 'Ironyx.ServiceIndex.RegisterCommand',
            version: 'v1',
            payload: JSON.stringify({ Name: name, Uri: uri, Types: [{ Type: type, Version: version }] }),
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
