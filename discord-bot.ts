// A simple discord bot written in typescript

import Discord from 'discord.js';

// Create a new Discord client
const client = new Discord.Client();

// Define the prefix for the bot's commands
const prefix = '!';

// Event listener for when the client is ready
client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

// Event listener for when the bot receives a message
client.on('message', async (message: Discord.Message) => {
  // Ignore messages sent by bots or messages without the prefix
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  // Split the message into the command and arguments
  const [command, ...args] = message.content.slice(prefix.length).trim().split(/ +/);

  // Handle different commands
  if (command === 'ping') {
    // Reply with 'Pong!'
    message.reply('Pong!');
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
  }
});

// Log in to Discord with the bot's token
client.login('your-bot-token-here');