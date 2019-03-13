module.exports.redate = (dataDate) => {
    
        let date = dataDate[0].split('Printed at : ')
        date = date[1]
        date = date.split(' ')
        date = date[0].split('/')
        date = `${date[2]}/${date[1]}/${date[0]}`
        return date
    
}

module.exports.getname = (data) => {
     
        let reName = data[0].split("Tag No.: ")
        reName = reName[1]
        return reName.trim()  
}

module.exports.getTime = (Printed) =>{
        let time = Printed[0].split('Printed at : ')[1].split(' ')[1]
        
        return time
    
}
