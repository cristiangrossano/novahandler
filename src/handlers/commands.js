/* eslint-disable no-shadow */
const { Perms } = require('../validation/permissions')

module.exports = async (client, PG, Ascii) => {
    const Table = new Ascii('Comandi Caricati')

    let CommandsArray = []

    const ricercaComandi = (await PG(`${process.cwd()}/commands/*/*.js`)).map(
        async (file) => {
            const command = require(file)

            if (!command.name) {
                return Table.addRow(
                    file.split('/')[7],
                    `⛔ FALLITO`,
                    `Nome mancante`
                )
            }

            if (!command.description) {
                return Table.addRow(
                    command.name,
                    `⛔ FALLITO`,
                    `Descrizione mancante`
                )
            }

            client.commands.set(command.name, command)
            CommandsArray.push(command)

            await Table.addRow(command.name, ' ✔️ Caricato con successo')
        }
    )

    console.log(Table.toString())

    //* Controllo permessi

    client.on('ready', async () => {
        const { idServer } = require('../jsons/config.json')
        const { caricaGlobale } = require('../jsons/config.json')

        if (caricaGlobale === true) {
            await client.application.commands.set(CommandsArray)
        }

        if (caricaGlobale === false) {
            await client.guilds.cache.get(idServer).commands.set(CommandsArray)
        }
    })
}
