import { Message, ReplyMessageOptions, MessageEmbed } from 'discord.js'
import fetch from 'node-fetch'
import fs from 'fs'

//* Tested BakxY 12.03.2022 on version 1.5 (Currently only for PC)

export default {
    callback: (ctx: Message, APEX_TOKEN: string, ...args: string[]) => {
        // get message content
        var ctxMessage = ctx.content

        // check if argument was given
        if(ctxMessage != '!stats')
        {
            // filter out command to get argument
            var player = ctxMessage.replace('!stats ', '')

            // get data from API
            fetch('https://api.mozambiquehe.re/bridge?version=5&platform=PC&player=' + player + '&auth=' + APEX_TOKEN)
            .then(res => res.json())
            .then(json => {
                // Check if data has Error in it
                if('Error' in json)
                {
                    // Reply with the error message
                    ctx.reply({
                        content: json['Error'],
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

                        CounterForFor += 1
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
            });
        }
        else
        {
            ctx.reply({
                content: 'No player specified',
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);
        }
    },
}