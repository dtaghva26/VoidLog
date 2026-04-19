import { WEBSITE_COLORS } from "../../colors.js";

export default function PetStudioActionButton({
  icon,
  label,
  onClick,
  disabled = false,
  isYoungerMode = false,
  style = {},
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      style={{
        borderRadius: 7,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: 800,
        background: WEBSITE_COLORS.primary,
        color: WEBSITE_COLORS.onAccent,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        minWidth: isYoungerMode ? 42 : "auto",
        opacity: disabled ? 0.6 : 1,
        ...style,
      }}
    >
      <span style={{ fontSize: isYoungerMode ? 15 : 12, lineHeight: 1 }}>{icon}</span>
      {!isYoungerMode && <span>{label}</span>}
    </button>
  );
}
