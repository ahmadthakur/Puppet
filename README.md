# Sad Machine

A Discord bot built using [Discord.js](https://discord.js.org/#/)

**Note:** This bot is still a work in progress and new features are being added on a regular basis. As a result, things may break from time to time. I apologize for any inconvenience this may cause. If you would like to contribute to the development of the bot, feel free to make a pull request.

## Features :sparkles:

- **Moderation:** Basic moderation like `/kick`, `/ban`, `/mute`, and `/lock`
- **Music:** Play songs from YouTube, Spotify, and SoundCloud by using the `/play` command
- **GPT-3:** GPT-3 integration, which enables advanced language processing capabilities such as text generation and question answering using [Cohere API](https://cohere.ai/)
- **Information:** Get information on various stuff such as `/weather`, `/anime`, `/manga`, `/book`, etc.
- **Games:** Play games such as `/truth` or `/dare` and `tictactoe`

## Slash Commands :keyboard:

This bot uses slash commands to perform its various functions. You can see all the available commands in the source code.

## Getting Started :rocket:

To add this bot to your Discord server, you will need to follow these steps:

1. Install [Node.js](https://nodejs.org/en/download/), which is required to run the bot
2. Create a bot application on the [Discord developer portal](https://discord.com/developers)
3. Invite the bot to your Discord server by generating an invite link from the Discord developer portal
4. Clone the repository using `git clone https://github.com/Sushipie/Sad_Machine.git`
5. Configure the bot by creating a .env file in the root directory and adding necessary environment variables such as the bot token, Tenor API key, and Cohere API key if necessary. You can look at the included `.env.example` file as an example
6. Navigate to the folder and run `npm install`. This will install the required dependencies for your bot
7. Run the bot using the command  `src/node index.js`

## Hosting :cloud:
 
I am hosting the bot on Fly.io. It is a great alternative to Heroku's free tier that has been shut down. If you want to host your own bot, you can follow these steps:

1. Sign up for a [Fly.io account](https://fly.io/)
2. Install the [Fly CLI](https://fly.io/docs/hands-on/install-flyctl/)
3. Authenticate with Fly by running `flyctl auth login` and following the prompts
4. Create a new Fly app by running `flyctl launch` from your bot's directory

Fly.io will create a `fly.toml` file that basically configures the remote machine your app runs on. You need to add the following lines to the file to make your bot run on their servers
```
[build] 
	builder = "heroku/buildpacks:20"
```
  
You also need to add a `Procfile` in the bot's directory with the following line:
```
worker: node src/index.js
```

After following these steps, your bot should be up and running on your Discord server. :white_check_mark: