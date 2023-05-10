const { EmbedBuilder } = require("discord.js");
const { useHistory, useQueue } = require("discord-player");

module.exports = {
  data: {
    name: "melody_back_song",
  },
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    const history = useHistory(interaction.guild.id);

    const embed = new EmbedBuilder();
    embed.setColor("Random");

    if (!queue || !queue.isPlaying) {
      embed.setDescription("There isn't currently any music playing.");
      return await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }

    history.previous(); //Goes back to the previous track

    embed.setDescription(
      `Successfully went back to **[${queue.currentTrack.title}](${queue.currentTrack.url})**.`
    );

    return await interaction.reply({ embeds: [embed] });
  },
};
