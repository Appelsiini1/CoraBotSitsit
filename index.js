// Require the necessary discord.js classes
const { Client, Intents, MessageEmbed } = require('discord.js');
const { token, VERSION } = require('./config.json');
const {} = require('./PunaMusta.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'info') {
		const embed = new MessageEmbed()
					.setColor('#FFCC99')
					.setDescription(`**Created by** Appelsiini1\nThe source code & development info for this bot can be found at https://github.com/Appelsiini1/CoraBotSitsit\n\nVersion: ${VERSION}`)
					.setThumbnail("https://media.discordapp.net/attachments/693166291468681227/834200862246043648/cora_pfp.png")
		await interaction.reply({embeds:[embed]});
	} else if (commandName === 'aloita') {
		await interaction.reply('In development.');
	}
});

// Login to Discord with your client's token
client.login(token);
