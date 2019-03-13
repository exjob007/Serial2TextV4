const SerialPort = require('serialport')
const Json_data = require('./Serial.config.json')

Json_data.map((data) => {
    datareturn(data)
})

function datareturn(COM){
    COM.Serial.close((err)=>{
        console.log('CLOSE : ')
    })
}


