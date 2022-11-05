const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription(
      "Provides information about the user you tagged in an embed"
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to spank")
        .setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const member = interaction.guild.members.cache.get(user.id);
    const embed = new EmbedBuilder()
      .setTitle(`User info for "${user.username}"`)
      .setDescription(`This is the user's info`)
      //.setAuthor(`${interaction.user.username}`)
      //.setFooter("This is a footer")
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
    interaction.reply({ embeds: [embed] });
  },
};
