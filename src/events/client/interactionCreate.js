// Description: This event will run when a user interacts with a button or a slash command.
// Requirements: colors
const colors = require("colors");

// Export the event
module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    // If the interaction is a slash command
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;
      try {
        await command.execute(interaction, client);
        console.log(
          colors.blue(
            `[Command Handler]; Command "${interaction.commandName}" executed by ${interaction.user.tag}`
          )
        );
      } catch (error) {
        console.error(
          colors.red(
            `[Command Handler]; No command found with name "${interaction.commandName}", ${error}`
          )
        );
        // Send an ephemeral message to the user
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
      // If the interaction is a button
    } else if (interaction.isButton()) {
      const button = interaction.client.buttons.get(interaction.customId);
      console.log(button);
      if (!button) return;
      try {
        await button.execute(interaction);
        console.log(
          colors.blue(
            `[Button Handler]; Button "${interaction.customId}" executed by ${interaction.user.tag}`
          )
        );
      } catch (error) {
        console.error(
          colors.red(
            `[Button Handler]; No button found with name "${interaction.customId}", ${error}`
          )
        );
        // Send an ephemeral message to the user
        await interaction.reply({
          content: "There was an error while executing this button!",
          ephemeral: true,
        });
      }
    }
  },
};
