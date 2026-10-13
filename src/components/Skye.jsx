export default function Skye({ size = 120, outline = "#fff" }) {
  return (
    <svg viewBox="0 0 120 100" width={size} fill="none">
      <defs>
        <linearGradient id="skye-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8aa9ff" /><stop offset="1" stopColor="#6c63ff" />
        </linearGradient>
      </defs>
      <polygon points="6,48 112,6 68,94 54,62" fill="url(#skye-g)" stroke={outline} strokeWidth="5" strokeLinejoin="round" />
      <circle cx="50" cy="46" r="8" fill="#fff" /><circle cx="72" cy="40" r="8" fill="#fff" />
      <circle cx="51" cy="47" r="4" fill="#1e2a47" /><circle cx="73" cy="41" r="4" fill="#1e2a47" />
      <path d="M50 61 Q60 69 70 56" stroke="#1e2a47" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}