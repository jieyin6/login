const mongoose = require('mongoose')

const database = 'mongodb://localhost/loginUsers'

exports.connect = () => {
    let maxConnectTimes = 0
    mongoose.connect(database)
    mongoose.connection.once('open', () => {
        console.log('连接成功')
        maxConnectTimes = 0
    })
    mongoose.connection.on('disconnected', (err) => {
        console.log('数据库断开')
        if(maxConnectTimes <= 3) {
            maxConnectTimes++
            mongoose.connect(database)
        }else{
            throw new Error('数据库出现问题')
        }
    })
    mongoose.connection.on('error', (err) => {
        console.log('数据库断开')
        if(maxConnectTimes <= 3) {
            maxConnectTimes++
            mongoose.connect(database)
        }else{
            throw new Error('数据库出现问题')
        }
    })
}