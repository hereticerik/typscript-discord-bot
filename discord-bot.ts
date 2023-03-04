import Discord from 'discord.js';
import fs from 'fs';
import dotenv from 'dotenv';
import { google } from 'googleapis';

// Load the environment variables from the .env file
dotenv.config();

// Retrieve the bot token and YouTube API key from the environment variables
const token = process.env.BOT_TOKEN;
const apiKey = process.env.YOUTUBE_API_KEY;

// Create a new Discord client
const client = new Discord.Client();

// Define the prefix for the bot's commands
const prefix = '!';

// Define a Map to store the muted users and their timeout IDs
const mutedUsers = new Map<Discord.User, NodeJS.Timeout>();

// Define a Map to store custom commands and their file paths
const customCommands = new Map<string, string>();

// Define a Map to store active polls and their results
const activePolls = new Map<string, { options: string[], votes: number[] }>();

// Define the ID of the channel for printing server statistics
const statsChannelId = '123456789012345678';

// Define the ID of the channel for posting new YouTube videos
const youtubeChannelId = 'UC123456789012345678';

// Define the interval for checking the YouTube channel (in seconds)
const youtubeCheckInterval = 300;

// Create a new YouTube Data API client
const youtube = google.youtube({
  version: 'v3',
  auth: apiKey
});

// Event listener for when the client is ready
client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);

  // Start checking the YouTube channel for new videos
  setInterval(checkYouTubeChannel, youtubeCheckInterval * 1000);
});

// Event listener for when the bot receives a message
client.on('message', async (message: Discord.Message) => {
  // Ignore messages sent by bots or messages without the prefix
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  // Split the message into the command and arguments
  const [command, ...args] = message.content.slice(prefix.length).trim().split(/ +/);

  // Handle different commands
  if (command === 'ping') {
    // Calculate the response time
    const startTime = Date.now();
    const reply = await message.reply('Pinging...');
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // Edit the reply with the response time
    reply.edit(`Pong! Response time: ${responseTime}ms`);
  } else if (command === 'hello') {
    // Reply with 'Hello!'
    message.reply('Hello!');
  } else if (command === 'kick') {
    // Check if the user has the 'KICK_MEMBERS' permission
    if (!message.member?.hasPermission('KICK_MEMBERS')) {
      message.reply("You don't have permission to kick members.");
      return;
    }

    // Get the user to kick
    const user = message.mentions.users.first();
    if (!user) {
      message.reply('You must mention a user to kick.');
      return;
    }

    // Kick the user
    try {
      const member = await message.guild?.members.fetch(user);
      await member?.kick();
      message.reply(`Kicked ${user.tag}.`);
    } catch (error) {
      console.error(error);
      message.reply('An error occurred while trying to kick the user.');
    }
  } else if (command === 'mute') {
    // Check if the user has the 'MANAGE_ROLES' permission
    if (!message.member?.hasPermission

// End of script 
