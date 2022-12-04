const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config()
const db = require('monk')(process.env.mongodb)

const users = db.get('users')

async function exec(args) {
  const interaction = args[0];
  
  const client = interaction.client

  const target = interaction.options.getUser("target")

  let results = await users.findOne({id:target.id})
  try {
    let embed = new EmbedBuilder()
    .setTitle("Birthday")
    .setDescription(target.username+"'s birthday is "+(results.ddmmyy ? results.birthdayDay+"/"+results.birthdayMonth : results.birthdayMonth+"/"+results.birthdayDay))
    await interaction.editReply({embeds:[embed]})
  } catch (e) {
    //user does not have a birthday set
    let embed = new EmbedBuilder()
      .setTitle("Birthday")
      .setDescription(target.username+" does not have a birthday currently set. They can use </birthday set:0> to set it.")
      .setColor(0xE10600)
    await interaction.editReply({embeds:[embed]})
  }
  
}
module.exports = {
  exec
}