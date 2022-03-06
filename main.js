const {
    Client,
    Intents
} = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] })

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

client.on('messageCreate', (msg) => {
    if(msg.author != client.user)
    {
        if(msg.content == 'ello')
        {
            msg.reply('ello')
        }
    }
})

bot_secret_token = ""

client.login(bot_secret_token)