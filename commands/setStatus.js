const {SlashCommandBuilder, ActivityType} = require("discord.js");

module.exports = {
    data : new SlashCommandBuilder()
        .setName('status')
        .setDescription('Sets current movie on bot.')
        .addStringOption(option =>
            option.setName('movie_name')
                .setDescription('The movie being watched this week.')
                .setRequired(true)),

    async execute(interaction){
        
        interaction.client.user.setPresence({
            activities: [{
                name: interaction.options.getString('movie_name'),
                type: ActivityType.Watching
            }]
        })

        //interaction.client.user.setActivity('Who Framed Roger Rabbit?', {type: 'WATCHING'});

        await interaction.reply("Status Set.");
    }
}