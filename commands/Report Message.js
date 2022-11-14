const { ContextMenuCommandBuilder, EmbedBuilder, ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


const data = new ContextMenuCommandBuilder()
  .setName('Report Message')
  .setType(ApplicationCommandType.Message)

async function exec(args) {
  const interaction = args[0];
  const target = interaction.targetMessage;
  //console.log(target)
  const embed = new EmbedBuilder()
    .setTitle("Reported Message")
    .setDescription(`Message reported by ${interaction.user.username}#${interaction.user.discriminator}`)
    .setAuthor({ "name": `${target.author.username}#${target.author.discriminator}`, "iconURL": target.author.avatarURL() })
    .setFooter({ "text": target.id })
    .setColor(0xED4245)
    .addFields([
      {"name":"Content","value":target.content},
      {"name":"Date","value":`${target.createdAt}`}
    ])
  const row = new ActionRowBuilder()
			.addComponents(
        new ButtonBuilder()
          .setLabel('Delete Message')
          .setStyle(ButtonStyle.Danger)
          .setCustomId('button-delete'),
				new ButtonBuilder()
					.setLabel('Visit Message')
					.setStyle(ButtonStyle.Link)
          .setURL(target.url),
			);
  await interaction.reply({"content":"Reported!","ephemeral":true})
  let channel = await interaction.client.channels.fetch("1015314333158342777")
  channel.send({ embeds: [embed], components:[row] })
}
module.exports = {
  exec,
  data
}