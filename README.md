# typscript-discord-bot
A very simple discord bot written in typescript

## To run this code, you will need to install the following dependencies and follow these steps:

To install and run this script, follow these steps:

1. Make sure you have Node.js and npm (Node Package Manager) installed on your system.
2. Create a new folder for your bot and navigate to it in your terminal.
3. Create a new file named index.ts and copy the code into it.
4. Install the required dependencies by running the command `npm install discord.js googleapis dotenv`.
5. Create a new file named .env in the same directory as index.ts and add your Discord bot token and YouTube API key to it:

```
BOT_TOKEN=<your bot token>
YOUTUBE_API_KEY=<your YouTube API key>
```

6. Replace the statsChannelId and youtubeChannelId variables with the IDs of the channels you want to use for server statistics and new YouTube video notifications.
7. Run the command `npx tsc index.ts` to compile the TypeScript code into JavaScript.
8. Run the command `node index.js` to start the bot.

That's it! Your bot should now be online and ready to use. You can invite it to your Discord server by generating an invite link using the Discord Developer Portal.
