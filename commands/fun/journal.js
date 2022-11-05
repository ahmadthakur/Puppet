const {SlashCommandBuilder} = require('@discordjs/builders');
const {EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('journal')
        //gives the user a daily prompt to write in their gratitude journal
        .setDescription('Responds with a daily prompt.'),
    async execute(interaction) {
        //give a random prompt from the list of prompts
        const prompts = [
            'What are you grateful for today?',
            'What are you looking forward to?',
            'What are you proud of?',
            'What are you excited about?',
            'What are you thankful for?',
            'What are you grateful for in life?',
            'What are you grateful for this week?',
        ];
        const response = prompts[Math.floor(Math.random() * prompts.length)];
        const embed = new EmbedBuilder()
            .setTitle('Journal')
            .setDescription(`${response}`)
            .setColor('Random')
            .setTimestamp();
            
            await interaction.reply({embeds: [embed]});
    },
};