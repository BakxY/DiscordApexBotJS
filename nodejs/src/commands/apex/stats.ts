import { Message, ReplyMessageOptions, MessageEmbed } from 'discord.js'
import fetch from 'node-fetch'

//* Tested BakxY 19.06.2022 on version 1.22 (For all platforms)
//! Variable declaration is all over the place, needs to be fixed

export default {
    callback: async (ctx: Message, APEX_TOKEN: string, ...args: string[]) => {
        // get message content
        var ctxMessage = ctx.content

        // check if argument was given
        if(ctxMessage != '!stats')
        {
            // filter out command to get argument
            var playerAndPlatform = ctxMessage.replace('!stats ', '')

            if(playerAndPlatform.includes(' PC'))
            {
                // get platform
                var Platform = 'PC'

                // get player
                var player = playerAndPlatform.replace(' PC', '')
            }
            else if(playerAndPlatform.includes(' PS4'))
            {
                // get platform
                var Platform = 'PS4'

                // get player
                var player = playerAndPlatform.replace(' PS4', '')
            }
            else if(playerAndPlatform.includes(' X1'))
            {
                // get platform
                var Platform = 'X1'

                // get player
                var player = playerAndPlatform.replace(' X1', '')
            }
            else
            {
                // get platform
                var Platform = 'PC'

                // get player
                var player = playerAndPlatform

                ctx.reply({
                    content: 'No platform specified, defaulting to PC',
                    allowedMentions:{
                        repliedUser: false
                    }
                } as ReplyMessageOptions);
            }

            // get data from API
            var res = await fetch('https://api.mozambiquehe.re/bridge?version=5&platform=' + Platform + '&player=' + player + '&auth=' + APEX_TOKEN)
            if(res.status == 400)
            {
                ctx.reply({
                    content: 'Try again in a few minutes',
                    allowedMentions:{
                        repliedUser: false
                    }
                } as ReplyMessageOptions);
            }
            if(res.status == 403)
            {
                ctx.reply({
                    content: 'Bot owner fucked up with the keys',
                    allowedMentions:{
                        repliedUser: false
                    }
                } as ReplyMessageOptions);
            }
            if(res.status == 404)
            {
                ctx.reply({
                    content: 'Player not found',
                    allowedMentions:{
                        repliedUser: false
                    }
                } as ReplyMessageOptions);
            }
            if(res.status == 405)
            {
                ctx.reply({
                    content: 'API error',
                    allowedMentions:{
                        repliedUser: false
                    }
                } as ReplyMessageOptions);
            }
            if(res.status == 429)
            {
                ctx.reply({
                    content: 'Reached your rate limit, try again in a few minutes',
                    allowedMentions:{
                        repliedUser: false
                    }
                } as ReplyMessageOptions);
            }
            if(res.status == 500)
            {
                ctx.reply({
                    content: 'API brok, internal error',
                    allowedMentions:{
                        repliedUser: false
                    }
                } as ReplyMessageOptions);
            }
            if(res.status == 200)
            {
                var json = await res.json()

                // Check if data has Error in it
                if('Error' in json)
                {
                    // Unknown error
                    ctx.reply({
                        content: 'Unknown error',
                        allowedMentions:{
                            repliedUser: false
                        }
                    } as ReplyMessageOptions);
                }
                else
                {
                    // declare variables
                    var CounterForFor = 0
                    var TrackerName = ['no data', 'no data', 'no data']
                    var TrackerValue = ['no data', 'no data', 'no data']

                    // get trackers
                    for(var name in json['legends']['selected']['data'])
                    {
                        if('name' in json['legends']['selected']['data'][CounterForFor])
                            // store tracker name
                            TrackerName[CounterForFor] = json['legends']['selected']['data'][CounterForFor]['name']
                            // remove special event text from special event badges and capitalize
                            TrackerName[CounterForFor] = TrackerName[CounterForFor].replace('Special event ', '')
                            TrackerName[CounterForFor] = TrackerName[CounterForFor].charAt(0).toUpperCase() + TrackerName[CounterForFor].slice(1).toLowerCase()
                            // store value of tracker
                            TrackerValue[CounterForFor] = json['legends']['selected']['data'][CounterForFor]['value']
                        CounterForFor++
                    }

                    // Declare a new embed
                    var embedVar = new MessageEmbed()
                    .setColor(0xEF2AEF)
                    .setTitle(json['global']['name'] + ' as ' + json['legends']['selected']['LegendName'])
                    .setImage(json['legends']['selected']['ImgAssets']['banner'])
                    .setThumbnail(json['legends']['selected']['ImgAssets']['icon'])
                    .setFooter({text : 'Data from apexlegendsstatus.com'})
                    .setTimestamp()

                    // display some standard stats
                    embedVar.addField('Level', json['global']['level'].toString(), true)
                    embedVar.addField('BP-Level', json['global']['battlepass']['level'], true)
                    embedVar.addField('_ _', '_ _', false)
                    embedVar.addField('Status', json['realtime']['currentStateAsText'], true)
                    embedVar.addField('Platform', json['global']['platform'], true)

                    // spaces
                    embedVar.addField('_ _', '_ _', false)
                    embedVar.addField('Trackers:', '_ _', false)

                    // display current trackers
                    embedVar.addField(TrackerName[0], TrackerValue[0].toString(), true)
                    embedVar.addField(TrackerName[1], TrackerValue[1].toString(), true)
                    embedVar.addField(TrackerName[2], TrackerValue[2].toString(), true)

                    // send the embed
                    ctx.reply({
                        embeds: [embedVar],
                        allowedMentions:{
                            repliedUser: false
                        }
                    } as ReplyMessageOptions);
                }
            }
        }
        else
        {
            // no argument was provided
            ctx.reply({
                content: 'No player specified',
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);
        }     
    },
}