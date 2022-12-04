const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config()
const db = require('monk')(process.env.mongodb)

const months = [31,28,31,30,31,30,31,31,30,31,30,31]
const users = db.get('users')

async function exec(args) {
  const interaction = args[0];
  
  const client = interaction.client
  
  const month = interaction.options.getInteger("month")
  const day = interaction.options.getInteger("day")
  
  if (day > months[month-1]) {
    //invalid date
    await interaction.editReply({embeds:[new EmbedBuilder()
      .setTitle("Invalid Birthday")  
      .setDescription("The birthday you submitted is invalid")
      .setColor(0xE10600)]})
    return;
  }
  let olduser = (await users.find({id:interaction.user.id}))[0] ?? {}
  let oldddmmyy = (olduser.hasOwnProperty("ddmmyy") ? olduser.ddmmyy : false)
  await users.findOneAndDelete({id:interaction.user.id});
  await users.insert({id:interaction.user.id, birthdayMonth: month, birthdayDay:day,ddmmyy:oldddmmyy})
  const embed = new EmbedBuilder()
    .setTitle("Birthday")
    .setDescription("Your birthday is "+(oldddmmyy ? day+"/"+month : month+"/"+day)+"/"+(new Date().getYear()-100))
  await interaction.editReply({embeds:[embed]})
}
module.exports = {
  exec
}