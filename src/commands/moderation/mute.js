//make a mute command that mutes the user for a certain time

const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mutes a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to mute")
        .setRequired(true)
    )

    .addStringOption((option) =>
      option
        .setName("time")
        .setDescription("The time to mute the user for in minutes")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.MANAGE_MESSAGES),
  async execute(interaction) {
    const member = interaction.options.getMember("user");
    const time = interaction.options.getString("time");
    const role = interaction.guild.roles.cache.find(
      (role) => role.name === "Muted"
    );
    member.roles.add(role);
    interaction.reply({
      content: `${member} has been muted for ${time} minutes`,
      ephemeral: true,
    });
    setTimeout(() => {
      member.roles.remove(role);
    }, time * 60 * 1000);
  },
};
