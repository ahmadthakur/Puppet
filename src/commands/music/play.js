//play command code for playing music from youtube without api key

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
const ytpl = require("ytpl");
const { getVoiceConnection } = require("@discordjs/voice");
const { joinVoiceChannel } = require("@discordjs/voice");
const { createAudioPlayer } = require("@discordjs/voice");
const { createAudioResource } = require("@discordjs/voice");
const { AudioPlayerStatus } = require("@discordjs/voice");
const { StreamType } = require("@discordjs/voice");
const { entersState } = require("@discordjs/voice");
const { VoiceConnectionStatus } = require("@discordjs/voice");
const { AudioPlayer } = require("@discordjs/voice");
const { AudioResource } = require("@discordjs/voice");
const { VoiceConnection } = require("@discordjs/voice");
const { join } = require("path");
const { get } = require("https");
const { getVideo } = require("ytdl-core");
const { getPlaylist } = require("ytpl");
const { getPlaylistID } = require("ytpl");
const { getPlaylistItems } = require("ytpl");
const { getPlaylistURL } = require("ytpl");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a song from youtube.")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("The song you want to play.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const song = interaction.options.getString("song");
    const search = await ytsr(song, { limit: 1 });

    console.log(search);
    const songUrl = search.items[0].url;
    const songInfo = await ytdl.getInfo(songUrl);
    const songTitle = songInfo.videoDetails.title;
    const songDuration = songInfo.videoDetails.lengthSeconds;
    const songThumbnail = songInfo.videoDetails.thumbnails[0].url;
    const songAuthor = songInfo.videoDetails.author.name;
    const songAuthorUrl = songInfo.videoDetails.author.user_url;
    const songViews = songInfo.videoDetails.viewCount;
    const songLikes = songInfo.videoDetails.likes;
    const songDislikes = songInfo.videoDetails.dislikes;
    const songDescription = songInfo.videoDetails.description;
    const songPublished = songInfo.videoDetails.publishDate;
    const songEmbed = new EmbedBuilder()
      .setTitle(`${songTitle}`)
      .setURL(`${songUrl}`)
      .setAuthor({
        name: `${songAuthor}`,
        url: `${songAuthorUrl}`,
      })
      .setDescription(`${songDescription}`)
      .addFields(
        { name: "Duration", value: `${songDuration} seconds` },
        { name: "Views", value: `${songViews}` },
        { name: "Likes", value: `${songLikes}` },
        { name: "Dislikes", value: `${songDislikes}` },
        { name: "Published", value: `${songPublished}` }
      )
      .setThumbnail(`${songThumbnail}`)
      .setColor("Random");

    const connection = getVoiceConnection(interaction.guildId);
    const player = createAudioPlayer();

    const resource = createAudioResource(songUrl, {
      inputType: StreamType.Arbitrary,
    });

    player.play(resource);

    player.on(AudioPlayerStatus.Idle, () => {
      player.stop();
    });

    player.on("error", (error) => {
      console.error(error);
    });

    if (!connection) {
      const channel = interaction.member.voice.channel;
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });

      connection.subscribe(player);
      await interaction.reply({ embeds: [songEmbed] });
    } else {
      connection.subscribe(player);
      await interaction.reply({ embeds: [songEmbed] });
    }
  },
};
