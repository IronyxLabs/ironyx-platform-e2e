import { createClient } from '@connectrpc/connect'
import { createGrpcTransport } from '@connectrpc/connect-node'
import { GenericAPI } from '../generated/Generic_pb.js'
import { Registration } from '../models/registration.js'
import { RequestWrapper } from '../wrappers/request-wrapper.js'
import { Configuration } from '../models/configuration.js'

export class ServiceIndexDriver {
    private _client: any

    public initialize(baseUrl: string) {
        this._client = createClient(GenericAPI, createGrpcTransport({ baseUrl: baseUrl }))
    }

    public async registrateAsnyc(name: string, url: string, types: { type: string; version: string }[]): Promise<void> {
        await this._client.sendAsync(RequestWrapper.WrapRegisterCommand(name, url, types))
    }

    public async getAsync(): Promise<Registration[]> {
        const reply = await this._client.getAsync(RequestWrapper.WrapGetRegistrationsQuery())
        return <Registration[]>JSON.parse(reply.data)
    }

    public async unregistrateAsync(name: string): Promise<void> {
        await this._client.sendAsync(RequestWrapper.WrapUnregisterCommand(name))
  }

    public async getConfigurationAsync(type: string, version: string): Promise<Configuration> {
      const reply = await this._client.getAsync(RequestWrapper.WrapGetConfigurationQuery(type, version));
      return <Configuration>JSON.parse(reply.data)
    }
}
