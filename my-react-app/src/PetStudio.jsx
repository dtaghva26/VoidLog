import { useEffect, useRef, useState } from "react";
import {
  getStage,
  STAGES,
  PET_TYPES,
  FOODS,
  BLOCK_DEFS,
  YOUNGER_BLOCK_IDS,
  CAT_LABELS,
  CAT_COLORS,
} from "./constants.js";
import { color1, color2, color3, WEBSITE_COLORS } from "./colors.js";
import PetStudioActionButton from "./components/features/PetStudioActionButton.jsx";

const STUDIO_COLORS = {
  panel: WEBSITE_COLORS.surface,
  panelBorder: WEBSITE_COLORS.border,
  text: WEBSITE_COLORS.primaryText,
  textMuted: WEBSITE_COLORS.mutedText,
  textOnDark: WEBSITE_COLORS.onAccent,
  darkSurface: color1,
  accent: color2,
  accentSoft: WEBSITE_COLORS.accentSoft,
  glow: color3,
};

function getPetArt(type, stage, isYoungerMode = false) {
  const stageSpecs = {
    Baby: { headY: 21, headW: 24, headH: 20, bodyW: 20, bodyH: 16, eyeY: 24, eyeGap: 8, eyeR: 2.2, mouthY: 30, pawY: 36, earScale: 0.86 },
    Kid: { headY: 18, headW: 28, headH: 22, bodyW: 24, bodyH: 18, eyeY: 22, eyeGap: 9, eyeR: 2.4, mouthY: 29, pawY: 37, earScale: 0.95 },
    Teen: { headY: 15, headW: 32, headH: 24, bodyW: 28, bodyH: 20, eyeY: 20, eyeGap: 10, eyeR: 2.7, mouthY: 28, pawY: 38, earScale: 1.06 },
    Legend: { headY: 12, headW: 36, headH: 27, bodyW: 31, bodyH: 22, eyeY: 18, eyeGap: 11, eyeR: 3.1, mouthY: 27, pawY: 39, earScale: 1.16 },
  };
  const species = {
    dragon: { base: color1, dark: color1, light: color3, accent: color2, eye: color1, ear: "horn", hair: "crest", extra: "wing" },
    dog: { base: color3, dark: color2, light: color3, accent: color2, eye: color1, ear: "flop", hair: "tuft", extra: "collar" },
    cat: { base: color3, dark: color2, light: color3, accent: color2, eye: color1, ear: "pointy", hair: "stripe", extra: "tail" },
    frog: { base: color1, dark: color1, light: color3, accent: color2, eye: color1, ear: "bubble", hair: "spots", extra: "cheeks" },
  };

  const cfg = species[type] || species.dragon;
  const s = stageSpecs[stage] || stageSpecs.Baby;
  const cx = 26;
  const legW = Math.round(s.bodyW * 0.34);
  const earOffset = s.headW * 0.24;
  const earTop = s.headY - 6 * s.earScale;
  const eyeL = cx - s.eyeGap / 2;
  const eyeR = cx + s.eyeGap / 2;

  const earArt = {
    pointy: (<><path d={`M${cx - earOffset} ${s.headY + 2} L${cx - earOffset - 5} ${earTop} L${cx - earOffset + 2} ${s.headY + 1} Z`} fill={cfg.dark} /><path d={`M${cx + earOffset} ${s.headY + 2} L${cx + earOffset + 5} ${earTop} L${cx + earOffset - 2} ${s.headY + 1} Z`} fill={cfg.dark} /><path d={`M${cx - earOffset} ${s.headY + 2} L${cx - earOffset - 2.6} ${earTop + 3} L${cx - earOffset + 1} ${s.headY + 1.8} Z`} fill={cfg.accent} opacity={0.8} /><path d={`M${cx + earOffset} ${s.headY + 2} L${cx + earOffset + 2.6} ${earTop + 3} L${cx + earOffset - 1} ${s.headY + 1.8} Z`} fill={cfg.accent} opacity={0.8} /></>),
    horn: (<><path d={`M${cx - earOffset + 1} ${s.headY + 3} C${cx - earOffset - 2} ${earTop + 6}, ${cx - earOffset - 2} ${earTop + 2}, ${cx - earOffset + 1} ${earTop}`} fill={cfg.dark} /><path d={`M${cx + earOffset - 1} ${s.headY + 3} C${cx + earOffset + 2} ${earTop + 6}, ${cx + earOffset + 2} ${earTop + 2}, ${cx + earOffset - 1} ${earTop}`} fill={cfg.dark} /></>),
    flop: (<><ellipse cx={cx - earOffset - 2} cy={s.headY + 8} rx={3.5 * s.earScale} ry={6 * s.earScale} fill={cfg.dark} transform={`rotate(-20 ${cx - earOffset - 2} ${s.headY + 8})`} /><ellipse cx={cx + earOffset + 2} cy={s.headY + 8} rx={3.5 * s.earScale} ry={6 * s.earScale} fill={cfg.dark} transform={`rotate(20 ${cx + earOffset + 2} ${s.headY + 8})`} /></>),
    bubble: (<><circle cx={cx - earOffset} cy={s.headY + 2} r={4.2 * s.earScale} fill={cfg.base} /><circle cx={cx + earOffset} cy={s.headY + 2} r={4.2 * s.earScale} fill={cfg.base} /><circle cx={cx - earOffset} cy={s.headY + 2} r={2.2 * s.earScale} fill={cfg.light} opacity={0.9} /><circle cx={cx + earOffset} cy={s.headY + 2} r={2.2 * s.earScale} fill={cfg.light} opacity={0.9} /></>),
  };

  const cartoonyStroke = isYoungerMode ? 1.35 : 0.95;
  const eyeBoost = isYoungerMode ? 1.3 : 1;
  const headScale = isYoungerMode ? 1.12 : 1;
  const bodyScaleX = isYoungerMode
    ? ({ dragon: 0.92, dog: 1.05, cat: 0.86, frog: 1.12 }[type] || 1)
    : 1;
  const bodyScaleY = isYoungerMode
    ? ({ dragon: 1.08, dog: 0.95, cat: 1.1, frog: 0.88 }[type] || 1)
    : 1;
  const headRy = s.headH * 0.43 * headScale;
  const bodyW = s.bodyW * bodyScaleX;
  const bodyH = s.bodyH * bodyScaleY;

  return (
    <g stroke={color1} strokeWidth={cartoonyStroke} strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx={cx} cy={s.pawY + 6} rx={s.bodyW * 0.72} ry={4} fill={color1} opacity={0.2} stroke="none" />
      {earArt[cfg.ear]}
      <ellipse cx={cx} cy={s.headY + 1} rx={s.headW * 0.45 * headScale} ry={headRy} fill={cfg.base} />
      <ellipse cx={cx} cy={s.headY + 2} rx={s.headW * 0.35 * headScale} ry={s.headH * 0.29 * headScale} fill={cfg.light} opacity={0.88} stroke="none" />
      <rect x={cx - bodyW / 2} y={s.headY + 10} width={bodyW} height={bodyH} rx={bodyW * 0.42} fill={cfg.base} />
      <rect x={cx - bodyW / 2 + 2} y={s.headY + 14} width={bodyW - 4} height={Math.max(6, bodyH - 8)} rx={6} fill={cfg.light} opacity={0.45} stroke="none" />
      <rect x={cx - bodyW / 2 + 0.5} y={s.pawY - 1} width={legW} height={6} rx={2} fill={cfg.dark} />
      <rect x={cx + bodyW / 2 - legW - 0.5} y={s.pawY - 1} width={legW} height={6} rx={2} fill={cfg.dark} />

      <circle cx={eyeL} cy={s.eyeY} r={s.eyeR * eyeBoost} fill={cfg.eye} />
      <circle cx={eyeR} cy={s.eyeY} r={s.eyeR * eyeBoost} fill={cfg.eye} />
      <circle cx={eyeL - 0.8} cy={s.eyeY - 0.8} r={Math.max(0.9, s.eyeR * eyeBoost - 1.2)} fill={color3} stroke="none" />
      <circle cx={eyeR - 0.8} cy={s.eyeY - 0.8} r={Math.max(0.9, s.eyeR * eyeBoost - 1.2)} fill={color3} stroke="none" />
      <path d={`M${cx - 2.4} ${s.mouthY} Q${cx} ${s.mouthY + 2.8} ${cx + 2.4} ${s.mouthY}`} fill="none" stroke={cfg.accent} strokeWidth={1.3} />
      <ellipse cx={cx} cy={s.mouthY - 1.5} rx={1.7} ry={1.25} fill={cfg.accent} stroke="none" />

      {cfg.hair === "crest" && <path d={`M${cx - 6} ${s.headY - 1} L${cx - 2} ${s.headY - 6} L${cx + 2} ${s.headY - 2} L${cx + 6} ${s.headY - 7} L${cx + 8} ${s.headY - 1}`} fill="none" stroke={cfg.dark} strokeWidth={2} />}
      {cfg.hair === "tuft" && <path d={`M${cx - 4} ${s.headY - 1} Q${cx - 1.2} ${s.headY - 5} ${cx + 1.2} ${s.headY - 1} Q${cx + 3.6} ${s.headY - 4} ${cx + 5} ${s.headY - 1}`} fill="none" stroke={cfg.dark} strokeWidth={1.5} />}
      {cfg.hair === "stripe" && <><path d={`M${cx - 6} ${s.headY + 1} Q${cx - 4} ${s.headY + 6} ${cx - 1} ${s.headY + 3}`} fill="none" stroke={cfg.dark} strokeWidth={1.2} /><path d={`M${cx + 6} ${s.headY + 1} Q${cx + 4} ${s.headY + 6} ${cx + 1} ${s.headY + 3}`} fill="none" stroke={cfg.dark} strokeWidth={1.2} /></>}
      {cfg.hair === "spots" && <><circle cx={cx - 6} cy={s.headY + 3} r={1.3} fill={cfg.dark} stroke="none" /><circle cx={cx + 7} cy={s.headY + 1.5} r={1.1} fill={cfg.dark} stroke="none" /></>}

      {cfg.extra === "wing" && <><path d={`M${cx - bodyW / 2 - 2} ${s.headY + 16} Q${cx - bodyW / 2 - 7} ${s.headY + 11} ${cx - bodyW / 2 - 5} ${s.headY + 22}`} fill={cfg.dark} opacity={0.65} /><path d={`M${cx + bodyW / 2 + 2} ${s.headY + 16} Q${cx + bodyW / 2 + 7} ${s.headY + 11} ${cx + bodyW / 2 + 5} ${s.headY + 22}`} fill={cfg.dark} opacity={0.65} /></>}
      {cfg.extra === "collar" && <rect x={cx - 7} y={s.headY + 11} width={14} height={2.5} rx={1.2} fill={cfg.accent} stroke="none" />}
      {cfg.extra === "tail" && <path d={`M${cx + bodyW / 2 - 1} ${s.headY + 20} Q${cx + bodyW / 2 + 7} ${s.headY + 15} ${cx + bodyW / 2 + 3} ${s.headY + 10}`} fill="none" stroke={cfg.dark} strokeWidth={1.7} />}
      {cfg.extra === "cheeks" && <><ellipse cx={cx - 6.5} cy={s.mouthY - 0.5} rx={2.2} ry={1.2} fill={cfg.light} stroke="none" opacity={0.95} /><ellipse cx={cx + 6.5} cy={s.mouthY - 0.5} rx={2.2} ry={1.2} fill={cfg.light} stroke="none" opacity={0.95} /></>}
      {isYoungerMode && <><circle cx={cx - 9} cy={s.mouthY - 2} r={1.2} fill={color3} stroke="none" opacity={0.8} /><circle cx={cx + 9} cy={s.mouthY - 2} r={1.2} fill={color3} stroke="none" opacity={0.8} /></>}
    </g>
  );
}

function PixelPet({ type, growth, size = 80, tint, petSize = "normal", opacity = 1, outline = false, isYoungerMode = false }) {
  const stage = getStage(growth).name;
  const sz = { tiny: 0.5, normal: 1, big: 1.4, huge: 1.8 }[petSize] || 1;
  const filterStr = tint ? `hue-rotate(${tint}deg) saturate(1.5)` : undefined;
  const art = getPetArt(type, stage, isYoungerMode);
  return (
    <svg width={size * sz} height={size * sz} viewBox="0 0 52 52"
      style={{
        display: "block",
        margin: "0 auto",
        filter: filterStr,
        opacity,
        transition: "all 0.2s",
        overflow: "visible",
      }}>
      <defs>
        <radialGradient id="petStudioGlow" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <circle cx="26" cy="24" r="20" fill="url(#petStudioGlow)" />
      {outline && <rect x="1.4" y="1.4" width="49.2" height="49.2" rx="9" fill="none" stroke={color2} strokeWidth="2.8" strokeDasharray="2 1" />}
      {art}
    </svg>
  );
}

function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    if (type === "pop") { osc.frequency.setValueAtTime(800, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1); gain.gain.setValueAtTime(0.3, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15); osc.start(); osc.stop(ctx.currentTime + 0.15); }
    else if (type === "boing") { osc.type = "sine"; osc.frequency.setValueAtTime(300, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.4); gain.gain.setValueAtTime(0.4, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4); osc.start(); osc.stop(ctx.currentTime + 0.4); }
    else if (type === "cheer") { [600, 800, 1000, 1200].forEach((f, i) => { const o2 = ctx.createOscillator(); const g2 = ctx.createGain(); o2.connect(g2); g2.connect(ctx.destination); o2.frequency.value = f; g2.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.08); g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.1); o2.start(ctx.currentTime + i * 0.08); o2.stop(ctx.currentTime + i * 0.08 + 0.1); }); }
    else if (type === "woosh") { osc.type = "sawtooth"; osc.frequency.setValueAtTime(200, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.2); gain.gain.setValueAtTime(0.2, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25); osc.start(); osc.stop(ctx.currentTime + 0.25); }
  } catch { }
}

function ScratchBlock({ def, value, onChange, onRemove, index, active, isYoungerMode }) {
  const size = isYoungerMode
    ? { icon: 22, label: 15, input: 14, inputWidth: 98, numberWidth: 58, pad: "12px 14px", remove: 20 }
    : { icon: 16, label: 12, input: 11, inputWidth: 72, numberWidth: 40, pad: "8px 12px", remove: 15 };
  const iconText = isYoungerMode ? (def.youngerIcons || def.icon) : def.icon;
  const labelText = isYoungerMode ? (def.youngerLabel || def.label) : def.label;
  return (
    <div
      draggable
      onDragStart={e => e.dataTransfer.setData("seq-index", String(index))}
      style={{
        display: "flex", alignItems: "center", gap: 8, background: active ? STUDIO_COLORS.accentSoft : def.color,
        borderRadius: 12, padding: size.pad, cursor: "grab", userSelect: "none",
        boxShadow: active ? `0 0 0 3px ${def.color}, 0 4px 12px rgba(0,0,0,0.3)` : "0 3px 0 rgba(0,0,0,0.2)",
        marginBottom: 6, transition: "box-shadow 0.15s"
      }}
    >
      <span style={{ fontSize: size.icon, flexShrink: 0 }}>{iconText}</span>
      <span style={{ color: active ? def.color : STUDIO_COLORS.accentSoft, fontWeight: 700, fontSize: size.label, flex: 1 }}>{labelText}</span>
      {def.hasInput === "colour" && (
        <input type="color" value={value || color2} onChange={e => onChange(e.target.value)}
          style={{ width: isYoungerMode ? 30 : 24, height: isYoungerMode ? 30 : 24, border: "none", borderRadius: 6, cursor: "pointer", padding: 0 }} />)}
      {def.hasInput === "text" && (
        <input value={value || ""} onChange={e => onChange(e.target.value)} placeholder={def.placeholder}
          style={{ width: size.inputWidth, fontSize: size.input, borderRadius: 6, border: "none", padding: isYoungerMode ? "5px 8px" : "2px 6px", fontWeight: 600 }} />)}
      {def.hasInput === "number" && (
        <input type="number" value={value || 2} min={1} max={20} onChange={e => onChange(e.target.value)}
          style={{ width: size.numberWidth, fontSize: size.input, borderRadius: 6, border: "none", padding: isYoungerMode ? "5px 8px" : "2px 6px", fontWeight: 700, textAlign: "center" }} />)}
      {def.hasInput === "select" && (
        <select value={value || def.options[0]} onChange={e => onChange(e.target.value)}
          style={{ fontSize: size.input, borderRadius: 6, border: "none", padding: isYoungerMode ? "5px 8px" : "2px 5px", fontWeight: 600 }}>
          {def.options.map(o => <option key={o}>{o}</option>)}
        </select>
      )}
      <span onClick={onRemove} style={{ color: "rgba(255,255,255,0.8)", cursor: "pointer", fontSize: size.remove, fontWeight: 700, marginLeft: 2 }}>×</span>
    </div>
  );
}

function PaletteBlock({ def, onAdd, isYoungerMode }) {
  const iconText = isYoungerMode ? (def.youngerIcons || def.icon) : def.icon;
  const labelText = isYoungerMode ? (def.youngerLabel || def.label) : def.label;
  return (
    <div onClick={() => onAdd(def)} draggable onDragStart={e => e.dataTransfer.setData("palette-id", def.id)}
      style={{ display: "flex", alignItems: "center", gap: isYoungerMode ? 9 : 6, background: def.color, borderRadius: 9, padding: isYoungerMode ? "10px 12px" : "6px 10px", cursor: "pointer", userSelect: "none", boxShadow: "0 2px 0 rgba(0,0,0,0.18)", marginBottom: 4 }}>
      <span style={{ fontSize: isYoungerMode ? 20 : 14 }}>{iconText}</span>
      <span style={{ color: STUDIO_COLORS.accentSoft, fontWeight: 700, fontSize: isYoungerMode ? 14 : 11 }}>{labelText}</span>
    </div>
  );
}

function LiveStage({ pet, anim, running }) {
  const rainbowColors = [STUDIO_COLORS.accent, STUDIO_COLORS.accent, STUDIO_COLORS.accent, STUDIO_COLORS.darkSurface, STUDIO_COLORS.accent, STUDIO_COLORS.accentSoft, STUDIO_COLORS.accentSoft];
  const [rainbowIdx, setRainbowIdx] = useState(0);
  const rainbowRef = useRef(null);
  const wallpaper = anim.wallpaper || "none";
  const wallpaperEmoji = wallpaper === "stars" ? "⭐" : wallpaper === "hearts" ? "💖" : wallpaper === "dots" ? "⚪" : "";
  const toyEmoji = anim.toy === "ball" ? "⚽" : anim.toy === "book" ? "📘" : anim.toy === "plant" ? "🪴" : "";

  useEffect(() => {
    if (anim.rainbow) {
      rainbowRef.current = setInterval(() => setRainbowIdx(i => (i + 1) % rainbowColors.length), 180);
    } else {
      clearInterval(rainbowRef.current);
      setRainbowIdx(0);
    }
    return () => clearInterval(rainbowRef.current);
  }, [anim.rainbow]);

  const tintVal = anim.rainbow
    ? parseInt(rainbowColors[rainbowIdx].replace("#", ""), 16) % 360
    : anim.tint;

  const confettiPieces = ["🎊", "🎉", "⭐", "🌟", "✨", "🎈"];

  return (
    <div style={{ background: anim.wallColor || STUDIO_COLORS.darkSurface, borderRadius: 12, padding: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 260, position: "relative", overflow: "hidden", transition: "background 0.25s", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -20px 50px rgba(0,0,0,0.25)" }}>
      {["10%,15%", "80%,10%", "50%,5%", "20%,70%", "75%,60%", "40%,80%", "90%,40%"].map((pos, i) => (
        <div key={i} style={{ position: "absolute", left: pos.split(",")[0], top: pos.split(",")[1], width: 2, height: 2, background: STUDIO_COLORS.accentSoft, borderRadius: "50%", opacity: 0.4 }} />
      ))}
      {wallpaper !== "none" && (
        <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "repeat(5,1fr)", alignContent: "space-between", padding: "8px 12px 36px", opacity: 0.28, pointerEvents: "none", color: STUDIO_COLORS.accentSoft, fontSize: 14 }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} style={{ textAlign: "center" }}>{wallpaperEmoji}</span>
          ))}
        </div>
      )}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 32, background: anim.floorColor || STUDIO_COLORS.darkSurface, borderTop: `2px solid ${color1}`, transition: "background 0.25s" }} />
      {toyEmoji && <div style={{ position: "absolute", bottom: 8, right: 14, fontSize: 18, zIndex: 9 }}>{toyEmoji}</div>}
      {anim.confetti && (
        <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6, fontSize: 20, pointerEvents: "none", zIndex: 10 }}>
          {confettiPieces.map((c, i) => <span key={i} style={{ animation: "none" }}>{c}</span>)}
        </div>
      )}
      {(anim.bubble || anim.think) && (
        <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", background: STUDIO_COLORS.accentSoft, border: `2px solid ${color2}`, borderRadius: anim.think ? "50%" : 12, padding: "5px 14px", fontSize: 12, fontWeight: 700, color: STUDIO_COLORS.text, whiteSpace: "nowrap", zIndex: 10, maxWidth: 150, textAlign: "center" }}>
          {anim.bubble || anim.think}
          <span style={{ position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)", fontSize: 10 }}>{anim.think ? "•••" : "▼"}</span>
        </div>
      )}
      {anim.zzz && <div style={{ position: "absolute", top: 20, right: "25%", fontSize: 14, fontWeight: 800, color: STUDIO_COLORS.accent, zIndex: 10 }}>Zzz…</div>}
      {anim.sparkle && <div style={{ position: "absolute", top: 16, right: "22%", fontSize: 18, zIndex: 10 }}>✨</div>}
      {anim.shine && <div style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", border: `3px solid ${color2}`, opacity: 0.7, pointerEvents: "none" }} />}
      <div style={{
        transform: `translateX(${anim.x}px) translateY(${anim.y}px) rotate(${anim.spin}deg) scale(${anim.scale})`,
        transition: `transform ${anim.speedMs || 250}ms`,
        display: "inline-block", position: "relative", zIndex: 5,
        opacity: anim.ghost ? 0.3 : 1,
        filter: anim.pulse ? "brightness(1.2) saturate(1.15)" : "drop-shadow(0 8px 12px rgba(15,23,42,0.45))"
      }}>
        <div style={{ position: "absolute", inset: "auto 50% -4px", transform: "translateX(-50%)", width: 70, height: 11, borderRadius: "50%", background: "radial-gradient(circle, rgba(15,23,42,0.35), transparent 70%)", zIndex: -1 }} />
        <PixelPet type={pet.type} growth={pet.growth} size={90} tint={tintVal} petSize={anim.petSize} outline={anim.shine} isYoungerMode={anim.isYoungerMode} />
      </div>
      {running && <div style={{ position: "absolute", bottom: 6, right: 8, fontSize: 10, color: STUDIO_COLORS.darkSurface, fontWeight: 700 }}>● running</div>}
      <p style={{ position: "absolute", bottom: 6, left: 8, margin: 0, fontSize: 10, color: STUDIO_COLORS.darkSurface, fontWeight: 600 }}>{pet.name} · {getStage(pet.growth).name}</p>
    </div>
  );
}

export default function PetStudio({ pet, setPet, spentXP, setSpentXP, totalXP }) {
  const [studioTab, setStudioTab] = useState("studio");
  const [kidMode, setKidMode] = useState("older");
  const [sequence, setSequence] = useState([]);
  const [values, setValues] = useState({});
  const [running, setRunning] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [anim, setAnim] = useState({ x: 0, y: 0, spin: 0, scale: 1, bubble: "", think: "", confetti: false, zzz: false, sparkle: false, shine: false, ghost: false, rainbow: false, pulse: false, tint: undefined, petSize: "normal", speedMs: 250, wallColor: color1, floorColor: color1, wallpaper: "none", toy: "none" });
  const [feedMsg, setFeedMsg] = useState(null);
  const [selCat, setSelCat] = useState("event");
  const stopRef = useRef(false);
  const nameIdeas = {
    younger: {
      dragon: ["Bubbles", "Noodle", "Sprinkles", "Wiggles"],
      dog: ["Snickerdoodle", "Boop", "Pudding", "Waffles"],
      cat: ["Mochi", "Tater Tot", "Peaches", "Muffin"],
      frog: ["Jellybean", "Pickle", "Pogo", "Blinky"],
    },
    older: {
      dragon: ["Ember", "Blaze", "Rift", "Nova"],
      dog: ["Scout", "Ranger", "Dash", "Ace"],
      cat: ["Luna", "Shadow", "Iris", "Sage"],
      frog: ["Moss", "River", "Orbit", "Rune"],
    },
  };
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

  const addToSeq = def => setSequence(s => [...s, { id: def.id, uid: Date.now() + Math.random() }]);
  const removeFromSeq = uid => setSequence(s => s.filter(x => x.uid !== uid));
  const clearSeq = () => { setSequence([]); setValues({}); };
  const stopScript = () => { stopRef.current = true; setRunning(false); setActiveIdx(-1); };

  const sleepMs = ms => new Promise(r => setTimeout(r, ms));

  const runBlock = async (id, val, speedMs) => {
    const fast = speedMs <= 150;
    const slow = speedMs >= 450;
    const dur = speedMs || 250;

    if (id === "colour") {
      const hue = parseInt((val || color2).replace("#", ""), 16) % 360;
      setAnim(s => ({ ...s, tint: hue, rainbow: false }));
    } else if (id === "rainbow") {
      setAnim(s => ({ ...s, rainbow: true })); await sleepMs(1200);
      setAnim(s => ({ ...s, rainbow: false }));
    } else if (id === "say") {
      setAnim(s => ({ ...s, bubble: val || "Hello!", think: "" })); await sleepMs(slow ? 2000 : fast ? 600 : 1200);
      setAnim(s => ({ ...s, bubble: "" }));
    } else if (id === "think") {
      setAnim(s => ({ ...s, think: val || "Hmm...", bubble: "" })); await sleepMs(slow ? 2000 : fast ? 600 : 1200);
      setAnim(s => ({ ...s, think: "" }));
    } else if (id === "size") {
      setAnim(s => ({ ...s, petSize: val || "normal" }));
    } else if (id === "pulse") {
      for (let j = 0; j < 3; j++) {
        setAnim(s => ({ ...s, scale: 1.3, pulse: true })); await sleepMs(dur * 0.8);
        setAnim(s => ({ ...s, scale: 1, pulse: false })); await sleepMs(dur * 0.8);
      }
    } else if (id === "ghost") {
      setAnim(s => ({ ...s, ghost: true })); await sleepMs(slow ? 1500 : fast ? 400 : 900);
      setAnim(s => ({ ...s, ghost: false }));
    } else if (id === "shine") {
      setAnim(s => ({ ...s, shine: true })); await sleepMs(slow ? 1500 : fast ? 400 : 900);
      setAnim(s => ({ ...s, shine: false }));
    } else if (id === "walk") {
      for (let j = 0; j < 3; j++) {
        setAnim(s => ({ ...s, x: 36 })); await sleepMs(dur);
        setAnim(s => ({ ...s, x: -36 })); await sleepMs(dur);
      }
      setAnim(s => ({ ...s, x: 0 }));
    } else if (id === "dance") {
      for (let j = 0; j < 4; j++) {
        setAnim(s => ({ ...s, y: -20, scale: 1.1 })); await sleepMs(dur * 0.8);
        setAnim(s => ({ ...s, y: 0, scale: 1 })); await sleepMs(dur * 0.8);
      }
    } else if (id === "spin") {
      setAnim(s => ({ ...s, spin: 720 })); await sleepMs(dur * 3);
      setAnim(s => ({ ...s, spin: 0 }));
    } else if (id === "jump") {
      setAnim(s => ({ ...s, y: -50, scale: 1.2 })); await sleepMs(dur * 1.2);
      setAnim(s => ({ ...s, y: 0, scale: 1 }));
    } else if (id === "moveleft") {
      setAnim(s => ({ ...s, x: s.x - 40 })); await sleepMs(dur);
    } else if (id === "moveright") {
      setAnim(s => ({ ...s, x: s.x + 40 })); await sleepMs(dur);
    } else if (id === "centre") {
      setAnim(s => ({ ...s, x: 0, y: 0 })); await sleepMs(dur);
    } else if (id === "dash") {
      setAnim(s => ({ ...s, x: s.x + 80 })); await sleepMs(dur * 0.6);
      setAnim(s => ({ ...s, x: s.x - 80 })); await sleepMs(dur * 0.6);
      setAnim(s => ({ ...s, x: 0 }));
    } else if (id === "hop") {
      for (let j = 0; j < 3; j++) {
        setAnim(s => ({ ...s, y: -30 })); await sleepMs(dur * 0.55);
        setAnim(s => ({ ...s, y: 0 })); await sleepMs(dur * 0.55);
      }
    } else if (id === "moonwalk") {
      for (let j = 0; j < 4; j++) {
        setAnim(s => ({ ...s, x: s.x - 22, spin: -6 })); await sleepMs(dur * 0.6);
        setAnim(s => ({ ...s, x: s.x - 44, spin: 6 })); await sleepMs(dur * 0.6);
      }
      setAnim(s => ({ ...s, spin: 0 }));
    } else if (id === "zigzag") {
      for (let j = 0; j < 5; j++) {
        setAnim(s => ({ ...s, x: s.x + 24, y: -12 })); await sleepMs(dur * 0.5);
        setAnim(s => ({ ...s, x: s.x - 24, y: 12 })); await sleepMs(dur * 0.5);
      }
      setAnim(s => ({ ...s, y: 0 }));
    } else if (id === "backflip") {
      setAnim(s => ({ ...s, y: -36, spin: -720, scale: 1.1 })); await sleepMs(dur * 2);
      setAnim(s => ({ ...s, y: 0, spin: 0, scale: 1 }));
    } else if (id === "slide") {
      setAnim(s => ({ ...s, x: s.x + 60, y: 8 })); await sleepMs(dur);
      setAnim(s => ({ ...s, y: 0 })); await sleepMs(dur * 0.5);
    } else if (id === "float") {
      for (let j = 0; j < 3; j++) {
        setAnim(s => ({ ...s, y: -34, scale: 1.08 })); await sleepMs(dur);
        setAnim(s => ({ ...s, y: -10, scale: 1.04 })); await sleepMs(dur);
      }
      setAnim(s => ({ ...s, y: 0, scale: 1 }));
    } else if (id === "celebrate") {
      setAnim(s => ({ ...s, confetti: true, scale: 1.2 }));
      playSound("cheer"); await sleepMs(slow ? 1800 : fast ? 600 : 1100);
      setAnim(s => ({ ...s, confetti: false, scale: 1 }));
    } else if (id === "sleep") {
      setAnim(s => ({ ...s, zzz: true })); await sleepMs(slow ? 2000 : fast ? 600 : 1200);
      setAnim(s => ({ ...s, zzz: false }));
    } else if (id === "sparkle") {
      setAnim(s => ({ ...s, sparkle: true })); await sleepMs(slow ? 1200 : fast ? 300 : 700);
      setAnim(s => ({ ...s, sparkle: false }));
    } else if (id === "sound") {
      playSound(val || "pop");
      await sleepMs(300);
    } else if (id === "wallpaint") {
      setAnim(s => ({ ...s, wallColor: val || color1 }));
    } else if (id === "floorpaint") {
      setAnim(s => ({ ...s, floorColor: val || color1 }));
    } else if (id === "wallpaper") {
      setAnim(s => ({ ...s, wallpaper: val || "none" }));
    } else if (id === "settoy") {
      setAnim(s => ({ ...s, toy: val || "none" }));
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
        if (block.id === "speed") { speedMs = val === "slow" ? 450 : val === "fast" ? 120 : 250; continue; }
        if (block.id === "wait") { await sleepMs((parseFloat(val) || 1) * speedMs * 2); continue; }
        if (block.id === "repeat") {
          const times = parseInt(val) || 2;
          const sub = blocks.slice(i + 1);
          for (let r = 0; r < times; r++) {
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
    if (availXP < food.xpCost) { setFeedMsg("Not enough XP 😢"); setTimeout(() => setFeedMsg(null), 2000); return; }
    const newGrowth = pet.growth + food.growth;
    const newStage = getStage(newGrowth);
    setPet({ ...pet, growth: newGrowth });
    setSpentXP(spentXP + food.xpCost);
    setFeedMsg(newStage.name !== stageObj.name ? `🎉 Evolved to ${newStage.name}!` : `${pet.name} loved it! +${food.growth} growth`);
    setTimeout(() => setFeedMsg(null), 2500);
  };

  const onDropSeq = e => {
    const pid = e.dataTransfer.getData("palette-id");
    if (pid) { const def = paletteDefs.find(d => d.id === pid); if (def) addToSeq(def); }
  };

  return (
    <div style={{ background: STUDIO_COLORS.accentSoft, border: `2px solid ${color2}`, borderRadius: 18, marginBottom: 16, overflow: "hidden" }}>
      <div style={{ display: "flex", borderBottom: `2px solid ${color2}`, overflowX: "auto" }}>
        {[ ["studio", "🎨 Studio"], ["shop", "🛒 Shop"], ["choose", "✏️ Choose"] ].map(([t, l]) => (
          <button key={t} onClick={() => setStudioTab(t)} style={{ flex: 1, padding: "10px 4px", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", minWidth: 80, background: studioTab === t ? STUDIO_COLORS.accentSoft : "transparent", color: studioTab === t ? STUDIO_COLORS.text : STUDIO_COLORS.accent, borderBottom: studioTab === t ? `3px solid ${color2}` : "none" }}>{l}</button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: isYoungerMode ? "10px 12px" : "8px 12px", borderBottom: `1px solid ${color2}`, background: STUDIO_COLORS.accentSoft }}>
        <p style={{ margin: 0, color: STUDIO_COLORS.text, fontWeight: 700, fontSize: isYoungerMode ? 14 : 12 }}>Pet Studio Mode:</p>
        <div style={{ display: "flex", gap: 6, background: STUDIO_COLORS.accentSoft, borderRadius: 999, padding: 3 }}>
          {[ ["older", "Older Kids"], ["younger", "Younger Kids (5-7)"] ].map(([mode, label]) => (
            <button key={mode} onClick={() => setKidMode(mode)}
              style={{ border: "none", cursor: "pointer", borderRadius: 999, fontWeight: 700, fontSize: isYoungerMode ? 13 : 11, padding: isYoungerMode ? "8px 12px" : "5px 10px", background: kidMode === mode ? STUDIO_COLORS.accent : "transparent", color: kidMode === mode ? STUDIO_COLORS.accentSoft : STUDIO_COLORS.text }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {studioTab === "studio" && (
        <div style={{ display: "flex", minHeight: 420 }}>
          <div style={{ width: isYoungerMode ? 204 : 152, flexShrink: 0, background: STUDIO_COLORS.darkSurface, padding: isYoungerMode ? 10 : 8, overflowY: "auto" }}>
            <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginBottom: 8 }}>
              {availableCats.map(([k, v]) => (
                <button key={k} onClick={() => setSelCat(k)} style={{ fontSize: isYoungerMode ? 12 : 9, padding: isYoungerMode ? "5px 9px" : "3px 6px", borderRadius: 999, border: "none", cursor: "pointer", fontWeight: 700, background: selCat === k ? CAT_COLORS[k] : STUDIO_COLORS.darkSurface, color: STUDIO_COLORS.accentSoft }}>{v}</button>
              ))}
            </div>
            {paletteDefs.filter(d => d.cat === selCat).map(d => (
              <PaletteBlock key={d.id} def={d} onAdd={addToSeq} isYoungerMode={isYoungerMode} />
            ))}
          </div>

          <div style={{ width: isYoungerMode ? 250 : 200, flexShrink: 0, background: STUDIO_COLORS.darkSurface, padding: isYoungerMode ? 12 : 10, overflowY: "auto", borderLeft: `1px solid ${color1}`, borderRight: `1px solid ${color1}` }}
            onDragOver={e => e.preventDefault()} onDrop={onDropSeq}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: isYoungerMode ? 14 : 11, color: STUDIO_COLORS.accent, fontWeight: 700 }}>Script</span>
              <div style={{ display: "flex", gap: 4 }}>
                {!running ? (
                  <PetStudioActionButton
                    icon="▶"
                    label="Run"
                    onClick={runSequence}
                    disabled={sequence.length === 0}
                    isYoungerMode={isYoungerMode}
                    style={{
                      padding: isYoungerMode ? "7px 12px" : "4px 10px",
                      background: STUDIO_COLORS.darkSurface,
                      color: STUDIO_COLORS.accentSoft,
                      fontSize: isYoungerMode ? 14 : 11,
                    }}
                  />
                ) : (
                  <PetStudioActionButton
                    icon="■"
                    label="Stop"
                    onClick={stopScript}
                    isYoungerMode={isYoungerMode}
                    style={{
                      padding: isYoungerMode ? "7px 12px" : "4px 10px",
                      background: STUDIO_COLORS.accent,
                      color: STUDIO_COLORS.accentSoft,
                      fontSize: isYoungerMode ? 14 : 11,
                    }}
                  />
                )}
                <PetStudioActionButton
                  icon="🗑"
                  label="Clear"
                  onClick={clearSeq}
                  isYoungerMode={isYoungerMode}
                  style={{
                    padding: isYoungerMode ? "7px 11px" : "4px 8px",
                    background: STUDIO_COLORS.darkSurface,
                    color: STUDIO_COLORS.accent,
                    fontSize: isYoungerMode ? 14 : 11,
                  }}
                />
              </div>
            </div>
            {sequence.length === 0 ? (
              <div style={{ border: `2px dashed ${color1}`, borderRadius: 10, padding: "24px 10px", textAlign: "center" }}>
                <p style={{ color: STUDIO_COLORS.darkSurface, fontSize: isYoungerMode ? 15 : 11, margin: 0, fontWeight: 600 }}>Drop blocks here!</p>
              </div>
            ) : sequence.map((block, idx) => {
              const def = BLOCK_DEFS.find(d => d.id === block.id);
              if (!def) return null;
              return (
                <ScratchBlock key={block.uid} def={def} index={idx} active={activeIdx === idx}
                  value={values[block.uid]}
                  onChange={v => setValues(prev => ({ ...prev, [block.uid]: v }))}
                  onRemove={() => removeFromSeq(block.uid)}
                  isYoungerMode={isYoungerMode} />
              );
            })}
          </div>

          <div style={{ flex: 1, background: STUDIO_COLORS.darkSurface, padding: 10, display: "flex", flexDirection: "column", gap: 8 }}>
            <p style={{ margin: 0, fontSize: 11, color: STUDIO_COLORS.darkSurface, fontWeight: 700, textAlign: "center" }}>🎬 Live Stage</p>
            <LiveStage pet={pet} anim={{ ...anim, isYoungerMode }} running={running} />
          </div>
        </div>
      )}

      {studioTab === "shop" && (
        <div style={{ padding: 14 }}>
          <p style={{ fontSize: 13, color: STUDIO_COLORS.text, marginBottom: 12, fontWeight: 600 }}>Feed {pet.name} to help them grow! You have <strong>{availXP} XP</strong> 🌟</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {FOODS.map(f => (
              <button key={f.id} onClick={() => feed(f)} disabled={availXP < f.xpCost} style={{ padding: "14px 10px", borderRadius: 14, border: "2px solid", cursor: availXP >= f.xpCost ? "pointer" : "not-allowed", borderColor: color2, background: STUDIO_COLORS.accentSoft, opacity: availXP >= f.xpCost ? 1 : 0.5, textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 4 }}>{f.emoji}</div>
                <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 13, color: STUDIO_COLORS.text }}>{f.name}</p>
                <p style={{ margin: 0, fontSize: 12, color: STUDIO_COLORS.text }}>💜 {f.xpCost} XP</p>
              </button>
            ))}
          </div>
          {feedMsg && <p style={{ margin: "12px 0 0", fontWeight: 700, fontSize: 14, color: STUDIO_COLORS.darkSurface, textAlign: "center" }}>{feedMsg}</p>}
          {nextStage && <p style={{ margin: "8px 0 0", fontSize: 12, color: STUDIO_COLORS.text }}>Next stage in {nextStage.minGrowth - pet.growth} growth.</p>}
        </div>
      )}

      {studioTab === "choose" && (
        <div style={{ padding: 14 }}>
          <p style={{ fontSize: 13, color: STUDIO_COLORS.text, marginBottom: 10, fontWeight: 600 }}>Choose your pet and name them!</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
            {PET_TYPES.map(p => (
              <button key={p.id} onClick={() => setPet({ ...pet, type: p.id })} style={{ padding: "12px 8px", borderRadius: 14, border: "2px solid", cursor: "pointer", borderColor: color2, background: `linear-gradient(180deg, ${STUDIO_COLORS.accentSoft}, ${STUDIO_COLORS.panel})`, textAlign: "center", boxShadow: pet.type === p.id ? "0 10px 20px rgba(126,87,255,0.2)" : "0 4px 10px rgba(15,23,42,0.08)", transition: "all 0.2s" }}>
                <div style={{ borderRadius: 12, padding: "6px 0 4px", background: "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.9), rgba(248,250,252,0))" }}>
                  <PixelPet type={p.id} growth={0} size={54} isYoungerMode={isYoungerMode} />
                </div>
                <p style={{ margin: "6px 0 0", fontWeight: 700, fontSize: 13, color: pet.type === p.id ? STUDIO_COLORS.text : STUDIO_COLORS.darkSurface }}>{p.name}</p>
              </button>
            ))}
          </div>
          <input value={pet.name} onChange={e => setPet({ ...pet, name: e.target.value })} placeholder="Name your pet!" maxLength={16}
            style={{ width: "100%", boxSizing: "border-box", fontSize: 14, borderRadius: 10, border: `2px solid ${color2}`, padding: "8px 12px", fontWeight: 600, color: STUDIO_COLORS.text }} />
          <p style={{ fontSize: 12, color: STUDIO_COLORS.text, margin: "10px 0 6px", fontWeight: 700 }}>
            {isYoungerMode ? "Cute & goofy name ideas:" : "Cool name ideas:"}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {(nameIdeas[kidMode]?.[pet.type] || []).map(n => (
              <button
                key={n}
                onClick={() => setPet({ ...pet, name: n })}
                style={{
                  border: `1px solid ${color2}`,
                  background: STUDIO_COLORS.accentSoft,
                  color: STUDIO_COLORS.text,
                  borderRadius: 999,
                  padding: "4px 10px",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
