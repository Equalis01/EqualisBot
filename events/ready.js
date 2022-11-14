const fs = require('node:fs');
const path = require('node:path');

function exec(args) {
  const client = args[0]
  console.log(`🆔 Logged in ${client.user.username} (${client.user.id})`);
  const commands = [];
  const commandsPath = path.join(__dirname, '../commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
  }

  client.application.commands.set(commands,"1041059309708124212").catch((e)=>{
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
}

module.exports = {
  exec
};