//locks a channel

const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Locks a channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction) {
    const role = interaction.guild.roles.cache.find(
      (role) => role.name === "Members"
    );
    await interaction.channel.permissionOverwrites.create(role, {
      SendMessages: true,
    });
    interaction.reply({
      content: `Locked ${interaction.channel}`,
      ephemeral: true,
    });
  },
};
