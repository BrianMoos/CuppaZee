var fs = require('fs');

const colors = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",
  fg: {
    Black: "\x1b[30m",
    Red: "\x1b[31m",
    Green: "\x1b[32m",
    Yellow: "\x1b[33m",
    Blue: "\x1b[34m",
    Magenta: "\x1b[35m",
    Cyan: "\x1b[36m",
    White: "\x1b[37m",
    Crimson: "\x1b[38m"
  },
  bg: {
    Black: "\x1b[40m",
    Red: "\x1b[41m",
    Green: "\x1b[42m",
    Yellow: "\x1b[43m",
    Blue: "\x1b[44m",
    Magenta: "\x1b[45m",
    Cyan: "\x1b[46m",
    White: "\x1b[47m",
    Crimson: "\x1b[48m"
  }
};

var munzees = [];

console.log(`${colors.bg.Green}${colors.fg.Black} Generating Types... ${colors.Reset}`)

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Destinations${colors.Reset} from ${colors.fg.Green}./types/destination.json${colors.Reset}`)
munzees = munzees.concat(require('./types/destination.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  destination: {
    type: i.type,
    temporary: i.temp,
    max_rooms: i.rooms,
    room_of: i.room_of
  },

  can_swap: i.state == "physical" || undefined,

  capture_radius: (i.state == "virtual" && i.type != "room") ? 500 : undefined,

  state: i.state,
  category: "destination",

  completion: "complete",
  from_file: "./types/destination.json"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Custom Events${colors.Reset} from ${colors.fg.Green}./types/event.json${colors.Reset}`)
munzees = munzees.concat(require('./types/event.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  event: "custom",

  state: "physical",
  category: "event",

  completion: "complete",
  from_file: "./types/event.json"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Evolutions${colors.Reset} from ${colors.fg.Green}./types/evolution.json${colors.Reset}`)
munzees = munzees.concat(require('./types/evolution.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  evolution: {
    stage: i.stage,
    set: i.set,
    base: i.base
  },

  state: i.state,
  category: "evolution",

  completion: "complete",
  from_file: "./types/evolution.json"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Fancy Flats${colors.Reset} from ${colors.fg.Green}./types/fancyflat.json${colors.Reset}`)
munzees = munzees.concat(require('./types/fancyflat.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  ...(i.hosts ? {
    host: {
      type: "flat",
      hosts: i.hosts
    },

    state: i.state,
    category: "bouncerhost"
  } : {
      bouncer: {
        type: "flat",
        duration: 12,
        lands_on: [
          "flatrob",
          x => (x.virtual_colors || []).includes(i.color),
          ...(i.lands_on || [])
        ]
      },

      state: "bouncer",
      category: "fancyflat"
    }),

  completion: "complete",
  from_file: "./types/fancyflat.json"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Flats${colors.Reset} from ${colors.fg.Green}./types/flat.json${colors.Reset}`)
munzees = munzees.concat(require('./types/flat.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  flat: true,
  unique: i.unique,

  state: "virtual",
  category: "flat",

  completion: "complete",
  from_file: "./types/flat.json"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Gaming${colors.Reset} from ${colors.fg.Green}./types/gaming.json${colors.Reset}`)
munzees = munzees.concat(require('./types/gaming.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  gaming: true,

  state: i.state,
  category: "gaming",

  completion: "complete",
  from_file: "./types/gaming.json"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Jewels${colors.Reset} from ${colors.fg.Green}./types/jewel.json${colors.Reset}`)
munzees = munzees.concat(require('./types/jewel.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  jewel: true,

  state: i.state,
  category: "jewel",

  completion: "complete",
  from_file: "./types/jewel.json"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Virtuals${colors.Reset} from ${colors.fg.Green}./types/virtual.json${colors.Reset}`)
munzees = munzees.concat(require('./types/virtual.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  virtual_colors: i.virtual_colors,
  ...(i.extra || {}),
  state: i.state,
  category: "virtual",

  completion: "complete",
  from_file: "./types/virtual.json"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Misc${colors.Reset} from ${colors.fg.Green}./types/misc.json${colors.Reset}`)
munzees = munzees.concat(require('./types/misc.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  ...(i.extra || {}),
  state: i.state,
  category: "misc",

  completion: "complete",
  from_file: "./types/misc.json"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Mysteries${colors.Reset} from ${colors.fg.Green}./types/mystery.json${colors.Reset}`)
munzees = munzees.concat(require('./types/mystery.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  elemental: i.elemental,

  state: i.state,
  category: "mystery",

  completion: "complete",
  from_file: "./types/mystery.json"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Mythologicals${colors.Reset} from ${colors.fg.Green}./types/myth.js${colors.Reset}`)
munzees = munzees.concat(require('./types/myth').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  ...(i.hosts ? {
    host: {
      type: "myth",
      hosts: i.hosts
    },

    state: i.state,
    category: "bouncerhost"
  } : {
      bouncer: {
        type: "myth",
        base: i.base,
        duration: i.duration || 12,
        lands_on: i.lands_on
      },

      state: "bouncer",
      category: "myth"
    }),

  completion: "complete",
  from_file: "./types/myth.js"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}POIs${colors.Reset} from ${colors.fg.Green}./types/poi.json${colors.Reset}`)
munzees = munzees.concat(require('./types/poi.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  poi: true,

  state: "virtual",
  category: "poi",

  completion: "complete",
  from_file: "./types/poi.json"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Resellers${colors.Reset} from ${colors.fg.Green}./types/reseller.json${colors.Reset}`)
munzees = munzees.concat(require('./types/reseller.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  reseller: true,

  state: "physical",
  category: "reseller",

  completion: "complete",
  from_file: "./types/reseller.json"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Weapons${colors.Reset} from ${colors.fg.Green}./types/weapon.json${colors.Reset}`)
munzees = munzees.concat(require('./types/weapon.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  weapon: i.weapon,

  state: "physical",
  category: i.weapon,

  completion: "complete",
  from_file: "./types/weapon.json"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Zodiacs${colors.Reset} from ${colors.fg.Green}./types/zodiac.json${colors.Reset}`)
munzees = munzees.concat(require('./types/zodiac.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  zodiac: i.zodiac,

  state: "physical",
  category: i.zodiac,

  completion: "complete",
  from_file: "./types/zodiac.json"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Tourisms${colors.Reset} from ${colors.fg.Green}./types/tourism.json${colors.Reset}`)
munzees = munzees.concat(require('./types/tourism.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  tourism: true,

  state: "virtual",
  category: "tourism",

  completion: "complete",
  from_file: "./types/tourism.json"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Cards${colors.Reset} from ${colors.fg.Green}./types/cards.json${colors.Reset}`)
munzees = munzees.concat(require('./types/cards.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  card: true,
  temporary: 7,

  state: "virtual",
  category: "card",

  completion: "complete",
  from_file: "./types/cards.json"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Nomads${colors.Reset} from ${colors.fg.Green}./types/nomad.js${colors.Reset}`)
munzees = munzees.concat(require('./types/nomad').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  bouncer: {
    type: "nomad",
    duration: i.duration || 12,
    lands_on: i.lands_on
  },

  state: "bouncer",
  category: "nomad",

  completion: "complete",
  from_file: "./types/nomad.js"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Pouch Creatures${colors.Reset} from ${colors.fg.Green}./types/pouch.js${colors.Reset}`)
munzees = munzees.concat(require('./types/pouch').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  ...(i.hosts ? {
    host: {
      type: "pouch",
      hosts: i.hosts
    },

    state: i.state,
    category: "bouncerhost"
  } : {
      gleaming: i.gleaming,
      funfinity: i.funfinity,
      bouncer: {
        type: "pouch",
        base: i.base,
        stage: i.stage,
        duration: i.duration || 6,
        lands_on: i.lands_on
      },

      state: "bouncer",
      category: "pouch"
    }),

  completion: "complete",
  from_file: "./types/pouch.js"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}RetireMyths${colors.Reset} from ${colors.fg.Green}./types/retiremyth.js${colors.Reset}`)
munzees = munzees.concat(require('./types/retiremyth').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  bouncer: {
    type: i.pouch ? "zombiepouch" : "retiremyth",
    base: i.base,
    duration: i.duration || 12,
    lands_on: i.lands_on
  },

  state: "bouncer",
  category: i.pouch ? "zombiepouch" : "retiremyth",

  completion: "complete",
  from_file: "./types/retiremyth.js"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Temp POBs${colors.Reset} from ${colors.fg.Green}./types/temppob.js${colors.Reset}`)
munzees = munzees.concat(require('./types/temppob').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  ...(i.hosts ? {
    host: {
      type: "temppob",
      hosts: i.hosts
    },

    state: i.state,
    category: "bouncerhost"
  } : {
      bouncer: {
        type: "temppob",
        base: i.base,
        duration: i.duration || 12,
        lands_on: i.lands_on
      },

      state: "bouncer",
      category: "temppob"
    }),
  ...(i.extra || {}),

  completion: "complete",
  from_file: "./types/temppob.js"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}TOBs${colors.Reset} from ${colors.fg.Green}./types/tob.js${colors.Reset}`)
munzees = munzees.concat(require('./types/tob').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  ...(i.hosts ? {
    host: {
      type: "tob",
      hosts: i.hosts
    },

    state: i.state,
    category: "bouncerhost"
  } : {
      bouncer: {
        type: "tob",
        base: i.base,
        duration: i.duration || 12,
        lands_on: i.lands_on
      },

      state: "bouncer",
      category: "tob"
    }),

  completion: "complete",
  from_file: "./types/tob.js"
})))

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Scatters${colors.Reset} from ${colors.fg.Green}./types/scatter.json${colors.Reset}`)
munzees = munzees.concat(require('./types/scatter.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  scatter: i.scatter,
  ...(i.extra || {}),

  state: i.state,
  category: i.category || "scatter",

  completion: "complete",
  from_file: "./types/scatter.json"
})))

console.log(`${colors.bg.Green}${colors.fg.Black} Types Generated - Checking... ${colors.Reset}`)

for (var munzee of munzees) {
  if (munzee.bouncer && munzee.bouncer.lands_on) {
    let lands_on = [];
    let index = 0;
    for (let host of munzee.bouncer.lands_on) {
      if (typeof host === "string") {
        if (host.startsWith(':')) {
          lands_on = lands_on.concat((munzees.filter(x => x.category == host.slice(1)) || []).map(i => i.id));
          if (munzees.filter(x => x.category == host.slice(1)).length === 0) {
            console.log(`${colors.bg.Red}  ${colors.Reset} No Munzees for ${colors.fg.Yellow}lands_on${colors.Reset}[${colors.fg.Yellow}${index}${colors.Reset}] for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
          }
        } else {
          lands_on.push((munzees.find(i => i.icon === host && i.redirect === undefined) || {}).id)
          if (!munzees.find(i => i.icon === host && i.redirect === undefined)) {
            console.log(`${colors.bg.Red}  ${colors.Reset} No Munzee for ${colors.fg.Yellow}bouncer${colors.Reset}.${colors.fg.Yellow}lands_on${colors.Reset}[${colors.fg.Yellow}${index}${colors.Reset}] for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
          }
        }
      } else if (typeof host === "function") {
        lands_on = lands_on.concat((munzees.filter(host) || []).map(i => i.id));
        if (munzees.filter(host).length === 0) {
          console.log(`${colors.bg.Red}  ${colors.Reset} No Munzees for ${colors.fg.Yellow}bouncer${colors.Reset}.${colors.fg.Yellow}lands_on${colors.Reset}[${colors.fg.Yellow}${index}${colors.Reset}] for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
        }
      }
      index++;
    }
    munzee.bouncer.lands_on = lands_on.filter(i => i !== undefined && i !== null);
  }

  if (munzee.bouncer) {
    if (!munzee.bouncer.lands_on) {
      console.log(`${colors.bg.Red}  ${colors.Reset} Missing ${colors.fg.Yellow}bouncer${colors.Reset}.${colors.fg.Yellow}lands_on${colors.Reset} for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
    }
    if (!munzee.bouncer.type) {
      console.log(`${colors.bg.Red}  ${colors.Reset} Missing ${colors.fg.Yellow}bouncer${colors.Reset}.${colors.fg.Yellow}type${colors.Reset} for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
    }
  }

  if (munzee.host) {
    if (!munzee.host.hosts) {
      console.log(`${colors.bg.Red}  ${colors.Reset} Missing ${colors.fg.Yellow}host${colors.Reset}.${colors.fg.Yellow}hosts${colors.Reset} for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
    }
    if (!munzee.host.type) {
      console.log(`${colors.bg.Red}  ${colors.Reset} Missing ${colors.fg.Yellow}host${colors.Reset}.${colors.fg.Yellow}type${colors.Reset} for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
    }
  }

  if (munzee.evolution) {
    if (!munzee.evolution.stage) {
      console.log(`${colors.bg.Red}  ${colors.Reset} Missing ${colors.fg.Yellow}evolution${colors.Reset}.${colors.fg.Yellow}stage${colors.Reset} for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
    }
    if (!munzee.evolution.set) {
      console.log(`${colors.bg.Red}  ${colors.Reset} Missing ${colors.fg.Yellow}evolution${colors.Reset}.${colors.fg.Yellow}set${colors.Reset} for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
    }
    if (!munzee.evolution.base) {
      console.log(`${colors.bg.Red}  ${colors.Reset} Missing ${colors.fg.Yellow}evolution${colors.Reset}.${colors.fg.Yellow}base${colors.Reset} for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
    }
  }

  if (munzee.destination) {
    if (!munzee.destination.type) {
      console.log(`${colors.bg.Red}  ${colors.Reset} Missing ${colors.fg.Yellow}destination${colors.Reset}.${colors.fg.Yellow}type${colors.Reset} for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
    }
  }
  if (munzee.id===undefined) {
    console.log(`${colors.bg.Red}  ${colors.Reset} Missing ${colors.fg.Yellow}id${colors.Reset} for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
  }

  delete munzee.from_file;
}
for (var munzee of munzees) {
  munzee.can_host = munzees.filter(i => i.bouncer && (i.bouncer.lands_on || []).includes(munzee.id)).map(i => i.id);
  if (munzee.can_host.length == 0) munzee.can_host = undefined;
}

munzees.sort((a, b) => (a.id||0) - (b.id||0));

console.log(`${colors.bg.Green}${colors.fg.Black} Types Checked - Writing to Files... ${colors.Reset}`)

fs.writeFileSync('types.json', JSON.stringify(munzees, null, 2))
fs.writeFileSync('types.min.json', JSON.stringify(munzees))
fs.writeFileSync('../PaperZee/sections/DB/types.json', JSON.stringify(munzees))

console.log(`${colors.bg.Green}${colors.fg.Black} Types Written to Files${colors.Reset}`)