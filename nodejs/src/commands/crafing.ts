import { Message, MessageEmbed, ReplyMessageOptions } from 'discord.js'
import fetch from 'node-fetch'

//* Tested BakxY 10.03.2022 on version 1.3

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
        }


    }
}