const { ButtonInteraction, MessageEmbed } = require('discord.js')
const buttons = require('../../handlers/buttons')

module.exports = {
    name: 'interactionCreate',
    /**
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction, client) {
        if (!interaction.isButton()) {
            return
        }

        const Button = client.buttons.get(interaction.customId)

        if (
            buttons.permissions &&
            !interaction.member.permissions.has(Button.permissions)
        ) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed().setDescription(
                        'Non hai il permesso per eseguire questo comando'
                    ),
                ],
                ephemeral: true,
            })
        }

        Button.execute(interaction, client)
    },
}
