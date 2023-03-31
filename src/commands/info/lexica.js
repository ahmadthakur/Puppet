const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lexica")
    .setDescription("Responds with a random image from Lexica.")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The category of the image you want to get.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const category = interaction.options.getString("category");
    const joinedCategory = category.split(" ").join("%20");

    axios
      .get(`https://lexica.art/api/v1/search?q=${joinedCategory}`)
      .then((response) => {
        const data = response.data;
        const post =
          data.images[Math.floor(Math.random() * data.images.length)];

        const embed = new EmbedBuilder()
          .setTitle(`Image from ${category}`)
          .setImage(post.src)
          .setColor("Random")
          .addFields(
            { name: "Prompt", value: post.prompt },
            {
              name: "Dimensions",
              value: `${post.width} x ${post.height}`,
              inline: true,
            },
            { name: "Seed", value: post.seed, inline: true },
            { name: "Guidance scale", value: `${post.guidance}`, inline: true },
            { name: "Model", value: post.model }
          )
          .setTimestamp();
        interaction.reply({ embeds: [embed] });
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
