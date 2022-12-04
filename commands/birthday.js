const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('birthday')
	.setDescription('Birthday!')
  .addSubcommand(subcommand =>
		subcommand
			.setName('set')
			.setDescription('Set your birthday!')
      .addIntegerOption(option=>
        option.setName("month")
              .setRequired(true)
              .setDescription("Your birthday month!")
              .setMinValue(1)
              .setMaxValue(12))
      .addIntegerOption(option=>
        option.setName("day")
              .setRequired(true)
              .setDescription("Your birthday!")
              .setMinValue(1)
              .setMaxValue(31)))
  .addSubcommand(subcommand =>
		subcommand
			.setName('view')
			.setDescription('View your birthday!')
      .addUserOption(option=>
        option.setName("target")
              .setDescription("View someone's birthday!")
              .setRequired(true)))
  .addSubcommand(subcommand =>
		subcommand
			.setName('settings')
			.setDescription('Adjust your settings!')
      .addBooleanOption(option=>
        option.setName("ddmmyy")
              .setDescription("DD/MM/YY Format?")
              .setRequired(false)));

async function exec(args) {
  const interaction = args[0]
  require("./"+data.name+"/"+interaction.options.getSubcommand()).exec(args)
}
module.exports = {
  exec,
  data
}