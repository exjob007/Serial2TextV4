const Json_data = require('./Serial.config.json')
const SerialPort = require('serialport')
const FuncDate = require('./Components/Redate.js')
const saveReport = require('./Components/saveReport.js')
var cmd = require('node-cmd')
var fs = require('fs')
var JFile = require('jfile')

//var grep = require('simple-grep')

var checkTimeOut = 1

Json_data.map((data) => {
    datareturn(data)
})


function datareturn(COM){
    COM.Serial = new SerialPort(COM.COM, {
        baudRate: COM.baudRate,
        parser: new SerialPort.parsers.Readline("\n")
    })

    COM.Serial.on('open', ()=>{
        console.log('PORT OPEN : ')
    })
    if(checkTimeOut == 1)
    {
        COM.Serial.on('data', (data)=>{
            //console.log(data.toString() + " >> "+ COM.COM)
            console.log(COM.COM + " <<  " + COM.Filename)
            fs.appendFile('./'+COM.Filename, data.toString(), (err) =>{
                if(err){console.log(err)}
            })
            checkTimeOut = 0
            setTimeout(()=>{
                exitloop()
            },20000)

        })
    }
}


var exitloop = () =>{
    if(checkTimeOut == 0){
        
        //checkTimeOut = 1
        console.log('exit') 
        let file = require('./Serial.config.json')
        let data = file.map((item)=>{
            cmd.get('find '+ item.Filename, (err,data,stdeer)=>{
                if(err){console.log('')}
                if(data){
                    console.log(`Foundfile : ${data}`)
                    GetData(data.trim())
                }
            })
        
        })
        
    }
}  // 3 2 1
//const check = (type) => { return (type) ? console.log(`${type} has`) : console.log(`${type} not have`) }
const check = (value) =>{
    if((value.length) || !value.length == 0){
        return true
    }
    else{
        return false
    }
}

var GetData = (name) => {
    // Find 
    let txtFile = new JFile(`./${name}`)
    let Printed = txtFile.grep('Printed at ')
    let tagName = txtFile.grep('Tag No.:')
    let Current = txtFile.grep('Current Billing Report')
    let Month = txtFile.grep('Monthly Billing Report')
    let Daily = txtFile.grep('Daily Billing Report')
    // ====> SetValue
    // console.log(FuncDate.redate(Printed))
    
    //let redate = FuncDate.redate(Printed)
    //let tagName = FuncDate.getname(tagName)
    /*
    let txtFile = new JFile(`./COM2.txt`)
    let Printed = txtFile.grep('Printed at ')
    let tagName = txtFile.grep('Tag No.:')
    let Current = txtFile.grep('Current Billing Report')
    let Month = txtFile.grep('Monthly Billing Report')
    let Daily = txtFile.grep('Daily Billing Report')
    */
    //let time = Printed[0].split('Printed at : ')[1].split(' ')[1]
    let time = FuncDate.getTime(Printed)
    let redate = FuncDate.redate(Printed)
    let reName = FuncDate.getname(tagName)
    // ==>Find DailyReport (Printed at and Word Daily and Word Month and Current)
    if((check(Printed)) && (check(Daily)) && (!check(Month)) && (!check(Current))){
        saveReport.DailyReport(redate,reName, name)
        checkTimeOut = 1
    }
    // ==>Find DailyReport (Printed at and Word Daily and Word Month and Current)
    else if((check(Printed)) && (check(Daily)) && (check(Month)) && (!check(Current))){
        saveReport.MonthlyReport(redate,reName, name)
        checkTimeOut = 1
    }
    // ==>Find CurrentReport (Current Only)
    else if((check(Current))){
        saveReport.CurrentReport(redate, reName, name, time)
        checkTimeOut = 1

    }

    //checkTimeOut = 0

    



}
/*
let txtFile = new JFile(`./COM2.txt`)
let Printed = txtFile.grep('Printed at ')
let tagName = txtFile.grep('Tag No.:')
let Current = txtFile.grep('Current Billing Report')
let Month = txtFile.grep('Monthly Billing Report')
let Daily = txtFile.grep('Daily Billing Report')
let time = Printed[0].split('Printed at : ')[1].split(' ')[1]

let redate = FuncDate.redate(Printed)
let reName = FuncDate.getname(tagName)
// ==>Find DailyReport (Printed at and Word Daily and Word Month and Current)
if((check(Printed)) && (check(Daily)) && (!check(Month)) && (!check(Current))){
    saveReport.DailyReport(redate,reName, 'COM1.txt')
}
// ==>Find DailyReport (Printed at and Word Daily and Word Month and Current)
else if((check(Printed)) && (check(Daily)) && (check(Month)) && (!check(Current))){
    saveReport.MonthlyReport(redate,reName, 'COM2.txt')
}
// ==>Find CurrentReport (Current Only)
else if((check(Current))){
    saveReport.CurrentReport(redate, reName, name, time)

}
*/





