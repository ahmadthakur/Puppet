const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("truth").setDescription("Gives a random question that has to be answered truthfully"),
  async execute(interaction) {
    //fetching the truth or dare questions from api
    const response = await fetch("https://api.truthordarebot.xyz/v1/truth");
    const json = await response.json();
    const truth = json.question;
    console.log(truth);

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("truthButton")
          .setLabel("Truth")
          .setStyle(ButtonStyle.Success)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dareButton")
          .setLabel("Dare")
          .setStyle(ButtonStyle.Danger)
      );

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Requested by ${interaction.user.username}`+`#${interaction.user.discriminator}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: false })}`,
      })
      .setTitle(truth)
      .setColor("Random");

    await interaction.reply({
      embeds: [embed],
      components: [row],
    });
  },
};
