module.exports = {
  name: "guildMemberLeave",
  async execute(member) {
    const channel = member.guild.channels.cache.find(
      (channel) => channel.name === "bot-logs"
    );
    channel.send(
      //send an embed to the channel
      new Discord.MessageEmbed()
        .setColor("Random")
        .setTitle("Member Left")
        .setDescription(`${member} has left the server!`)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
    );
  }
};
