const colors = require("colors");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;
      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(
          colors.red(
            `[Command Handler]; No command found with name "${interaction.commandName}", ${error}`
          )
        );
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const button = interaction.client.buttons.get(interaction.customId);
      console.log(button);
      if (!button) return;
      try {
        await button.execute(interaction);
      } catch (error) {
        console.error(
          colors.red(
            `[Button Handler]; No button found with name "${interaction.customId}", ${error}`
          )
        );
        await interaction.reply({
          content: "There was an error while executing this button!",
          ephemeral: true,
        });
      }
    }
  },
};
