module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    const role = member.guild.roles.cache.find(
      (role) => role.name === "Member"
    );
    member.roles.add(role);
    const channel = member.guild.channels.cache.find(
      (channel) => channel.name === "bot-logs"
    );
    channel.send(
      new Discord.MessageEmbed()
        .setColor("Random")
        .setTitle("Member Joined")
        .setDescription(`${member} has joined the server!`)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
    );
  },
};
