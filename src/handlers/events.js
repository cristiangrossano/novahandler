const { Events } = require('../validation/eventName')

module.exports = async (client, PG, Ascii) => {
    
    const Table = new Ascii('Eventi Caricati')

    const ricercaFile = (await PG(`${process.cwd()}/events/*/*.js`)).map(
        async (file) => {
            const event = require(file)

            if (!Events.includes(event.name) || !event.name) {
                const L = file.split('/')
                await Table.addRow(
                    `${event.name || 'Mancante'}`,
                    `⛔ Nome dell'evento non valido o mancante: ${
                        L[6] + `/` + L[7]
                    }`
                )
                return
            }

            if (event.once) {
                client.once(event.name, (...args) =>
                    event.execute(...args, client)
                )
            } else {
                client.on(event.name, (...args) =>
                    event.execute(...args, client)
                )
            }

            await Table.addRow(event.name, ' ✔️ Caricato con successo')
        }
    )
    console.log(Table.toString())
}
