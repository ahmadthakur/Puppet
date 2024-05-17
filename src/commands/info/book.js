const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { default: axios } = require("axios");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("book")
    .setDescription("Responds with information of a book.")
    .addStringOption((option) =>
      option
        .setName("book")
        .setDescription("The book you want to get information of.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const book = interaction.options.getString("book");
    const joinedBook = book.split(" ").join("-");

    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${joinedBook}`)
      .then(async (response) => {
        const data = response.data.items[1].volumeInfo;
        console.log(data);
        const title = data.title;
        const authors = data.authors;
        const description = data.description;
        const pageCount = data.pageCount;
        const categories = data.categories;
        const rating = data.averageRating;
        const embed = new EmbedBuilder()
          .setTitle(`${title}`)
          .setImage(data.imageLinks.thumbnail)
          .setDescription(`${description}`)
          .addFields(
            { name: "Authors", value: `${authors}`, inline: true },
            { name: "Page Count", value: `${pageCount}`, inline: true },
            { name: "Rating", value: `${rating}`, inline: true },
            {
              name: "Categories",
              value: `${categories}`,
            }
          );
        console.log(embed);
        interaction.reply({ embeds: [embed] });
      })
      .catch((error) => {
        console.log(error);
        interaction.reply({
          content: "Book not found.",
          ephemeral: true,
        });
      });
  },
};
