const {SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('selfimprovement')
        .setDescription('Self Improvement'),
    async execute(interaction) {
        const button = new ButtonBuilder()
            .setCustomId('selfimprovement')
            .setLabel('Self Improvement')
            .setStyle(ButtonStyle.PRIMARY);
        
        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(button)],
        });
    },
};
