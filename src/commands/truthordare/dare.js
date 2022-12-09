const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder().setName("dare").setDescription("Gives a random dare that has to be completed"),
    async execute(interaction) {
      //fetching the truth or dare questions from api
      const response = await fetch("https://api.truthordarebot.xyz/v1/truth");
      const json = await response.json();
      const dare = json.question;
      console.log(dare);
  
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId("truthbutton")
            .setLabel("Truth")
            .setStyle(ButtonStyle.Success)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId("darebutton")
            .setLabel("Dare")
            .setStyle(ButtonStyle.Danger)
        );
  
      const embed = new EmbedBuilder()
        .setAuthor({
          name: `Requested by ${interaction.user.username}`+`#${interaction.user.discriminator}`,
          iconURL: `${interaction.user.displayAvatarURL({ dynamic: false })}`,
        })
        .setTitle(dare)
        .setColor("Random");
  
      await interaction.reply({
        embeds: [embed],
        components: [row],
      });
    },
  };
  