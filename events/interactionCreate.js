module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      console.error(
          `[Command Handler]; No command found with name "${interaction.commandName}"`
      );
      return;
    }
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
    }
  },
};
