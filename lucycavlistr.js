// Require necessary node classes
const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for(const file of commandFiles){
	const filePath = path.join(commandsPath, file);
	const command = require(filePath); //loads file basically (as above with config)
	
	// Set a new item in the Collection with the key as the command name and the value as the exported module

	if('data' in command && 'execute' in command){
		client.commands.set(command.data.name, command);
	}
	else{
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
	}
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, interaction => {
	if(!interaction.isChatInputCommand()) return;
	
	const command = interaction.client.commands.get(interaction.commandName);

	if(!command){
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try{
		await command.execute(interaction);
	}
	catch(error){
		console.error(error);
		if(interaction.replied || interaction.deferred){
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true});
		}
		else{
			await interaction.reply({content: 'There was an error while executing this commdand!', ephemeral = true});
		}
	}
});

// Log in to Discord with your client's token
client.login(token);


/*const { REST, Routes } = require('discord.js');

const commands = [
	{
		name: 'ping',
		description: 'Replies with Pong!',
	},
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();*/