const { SlashCommandBuilder } = require('discord.js');
const JsonHandler = require('../functions/jsonHandler.js');
const EmbedHandler = require('../functions/watchListEmbedBuilder');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('test')
        .setDescription('Displays the current LucyCavListr Watchlist - split into pages for ease of use.'),

    async execute(interaction){
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
            }

            let j = parseInt(i) + 1;
            pageList[fullPages] = pageList[fullPages].concat("**", j, ".** ", movieList[i], "\n");
            k++;
        }

        EmbedHandler.InitialiseVariables(pageList);

        const row = EmbedHandler.CreateRow();
        const embed = EmbedHandler.CreateEmbed();

        await interaction.reply({embeds: [embed], components: [row]})
    }
}