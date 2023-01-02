# Sad Machine

A Discord bot built using [Discord.js](https://discord.js.org/#/)

**Note:** This bot is still a work in progress and new features are being added on a regular basis. As a result, things may break from time to time. I apologize for any inconvenience this may cause. If you would like to contribute to the development of the bot, feel free to make a pull request.

## Features :sparkles:

-   Music: Play songs from YouTube, Spotify, and SoundCloud by using the `/play` command.
-   GIFs: Use GIFs to interact with other users such as `/hug`, `/slap`, `/punch` etc.
-   Information: Get information on various stuff such as `/weather`, `/anime`, `/manga`, etc.
-   Truth or Dare: Play a game of truth or dare by using `/truth` or `/dare`.

## Slash Commands :keyboard:

This bot uses slash commands to perform its various functions. You can see all the available commands in the source code. Here are some of the commands.

-   `/play` Play a song from YouTube.
-   `/weather` Get the current weather for a location.
-   `/anime` Search for information about an anime.
-   `/tictactoe` Play a game of tic-tac-toe.
-   `/horoscope` Check out your horoscope for yesterday, today or tomorrow.

## Getting Started :rocket:

To add this bot to your Discord server, you will need to follow these steps:

1.  Clone the repository using `git clone https://github.com/Sushipie/Sad_Machine.git`.
2.  Add your api keys in given `.env.example` and rename it to `.env`.
3.  Navigate to the folder, open the terminal, and run `npm install`. Then run `npm run src/index.js`.

## Hosting :cloud:

I am hosting the bot on Fly.io. It is a great alternative to Heroku's free tier that has been shut down. If you want to host your own bot, you can follow these steps:

1.  Sign up for a [Fly.io account](https://fly.io/)
2.  Install the [Fly CLI](https://fly.io/docs/hands-on/install-flyctl/) 
3.  Authenticate with Fly by running `flyctl auth login` and following the prompts
4.  Create a new Fly app by running `flyctl launch` from your bot's directory

Fly.io will create a `fly.toml` file that basically configures the remote machine your app runs on. You need to add the following lines to the file to make your bot run on their servers.
`[build]
  builder = "heroku/buildpacks:20"`

You also need to add a `Procfile` in the bot's directory with the following line:
`worker: node src/index.js`

After following these steps, your bot should be up and running on your Discord server. :white_check_mark: