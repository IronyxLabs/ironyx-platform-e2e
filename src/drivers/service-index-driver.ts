import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node"
import { GenericAPI, Reply } from "../generated/Generic_pb";

export class ServiceIndexDriver 
{
    private _transport = createConnectTransport({ baseUrl: "http://localhost:57400", httpVersion: '2' })
    private _client = createClient(GenericAPI, this._transport);

    public registrate(name: string): Promise<Reply> {
        return this._client.sendAsync({
            type: "ServiceIndex.Registrate",
            version: "v1",
            payload: '{ name: \"Test\" } '
        });
    }
}