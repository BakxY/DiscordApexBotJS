import { Message, ReplyMessageOptions } from 'discord.js'

//* Tested BakxY 19.06.2022 on version 1.22

const message = 
('```This a bot for discord, that can display stats, rankings and current maps for apex legends.\n' + 
​'Commands:\n' +
'  dev     Shows infos about bot and devs\n' +
'  help    Shows this message\n' +
'  map     Shows the current map rotation\n' +
'  pingall Pings all user in a discord\n' +
'  rank    Shows ranks of a player (If no specific platform is provided, will default to PC)\n' +
'  stats   Shows stats of a player (If no specific platform is provided, will default to PC)\n' +
'  status  No longer implemented, will just link to website\n' +
'  ontime  Shows a leaderboard for the users that have spent the most time in a voice chat\n```')

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