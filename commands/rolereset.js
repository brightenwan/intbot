module.exports = {
	name: 'rolereset',
	description: 'removes all `custom hell` roles',
	execute(message) {
		const Discord = require('discord.js');
		let guild = message.guild;
		const client = new Discord.Client();
		const role = new Discord.Role();
		const member = new Discord.GuildMember();
		
		let output = "";
		let keyArray = [];
		
		message.guild.members.fetch().then(fetchedMembers => {
			const roleOnline = (fetchedMembers.filter(member => member.roles.cache.some(role => role.name === 'custom hell')))

			if (roleOnline.size < 1) {
				message.channel.send("no roles to remove, try again after assigning members to the 'custom hell' role");
				return;
			}
			else {
				output += "deleting roles...";
			}
			//console.log(roleOnline);
			
			for (let [key] of roleOnline.entries()) {
				keyArray.push(key);
			}
			 
			let roleID = roleOnline.get(keyArray[0]).roles.cache.find(role => role.name === 'custom hell').id;
			//roleID = '749692719504293888';
			for (let i = 0; i < keyArray.length; i++){

				guild.member(keyArray[i]).roles.remove(roleID, "")
					.then(() => {
						console.log(`Successfully removed ${guild.member(keyArray[i]).user.tag}`);
					})
					.catch(err => {
						output += 'I was unable to remove the role \n';
						// Log the error
						console.error(err);
					});
			}
			output += "roles deleted!";
			message.channel.send(output);
		})
	},
};