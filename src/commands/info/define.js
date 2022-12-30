const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

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
    const word = interaction.options.getString("word");
    const joinedWord = word.split(" ").join("%20");

    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${joinedWord}`
    );
    const data = await response.json();
    const partOfSpeech = data[0].meanings[0].partOfSpeech;
    const pronunciation = data[0].phonetics[0].text;
    const definition = data[0].meanings[0].definitions[0].definition;
    const embed = new EmbedBuilder()
      .setTitle(`Definition of ${word}`)
      .setDescription(`${definition}`)
      .addFields(
        { name: "Pronunciation", value: pronunciation },
        { name: "Type", value: partOfSpeech }
      )
      .setColor("Random")
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
