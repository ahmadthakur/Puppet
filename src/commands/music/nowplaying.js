const { SlashCommandBuilder, ButtonBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("View information about the current track."),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    const currentTrack = queue.currentTrack; //Gets the current track being played

    const embed = new EmbedBuilder();
    embed.setColor("Random");

    if (!queue) {
      embed.setDescription("There isn't currently any music playing.");
      return await interaction.reply({ embeds: [embed] });
    }

    const progress = queue.node.createProgressBar(); //Creates a progress bar for the current track
    embed.setDescription(
      `${progress}\n \n**[${currentTrack.title}](${currentTrack.url})** by **${currentTrack.author}** is currently playing.`
    );

    embed.setThumbnail(currentTrack.thumbnail);

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
