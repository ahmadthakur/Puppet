const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("define")
    .setDescription("Responds with a definition of a word.")
    .addStringOption((option) =>
      option
        .setName("word")
        .setDescription("The word you want to define.")
        .setRequired(true)
    ),
  async execute(interaction) {

    //use dictionary api to get definition of word
    const word = interaction.options.getString("word");

    //join two or more words together
    const joinedWord = word.split(" ").join("%20");
    
    //get the definition of the word
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${joinedWord}`
    );
    const data = await response.json();
    const definition = data[0].meanings[0].definitions[0].definition;
    const example = data[0].meanings[0].definitions[0].example;
    const embed = new EmbedBuilder()
      .setTitle(`Definition of ${word}`)
      .setDescription(`${definition}`)
      .addFields({ name: "Example", value: example })
      .setColor("Random")
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
