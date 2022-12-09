const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const request = require("request");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("horoscope")
    .setDescription("Responds with your horoscope.")
    .addStringOption((option) =>
      option
        .setName("zodiac")
        .setDescription("Your zodiac sign")
        .setRequired(true)
        .addChoices(
          { name: "Aries", value: "Aries" },
          { name: "Taurus", value: "Taurus" },
          { name: "Gemini", value: "Gemini" },
          { name: "Cancer", value: "Cancer" },
          { name: "Leo", value: "Leo" },
          { name: "Virgo", value: "Virgo" },
          { name: "Libra", value: "Libra" },
          { name: "Scorpio", value: "Scorpio" },
          { name: "Sagittarius", value: "Sagittarius" },
          { name: "Capricorn", value: "Sapricorn" },
          { name: "Aquarius", value: "Aquarius" },
          { name: "Pisces", value: "Pisces" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("day")
        .setDescription("Pick a day")
        .setRequired(true)
        .addChoices(
          { name: "Yesterday", value: "Yesterday" },
          { name: "Tomorrow", value: "Tomorrow" },
          { name: "Today", value: "Today" }
        )
    ),
  async execute(interaction) {
    const zodiac = interaction.options.getString("zodiac");
    const day = interaction.options.getString("day");
    const horoscope = {
      url: `https://aztro.sameerkumar.website/?sign=${zodiac}&day=${day}`,
      method: "POST",
    };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        const obj = JSON.parse(body);
        console.log(obj.description);
        const embed = new EmbedBuilder()
          .setTitle(`${day}'s Horoscope for ${zodiac}`)
          .setDescription(`${obj.description}`)
          .addFields(
            { name: "Date Range", value: `${obj.date_range}` },
            //add space
            { name: "\u200B", value: "\u200B" },
            {
              name: "Compatibility",
              value: `${obj.compatibility}`,
              inline: true,
            },
            { name: "Color", value: `${obj.color}`, inline: true },
            { name: "Mood", value: `${obj.mood}`, inline: true }
          )
          .setColor("Random")
          .setTimestamp();

        interaction.reply({ embeds: [embed] });
      }
    }
    request(horoscope, callback);
  },
};
