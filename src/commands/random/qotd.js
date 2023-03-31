const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("qotd")
    .setDescription("Ask a question from the users.")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("The question to ask")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const question = interaction.options.getString("question");
    const embed = new EmbedBuilder()
      .setTitle("Question of the day!")
      .setDescription(question)
      .setColor("Random");
    await interaction.reply({
      content: "<@&1075744600221827182>",
      allowedMentions: { roles: ["1075744600221827182"] },
      embeds: [embed],
    });
  },
};
