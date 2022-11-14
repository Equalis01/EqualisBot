async function exec(args) {
  const interaction = args[0]
  //console.log(interaction)
  if (interaction.isButton()) {
    require("../buttons/"+interaction.customId).exec(interaction)
  } else if (interaction.isCommand()) {
    await interaction.deferReply()
    require("../commands/"+interaction.commandName).exec(args)
  } else if (interaction.isSelectMenu()) {
    require("../selectmenu/"+interaction.customId).exec(args)
  } else if (interaction.isModalSubmit()) {
    require("../forms/"+interaction.customId).exec(args)
  }  else
  {
    await interaction.editReply("uhhh ok")
  }
}

module.exports = {
  exec
};