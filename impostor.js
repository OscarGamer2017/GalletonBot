const Discord = require("discord.js");
const client = new Discord.Client({ws: {Intents: new Discord.Intents(Discord.Intents.ALL)}});
const config = require("./config.json");
const fs = require("fs");
const fse = require("fs-extra");
let prefix = config.prefix;

Array.prototype.romove = function(x){
    return this.filter(function(v){
     return v !== x;
    });
   };
   
   client.on("error", (e) => console.error(e));
   
   client.on("ready", () => {
      console.log(`Impostor esta listo!,En ${client.user.tag}`)
   
   });
   
   
   client.on("message", async message => {
      
         if(message.author.bot) return;
         if(!message.guild) return;
         if(!message.content.startsWith(config.prefix)) return;
         var fullmsg = message.content.split(" ");
         var command = fullmsg [0].replace(config.prefix, "");

         if (!command) return; 
         if(command === "impostor") { //El comando
 message.delete();
            const mencionado = message.mentions.members.first() //Definimos mencionado
            
            let random = [
            "No era el impostor",
            "Era el impostor"
            ] //Hacemos frases para ver si es o no
            
            
            if(!mencionado)//Si el autor no menciono a nadie
            
             return message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.
            
            　　　.　　　 　　.　　　　　。　　 。　. 　
            
            .　　 。　　　　　 ඞ 。 . 　　 • 　　　　•
            
            　　ﾟ　　 ${message.author.username} ${random[Math.floor(Math.random() * random.length)]} 　 。　.
            
            　　'　　　 ${Math.floor(Math.random() * 3) + 1} Impostores restantes 　 　　。
            
            　　ﾟ　　　.　　　. ,　　　　.　 .`) //Enviamos el mensaje
            
            //Pero si menciona
            
            message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.
            
            　　　.　　　 　　.　　　　　。　　 。　. 　
            
            .　　 。　　　　　 ඞ 。 . 　　 • 　　　　•
            
            　　ﾟ　　 ${mencionado.user.username} ${random[Math.floor(Math.random() * random.length)]} 　 。　.
            
            　　'　　　 ${Math.floor(Math.random() * 3) + 1} Impostores restantes 　 　　。
            
            　　ﾟ　　　.　　　. ,　　　　.　 .`)}    
});

client.login(config.token);