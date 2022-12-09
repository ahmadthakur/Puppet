const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription(
      "Get the avatar URL of the selected user, or your own avatar."
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user's avatar to show")
        .setRequired(false)
    ),
  async execute(interaction) {
    //display of the mentioned user's avatar
    const user = interaction.options.getUser("user");
    if (user) {
      const avatarEmbed = new EmbedBuilder()
        .setTitle(`${user.username}'s Avatar`)
        .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setColor("Random");
      return interaction.reply({ embeds: [avatarEmbed] });
    }
    //display of the author's avatar
    const avatarEmbed = new EmbedBuilder()
      .setTitle(`Your Avatar`)
      .setImage(interaction.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setColor("Random");
    interaction.reply({ embeds: [avatarEmbed] });
  },
};
