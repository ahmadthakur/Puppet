const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("anime")
    .setDescription("Responds with information about an anime.")
    .addStringOption((option) =>
      option.setName("anime").setDescription("Anime title or query").setRequired(true)
    ),

  async execute(interaction) {
    const query = interaction.options.getString("anime");
    if (!query || !query.trim()) {
      return interaction.reply({ content: "Please provide an anime title or query.", ephemeral: true });
    }

    try {
      const q = encodeURIComponent(query.trim());
      const res = await axios.get(`https://api.jikan.moe/v4/anime?q=${q}&limit=6`);
      const items = res.data.data || [];
      if (items.length === 0) return interaction.reply({ content: "Anime not found.", ephemeral: true });

      // Prefer TV/Movie/OVA/ONA types
      const preferred = items.filter((it) => {
        const t = (it.type || "").toLowerCase();
        return /tv|movie|ova|ona/i.test(t);
      });
      const candidates = preferred.length > 0 ? preferred : items;

      // Choose an item with image + synopsis if possible
      let chosen = candidates.find((it) => {
        return it && it.images && it.images.jpg && it.images.jpg.image_url && it.synopsis && it.synopsis.length > 40;
      });
      if (!chosen) chosen = candidates[0];

      const info = chosen || {};
      const title = info.title || "Unknown title";
      const titleEnglish = info.title_english || null;
      const titleJapanese = info.title_japanese || null;
      const synopsisRaw = info.synopsis || "No synopsis available.";
      const synopsis = synopsisRaw.replace(/<[^>]*>/g, "");
      const shortSynopsis = synopsis.length > 800 ? synopsis.slice(0, 797) + "..." : synopsis;
      const episodes = info.episodes != null ? String(info.episodes) : "N/A";
      const score = info.score != null ? String(info.score) : "N/A";
      const status = info.status || "N/A";
      const type = info.type || "N/A";
      const aired = (info.aired && info.aired.string) ? info.aired.string : "N/A";
      const duration = info.duration || "N/A";
      const rating = info.rating || "N/A";
      const studios = (info.studios || []).map((s) => s.name).join(", ") || "N/A";
      const genres = (info.genres || []).map((g) => g.name).join(", ") || "N/A";
      const url = info.url || null;

      const imgs = (info.images && info.images.jpg) || {};
      const image = imgs.image_url || imgs.large_image_url || null;
      const thumb = imgs.image_url || null;

      const embed = new EmbedBuilder()
        .setTitle(titleEnglish ? `${title} — ${titleEnglish}` : title)
        .setDescription(shortSynopsis)
        .setColor("#1e90ff")
        .addFields(
          { name: "Type", value: type, inline: true },
          { name: "Status", value: status, inline: true },
          { name: "Episodes", value: episodes, inline: true },
          { name: "Duration", value: duration, inline: true },
          { name: "Score", value: score, inline: true },
          { name: "Rating", value: rating, inline: true },
          { name: "Studios", value: studios, inline: false },
          { name: "Genres", value: genres, inline: false },
          { name: "Aired", value: aired, inline: true }
        )
        .setFooter({ text: "Source: MyAnimeList / Jikan API" })
        .setTimestamp();

      if (image) embed.setImage(image);
      if (thumb) embed.setThumbnail(thumb);
      if (url) embed.setURL(url);

      return interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.error("Anime command error:", err.message || err);
      return interaction.reply({ content: "Error fetching anime information.", ephemeral: true });
    }
  },
};
