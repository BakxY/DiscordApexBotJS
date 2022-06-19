import { Message, ReplyMessageOptions, MessageAttachment} from 'discord.js'

const attachment = new MessageAttachment('./resources/images/ping.jpg', 'ping.jpg');

//* Tested BakxY 19.06.2022 on version 1.22

export default {
    callback: (ctx: Message, ...args: string[]) => {
        ctx.channel.send({
            content: '@everyone',
            files: [attachment],
        });
    },
}