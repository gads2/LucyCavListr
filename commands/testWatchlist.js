const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const JsonHandler = require('../functions/jsonHandler.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('test')
        .setDescription('Displays the current LucyCavListr Watchlist - split into pages for ease of use.'),

    async execute(interaction){
        let currentPage = 1;
        let pageCount = 1;
        let pageList = [];
        pageList.push('');

        movieList = await JsonHandler.GetListOfMovies();

        let k = 0;
        let fullPages = 0;
        for (i in movieList){
            if(k == 25){
                k = 0;
                pageList.push('');
                fullPages++;
                pageCount++;
            }

            let j = parseInt(i) + 1;
            pageList[fullPages] = pageList[fullPages].concat("**", j, ".** ", movieList[i], "\n");
            k++;
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
            .setDescription(pageList[0]) 
            .setFooter({text: "Page "+ currentPage + "/" + pageCount});

        await interaction.reply({embeds: [embed], components: [row]})
    }
}