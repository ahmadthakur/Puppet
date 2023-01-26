//unlock a channel

const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unlock")
    .setDescription("Unlocks a channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.MANAGE_CHANNELS),
  async execute(interaction) {
    const role = interaction.guild.roles.cache.find(
      (role) => role.name === "Members"
    );
    await interaction.channel.permissionOverwrites.edit(role, {
      SendMessages: true,
    });
    interaction.reply({
      content: `Unlocked ${interaction.channel}`,
      ephemeral: true,
    });
  },
};
