const { SlashCommandBuilder, userMention } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wave")
    .setDescription("Responds with waving gif.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to wave to")
        .setRequired(true)
    ),
  async execute(interaction) {
    const response = await fetch(
      `https://tenor.googleapis.com/v2/search?q=anime-wave-gifs&key=${process.env.TENOR_API_KEY}&client_key=${process.env.TENOR_CLIENT_KEY}&limit=10`
    );
    const json = await response.json();
    const post = json.results[Math.floor(Math.random() * json.results.length)];

    const embed = new EmbedBuilder()
      .setTitle(
        `${interaction.user.username} waves to ${
          interaction.options.getUser("user").username
        }`
      )
      .setImage(post.media_formats.gif.url)
      .setColor("Random");
    interaction.reply({ embeds: [embed] });
  },
};
