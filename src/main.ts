import Discord, { Intents } from 'discord.js'
import 'dotenv/config'
import { getDiscordToken} from './get-tokens'

const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] })

client.on('ready', () => {

    let commandHandler = require('./command-handler')

    if(commandHandler.default)
    {
        commandHandler = commandHandler.default
    }

    commandHandler(client)

    console.log('Connected as ' + client.user.tag)

})

client.login(getDiscordToken())