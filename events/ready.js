const {Events, ActivityType} = require('discord.js');
const JsonHandler = require('../functions/jsonHandler.js');

module.exports = {
    name: Events.ClientReady,
    once: true,

    async execute(client){
        console.log(`Ready! Logged in as ${client.user.tag}`);

        film = await JsonHandler.GetCurrentFilm();

        client.user.setActivity("'" + film + "'", {type: ActivityType.Watching});
    },
};