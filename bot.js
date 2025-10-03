const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, REST, Routes } = require('discord.js');
require('dotenv').config();

// Create Discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

// Bot configuration
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const GUILD_ID = process.env.DISCORD_GUILD_ID;
const WEBSITE_URL = process.env.WEBSITE_URL || 'https://your-website.netlify.app';

// Slash commands
const commands = [
    new SlashCommandBuilder()
        .setName('downloads')
        .setDescription('Get the YuB-X-Boosters download link'),
    
    new SlashCommandBuilder()
        .setName('info')
        .setDescription('Information about YuB-X-Boosters'),
    
    new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show all available commands'),
];

// Register slash commands
const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

async function deployCommands() {
    try {
        console.log('🔄 Started refreshing application (/) commands.');
        
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );
        
        console.log('✅ Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('❌ Error deploying commands:', error);
    }
}

// Bot ready event
client.once('ready', async () => {
    console.log('🚀 YuB-X-Boosters Bot is online!');
    console.log(`📊 Logged in as ${client.user.tag}`);
    console.log(`🌐 Serving ${client.guilds.cache.size} guild(s)`);
    
    // Set bot status
    client.user.setActivity('YuB-X Boosters | /help', { type: 'WATCHING' });
    
    // Deploy commands
    await deployCommands();
});

// Welcome new members
client.on('guildMemberAdd', member => {
    const welcomeEmbed = new EmbedBuilder()
        .setColor('#00ff88')
        .setTitle('🎉 Welcome to YuB-X Boosters!')
        .setDescription(`Hey ${member.user}, welcome to our community!`)
        .addFields(
            { name: '🔗 Downloads', value: `Check out our premium downloads: ${WEBSITE_URL}`, inline: false },
            { name: '💬 Get Started', value: 'Use `/help` to see all available commands!', inline: false }
        )
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
        .setFooter({ text: 'YuB-X Boosters', iconURL: client.user.displayAvatarURL() });

    // Send to general channel (adjust channel name as needed)
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general' || ch.name === 'welcome');
    if (channel) {
        channel.send({ embeds: [welcomeEmbed] });
    }
});

// Handle slash commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    try {
        if (commandName === 'downloads') {
            const downloadEmbed = new EmbedBuilder()
                .setColor('#00ff88')
                .setTitle('🔥 YuB-X-Boosters Downloads')
                .setDescription('Access our premium download collection!')
                .addFields(
                    { name: '🌐 Website', value: `[Visit Downloads Page](${WEBSITE_URL})`, inline: false },
                    { name: '📦 Available', value: '• Premium Texture Packs\n• Sound Effects Library\n• Icon Bundles\n• And much more!', inline: false }
                )
                .setThumbnail('https://cdn.discordapp.com/attachments/123/456/yubx-logo.png')
                .setTimestamp()
                .setFooter({ text: 'YuB-X Boosters', iconURL: client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [downloadEmbed] });
        }

        else if (commandName === 'info') {
            const infoEmbed = new EmbedBuilder()
                .setColor('#00ff88')
                .setTitle('ℹ️ About YuB-X-Boosters')
                .setDescription('Premium downloads and exclusive content for the community!')
                .addFields(
                    { name: '👥 Members', value: `${interaction.guild.memberCount}`, inline: true },
                    { name: '📅 Created', value: interaction.guild.createdAt.toDateString(), inline: true },
                    { name: '🌐 Website', value: `[Visit Here](${WEBSITE_URL})`, inline: true }
                )
                .setThumbnail(interaction.guild.iconURL())
                .setTimestamp()
                .setFooter({ text: 'YuB-X Boosters', iconURL: client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [infoEmbed] });
        }

        else if (commandName === 'help') {
            const helpEmbed = new EmbedBuilder()
                .setColor('#00ff88')
                .setTitle('🤖 YuB-X-Boosters Bot Commands')
                .setDescription('Here are all available commands:')
                .addFields(
                    { name: '/downloads', value: 'Get the download link for premium content', inline: false },
                    { name: '/info', value: 'Show server and bot information', inline: false },
                    { name: '/help', value: 'Show this help message', inline: false }
                )
                .setTimestamp()
                .setFooter({ text: 'YuB-X Boosters', iconURL: client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [helpEmbed] });
        }

    } catch (error) {
        console.error('❌ Command error:', error);
        await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
    }
});

// Error handling
client.on('error', error => {
    console.error('❌ Discord client error:', error);
});

process.on('unhandledRejection', error => {
    console.error('❌ Unhandled promise rejection:', error);
});

// Login to Discord
client.login(BOT_TOKEN);
// Keep bot alive with periodic activity
setInterval(() => {
    console.log(`🤖 Bot Status: Online | ${new Date().toLocaleString()}`);
    
    // Update bot presence to show it's active
    if (client && client.user) {
        client.user.setPresence({
            activities: [{
                name: 'YuB-X-Boosters | Role Verification Active',
                type: 'WATCHING'
            }],
            status: 'online'
        });
    }
}, 5 * 60 * 1000); // Every 5 minutes

// Heartbeat to prevent disconnection
setInterval(() => {
    console.log('💓 Heartbeat - Keeping connection alive');
}, 30 * 1000); // Every 30 seconds

console.log('✅ Bot keep-alive system initialized');
