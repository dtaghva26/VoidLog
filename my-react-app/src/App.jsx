import { useState, useEffect, useRef } from "react";
import {
  PROMPTS,
  VIBES,
  VIBE_LABELS,
  VIBE_COLORS,
  SUGGESTED_TAGS,
  BADGES,
  XP_PER_ENTRY,
  calcXP,
  calcLevel,
  PET_TYPES,
  FOODS,
  STAGES,
  getStage,
  BLOCK_DEFS,
  YOUNGER_BLOCK_IDS,
  CAT_LABELS,
  CAT_COLORS,
} from "./constants.js";

// ── PET ART ────────────────────────────────────────────────────────
function getPetArt(type, stage) {
  const arts = {
    dragon: {
      Baby: (<g><rect x="16" y="24" width="18" height="16" fill="#86efac"/><rect x="14" y="28" width="4" height="8" fill="#86efac"/><rect x="34" y="28" width="4" height="8" fill="#86efac"/><rect x="18" y="20" width="14" height="8" fill="#86efac"/><rect x="20" y="16" width="4" height="6" fill="#4ade80"/><rect x="28" y="16" width="4" height="6" fill="#4ade80"/><rect x="22" y="22" width="4" height="4" fill="#bbf7d0"/><rect x="28" y="22" width="4" height="4" fill="#bbf7d0"/><rect x="24" y="28" width="2" height="2" fill="#f9a8d4"/><rect x="20" y="36" width="6" height="4" fill="#4ade80"/><rect x="26" y="36" width="6" height="4" fill="#4ade80"/></g>),
      Kid: (<g><rect x="10" y="20" width="30" height="22" fill="#86efac"/><rect x="6" y="26" width="6" height="10" fill="#86efac"/><rect x="38" y="26" width="6" height="10" fill="#86efac"/><rect x="14" y="14" width="22" height="10" fill="#86efac"/><rect x="16" y="10" width="5" height="8" fill="#4ade80"/><rect x="30" y="10" width="5" height="8" fill="#4ade80"/><rect x="18" y="18" width="5" height="5" fill="#1f2937"/><rect x="28" y="18" width="5" height="5" fill="#1f2937"/><rect x="19" y="19" width="2" height="2" fill="white"/><rect x="29" y="19" width="2" height="2" fill="white"/><rect x="22" y="27" width="7" height="3" fill="#f9a8d4"/><rect x="12" y="38" width="8" height="5" fill="#4ade80"/><rect x="30" y="38" width="8" height="5" fill="#4ade80"/></g>),
      Teen: (<g><rect x="8" y="16" width="34" height="28" fill="#4ade80"/><rect x="4" y="22" width="6" height="14" fill="#4ade80"/><rect x="42" y="22" width="6" height="14" fill="#4ade80"/><rect x="12" y="8" width="26" height="12" fill="#4ade80"/><rect x="14" y="4" width="6" height="10" fill="#16a34a"/><rect x="30" y="4" width="6" height="10" fill="#16a34a"/><rect x="16" y="14" width="6" height="6" fill="#1f2937"/><rect x="28" y="14" width="6" height="6" fill="#1f2937"/><rect x="17" y="15" width="3" height="3" fill="white"/><rect x="29" y="15" width="3" height="3" fill="white"/><rect x="20" y="26" width="10" height="4" fill="#f9a8d4"/><rect x="10" y="40" width="10" height="6" fill="#16a34a"/><rect x="30" y="40" width="10" height="6" fill="#16a34a"/></g>),
      Legend: (<g><rect x="6" y="12" width="40" height="34" fill="#22c55e"/><rect x="2" y="18" width="6" height="18" fill="#22c55e"/><rect x="48" y="18" width="6" height="18" fill="#22c55e"/><rect x="10" y="4" width="32" height="12" fill="#22c55e"/><rect x="12" y="0" width="7" height="12" fill="#15803d"/><rect x="33" y="0" width="7" height="12" fill="#15803d"/><rect x="14" y="10" width="7" height="7" fill="#1f2937"/><rect x="31" y="10" width="7" height="7" fill="#1f2937"/><rect x="15" y="11" width="3" height="3" fill="#fbbf24"/><rect x="32" y="11" width="3" height="3" fill="#fbbf24"/><rect x="19" y="24" width="14" height="5" fill="#f9a8d4"/><rect x="8" y="42" width="12" height="8" fill="#15803d"/><rect x="32" y="42" width="12" height="8" fill="#15803d"/><rect x="2" y="4" width="8" height="8" fill="#fbbf24"/><rect x="42" y="2" width="8" height="8" fill="#fbbf24"/></g>),
    },
    dog: {
      Baby: (<g><rect x="14" y="22" width="22" height="18" fill="#fde68a"/><rect x="10" y="18" width="8" height="10" fill="#fbbf24"/><rect x="32" y="18" width="8" height="10" fill="#fbbf24"/><rect x="16" y="16" width="18" height="10" fill="#fde68a"/><rect x="18" y="20" width="5" height="5" fill="#1f2937"/><rect x="27" y="20" width="5" height="5" fill="#1f2937"/><rect x="19" y="21" width="2" height="2" fill="white"/><rect x="28" y="21" width="2" height="2" fill="white"/><rect x="20" y="30" width="10" height="4" fill="#f87171"/><rect x="16" y="36" width="6" height="6" fill="#fbbf24"/><rect x="28" y="36" width="6" height="6" fill="#fbbf24"/></g>),
      Kid: (<g><rect x="10" y="20" width="30" height="22" fill="#fde68a"/><rect x="6" y="14" width="10" height="12" fill="#fbbf24"/><rect x="34" y="14" width="10" height="12" fill="#fbbf24"/><rect x="14" y="14" width="22" height="10" fill="#fde68a"/><rect x="16" y="18" width="6" height="6" fill="#1f2937"/><rect x="28" y="18" width="6" height="6" fill="#1f2937"/><rect x="17" y="19" width="3" height="3" fill="white"/><rect x="29" y="19" width="3" height="3" fill="white"/><rect x="19" y="28" width="12" height="5" fill="#f87171"/><rect x="12" y="38" width="8" height="6" fill="#fbbf24"/><rect x="30" y="38" width="8" height="6" fill="#fbbf24"/></g>),
      Teen: (<g><rect x="8" y="16" width="34" height="26" fill="#fcd34d"/><rect x="4" y="10" width="12" height="14" fill="#fbbf24"/><rect x="34" y="10" width="12" height="14" fill="#fbbf24"/><rect x="12" y="10" width="26" height="12" fill="#fcd34d"/><rect x="14" y="14" width="7" height="7" fill="#1f2937"/><rect x="29" y="14" width="7" height="7" fill="#1f2937"/><rect x="15" y="15" width="3" height="3" fill="white"/><rect x="30" y="15" width="3" height="3" fill="white"/><rect x="17" y="26" width="16" height="6" fill="#f87171"/><rect x="10" y="38" width="10" height="8" fill="#fbbf24"/><rect x="30" y="38" width="10" height="8" fill="#fbbf24"/></g>),
      Legend: (<g><rect x="6" y="12" width="40" height="32" fill="#fcd34d"/><rect x="2" y="6" width="14" height="16" fill="#fbbf24"/><rect x="36" y="6" width="14" height="16" fill="#fbbf24"/><rect x="10" y="6" width="32" height="14" fill="#fcd34d"/><rect x="12" y="10" width="8" height="8" fill="#1f2937"/><rect x="32" y="10" width="8" height="8" fill="#1f2937"/><rect x="13" y="11" width="4" height="4" fill="#fbbf24"/><rect x="33" y="11" width="4" height="4" fill="#fbbf24"/><rect x="16" y="24" width="20" height="7" fill="#f87171"/><rect x="8" y="40" width="12" height="10" fill="#fbbf24"/><rect x="32" y="40" width="12" height="10" fill="#fbbf24"/><rect x="2" y="2" width="10" height="6" fill="#a78bfa"/><rect x="40" y="2" width="10" height="6" fill="#a78bfa"/></g>),
    },
    cat: {
      Baby: (<g><rect x="14" y="22" width="22" height="18" fill="#e2e8f0"/><rect x="12" y="14" width="8" height="12" fill="#e2e8f0"/><rect x="30" y="14" width="8" height="12" fill="#e2e8f0"/><rect x="13" y="14" width="6" height="6" fill="#f9a8d4"/><rect x="31" y="14" width="6" height="6" fill="#f9a8d4"/><rect x="18" y="20" width="5" height="5" fill="#60a5fa"/><rect x="27" y="20" width="5" height="5" fill="#60a5fa"/><rect x="19" y="21" width="2" height="2" fill="white"/><rect x="28" y="21" width="2" height="2" fill="white"/><rect x="22" y="27" width="6" height="3" fill="#f9a8d4"/><rect x="16" y="36" width="6" height="6" fill="#e2e8f0"/><rect x="28" y="36" width="6" height="6" fill="#e2e8f0"/></g>),
      Kid: (<g><rect x="10" y="20" width="30" height="22" fill="#e2e8f0"/><rect x="8" y="12" width="10" height="14" fill="#e2e8f0"/><rect x="32" y="12" width="10" height="14" fill="#e2e8f0"/><rect x="9" y="12" width="8" height="8" fill="#f9a8d4"/><rect x="33" y="12" width="8" height="8" fill="#f9a8d4"/><rect x="16" y="18" width="6" height="6" fill="#60a5fa"/><rect x="28" y="18" width="6" height="6" fill="#60a5fa"/><rect x="17" y="19" width="3" height="3" fill="white"/><rect x="29" y="19" width="3" height="3" fill="white"/><rect x="19" y="28" width="12" height="4" fill="#f9a8d4"/><rect x="12" y="38" width="8" height="6" fill="#e2e8f0"/><rect x="30" y="38" width="8" height="6" fill="#e2e8f0"/></g>),
      Teen: (<g><rect x="8" y="16" width="34" height="26" fill="#cbd5e1"/><rect x="6" y="8" width="12" height="16" fill="#cbd5e1"/><rect x="32" y="8" width="12" height="16" fill="#cbd5e1"/><rect x="7" y="8" width="10" height="10" fill="#f9a8d4"/><rect x="33" y="8" width="10" height="10" fill="#f9a8d4"/><rect x="14" y="14" width="7" height="7" fill="#3b82f6"/><rect x="29" y="14" width="7" height="7" fill="#3b82f6"/><rect x="15" y="15" width="3" height="3" fill="white"/><rect x="30" y="15" width="3" height="3" fill="white"/><rect x="17" y="26" width="16" height="5" fill="#f9a8d4"/><rect x="10" y="38" width="10" height="8" fill="#cbd5e1"/><rect x="30" y="38" width="10" height="8" fill="#cbd5e1"/></g>),
      Legend: (<g><rect x="6" y="12" width="40" height="32" fill="#94a3b8"/><rect x="4" y="4" width="14" height="18" fill="#94a3b8"/><rect x="34" y="4" width="14" height="18" fill="#94a3b8"/><rect x="5" y="4" width="12" height="12" fill="#f9a8d4"/><rect x="35" y="4" width="12" height="12" fill="#f9a8d4"/><rect x="12" y="10" width="8" height="8" fill="#1d4ed8"/><rect x="32" y="10" width="8" height="8" fill="#1d4ed8"/><rect x="13" y="11" width="4" height="4" fill="white"/><rect x="33" y="11" width="4" height="4" fill="white"/><rect x="16" y="24" width="20" height="6" fill="#f9a8d4"/><rect x="8" y="40" width="12" height="10" fill="#64748b"/><rect x="32" y="40" width="12" height="10" fill="#64748b"/><rect x="20" y="2" width="12" height="6" fill="#fbbf24"/></g>),
    },
    frog: {
      Baby: (<g><rect x="14" y="26" width="22" height="14" fill="#4ade80"/><rect x="10" y="22" width="10" height="8" fill="#4ade80"/><rect x="30" y="22" width="10" height="8" fill="#4ade80"/><rect x="12" y="22" width="8" height="8" fill="#86efac"/><rect x="30" y="22" width="8" height="8" fill="#86efac"/><rect x="15" y="24" width="5" height="5" fill="#1f2937"/><rect x="30" y="24" width="5" height="5" fill="#1f2937"/><rect x="16" y="25" width="2" height="2" fill="white"/><rect x="31" y="25" width="2" height="2" fill="white"/><rect x="18" y="32" width="14" height="3" fill="#86efac"/><rect x="14" y="36" width="8" height="6" fill="#4ade80"/><rect x="28" y="36" width="8" height="6" fill="#4ade80"/></g>),
      Kid: (<g><rect x="10" y="22" width="30" height="18" fill="#4ade80"/><rect x="6" y="16" width="12" height="12" fill="#4ade80"/><rect x="32" y="16" width="12" height="12" fill="#4ade80"/><rect x="8" y="16" width="10" height="10" fill="#86efac"/><rect x="32" y="16" width="10" height="10" fill="#86efac"/><rect x="14" y="18" width="7" height="7" fill="#1f2937"/><rect x="29" y="18" width="7" height="7" fill="#1f2937"/><rect x="15" y="19" width="3" height="3" fill="white"/><rect x="30" y="19" width="3" height="3" fill="white"/><rect x="16" y="30" width="18" height="4" fill="#86efac"/><rect x="10" y="36" width="10" height="8" fill="#4ade80"/><rect x="30" y="36" width="10" height="8" fill="#4ade80"/></g>),
      Teen: (<g><rect x="8" y="18" width="34" height="24" fill="#22c55e"/><rect x="4" y="12" width="14" height="14" fill="#22c55e"/><rect x="32" y="12" width="14" height="14" fill="#22c55e"/><rect x="6" y="12" width="12" height="12" fill="#86efac"/><rect x="32" y="12" width="12" height="12" fill="#86efac"/><rect x="12" y="14" width="8" height="8" fill="#1f2937"/><rect x="30" y="14" width="8" height="8" fill="#1f2937"/><rect x="13" y="15" width="4" height="4" fill="white"/><rect x="31" y="15" width="4" height="4" fill="white"/><rect x="14" y="28" width="22" height="5" fill="#86efac"/><rect x="8" y="38" width="12" height="10" fill="#22c55e"/><rect x="30" y="38" width="12" height="10" fill="#22c55e"/></g>),
      Legend: (<g><rect x="6" y="14" width="40" height="28" fill="#16a34a"/><rect x="2" y="8" width="16" height="16" fill="#16a34a"/><rect x="34" y="8" width="16" height="16" fill="#16a34a"/><rect x="4" y="8" width="14" height="14" fill="#86efac"/><rect x="34" y="8" width="14" height="14" fill="#86efac"/><rect x="10" y="10" width="9" height="9" fill="#1f2937"/><rect x="33" y="10" width="9" height="9" fill="#1f2937"/><rect x="11" y="11" width="5" height="5" fill="#fbbf24"/><rect x="34" y="11" width="5" height="5" fill="#fbbf24"/><rect x="12" y="26" width="28" height="6" fill="#86efac"/><rect x="6" y="38" width="14" height="12" fill="#16a34a"/><rect x="32" y="38" width="14" height="12" fill="#16a34a"/><rect x="18" y="4" width="16" height="6" fill="#fbbf24"/><rect x="0" y="6" width="8" height="8" fill="#a78bfa"/><rect x="44" y="6" width="8" height="8" fill="#a78bfa"/></g>),
    }
  };
  return arts[type]?.[stage] || arts.dragon.Baby;
}

function PixelPet({ type, growth, size=80, tint, petSize="normal", opacity=1, outline=false }) {
  const stage = getStage(growth).name;
  const sz = { tiny:0.5, normal:1, big:1.4, huge:1.8 }[petSize] || 1;
  const filterStr = tint ? `hue-rotate(${tint}deg) saturate(1.8)` : undefined;
  const art = getPetArt(type, stage);
  return (
    <svg width={size*sz} height={size*sz} viewBox="0 0 52 52"
      style={{ imageRendering:"pixelated", display:"block", margin:"0 auto", filter:filterStr, opacity, transition:"all 0.2s" }}>
      {outline && <rect x="0" y="0" width="52" height="52" rx="4" fill="none" stroke="#fbbf24" strokeWidth="3"/>}
      {art}
    </svg>
  );
}

// ── SOUND ENGINE ───────────────────────────────────────────────────
function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    if (type === "pop") { osc.frequency.setValueAtTime(800,ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(200,ctx.currentTime+0.1); gain.gain.setValueAtTime(0.3,ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.15); osc.start(); osc.stop(ctx.currentTime+0.15); }
    else if (type === "boing") { osc.type="sine"; osc.frequency.setValueAtTime(300,ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(100,ctx.currentTime+0.4); gain.gain.setValueAtTime(0.4,ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.4); osc.start(); osc.stop(ctx.currentTime+0.4); }
    else if (type === "cheer") { [600,800,1000,1200].forEach((f,i)=>{ const o2=ctx.createOscillator(); const g2=ctx.createGain(); o2.connect(g2); g2.connect(ctx.destination); o2.frequency.value=f; g2.gain.setValueAtTime(0.2,ctx.currentTime+i*0.08); g2.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+i*0.08+0.1); o2.start(ctx.currentTime+i*0.08); o2.stop(ctx.currentTime+i*0.08+0.1); }); }
    else if (type === "woosh") { osc.type="sawtooth"; osc.frequency.setValueAtTime(200,ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(800,ctx.currentTime+0.2); gain.gain.setValueAtTime(0.2,ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.25); osc.start(); osc.stop(ctx.currentTime+0.25); }
  } catch(e) {}
}

// ── SCRATCH BLOCK ──────────────────────────────────────────────────
function ScratchBlock({ def, value, onChange, onRemove, index, active, isYoungerMode }) {
  const size = isYoungerMode
    ? { icon:22, label:15, input:14, inputWidth:98, numberWidth:58, pad:"12px 14px", remove:20 }
    : { icon:16, label:12, input:11, inputWidth:72, numberWidth:40, pad:"8px 12px", remove:15 };
  const iconText = isYoungerMode ? (def.youngerIcons || def.icon) : def.icon;
  const labelText = isYoungerMode ? (def.youngerLabel || def.label) : def.label;
  return (
    <div
      draggable
      onDragStart={e => e.dataTransfer.setData("seq-index", String(index))}
      style={{
        display:"flex", alignItems:"center", gap:8, background: active ? "#fff" : def.color,
        borderRadius:12, padding:size.pad, cursor:"grab", userSelect:"none",
        boxShadow: active ? `0 0 0 3px ${def.color}, 0 4px 12px rgba(0,0,0,0.3)` : "0 3px 0 rgba(0,0,0,0.2)",
        marginBottom:6, transition:"box-shadow 0.15s"
      }}
    >
      <span style={{ fontSize:size.icon, flexShrink:0 }}>{iconText}</span>
      <span style={{ color: active ? def.color : "white", fontWeight:700, fontSize:size.label, flex:1 }}>{labelText}</span>
      {def.hasInput === "colour" && (
        <input type="color" value={value||"#a78bfa"} onChange={e=>onChange(e.target.value)}
          style={{ width:isYoungerMode ? 30 : 24, height:isYoungerMode ? 30 : 24, border:"none", borderRadius:6, cursor:"pointer", padding:0 }}/>
      )}
      {def.hasInput === "text" && (
        <input value={value||""} onChange={e=>onChange(e.target.value)} placeholder={def.placeholder}
          style={{ width:size.inputWidth, fontSize:size.input, borderRadius:6, border:"none", padding:isYoungerMode ? "5px 8px" : "2px 6px", fontWeight:600 }}/>
      )}
      {def.hasInput === "number" && (
        <input type="number" value={value||2} min={1} max={20} onChange={e=>onChange(e.target.value)}
          style={{ width:size.numberWidth, fontSize:size.input, borderRadius:6, border:"none", padding:isYoungerMode ? "5px 8px" : "2px 6px", fontWeight:700, textAlign:"center" }}/>
      )}
      {def.hasInput === "select" && (
        <select value={value||def.options[0]} onChange={e=>onChange(e.target.value)}
          style={{ fontSize:size.input, borderRadius:6, border:"none", padding:isYoungerMode ? "5px 8px" : "2px 5px", fontWeight:600 }}>
          {def.options.map(o=><option key={o}>{o}</option>)}
        </select>
      )}
      <span onClick={onRemove} style={{ color:"rgba(255,255,255,0.8)", cursor:"pointer", fontSize:size.remove, fontWeight:700, marginLeft:2 }}>×</span>
    </div>
  );
}

function PaletteBlock({ def, onAdd, isYoungerMode }) {
  const iconText = isYoungerMode ? (def.youngerIcons || def.icon) : def.icon;
  const labelText = isYoungerMode ? (def.youngerLabel || def.label) : def.label;
  return (
    <div onClick={()=>onAdd(def)} draggable onDragStart={e=>e.dataTransfer.setData("palette-id",def.id)}
      style={{ display:"flex", alignItems:"center", gap:isYoungerMode ? 9 : 6, background:def.color, borderRadius:9, padding:isYoungerMode ? "10px 12px" : "6px 10px", cursor:"pointer", userSelect:"none", boxShadow:"0 2px 0 rgba(0,0,0,0.18)", marginBottom:4 }}>
      <span style={{ fontSize:isYoungerMode ? 20 : 14 }}>{iconText}</span>
      <span style={{ color:"white", fontWeight:700, fontSize:isYoungerMode ? 14 : 11 }}>{labelText}</span>
    </div>
  );
}

// ── LIVE PET STAGE ─────────────────────────────────────────────────
function LiveStage({ pet, anim, running }) {
  const rainbowColors = ["#f87171","#fb923c","#facc15","#4ade80","#60a5fa","#a78bfa","#f472b6"];
  const [rainbowIdx, setRainbowIdx] = useState(0);
  const rainbowRef = useRef(null);
  const wallpaper = anim.wallpaper || "none";
  const wallpaperEmoji = wallpaper === "stars" ? "⭐" : wallpaper === "hearts" ? "💖" : wallpaper === "dots" ? "⚪" : "";
  const toyEmoji = anim.toy === "ball" ? "⚽" : anim.toy === "book" ? "📘" : anim.toy === "plant" ? "🪴" : "";

  useEffect(() => {
    if (anim.rainbow) {
      rainbowRef.current = setInterval(() => setRainbowIdx(i => (i+1) % rainbowColors.length), 180);
    } else {
      clearInterval(rainbowRef.current);
      setRainbowIdx(0);
    }
    return () => clearInterval(rainbowRef.current);
  }, [anim.rainbow]);

  const tintVal = anim.rainbow
    ? parseInt(rainbowColors[rainbowIdx].replace("#",""), 16) % 360
    : anim.tint;

  const confettiPieces = ["🎊","🎉","⭐","🌟","✨","🎈"];

  return (
    <div style={{ background:anim.wallColor || "#0f172a", borderRadius:12, padding:12, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:260, position:"relative", overflow:"hidden", transition:"background 0.25s" }}>
      {/* Stars bg */}
      {["10%,15%","80%,10%","50%,5%","20%,70%","75%,60%","40%,80%","90%,40%"].map((pos,i) => (
        <div key={i} style={{ position:"absolute", left:pos.split(",")[0], top:pos.split(",")[1], width:2, height:2, background:"white", borderRadius:"50%", opacity:0.4 }}/>
      ))}
      {wallpaper !== "none" && (
        <div style={{ position:"absolute", inset:0, display:"grid", gridTemplateColumns:"repeat(5,1fr)", alignContent:"space-between", padding:"8px 12px 36px", opacity:0.28, pointerEvents:"none", color:"white", fontSize:14 }}>
          {Array.from({ length:20 }).map((_, i) => (
            <span key={i} style={{ textAlign:"center" }}>{wallpaperEmoji}</span>
          ))}
        </div>
      )}

      {/* Ground */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:32, background:anim.floorColor || "#1e293b", borderTop:"2px solid #334155", transition:"background 0.25s" }}/>
      {toyEmoji && <div style={{ position:"absolute", bottom:8, right:14, fontSize:18, zIndex:9 }}>{toyEmoji}</div>}

      {/* Confetti */}
      {anim.confetti && (
        <div style={{ position:"absolute", top:10, left:"50%", transform:"translateX(-50%)", display:"flex", gap:6, fontSize:20, pointerEvents:"none", zIndex:10 }}>
          {confettiPieces.map((c,i) => <span key={i} style={{ animation:"none" }}>{c}</span>)}
        </div>
      )}

      {/* Speech / Think bubble */}
      {(anim.bubble || anim.think) && (
        <div style={{ position:"absolute", top:8, left:"50%", transform:"translateX(-50%)", background:"white", border:"2px solid #e879f9", borderRadius: anim.think ? "50%" : 12, padding:"5px 14px", fontSize:12, fontWeight:700, color:"#86198f", whiteSpace:"nowrap", zIndex:10, maxWidth:150, textAlign:"center" }}>
          {anim.bubble || anim.think}
          <span style={{ position:"absolute", bottom:-10, left:"50%", transform:"translateX(-50%)", fontSize:10 }}>{anim.think ? "•••" : "▼"}</span>
        </div>
      )}

      {/* Zzz */}
      {anim.zzz && <div style={{ position:"absolute", top:20, right:"25%", fontSize:14, fontWeight:800, color:"#818cf8", zIndex:10 }}>Zzz…</div>}

      {/* Sparkle */}
      {anim.sparkle && (
        <div style={{ position:"absolute", top:16, right:"22%", fontSize:18, zIndex:10 }}>✨</div>
      )}

      {/* Shine outline ring */}
      {anim.shine && (
        <div style={{ position:"absolute", width:120, height:120, borderRadius:"50%", border:"3px solid #fbbf24", opacity:0.7, pointerEvents:"none" }}/>
      )}

      {/* Pet */}
      <div style={{
        transform:`translateX(${anim.x}px) translateY(${anim.y}px) rotate(${anim.spin}deg) scale(${anim.scale})`,
        transition:`transform ${anim.speedMs || 250}ms`,
        display:"inline-block", position:"relative", zIndex:5,
        opacity: anim.ghost ? 0.3 : 1,
        filter: anim.pulse ? "brightness(1.4)" : undefined
      }}>
        <PixelPet type={pet.type} growth={pet.growth} size={90} tint={tintVal} petSize={anim.petSize} outline={anim.shine} />
      </div>

      {/* Running indicator */}
      {running && (
        <div style={{ position:"absolute", bottom:6, right:8, fontSize:10, color:"#4ade80", fontWeight:700 }}>● running</div>
      )}

      <p style={{ position:"absolute", bottom:6, left:8, margin:0, fontSize:10, color:"#475569", fontWeight:600 }}>{pet.name} · {getStage(pet.growth).name}</p>
    </div>
  );
}

// ── PET STUDIO ─────────────────────────────────────────────────────
function PetStudio({ pet, setPet, spentXP, setSpentXP, totalXP }) {
  const [studioTab, setStudioTab] = useState("studio");
  const [kidMode, setKidMode] = useState("older");
  const [sequence, setSequence] = useState([]);
  const [values, setValues] = useState({});
  const [running, setRunning] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [anim, setAnim] = useState({ x:0, y:0, spin:0, scale:1, bubble:"", think:"", confetti:false, zzz:false, sparkle:false, shine:false, ghost:false, rainbow:false, pulse:false, tint:undefined, petSize:"normal", speedMs:250, wallColor:"#0f172a", floorColor:"#1e293b", wallpaper:"none", toy:"none" });
  const [feedMsg, setFeedMsg] = useState(null);
  const [selCat, setSelCat] = useState("event");
  const stopRef = useRef(false);
  const availXP = totalXP - spentXP;
  const stageObj = getStage(pet.growth);
  const nextStage = STAGES.find(s => s.minGrowth > pet.growth);
  const isYoungerMode = kidMode === "younger";
  const paletteDefs = isYoungerMode
    ? BLOCK_DEFS.filter(d => YOUNGER_BLOCK_IDS.includes(d.id))
    : BLOCK_DEFS;
  const availableCats = Object.entries(CAT_LABELS).filter(([k]) => paletteDefs.some(d => d.cat === k));

  useEffect(() => {
    if (!availableCats.some(([k]) => k === selCat)) {
      setSelCat(availableCats[0]?.[0] || "event");
    }
  }, [selCat, availableCats]);

  const addToSeq = def => setSequence(s => [...s, { id:def.id, uid:Date.now()+Math.random() }]);
  const removeFromSeq = uid => setSequence(s => s.filter(x => x.uid !== uid));
  const clearSeq = () => { setSequence([]); setValues({}); };
  const stopScript = () => { stopRef.current = true; setRunning(false); setActiveIdx(-1); };

  const sleepMs = ms => new Promise(r => setTimeout(r, ms));

  const runBlock = async (id, val, speedMs) => {
    const fast = speedMs <= 150;
    const slow = speedMs >= 450;
    const dur = speedMs || 250;

    if (id === "colour") {
      const hue = parseInt((val||"#a78bfa").replace("#",""),16) % 360;
      setAnim(s => ({ ...s, tint:hue, rainbow:false }));
    } else if (id === "rainbow") {
      setAnim(s => ({ ...s, rainbow:true })); await sleepMs(1200);
      setAnim(s => ({ ...s, rainbow:false }));
    } else if (id === "say") {
      setAnim(s => ({ ...s, bubble:val||"Hello!", think:"" })); await sleepMs(slow?2000:fast?600:1200);
      setAnim(s => ({ ...s, bubble:"" }));
    } else if (id === "think") {
      setAnim(s => ({ ...s, think:val||"Hmm...", bubble:"" })); await sleepMs(slow?2000:fast?600:1200);
      setAnim(s => ({ ...s, think:"" }));
    } else if (id === "size") {
      setAnim(s => ({ ...s, petSize:val||"normal" }));
    } else if (id === "pulse") {
      for (let j=0; j<3; j++) {
        setAnim(s => ({ ...s, scale:1.3, pulse:true })); await sleepMs(dur*0.8);
        setAnim(s => ({ ...s, scale:1, pulse:false })); await sleepMs(dur*0.8);
      }
    } else if (id === "ghost") {
      setAnim(s => ({ ...s, ghost:true })); await sleepMs(slow?1500:fast?400:900);
      setAnim(s => ({ ...s, ghost:false }));
    } else if (id === "shine") {
      setAnim(s => ({ ...s, shine:true })); await sleepMs(slow?1500:fast?400:900);
      setAnim(s => ({ ...s, shine:false }));
    } else if (id === "walk") {
      for (let j=0; j<3; j++) {
        setAnim(s => ({ ...s, x:36 })); await sleepMs(dur);
        setAnim(s => ({ ...s, x:-36 })); await sleepMs(dur);
      }
      setAnim(s => ({ ...s, x:0 }));
    } else if (id === "dance") {
      for (let j=0; j<4; j++) {
        setAnim(s => ({ ...s, y:-20, scale:1.1 })); await sleepMs(dur*0.8);
        setAnim(s => ({ ...s, y:0, scale:1 })); await sleepMs(dur*0.8);
      }
    } else if (id === "spin") {
      setAnim(s => ({ ...s, spin:720 })); await sleepMs(dur*3);
      setAnim(s => ({ ...s, spin:0 }));
    } else if (id === "jump") {
      setAnim(s => ({ ...s, y:-50, scale:1.2 })); await sleepMs(dur*1.2);
      setAnim(s => ({ ...s, y:0, scale:1 }));
    } else if (id === "moveleft") {
      setAnim(s => ({ ...s, x:s.x - 40 })); await sleepMs(dur);
    } else if (id === "moveright") {
      setAnim(s => ({ ...s, x:s.x + 40 })); await sleepMs(dur);
    } else if (id === "centre") {
      setAnim(s => ({ ...s, x:0, y:0 })); await sleepMs(dur);
    } else if (id === "dash") {
      setAnim(s => ({ ...s, x:s.x + 80 })); await sleepMs(dur*0.6);
      setAnim(s => ({ ...s, x:s.x - 80 })); await sleepMs(dur*0.6);
      setAnim(s => ({ ...s, x:0 }));
    } else if (id === "hop") {
      for (let j=0; j<3; j++) {
        setAnim(s => ({ ...s, y:-30 })); await sleepMs(dur*0.55);
        setAnim(s => ({ ...s, y:0 })); await sleepMs(dur*0.55);
      }
    } else if (id === "moonwalk") {
      for (let j=0; j<4; j++) {
        setAnim(s => ({ ...s, x:s.x - 22, spin:-6 })); await sleepMs(dur*0.6);
        setAnim(s => ({ ...s, x:s.x - 44, spin:6 })); await sleepMs(dur*0.6);
      }
      setAnim(s => ({ ...s, spin:0 }));
    } else if (id === "zigzag") {
      for (let j=0; j<5; j++) {
        setAnim(s => ({ ...s, x:s.x + 24, y:-12 })); await sleepMs(dur*0.5);
        setAnim(s => ({ ...s, x:s.x - 24, y:12 })); await sleepMs(dur*0.5);
      }
      setAnim(s => ({ ...s, y:0 }));
    } else if (id === "backflip") {
      setAnim(s => ({ ...s, y:-36, spin:-720, scale:1.1 })); await sleepMs(dur*2);
      setAnim(s => ({ ...s, y:0, spin:0, scale:1 }));
    } else if (id === "slide") {
      setAnim(s => ({ ...s, x:s.x + 60, y:8 })); await sleepMs(dur);
      setAnim(s => ({ ...s, y:0 })); await sleepMs(dur*0.5);
    } else if (id === "float") {
      for (let j=0; j<3; j++) {
        setAnim(s => ({ ...s, y:-34, scale:1.08 })); await sleepMs(dur);
        setAnim(s => ({ ...s, y:-10, scale:1.04 })); await sleepMs(dur);
      }
      setAnim(s => ({ ...s, y:0, scale:1 }));
    } else if (id === "celebrate") {
      setAnim(s => ({ ...s, confetti:true, scale:1.2 }));
      playSound("cheer"); await sleepMs(slow?1800:fast?600:1100);
      setAnim(s => ({ ...s, confetti:false, scale:1 }));
    } else if (id === "sleep") {
      setAnim(s => ({ ...s, zzz:true })); await sleepMs(slow?2000:fast?600:1200);
      setAnim(s => ({ ...s, zzz:false }));
    } else if (id === "sparkle") {
      setAnim(s => ({ ...s, sparkle:true })); await sleepMs(slow?1200:fast?300:700);
      setAnim(s => ({ ...s, sparkle:false }));
    } else if (id === "sound") {
      playSound(val || "pop");
      await sleepMs(300);
    } else if (id === "wallpaint") {
      setAnim(s => ({ ...s, wallColor:val || "#0f172a" }));
    } else if (id === "floorpaint") {
      setAnim(s => ({ ...s, floorColor:val || "#1e293b" }));
    } else if (id === "wallpaper") {
      setAnim(s => ({ ...s, wallpaper:val || "none" }));
    } else if (id === "settoy") {
      setAnim(s => ({ ...s, toy:val || "none" }));
    }
  };

  const runSequence = async () => {
    if (running || sequence.length === 0) return;
    stopRef.current = false;
    setRunning(true);

    let speedMs = 250;
    const hasForever = sequence.some(b => b.id === "forever");

    const execBlocks = async (blocks) => {
      for (let i = 0; i < blocks.length; i++) {
        if (stopRef.current) return;
        const block = blocks[i];
        const val = values[block.uid];
        if (block.id === "start" || block.id === "forever") continue;
        if (block.id === "speed") { speedMs = val==="slow"?450:val==="fast"?120:250; continue; }
        if (block.id === "wait") { await sleepMs((parseFloat(val)||1)*speedMs*2); continue; }
        if (block.id === "repeat") {
          const times = parseInt(val)||2;
          const sub = blocks.slice(i+1);
          for (let r=0; r<times; r++) {
            if (stopRef.current) return;
            for (const s of sub) {
              if (stopRef.current) return;
              setActiveIdx(sequence.findIndex(x => x.uid === s.uid));
              await runBlock(s.id, values[s.uid], speedMs);
              await sleepMs(80);
            }
          }
          return;
        }
        setActiveIdx(i);
        await runBlock(block.id, val, speedMs);
        await sleepMs(80);
      }
    };

    if (hasForever) {
      while (!stopRef.current) {
        await execBlocks(sequence);
        if (!hasForever) break;
      }
    } else {
      await execBlocks(sequence);
    }

    setRunning(false);
    setActiveIdx(-1);
  };

  const feed = food => {
    if (availXP < food.xpCost) { setFeedMsg("Not enough XP 😢"); setTimeout(()=>setFeedMsg(null),2000); return; }
    const newGrowth = pet.growth + food.growth;
    const newStage = getStage(newGrowth);
    setPet({ ...pet, growth:newGrowth });
    setSpentXP(spentXP + food.xpCost);
    setFeedMsg(newStage.name !== stageObj.name ? `🎉 Evolved to ${newStage.name}!` : `${pet.name} loved it! +${food.growth} growth`);
    setTimeout(()=>setFeedMsg(null), 2500);
  };

  const onDropSeq = e => {
    const pid = e.dataTransfer.getData("palette-id");
    if (pid) { const def = paletteDefs.find(d=>d.id===pid); if(def) addToSeq(def); }
  };

  return (
    <div style={{ background:"#fdf4ff", border:"2px solid #e879f9", borderRadius:18, marginBottom:16, overflow:"hidden" }}>
      <div style={{ display:"flex", borderBottom:"2px solid #f0abfc", overflowX:"auto" }}>
        {[["studio","🎨 Studio"],["shop","🛒 Shop"],["choose","✏️ Choose"]].map(([t,l]) => (
          <button key={t} onClick={()=>setStudioTab(t)} style={{ flex:1, padding:"10px 4px", border:"none", cursor:"pointer", fontWeight:700, fontSize:13, whiteSpace:"nowrap", minWidth:80, background:studioTab===t?"#fae8ff":"transparent", color:studioTab===t?"#86198f":"#c026d3", borderBottom:studioTab===t?"3px solid #c026d3":"none" }}>{l}</button>
        ))}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:isYoungerMode ? "10px 12px" : "8px 12px", borderBottom:"1px solid #f5d0fe", background:"#fdf4ff" }}>
        <p style={{ margin:0, color:"#a21caf", fontWeight:700, fontSize:isYoungerMode ? 14 : 12 }}>
          Pet Studio Mode:
        </p>
        <div style={{ display:"flex", gap:6, background:"#f3e8ff", borderRadius:999, padding:3 }}>
          {[["older","Older Kids"],["younger","Younger Kids (5-7)"]].map(([mode,label]) => (
            <button key={mode} onClick={() => setKidMode(mode)}
              style={{
                border:"none",
                cursor:"pointer",
                borderRadius:999,
                fontWeight:700,
                fontSize:isYoungerMode ? 13 : 11,
                padding:isYoungerMode ? "8px 12px" : "5px 10px",
                background:kidMode===mode ? "#c026d3" : "transparent",
                color:kidMode===mode ? "white" : "#86198f"
              }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* STUDIO — 3 column layout */}
      {studioTab === "studio" && (
        <div style={{ display:"flex", minHeight:420 }}>

          {/* Palette */}
          <div style={{ width:isYoungerMode ? 204 : 152, flexShrink:0, background:"#1e1b4b", padding:isYoungerMode ? 10 : 8, overflowY:"auto" }}>
            <div style={{ display:"flex", gap:3, flexWrap:"wrap", marginBottom:8 }}>
              {availableCats.map(([k,v]) => (
                <button key={k} onClick={()=>setSelCat(k)} style={{ fontSize:isYoungerMode ? 12 : 9, padding:isYoungerMode ? "5px 9px" : "3px 6px", borderRadius:999, border:"none", cursor:"pointer", fontWeight:700, background:selCat===k?CAT_COLORS[k]:"#312e81", color:"white" }}>{v}</button>
              ))}
            </div>
            {paletteDefs.filter(d=>d.cat===selCat).map(d => (
              <PaletteBlock key={d.id} def={d} onAdd={addToSeq} isYoungerMode={isYoungerMode}/>
            ))}
            <p style={{ fontSize:isYoungerMode ? 12 : 9, color:"#4338ca", marginTop:8, textAlign:"center" }}>
              {isYoungerMode ? "Tap a block to add it 👇" : "Tap or drag →"}
            </p>
          </div>

          {/* Script lane */}
          <div style={{ width:isYoungerMode ? 250 : 200, flexShrink:0, background:"#0f172a", padding:isYoungerMode ? 12 : 10, overflowY:"auto", borderLeft:"1px solid #1e293b", borderRight:"1px solid #1e293b" }}
            onDragOver={e=>e.preventDefault()} onDrop={onDropSeq}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
              <span style={{ fontSize:isYoungerMode ? 14 : 11, color:"#94a3b8", fontWeight:700 }}>Script</span>
              <div style={{ display:"flex", gap:4 }}>
                {!running ? (
                  <button onClick={runSequence} disabled={sequence.length===0} style={{ padding:isYoungerMode ? "7px 12px" : "4px 10px", borderRadius:7, border:"none", cursor:"pointer", fontWeight:800, fontSize:isYoungerMode ? 14 : 11, background:sequence.length===0?"#374151":"#22c55e", color:"white" }}>▶ Run</button>
                ) : (
                  <button onClick={stopScript} style={{ padding:isYoungerMode ? "7px 12px" : "4px 10px", borderRadius:7, border:"none", cursor:"pointer", fontWeight:800, fontSize:isYoungerMode ? 14 : 11, background:"#ef4444", color:"white" }}>■ Stop</button>
                )}
                <button onClick={clearSeq} style={{ padding:isYoungerMode ? "7px 11px" : "4px 8px", borderRadius:7, border:"none", cursor:"pointer", fontSize:isYoungerMode ? 14 : 11, background:"#374151", color:"#94a3b8" }}>🗑</button>
              </div>
            </div>
            {sequence.length === 0 ? (
              <div style={{ border:"2px dashed #334155", borderRadius:10, padding:"24px 10px", textAlign:"center" }}>
                <p style={{ color:"#475569", fontSize:isYoungerMode ? 15 : 11, margin:0, fontWeight:600 }}>Drop blocks here!</p>
                <p style={{ color:"#334155", fontSize:isYoungerMode ? 13 : 10, margin:"4px 0 0" }}>Start with ▶ When Start</p>
              </div>
            ) : sequence.map((block, idx) => {
              const def = BLOCK_DEFS.find(d=>d.id===block.id);
              if (!def) return null;
              return (
                <ScratchBlock key={block.uid} def={def} index={idx} active={activeIdx===idx}
                  value={values[block.uid]}
                  onChange={v=>setValues(prev=>({...prev,[block.uid]:v}))}
                  onRemove={()=>removeFromSeq(block.uid)}
                  isYoungerMode={isYoungerMode}/>
              );
            })}
          </div>

          {/* Live pet stage */}
          <div style={{ flex:1, background:"#0a0f1e", padding:10, display:"flex", flexDirection:"column", gap:8 }}>
            <p style={{ margin:0, fontSize:11, color:"#475569", fontWeight:700, textAlign:"center" }}>🎬 Live Stage</p>
            <LiveStage pet={pet} anim={anim} running={running}/>
            <div style={{ display:"flex", gap:6, justifyContent:"center", flexWrap:"wrap" }}>
              <button onClick={()=>setAnim(a=>({...a,tint:undefined,rainbow:false,ghost:false,shine:false,pulse:false,petSize:"normal",x:0,y:0,spin:0,scale:1,bubble:"",think:"",confetti:false,zzz:false,sparkle:false,wallColor:"#0f172a",floorColor:"#1e293b",wallpaper:"none",toy:"none"}))}
                style={{ fontSize:10, padding:"4px 10px", borderRadius:999, border:"1px solid #334155", background:"transparent", color:"#94a3b8", cursor:"pointer", fontWeight:600 }}>Reset</button>
            </div>
          </div>
        </div>
      )}

      {/* SHOP */}
      {studioTab === "shop" && (
        <div style={{ padding:14 }}>
          <p style={{ fontSize:13, color:"#a21caf", marginBottom:12, fontWeight:600 }}>Feed {pet.name} to help them grow! You have <strong>{availXP} XP</strong> 🌟</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {FOODS.map(f => (
              <button key={f.id} onClick={()=>feed(f)} disabled={availXP<f.xpCost} style={{ padding:"14px 10px", borderRadius:14, border:"2px solid", cursor:availXP>=f.xpCost?"pointer":"not-allowed", borderColor:availXP>=f.xpCost?"#d946ef":"#e5e7eb", background:availXP>=f.xpCost?"#fdf4ff":"#f9fafb", opacity:availXP>=f.xpCost?1:0.5, textAlign:"center" }}>
                <div style={{ fontSize:28, marginBottom:4 }}>{f.emoji}</div>
                <p style={{ margin:"0 0 2px", fontWeight:700, fontSize:13, color:"#86198f" }}>{f.name}</p>
                <p style={{ margin:0, fontSize:12, color:"#a21caf" }}>💜 {f.xpCost} XP</p>
                <p style={{ margin:0, fontSize:11, color:"#16a34a", fontWeight:600 }}>+{f.growth} growth</p>
              </button>
            ))}
          </div>
          {feedMsg && <p style={{ margin:"12px 0 0", fontWeight:700, fontSize:14, color:"#15803d", textAlign:"center" }}>{feedMsg}</p>}
        </div>
      )}

      {/* CHOOSE */}
      {studioTab === "choose" && (
        <div style={{ padding:14 }}>
          <p style={{ fontSize:13, color:"#a21caf", marginBottom:10, fontWeight:600 }}>Choose your pet and name them!</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
            {PET_TYPES.map(p => (
              <button key={p.id} onClick={()=>setPet({...pet,type:p.id})} style={{ padding:"12px 8px", borderRadius:14, border:"2px solid", cursor:"pointer", borderColor:pet.type===p.id?"#d946ef":"#e5e7eb", background:pet.type===p.id?"#fdf4ff":"white", textAlign:"center" }}>
                <PixelPet type={p.id} growth={0} size={52}/>
                <p style={{ margin:"6px 0 0", fontWeight:700, fontSize:13, color:pet.type===p.id?"#86198f":"#374151" }}>{p.name}</p>
              </button>
            ))}
          </div>
          <input value={pet.name} onChange={e=>setPet({...pet,name:e.target.value})} placeholder="Name your pet!" maxLength={16}
            style={{ width:"100%", boxSizing:"border-box", fontSize:14, borderRadius:10, border:"2px solid #e879f9", padding:"8px 12px", fontWeight:600, color:"#86198f" }}/>
        </div>
      )}
    </div>
  );
}

// ── SHARED COMPONENTS ──────────────────────────────────────────────
function TagBadge({ tag, onRemove }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, background:"#ede9fe", color:"#7c3aed", borderRadius:999, padding:"3px 12px", fontSize:12, fontWeight:500 }}>
      {tag}{onRemove && <span onClick={onRemove} style={{ cursor:"pointer", marginLeft:2, fontWeight:700 }}>×</span>}
    </span>
  );
}

function XPBar({ entries }) {
  const xp=calcXP(entries), level=calcLevel(xp), lxp=(level-1)*200, nxp=level*200;
  const pct=Math.min(100,Math.round(((xp-lxp)/(nxp-lxp))*100));
  return (
    <div style={{ background:"#f5f3ff", borderRadius:14, padding:"12px 16px", marginBottom:12, border:"2px solid #ddd6fe" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
        <span style={{ fontWeight:800, fontSize:14, color:"#6d28d9" }}>⚔️ Level {level}</span>
        <span style={{ fontSize:12, color:"#7c3aed", fontWeight:600 }}>{xp} XP</span>
      </div>
      <div style={{ background:"#ddd6fe", borderRadius:999, height:12, overflow:"hidden" }}>
        <div style={{ background:"linear-gradient(90deg,#8b5cf6,#a78bfa)", height:"100%", width:`${pct}%`, borderRadius:999, transition:"width 0.5s" }}/>
      </div>
      <p style={{ fontSize:10, color:"#7c3aed", margin:"4px 0 0", textAlign:"right" }}>{nxp-xp} XP to Level {level+1}</p>
    </div>
  );
}

function AiPanel({ entry, onClose }) {
  const [result,setResult]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState(null);
  useEffect(()=>{
    (async()=>{
      try {
        const s=entry.reflections.filter(Boolean).map((r,i)=>`Q:${PROMPTS[entry.type][i]}\nA:${r}`).join("\n");
        const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,messages:[{role:"user",content:`You are an encouraging coach for a 9-13 year old who just logged a ${entry.type} session. Give: 1) A fun compliment 2) One simple tip 3) A short hype message. Short, fun, emoji-filled.\n\nSession:"${entry.title}"\nVibe:${VIBE_LABELS[entry.mood]}\n${s}`}]})});
        const data=await res.json();
        setResult(data.content?.filter(b=>b.type==="text").map(b=>b.text).join("\n")||"No response.");
      } catch { setError("Couldn't connect. Try again!"); }
      finally { setLoading(false); }
    })();
  },[]);
  return (
    <div style={{ background:"#f0fdf4", border:"2px solid #86efac", borderRadius:14, padding:14, marginTop:10 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
        <span style={{ fontWeight:700, fontSize:14, color:"#15803d" }}>🤖 Coach Says...</span>
        <span onClick={onClose} style={{ cursor:"pointer", color:"#6b7280", fontSize:18 }}>×</span>
      </div>
      {loading && <p style={{ color:"#16a34a", fontSize:13, margin:0 }}>Thinking... 🤔</p>}
      {error && <p style={{ color:"#dc2626", fontSize:13, margin:0 }}>{error}</p>}
      {result && <p style={{ fontSize:13, lineHeight:1.8, color:"#166534", margin:0, whiteSpace:"pre-wrap" }}>{result}</p>}
    </div>
  );
}

function WeeklyReflection({ entries, onClose }) {
  const [result,setResult]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState(null);
  useEffect(()=>{
    (async()=>{
      try {
        const wa=Date.now()-7*24*60*60*1000;
        const rc=entries.filter(e=>new Date(e.date).getTime()>wa);
        if(!rc.length){setError("No sessions this week yet! 📝");setLoading(false);return;}
        const s=rc.map(e=>`[${e.type.toUpperCase()}]"${e.title}"—vibe:${VIBE_LABELS[e.mood]}\n${e.reflections.filter(Boolean).join("|")}`).join("\n\n");
        const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:500,messages:[{role:"user",content:`Fun coach for a 9-13 year old. Review their week: 1)Fun highlight 2)Getting better at 3)Challenge for next week 4)Hype message! Short, fun, emoji.\n\n${s}`}]})});
        const data=await res.json();
        setResult(data.content?.filter(b=>b.type==="text").map(b=>b.text).join("\n")||"No response.");
      } catch { setError("Couldn't connect. Try again!"); }
      finally { setLoading(false); }
    })();
  },[]);
  return (
    <div style={{ background:"#fdf4ff", border:"2px solid #e879f9", borderRadius:16, marginBottom:16, overflow:"hidden" }}>
      <div style={{ background:"#fae8ff", padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"2px solid #f0abfc" }}>
        <div>
          <p style={{ margin:0, fontWeight:700, fontSize:15, color:"#86198f" }}>✨ Weekly Report</p>
          <p style={{ margin:0, fontSize:12, color:"#a21caf" }}>Your coach reviews your week!</p>
        </div>
        <span onClick={onClose} style={{ cursor:"pointer", color:"#a21caf", fontSize:20 }}>×</span>
      </div>
      <div style={{ padding:16, fontSize:13, lineHeight:1.8, color:"#701a75" }}>
        {loading && <p style={{ margin:0 }}>Reading your adventure log... 📖✨</p>}
        {error && <p style={{ margin:0, color:"#9ca3af" }}>{error}</p>}
        {result && <p style={{ margin:0, whiteSpace:"pre-wrap" }}>{result}</p>}
      </div>
    </div>
  );
}

function EntryForm({ initial, onSave, onCancel }) {
  const [type,setType]=useState(initial?.type||"coding");
  const [mood,setMood]=useState(initial?.mood??2);
  const [title,setTitle]=useState(initial?.title||"");
  const [reflections,setReflections]=useState(initial?.reflections?.length?[...initial.reflections,...Array(5).fill("")].slice(0,5):["","","","",""]);
  const [tags,setTags]=useState(initial?.tags||[]);
  const [tagInput,setTagInput]=useState("");
  const [showCoach,setShowCoach]=useState(false);
  const [saved,setSaved]=useState(false);
  const updateR=(i,v)=>{const r=[...reflections];r[i]=v;setReflections(r);};
  const addTag=t=>{const tag=t.startsWith("#")?t:"#"+t;if(tag.length>1&&!tags.includes(tag))setTags([...tags,tag]);setTagInput("");};
  const save=()=>{
    if(!title.trim())return;
    setSaved(true);
    setTimeout(()=>onSave({...(initial||{}),id:initial?.id||Date.now(),type,mood,title,reflections:reflections.filter(Boolean),tags,date:initial?.date||new Date().toISOString()}),800);
  };
  return (
    <div>
      <div style={{ display:"flex", gap:10, marginBottom:20 }}>
        {["coding","gaming"].map(t=>(
          <button key={t} onClick={()=>setType(t)} style={{ flex:1, padding:"12px 0", borderRadius:14, fontSize:14, cursor:"pointer", fontWeight:700, border:"2px solid", borderColor:type===t?"#8b5cf6":"#e5e7eb", background:type===t?"#ede9fe":"white", color:type===t?"#6d28d9":"#6b7280" }}>
            {t==="coding"?"💻 Coding Quest":"🎮 Gaming Quest"}
          </button>
        ))}
      </div>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Name your quest!"
        style={{ width:"100%", marginBottom:16, boxSizing:"border-box", fontSize:14, borderRadius:12, border:"2px solid #e5e7eb", padding:"10px 14px" }}/>
      <div style={{ marginBottom:20 }}>
        <p style={{ fontSize:13, fontWeight:700, color:"#6d28d9", marginBottom:10 }}>Vibe Check ✌️</p>
        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
          {VIBES.map((v,i)=>(
            <button key={i} onClick={()=>setMood(i)} style={{ fontSize:26, background:"none", border:"2px solid", cursor:"pointer", borderRadius:12, padding:"6px 10px", borderColor:mood===i?VIBE_COLORS[i]:"#e5e7eb", backgroundColor:mood===i?VIBE_COLORS[i]+"22":"transparent", transform:mood===i?"scale(1.2)":"scale(1)", transition:"all 0.15s" }}>{v}</button>
          ))}
          <span style={{ fontSize:13, fontWeight:700, color:VIBE_COLORS[mood] }}>{VIBE_LABELS[mood]}</span>
        </div>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={{ fontSize:13, fontWeight:700, color:"#6d28d9", marginBottom:10 }}>Quest Log 📜</p>
        {PROMPTS[type].map((p,i)=>(
          <div key={i} style={{ marginBottom:12 }}>
            <label style={{ fontSize:13, color:"#374151", display:"block", marginBottom:4, fontWeight:500 }}>{p}</label>
            <textarea value={reflections[i]} onChange={e=>updateR(i,e.target.value)} rows={2}
              style={{ width:"100%", boxSizing:"border-box", resize:"vertical", fontSize:13, borderRadius:10, border:"2px solid #e5e7eb", padding:"8px 12px" }} placeholder="Write here..."/>
          </div>
        ))}
      </div>
      <div style={{ marginBottom:24 }}>
        <p style={{ fontSize:13, fontWeight:700, color:"#6d28d9", marginBottom:8 }}>Tags 🏷️</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:8 }}>
          {SUGGESTED_TAGS[type].map(t=>(
            <span key={t} onClick={()=>addTag(t)} style={{ cursor:"pointer", fontSize:12, padding:"4px 12px", borderRadius:999, border:"2px solid", fontWeight:500, borderColor:tags.includes(t)?"#8b5cf6":"#e5e7eb", background:tags.includes(t)?"#ede9fe":"white", color:tags.includes(t)?"#6d28d9":"#6b7280" }}>{t}</span>
          ))}
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <input value={tagInput} onChange={e=>setTagInput(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();addTag(tagInput.trim());}}}
            placeholder="Add your own tag..." style={{ flex:1, fontSize:13, borderRadius:10, border:"2px solid #e5e7eb", padding:"8px 12px" }}/>
          <button onClick={()=>addTag(tagInput.trim())} style={{ padding:"0 16px", cursor:"pointer", border:"2px solid #8b5cf6", background:"#ede9fe", borderRadius:10, color:"#6d28d9", fontWeight:700 }}>+</button>
        </div>
        {tags.length>0 && (
          <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:8 }}>
            {tags.map(t=><TagBadge key={t} tag={t} onRemove={()=>setTags(tags.filter(x=>x!==t))}/>)}
          </div>
        )}
      </div>
      {showCoach && title && <AiPanel entry={{type,mood,title,reflections}} onClose={()=>setShowCoach(false)}/>}
      {saved ? (
        <div style={{ textAlign:"center", padding:16, borderRadius:14, background:"#f0fdf4", border:"2px solid #86efac" }}>
          <p style={{ margin:0, fontSize:16, fontWeight:700, color:"#15803d" }}>🎉 Quest logged! +{50+reflections.filter(Boolean).length*5} XP</p>
        </div>
      ) : (
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          <button onClick={save} style={{ padding:"10px 24px", borderRadius:12, cursor:"pointer", fontWeight:700, fontSize:14, border:"2px solid #8b5cf6", background:"#8b5cf6", color:"white" }}>
            {initial?"Save Changes ✅":"Log Quest! ⚔️"}
          </button>
          {!initial && title && reflections.some(Boolean) && (
            <button onClick={()=>setShowCoach(true)} style={{ padding:"10px 18px", borderRadius:12, cursor:"pointer", fontWeight:700, fontSize:14, border:"2px solid #86efac", background:"#f0fdf4", color:"#15803d" }}>Ask Coach 🤖</button>
          )}
          <button onClick={onCancel} style={{ padding:"10px 16px", borderRadius:12, cursor:"pointer", border:"2px solid #e5e7eb", background:"white", color:"#6b7280", fontWeight:500 }}>Cancel</button>
        </div>
      )}
    </div>
  );
}

function EntryCard({ entry, onDelete, onEdit }) {
  const [expanded,setExpanded]=useState(false);
  const [showCoach,setShowCoach]=useState(false);
  const d=new Date(entry.date);
  const dateStr=d.toLocaleDateString("en-GB",{day:"numeric",month:"short"});
  return (
    <div style={{ border:"2px solid #e5e7eb", borderRadius:14, padding:"14px 16px", background:"white", marginBottom:10 }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8 }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4, flexWrap:"wrap" }}>
            <span style={{ fontSize:18 }}>{entry.type==="coding"?"💻":"🎮"}</span>
            <span style={{ fontSize:12, color:"#9ca3af", fontWeight:500 }}>{dateStr}</span>
            <span style={{ fontSize:18, background:VIBE_COLORS[entry.mood]+"22", borderRadius:8, padding:"1px 6px" }}>{VIBES[entry.mood]}</span>
          </div>
          <p style={{ margin:0, fontWeight:700, fontSize:15, color:"#1f2937" }}>{entry.title}</p>
        </div>
        <button onClick={()=>setExpanded(!expanded)} style={{ fontSize:12, padding:"4px 12px", borderRadius:999, cursor:"pointer", border:"2px solid #e5e7eb", background:expanded?"#f3f4f6":"white", color:"#6b7280", fontWeight:600, flexShrink:0 }}>
          {expanded?"▲":"▼"}
        </button>
      </div>
      {entry.tags.length>0 && (
        <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:8 }}>
          {entry.tags.map(t=><TagBadge key={t} tag={t}/>)}
        </div>
      )}
      {expanded && (
        <div style={{ marginTop:12, borderTop:"2px solid #f3f4f6", paddingTop:12 }}>
          {entry.reflections.map((r,i)=>r&&(
            <div key={i} style={{ marginBottom:10 }}>
              <p style={{ fontSize:12, color:"#9ca3af", marginBottom:2, fontWeight:600 }}>{PROMPTS[entry.type][i]}</p>
              <p style={{ margin:0, fontSize:13, lineHeight:1.6, color:"#374151" }}>{r}</p>
            </div>
          ))}
          {showCoach && <AiPanel entry={entry} onClose={()=>setShowCoach(false)}/>}
          <div style={{ display:"flex", gap:8, marginTop:12, flexWrap:"wrap" }}>
            <button onClick={()=>setShowCoach(true)} style={{ fontSize:12, padding:"5px 14px", borderRadius:999, cursor:"pointer", border:"2px solid #86efac", background:"#f0fdf4", color:"#15803d", fontWeight:600 }}>🤖 Ask Coach</button>
            <button onClick={()=>onEdit(entry)} style={{ fontSize:12, padding:"5px 14px", borderRadius:999, cursor:"pointer", border:"2px solid #ddd6fe", background:"#f5f3ff", color:"#6d28d9", fontWeight:600 }}>✏️ Edit</button>
            <button onClick={()=>onDelete(entry.id)} style={{ fontSize:12, padding:"5px 14px", borderRadius:999, cursor:"pointer", border:"2px solid #fee2e2", background:"#fef2f2", color:"#dc2626", fontWeight:600 }}>🗑️ Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── MAIN APP ───────────────────────────────────────────────────────
export default function App() {
  const [view,setView]=useState("log");
  const [entries,setEntries]=useState([]);
  const [filter,setFilter]=useState("all");
  const [search,setSearch]=useState("");
  const [loaded,setLoaded]=useState(false);
  const [editingEntry,setEditingEntry]=useState(null);
  const [showWeekly,setShowWeekly]=useState(false);
  const [showBadges,setShowBadges]=useState(false);
  const [showPet,setShowPet]=useState(true);
  const [pet,setPet]=useState({type:"dragon",name:"Sparky",growth:0});
  const [spentXP,setSpentXP]=useState(0);

  useEffect(()=>{
    (async()=>{
      try {
        const r=await window.storage.get("devgamelog_entries"); if(r?.value)setEntries(JSON.parse(r.value));
        const p=await window.storage.get("devgamelog_pet"); if(p?.value)setPet(JSON.parse(p.value));
        const x=await window.storage.get("devgamelog_spentxp"); if(x?.value)setSpentXP(JSON.parse(x.value));
      } catch {}
      setLoaded(true);
    })();
  },[]);

  const saveEntries=async n=>{setEntries(n);try{await window.storage.set("devgamelog_entries",JSON.stringify(n));}catch{}};
  const savePet=async p=>{setPet(p);try{await window.storage.set("devgamelog_pet",JSON.stringify(p));}catch{}};
  const saveSpentXP=async x=>{setSpentXP(x);try{await window.storage.set("devgamelog_spentxp",JSON.stringify(x));}catch{}};
  const addEntry=e=>{saveEntries([e,...entries]);setView("log");};
  const updateEntry=u=>{saveEntries(entries.map(e=>e.id===u.id?u:e));setEditingEntry(null);setView("log");};
  const deleteEntry=id=>saveEntries(entries.filter(e=>e.id!==id));

  const exportMarkdown=()=>{
    if(!entries.length)return;
    const lines=["# My Quest Log 📖\n",`Exported ${new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}\n`,"---\n"];
    [...entries].sort((a,b)=>new Date(a.date)-new Date(b.date)).forEach(e=>{
      const d=new Date(e.date);
      lines.push(`## ${e.title}`);
      lines.push(`**Date:** ${d.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})} | **Type:** ${e.type==="coding"?"💻":"🎮"} | **Vibe:** ${VIBES[e.mood]} ${VIBE_LABELS[e.mood]}`);
      if(e.tags.length)lines.push(`**Tags:** ${e.tags.join(" ")}`);
      if(e.reflections.length){lines.push("\n### Quest Log\n");e.reflections.forEach((r,i)=>r&&lines.push(`**${PROMPTS[e.type][i]}**\n${r}\n`));}
      lines.push("\n---\n");
    });
    const blob=new Blob([lines.join("\n")],{type:"text/markdown"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");a.href=url;a.download="my-quest-log.md";a.click();URL.revokeObjectURL(url);
  };

  const totalXP=calcXP(entries);
  const filtered=entries.filter(e=>{
    if(filter!=="all"&&e.type!==filter)return false;
    if(!search.trim())return true;
    const q=search.toLowerCase();
    return e.title.toLowerCase().includes(q)||e.reflections.some(r=>r.toLowerCase().includes(q))||e.tags.some(t=>t.toLowerCase().includes(q));
  });

  if(!loaded) {
    return <div style={{ padding:24, color:"#9ca3af", fontSize:14 }}>Loading your quest log... ⚔️</div>;
  }

  if(view==="new"||view==="edit") {
    return (
      <div style={{ maxWidth:640, margin:"0 auto", padding:"20px 16px" }}>
        <p style={{ fontSize:13, color:"#8b5cf6", marginBottom:16, cursor:"pointer", fontWeight:600 }} onClick={()=>{setEditingEntry(null);setView("log");}}>← Back to Quest Log</p>
        <h2 style={{ margin:"0 0 20px", fontSize:20, fontWeight:800, color:"#6d28d9" }}>{view==="edit"?"Edit Quest ✏️":"New Quest ⚔️"}</h2>
        <EntryForm initial={editingEntry} onSave={view==="edit"?updateEntry:addEntry} onCancel={()=>{setEditingEntry(null);setView("log");}}/>
      </div>
    );
  }

  return (
    <div style={{ maxWidth:660, margin:"0 auto", padding:"20px 16px" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14, flexWrap:"wrap", gap:8 }}>
        <div>
          <h1 style={{ margin:0, fontSize:22, fontWeight:800, color:"#6d28d9" }}>⚔️ Quest Log</h1>
          <p style={{ margin:"2px 0 0", fontSize:13, color:"#9ca3af" }}>your coding & gaming diary</p>
        </div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          <button onClick={()=>setShowPet(!showPet)} style={{ padding:"7px 12px", borderRadius:10, cursor:"pointer", fontSize:13, border:"2px solid #f0abfc", background:showPet?"#fdf4ff":"white", color:"#86198f", fontWeight:700 }}>🐾 Pet</button>
          <button onClick={()=>setShowBadges(!showBadges)} style={{ padding:"7px 12px", borderRadius:10, cursor:"pointer", fontSize:13, border:"2px solid #fde047", background:"#fefce8", color:"#854d0e", fontWeight:700 }}>🏅</button>
          <button onClick={()=>setShowWeekly(!showWeekly)} style={{ padding:"7px 12px", borderRadius:10, cursor:"pointer", fontSize:13, border:"2px solid #f0abfc", background:"#fdf4ff", color:"#86198f", fontWeight:700 }}>✨</button>
          <button onClick={exportMarkdown} style={{ padding:"7px 12px", borderRadius:10, cursor:"pointer", fontSize:13, border:"2px solid #ddd6fe", background:"#f5f3ff", color:"#6d28d9", fontWeight:700 }}>⬇</button>
          <button onClick={()=>setView("new")} style={{ padding:"7px 16px", borderRadius:10, cursor:"pointer", fontWeight:800, fontSize:14, border:"2px solid #8b5cf6", background:"#8b5cf6", color:"white" }}>+ Quest</button>
        </div>
      </div>

      {entries.length>0 && <XPBar entries={entries}/>}
      {showPet && <PetStudio pet={pet} setPet={savePet} spentXP={spentXP} setSpentXP={saveSpentXP} totalXP={totalXP}/>}

      {showBadges && (
        <div style={{ marginBottom:16 }}>
          <p style={{ fontSize:13, fontWeight:700, color:"#6d28d9", marginBottom:10 }}>🏅 Badges</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {BADGES.map(b=>{
              const earned=b.check(entries);
              return (
                <div key={b.id} style={{ background:earned?"#fef9c3":"#f3f4f6", border:`2px solid ${earned?"#fde047":"#e5e7eb"}`, borderRadius:12, padding:"6px 14px", fontSize:13, fontWeight:600, color:earned?"#854d0e":"#9ca3af", opacity:earned?1:0.6 }}>
                  {earned?b.icon:"🔒"} {b.label}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showWeekly && <WeeklyReflection entries={entries} onClose={()=>setShowWeekly(false)}/>}

      <div style={{ marginBottom:12 }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search your quests..."
          style={{ width:"100%", boxSizing:"border-box", fontSize:13, borderRadius:12, border:"2px solid #e5e7eb", padding:"10px 14px" }}/>
      </div>
      <div style={{ display:"flex", gap:6, marginBottom:16, flexWrap:"wrap" }}>
        {["all","coding","gaming"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{ fontSize:13, padding:"6px 16px", borderRadius:999, cursor:"pointer", fontWeight:600, border:"2px solid", borderColor:filter===f?"#8b5cf6":"#e5e7eb", background:filter===f?"#ede9fe":"white", color:filter===f?"#6d28d9":"#6b7280" }}>
            {f==="all"?"⚔️ All":f==="coding"?"💻 Coding":"🎮 Gaming"}
          </button>
        ))}
        {search && <span style={{ fontSize:12, color:"#9ca3af", alignSelf:"center", marginLeft:4 }}>{filtered.length} found</span>}
      </div>

      {filtered.length===0 ? (
        <div style={{ textAlign:"center", padding:"48px 16px", border:"2px dashed #e5e7eb", borderRadius:16 }}>
          <p style={{ fontSize:28, margin:"0 0 8px" }}>🗺️</p>
          <p style={{ fontSize:14, color:"#9ca3af", margin:0, fontWeight:600 }}>{entries.length===0?"No quests yet — start your adventure!":"No quests match your search!"}</p>
        </div>
      ) : filtered.map(e=>(
        <EntryCard key={e.id} entry={e} onDelete={deleteEntry} onEdit={entry=>{setEditingEntry(entry);setView("edit");}}/>
      ))}
    </div>
  );
}
