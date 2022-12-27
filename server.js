
const grpc = require('grpc')
const protoLoad = require('@grpc/proto-loader')

const packageDefinition = protoLoad.loadSync('hello.proto',{
    keepCase:true,
    longs:true,
    enums:true,
    defaults:true,
    oneofs:true
})
const hello_proto =grpc.loadPackageDefinition(packageDefinition).helloWorld;
const server = new grpc.Server();
server.addService(hello_proto.Hello.service,{
    sayHello:(call,callback)=>{
        let {name,age } = call.request
        callback && callback(null,{message:`我叫${name},年龄:${age}`})}
})
server.bindAsync('127.0.0.1:5555',grpc.ServerCredentials.createInsecure(),()=>{
    server.start()
})