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

client.login(process.env.TOKEN);

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
});
client.on("messageCreate", (message) => {
  // console.log(message.author.username);
  if (message.author.bot) {
    return;
  }
  if (message.content) {
    return message.reply(
      `${message.author.username}님이 " ${message.content} " 라고 말씀하시네요...😆`
    );
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction);
  if (interaction.commandName === "hey") {
    interaction.reply(`${interaction.user.username} command "/hey"`);
  }
  if (interaction.commandName === "love") {
    interaction.reply(
      `${interaction.user.username}<--- you!! 나가 뒈져!! 개나 줘버렷 !!`
    );
  }
  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number")?.value;
    const num2 = interaction.options.get("second-number")?.value;
    interaction.reply(`the sum is ${Number(num1) + num2}`);
  }
});
