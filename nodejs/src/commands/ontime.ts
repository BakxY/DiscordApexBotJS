import { Message, ReplyMessageOptions, MessageAttachment, MessageEmbed} from 'discord.js'

//* Tested BakxY 19.06.2022 on version 1.22

export default {
    callback: async (ctx: Message, ...args: string[]) => {

        // get all the data and create the leaderboard
        var TimeData = require('./../resources/data/times')
        var TimeLeaderboard = { 
            '1': undefined, 
            '2': undefined, 
            '3': undefined, 
            '4': undefined, 
            '5': undefined, 
            '6': undefined, 
            '7': undefined, 
            '8': undefined, 
            '9': undefined, 
            '10': undefined 
        }

        // create an array to point times to users
        var TimeToUser = []

        // put all the times and users in the array
        for(var id in TimeData)
        {
            TimeToUser.push({
                id: id,
                time: TimeData[id]['TotalTime']
            })
        }
        // sort the array by time
        TimeToUser.sort(function(a, b) {
            return b['time']-a['time']
        });

        // put the top 10 times in the leaderboard
        for(var i = 1; i < 10; i++)
        {
            if(TimeToUser[i - 1] != undefined)
            {
                TimeLeaderboard[i] = TimeToUser[i - 1]['id']
            }
        }

        var message = ''

        // create the message
        for(var i = 1; i < 10; i++)
        {
            if(TimeLeaderboard[i] != undefined)
            {
                // check if the user is online
                if(TimeData[TimeToUser[i - 1]['id']]['Online'] == false)
                {
                    var OnTime = TimeData[TimeToUser[i - 1]['id']]['TotalTime'] / 1000
                }
                else
                {
                    var OnTime = (TimeData[TimeToUser[i - 1]['id']]['TotalTime'] + (new Date().getTime() - TimeData[TimeToUser[i - 1]['id']]['TimeJoined'])) / 1000
                }
                
                // Add user ping to message
                message += i + '. <@' + TimeToUser[i - 1]['id'] + '> - '

                // Add time to message
                if(OnTime / 60 / 60 > 1)
                {
                    message += Math.trunc(OnTime / 60 / 60) + ' hours '
                    OnTime -= Math.trunc(OnTime / 60 / 60) * 60 * 60
                }

                if(OnTime / 60  > 1)
                {
                    message += Math.trunc(OnTime / 60 ) + ' min '
                    OnTime -= Math.trunc(OnTime / 60 ) * 60 
                }

                if(OnTime > 1)
                {
                    message += Math.trunc(OnTime) + ' sec'
                    OnTime -= Math.trunc(OnTime)
                }
                
                message += '\n'
            }
        }

        // create the message
        var embedVar = new MessageEmbed()
                    .setColor(0xEF2AEF)
                    .setTitle('Leaderboard')
                    .setThumbnail(ctx.guild.iconURL())
                    .setDescription(message)
                    .setTimestamp()

        // send the message
        ctx.reply({
            embeds: [embedVar], 
            allowedMentions:{
                repliedUser: false
            }
        } as ReplyMessageOptions);
    },
}