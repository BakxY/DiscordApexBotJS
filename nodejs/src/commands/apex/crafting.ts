import { Message, MessageEmbed, ReplyMessageOptions } from 'discord.js'
import { parse } from 'dotenv';
import fetch from 'node-fetch'

//* Tested BakxY 19.06.2022 on version 1.22

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

            for(var y = 0; y < 2; y++)
            {
                for(var i = 0; i < 2; i++)
                {
                    var embedVar = new MessageEmbed()
                    .setColor(0xEF2AEF)
                    .setTitle(json[y]['bundleType'].charAt(0).toUpperCase() + json[y]['bundleType'].slice(1) + ' item ' + 'no. ' + (i + 1))
                    .setThumbnail(json[y]['bundleContent'][i]['itemType']['asset'])
                    .setFooter({text : 'Data from apexlegendsstatus.com'})
                    .setTimestamp()

                    embedVar.addField('Name: ', json[y]['bundleContent'][i]['itemType']['name'].replaceAll('_', ' ').charAt(0).toUpperCase() + json[y]['bundleContent'][i]['itemType']['name'].replaceAll('_', ' ').slice(1), true)
                    embedVar.addField('Cost: ', json[y]['bundleContent'][i]['cost'].toString(), true)

                    var timeUntilEnd = new Date(json[y]['end'] * 1000)
                    var unixStartTime = new Date()

                    var timeLeft = ''

                    if(7 - unixStartTime.getDay() - timeUntilEnd.getDay() > 0)
                    {
                        timeLeft += 7 - timeUntilEnd.getDay() - unixStartTime.getDay() + ' days '
                    }
                    if(timeUntilEnd.getHours() - unixStartTime.getHours() - 3 > 0)
                    {
                        timeLeft += (timeUntilEnd.getHours() - unixStartTime.getHours() - 3) + ' hours '
                    }
                    if(unixStartTime.getMinutes() - timeUntilEnd.getMinutes() > 0)
                    {
                        timeLeft += 60 - (unixStartTime.getMinutes() - timeUntilEnd.getMinutes()) + ' min '
                    }

                    embedVar.addField('Until: ', timeLeft, true)

                    if(y == 0 && i == 0)
                    {
                        ctx.reply({
                            embeds: [embedVar],
                            allowedMentions:{
                                repliedUser: false
                            }
                        } as ReplyMessageOptions);
                    }
                    else
                    {
                        ctx.channel.send({
                            embeds: [embedVar],
                        } as ReplyMessageOptions);
                    }
                    
                }
            }
        }


    }
}