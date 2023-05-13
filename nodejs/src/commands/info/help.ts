import { Message, ReplyMessageOptions } from 'discord.js'

//* Tested BakxY 13.05.2023 on version 2.2

const message = 
('```This a bot for discord, that can display stats, rankings and current maps for apex legends.\n' + 
​'Commands:\n' +
'  dev     Shows infos about bot and devs\n' +
'  help    Shows this message\n' +
'  map     Shows the current map rotation\n' +
'  pingall Pings all user in a discord\n' +
'  rank    Shows ranks of a player\n' +
'  stats   Shows stats of a player\n' +
'  ontime  Shows a leaderboard for the users that have spent the most time in a voice chat\n' +
'  link    Links the discord user with a apex account, check stats/ranks with mentions\n'+
'  unlink  Removes the link to a apex account\n'+
'```')

export default {
    callback: (ctx: Message, APEX_TOKEN: string, ...args: string[]) => {
        // send embed without a reply ping
        ctx.reply({
            content: message,
            allowedMentions:{
                repliedUser: false
            }
        } as ReplyMessageOptions);
    }
}