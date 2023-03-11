const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

let currentPage = 1;
let pageList = [];

function InitialiseVariables(list){
    pageList = list;
}

function ProgressPage(string){
    if(string == "forwards"){
        currentPage++;
    }
    else if(string == "backwards"){
        currentPage--;
    }
    else{
        console.log("Supplied invalid string.")
    }
}

function CreateEmbed(){
    pageCount = pageList.length;
    const embed = new EmbedBuilder()
            .setColor(0x084DA5)
            .setTitle("Lucy Cavendish Film Society Film List")
            .setDescription(pageList[currentPage - 1]) 
            .setFooter({text: "Page "+ currentPage + "/" + pageCount});

    return embed;
}

function CreateRow(){
    pageCount = pageList.length;

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('backwards')
                .setLabel('<')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(currentPage == 1),
            new ButtonBuilder()
                .setCustomId('forwards')
                .setLabel('>')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(currentPage == pageCount)
            );
    
    return row;
}

module.exports = {InitialiseVariables, ProgressPage, CreateEmbed, CreateRow};