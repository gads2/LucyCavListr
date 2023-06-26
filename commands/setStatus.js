const {SlashCommandBuilder, ActivityType} = require("discord.js");
const JsonHandler = require('../functions/jsonHandler.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('set_movie')
        .setDescription('Sets current movie on bot status.')
        .addStringOption(option =>
            option.setName('movie_name')
                .setDescription('The movie being watched this week.')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('movie_date_time')
                .setDescription('The date and time the movie will be shown on.')
                .setRequired(true)),

    async execute(interaction){
        
        film = interaction.options.getString('movie_name');
        dateTime = interaction.options.getString('movie_date_time');

        interaction.client.user.setActivity("'" + film + "'", {type: ActivityType.Watching});

        JsonHandler.SetCurrentFilm(film);
        JsonHandler.SetDateTime(dateTime);

        await interaction.reply({content: "Status Set.", ephemeral :true});
    }
}