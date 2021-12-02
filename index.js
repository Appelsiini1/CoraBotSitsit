// Require the necessary discord.js classes
const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { token, VERSION } = require('./config.json');
const { Edition10 } = require('./PunaMusta.json');

const CORA_BLONDE = '#FFCC99';
const CORA_EYE = '#338B41';
const COLOUR_ERROR = '#FF0000';

const SONG_BOOKS = ["PunaMusta"];
const SPIN_GIF_URL = "https://imgur.com/maohyNQ";

let RUNTIME_SETTINGS = {};


function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
};

function LogErrorToConsole(err) {
	let timestamp = new Date()
	console.log(timestamp)
	console.log(err)
}

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
	client.user.setPresence({
        activities: [{ name: "Sitsit", type: "LISTENING" }],
        status: "online",
    });
});

client.on('interactionCreate', async interaction => {
	if (interaction.isCommand()) {

	const { commandName } = interaction;

	if (commandName === 'ping') {
		try {
			await interaction.reply('Pong!');
		} catch (err) {
			LogErrorToConsole(err);
		}
	} else if (commandName === 'info') {
		try {
			const embed = new MessageEmbed()
						.setColor(CORA_BLONDE)
						.setDescription(`**Created by** Appelsiini1\n\nThe source code & development info for this bot can be found at https://github.com/Appelsiini1/CoraBotSitsit\nProfile picture by: https://www.instagram.com/shannoniganz_art/\n\nVersion: ${VERSION}`)
						.setThumbnail("https://media.discordapp.net/attachments/693166291468681227/834200862246043648/cora_pfp.png")
			await interaction.reply({embeds:[embed]});
		} catch (err) {
			LogErrorToConsole(err);
		}
	} else if (commandName === 'aloita') {
		try {
			await interaction.deferReply()
			const embed = new MessageEmbed()
						.setColor(CORA_BLONDE)
						.setTitle("Valitse laulukirja/Select song book to use:");
			
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId("SB-punamusta")
						.setLabel("PunaMusta")
						.setStyle("PRIMARY"),
				);
			await interaction.followUp({embeds: [embed], components: [row]});
		} catch (err) {
			LogErrorToConsole(err);
		}

	}
	} else if (interaction.isButton()) {
		try {
			await interaction.deferReply()

			const interactionType = interaction.customId.split("-")[0];
			const intereactionID = interaction.customId.split("-")[1];
			const channelID = interaction.channelId;

			if (interactionType === "SB") {
				if (intereactionID === "punamusta") {
					RUNTIME_SETTINGS[channelID] = {"SongBook": {"title" : "PunaMusta", "Songs": Edition10}};

					const embed = new MessageEmbed()
						.setColor(CORA_BLONDE)
						.setTitle("Valitse toiminto/Select action:");
			
					const row = new MessageActionRow()
						.addComponents(
							new MessageButton()
								.setCustomId("A-song")
								.setLabel("Arvo laulu/Song raffle")
								.setStyle("PRIMARY"),
						);

					interaction.followUp({embeds: [embed], components: [row]});
				}

			} else if (interactionType === "A") {
				const row = new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setCustomId("A-song")
							.setLabel("Arvo laulu/Song raffle")
							.setStyle("PRIMARY"),
					);
				
				randInt = randomIntFromInterval(0, RUNTIME_SETTINGS[channelID]["SongBook"]["Songs"].length-1);
				const selected = RUNTIME_SETTINGS[channelID]["SongBook"]["Songs"][randInt];
				/*RUNTIME_SETTINGS[channelID]["SongBook"]["Songs"].splice(randInt, 1);*/

				await interaction.followUp(SPIN_GIF_URL);

				const embed2 = new MessageEmbed()
					.setColor(CORA_EYE)
					.setTitle(selected);
				setTimeout(() => {  interaction.followUp({ embeds: [embed2], components: [row]}); }, 11500);

			}
			
	} catch(err) {
		LogErrorToConsole(err);
	}
	}

	
	});

// Login to Discord with your client's token
client.login(token);
