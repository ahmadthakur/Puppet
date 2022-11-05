const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { weatherKey } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription("Responds with weather info.")
    .addStringOption((option) =>
      option
        .setName("city")
        .setDescription("The city you want to get weather info for.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const city = interaction.options.getString("city");

    //join two or more words together
    const joinedCity = city.split(" ").join("%20");
    
    //get the weather info of the city
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${joinedCity}&appid=` +
        weatherKey +
        `&units=metric`
    );
    const data = await response.json();
    const temp = data.main.temp;
    const feelsLike = data.main.feels_like;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const description = data.weather[0].description;
    const embed = new EmbedBuilder()
      .setTitle(`Weather in ${city}`)
      .setDescription(`${description}`)
      .setThumbnail(
        `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
      )
      .addFields(
        { name: "Temperature", value: `${temp}°C` },
        { name: "Feels Like", value: `${feelsLike}°C`, inline: true },
        { name: "Humidity", value: `${humidity}%` },
        { name: "Wind Speed", value: `${windSpeed}m/s`, inline: true }
      )
      .setColor("Random")
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
