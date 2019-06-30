import Client from './client/index'

const client = Client
const getData = async ()=>{
    //const aSet1 = await client.set('name1', '张三1');
    //console.log(aSet1)
    //const aGet1 = await client.get('name1')
    //console.log(aGet1)
    //client.del(['name1','name'])
    const a = await client.set('name', 'xibao')
    //console.log(a);
}

getData()