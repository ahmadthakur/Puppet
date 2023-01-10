const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const libgen = require("libgenesis");
const GoodReadsParser = require("goodreads-parser");

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
    // const joinedBook = book.split(" ").join("%20");

    const response = await GoodReadsParser.searchBooks({ q: book });
    console.log(response.books[0]);
    const bookData = response.books[0];

    const title = bookData.title;
    const author = bookData.author;

    const goodreadsURL = bookData.url;
    const bookTitle = bookData.title;
    const rating = bookData.rating;
    const moreBookData = await GoodReadsParser.getBook({ url: goodreadsURL });
    console.log(moreBookData);
    const description = moreBookData.description;
    const genre1 = moreBookData.genres[0];
    const genre2 = moreBookData.genres[1];
    const genre3 = moreBookData.genres[2];
    const cover = moreBookData.coverLarge;

    const embed = new EmbedBuilder()
      .setTitle(`${bookTitle}`)
      .setImage(cover)
      .setDescription(`${description}`)
      .addFields(
        { name: "Author", value: `${author}`, inline: true },
        {
          name: "Rating",
          value: `${rating}`,
          inline: true,
        },
        {
          name: "Category",
          value: `${genre1}, ${genre2}, ${genre3}`,
          inline: true,
        }
      )
      .setColor("Random")
      .setTimestamp();

    libgen(title)
      .then(function (books) {
        console.log(books)
        const book = books[0].download;
        const bookUrl = book.replace(/\s+/g, "%20");

        console.log(bookUrl);

        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setURL(bookUrl)
              .setLabel("🔽 Download")
              .setStyle(ButtonStyle.Link)
          )
          .addComponents(
            new ButtonBuilder()
              .setURL(goodreadsURL)
              .setLabel("Goodreads")
              .setStyle(ButtonStyle.Link)
          );

        interaction.editReply({ embeds: [embed], components: [row] });
      })
      .catch(function (err) {
        console.log(err);
        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setURL(goodreadsURL)
            .setLabel("Goodreads")
            .setStyle(ButtonStyle.Link)
        );

        interaction.editReply({ embeds: [embed], components: [row] });
      });
  },
};
