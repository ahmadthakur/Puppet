const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("manga")
    .setDescription("Responds with information about a manga.")
    .addStringOption((option) =>
      option.setName("manga").setDescription("Manga title or query").setRequired(true)
    ),

  async execute(interaction) {
    const query = interaction.options.getString("manga");
    if (!query || !query.trim()) {
      return interaction.reply({ content: "Please provide a manga title or query.", ephemeral: true });
    }

    try {
      const q = encodeURIComponent(query.trim());
      const res = await axios.get(`https://api.jikan.moe/v4/manga?q=${q}&limit=6`);
      const items = res.data.data || [];
      if (items.length === 0) {
        return interaction.reply({ content: "Manga not found.", ephemeral: true });
      }

      // Prefer items that are clearly manga/manhwa/manhua
      const preferred = items.filter((it) => {
        const t = (it.type || "").toLowerCase();
        return /manga|manhwa|manhua/i.test(t);
      });
      const candidates = preferred.length > 0 ? preferred : items;

      // Prefer richest metadata (image + synopsis)
      let chosen = candidates.find((it) => {
        const v = it || {};
        return (v.images && v.images.jpg && v.images.jpg.image_url) && v.synopsis && v.synopsis.length > 40;
      });
      if (!chosen) chosen = candidates[0];

      const data = chosen;
      const info = data || {};
      const title = info.title || "Unknown title";
      const titleEnglish = info.title_english || null;
      const titleJapanese = info.title_japanese || null;
      const synopsisRaw = info.synopsis || "No synopsis available.";
      const synopsis = synopsisRaw.replace(/<[^>]*>/g, "");
      const shortSynopsis = synopsis.length > 800 ? synopsis.slice(0, 797) + "..." : synopsis;
      const chapters = info.chapters != null ? String(info.chapters) : "N/A";
      const volumes = info.volumes != null ? String(info.volumes) : "N/A";
      const score = info.score != null ? String(info.score) : "N/A";
      const status = info.status || "N/A";
      const type = info.type || "N/A";
      const published = (info.published && info.published.string) ? info.published.string : "N/A";
      const genres = (info.genres || []).map((g) => g.name).join(", ") || "N/A";
      const authors = (info.authors || []).map((a) => a.name).join(", ") || "N/A";
      const url = info.url || null;

      // Images
      const imgs = (info.images && info.images.jpg) || {};
      const image = imgs.image_url || imgs.large_image_url || null;
      const thumb = imgs.image_url || null;

      const embed = new EmbedBuilder()
        .setTitle(titleEnglish ? `${title} — ${titleEnglish}` : title)
        .setDescription(shortSynopsis)
        .setColor("#c2185b")
        .addFields(
          { name: "Author(s)", value: authors, inline: true },
          { name: "Type", value: type, inline: true },
          { name: "Status", value: status, inline: true },
          { name: "Chapters", value: chapters, inline: true },
          { name: "Volumes", value: volumes, inline: true },
          { name: "Score", value: score, inline: true },
          { name: "Genres", value: genres, inline: false },
          { name: "Published", value: published, inline: true }
        )
        .setFooter({ text: "Source: MyAnimeList / Jikan API" })
        .setTimestamp();

      if (image) embed.setImage(image);
      if (thumb) embed.setThumbnail(thumb);
      if (url) embed.setURL(url);

      return interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.error("Manga command error:", err.message || err);
      return interaction.reply({ content: "Error fetching manga information.", ephemeral: true });
    }
  },
};
