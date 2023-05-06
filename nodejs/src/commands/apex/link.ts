import { Message, ReplyMessageOptions } from 'discord.js'
import fs from 'fs'

//* Tested BakxY 06.05.2023 on version 2.1

export default {
    callback: async (ctx: Message, APEX_TOKEN: string, ...args: string[]) => {
        // get message content
        var ctxMessage = ctx.content

        // Check if a username was provided
        if(ctxMessage == '!link')
        {
            ctx.reply({
                content: 'Please provide a username',
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);

            return
        }

        // remove command prefix from username
        var username = ctxMessage.replace('!link ', '')

        // get all user link data
        var UserLinkData = require('./../../resources/data/nameLink');

        // insert or change the linked name
        UserLinkData[ctx.author.id] = username

        // write the data to fs
        fs.writeFile("./resources/data/nameLink.json", JSON.stringify(UserLinkData), function(err) {
            if (err) {
                console.log(err);
            }
        });

        // give user feedback
        ctx.reply({
            content: 'Your discord account has been linked with your apex username',
            allowedMentions:{
                repliedUser: false
            }
        } as ReplyMessageOptions);
    }
}