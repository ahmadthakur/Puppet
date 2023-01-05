const { SlashCommandBuilder } = require("discord.js");
const cohere = require("cohere-ai");

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
  async execute(interaction) {
    await interaction.reply("🤔 Thinking...");

    const input = interaction.options.getString("question");
    cohere.init(process.env.COHERE_API_KEY);
    const generateResponse = await cohere.generate({
      model: "command-xlarge",
      prompt: input + "?",
      max_tokens: 300,
      temperature: 0.9,
    });
    // console.log(generateResponse.body.generations[0].text);
    await interaction.followUp({
      content: `<@${interaction.user.id}>`+" "+input+generateResponse.body.generations[0].text,
    });
  },
};
