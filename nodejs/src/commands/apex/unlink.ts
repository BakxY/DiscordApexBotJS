import { Message, ReplyMessageOptions } from 'discord.js'
import fs from 'fs'

//* Tested BakxY 06.05.2023 on version 2.1

export default {
    callback: async (ctx: Message, APEX_TOKEN: string, ...args: string[]) => {
        // get all user link data
        var UserLinkData = require('./../../resources/data/nameLink');

        // check if user has a link
        if(UserLinkData[ctx.author.id] == undefined)
        {
            ctx.reply({
                content: 'You don\' have a linked username',
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);

            return
        }
        // remove user enrty in json
        delete UserLinkData[ctx.author.id]

        // write the data to fs
        fs.writeFile("./resources/data/nameLink.json", JSON.stringify(UserLinkData), function(err) {
            if (err) {
                console.log(err);
            }
        });

        // give user feedback
        ctx.reply({
            content: 'Your link has been removed',
            allowedMentions:{
                repliedUser: false
            }
        } as ReplyMessageOptions);
    }
}