const { Client, Collection } = require('discord.js')
require('dotenv').config()
const { promisify } = require('util')
const { glob } = require('glob')
const Ascii = require('ascii-table')
const PG = promisify(glob)

const client = new Client({
    intents: 1607,
})

client.commands = new Collection()
client.buttons = new Collection()

const handling = ['events', 'commands', 'buttons'].forEach((handler) => {
    require(`./handlers/${handler}`)(client, PG, Ascii)
})

client.login(process.env.token)
