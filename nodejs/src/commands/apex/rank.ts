import { Message, ReplyMessageOptions, MessageEmbed } from 'discord.js'
import fetch from 'node-fetch'

// array of all platforms
const Platform = ['PC', 'PS4', 'X1']

//* Tested BakxY 24.05.2022 on version 1.15 (For all platforms)

export default {
    callback: async (ctx: Message, APEX_TOKEN: string, ...args: string[]) => {
        // get message content
        var ctxMessage = ctx.content

        // check if argument was given
        if(ctxMessage != '!rank')
        {
            // filter out command to get argument
            var playerAndPlatform = ctxMessage.replace('!rank ', '')
            
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
                    // edit battle royale rank text
                    json['global']['rank']['rankedSeason']  = json['global']['rank']['rankedSeason'].replace('season', 'Season ')
                    json['global']['rank']['rankedSeason']  = json['global']['rank']['rankedSeason'].replace('_split_', '')
                    json['global']['rank']['rankedSeason']  = json['global']['rank']['rankedSeason'].slice(0, -1)

                    // edit arena rank text
                    json['global']['arena']['rankedSeason']  = json['global']['arena']['rankedSeason'].replace('arenas', 'Season ')
                    json['global']['arena']['rankedSeason']  = json['global']['arena']['rankedSeason'].replace('_split_', '')
                    json['global']['arena']['rankedSeason']  = json['global']['arena']['rankedSeason'].slice(0, -1)

                    // Declare a new embed
                    var embedVar = new MessageEmbed()
                    .setColor(0xEF2AEF)
                    .setTitle(json['global']['name'] + ' in BR ranked ' + json['global']['rank']['rankedSeason'])
                    .setThumbnail(json['global']['rank']['rankImg'])
                    .setFooter({text : 'Data from apexlegendsstatus.com'})
                    .setTimestamp()

                    //check for apex predator
                    if('Apex Predator' == json['global']['rank']['rankName'])
                    {
                        embedVar.addField('Current Rank', json['global']['rank']['rankName'] + ' #' + json['global']['rank']['ladderPosPlatform'].toString() + ' (' + json['global']['platform'] + ')', true)
                    } 
                    else
                    {
                        embedVar.addField('Current Rank', json['global']['rank']['rankName'] + ' #' + json['global']['rank']['rankDiv'].toString(), true)
                    }
                    embedVar.addField('Current RP', json['global']['rank']['rankScore'].toString() + ' RP', true)

                    // send the embed
                    ctx.reply({
                        embeds: [embedVar],
                        allowedMentions:{
                            repliedUser: false
                        }
                    } as ReplyMessageOptions);

                    // remove all fields from the embed
                    embedVar.fields = [];

                    // set the new title
                    embedVar.setTitle(json['global']['name'] + ' in arenas ranked ' + json['global']['arena']['rankedSeason'])

                    // set the new thumbnail to the rank image
                    embedVar.setThumbnail(json['global']['arena']['rankImg'])

                    //check for apex predator
                    if('Apex Predator' == json['global']['arena']['rankName'])
                    {
                        embedVar.addField('Current Rank', json['global']['arena']['rankName'] + ' #' + json['global']['arena']['ladderPosPlatform'].toString() + ' (' + json['global']['platform'] + ')', true)
                    } 
                    else
                    {
                        embedVar.addField('Current Rank', json['global']['arena']['rankName'] + ' #' + json['global']['arena']['rankDiv'].toString(), true)
                    }
                    embedVar.addField('Current AP', json['global']['arena']['rankScore'].toString() + ' AP', true)

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