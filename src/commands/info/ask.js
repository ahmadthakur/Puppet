const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

//require cohre-ai
const cohere = require("cohere-ai");

//export the command
module.exports = {
  name: "ask",
  description: "Chat with the bot!",
  data: new SlashCommandBuilder()
    .setName("ask")
    .setDescription("Ask the bot a question")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("What do you want to ask from the bot?")
        .setRequired(true)
    ),

  //execute the command
  async execute(interaction) {
    //send a thinking message
    await interaction.reply("🤔 Thinking...");

    //get the question
    const input = interaction.options.getString("question");

    //get the response
    cohere.init(process.env.COHERE_API_KEY);
    const generateResponse = await cohere.generate({
      model: "command-xlarge",
      prompt: input,
      max_tokens: 300,
      temperature: 0.9,
    });

    //create an embed
    const embed = new EmbedBuilder()
      .setDescription(generateResponse.body.generations[0].text)
      .setColor("Random")
      .setTimestamp();

    //send the response
    await interaction.followUp({
      content: `**<@${interaction.user.id}>:` + " " + `${input}**`,
      embeds: [embed],
    });
  },
};
