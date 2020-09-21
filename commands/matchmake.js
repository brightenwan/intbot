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
        if (args.size == 0) {
            args[0] = args[0].toLowerCase();
        }
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

            let userID = [];
            let nameArray = [];
            for (let [key] of roleOnline.entries()) {
                userID.push(key);
            }
            if (roleOnline.size <= 1) {
                message.channel.send('**Not enough users in "custom hell" role, please try again after assigning roles**');
                return;
            }
            message.channel.send(`**Auto matchmaking with users in your channel: \n**`);

            let tempVar;; //idt i need this but it works with so i'm not touching it :)
            for (i = 0; i < userID.length; i++) {
                nameArray[i] = roleOnline.get(userID[i]).user.username;
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
            let temp; //swap thot
            let randy;


            for (i = 0; i < total; i++) {
                randy = i + Math.floor(Math.random() * Math.floor(total - i));
                //message.channel.send(randy);

                temp = lobby[i];
                lobby[i] = lobby[randy];
                lobby[randy] = temp;
            }
            //message.channel.send(lobby);
            let getmeout = Math.floor((roleOnline.size / 2));; //size of half the team created, rounds down
            let eloHell = 0;
            //then check if seperate but equal, if not, segregation
            let gpShit = 0;
            let pgShit = 0;
            let runCheck = 0;
            for (i = 0; i < getmeout; i++) {
                if (nameArray[lobby[i]] == '0ffdu7y' || nameArray[lobby[i]] == 'Triton') { 
                    eloHell = eloHell + 1;
                    gpShit = i;
                    runCheck = runCheck + 1;
                } 
            }
            
            for (i = getmeout; i < roleOnline.size; i++) {
                if (nameArray[lobby[i]] == '0ffdu7y' || nameArray[lobby[i]] == 'Triton') {
                    pgShit = i;
                    runCheck = runCheck + 1;
                }
            }
            if (runCheck == 2) {
                if (eloHell == 2) {
                    console.log('holy shit we need jesus');
                    temp = nameArray[lobby[gpShit]];
                    nameArray[lobby[gpShit]] = nameArray[lobby[roleOnline.size - 1]];
                    nameArray[lobby[roleOnline.size - 1]] = temp;
                    //autobalance
                }
                else if (eloHell == 0) {
                    console.log('fuck my team');
                    temp = nameArray[lobby[pgShit]];
                    nameArray[lobby[pgShit]] = nameArray[lobby[0]];
                    nameArray[lobby[0]] = temp;
                }
            }
            //else {

            //}
            


            let out = '__**TEAM ONE**__\n'

            //output for loop
            for (i = 0; i < roleOnline.size; i++) {
                if (i === Math.floor((roleOnline.size / 2))) {
                    //getmeout = i;
                    out = out + '__ **TEAM TWO ** __\n';
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

