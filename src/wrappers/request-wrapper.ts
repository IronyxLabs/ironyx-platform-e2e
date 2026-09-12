import { Envelop } from '../generated/Generic_pb.js'

export class RequestWrapper {
    public static WrapRegisterCommand(name: string, uri: string, types: { type: string; version: string }[]): Envelop {
      return {
          $typeName: 'Envelop',
            type: 'Ironyx.ServiceIndex.RegisterCommand',
            version: 'v1',
            payload: JSON.stringify({ name: name, uri: uri, types: types }),
        }
    }

    public static WrapGetRegistrationsQuery(): Envelop {
        return {
          $typeName: 'Envelop',
            type: 'Ironyx.ServiceIndex.GetRegistrationsQuery',
            version: 'v1',
            payload: JSON.stringify({}),
        }
    }
}
