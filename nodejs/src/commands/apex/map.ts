import { Message, MessageEmbed, ReplyMessageOptions, MessageAttachment } from 'discord.js'
import fetch from 'node-fetch'

//* Tested BakxY 20.05.2022 on version 1.12

export default {
    callback: (ctx: Message, APEX_TOKEN: string, ...args: string[]) => {
        fetch('https://api.mozambiquehe.re/maprotation?version=2&auth=' + APEX_TOKEN)
        .then(res => res.json())
        .then(json => {
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
                        '\n> Next split map: ' + json['ranked']['next']['map'] +
                        '\n')

            // add arenas maps
            message += ('\n**ARENAS**' +
                        '\n> Current map: ' + json['arenas']['current']['map'] +
                        '\n> Remaining: ' + json['arenas']['current']['remainingTimer'] +
                        '\n> Next map: ' + json['arenas']['next']['map'] +
                        '\n')

            // add arenas ranked maps
            message += ('\n**ARENAS RANKED**' +
                        '\n> Current map: ' + json['arenasRanked']['current']['map'] +
                        '\n> Remaining: ' + json['arenasRanked']['current']['remainingTimer'] +
                        '\n> Next map: ' + json['arenasRanked']['next']['map'] +
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
        });
    },
}