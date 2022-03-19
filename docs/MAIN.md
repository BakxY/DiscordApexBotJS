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
The rules for brackets don't have to be strictly enforced. It is important that a bracket and its positioning has a reason. If a bracket is split up please look that it is correctly indented.

### 4.1 Curly bracket `{}`
If a function is defined the curly brackets need to go onto the next line after the declaration of the function. This is the same for any for, while loops and any if's or switches. If a curly bracket is needed like in this case `const getFiles = (dir: string, suffix: string): string[] => {`, it is ok to put the bracket on the same line because it provides a better syntax.

### 4.2 Normal bracket `()`
It is preferred not to split any normal brackets, but if it provides cleaner code, it is acceptable. 

### 4.3 Square brackets `[]`
It is preferred not to split any square brackets, but if it provides cleaner code, it is acceptable. 

## 5. Comments
Any code that is not understandable for a person with knowledge of the programming language in less that 10 second, it needs to be commented. I use the better comments extension for VS code, to provide colored comments. If you need to comment out code for debugging, either remove the code as a whole or comment is back in before a commit or pull request.

## 6. Lööps
Loops without a fixed end need to be avoided at all costs. A `while(true)` loop is not allowed at all. For loops are ok if the have a clear exit point. For example the for loops used to loop the API requests.

## 7. Logs
Logs provide better insights on what is going on for the user. So if anything important happens it should be logged. This is mostly done for errors and failed commands.

### 7.1 CLI
When logging to the cli use `consol.XXXXX()`. The `XXXXX` can be replaced with some keywords, you can use `log`, `error`, `warn` and some more. The log message should be short and understandable for the regular user.

### 7.2 File
File logging is not yet implemented.

## 8. Imports
Any imports that are not clear where they are used please specify with a comment. If any imports are no longer nectary please remove them.

## 9. Issues
Issues are very simple to handle and don't have any special rules. Just follow the template given.

## 10. Commit messages
Any commit messages should represent the content of the commit. Don't commit all changes at once, if you worked on multiple projects. Make a commit for each project. 

## 11. Pull requests
A pull request title need to summarize all the changes of a branch to main. The message text should list all changes and/or features. If the project had very difficult aspects, add any sources that might help maintain the code.

## 12. Test
Before you try to merge anything test everything in you worked by starting the bot and testing the commands. Incase of a command that can get different data for some platforms, test each platform. If a test is complete please use `//* Tested *Your name* *Date* on version X.X`. If you commit to a branch that you are currently working on and your changes don't work yet, please use `//!` to signal it.