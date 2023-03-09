const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const JsonHandler = require('../functions/jsonHandler.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('watchlist')
        .setDescription('Displays the current LucyCavListr Watchlist - split into pages for ease of use.'),

    async execute(interaction){
        let moviesString = '';
        let currentPage = 1;
        let pageCount = 1;

        movieList = await JsonHandler.GetListOfMovies();

        for (i in movieList){
            let j = parseInt(i) + 1;
            moviesString = moviesString.concat("**", j, ".** ", movieList[i], "\n");
        }

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('backwards')
                    .setLabel('<')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(true),
                new ButtonBuilder()
                    .setCustomId('forwards')
                    .setLabel('>')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(pageCount == 1)
            );
        
        
        const embed = new EmbedBuilder()
            .setColor(0x084DA5)
            .setTitle("Lucy Cavendish Film Society Film List")
            .setDescription(moviesString) 
            .setFooter({text: "Page "+ currentPage + "/" + pageCount});

        await interaction.reply({embeds: [embed], components: [row]})
    }
}