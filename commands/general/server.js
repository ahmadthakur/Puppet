const { SlashCommandBuilder, userMention, Guild } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Responds with server info embed."),

  execute(interaction) {
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
        // {
        //   name: "Owner",
        //   value: owner.user.username,
        // }
      )
      .setTimestamp()
      .setColor('Random')
      .setFooter({text: `Server ID: "${guild.id}"`})
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  },
};
