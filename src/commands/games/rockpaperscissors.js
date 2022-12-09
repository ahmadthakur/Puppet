const { SlashCommandBuilder } = require("discord.js");
const { RockPaperScissors } = require("discord-gamecord");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rockpaperscissors")
    .setDescription("Rock Paper Scissors")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to spank")
        .setRequired(true)
    ),
  async execute(interaction) {
    const Game = new RockPaperScissors({
      message: interaction,
      isSlashGame: true,
      opponent: interaction.options.getUser("user"),
      embed: {
        title: "Rock Paper Scissors",
        color: "Random",
        description: "Press a button below to make a choice.",
      },
      buttons: {
        rock: "Rock",
        paper: "Paper",
        scissors: "Scissors",
      },
      emojis: {
        rock: "🌑",
        paper: "📜",
        scissors: "✂️",
      },
      timeoutTime: 60000,
      buttonStyle: "PRIMARY",
      pickMessage: "You choose {emoji}.",
      winMessage: "**{player}** won the Game! Congratulations!",
      tieMessage: "The Game tied! No one won the Game!",
      timeoutMessage: "The Game went unfinished! No one won the Game!",
      playerOnlyMessage: "Only {player} and {opponent} can use these buttons.",
    });

    Game.startGame();
    Game.on("gameOver", (result) => {
      console.log(result); // =>  { result... }
    });
  },
};
