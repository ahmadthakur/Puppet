const fs = require("fs");

module.exports = (client) => {
  client.handleEvents = async () => {
    const eventsFolders = fs.readdirSync("./src/events");
    for (const folder of eventsFolders) {
      const eventFiles = fs
        .readdirSync(`./src/events/${folder}`)
        .filter((file) => file.endsWith(".js"));

      //make a switch case for each folder
      switch (folder) {
        case "client":
          for (const file of eventFiles) {
            const event = require(`../../events/${folder}/${file}`);
            if (event.once) {
              client.once(event.name, (...args) => event.execute(...args));
            }

            client.on(event.name, (...args) => event.execute(...args));
          }
          break;

        //   case "music":
        //     for (const file of eventFiles) {
        //       const music = require(`../../events/${folder}/${file}`);
        //       if (music.once) {
        //         client.player.once(fmusic.name, (...args) =>
        //           music.execute(...args)
        //         );
        //       }

        //       client.player.on(music.name, (...args) => music.execute(...args));
        //     }
        //     break;
        //   default:
        //     break;
        //   // console.log(`[Events Handler]; No event folder found with name "${folder}"`);
        // }
      }
    }
  };
};
