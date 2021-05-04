const db = require("quick.db")
const config = require('../config.json')
const mongoose = require('mongoose')

module.exports.run = (client) => {
    console.log(`Developer: ${config.developer}
Bot:       ${client.user.username}
Commands:  ${config.commands}
Version:   ${config.version}
Guilds:    ${client.guilds.cache.size}
Users:     ${client.users.cache.size}
Libary:    Discord.js
                   `)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    
}).then(console.log('Mongo DB Connected!'))


client.user.setActivity(db.get(`status`)); 
};
