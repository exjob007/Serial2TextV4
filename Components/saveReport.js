var cmd = require('node-cmd')
var fs = require('fs')
// Module DailyReport
module.exports.DailyReport = (...arg) => {
    let path = `/home/FileSystem/${arg[0]}/${arg[1]}/`
    cmd.get(`mkdir -p ${path};cp ./${arg[2]} ${path}/DailyReport.txt`, (err,data,stdeer) => {
        if(err) {console.log(err)}
    })
    //console.log('successfully')
    end(arg[2])
}

// Module MonthlyReport
module .exports.MonthlyReport = (...arg) =>{
    try {
        let path = `/home/FileSystem/${arg[0]}/${arg[1]}/`
        fs.readFile(`/home/pi/SCRIPT/IBR/SerialToText2/${arg[2]}`, (err,data) =>{
        if(err) {console.log(err)}
        let result = data.toString()
        let Monthly = result.split('END OF REPORT')[1]
        let Normal = result.split('END OF REPORT')[0]
        cmd.get(`mkdir -p ${path}`, (err,data,stdeer)=>{
            if(err) {console.log(err)}
        })
        
        var createFile = fs.createWriteStream(`${path}MonthlyReport.txt`)
        createFile.write(Monthly)
        createFile.end()
        
            setTimeout(()=>{
            var createFile = fs.createWriteStream(`${path}DailyReport.txt`)
            createFile.write(Normal)
            createFile.end()
            }, 5000)
        
        })
        
    } catch (error) {
        console.log(error)

    }

    console.log('successfully')
    end(arg[2])
    
}
// Module CurrentReport
module.exports.CurrentReport = (...arg) => {
    let path = `/home/FileSystem/${arg[0]}/${arg[1]}/`
    let name = arg[3].replace(/(\r\n|\n|\r)/gm, "")
    
    cmd.get(`mkdir -p ${path};cp ./${arg[2]} ${path}/Current_${arg[3]}.txt;rm ${arg[2]}`, (err,data,stdeer) =>{
        if(err) {console.log(err)}

    })
    //console.log('successfully')
    end(arg[2])
}

//Module Temp dump
module.exports.TempReport = (...arg) =>{
    //date "+%Y/%m/%d_%H:%M:%S.txt"
    /*cmd.get(`date "+/%Y/%m/%d_%H:%M:%S.txt"`, (err,data,stdeer)=>{
        
    })*/
    function MonthDay(num){
        if(num<10){
            return `0${num}`
        }
        else{
            return num
        }
    }

    var date = new Date()
    let path = `home/FileSystem/${date.getFullYear()}/${MonthDay(date.getMonth())}/${MonthDay(date.getDate())}/`
    let name = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.txt`
    cmd.get(`mkdir -p ${path};cp ./${arg[0]} ${path}${name}`, (err,data, stdeer)=>{
        if(err){console.log(err)}
    })

    end(arg[0])
    


    
}

var end = (filename) => {
    setTimeout(()=>{
        cmd.get(`rm ${filename};tree /home/FileSystem`, (err,data,stdeer)=>{
            if(err) {console.log(err)}
        })
        console.log('successfully Read : ')
        process.exit()
    }, 7000)

    
}
