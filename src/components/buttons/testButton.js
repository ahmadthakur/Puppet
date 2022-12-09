module.exports = {
  data: {
    name: "testButton",
  },

  async execute(interaction) {
    await interaction.reply({
      content: "You clicked the button!",
      ephemeral: true,
    });
  },
};
