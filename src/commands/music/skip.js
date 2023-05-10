const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips the current track."),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    const embed = new EmbedBuilder();
    embed.setColor("Random");

    if (!queue) {
      embed.setDescription(`There isn't currently any music playing.`);
      return await interaction.reply({ embeds: [embed] });
    }

    queue.node.skip();

    embed.setDescription(
      `The track **${queue.currentTrack}** has been skipped.`
    );

    return await interaction.reply({ embeds: [embed] });
  },
};
