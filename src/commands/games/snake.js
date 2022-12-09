const { SlashCommandBuilder } = require("discord.js");
const { Snake } = require("discord-gamecord");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("snake")
    .setDescription("Play Snake!"),
  async execute(interaction) {
    const Game = new Snake({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: "Snake Game",
        overTitle: "Game Over",
        color: "Random",
      },
      emojis: {
        board: "⬛",
        food: "🍎",
        up: "⬆️",
        down: "⬇️",
        left: "⬅️",
        right: "➡️",
      },
      snake: { head: "🟢", body: "🟩", tail: "🟢", over: "💀" },
      foods: ["🍎", "🍇", "🍊", "🫐", "🥕", "🥝", "🌽"],
      stopButton: "Stop",
      timeoutTime: 60000,
      playerOnlyMessage: "Only {player} can use these buttons.",
    });

    Game.startGame();
    Game.on("gameOver", (result) => {
      console.log(result); // =>  { result... }
    });
  },
};
