import { Message, ReplyMessageOptions, MessageEmbed } from 'discord.js'
import fetch from 'node-fetch'
import fs from 'fs'

//* Tested BakxY 12.03.2022 on version 1.5 (For all platforms)
//! Variable declaration is all over the place, needs to be fixed

export default {
    callback: async (ctx: Message, APEX_TOKEN: string, ...args: string[]) => {
        // get message content
        var ctxMessage = ctx.content

        // check if argument was given
        if(ctxMessage != '!rank')
        {
            // filter out command to get argument
            var player = ctxMessage.replace('!rank ', '')
            var PlayerFound = false
            var Platform = ['PC', 'PS4', 'X1']
            var PlatformCounter = 0
            
            // check if the play has been found
            while(PlayerFound == false)
            {
                // check if all platforms have been checked
                if(PlatformCounter >= 3)
                {
                    break
                }

                // get data from API
                var res = await fetch('https://api.mozambiquehe.re/bridge?version=5&platform=' + Platform[PlatformCounter] + '&player=' + player + '&auth=' + APEX_TOKEN)
                var json = await res.json()

                // Check if data has Error in it
                if('Error' in json)
                {
                    // Reply with the error message
                }
                else
                {
                    // check if the correct player has been found
                    if(json['global']['name'].toLowerCase() == player.toLowerCase())
                    {
                        // declare global player found status for the event
                        PlayerFound = true

                        // declare variables
                        var CounterForFor = 0
                        var TrackerName = ['no data', 'no data', 'no data']
                        var TrackerValue = ['no data', 'no data', 'no data']

                        // get trackers
                        for(var name in json['legends']['selected']['data'])
                        {
                            if('name' in json['legends']['selected']['data'][CounterForFor])
                                // store tracker name
                                TrackerName[CounterForFor] = json['legends']['selected']['data'][CounterForFor]['name']
                                // remove special event text from special event badges and capitalize
                                TrackerName[CounterForFor] = TrackerName[CounterForFor].replace('Special event ', '')
                                TrackerName[CounterForFor] = TrackerName[CounterForFor].charAt(0).toUpperCase() + TrackerName[CounterForFor].slice(1).toLowerCase()
                                // store value of tracker
                                TrackerValue[CounterForFor] = json['legends']['selected']['data'][CounterForFor]['value']
                            CounterForFor++
                        }

                        // edit battle royale rank text
                        json['global']['rank']['rankedSeason']  = json['global']['rank']['rankedSeason'].replace('season', 'Season ')
                        json['global']['rank']['rankedSeason']  = json['global']['rank']['rankedSeason'].replace('_split_', '')
                        json['global']['rank']['rankedSeason']  = json['global']['rank']['rankedSeason'].slice(0, -1)

                        // edit arena rank text
                        json['global']['arena']['rankedSeason']  = json['global']['arena']['rankedSeason'].replace('arenas', 'Season ')
                        json['global']['arena']['rankedSeason']  = json['global']['arena']['rankedSeason'].replace('_split_', '')
                        json['global']['arena']['rankedSeason']  = json['global']['arena']['rankedSeason'].slice(0, -1)

                        // Declare a new embed
                        var embedVar = new MessageEmbed()
                        .setColor(0xEF2AEF)
                        .setFooter({text : 'Data from apexlegendsstatus.com'})
                        .setTimestamp()

                        embedVar.setTitle(json['global']['name'] + ' in BR ranked ' + json['global']['rank']['rankedSeason'])

                        //check for apex predator
                        if('Apex Predator' == json['global']['rank']['rankName'])
                        {
                            embedVar.addField('Current Rank', json['global']['rank']['rankName'] + ' #' + json['global']['rank']['ladderPosPlatform'].toString() + ' (' + json['global']['platform'].toString() + ')', true)
                        } 
                        else
                        {
                            embedVar.addField('Current Rank', json['global']['rank']['rankName'] + ' #' + json['global']['rank']['rankDiv'].toString(), true)
                        }
                        embedVar.addField('Current RP', json['global']['rank']['rankScore'].toString() + ' RP', true)

                        // set the thumbnail to the rank image
                        embedVar.setThumbnail(json['global']['rank']['rankImg'])

                        // send the embed
                        ctx.reply({
                            embeds: [embedVar],
                            allowedMentions:{
                                repliedUser: false
                            }
                        } as ReplyMessageOptions);

                        embedVar.fields = [];

                        embedVar.setTitle(json['global']['name'] + ' in arenas ranked ' + json['global']['arena']['rankedSeason'])

                        //check for apex predator
                        if('Apex Predator' == json['global']['arena']['rankName'])
                        {
                            embedVar.addField('Current Rank', json['global']['arena']['rankName'] + ' #' + json['global']['arena']['ladderPosPlatform'].toString() + ' (' + json['global']['platform'].toString() + ')', true)
                        } 
                        else
                        {
                            embedVar.addField('Current Rank', json['global']['arena']['rankName'] + ' #' + json['global']['arena']['rankDiv'].toString(), true)
                        }
                        embedVar.addField('Current AP', json['global']['arena']['rankScore'].toString() + ' AP', true)

                        // set the thumbnail to the rank image
                        embedVar.setThumbnail(json['global']['arena']['rankImg'])

                        // send the embed
                        ctx.reply({
                            embeds: [embedVar],
                            allowedMentions:{
                                repliedUser: false
                            }
                        } as ReplyMessageOptions);
                    }
                }

                // increase the counter for checking each platform
                PlatformCounter++
            }
            
        }
        else
        {
            // no argument was provided
            ctx.reply({
                content: 'No player specified',
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);
        }

        // check if no valid answer was give and all platforms have been checked
        if(PlayerFound == false && PlatformCounter >= 3)
        {
            ctx.reply({
                content: 'Player not found',
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);
        }
    },
}