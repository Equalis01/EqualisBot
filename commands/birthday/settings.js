const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config()
const db = require('monk')(process.env.mongodb)

const users = db.get('users')

async function exec(args) {
  const interaction = args[0];
  
  const client = interaction.client
  
  const ddmmyy = interaction.options.getBoolean("ddmmyy") ?? false
  
  if (ddmmyy === null) {
    //no settings changed
    await interaction.editReply({embeds:[new EmbedBuilder()
      .setTitle("No Settings Changed")  
      .setDescription("No changes have been made")]})
    return;
  }
  let olduser = await users.findOne({id:interaction.user.id})
  let oldmonth = (olduser.birthdayMonth ?? null)
  let oldday = (olduser.birthdayDay ?? null)
  await users.findOneAndDelete({id:interaction.user.id});
  await users.insert({id:interaction.user.id, birthdayMonth: oldmonth, birthdayDay:oldday,ddmmyy:ddmmyy})
  const embed = new EmbedBuilder()
    .setTitle("Settings Changed")
    .setDescription("Your settings have been saved.")
  await interaction.editReply({embeds:[embed]})
}
module.exports = {
  exec
}