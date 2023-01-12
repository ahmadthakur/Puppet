//locks a channel

const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Locks a channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.MANAGE_CHANNELS),
  async execute(interaction) {
    const role = interaction.guild.roles.everyone;
    await interaction.channel.permissionOverwrites.edit(role, {
      SEND_MESSAGES: false,
    });
    interaction.reply({
      content: `Locked ${interaction.channel}`,
      ephemeral: true,
    });
  },
};
