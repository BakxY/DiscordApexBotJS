import { Message, MessageEmbed, ReplyMessageOptions } from 'discord.js'

//* Tested BakxY 21.05.2022 on version 1.14

export default {
    callback: async (ctx: Message, APEX_TOKEN: string, ...args: string[]) => {
        ctx.reply({
            content: 'For status, go to https://apexlegendsstatus.com/',
            allowedMentions:{
                repliedUser: false
            }
        } as ReplyMessageOptions);
    }
}