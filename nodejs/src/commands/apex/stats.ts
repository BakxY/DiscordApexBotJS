import { Message, ReplyMessageOptions, MessageEmbed } from 'discord.js'
import fetch from 'node-fetch'

//* Tested BakxY 13.05.2022 on version 2.2

export default {
    callback: async (ctx: Message, APEX_TOKEN: string, ...args: string[]) => {
        // get message content
        var ctxMessage = ctx.content

        // get all user link data
        var UserLinkData = require('./../../resources/data/nameLink');

        // check if argument was given
        if(ctxMessage == '!stats' && UserLinkData[ctx.author.id] == undefined)
        {
            // no argument was provided
            ctx.reply({
                content: 'No player specified',
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);

            return
        }

        // filter out command to get argument
        var player = ctxMessage.replace('!stats ', '')

        if(player == '!rank')
        {
            player = UserLinkData[ctx.author.id]
        }

        if(player.startsWith('<@') && player.endsWith('>'))
        {
            if(UserLinkData[player.replace('<@', '').replace('>', '')] == undefined)
            {
                ctx.reply({
                    content: 'This user has no link',
                    allowedMentions:{
                        repliedUser: false
                    }
                } as ReplyMessageOptions);
                
                return
            }

            player = UserLinkData[player.replace('<@', '').replace('>', '')]
        }

        // get data from API
        var res = await fetch('https://api.mozambiquehe.re/bridge?version=5&platform=PC&player=' + player + '&auth=' + APEX_TOKEN)

        if(res.status == 400)
        {
            ctx.reply({
                content: 'Try again in a few minutes',
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);

            return
        }

        if(res.status == 403)
        {
            ctx.reply({
                content: 'Bot owner fucked up with the keys',
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);

            return
        }

        if(res.status == 404)
        {
            ctx.reply({
                content: 'Player not found',
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);
            
            return
        }
        if(res.status == 405)
        {
            ctx.reply({
                content: 'API error',
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);

            return
        }
        if(res.status == 429)
        {
            ctx.reply({
                content: 'Reached your rate limit, try again in a few minutes',
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);

            return
        }

        if(res.status == 500)
        {
            ctx.reply({
                content: 'API brok, internal error',
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);

            return
        }

        var json = await res.json()

        // Check if data has Error in it
        if('Error' in json)
        {
            // Unknown error
            ctx.reply({
                content: 'Unknown error: ' + json['Error'],
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);

            return
        }

        // declare variables
        var TrackerName = ['no data', 'no data', 'no data']
        var TrackerValue = ['no data', 'no data', 'no data']

        // get trackers
        for(var id in json['legends']['selected']['data'])
        {
            // store tracker name
            TrackerName[id] = json['legends']['selected']['data'][id]['name']
            // remove special event text from special event badges and capitalize
            TrackerName[id] = TrackerName[id].replace('Special event ', '')
            TrackerName[id] = TrackerName[id].charAt(0).toUpperCase() + TrackerName[id].slice(1).toLowerCase()
            // store value of tracker
            TrackerValue[id] = json['legends']['selected']['data'][id]['value']
        }

        // Declare a new embed
        var embedVar = new MessageEmbed()
        .setColor(0xEF2AEF)
        .setTitle(json['global']['name'] + ' as ' + json['legends']['selected']['LegendName'])
        .setImage(json['legends']['selected']['ImgAssets']['banner'].replace(' ', '%20'))
        .setThumbnail(json['legends']['selected']['ImgAssets']['icon'].replace(' ', '%20'))
        .setFooter({text : 'Data from apexlegendsstatus.com'})
        .setTimestamp()

        // display some standard stats
        embedVar.addField('Level', json['global']['level'].toString(), true)

        if(json['global']['battlepass']['level'] != null)
        {
            embedVar.addField('BP-Level', json['global']['battlepass']['level'], true)
        }
        else
        {
            embedVar.addField('BP-Level', 'No data', true)
        }
        
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
    },
}