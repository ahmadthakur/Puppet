const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: {
        name: "melody_pause_song",
    },
    
    async execute(interaction) {
        const queue = interaction.client.player.getQueue(interaction.guild.id);

        const embed = new EmbedBuilder();
        embed.setColor("Random");

        if (!queue || !queue.playing) {
            embed.setDescription("There isn't currently any music playing.");
            return await interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
        }

        if (!queue) {
            embed.setDescription("There isn't currently any music playing.");
            return await interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
        }

        queue.setPaused(!queue.connection.paused);

        embed.setDescription(`<@${interaction.user.id}>: Successfully ${queue.connection.paused ? "paused" : "unpaused"} **[${queue.current.title}](${queue.current.url})**.`);

        return await interaction.reply({ embeds: [embed] });
    },
};