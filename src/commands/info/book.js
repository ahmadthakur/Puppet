const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const libgen = require("libgenesis");

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
    await interaction.deferReply();
    const book = interaction.options.getString("book");
    const joinedBook = book.split(" ").join("%20");

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${joinedBook}`
    );
    const data = await response.json();
    const title = data.items[0].volumeInfo.title;
    const author = data.items[0].volumeInfo.authors[0];
    const description = data.items[0].volumeInfo.description;

    let downloadLink = libgen(title)
      .then(function (books) {
        
        const book = books[0].download.replace(/\s+/g, "%20");
        const bookUrl = book.trim();

        console.log(bookUrl);

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setURL(bookUrl)
            .setLabel("Epub")
            .setStyle(ButtonStyle.Link)
        );

        const embed = new EmbedBuilder()
          .setTitle(`${title}`)
          .setImage(data.items[0].volumeInfo.imageLinks.thumbnail)
          .setDescription(`${description}`)
          .addFields(
            { name: "Author", value: author, inline: true },
            {
              name: "Rating",
              value: `${data.items[0].volumeInfo.averageRating}`,
              inline: true,
            },
            {
              name: "Category",
              value: data.items[0].volumeInfo.categories[0],
              inline: true,
            }
          )
          .setColor("Random")
          .setTimestamp();

        interaction.editReply({ embeds: [embed], components: [row] });
      })
      .catch(function (err) {
        console.log(err);
      });
  },
};
