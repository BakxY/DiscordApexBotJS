import Discord, { Intents } from 'discord.js'
import 'dotenv/config'

// import custom functions
import { getDiscordToken} from './get-tokens'

// create a new client for the discord bot
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] })

// event triggered when the bot has connected and is ready
client.on('ready', () => {

    // get commandhandler from file
    let commandHandler = require('./command-handler')

    // commandhandler has a default object
    if(commandHandler.default)
    {
        // set commandhandler to the default export
        commandHandler = commandHandler.default
    }

    // create a new commandhandler
    commandHandler(client)

    // print to cli that the bot is ready
    console.log('[INFO] Bot has connected to discord and is ready')

})

// start the client with the token
client.login(getDiscordToken())