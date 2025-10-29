require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs-extra');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Example: simple ping command
client.on('messageCreate', async message => {
    if(message.author.bot) return;

    if(message.content === '!ping'){
        message.channel.send('Pong! 🏓');
    }
});

// Keep track of lastActive timestamp in GitHub workflow
setInterval(() => {
    const ts = Date.now();
    fs.writeJsonSync('updates.json', { lastActive: ts }, { spaces: 2 });
}, 1000 * 60 * 5); // every 5 minutes

client.login(process.env.DISCORD_TOKEN);
