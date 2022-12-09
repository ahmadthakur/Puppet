const { SlashCommandBuilder, userMention, Guild } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Responds with server info embed.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("server")
        .setDescription("Responds with server info embed.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("user")
        .setDescription("Responds with user info embed.")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("The user's info you want")
            .setRequired(true)
        )
    ),

  execute(interaction) {
    switch (interaction.options.getSubcommand()) {
      case "server":
        const { guild } = interaction;
        const icon = guild.iconURL();
        const name = guild.name;
        const memberCount = guild.memberCount;

        const embed = new EmbedBuilder()
          .setTitle(`Server info for "${name}"`)
          .setThumbnail(icon)
          .addFields(
            {
              name: "Region",
              value: `Pakistan`,
            },
            {
              name: "Members",
              value: `${memberCount}`,
            },
            { name: "Invite Link", value: `https://discord.gg/tJN48sJZGU` }
          )
          .setTimestamp()
          .setColor("Random")
          .setFooter({ text: `Server ID: "${guild.id}"` })
          .setTimestamp();

        interaction.reply({ embeds: [embed] });
        break;
      case "user":
        const user = interaction.options.getUser("target");
        const member = interaction.guild.members.cache.get(user.id);
        const embed2 = new EmbedBuilder()
          .setTitle(`User info for "${user.username}"`)
          .setDescription(`This is the user's info`)
          .setColor("Random")
          .setTimestamp()
          .addFields(
            {
              name: "Full Username",
              value: `${user.username}#${user.discriminator}`,
            },
            { name: "ID", value: `${user.id}` },
            { name: "Nickname", value: `${member.nickname}` || "None" },
            { name: "Created At", value: `${user.createdAt}` },
            { name: "Joined At", value: `${member.joinedAt}` }
          )
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setTimestamp();
        interaction.reply({ embeds: [embed2] });
        break;
    }
  },
};
