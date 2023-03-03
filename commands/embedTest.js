const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Replies with a test embedded message.'),

    async execute(interaction){
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
            .setDescription("Here is a list of lucy cav movies woah.\n This is so cool and swag \n this is going to be interesting to format i think \n   **-**   Boop") 
            .setFooter({text: "Page 1/x"});

        //okay so just need a function in as separate script to read in the JSON and then convert it to correct string formatting with the \n and **-** business and then we good I think?

        await interaction.reply({embeds: [embed], components: [row]});
    }
}