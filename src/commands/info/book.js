const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
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
    const query = interaction.options.getString("book");
    if (!query || !query.trim()) {
      return interaction.reply({ content: "Please provide a book title or query.", ephemeral: true });
    }

    try {
      const q = encodeURIComponent(query.trim());
      const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=8&printType=books`);
      const items = res.data.items || [];
      if (items.length === 0) {
        return interaction.reply({ content: "Book not found.", ephemeral: true });
      }

      // Filter out graphic novels / comics by category or title hints
      const nonGraphic = items.filter((it) => {
        const v = it.volumeInfo || {};
        const cats = (v.categories || []).join(" ");
        const title = (v.title || "").toLowerCase();
        // exclude obvious graphic/comic categories or titles
        if (/comic|graphic|manga|illustrated|graphic novel/i.test(cats)) return false;
        if (/comic|graphic|manga|illustrated|graphic novel/i.test(title)) return false;
        return true;
      });

      const candidates = nonGraphic.length > 0 ? nonGraphic : items; // fallback to all if filtering too strict

      // Prefer an item that has richer metadata (image or description)
      let chosen = candidates.find((it) => {
        const v = it.volumeInfo || {};
        return (v.imageLinks && Object.keys(v.imageLinks).length) || (v.description && v.description.length > 50);
      });
      if (!chosen) chosen = candidates[0];

      const info = (chosen && chosen.volumeInfo) || {};
      const title = info.title || "Unknown title";
      const subtitle = info.subtitle ? `: ${info.subtitle}` : "";
      const authors = (info.authors || []).join(", ") || "Unknown author";
      const publisher = info.publisher || "Unknown publisher";
      const publishedDate = info.publishedDate || "Unknown date";
      const pageCount = info.pageCount ? String(info.pageCount) : "N/A";
      const categories = (info.categories || []).join(", ") || "N/A";
      const language = info.language || "N/A";
      const rating = info.averageRating ? `${info.averageRating}/5` : "N/A";
      const ratingsCount = info.ratingsCount ? String(info.ratingsCount) : "0";
      const infoLink = info.previewLink || info.infoLink || null;

      const rawDesc = info.description || "No description available.";
      const description = rawDesc.replace(/<[^>]*>/g, "");
      const shortDesc = description.length > 800 ? description.slice(0, 797) + "..." : description;

      // Choose best image available
      const imgs = info.imageLinks || {};
      const pref = ["extraLarge", "large", "medium", "small", "thumbnail", "smallThumbnail"];
      let image = null;
      for (const p of pref) {
        if (imgs[p]) {
          image = imgs[p];
          break;
        }
      }
      if (!image && imgs.thumbnail) image = imgs.thumbnail;

      const embed = new EmbedBuilder()
        .setTitle(`${title}${subtitle}`)
        .setDescription(shortDesc)
        .setColor("#0b7dda")
        .addFields(
          { name: "Author", value: authors, inline: true },
          { name: "Publisher", value: `${publisher}`, inline: true },
          { name: "Published", value: publishedDate, inline: true },
          { name: "Pages", value: pageCount, inline: true },
          { name: "Categories", value: categories, inline: true },
          { name: "Language", value: language, inline: true },
          { name: "Rating", value: `${rating} (${ratingsCount})`, inline: true }
        )
        .setFooter({ text: "Source: Google Books" })
        .setTimestamp();

      if (image) embed.setImage(image);
      if (imgs.smallThumbnail || imgs.thumbnail) embed.setThumbnail(imgs.smallThumbnail || imgs.thumbnail);
      if (infoLink) embed.setURL(infoLink);

      return interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.error("Book command error:", err.message || err);
      return interaction.reply({ content: "Error fetching book information.", ephemeral: true });
    }
  },
};
