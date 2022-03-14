# Docs

In this folder you can find any documentation related to this discord bot. There are a couple of rules and norms for the bot, which you can find here.

## Variable naming

If you declare a variable you must decide if it needs to be reassignable or if a constant is sufficient. The names for variables need to match their function in the program. Don't use the same or different variant of a variable. (Bsp.: `Name1`, `Name2`)

### Constant variables

All constants need to be declared out of an function. So the declaration is not called each time the function runs. There is no need to add type definition to a constant, because the value is set at declaration.

### Reassignable variables

Reassignable variables can be declared anywhere in a function. For creating a reassignable variable use `var`, avoid `let` if possible. If there is a fixed value at declaration there is no need to define the type, else define the type of variable at declaration. (Bsp.: `var name:string`) If you don't know the type of the variable at declaration, assign the `any` type to the variable. A good guide to variable types is linked [here](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html).