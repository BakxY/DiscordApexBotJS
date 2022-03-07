import { Message } from 'discord.js'

export default {
    callback: (ctx: Message, ...args: string[]) => {
        ctx.reply('@everyone')
    },
}