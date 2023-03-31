const fs = require("fs");

module.exports = (client) => {
  client.handleComponents = async () => {
    const componentsFolders = fs.readdirSync("./src/components");
    for (const folder of componentsFolders) {
      const componentFiles = fs
        .readdirSync(`./src/components/${folder}`)
        .filter((file) => file.endsWith(".js"));

        
      //make a switch case for each folder
      switch (folder) {
        case "buttons":
          for (const file of componentFiles) {
            const button = require(`../../components/${folder}/${file}`);
            client.buttons.set(button.data.name, button);
          }
          break;
        default:
          break;
      }
    }
  };
};
