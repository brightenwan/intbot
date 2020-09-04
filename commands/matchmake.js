module.exports = {
    name: 'matchmake',
    description: 'Lose faster',
    execute(message, args) {
        const Discord = require('discord.js');
        let guild = message.guild;
        const client = new Discord.Client();
        const role = new Discord.Role();
        const member = new Discord.GuildMember();
        let roleOutput = [];
        let i; //iterator
        if (args[0] === 'roles') {
            message.guild.members.fetch().then(fetchedMembers => {
                const roleOnline = (fetchedMembers.filter(member => member.roles.cache.some(role => role.name === 'custom hell')));

                if (roleOnline.size <= 1) return;

                const roleArray = ['Top', 'Bot', 'Mid', 'Jg/sup', 'Everything'];
                        for (i = 0; i < roleOnline.size; i++) {
                            roleOutput[i] = roleArray[Math.floor(Math.random() * Math.floor(roleArray.length))];
                        }
                    })
        }
                //todo add reaction-> role granting, auto role deletion
                //todo clear bot messages
                
        message.guild.members.fetch().then(fetchedMembers => {
                const roleOnline = (fetchedMembers.filter(member => member.roles.cache.some(role => role.name === 'custom hell')));

                let nameArray = [];
                for (let [key] of roleOnline.entries()) {
                    nameArray.push(key);
                }
                if (roleOnline.size <= 1) {
                    message.channel.send('**Not enough users in "custom hell" role, please try again after assigning roles**');
                    return;
                }
                message.channel.send(`**Auto matchmaking with users in your channel: \n**`);

                    
                let tempVar;; //idt i need this but it works with so i'm not touching it :)
                for (i = 0; i < nameArray.length; i++) {
                    nameArray[i]= roleOnline.get(nameArray[i]).user.username;
                    }
                //FIX
                
            //shuffle loop
                //fucking pray no shitter teams
                let total = roleOnline.size;
                

                //populates base array to be shuffled
                let lobby = [];
                for (i = 0; i < total; i++) {
                    lobby.push(i);
                }
                //message.channel.send(total
                let temp;
                let randy;
                for (i = 0; i < total; i++) {
                    randy = i + Math.floor(Math.random() * Math.floor(total - i));
                    //message.channel.send(randy);

                    temp = lobby[i];
                    lobby[i] = lobby[randy];
                    lobby[randy] = temp;
                }
                //message.channel.send(lobby);
                let out = ':red_circle: __**RED TEAM:**__\n'
                for (i = 0; i < roleOnline.size; i++) {
                    if (i === Math.floor((roleOnline.size / 2))) {
                        out = out + ':blue_circle: __**BLUE TEAM:**__\n';
                    }
                    if (roleOutput === undefined || roleOutput.length == 0) {
                        out = out + nameArray[lobby[i]] + '\n';
                    }
                    else {
                        out = out + nameArray[lobby[i]] + '\t\t\t' + roleOutput[lobby[i]] + '\n';
                    }
                }
            message.channel.send(out);
            })
    },
};

