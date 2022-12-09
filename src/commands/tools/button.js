const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("button").setDescription("Button"),
  async execute(interaction) {
    const button = new ButtonBuilder()
      .setCustomId("testButton")
      .setLabel("Click me!")
      .setStyle(ButtonStyle.Primary);

    await interaction.reply({
      content: "I think you should,",
      components: [new ActionRowBuilder().addComponents(button)],
    });
  },
};
