const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  
  module.exports = {
    data: {
      name: "nhieButton",
    },
  
    async execute(interaction) {
      const response = await fetch("https://api.truthordarebot.xyz/v1/nhie");
      const json = await response.json();
      const nhie = json.question;
      console.log(nhie);
  
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId("nhieButton")
            .setLabel("Never Have I Ever")
            .setStyle(ButtonStyle.Primary)
        );

      const embed = new EmbedBuilder()
        .setAuthor({
          name:
            `Requested by ${interaction.user.username}` +
            `#${interaction.user.discriminator}`,
          iconURL: `${interaction.user.displayAvatarURL({ dynamic: false })}`,
        })
        .setTitle(nhie)
        .setColor("Random");
  
      await interaction.reply({
        embeds: [embed],
        components: [row],
      });
    },
  };
  