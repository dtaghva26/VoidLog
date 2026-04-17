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
export const VIBE_COLORS = ["#f87171","#fb923c","#facc15","#4ade80","#a78bfa"];
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
  { id:"start",    cat:"event",   color:"#f59e0b", label:"▶ When Start",      icon:"▶",  hasInput:false },
  { id:"forever",  cat:"event",   color:"#d97706", label:"🔁 Forever",        icon:"🔁", hasInput:false },
  { id:"say",      cat:"looks",   color:"#3b82f6", label:"💬 Say",            icon:"💬", hasInput:"text", placeholder:"Hello!" },
  { id:"think",    cat:"looks",   color:"#60a5fa", label:"💭 Think",          icon:"💭", hasInput:"text", placeholder:"Hmm..." },
  { id:"colour",   cat:"looks",   color:"#8b5cf6", label:"🎨 Change Colour",  icon:"🎨", hasInput:"colour" },
  { id:"rainbow",  cat:"looks",   color:"#a855f7", label:"🌈 Rainbow Mode",   icon:"🌈", hasInput:false },
  { id:"ghost",    cat:"looks",   color:"#6366f1", label:"👻 Ghost",          icon:"👻", hasInput:false },
  { id:"shine",    cat:"looks",   color:"#f472b6", label:"🌟 Shine",          icon:"🌟", hasInput:false },
  { id:"size",     cat:"looks",   color:"#06b6d4", label:"📏 Set Size",       icon:"📏", hasInput:"select", options:["tiny","normal","big","huge"] },
  { id:"pulse",    cat:"looks",   color:"#0ea5e9", label:"💥 Pulse",          icon:"💥", hasInput:false },
  { id:"walk",     cat:"motion",  color:"#10b981", label:"🚶 Walk",           icon:"🚶", hasInput:false },
  { id:"dance",    cat:"motion",  color:"#22c55e", label:"💃 Dance",          icon:"💃", hasInput:false },
  { id:"spin",     cat:"motion",  color:"#16a34a", label:"🌀 Spin",           icon:"🌀", hasInput:false },
  { id:"jump",     cat:"motion",  color:"#84cc16", label:"⬆ Jump",           icon:"⬆", hasInput:false },
  { id:"moveleft", cat:"motion",  color:"#059669", label:"⬅ Move Left",      icon:"⬅", hasInput:false },
  { id:"moveright",cat:"motion",  color:"#047857", label:"➡ Move Right",     icon:"➡", hasInput:false },
  { id:"centre",   cat:"motion",  color:"#065f46", label:"🎯 Go to Centre",   icon:"🎯", hasInput:false },
  { id:"celebrate",cat:"effects", color:"#ec4899", label:"🎉 Celebrate",      icon:"🎉", hasInput:false },
  { id:"sleep",    cat:"effects", color:"#6366f1", label:"😴 Sleep",          icon:"😴", hasInput:false },
  { id:"sparkle",  cat:"effects", color:"#a855f7", label:"✨ Sparkle",        icon:"✨", hasInput:false },
  { id:"sound",    cat:"effects", color:"#be185d", label:"🎵 Play Sound",     icon:"🎵", hasInput:"select", options:["pop","boing","cheer","woosh"] },
  { id:"wallpaint",cat:"home",    color:"#0ea5e9", label:"🖌 Paint Walls",    icon:"🖌", hasInput:"colour" },
  { id:"floorpaint",cat:"home",   color:"#0284c7", label:"🪵 Paint Floor",    icon:"🪵", hasInput:"colour" },
  { id:"wallpaper",cat:"home",    color:"#0369a1", label:"🧱 Wallpaper",      icon:"🧱", hasInput:"select", options:["none","stars","hearts","dots"] },
  { id:"settoy",   cat:"home",    color:"#0891b2", label:"🧸 Place Toy",      icon:"🧸", hasInput:"select", options:["none","ball","book","plant"] },
  { id:"speed",    cat:"control", color:"#f97316", label:"⚡ Set Speed",      icon:"⚡", hasInput:"select", options:["slow","normal","fast"] },
  { id:"repeat",   cat:"control", color:"#ea580c", label:"🔄 Repeat",         icon:"🔄", hasInput:"number", placeholder:"3" },
  { id:"wait",     cat:"control", color:"#ef4444", label:"⏱ Wait",           icon:"⏱", hasInput:"number", placeholder:"1" },
];
export const CAT_LABELS = { event:"Events", looks:"Looks", motion:"Motion", effects:"Effects", home:"Home", control:"Control" };
export const CAT_COLORS = { event:"#f59e0b", looks:"#8b5cf6", motion:"#10b981", effects:"#ec4899", home:"#0284c7", control:"#f97316" };
