const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Embed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sendembed')
		.setDescription('Sends the selected embed.')
        .addStringOption(option =>
            option.setName('embed')
                .setDescription("Select an embed")
                .setRequired(true)
                .addChoices(
                    {name: "Test", value: 'test'},
                    {name: "Test2", value: 'test2'},
                    {name: "Test3", value: 'test3'}
                ))
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription("Only you will see the reply")
        ),
	async execute(interaction) {
        let embedToSend = {};
        const ephemeral = interaction.options.getBoolean('ephemeral');
        if(ephemeral){
            embedToSend.ephemeral = true;
            console.log(embedToSend);
        };
        await interaction.deferReply(embedToSend);
        const embed = interaction.options.getString('embed');
        const testEmbed = new EmbedBuilder()
            .setTitle("Hello World.");
        const testEmbedTwo = new EmbedBuilder()
            .setTitle("This Embed Has Fields")
            .setDescription("And the color's different too!")
            .setColor(0xE91E63)
            .addFields(
                { name: 'This is a field', value: 'owo' },
                { name: '\u200B', value: '\u200B' },
                { name: 'DJ KHALED', value: 'anotha one', inline: true },
                { name: 'DJ KHALED', value: 'and on my wrist theres a new watch', inline: true },
                { name: 'DJ KHALED', value: 'anotha anotha one', inline: true }
            );
        const testEmbedThree = new EmbedBuilder()
            .setTitle("Embed With Buttons")
            .setDescription("this embed has buttons")
            .setColor(0xE91E63);
        const button1 = new ButtonBuilder()
            .setCustomId('button1')
            .setLabel('Button 1')
            .setStyle(ButtonStyle.Primary);
        const button2 = new ButtonBuilder()
            .setCustomId('button2')
            .setLabel('Button 2')
            .setStyle(ButtonStyle.Secondary);
        const row1 = new ActionRowBuilder()
            .addComponents(button1, button2);
		switch(embed){
            case 'test':
                embedToSend = {embeds: [testEmbed]};
                break;
            case 'test2':
                embedToSend = {embeds: [testEmbedTwo]};
                break;
            case 'test3':
                embedToSend = {content: "This message has an embed and buttons", embeds: [testEmbedThree], components: [row1]};
                break;
            default:
                await interaction.editReply("invalid");
                break;
        }
        await interaction.editReply(embedToSend);
	},
};