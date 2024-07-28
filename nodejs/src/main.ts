import Discord, { Intents } from 'discord.js'
import fs from 'fs'
import 'dotenv/config'

// import custom functions
import { getDiscordToken } from './get-tokens'

// create a new client for the discord bot
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] })

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

// event triggered when a user joins a channel
client.on("voiceStateUpdate", async function(oldMember, newMember){

    var TimeData = require('./resources/data/times');

    //await fs.readFile('resources/data/times.json', function (err, data) {
    //    if (err) {
    //       return console.error('[ ERROR ] Error while reading JSON file: ' + err);
    //    }
    //    TimeData = JSON.parse(data.);
    //});

    var userExistes = false

    if(newMember.channel != null)
    {
        // user has joined or switched a voice channel
        for(var id in TimeData)
        {
            if(id == newMember.member.user.id)
            {
                TimeData[id]['Username'] = newMember.member.user.username
                TimeData[id]['TimeJoined'] = new Date().getTime()
                TimeData[id]['Online'] = true
                userExistes = true
            }
        }
        if(userExistes == false)
        {
            TimeData[newMember.member.user.id] = {Username: newMember.member.user.username,
                                                      TimeJoined: new Date().getTime(),
                                                      Online: true,
                                                      TotalTime: 0
                                                    };
        }
    }
    else
    {
        // user has left a voice channel
        if(TimeData[oldMember.member.user.id] != undefined && TimeData[oldMember.member.user.id] != null)
        {
            if(TimeData[oldMember.member.user.id]['Online'] == true)
            {
                TimeData[oldMember.member.user.id]['Username'] = oldMember.member.user.username
                TimeData[oldMember.member.user.id]['Online'] = false
                TimeData[oldMember.member.user.id]['TotalTime'] = TimeData[oldMember.member.user.id]['TotalTime'] + (new Date().getTime() - TimeData[oldMember.member.user.id]['TimeJoined'])
                TimeData[oldMember.member.user.id]['TimeJoined'] = 0
            }
            else
            {
                console.error('[ERROR] User ' + oldMember.member.user.id + ' is marked as already offline')
            }
        }
        else
        {
            console.error('[ERROR] User ' + oldMember.member.user.id + ' does not exist in the dataset')
        }
    }

    fs.writeFile("resources/data/times.json", JSON.stringify(TimeData), function(err) {
        if (err) {
            console.log(err);
        }
    });
});

// start the client with the token
client.login(getDiscordToken())