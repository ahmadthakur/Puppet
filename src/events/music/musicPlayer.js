const colors = require("colors");

module.exports = {
  name: "musicplayer",
  execute(client) {
    client.player
      // Emitted when channel was empty.
      .on("channelEmpty", (queue) =>
        console.log(`Everyone left the Voice Channel, queue ended.`)
      )
      // Emitted when a song was added to the queue.
      .on("songAdd", (queue, song) =>
        console.log(`Song ${song} was added to the queue.`)
      )
      // Emitted when a playlist was added to the queue.
      .on("playlistAdd", (queue, playlist) =>
        console.log(
          `Playlist ${playlist} with ${playlist.songs.length} was added to the queue.`
        )
      )
      // Emitted when there was no more music to play.
      .on("queueDestroyed", (queue) => console.log(`The queue was destroyed.`))
      // Emitted when the queue was destroyed (either by ending or stopping).
      .on("queueEnd", (queue) => console.log(`The queue has ended.`))
      // Emitted when a song changed.
      .on("songChanged", (queue, newSong, oldSong) =>
        console.log(`${newSong} is now playing.`)
      )
      // Emitted when a first song in the queue started playing.
      .on("songFirst", (queue, song) => console.log(`Started playing ${song}.`))
      // Emitted when someone disconnected the bot from the channel.
      .on("clientDisconnect", (queue) =>
        console.log(`I was kicked from the Voice Channel, queue ended.`)
      )
      // Emitted when deafenOnJoin is true and the bot was undeafened
      .on("clientUndeafen", (queue) => console.log(`I got undefeanded.`))
      // Emitted when a song was moved in the queue to a new position
      .on("songMoved", (queue, song, oldIndex, newIndex) =>
        console.log(`Song ${song} was moved from ${oldIndex} to ${newIndex}.`)
      )
      // Emitted when there was an error in runtime
      .on("error", (error, queue) => {
        console.log(`Error: ${error} in ${queue.guild.name}`);
      });
  },
};
