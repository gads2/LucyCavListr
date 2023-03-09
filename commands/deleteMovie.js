const { SlashCommandBuilder } = require('discord.js');
const JsonHandler = require('../functions/jsonHandler.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Removes a movie from the LucyCavListr Watchlist.')
        .addStringOption(option =>
            option.setName('movie_name')
                .setDescription('The name of the movie to remove.')
                .setRequired(true)),

    async execute(interaction){
        const movieName = interaction.options.getString('movie_name');
        let removed = await JsonHandler.DeleteFromJSON(movieName);
        if(removed){
            await interaction.reply("'" +movieName + "' successfully removed.");
        }
        else{
            await interaction.reply('That movie was not in the watchlist!');
        }
    }
}