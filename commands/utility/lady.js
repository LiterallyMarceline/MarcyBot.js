const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lady")
        .setDescription("Checks if you are the lady."),
    async execute(interaction) {
        if(interaction.user.username == "literallymarceline"){
            await interaction.reply("You are the lady.");
        } else {
            await interaction.reply("You are not the lady.");
        }
    },
};