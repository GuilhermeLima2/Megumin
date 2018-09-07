const Discord = require("discord.js");

const bot = new Discord.Client({
  disableEveryone: true
});
  var config = require("./config.json");

  bot.on("ready", async () => {
    console.log(`${bot.user.username} esta online!`);
    console.log(`Aqui esta meu convite: https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=8`)
  });

  bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;
    if (!message.content.startsWith(config.prefix)) return;

    
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    if (comando === "ping"){
      let embed = new Discord.RichEmbed()
      .setTitle(`${message.author.tag} o ping do bot e de: ${Math.round(bot.ping)}`)
      .setColor("#660033")
  
      message.channel.send(embed)
    }

     if (comando === "avatar") {
      let usuario = message.mentions.users.first() || message.author;
      let avatar = usuario.displayAvatarURL;

      if (avatar.endsWith(".gif")) {
        avatar = `${usuario.displayAvatarURL}?size=2048`
      }
      message.channel.send({
        embed: {
          title: `${usuario.tag}`,
          description: `[Link Direto](${avatar})`,
          image: {
            url: avatar
          },
          color: 6684723
        }
      })
    }

    if (comando === "kick") {
      if (!message.member.hasPermission(0x00000002))return message.reply("Você não tem a permissão para kickar membros!")
      if (!message.guild.me.hasPermission(0x00000002))return message.reply("Eu não tenho a permissão para kickar membros!")

      let member = message.mentions.members.first() || message.guild.members.get(args[0])
      let reason = args.slice(1).join(" ")
      if (!reason) {
        reason = "Herege" 
      } 
     
      if (!member) return message.reply("Quem devo explodir?")
      if (!member.kickable) return message.reply(`Não consegui explodir o **${member.user.tag}**`)

      member.kick(`${message.author.tag} | ${reason}`)
      .then(() => {
        let embed = new Discord.RichEmbed()
        .setTitle("Membro Kickado")
        .addField("Nome:", member.user.tag, true)
        .addField("Motivo:", reason, true)
        .setColor("#660033")
        message.channel.send(embed)
      })
    }
  })

  bot.login(config.token)

  client.login(process.env.BOT_TOKEN);
 
