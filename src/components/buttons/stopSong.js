const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: {
    name: "melody_stop_song",
  },
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);

    const embed = new EmbedBuilder();
    embed.setColor("Random");

    if (!queue || !queue.isPlaying) {
      embed.setDescription(`There isn't currently any music playing.`);
    } else {
      queue.delete();
      embed.setDescription("The music has been stopped.");
    }

    return await interaction.reply({ embeds: [embed] });
  },
};
