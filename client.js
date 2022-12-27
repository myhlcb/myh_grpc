
const grpc = require('grpc')
const ptotoLoad = require('@grpc/proto-loader')

const packageDefinition = ptotoLoad.loadSync('hello.proto',{
    keepCase:true,
    longs:true,
    enums:true,
    defaults:true,
    oneofs:true
})
const hello_proto =grpc.loadPackageDefinition(packageDefinition).helloWorld;

console.log('init client')
const client = new hello_proto.Hello('127.0.0.1:5555',grpc.credentials.createInsecure())
client.sayHello({name:'张三',age:10},(err,message)=>{
if (err) {
    console.log(`err:${err}`)
}
console.log(message)
})