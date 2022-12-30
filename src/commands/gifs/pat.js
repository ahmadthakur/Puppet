const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pat")
    .setDescription("Responds with a patting gif.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to pet")
        .setRequired(true)
    ),
  async execute(interaction) {
    const response = await fetch(
      `https://tenor.googleapis.com/v2/search?q=anime-pat-gifs&key=${process.env.TENOR_API_KEY}&client_key=${process.env.TENOR_CLIENT_KEY}&limit=10`
    );
    const json = await response.json();
    const post = json.results[Math.floor(Math.random() * json.results.length)];

    const embed = new EmbedBuilder()
      .setImage(post.media_formats.gif.url)
      .setColor("Random");
    interaction.reply({
      content: `<@${interaction.user.id}> pats <@${
        interaction.options.getUser("user").id
      }>`,
      embeds: [embed],
    });
  },
};
