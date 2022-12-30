const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dice")
    .setDescription("Rolls a dice."),
  async execute(interaction) {
    const dice = Math.floor(Math.random() * 6) + 1;
    const file = new AttachmentBuilder("./src/assets/dice/diceroll.gif");

    //send an embed and then 2 seconds later edit it
    const embed = new EmbedBuilder()
      .setTitle("Dice Roll")
      .setThumbnail("attachment://diceroll.gif")
      .setDescription(`Rolling a dice...`)
      .setColor("Random");
    await interaction.reply({ embeds: [embed], files: [file] });

    const dicenumber = new AttachmentBuilder(
      `./src/assets/dice/dice${dice}.png`
    );

    setTimeout(() => {
      embed
        .setDescription(`You rolled a ${dice}`)
        .setThumbnail(`attachment://dice${dice}.png`);
      interaction.editReply({ embeds: [embed], files: [dicenumber] });
    }, 2000);
  },
};
