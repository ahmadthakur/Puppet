const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Removes a song from the queue.")
    .addIntegerOption((option) =>
      option
        .setName("position")
        .setDescription("The position of the song in the queue.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const queue = interaction.client.player.getQueue(interaction.guild.id);
    const position = interaction.options.getInteger("position");

    const embed = new EmbedBuilder();
    embed.setColor("Random");

    if (!queue || !queue.playing) {
      embed.setDescription("There isn't currently any music to remove.");
    } else if (position < 1 || position > queue.tracks.length) {
      embed.setDescription("The position you provided is invalid.");
    } else {
      const track = queue.tracks[position - 1];
      queue.remove(position - 1);
      embed.setDescription(`Removed **${track.title}** from the queue.`);
    }

    return await interaction.reply({ embeds: [embed] });
  },
};
