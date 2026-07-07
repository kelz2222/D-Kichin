import React from 'react'

export default function Logo({ size = 56 }) {
  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F2D06B" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#9C7A22" />
          </linearGradient>
        </defs>

        <g transform="rotate(-8 100 100)">
          <rect
            x="35"
            y="30"
            width="130"
            height="110"
            rx="22"
            fill="url(#goldGrad)"
          />
          <circle cx="178" cy="85" r="16" fill="url(#goldGrad)" />
          <circle cx="178" cy="85" r="7" fill="#0A0A0A" />

          <g fill="#0A0A0A">
            <rect x="55" y="48" width="18" height="45" rx="8" />
            <rect x="59" y="93" width="10" height="28" rx="3" />
          </g>

          <g fill="#0A0A0A">
            <path d="M90 48 L106 48 L100 100 L96 100 Z" />
            <rect x="95" y="100" width="6" height="24" rx="2" />
          </g>

          <g fill="#0A0A0A">
            <ellipse cx="130" cy="65" rx="13" ry="18" />
            <rect x="126" y="82" width="8" height="42" rx="4" />
          </g>
        </g>
      </svg>

      <div
        className="mt-1 text-white font-bold tracking-wide"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        <span className="text-gold">D&rsquo;</span> Kichin
      </div>
    </div>
  )
}
