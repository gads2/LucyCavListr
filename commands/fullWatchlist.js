const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const JsonHandler = require('../functions/jsonHandler.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('fullwatchlist')
        .setDescription('Displays the full current LucyCavListr Watchlist.'),

    async execute(interaction){
        let moviesString = '';
        //may need to add pages back if we hit character limit but i believe in us

        movieList = await JsonHandler.GetListOfMovies();

        for (i in movieList){
            let j = parseInt(i) + 1;
            moviesString = moviesString.concat("**", j, ".** ", movieList[i], "\n");
        }    
        
        const embed = new EmbedBuilder()
            .setColor(0x084DA5)
            .setTitle("Lucy Cavendish Film Society Film List")
            .setDescription(moviesString) 

        await interaction.reply({embeds: [embed]})
    }
}