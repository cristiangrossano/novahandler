const { Client } = require('discord.js')
const mongoose = require('mongoose')

module.exports = {
    name: 'ready',
    /**
     *
     * @param {Client} client
     */
    execute(client) {
        console.log(`${client.user.tag} è online!`)

        const { mongooseConnectionString } = require('../../jsons/config.json')
        if (!mongooseConnectionString) return

        mongoose
            .connect(mongooseConnectionString)
            .then(() => console.log(`Connesso al database!`))
    },
}
