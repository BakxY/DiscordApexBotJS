import { Message, ReplyMessageOptions, MessageAttachment} from 'discord.js'

const attachment = new MessageAttachment('./resources/images/ping.jpg', 'ping.jpg');

//* Tested BakxY 09.03.2022 on version 1.3

export default {
    callback: (ctx: Message, ...args: string[]) => {
        ctx.channel.send({
            content: '@everyone',
            files: [attachment],
        });
    },
}