For generating ts types out of .proto files execute the following command:
```bash
protoc `
>>   --plugin="protoc-gen-es=.\node_modules\.bin\protoc-gen-es.cmd" `
>>   --es_out=. `
>>   --es_opt=target=ts `
>>   --proto_path="E:\ironyx\ironyx-kernel\src\Ironyx.Kernel\Endpoint" `
>>   "E:\ironyx\ironyx-kernel\src\Ironyx.Kernel\Endpoint\Generic.proto"
```
