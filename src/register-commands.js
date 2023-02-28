require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "hey",
    description: "replies with hey!",
  },
  {
    name: "love",
    description: "love? get out!! go away !! go to hell",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering slash commands......");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log("slash commands were registered !");
  } catch (error) {
    console.log(error.message);
  }
})();
