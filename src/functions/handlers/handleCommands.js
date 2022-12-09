const fs = require("fs");
const { REST, Routes } = require("discord.js");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
        client.commandsArray.push(command.data.toJSON());
      }
    }

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    //deploy the commands
    (async () => {
      try {
        console.log("Started refreshing application (/) commands...");

        await rest.put(
          Routes.applicationGuildCommands(
            process.env.CLIENT_ID,
            process.env.GUILD_ID
          ),
          {
            body: client.commandsArray,
          }
        );

        console.log("Successfully reloaded application (/) commands");
      } catch (error) {
        console.error(error);
      }
    })();
  };
};
