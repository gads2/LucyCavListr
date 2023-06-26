const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('pong')
        .setDescription('Responds with your ping.'),
        
    async execute(interaction) {
        await interaction.reply("Your ping is " + `${interaction.createdTimestamp - Date.now()}` + " ms");
    },
};