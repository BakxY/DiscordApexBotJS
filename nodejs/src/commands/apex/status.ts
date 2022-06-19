import { Message, MessageEmbed, ReplyMessageOptions } from 'discord.js'

//* Tested BakxY 19.06.2022 on version 1.22

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