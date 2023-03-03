const { SlashCommandBuilder } = require('discord.js');
const JsonHandler = require('../jsonHandler.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('add')
        .setDescription('Adds a movie to the LucyCavListr Watchlist.')
        .addStringOption(option =>
            option.setName('movie_name')
                .setDescription('The movie to add.')
                .setRequired(true)),

    async execute(interaction){
        const movieName = interaction.options.getString('movie_name');
        movieList = await JsonHandler.AppendtoJSON(movieName);

        await interaction.reply(movieName + " added to Watchlist.");
    }
}