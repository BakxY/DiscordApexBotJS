import { Message, ReplyMessageOptions, MessageAttachment} from 'discord.js'

const attachment = new MessageAttachment('./resources/images/ping.jpg', 'ping.jpg');

//! NOT TESTED (DISCORD API OUTAGE)

export default {
    callback: (ctx: Message, ...args: string[]) => {
        ctx.reply({
            Message: '@everyone',
            files: [attachment],
            allowedMentions:{
                repliedUser: false
            }
        } as ReplyMessageOptions);
    },
}