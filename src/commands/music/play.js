const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { useQueue, useMasterPlayer } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Adds a track to the end of the server queue.")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("Enter a track name, artist name, or URL.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const player = useMasterPlayer(interaction); // get the player for the guild of the user who requested the bot
    const channel = interaction.member.voice.channel; // get the voice channel of the user who requested the bot
    const embed = new EmbedBuilder(); // create a new embed builder

    if (!channel) {
      return interaction.reply("You are not connected to a voice channel!"); // make sure we have a voice channel
    }
    const query = interaction.options.getString("song", true); // we need input/query to play

    // let's defer the interaction as things can take time to process
    await interaction.deferReply();

    try {
      // let's try to play the track
      const { track } = await player.play(channel, query, {
        nodeOptions: {
          // nodeOptions are the options for guild node (aka your queue in simple word)
          metadata: interaction, // we can access this metadata object using queue.metadata later on
        },
      });

      // let's set the embed
      embed
        .setTitle("Track Added")
        .setDescription(
          `**${track.title}** by **${track.author}** added to queue.`
        )
        .setThumbnail(track.thumbnail)
        .setTimestamp()
        .setColor("Random");

      // let's send the embed
      return interaction.followUp({ embeds: [embed] });

      // return interaction.followUp(`**${track.title}** enqueued!`);
    } catch (e) {
      // let's return error if something failed
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  },
};
