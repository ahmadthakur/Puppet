const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  
  module.exports = {
    data: {
      name: "wyrButton",
    },
  
    async execute(interaction) {
      const response = await fetch("https://api.truthordarebot.xyz/v1/wyr");
      const json = await response.json();
      const wyr = json.question;
      console.log(wyr);
  
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId("wyrButton")
            .setLabel("Would You Rather")
            .setStyle(ButtonStyle.Primary)
        );

      const embed = new EmbedBuilder()
        .setAuthor({
          name:
            `Requested by ${interaction.user.username}` +
            `#${interaction.user.discriminator}`,
          iconURL: `${interaction.user.displayAvatarURL({ dynamic: false })}`,
        })
        .setTitle(wyr)
        .setColor("Random");
  
      await interaction.reply({
        embeds: [embed],
        components: [row],
      });
    },
  };
  