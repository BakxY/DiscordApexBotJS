# Docs

In this folder you can find any documentation related to this discord bot. There are a couple of rules and norms for the bot, which you can find here.

## 1. Variable naming

If you declare a variable you must decide if it needs to be reassignable or if a constant is sufficient. The names for variables need to match their function in the program. Don't use the same or different variant of a variable. (Bsp.: `Name1`, `Name2`)

### 1.1 Constant variables

If a constant is constant for the entire function or program, it needs to be declared out of any functions. So the declaration is not called each time the function runs. There is no need to add type definition to a constant, because the value is set at declaration.

### 1.2 Reassignable variables

Reassignable variables can be declared anywhere in a function. For creating a reassignable variable use `var`, avoid `let` if possible. If there is a fixed value at declaration there is no need to define the type, else define the type of variable at declaration. (Bsp.: `var name:string`) If you don't know the type of the variable at declaration, assign the `any` type to the variable. A good guide to variable types is linked [here](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html).

## 2. Function and command naming

### 2.1 Functions

A function needs to be initialized with the `function` type. The name of a function needs to describe the code in the function as good as possible. The naming of any parameters for the function flow the rules as in `1. Variable naming`. How to create and use functions can be found [here](https://www.tutorialspoint.com/typescript/typescript_functions.htm).

### 2.2 Discord commands

The commands for the discord users need to be simple and easy to use. The max of parameters for a command is one. The commands for this bot are usable with the prefix `!`. If a command is posting an message to discord, the message needs to reply to the original command message without a mention. The messages for discord need to be provided in an embed. An example for on how to use embeds can be found [here](https://discordjs.guide/popular-topics/embeds.html#embed-preview). 

## 3. API calls

Any API calls are made by node-fetch, you can find its documentation [here](https://www.npmjs.com/package/node-fetch). There are two ways to wait for the response of a API. The option of a async function is preferred, the other option is to use `.then`. To convert the response to json, i use `res.json()`.

### 3.1 Apex API
The apex API that is used in this projects is provided by https://apexlegendsstatus.com. The API key for this API can be placed in `resources/tokens/APEX_TOKEN.txt`. The documentation for this API can be found [here](https://apexlegendsapi.com/documentation.php). If you want your own API key you can get one [here](https://apexlegendsapi.com/documentation.php#download-section).

### 3.2 Discord API
To use the discord API i use the discord.js package in npm. The website for this package can be found [here](https://discord.js.org/). The API key for this API can be placed in `resources/tokens/DISCORD_TOKEN.txt`. The documentation for the package can be found [here](https://discord.js.org/#/docs/discord.js/stable/general/welcome). The GitHub repo for this project can be found [here](https://github.com/discordjs/discord.js).

## 4. Brackets

### 4.1 Curly bracket `{}`

### 4.2 Normal bracket `()`

### 4.3 Square brackets `[]`

## 5. Comments

## 6. Lööps

## 7. Logs to CLI

## 8. Imports