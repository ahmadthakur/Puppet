const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const axios = require("axios");
const { createCanvas, loadImage } = require("canvas");

function countryCodeToFlag(code) {
  if (!code) return "";
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

function cToF(c) {
  return Math.round((c * 9) / 5 + 32);
}

function tempToColor(t) {
  if (t == null) return 0x3498db;
  if (t <= -10) return 0x2980b9;
  if (t <= 0) return 0x3aa7e3;
  if (t <= 10) return 0x2ecc71;
  if (t <= 20) return 0xf1c40f;
  if (t <= 30) return 0xe67e22;
  return 0xe74c3c;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription("Get current weather for a city")
    .addStringOption((opt) => opt.setName("city").setDescription("City name").setRequired(true)),
  async execute(interaction) {
    await interaction.deferReply();
    const city = interaction.options.getString("city");
    const key = process.env.OPEN_WEATHER_MAP_API_KEY;
    if (!key) {
      return interaction.editReply({
        content: "OPEN_WEATHER_MAP_API_KEY is not set in environment variables.",
        ephemeral: true,
      });
    }

    try {
      const resp = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${key}`
      );
      const data = resp.data;
      const weather = (data.weather && data.weather[0]) || {};
      const main = data.main || {};
      const wind = data.wind || {};
      const sys = data.sys || {};
      const tz = data.timezone || 0;

      const tempC = typeof main.temp === "number" ? Math.round(main.temp) : null;
      const tempF = tempC != null ? cToF(tempC) : null;
      const feelsC = typeof main.feels_like === "number" ? Math.round(main.feels_like) : "N/A";
      const humidity = main.humidity != null ? `${main.humidity}%` : "N/A";
      const pressure = main.pressure != null ? `${main.pressure} hPa` : "N/A";
      const clouds = (data.clouds && data.clouds.all) != null ? `${data.clouds.all}%` : "N/A";
      const visibilityKm = data.visibility != null ? `${Math.round(data.visibility / 1000)} km` : "N/A";

      const windMs = wind.speed != null ? wind.speed : 0;
      const windKmh = Math.round(windMs * 3.6);
      const windDir = wind.deg != null ? `${wind.deg}°` : "N/A";

      const weatherMain = (weather.main || "").toLowerCase();
      const description = weather.description || "";
      const icon = weather.icon || null;

      const country = sys.country || "";
      const flag = countryCodeToFlag(country);

      function formatTime(unix, tzOffset) {
        const d = new Date((unix + (tzOffset || 0)) * 1000);
        // We added the timezone offset to the unix timestamp, so use UTC getters
        const hours = d.getUTCHours();
        const minutes = d.getUTCMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const h12 = hours % 12 || 12;
        return `${h12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
      }

      const sunrise = sys.sunrise ? formatTime(sys.sunrise, tz) : "N/A";
      const sunset = sys.sunset ? formatTime(sys.sunset, tz) : "N/A";

      const embed = new EmbedBuilder()
        .setTitle(`${data.name || city}${country ? `, ${country}` : ""} ${flag}`)
        .setDescription(description || "Current conditions")
        .setColor(tempToColor(tempC != null ? tempC : 20))
        .addFields(
          { name: "🌡 Temperature", value: `${tempC} °C / ${tempF} °F`, inline: true },
          { name: "🤗 Feels Like", value: `${feelsC} °C`, inline: true },
          { name: "💧 Humidity", value: humidity, inline: true },
          { name: "💨 Wind", value: `${windKmh} km/h (${windMs} m/s) ${windDir}`, inline: true },
          { name: "🌥 Clouds", value: `${clouds}`, inline: true },
          { name: "👀 Visibility", value: visibilityKm, inline: true },
          { name: "🔽 Pressure", value: pressure, inline: true },
          { name: "☀️ Sunrise", value: sunrise, inline: true },
          { name: "🌙 Sunset", value: sunset, inline: true }
        )
        .setFooter({ text: "Data provided by OpenWeather" })
        .setTimestamp();

      // render a small PNG icon via canvas (fallback to OpenWeather icon if canvas fails)
      let attachment = null;
      try {
        function renderWeatherIconPNG(type, isDay = true, size = 128) {
          const canvas = createCanvas(size, size);
          const ctx = canvas.getContext("2d");
          const cx = size / 2;
          const cy = size / 2;
          ctx.clearRect(0, 0, size, size);

          ctx.strokeStyle = "rgba(255,255,255,0.95)";
          ctx.lineWidth = Math.max(2, size / 32);
          ctx.lineCap = "round";

          function drawSun() {
            const r = size * 0.18;
            ctx.fillStyle = "#FFD54A";
            ctx.beginPath();
            ctx.arc(cx - size * 0.08, cy - size * 0.12, r, 0, Math.PI * 2);
            ctx.fill();
          }

          function drawCloud(xOffset = 0, yOffset = 0, scale = 1) {
            const x = cx + xOffset;
            const y = cy + yOffset;
            const w = size * 0.6 * scale;
            const h = size * 0.32 * scale;
            ctx.fillStyle = "#E0E0E0";
            ctx.beginPath();
            ctx.arc(x - w * 0.28, y, h * 0.6, Math.PI * 0.5, Math.PI * 1.5);
            ctx.arc(x, y - h * 0.15, h * 0.75, Math.PI * 1.05, Math.PI * 1.9);
            ctx.arc(x + w * 0.28, y, h * 0.6, Math.PI * 1.5, Math.PI * 0.5);
            ctx.closePath();
            ctx.fill();
          }

          function drawRain() {
            ctx.strokeStyle = "#81D4FA";
            ctx.lineWidth = Math.max(2, size / 48);
            for (let i = 0; i < 4; i++) {
              const rx = cx - size * 0.18 + i * (size * 0.08);
              const ry = cy + size * 0.06 + (i % 2) * 4;
              ctx.beginPath();
              ctx.moveTo(rx, ry - 4);
              ctx.lineTo(rx - 4, ry + 10);
              ctx.stroke();
            }
          }

          function drawSnow() {
            ctx.strokeStyle = "#FFFFFF";
            ctx.lineWidth = Math.max(1, size / 64);
            for (let i = 0; i < 4; i++) {
              const sx = cx - size * 0.18 + i * (size * 0.08);
              const sy = cy + size * 0.08 + (i % 2) * 4;
              ctx.beginPath();
              ctx.moveTo(sx - 4, sy);
              ctx.lineTo(sx + 4, sy);
              ctx.moveTo(sx, sy - 4);
              ctx.lineTo(sx, sy + 4);
              ctx.stroke();
            }
          }

          if (/clear/.test(type)) {
            drawSun();
          } else if (/clouds/.test(type)) {
            drawCloud();
            drawSun();
          } else if (/rain|drizzle/.test(type)) {
            drawCloud();
            drawRain();
          } else if (/thunderstorm/.test(type)) {
            drawCloud();
            drawRain();
          } else if (/snow/.test(type)) {
            drawCloud();
            drawSnow();
          } else {
            drawSun();
            drawCloud();
          }

          return canvas.toBuffer("image/png");
        }

        let isDay = true;
        if (icon && typeof icon === "string") isDay = icon.endsWith("d");
        const png = renderWeatherIconPNG(weatherMain || "partly-cloudy", isDay, 128);
        attachment = new AttachmentBuilder(png, { name: "weather.png" });
        embed.setThumbnail("attachment://weather.png");
      } catch (e) {
        if (icon) embed.setThumbnail(`https://openweathermap.org/img/wn/${icon}@2x.png`);
      }

      // Stitch OSM tiles into a 512x512 image and draw precipitation marker only
      async function stitchMap(lat, lon, z = 9, size = 512, opts = {}) {
        const tileSize = 256;
        const n = Math.pow(2, z);
        const latRad = (lat * Math.PI) / 180;
        const centerX = ((lon + 180) / 360) * n * tileSize;
        const centerY = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n * tileSize;

        const topLeftX = centerX - size / 2;
        const topLeftY = centerY - size / 2;

        const startTileX = Math.floor(topLeftX / tileSize);
        const startTileY = Math.floor(topLeftY / tileSize);

        const offsetX = Math.round(topLeftX - startTileX * tileSize);
        const offsetY = Math.round(topLeftY - startTileY * tileSize);

        const canvas = createCanvas(size, size);
        const ctx = canvas.getContext("2d");

        for (let yy = 0; yy < 3; yy++) {
          for (let xx = 0; xx < 3; xx++) {
            let tx = startTileX + xx;
            tx = ((tx % n) + n) % n;
            const ty = startTileY + yy;
            if (ty < 0 || ty >= n) continue;
            const url = `https://tile.openstreetmap.org/${z}/${tx}/${ty}.png`;
            try {
              const imgBuf = await axios.get(url, { responseType: "arraybuffer" }).then((r) => Buffer.from(r.data));
              const img = await loadImage(imgBuf);
              const dx = xx * tileSize - offsetX;
              const dy = yy * tileSize - offsetY;
              ctx.drawImage(img, dx, dy, tileSize, tileSize);
            } catch (e) {
              // ignore tile errors
            }
          }
        }

        // precipitation marker helpers
        function drawDrop(ctx, cx, cy, size) {
          ctx.beginPath();
          ctx.moveTo(cx, cy - size / 2);
          ctx.bezierCurveTo(cx + size / 2, cy - size / 2, cx + size / 2, cy + size / 3, cx, cy + size / 2);
          ctx.bezierCurveTo(cx - size / 2, cy + size / 3, cx - size / 2, cy - size / 2, cx, cy - size / 2);
          ctx.closePath();
          ctx.fill();
        }
        function drawSnowflake(ctx, cx, cy, size) {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.lineWidth = Math.max(1, size / 8);
          for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, size);
            ctx.stroke();
            ctx.rotate(Math.PI / 3);
          }
          ctx.restore();
        }

        try {
          const wMain = (opts.weatherMain || "").toLowerCase();
          const markerX = size / 2;
          const markerY = size / 2;

          if (/rain|drizzle|thunderstorm/.test(wMain)) {
            ctx.fillStyle = "rgba(130,200,255,0.9)";
            drawDrop(ctx, markerX, markerY - 40, 12);
          } else if (/snow/.test(wMain)) {
            ctx.fillStyle = "rgba(255,255,255,0.95)";
            drawSnowflake(ctx, markerX, markerY - 40, 10);
          }
        } catch (e) {
          // ignore
        }

        return canvas.toBuffer("image/png");
      }

      // attach map (stitch only if coords available; otherwise use static OSM link)
      let mapAttachment = null;
      const lat = data.coord && data.coord.lat;
      const lon = data.coord && data.coord.lon;
      if (lat != null && lon != null) {
        const z = 9;
        try {
          const composite = await stitchMap(lat, lon, z, 512, { weatherMain });
          mapAttachment = new AttachmentBuilder(composite, { name: "map.png" });
          embed.setImage("attachment://map.png");
        } catch (e) {
          const osm = `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lon}&zoom=${z}&size=512x512&maptype=mapnik&markers=${lat},${lon},red-pushpin`;
          embed.setImage(osm);
        }
      }

      const files = [];
      if (attachment) files.push(attachment);
      if (mapAttachment) files.push(mapAttachment);

      try {
        if (files.length) return interaction.editReply({ embeds: [embed], files });
        return interaction.editReply({ embeds: [embed] });
      } catch (err) {
        if (files.length) return interaction.reply({ embeds: [embed], files });
        return interaction.reply({ embeds: [embed] });
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return interaction.editReply({ content: "City not found. Please check the city name.", ephemeral: true });
      }
      console.error("Weather command error:", err.message || err);
      try {
        return interaction.editReply({ content: "Error fetching weather information.", ephemeral: true });
      } catch (e) {
        return interaction.followUp({ content: "Error fetching weather information.", ephemeral: true });
      }
    }
  },
};
