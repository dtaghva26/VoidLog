export const PROMPTS = {
  coding: [
    "What cool thing did you make or work on today? 🛠️",
    "Did anything break or go wrong? What happened?",
    "What's one new thing you learned?",
    "What would you try differently next time?",
    "What are you most proud of from today? ⭐"
  ],
  gaming: [
    "What game did you play today? 🎮",
    "What was the hardest part or toughest enemy?",
    "Did you get better at anything?",
    "What was your favourite moment?",
    "What's your mission for next time? 🚀"
  ]
};
export const VIBES = ["😵","😬","😐","😄","🤩"];
export const VIBE_LABELS = ["Rough","Meh","Okay","Awesome","EPIC!"];
export const VIBE_COLORS = ["#D552A3","#D552A3","#D552A3","#462C7D","#FF70BF"];
export const SUGGESTED_TAGS = {
  coding: ["#python","#scratch","#javascript","#bug","#fixed-it","#proud","#html","#game"],
  gaming: ["#minecraft","#roblox","#fortnite","#win","#loss","#co-op","#speedrun","#story"]
};
export const BADGES = [
  { id:"first", icon:"🌟", label:"First Quest", check: e => e.length >= 1 },
  { id:"streak3", icon:"🔥", label:"3-Day Streak", check: e => { const days=[...new Set(e.map(x=>new Date(x.date).toDateString()))]; let s=0,d=new Date(); for(let i=0;i<30;i++){if(days.includes(d.toDateString()))s++; else if(i>0)break; d.setDate(d.getDate()-1);} return s>=3; }},
  { id:"coder", icon:"💻", label:"Coder", check: e => e.filter(x=>x.type==="coding").length>=3 },
  { id:"gamer", icon:"🎮", label:"Gamer", check: e => e.filter(x=>x.type==="gaming").length>=3 },
  { id:"doublelife", icon:"⚡", label:"Double Life", check: e => e.some(x=>x.type==="coding")&&e.some(x=>x.type==="gaming") },
  { id:"veteran", icon:"🏆", label:"Veteran", check: e => e.length>=10 },
  { id:"bugsquash", icon:"🐛", label:"Bug Squasher", check: e => e.some(x=>x.reflections.some(r=>r.toLowerCase().includes("bug")||r.toLowerCase().includes("broke"))) },
];
export const XP_PER_ENTRY = 50;
export const calcXP = e => e.length*XP_PER_ENTRY + e.reduce((a,x)=>a+x.reflections.filter(Boolean).length*5,0);
export const calcLevel = xp => Math.floor(xp/200)+1;
export const PET_TYPES = [{ id:"dragon",name:"Dragon" },{ id:"dog",name:"Puppy" },{ id:"cat",name:"Kitten" },{ id:"frog",name:"Frog" }];
export const FOODS = [
  { id:"apple",name:"Apple",emoji:"🍎",xpCost:10,growth:1 },
  { id:"pizza",name:"Pizza",emoji:"🍕",xpCost:25,growth:3 },
  { id:"cake",name:"Cake",emoji:"🎂",xpCost:50,growth:6 },
  { id:"star",name:"Star Candy",emoji:"⭐",xpCost:80,growth:10 },
];
export const STAGES = [{ name:"Baby",minGrowth:0 },{ name:"Kid",minGrowth:5 },{ name:"Teen",minGrowth:15 },{ name:"Legend",minGrowth:30 }];
export function getStage(g) { let s=STAGES[0]; for(const x of STAGES){if(g>=x.minGrowth)s=x;} return s; }

// ── BLOCK DEFINITIONS ──────────────────────────────────────────────
export const BLOCK_DEFS = [
  { id:"start",    cat:"event",   color:"#D552A3", label:"▶ When Start",      icon:"▶", youngerLabel:"Start", youngerIcons:"▶✨", hasInput:false },
  { id:"forever",  cat:"event",   color:"#D552A3", label:"🔁 Forever",        icon:"🔁", youngerLabel:"Loop", youngerIcons:"🔁♾️", hasInput:false },
  { id:"say",      cat:"looks",   color:"#462C7D", label:"💬 Say",            icon:"💬", youngerLabel:"Talk", youngerIcons:"💬🫧", hasInput:"text", placeholder:"Hello!" },
  { id:"think",    cat:"looks",   color:"#D552A3", label:"💭 Think",          icon:"💭", youngerLabel:"Think", youngerIcons:"💭🤔", hasInput:"text", placeholder:"Hmm..." },
  { id:"colour",   cat:"looks",   color:"#D552A3", label:"🎨 Change Colour",  icon:"🎨", youngerLabel:"Color", youngerIcons:"🎨🌈", hasInput:"colour" },
  { id:"rainbow",  cat:"looks",   color:"#D552A3", label:"🌈 Rainbow Mode",   icon:"🌈", youngerLabel:"Rainbow", youngerIcons:"🌈✨", hasInput:false },
  { id:"ghost",    cat:"looks",   color:"#831C91", label:"👻 Ghost",          icon:"👻", hasInput:false },
  { id:"shine",    cat:"looks",   color:"#FF70BF", label:"🌟 Shine",          icon:"🌟", hasInput:false },
  { id:"size",     cat:"looks",   color:"#462C7D", label:"📏 Set Size",       icon:"📏", youngerLabel:"Size", youngerIcons:"📏🐾", hasInput:"select", options:["tiny","normal","big","huge"] },
  { id:"pulse",    cat:"looks",   color:"#462C7D", label:"💥 Pulse",          icon:"💥", hasInput:false },
  { id:"walk",     cat:"motion",  color:"#462C7D", label:"🚶 Walk",           icon:"🚶", hasInput:false },
  { id:"dance",    cat:"motion",  color:"#462C7D", label:"💃 Dance",          icon:"💃", youngerLabel:"Dance", youngerIcons:"💃🎶", hasInput:false },
  { id:"spin",     cat:"motion",  color:"#462C7D", label:"🌀 Spin",           icon:"🌀", youngerLabel:"Spin", youngerIcons:"🌀⭐", hasInput:false },
  { id:"jump",     cat:"motion",  color:"#462C7D", label:"⬆ Jump",           icon:"⬆", youngerLabel:"Jump", youngerIcons:"⬆🐸", hasInput:false },
  { id:"moveleft", cat:"motion",  color:"#462C7D", label:"⬅ Move Left",      icon:"⬅", hasInput:false },
  { id:"moveright",cat:"motion",  color:"#462C7D", label:"➡ Move Right",     icon:"➡", hasInput:false },
  { id:"centre",   cat:"motion",  color:"#462C7D", label:"🎯 Go to Centre",   icon:"🎯", youngerLabel:"Center", youngerIcons:"🎯🏠", hasInput:false },
  { id:"dash",     cat:"motion",  color:"#462C7D", label:"⚡ Dash",            icon:"⚡", hasInput:false },
  { id:"hop",      cat:"motion",  color:"#462C7D", label:"🐇 Hop",             icon:"🐇", hasInput:false },
  { id:"moonwalk", cat:"motion",  color:"#462C7D", label:"🌙 Moonwalk",       icon:"🌙", hasInput:false },
  { id:"zigzag",   cat:"motion",  color:"#462C7D", label:"↔ Zigzag",          icon:"↔", hasInput:false },
  { id:"backflip", cat:"motion",  color:"#462C7D", label:"🤸 Backflip",        icon:"🤸", hasInput:false },
  { id:"slide",    cat:"motion",  color:"#462C7D", label:"🛼 Slide",           icon:"🛼", hasInput:false },
  { id:"float",    cat:"motion",  color:"#462C7D", label:"🎈 Float",           icon:"🎈", hasInput:false },
  { id:"celebrate",cat:"effects", color:"#D552A3", label:"🎉 Celebrate",      icon:"🎉", hasInput:false },
  { id:"sleep",    cat:"effects", color:"#831C91", label:"😴 Sleep",          icon:"😴", youngerLabel:"Sleep", youngerIcons:"😴💤", hasInput:false },
  { id:"sparkle",  cat:"effects", color:"#D552A3", label:"✨ Sparkle",        icon:"✨", youngerLabel:"Sparkle", youngerIcons:"✨🌟", hasInput:false },
  { id:"sound",    cat:"effects", color:"#831C91", label:"🎵 Play Sound",     icon:"🎵", youngerLabel:"Sound", youngerIcons:"🎵🔊", hasInput:"select", options:["pop","boing","cheer","woosh"] },
  { id:"wallpaint",cat:"home",    color:"#462C7D", label:"🖌 Paint Walls",    icon:"🖌", hasInput:"colour" },
  { id:"floorpaint",cat:"home",   color:"#462C7D", label:"🪵 Paint Floor",    icon:"🪵", hasInput:"colour" },
  { id:"wallpaper",cat:"home",    color:"#462C7D", label:"🧱 Wallpaper",      icon:"🧱", youngerLabel:"Wall", youngerIcons:"🧱⭐", hasInput:"select", options:["none","stars","hearts","dots"] },
  { id:"settoy",   cat:"home",    color:"#462C7D", label:"🧸 Place Toy",      icon:"🧸", youngerLabel:"Toy", youngerIcons:"🧸⚽", hasInput:"select", options:["none","ball","book","plant"] },
  { id:"speed",    cat:"control", color:"#D552A3", label:"⚡ Set Speed",      icon:"⚡", hasInput:"select", options:["slow","normal","fast"] },
  { id:"repeat",   cat:"control", color:"#D552A3", label:"🔄 Repeat",         icon:"🔄", hasInput:"number", placeholder:"3" },
  { id:"wait",     cat:"control", color:"#D552A3", label:"⏱ Wait",           icon:"⏱", hasInput:"number", placeholder:"1" },
];
export const YOUNGER_BLOCK_IDS = [
  "start",
  "say",
  "think",
  "dance",
  "jump",
  "spin",
  "celebrate",
  "sparkle",
  "sleep",
  "rainbow",
  "size",
  "sound",
  "colour",
  "wallpaper",
  "settoy",
  "centre",
];
export const CAT_LABELS = { event:"Events", looks:"Looks", motion:"Motion", effects:"Effects", home:"Home", control:"Control" };
export const CAT_COLORS = { event:"#D552A3", looks:"#D552A3", motion:"#462C7D", effects:"#D552A3", home:"#462C7D", control:"#D552A3" };
