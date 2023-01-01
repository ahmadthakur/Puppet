const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: {
        name: "melody_stop_song",
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

        queue.destroy();
        embed.setDescription(`<@${interaction.user.id}>: The music has been stopped.`);

        return await interaction.reply({ embeds: [embed] });
    },
};