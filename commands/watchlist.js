const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const JsonHandler = require('../jsonHandler.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('watchlist')
        .setDescription('Displays the current LucyCavListr Watchlist.'),

    async execute(interaction){
        let moviesString = '';
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
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('forwards')
                    .setLabel('>')
                    .setStyle(ButtonStyle.Primary)
            );
        
        
        const embed = new EmbedBuilder()
            .setColor(0x084DA5)
            .setTitle("Lucy Cavendish Film Society Film List")
            .setDescription(moviesString) 
            .setFooter({text: "Page 1/" + pageCount});

        await interaction.reply({embeds: [embed], components: [row]})
    }
}