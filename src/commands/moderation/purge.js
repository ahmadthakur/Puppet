const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Deletes messages.")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of messages to delete.")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");
    if (amount <= 1 || amount > 100) {
      return interaction.reply({
        content: "You need to input a number between 1 and 99.",
        ephemeral: true,
      });
    }
    await interaction.channel.bulkDelete(amount, true).catch((err) => {
      console.error(err);
      interaction.channel.send(
        "There was an error trying to purge messages in this channel!"
      );
    });
    await interaction.reply({
      content: `Deleted ${amount} messages.`,
      ephemeral: true,
    });
  },
};
