const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const JsonHandler = require('../functions/jsonHandler.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('showing')
        .setDescription("Tells you what film we're watching this week and at what time."),

    async execute(interaction){

        currentFilm = await JsonHandler.GetCurrentFilm();
        dateTime = await JsonHandler.GetDateTime();
        
        const embed = new EmbedBuilder()
            .setColor(0x084DA5)
            .setTitle("This Week's Film is...")
            .setDescription("**" + currentFilm + "**\n \n" + "We'll be watching it on: \n **" + dateTime + "** \n \n Be there or be square!") 

        await interaction.reply({embeds: [embed]})
    }
}