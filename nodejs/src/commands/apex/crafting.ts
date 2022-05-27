import { Message, MessageEmbed, ReplyMessageOptions } from 'discord.js'
import { parse } from 'dotenv';
import fetch from 'node-fetch'

//* Tested BakxY 10.03.2022 on version 1.3

export default {
    callback: async (ctx: Message, APEX_TOKEN: string, ...args: string[]) => {
        var res = await fetch('https://api.mozambiquehe.re/crafting?auth=' + APEX_TOKEN)

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

            var embedVar = new MessageEmbed()
                    .setColor(0xEF2AEF)
                    .setTitle(json[0]['bundleType'].charAt(0).toUpperCase() + json[0]['bundleType'].slice(1) + ' item ' + 'no. 1')
                    .setThumbnail(json[0]['bundleContent'][0]['itemType']['asset'])
                    .setFooter({text : 'Data from apexlegendsstatus.com'})
                    .setTimestamp()

            embedVar.addField('Name: ', json[0]['bundleContent'][0]['itemType']['rarity'].replace('_', ' ') + ' ' + json[0]['bundleContent'][0]['itemType']['name'].replace('_', ' '), true)
            embedVar.addField('Cost: ', json[0]['bundleContent'][0]['cost'].toString(), true)

            var timeUntilEnd = new Date(json[0]['end'])
            var unixStartTime = new Date()
            var timeDiffrence = timeUntilEnd.getTime() - unixStartTime.getTime() / 1000 - 10600

            console.log((json[0]['end'] - json[0]['start'])/60/60)

            console.log(timeUntilEnd.getTime())
            console.log(unixStartTime.getTime() / 1000)
            console.log(timeDiffrence)

            var timeLeft = ''

            if(timeDiffrence / 60 / 60 != 0)
            {
                timeLeft = (timeDiffrence / 60 / 60).toFixed() + ' h'
                timeDiffrence -= parseInt((timeDiffrence / 60 / 60).toFixed()) * 60 * 60
                console.log(timeDiffrence)
            }

            embedVar.addField('Until: ', timeLeft, true)

            ctx.reply({
                embeds: [embedVar],
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);
        }


    }
}