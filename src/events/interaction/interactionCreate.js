const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) {
        const azione1 = interaction.reply({
          embeds: [
            new MessageEmbed()
              .setColor("RED")
              .setDescription("è stato riscontrato un errore"),
          ],
        });
        const azione2 = client.commands.delete(interaction.commandName);

        return azione1 && azione2;
      }
      command.execute(interaction, client);
    }
  },
};
