const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    const channel = member.guild.channels.cache.find(
      (channel) => channel.name === "bot-logs"
    );
    const embed = new EmbedBuilder()
      .setTitle("Member Joined")
      .setDescription(`${member} has joined the server!`)
      .setColor("Random")
      .setThumbnail(member.user.displayAvatarURL())
      .setTimestamp();
  
      await channel.send({ embeds: [embed] });
  },
};
