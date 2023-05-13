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
        if(ctxMessage == '!rank' && UserLinkData[ctx.author.id] == undefined)
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
        var player = ctxMessage.replace('!rank ', '')

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
                content: 'Unknown error'  + json['Error'],
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);

            return
        }

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
    },
}