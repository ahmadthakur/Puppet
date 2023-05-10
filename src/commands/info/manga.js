const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { default: axios } = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("manga")
    .setDescription("Responds with information of a manga.")
    .addStringOption((option) =>
      option
        .setName("manga")
        .setDescription("The manga you want to get information of.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const manga = interaction.options.getString("manga");
    const joinedManga = manga.split(" ").join("%20");

    axios
      .get(`https://api.jikan.moe/v4/manga?q=${joinedManga}`)
      .then(async (response) => {
        const data = response.data;
        const title = data.data[0].title;
        const synopsis = data.data[0].synopsis;
        const chapters = data.data[0].chapters;
        const score = data.data[0].score;
        const status = data.data[0].status;
        const type = data.data[0].type;
        const url = data.data[0].url;
        const embed = new EmbedBuilder()
          .setTitle(`${title}`)
          .setImage(data.data[0].images.jpg.image_url)
          .setDescription(`${synopsis}`)
          .addFields(
            {
              name: "Chapters",
              value: `${chapters}`,
              inline: true,
            },
            { name: "Score", value: `${score}`, inline: true },
            { name: "Status", value: status, inline: true },
            { name: "Type", value: type },
            {
              name: "Genres",
              value: data.data[0].genres.map((genre) => genre.name).join(", "),
            },
            { name: "URL", value: url }
          );
        interaction.reply({ embeds: [embed] });
      })
      .catch((error) => {
        interaction.reply({
          content: "Manga not found.",
          ephemeral: true,
        });
      });
  },
};
