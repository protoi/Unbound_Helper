const Discord = require("discord.js");
const fetch = require("node-fetch");
const keepActive = require("./server");
require("dotenv").config();

const client = new Discord.Client();
var name;
const downloadLink =
  "https://www.mediafire.com/file/brvvppywnxhmsdb/Pokemon+Unbound+Official+Patch+2.0+.zip/file";

const prefix = ";";

function fetchData(endpoint) {
  let fetchedData = [];
  try {
    fetch(endpoint)
      .then((blob) => blob.json())
      .then((data) => {
        fetchedData.push(...data);
      });
  } catch (err) {
    console.log("cummie cock");
  }
  // console.log(fetchData)
  return fetchedData;
}

const endpointLvlUp =
  "https://gist.githubusercontent.com/protoi/46be0275ecea2faf764605219b0af1b9/raw/5e50d5604d873ac77e6e552efdaa224bb2519036/pokemondatasetv2.json";
let names = [];
names = fetchData(endpointLvlUp);

const endpointEgg =
  "https://gist.githubusercontent.com/protoi/5743f974b841e11c621f819ee724cdc3/raw/3f98f93fccc06ef9a9872bf5f0765839f4270821/eggmoves.json";
let eggnames = [];
eggnames = fetchData(endpointEgg);

const endpointTM =
  "https://gist.githubusercontent.com/protoi/b382e90243f76b4ae0ee8c114f23cd21/raw/42d7b354144bbcfc4cdc678191ccc6cf7784307d/TMLocationv2.json";
let tmnames = [];
tmnames = fetchData(endpointTM);

const endpointpokelocation =
  "https://gist.githubusercontent.com/protoi/c8fd17223e96753efceb96ec7e50605b/raw/2864bbaa1d102f776e9f5067e70eec7fa6e002e1/pokelocationsv2.json";
let pokelocation = [];
pokelocation = fetchData(endpointpokelocation);

const endpointmega =
  "https://gist.githubusercontent.com/protoi/14b6736a9f4ca6d82aa5c470d3de3d29/raw/5bfb59ab6442846afabcc431f06585de48baefcf/megastonesv2.json";
let megalocation = [];
megalocation = fetchData(endpointmega);

const endpointz =
  "https://gist.githubusercontent.com/protoi/b0fe471d62f68ae9a7528294556f9bdb/raw/89fd4b91c59f7b051910d9a41fc15d88ba3a4d6f/zmoves.json";
let zlocation = [];
zlocation = fetchData(endpointz);

const endpointScale =
  "https://gist.githubusercontent.com/protoi/36e538d025ddc92112d2b9a8711703ad/raw/9b9d71baaddc7cb1cb821ef74ee93935241dec3a/scalemon.json";
let scalenames = [];
scalenames = fetchData(endpointScale);

const endpointHeldItems =
  "https://gist.githubusercontent.com/protoi/6f1ec09ab59d31b9483e1e1520ea3f97/raw/3c64484973cb64e47dae00b2f9839f0b2e9e2c3a/HeldItemsv2.json";
let heldItemsName = [];
heldItemsName = fetchData(endpointHeldItems);

const endpointAbilities =
  "https://gist.githubusercontent.com/protoi/ac007213bb6c0ff9ac2bbcbeb28469a9/raw/5157fedac63bcb802b267be20669344aa71ba1b9/abilitiesv2.json";
let abilities = [];
abilities = fetchData(endpointAbilities);

const endpointAbilityDescription =
  "https://gist.githubusercontent.com/protoi/60e7f90624d45e6ff3ad0948c955daeb/raw/103fb2694b6e8299c6e5d4d9f92fcf291cb21dc6/abilityDescription.json";
let abilityDescription = [];
abilityDescription = fetchData(endpointAbilityDescription);

///////////////////////////////////////////////////////////////////////////////not verified
const endpointTutorAndTmCompatibility =
  "https://gist.githubusercontent.com/protoi/fb1d01321e38523e675841cf8a0c38fe/raw/838d99f69191492e2481cde5066e46d4517d5bbb/TutorAndTmCompatibility.json";
let tutorAndTmCompatibility = [];
tutorAndTmCompatibility = fetchData(endpointTutorAndTmCompatibility);
/////////////////////////////////////////////////////////////////////////////// not verified

//functions start here 😩
try {
  function normalizeString(str) {
    var answer = "";

    answer = str.replace(/[.:\-\s_*]/g, "");

    return answer.toLowerCase();
  }

  function findAbilityDescription(abilityName, abilityList) {
    var answer = "...";
    abilityList.forEach((element) => {
      if (normalizeString(abilityName) == normalizeString(element.name)) {
        answer = element.effect;
      }
    });
    return answer;
  }

  function findAbility(pokemonName, abilityList) {
    var answer;
    abilityList.forEach((element) => {
      if (normalizeString(pokemonName) == normalizeString(element.name)) {
        answer = element;
      }
    });
    return answer;
  }

  function findHeldItemLocation(itemName, itemList) {
    var answer;
    itemList.forEach((element) => {
      if (normalizeString(itemName) == normalizeString(element.itemname)) {
        answer = element;
      }
    });
    return answer;
  }

  function findScaledStats(pokename, statList) {
    var answer;
    statList.forEach((element) => {
      if (normalizeString(pokename) == normalizeString(element.name)) {
        answer = element;
      }
    });
    return answer;
  }

  function findLocation(pokename, locationList) {
    var answer;
    locationList.forEach((element) => {
      if (normalizeString(pokename) === normalizeString(element.name)) {
        answer = element;
      }
    });
    return answer;
  }

  function findTMmatches(tmtomatch, tmlist) {
    var answer;
    tmlist.forEach((element) => {
      if (
        normalizeString(tmtomatch) ===
          normalizeString(element.tmnumber.toString()) ||
        normalizeString(tmtomatch) === normalizeString(element.tmname)
      ) {
        answer = element;
      }
    });
    return answer;
  }

  function findMatches(wordToMatch, names) {
    var answer;
    names.forEach((element) => {
      if (normalizeString(wordToMatch) === normalizeString(element.name)) {
        answer = element;
      }
    });
    return answer;
  }

  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!!!!`);
    console.log("Hello world");
  });

  client.on("message", (msg) => {
    if (msg.author.bot) return;

    function displayMatches(nameOfMon, moveList) {
      displayMoves = "";

      moveList.lvlUpMoves.forEach((element) => {
        displayMoves =
          displayMoves + element[0] + " - " + element[1].toLowerCase() + "\n";
      });
      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle(nameOfMon.toLowerCase())
        .setDescription(displayMoves);
      msg.channel.send(exampleEmbed);
    }

    function displayEggMatches(nameOfMon, moveList) {
      displayEggMoves = "";
      moveList.eggMoves.forEach((element) => {
        displayEggMoves = displayEggMoves + element.toLowerCase() + "\n";
      });
      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle(nameOfMon.toLowerCase())
        .setDescription(displayEggMoves);
      msg.channel.send(exampleEmbed);
    }

    //UNTESTED CODE/////////////////////////////////////////////

    function displayTutorMatches(nameOfMon, moveList) {
      displayTutorMoves = "";
      moveList.tutorMoves.forEach((element) => {
        displayTutorMoves = displayTutorMoves + element.toLowerCase() + ", ";
      });
      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle(nameOfMon.toLowerCase())
        .setDescription(displayTutorMoves);
      msg.channel.send(exampleEmbed);
    }

    function displayTMLearnsetMatches(nameOfMon, moveList) {
      displayTMLearnsetMoves = "";
      moveList.tmMoves.forEach((element) => {
        displayTMLearnsetMoves =
          displayTMLearnsetMoves + element.toLowerCase() + ", ";
      });
      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle(nameOfMon.toLowerCase())
        .setDescription(displayTMLearnsetMoves);
      msg.channel.send(exampleEmbed);
    }

    //UNTESTED CODE/////////////////////////////////////////////

    function displayTMmatches(tmdata) {
      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle("TM #" + tmdata.tmnumber)
        .setDescription(tmdata.tmname + "\n" + tmdata.tmlocation);
      msg.channel.send(exampleEmbed);
    }

    function displayPokeLocation(locationdata) {
      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle("Location of " + locationdata.name)
        .setDescription(locationdata.location);
      msg.channel.send(exampleEmbed);
    }

    function displayStats(pokedata) {
      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle(pokedata.name)
        .setDescription(
          "HP: " +
            pokedata.hp +
            "\nAttack: " +
            pokedata.attack +
            "\nDefense: " +
            pokedata.defense +
            "\nSp. Attack: " +
            pokedata.spattack +
            "\nSp. Def: " +
            pokedata.spdef +
            "\nSpeed: " +
            pokedata.speed +
            "\n\nTotal: " +
            pokedata.total
        );
      msg.channel.send(exampleEmbed);
    }

    function displayItemLocation(locationdata) {
      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle("Location of " + locationdata.itemname)
        .setDescription(locationdata.location);
      msg.channel.send(exampleEmbed);
    }

    function displayAbility(abilityData) {
      let description1 = findAbilityDescription(
        abilityData.Ability[0],
        abilityDescription
      );
      let description2 = findAbilityDescription(
        abilityData.Ability[1],
        abilityDescription
      );
      let descriptionHA = findAbilityDescription(
        abilityData.Ability[2],
        abilityDescription
      );

      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle(abilityData.name)
        .setDescription(
          "Ability 1: **" +
            abilityData.Ability[0] +
            "**\n" +
            description1 +
            "\n\nAbility 2: **" +
            abilityData.Ability[1] +
            "**\n" +
            description2 +
            "\n\nHidden Ability: **" +
            abilityData.Ability[2] +
            "**\n" +
            descriptionHA
        );
      msg.channel.send(exampleEmbed);
    }

    if (msg.content === ";ping") {
      msg.reply("pong");
      // console.table(names);
    }

    if (msg.content.startsWith(";moves ")) {
      name = msg.content.split(";moves ")[1];

      var answer = findMatches(name, names);

      if (answer == null) {
        msg.channel.send("invalid input");
      } else {
        displayMatches(answer.name, answer);
      }
    }

    //for egg moves only

    if (msg.content.startsWith(";eggmoves ")) {
      name = msg.content.split(";eggmoves ")[1];

      const answer = findMatches(name, eggnames);
      if (answer == null) {
        msg.channel.send("invalid input");
      } else {
        displayEggMatches(answer.name, answer);
      }
    }
    //UNTESTED CODE/////////////////////////////////////////////////////////////////////

    if (msg.content.startsWith(";tutor ")) {
      name = msg.content.split(";tutor ")[1];

      const answer = findMatches(name, tutorAndTmCompatibility); //change eggnames to tutorAndTmCompatibilityList
      if (answer == null) {
        msg.channel.send("invalid input");
      } else {
        displayTutorMatches(answer.name, answer); //NOT DECLARED YET
      }
    }

    if (msg.content.startsWith(";learntm ")) {
      name = msg.content.split(";learntm ")[1];

      const answer = findMatches(name, tutorAndTmCompatibility); //change eggnames to tutorAndTmCompatibilityList
      if (answer == null) {
        msg.channel.send("invalid input");
      } else {
        displayTMLearnsetMatches(answer.name, answer); //NOT DECLARED YET
      }
    }

    //UNTESTED CODE////////////////////////////////////////////////////////////////////

    if (msg.content.startsWith(";tm ")) {
      name = msg.content.split(";tm ")[1];

      const answer = findTMmatches(name, tmnames);
      if (answer == null) {
        msg.channel.send("invalid input");
      } else {
        displayTMmatches(answer);
      }
    }

    if (msg.content.startsWith(";location ")) {
      name = msg.content.split(";location ")[1];
      const answer = findLocation(name, pokelocation);
      if (answer == null) {
        msg.channel.send("invalid input");
      } else {
        displayPokeLocation(answer);
      }
    }

    if (msg.content.startsWith(";megastone ")) {
      name = msg.content.split(";megastone ")[1];
      const answer = findLocation(name, megalocation);
      if (answer == null) {
        msg.channel.send("invalid input");
      } else {
        displayPokeLocation(answer);
      }
    }

    if (msg.content.startsWith(";z ")) {
      name = msg.content.split(";z ")[1];
      //console.log(name);
      const answer = findLocation(name, zlocation);
      // console.log(answer);
      if (answer == null) {
        msg.channel.send("invalid input");
      } else {
        displayPokeLocation(answer);
      }
    }

    //

    if (msg.content.startsWith(";scale ")) {
      try {
        name = msg.content.split(";scale ")[1];
        //console.log(name);
        const answer = findScaledStats(name, scalenames);
        // console.log(answer);
        if (answer == null) {
          msg.channel.send("invalid input");
        } else {
          displayStats(answer);
        }
      } catch (e) {
        console.log("whoops");
      }
    }

    if (msg.content.startsWith(";helditem ")) {
      name = msg.content.split(";helditem ")[1];
      const answer = findHeldItemLocation(name, heldItemsName);
      if (answer == null) {
        msg.channel.send("invalid input");
      } else {
        displayItemLocation(answer);
      }
    }

    if (msg.content.startsWith(";ability ")) {
      try {
        name = msg.content.split(";ability ")[1];
        const answer = findAbility(name, abilities);
        if (answer == null) {
          msg.channel.send("invalid input");
        } else {
          displayAbility(answer);
        }
      } catch (e) {
        console.log("whoops");
      }
    }

    if (msg.content === ";missing") {
      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle("Missing Content")
        .addFields(
          {
            name: "The Pokemon",
            value:
              "**Pokemons: **\nMewtwo\nGenesect\nMarshadow\nPoipole& Naganadel\nMeltan & Melmetal",
          },
          {
            name: "The Mega Stones",
            value: "Mewtwonites",
          },
          { name: "The Z-Crystals", value: " Incinium Z" },
          {
            name: "Certain Missions cannot currently be completed:",
            value: "The National Pokedex (not officially)",
          },
          {
            name: "Certain locations cannot be accessed:",
            value: "Cube Corp. Interior",
          }
        );
      msg.channel.send(exampleEmbed);
    }

    if (msg.content === ";statmods") {
      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle(
          "Natures can be changed in Tehl Town. Complete the Mission requiring the four different forms of Sawsbuck."
        )
        .setDescription("Bottle Cap Lady: Seaport Port");
      msg.channel.send(exampleEmbed);
    }

    if (msg.content === ";difficulty") {
      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle("Which difficulty should I pick:")
        .addFields(
          {
            name: "Casual",
            value:
              "More in line with official game difficulty nowadays. Play this if you like over leveling or just want to play a game without worrying too much about the battles. My 8-year old brother beat this several times using Ash's teams (and remember, Ash rarely evolved his Pokemon). EV training is not required.",
          },
          {
            name: "Difficult",
            value:
              "• Difficult: You're looking for something slightly harder than normal Pokémon games, and don't mind losing boss battles once or twice to force you to rethink your strategy with the same team. EV training is not required.",
          },
          {
            name: "Expert",
            value:
              "• Expert: If you're running a fully EV trained team, this is probably going to be as hard as Difficult early on. You also probably won't need to change up your team in between major battles. Late game will get harder, though, but still nowhere near as hard as Insane",
          },
          {
            name: "Insane",
            value:
              "Insane: This should be the hardest hack you've ever played. Period. Items can't be used in Trainer battles, and bosses all have a team with competitive movesets and full EVs. If you're ready to rage quit after the first Gym, this difficulty is NOT for you. It was designed to be inherently unfun for most players.",
          }
        );
      msg.channel.send(exampleEmbed);
    }

    if (msg.content === ";shinyodd" || msg.content === ";shiny") {
      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle("Shiny Odds:")
        .setDescription(
          "Regular Shiny Odds: 1/4096\nShiny Odds with Shiny Charm: 1/1365\nMasuda Method: 1/683\nMasuda Method + Shiny Charm: 1/512\nMax Search Levels + Encounter at Chain Length 100 + Shiny Charm: 2.039%\nMax Search Levels + Encounter at Chain Length 100: 0.68%\nMax Search Levels + Shiny Charm: 0.478%\nMax Search Levels: 0.159%\nScammer Method: 100%"
        );
      msg.channel.send(exampleEmbed);
    }

    if (msg.content === ";pickup" || msg.content === ";pick") {
      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle("Drop Table(thank you `SevenK`):")
        .setImage(
          "https://cdn.discordapp.com/attachments/810125662937284619/916670464712142898/2.0Pickup.png"
        );
      msg.channel.send(exampleEmbed);
    }

    if (msg.content === ";KBT" || msg.content === ";kbt") {
      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle(
          "K.B.T tutor list(thank you `fox appreciation`, `SevenK`, LuckyHour and Falkyri3):"
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/792456927073796117/964141023267786794/tutor_infographic.png"
        );
      msg.channel.send(exampleEmbed);
    }

    if (msg.content === ";json") {
      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle(
          "JSON File Links `huge thankyou to sparrow and SevenK for helping with the JSON formatting`:"
        )
        .setDescription(
          "[Level Up Moves:](" +
            endpointLvlUp +
            ")\n\n[Egg Moves:](" +
            endpointEgg +
            ")\n\n[TM Locations:](" +
            endpointTM +
            ")\n\n[Pokemon Location: ](" +
            endpointpokelocation +
            ")\n\n[Mega Stones:](" +
            endpointmega +
            ")\n\n[Z-Moves:](" +
            endpointz +
            ")\n\n[Scalemons:](" +
            endpointScale +
            ")\n\n[Held Items:](" +
            endpointHeldItems +
            ")\n\n[Abilities:](" +
            endpointAbilities +
            ")"
        );
      msg.channel.send(exampleEmbed);
    }

    if (msg.content === ";league") {
      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle(
          "Gym Leader Teams on Insane Difficulty for v2.0.1\nA huge thank you to Takami, Luckyhour(furry), Yin, Sub and Jay for making all the pokepastes"
        )
        .setDescription(
          "Gym Challenge:\n[Gym 1- Mirskle:](" +
            "https://pokepast.es/6998c53098e96079" +
            ")\n\n[Gym 2- Vega:](" +
            "https://pokepast.es/c4d8287578230c48" +
            ")\n\n[Gym 3- Alice:](" +
            "https://pokepast.es/694af4f398a45ca6" +
            ")\n\n[Gym 4- Mel:](" +
            "https://pokepast.es/fac9e83ba0405b87" +
            ")\n\n[Maxima:](" +
            "https://pokepast.es/cf2477bb14920bb2" +
            ")\n\n[Gym 5- Galavan:](" +
            "https://pokepast.es/7d28d007b50cf1a0" +
            ")\n\n[Gym 6- Big Mo:](" +
            "https://pokepast.es/4a372069df9cfc4a" +
            ")\n\n[Gym 7- Tessy:](" +
            "https://pokepast.es/aa602ef802708570" +
            ")\n\n[Gym 8- Benjamin:](" +
            "https://pokepast.es/10e68dc6df64d0dd" +
            ")\n\nElite Four and Champion:" +
            "\n[Moleman:](" +
            "https://pokepast.es/12eaab54732c5af0" +
            ")\n\n[Elias:](" +
            "https://pokepast.es/a2f0783835899494" +
            ")\n\n[Anabelle:](" +
            "https://pokepast.es/48acac196bdecc2d" +
            ")\n\n[Penny:](" +
            "https://pokepast.es/9c1dec4b8fa4aff3" +
            ")\n\n[The Champion:](" +
            "https://pokepast.es/ffa3d2e7a5079902" +
            ")"
        );
      msg.channel.send(exampleEmbed);
    }

    if (msg.content === ";breeding") {
      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle("Extreme Hyperosmia Breeding Help:")
        .addFields(
          { name: "Wynaut:", value: "Breed Wobuffet  with Lax Incense." },
          { name: "Munchlax:", value: "Breed Snorlax with Full Incense." },
          { name: "Chingling:", value: "Breed Chimecho with Pure Incense." },
          { name: "Mime Jr:", value: "Breed Mr. Mime with Odd Incense." },
          { name: "Bonsly:", value: "Breed Sudowoodo with Rock Incense." },
          { name: "Mantyke:", value: "Breed Mantine with Wave Incense." },
          { name: "Azuril:", value: "Breed Azumarill with Sea Incense." },
          {
            name: "Budew:",
            value: "Breed Roserade/Roselia with Rose Incense.",
          },
          {
            name: "Happiny:",
            value: "Breed Chansey/Blissey with Luck Incense.",
          }
        );
      msg.channel.send(exampleEmbed);
    }

    if (msg.content === ";rollingdowninthedeep") {
      roller =
        "what:flushed:you:smirk:know:face_with_symbols_over_mouth:about:astonished:rolling:rolling_eyes:down:grin:in:pleading_face:the:face_with_raised_eyebrow:deep:cold_face:when:thinking:your:fearful:brain:brain:goes:weary:numb:slight_frown:you:hot_face:can:woozy_face:call:money_mouth:that:clown:mental:stuck_out_tongue_winking_eye:freeze:ice_cube:when:heart_eyes:these:dancer:people:two_women_holding_hands:talk:speaking_head:";
      msg.channel.send(roller);
    }

    if (msg.content === ";caps" || msg.content === ";lvlcaps") {
      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle("Level Caps:")
        .setDescription(
          "**Gym 1:** 20\n**Gym 2:** 26\n**Gym 3:** 32\n**Gym 4:** 36\n**Maxima:** 40\n**Gym 5:** 45\n**Gym 6:** 52\n**Gym 7:** 57\n**Gym 8:** 61\n**Elite 4:** 75"
        );
      msg.channel.send(exampleEmbed);
    }

    if (msg.content === ";download") {
      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle("Pokemon Unbound Official Patch:")
        .setDescription(
          "[Pokemon Unbound Official Patch Link:](" + downloadLink + ")"
        );
      msg.channel.send(exampleEmbed);
    }

    if (msg.content === ";update" || msg.content === ";updatewhen") {
      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle("s o o n")
        .setDescription("soon™");
      msg.channel.send(exampleEmbed);
    }

    if (msg.content === ";gen8" || msg.content === ";gen 8") {
      msg.channel.send("YESSSS<:quagsireBusiness:881923716739657788>");
    }

    if (msg.content === ";commands" || msg.content === ";help") {
      const exampleEmbed = new Discord.MessageEmbed()
        .setTitle("Commands:")
        .addFields(
          {
            name: prefix + "moves",
            value:
              "Syntax: `;moves <pokemon_name>`\nDisplays the level up moves of a pokemon",
          },
          {
            name: prefix + "eggmoves",
            value:
              "Syntax: `;eggmoves <pokemon_name>`\nDisplays the egg moves of a pokemon",
          },
          {
            name: prefix + "ability",
            value:
              "Syntax: `;ability <pokemon_name>`\nDisplays the abilities of the Pokemon, thank SevenK for this :pleading_face:",
          },
          {
            name: prefix + "tm",
            value:
              "Syntax: `;tm <tm_number>` OR `;tm <tm_name>`\nDisplays the location of the TM",
          },
          {
            name: prefix + "location",
            value:
              "Syntax: `;location <pokemon_name>`\nDisplays the location(s) of a pokemon(thank you Spectre and SevenK for the pokemon guide)",
          },
          {
            name: prefix + "megastone",
            value:
              "Syntax: `;megastone <megastone_name>`\nDislays the mega stone location.",
          },
          {
            name: prefix + "z",
            value: "Syntax: `;z <z move_name>`\nDislays the Z move location.",
          },
          {
            name: prefix + "helditem",
            value:
              "Syntax: `;helditem <item name>`\nDislays the held item location(may not have everything you want) Thankyou Sparrow and SevenK🥺🥺🥺.",
          },
          {
            name: prefix + "difficulty",
            value: "Syntax: `;difficulty`\nDisplays the difficulty summary",
          },
          {
            name: prefix + "missing",
            value:
              "Syntax: `;missing`\nDisplays all the missing pokemons, items and locations",
          },
          {
            name: prefix + "statmods",
            value:
              "Syntax: `;statmods`\nDisplays the bottle cap lady's schedue",
          },

          {
            name: prefix + "shinyodd",
            value:
              "Syntax: `;shinyodd` OR `;shiny`\nDisplays the odds of getting a shiny",
          },
          {
            name: prefix + "pickup",
            value:
              "Syntax: `;pickup` OR `;pick`\nDisplays the pickup drop table",
          },
          {
            name: prefix + "kbt",
            value: "Syntax: `;kbt` OR `;KBT`\nDisplays the KBT tutor list",
          },
          {
            name: prefix + "breeding",
            value:
              "Syntax: `;breeding`\nDisplays the incenses required to breed certain pokemons",
          },
          {
            name: prefix + "json",
            value:
              "Syntax: `;json`\nlinks the level up move, egg move, tm location and pokemon location json file",
          },
          {
            name: prefix + "caps",
            value:
              "Syntax: `;caps` OR `;lvlcaps`\nDislays the levels caps of Gym Leaders.",
          },
          {
            name: prefix + "download",
            value:
              "Syntax: `;download`\nThe URL to download the latest patch to Pokemon Unbound.",
          },
          {
            name: prefix + "league",
            value:
              "Syntax: `;league`\nGym Leader and Elite 4 teams for the Insane difficulty.",
          },

          {
            name: prefix + "tutor",
            value: "Syntax: `;tutor <pokemon_name> `\nshows tutor compatibility, thanks dave99 for the lists!!",
          },
          {
            name: prefix + "learntm",
            value: "Syntax: `;learntm <pokemon_name>`\nshows tm compatibility, thanks dave99 again!!!!",
          },
          {
            name: prefix + "scale",
            value: "Syntax: `;scale <pokemon_name>`\nscalemon stats",
          }
        );
      msg.channel.send(exampleEmbed);
    }
  });

  keepActive();
  client.login(process.env.mytoken);
  // client.login(process.env.mytoken2);
  // client.login(delThisLater);
} catch (err) {}
