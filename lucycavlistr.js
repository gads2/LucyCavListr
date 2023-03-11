// Require necessary node classes
const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const { Client, Collection, ActivityType, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds], 
							presence: {
								activities: [{
									name: "'Who framed Roger Rabbit?'",
									type: ActivityType.Watching
								}]
							}});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for(const file of commandFiles){
	const filePath = path.join(commandsPath, file);
	const command = require(filePath); //loads file basically (as above with config)
	
	// Set a new item in the Collection with the key as the command name and the value as the exported module

	if('data' in command && 'execute' in command){
		client.commands.set(command.data.name, command);
		console.log(`${filePath}`);
	}
	else{
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
	}
}

for(const file of eventFiles){
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);

	if(event.once){
		client.once(event.name, (...args) => event.execute(...args));
	}
	else{
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Log in to Discord with your client's token
client.login(token);

