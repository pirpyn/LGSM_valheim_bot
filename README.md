# LGSM Valheim Bot
A stupid Discord bot to query a Valheim server managed by [LGSM](https://linuxgsm.com/).

## Credentials, tokens & other sensitive stuff
You should create at root level the file `config.json` that needs at least the following information
```jsonc
{
    "token": "DISCORD_BOT_TOKEN",
    "server_host": "YOUR_VALHEIM_SERVER_IP",
    "server_port": "YOUR_VALHEIM_SERVER_PORT", // Valheim default is 2457
    "lgsm_user": "LGSM_UNIX_USER", // LGSM default is vhserver
    "lgsm_bin": "LGSM_SERVER_SCRIPT", // LGSM default is ~/vhserver
    "guild_id": "YOUR_GUILD_ID" // optional (put false)
}
```

## Bot Slash commands
* /status: returns server map name & number of players
* /details: returns host info & lgsm config. Sensitive information are hidden.
* /restart: restarts the server
