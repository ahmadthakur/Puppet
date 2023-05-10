// 
const {EmbedBuilder} = require("discord.js");
// Requirements: colors
const colors = require("colors");

// Export the event
module.exports = {
    name: "trackStart",
    async execute(queue, track) {
        const embed = new EmbedBuilder();
        embed.setTitle("Now Playing");
        embed.setDescription(`[${track.title}](${track.url})`);
        embed.setThumbnail(track.thumbnail);
        embed.setColor("Random");
        embed.setTimestamp();
        embed.setFooter(`Requested by ${track.requestedBy.tag}`, track.requestedBy.avatarURL());
        await queue.metadata.send({embeds: [embed]});
        console.log(colors.green(`[Music] Now playing ${track.title} in ${queue.guild.name}`));
    },
}