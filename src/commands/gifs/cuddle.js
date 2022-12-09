const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cuddle")
    .setDescription("Cuddle someone!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to cuddle")
        .setRequired(true)
    ),
  async execute(interaction) {
    const response = await fetch(
      `https://tenor.googleapis.com/v2/search?q=anime-cuddle-gifs&key=${process.env.TENOR_API_KEY}&client_key=${process.env.TENOR_CLIENT_KEY}&limit=10`
    );
    const json = await response.json();
    const post = json.results[Math.floor(Math.random() * json.results.length)];

    const embed = new EmbedBuilder()
      .setTitle(
        `${interaction.user.username} cuddles ${
          interaction.options.getUser("user").username
        }`
      )
      .setImage(post.media_formats.gif.url)
      .setColor("Random");
    interaction.reply({ embeds: [embed] });
  },
};
