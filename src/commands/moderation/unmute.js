//unmute the user by running this command

const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Unmutes a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to unmute")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.MANAGE_MESSAGES),
  async execute(interaction) {
    const member = interaction.options.getMember("user");
    const role = interaction.guild.roles.cache.find(
      (role) => role.name === "Muted"
    );
    member.roles.remove(role);
    interaction.reply({
      content: `${member} has been unmuted`,
      ephemeral: true,
    });
  },
};
