import axios from 'axios';
import { Client, Message } from 'discord.js';
import { YTSearchListResponse } from 'googleapis/youtube/v3';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client();
const prefix = '!'; // change this to your bot's command prefix
const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;
const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const statsChannelId = 'your_stats_channel_id'; // change this to the ID of your server statistics channel
const youtubeChannelId = 'your_youtube_channel_id'; // change this to the ID of your YouTube notifications channel

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('message', async (message: Message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift()?.toLowerCase();

  if (command === 'ping') {
    const startTime = Date.now();
    const reply = await message.channel.send('Pinging...');
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    reply.edit(`Pong! Response time: ${responseTime}ms`);
  } else if (command === 'mute') {
    if (!message.member?.hasPermission('MUTE_MEMBERS')) {
      message.channel.send('You do not have permission to use this command.');
      return;
    }

    const user = message.mentions.members?.first();
    if (!user) {
      message.channel.send('Please mention a user to mute.');
      return;
    }

    const isMuted = user.voice.serverMute;
    await user.voice.setMute(!isMuted);
    message.channel.send(`${user} has been ${isMuted ? 'unmuted' : 'muted'}.`);
  } else if (command === 'file') {
    const fileName = args[0];
    if (!fileName) {
      message.channel.send('Please specify a file name.');
      return;
    }

    try {
      const data = require(`./${fileName}`);
      message.channel.send(`\`\`\`${data}\`\`\``);
    } catch (error) {
      console.error(error);
      message.channel.send(`Sorry, I could not find the file "${fileName}".`);
    }
  } else if (command === 'poll') {
    const question = args.join(' ');
    if (!question) {
      message.channel.send('Please provide a question for the poll.');
      return;
    }

    const pollMessage = await message.channel.send(`📊 ${question}`);

    await pollMessage.react('👍');
    await pollMessage.react('👎');
  } else if (command === 'weather') {
    const city = args.join(' ');
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${openWeatherApiKey}`;

    try {
      const response = await axios.get(apiUrl);
      const weatherData = response.data;
      const weatherDescription = weatherData.weather[0].description;
      const temperature = weatherData.main.temp;
      const feelsLike = weatherData.main.feels_like;

      message.channel.send(`Current weather in ${city}: ${weatherDescription}, ${temperature}°C (feels like ${feelsLike}°C)`);
    } catch (error) {
      console.error(error);
      message.channel.send('Sorry

// End of script
