const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "playerStart",
  async execute(queue, track) {
    const embed = new EmbedBuilder();

    embed.setDescription(
      `Now playing **[${track.title}](${track.url})** by **${track.author}**.`
    );
    embed.setColor("Random");
    queue.metadata.channel.send({ embeds: [embed] });
  },
};
