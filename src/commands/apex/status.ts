import { Message, MessageEmbed, ReplyMessageOptions } from 'discord.js'
import fetch from 'node-fetch'

//* Tested BakxY 10.03.2022 on version 1.3

export default {
    callback: (ctx: Message, APEX_TOKEN: string, ...args: string[]) => {
        fetch('https://api.mozambiquehe.re/servers?auth=' + APEX_TOKEN)
        .then(res => res.json())
        .then(json => {
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
        });
    }
}