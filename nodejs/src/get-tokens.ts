// export function import
export function getDiscordToken() 
{
    var discord_token = ''

    console.log()

    // read token file
    discord_token = process.env.DISCORDTOKEN

    // check if the token files is empty
    if(discord_token != undefined)
    {
        // return token
        return discord_token
    }
    else
    {
        console.error('Discord token is not set in env!')
        process.exit()
    }
}

// export function import
export function getApexToken() 
{
    var apex_token = ''

    // read token file
    apex_token = process.env.APEXTOKEN

    // check if the token files is empty
    if(apex_token != undefined)
    {
        // return token
        return apex_token
    }
    else
    {
        console.error('Apex token is not set in env!')
        process.exit()
    }
}
