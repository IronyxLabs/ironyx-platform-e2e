import { createClient } from '@connectrpc/connect'
import { createGrpcTransport } from '@connectrpc/connect-node'
import { strict as assert } from 'node:assert'
import { GenericAPI, Reply } from '../generated/Generic_pb.js'
import { Registration } from '../models/registration.js'
import { RequestWrapper } from '../wrappers/request-wrapper.js'

export class ServiceIndexDriver {
    private static _client: any

    public static initialize(baseUrl: string) {
        this._client = createClient(GenericAPI, createGrpcTransport({ baseUrl: baseUrl }))
    }

    public static async registrateAsnyc(name: string, url: string, types: { type: string; version: string }[]): Promise<Reply> {
        const reply = await this._client.sendAsync(RequestWrapper.WrapRegisterCommand(name, url, types))

        assert.equal(reply.status, 'ACCEPTED')

        return reply
    }

    public static async getAsync(): Promise<Registration[]> {
        const reply = await this._client.getAsync(RequestWrapper.WrapGetRegistrationsQuery())

        assert.equal(reply.status, 'OK')

        return <Registration[]>JSON.parse(reply.data)
    }
}
