const { Client, IntentsBitField } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online.`);
});
client.on("messageCreate", (message) => {
  console.log(message.author.username);
  if (message.author.bot) {
    return;
  }
  if (message.content) {
    return message.reply(`${message.author.username} said ${message.content}`);
  }
});

client.login(process.env.TOKEN);
