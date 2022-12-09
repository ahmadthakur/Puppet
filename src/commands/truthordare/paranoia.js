const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("paranoia").setDescription("Gives a random paranoia question"),
  async execute(interaction) {
    const response = await fetch("https://api.truthordarebot.xyz/v1/paranoia");
    const json = await response.json();
    const paranoia = json.question;
    console.log(paranoia);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("paranoiaButton")
        .setLabel("Paranoia")
        .setStyle(ButtonStyle.Primary)
    );

    const embed = new EmbedBuilder()
      .setAuthor({
        name:
          `Requested by ${interaction.user.username}` +
          `#${interaction.user.discriminator}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: false })}`,
      })
      .setTitle(paranoia)
      .setColor("Random");

    await interaction.reply({
      embeds: [embed],
      components: [row],
    });
  },
};
