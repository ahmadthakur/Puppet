const { SlashCommandBuilder, ButtonBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Shows all tracks currently in the server queue."),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);

    const embed = new EmbedBuilder();
    embed.setColor("Random");

    if (!queue) {
      embed.setDescription(`There isn't currently any music playing.`);
      return await interaction.reply({ embeds: [embed] });
    }

    embed.setThumbnail(queue.currentTrack.thumbnail);
    embed.setAuthor({ name: `Server Queue - ${interaction.guild.name}` });

    const queuedTracks = queue.tracks.toArray(); //Converts the queue into a array of tracks

    // Get the first 5 tracks in the queue
    const tracks = queuedTracks.map((track, i) => {
      return `\`${i + 1}\` [${track.title}](${track.url}) by **${
        track.author
      }** `;
    });
    const songs = queuedTracks.length;
    const nextSongs =
      songs > 5
        ? `And **${songs - 5}** other ${
            songs - 5 > 1 ? "tracks" : "track"
          } currently in queue.`
        : "";

    const currentTrack = queue.currentTrack;
    const progress = queue.node.createProgressBar();

    embed.setDescription(
      `**Current Track:** [${currentTrack.title}](${currentTrack.url}) by **${
        currentTrack.author
      }**\n${progress}\n\n${tracks.slice(0, 5).join("\n")}\n\n${nextSongs}`
    );

    const row = new ActionRowBuilder().addComponents(
      // Back button
      new ButtonBuilder()
        .setCustomId(`melody_back_song`)
        .setLabel("⏮ Back")
        .setStyle(ButtonStyle.Secondary),

      // Pause button
      new ButtonBuilder()
        .setCustomId(`melody_pause_song`)
        .setLabel("⏸ Pause")
        .setStyle(ButtonStyle.Secondary),

      // Resume button
      new ButtonBuilder()
        .setCustomId(`melody_skip_song`)
        .setLabel("⏭ Skip")
        .setStyle(ButtonStyle.Secondary),

      // Stop button
      new ButtonBuilder()
        .setCustomId(`melody_stop_song`)
        .setLabel("⏹ Stop")
        .setStyle(ButtonStyle.Secondary)
    );

    return await interaction.reply({ embeds: [embed], components: [row] });
  },
};
