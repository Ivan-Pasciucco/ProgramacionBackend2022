process.send('start')
process.on('message',(cant)=>{
    process.send(generarRandom(cant))
})

function generarRandom(cantidad){

    const cantParsed = parseInt(cantidad)
    let cant = 0
    const nums = []
    const objNum = {}

    if(isNaN(cantParsed)){
        cant = 100000000
    }else{
        cant = cantParsed
    }

    for (let i = 0; i < cant; i++) {
        let num = Math.floor(Math.random() * (1001 - 1)+1)
        nums.push(num)
        objNum[num] ? objNum[num]++ : objNum[num] = 1
    }
    return objNum
}