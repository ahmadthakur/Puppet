const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");

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
    //capitalise each word after a space
    const cityCapitalised = city.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    //join two or more words together
    const joinedCity = city.split(" ").join("%20");
    //capitalise the first letter of each word in joinedCity
    const joinedCityCapitalised = joinedCity
      .split("%20")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("%20");

    //get the weather info of the city
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${joinedCityCapitalised}&appid=${process.env.WEATHER_API_KEY}&units=metric`
      )
      .then((response) => {
        const data = response.data;
        const temp = data.main.temp;
        const feelsLike = data.main.feels_like;
        const humidity = data.main.humidity;
        const maxTemp = data.main.temp_max;
        const minTemp = data.main.temp_min;
        const clouds = data.clouds.all;
        const visibility = data.visibility;
        const windSpeed = data.wind.speed;
        const country = data.sys.country;

        const description = data.weather[0].description;
        const embed = new EmbedBuilder()
          .setTitle(`Weather in ${cityCapitalised} , ${country}`)
          .setDescription(`${description}`)
          .setThumbnail(
            `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
          )
          .addFields(
            { name: "🌡 Temperature", value: `${temp}°C`, inline: true },
            { name: "🤷🏼‍♂️ Feels Like", value: `${feelsLike}°C`, inline: true },
            { name: "💧 Humidity", value: `${humidity}%`, inline: true },
            { name: "Max Temperature", value: `${maxTemp}°C`, inline: true },
            { name: "Min Temperature", value: `${minTemp}°C`, inline: true },
            { name: "\u200B", value: "\u200B" },
            { name: "⛅ Clouds", value: `${clouds}%`, inline: true },
            { name: "👀 Visibility", value: `${visibility}m`, inline: true },
            { name: "💨 Wind Speed", value: `${windSpeed}m/s`, inline: true }
          )
          .setTimestamp();
        interaction.reply({ embeds: [embed] });
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
