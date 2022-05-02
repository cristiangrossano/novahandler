const {
    Client,
    CommandInteraction,
    MessageActionRow,
    MessageButton,
} = require('discord.js')

const emoji = require('../../jsons/emoji.json')

module.exports = {
    name: 'ping',
    description: 'ping del bot',
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: false })

        const row = new MessageActionRow()
        row.addComponents(
            new MessageButton()
                .setCustomId('test')
                .setLabel('Saluto')
                .setStyle('DANGER')
        )

        interaction.editReply({
            content: `${emoji.ping}・Il mio ping è ${client.ws.ping}ms!`,
            components: [row],
        })
    },
}
