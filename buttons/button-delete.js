async function exec(interaction) {
  await interaction.deferUpdate();
  let buttonurl = interaction.message.components[0].components[1].data.url.split("/")
  let channelID = buttonurl[5]
  let messageID = buttonurl[6]
  let channel = await interaction.client.channels.fetch(channelID);
  let message = await channel.messages.fetch(messageID)
  await message.delete()
	await interaction.editReply({ content: 'Message Deleted', components: [] });
}

module.exports = {
  exec
};