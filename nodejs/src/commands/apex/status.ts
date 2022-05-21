import { Message, MessageEmbed, ReplyMessageOptions } from 'discord.js'
import fetch from 'node-fetch'

//* Tested BakxY 21.05.2022 on version 1.14

export default {
    callback: async (ctx: Message, APEX_TOKEN: string, ...args: string[]) => {
        var res = await fetch('https://api.mozambiquehe.re/servers?auth=' + APEX_TOKEN)
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
                //define string for message
                var message: string = ''
                var CounterForFor = 0
                
                for(var ServerType in json) // repeat for every index in json
                {
                    if(CounterForFor >= 3) // check if all needed data has been outputted
                    {
                        break
                    }

                    message += '\n **' + ServerType.replace('_', ' ') + '**\n' // add server type to the message

                    for(var ServerLoc in json[ServerType]) // repeat for every index in json[ServerLoc]
                    {
                        // case for every status
                        if(json[ServerType][ServerLoc]['Status'] == 'UP')
                        {
                            message += ':green_circle: '
                        }
                        else if(json[ServerType][ServerLoc]['Status'] == 'DOWN')
                        {
                            message += ':red_circle: '
                        }
                        else if(json[ServerType][ServerLoc]['Status'] == 'SLOW')
                        {
                            message += ':orange_circle: '
                        }
                        else if(json[ServerType][ServerLoc]['Status'] == 'OVERLOADED')
                        {
                            message += ':yellow_circle: '
                        }
                        else if(json[ServerType][ServerLoc]['Status'] == 'NO DATA')
                        {
                            message += ':zzz:  '
                        }
                        else
                        {
                            message += ':x:  '
                        }
                        
                        message += ServerLoc + '\n'
                    }
                    CounterForFor += 1
                }

                const embedVar = new MessageEmbed()
                .setColor(0xEF2AEF)
                .setTitle('Apex Legends current maps')
                .setDescription(message)
                .setImage('attachment://MapImage.jpg')
                .setFooter({text : 'Data from apexlegendsstatus.com'})
                .setTimestamp()
                
                ctx.reply({
                    embeds: [embedVar], 
                    allowedMentions:{
                        repliedUser: false
                    }
                } as ReplyMessageOptions);
            }
        }
    }
}