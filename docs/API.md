# API docs
To get the data from apex legends, I use the API of HugoDerave. This API is available to everyone and is currently free of charge. The API provides a https endpoint to communicate with.

## Communication
To communicate with the API I'm using the fetch API. Because fetch uses promise for the response I need to use a async function. This means the code wait's until the fetch API has its result. 

### Auth
With every request sent to the API you need to provide a valid api token. This token is appended to the request using `&auth=YourToken` option. If the token is invalid the API will return a 403 error.

### Request options
With every request to the API you have multiple options to set. These options are appended to the request using `&option=value` option. All options can be found on the [API documentation](https://apexlegendsapi.com/).

### Rate limit
The API has a rate limit of 2 requests per second. If you send more than 2 requests in a second the API will return a 429 error.

### Response
The API returns a JSON response. You can parse the response using the JSON.parse function and interact with it freely.

## Currently used API's
The API provides multiple endpoints. The following endpoints are currently used:

### Stats API
I use the stats API to get all the stats of a player. This API is used in the `!stats` and `!rank` commands. 
With every stats request, you need to provide a valid player name or UID. If the player name or UID is invalid the API will return a 404 error. You will also need to provide a platform. The platform can be either `PC` or `X1` or `PS4`, if you provide an invalid platform the API will return a 410 error.

### Map API
I use the map API in the `!map` command, to get the current and next map. This API is the simplest of all the API's. You only need to provide a valid token, there are no more options to set for this request.

### Crafting API
I use the crafting API in the `!craft` command, to get the current crafting rotation. This API is also very simple but the response is a bit more challenging to handle.

#### Terms of use
The API's rules are changing without notice, to get the current rules, you can visit the [API documentation](https://apexlegendsapi.com/). If you want to stay updated on downtime ore changes, join the [discord](https://discord.com/invite/qd9cZQm).
