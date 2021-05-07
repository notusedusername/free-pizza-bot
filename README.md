# free-pizza-bot
Discord bot to check free pizza offers of local pizzerias

## Commands

### Adding subscription

`fp add <name>`

Add a name to the checklist of the channel. If a winner found, then the user, who added it, will be @mentioned on the channel where this
command was used. A name can be watched on a channel by more users, and also on more channel
The listed names will be periodically checked on the pizza sites.

#### Scheduled checks

The checks run automatically every day at 14:15 and 18:15 (UTC+02:00), and checks the 
* [Corleone](https://corleoneristorante.hu/)
* [100% Pizza](https://www.100szazalekpizza.hu/) 
sites.

### Listing subs

To list the names watched (by the scheduled checks) on the channel, use the

`fp list`

command. The output will show the watched names, and the users, who will be @mentioned, if their name is a winner.

### Checking a name

By typing

`fp check <name>`

with any name, the bot will check the provided name on the pizza pages, and instant notifies about the result.

### Removing sub

By typing 

`fp remove <name>`

the subscription will be deleted from that channel, so the bot won't send notification to that channel, if the added name is a winner.
This command will only delete the name from the channel, where the command was sent, so a notification can arrive on another channel, where
that name is a sub currently.
