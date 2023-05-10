const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { default: axios } = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("anime")
    .setDescription("Responds with information of an anime.")
    .addStringOption((option) =>
      option
        .setName("anime")
        .setDescription("The anime you want to get information of.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const anime = interaction.options.getString("anime");
    const joinedAnime = anime.split(" ").join("%20");

    axios
      .get(`https://api.jikan.moe/v4/anime?q=${joinedAnime}`)
      .then(async (response) => {
        const data = response.data;
        const title = data.data[0].title;
        const synopsis = data.data[0].synopsis;
        const episodes = data.data[0].episodes;
        const score = data.data[0].score;
        const status = data.data[0].status;
        const type = data.data[0].type;
        const url = data.data[0].url;
        const embed = new EmbedBuilder()
          .setTitle(`${title}`)
          .setImage(data.data[0].images.jpg.image_url)
          .setDescription(`${synopsis}`)
          .addFields(
            { name: "Episodes", value: `${episodes}`, inline: true },
            { name: "Score", value: `${score}`, inline: true },
            { name: "Status", value: status, inline: true },
            { name: "Type", value: type },
            {
              name: "Genres",
              value: data.data[0].genres.map((genre) => genre.name).join(", "),
            },
            { name: "URL", value: url }
          );
        await interaction.reply({ embeds: [embed] });
      })
      .catch((error) => {
        interaction.reply({
          content: "Anime not found.",
          ephemeral: true,
        });
      });
  },
};
