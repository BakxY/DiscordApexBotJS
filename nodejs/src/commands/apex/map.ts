import { Message, MessageEmbed, ReplyMessageOptions, MessageAttachment } from 'discord.js'
import fetch from 'node-fetch'

//* Tested BakxY 04.04.2023 on version 1.30

export default {
    callback: async (ctx: Message, APEX_TOKEN: string, ...args: string[]) => {
        var res = await fetch('https://api.mozambiquehe.re/maprotation?version=2&auth=' + APEX_TOKEN)
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
                var message: string = ''

                // add battle royale maps
                message += ('**BATTLE ROYALE**' + 
                            '\n> Current map: ' + json['battle_royale']['current']['map'] +
                            '\n> Remaining: ' + json['battle_royale']['current']['remainingTimer'] +
                            '\n> Next map: ' + json['battle_royale']['next']['map'] +
                            '\n')

                // add battle royale ranked map
                message += ('\n**BATTLE ROYALE RANKED**' + 
                            '\n> Current map: ' + json['ranked']['current']['map'] +
                            '\n> Remaining: ' + json['ranked']['current']['remainingTimer'] +
                            '\n> Next map: ' + json['ranked']['next']['map'] +
                            '\n')

                // add current ltm and map
                message += ('\n**LTM**' + 
                            '\n> Current mode: ' + json['ltm']['current']['eventName'] +
                            '\n> Current map: ' + json['ltm']['current']['map'] +
                            '\n> Remaining: ' + json['ltm']['current']['remainingTimer'] +
                            '\n> Next mode: ' + json['ltm']['next']['eventName'] +
                            '\n> Next map: ' + json['ltm']['next']['map'] +
                            '\n')
                
                let ImageAttachment: MessageAttachment

                if(json['battle_royale']['current']['map'] == 'Olympus')
                {
                    ImageAttachment = new MessageAttachment('./resources/maps/olympus.jpg', 'MapImage.jpg');
                }
                else if(json['battle_royale']['current']['map'] == 'Kings Canyon')
                {
                    ImageAttachment = new MessageAttachment('./resources/maps/kings-canyon.jpg', 'MapImage.jpg');
                }
                else if(json['battle_royale']['current']['map'] == 'Storm Point')
                {
                    ImageAttachment = new MessageAttachment('./resources/maps/storm-point.jpg', 'MapImage.jpg');
                }
                else if(json['battle_royale']['current']['map'] == "World's Edge")
                {
                    ImageAttachment = new MessageAttachment('./resources/maps/worlds-edge.jpg', 'MapImage.jpg');
                }
                else if(json['battle_royale']['current']['map'] == "Broken Moon")
                {
                    ImageAttachment = new MessageAttachment('./resources/maps/broken-moon.jpg', 'MapImage.jpg');
                }
                else
                {
                    ImageAttachment = new MessageAttachment('./resources/maps/mapnotavailable.jpg', 'MapImage.jpg');
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
                    files: [ImageAttachment],
                    allowedMentions:{
                        repliedUser: false
                    }
                } as ReplyMessageOptions);
            }
        }
    },
}