const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const {version,dependencies} = require("../package.json")

const data = new SlashCommandBuilder()
	.setName('info')
	.setDescription('Get Information!');

async function exec(args) {
  const interaction = args[0];
  //console.log(args)
  const client = interaction.client
  const commands = [...client.application.commands.cache];
  commands.forEach((command)=>{
    if (!command[1].description) commands.splice(commands.indexOf(command),1)
  })
  //console.log(commands)
  const embed = new EmbedBuilder()
    .setTitle("Information")
    .setDescription("Information about Equalis Bot")
    .addFields(
      {
        "name":"Version",
        "value":version
      },
      {
        "name":"Commands",
        "value":commands.map((command)=>{return `</${command[1].name}:${command[1].id}>`}).join(", ")
      },
      {
        "name":"Dependencies",
        "value":Object.keys(dependencies).join(", ")
      },
      {
        "name":"Changelog",
        "value":"Added /birthday and automatic birthday message sending!"
      }
    )
  await interaction.editReply({embeds:[embed]})
}
module.exports = {
  exec,
  data
}