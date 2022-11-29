module.exports = {
  name: "guildMemberRemove",
  async execute(guildMemberRemove) {
    const guild = guildMemberRemove.guild;
    const channel = guild.channels.cache.find(
      (channel) => channel.name === "bot-logs"
    );
    channel.send(
      new Discord.MessageEmbed()
        .setColor("Random")
        .setTitle("Member Left")
        .setDescription(`${guildMemberRemove} has left the server!`)
        .setThumbnail(guildMemberRemove.user.displayAvatarURL())
        .setTimestamp()
    );
  },
};
