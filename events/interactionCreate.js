const {Events} = require('discord.js');
const EmbedHandler = require('../functions/watchListEmbedBuilder');

module.exports = {
    name : Events.InteractionCreate,

    async execute(interaction){
        if(interaction.isChatInputCommand()){
	
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
                	await interaction.followUp({ content: `There was an error while executing ${interaction.commandName}!`, ephemeral: true});
                	console.error(error);
		    	}
		    	else{
			    	await interaction.reply({content: `There was an error while executing ${interaction.commandName}!`, ephemeral: true});
                	console.error(error);
            	}
			}
		}
		else if(interaction.isButton()){
			const {customId} = interaction;

			if(customId == "forwards" || customId == "backwards"){
				EmbedHandler.ProgressPage(customId);
				embed = EmbedHandler.CreateEmbed();
				if(embed == "outdated instance"){
					await interaction.reply({content: "This is an outdated instance - try /watchlist again to get a new one! :)", ephemeral: true});
				}
				else{
					row = EmbedHandler.CreateRow();

					const message = interaction.message;
					message.edit({embeds: [embed], components: [row]}); 

					interaction.deferUpdate();
				}
			}
			else{
				await interaction.reply({content: `Unknown button pressed.`, ephemeral: true});
			}
		}
    }
}