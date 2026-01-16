module.exports = {
  data: { name: "melody_skip_song" },
  async execute(interaction) {
    return interaction.reply({ content: "Music features have been removed from this bot.", ephemeral: true });
  },
};
