const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pauses the current track."),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);

    const embed = new EmbedBuilder();
    embed.setColor("Random");

    if (!queue || !queue.isPlaying) {
      embed.setDescription("There isn't currently any music playing.");
      return await interaction.reply({ embeds: [embed] });
    } //if there isn't any music playing, then there's no need to pause it

    if (queue.node.isPaused()) {
      embed.setDescription("The queue is already paused.");
      return await interaction.reply({ embeds: [embed] });
    } //if the queue is already paused, then there's no need to pause it again

    queue.node.setPaused(true); //Pauses the queue

    embed.setDescription(
      `Successfully paused **[${queue.currentTrack.title}](${queue.currentTrack.url})**.`
    );

    return await interaction.reply({ embeds: [embed] });
  },
};
