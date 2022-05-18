import { Message, MessageEmbed, ReplyMessageOptions } from 'discord.js'

//* Tested BakxY 18.05.2022 on version 1.9

const message =('**About the bot**\n' +
                'This is a discord bot with integration for Apex Legends. It can show the current map, stats, status of servers and ranks of players. The bot was created out of boredom during the COVID-19 pandemic.\n' +
                '_ _\n' +
                '**Devs**\n' +
                'This bot was programmed by BakxY. A first version of the bot was written in Python, this version of the bot is written in Typescript for better syntax and so on. All the code can be found on Github.\n' +
                'Source code: https://github.com/BakxY/DiscordApexBotJS')

export default {
    callback: (ctx: Message, APEX_TOKEN: string, ...args: string[]) => {
        // setup embed
        const embedVar = new MessageEmbed()
        .setColor(0xEF2AEF)
        .setDescription(message)
        .setTimestamp()

        // send embed without a reply ping
        ctx.reply({
            embeds: [embedVar], 
            allowedMentions:{
                repliedUser: false
            }
        } as ReplyMessageOptions);
    }
}