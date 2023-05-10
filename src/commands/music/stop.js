const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops the current track and clears the queue."),
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
