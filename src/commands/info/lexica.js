const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

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
    const response = await fetch(
      `https://lexica.art/api/v1/search?q=${joinedCategory}`
    );

    const json = await response.json();
    //take a random image from the array

    const post = json.images[Math.floor(Math.random() * json.images.length)];

    const embed = new EmbedBuilder()
      .setTitle(`Image from ${category}`)
      .setImage(post.src)
      .setColor("Random")
      .addFields(
        { name: "Prompt", value: post.prompt },
        { name: "Dimensions", value: `${post.width} x ${post.height}`, inline: true },
        { name: "Seed", value: post.seed, inline: true },
        { name: "Guidance scale", value: `${post.guidance}`, inline: true },
        { name: "Model", value: post.model }
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
