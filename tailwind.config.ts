import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        // Hierarquia tipográfica padronizada (sistema modular 1.250)
        'display': ['48px', { lineHeight: '1.1', fontWeight: '800' }],  // H1 páginas principais
        'h1': ['36px', { lineHeight: '1.2', fontWeight: '700' }],        // H1 seções
        'h2': ['32px', { lineHeight: '1.2', fontWeight: '700' }],        // H2 seções
        'h3': ['24px', { lineHeight: '1.3', fontWeight: '600' }],        // H3 componentes
        'h4': ['18px', { lineHeight: '1.4', fontWeight: '600' }],        // H4 cards
        'body': ['16px', { lineHeight: '1.5', fontWeight: '400' }],      // Texto corpo
        'small': ['14px', { lineHeight: '1.4', fontWeight: '400' }],     // Texto pequeno
      },
      spacing: {
        // Sistema 8pt grid para espaçamento consistente
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Sistema de cores unificado da Radial
        radial: {
          // Cores primárias
          orange: "#ff5d26",    // Laranja principal (unificado)
          dark: "#282031",      // Fundo escuro principal
          darker: "#20232a",    // Fundo escuro secundário
          
          // Escala de cinzas padronizada
          gray: {
            50: "#f9fafb",
            100: "#f3f4f6", 
            200: "#e5e7eb",
            300: "#d1d5db",
            400: "#9ca3af",
            500: "#6b7280",
            600: "#4b5563",
            700: "#374151",
            800: "#1f2937",
            900: "#111827",
          }
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-solar": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "subtle-glow": {
          "0%, 100%": {
            textShadow:
              "rgba(255, 124, 64, 0.4) 0px 0px 8px, rgba(255, 255, 255, 0.5) 0px 0px 2px",
          },
          "50%": {
            textShadow:
              "rgba(255, 124, 64, 0.6) 0px 0px 12px, rgba(255, 124, 64, 0.3) 0px 0px 20px, rgba(255, 255, 255, 0.7) 0px 0px 2px",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-solar": "pulse-solar 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        marquee: "marquee 20s linear infinite",
        "video-cta": "subtle-glow 3s ease-in-out infinite",
      },
      backgroundImage: {
        "radial-gradient": "linear-gradient(to bottom, #ff7c40, #ff6028)",
        "radial-dark-gradient": "linear-gradient(to bottom, #20232a, #1d1f24)",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
