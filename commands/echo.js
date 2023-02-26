const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data : new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Echoes your input back at you in a channel of your choice.')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The input to echo back.')
                .setRequired(true)),

    async execute(interaction){
        const output = interaction.options.getString('input');

        await interaction.reply(`${output}`);
    }
}