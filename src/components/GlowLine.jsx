export default function GlowLine({ className = "" }) {
    return (
        <div
            className={`h-px ${className}`}
            style={{
                background: "linear-gradient(to right, transparent, #818cf8, #a855f7, #818cf8, transparent)",
                boxShadow: "0 0 8px rgba(129,140,248,0.6)",
            }}
        />
    );
}