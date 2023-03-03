const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ActivityType,
} = require("discord.js");
const eventHandler = require("./handlers/eventHandler");
require("dotenv").config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

eventHandler(client);

client.login(process.env.TOKEN);

let status = [
  {
    name: "trip|EZ CTRL",
    type: ActivityType.Streaming,
    url: "https://www.youtube.com/watch?v=3Lv-diPfhSk",
  },
  {
    name: "Custom Status 1",
  },
  {
    name: "Custom Status 2",
    type: ActivityType.Watching,
  },
  {
    name: "Custom Status 3",
    type: ActivityType.Listening,
  },
];

client.on("ready", (c) => {
  // console.log(`✅ ${c.user.tag} is online.`);
  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 10000);
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
  // console.log(interaction);
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
  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed title")
      .setDescription("This is an embed description")
      .setColor("Random")
      .addFields(
        {
          name: "first Field title",
          value: "some random value",
          inline: true,
        },
        {
          name: "second Field title",
          value: "some random value",
          inline: true,
        }
      );

    interaction.reply({ embeds: [embed] });
  }
});
client.on("messageCreate", (message) => {
  if (message.content === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed title")
      .setDescription("This is an embed description")
      .setColor("Random")
      .addFields(
        {
          name: "first Field title",
          value: "some random value",
          inline: true,
        },
        {
          name: "second Field title",
          value: "some random value",
          inline: true,
        }
      );
    message.channel.send({ embeds: [embed] });
  }
});
client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isButton()) return;
    await interaction.deferReply({ ephemeral: true });

    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
      interaction.editReply({
        content: "I couldn't find that role",
      });
      return;
    }
    const hasRole = interaction.member.roles.cache.has(role.id);
    if (hasRole) {
      await interaction.member.roles.remove(role);
      await interaction.editReply(`The role ${role} has been removed`);
      return;
    }
    await interaction.member.roles.add(role);
    await interaction.editReply(`The role ${role} has been added`);
  } catch (error) {
    console.log(error.message);
  }
});
