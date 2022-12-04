const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config()
const db = require('monk')(process.env.mongodb)
const { EmbedBuilder } = require('discord.js');
const users = db.get('users')

async function exec(args) {
  const client = args[0]
  console.log(`🆔 Logged in ${client.user.username} (${client.user.id})`);
  console.log(client.guilds.cache.map(e=>e.id))
  const commands = [];
  const commandsPath = path.join(__dirname, '../commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
  }
  client.application.commands.set([])
  client.application.commands.set(commands,"1015313028985671680").catch((e)=>{
    console.error(e.rawError)
  });
  console.log("=======================")
  commands.forEach((command) => {
    if (command.description) {
      console.log(`= ✅ /${command.name} : ${command.description}`)
    } else {
      console.log(`= ✅ ☰ ${command.name}`)
    }
  })
  if (commands.length === 0) console.log("= No Slash Commands")
  console.log("=======================")
  client.user.setPresence({ activities: [{ name: 'with discord.js' }], status: 'idle' });
  var interval = setInterval(async () => {
    date = new Date();
    let birthday_users = await users.find({
      birthdayDay:date.getDate(),
      birthdayMonth:date.getMonth()+1
    })
    if (birthday_users.length === 0) return;
    let mapped_users = birthday_users.map((user)=>{return "<@"+user.id+">"})
    let message = "Today it is "+ (mapped_users.length == 2 ? mapped_users.join(" and ") : mapped_users.join(", ")) + "'s birthday!"
    let embed = new EmbedBuilder()
    .setTitle("🥳 Today's Birthdays 🥳")
    .setDescription(message)
    let channel = await client.channels.fetch("1048997805349408828")
    channel.send({ embeds: [embed] })
  }, 15000);
}

module.exports = {
  exec
};