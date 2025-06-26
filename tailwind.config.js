/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        "neo-gradient":
          "radial-gradient(circle,rgba(240, 244, 248, 1) 0%, rgba(183, 211, 235, 1) 100%)",
        "neo-gradient-hover": "linear-gradient(145deg, #e2e8f0, #f0f4f8)",
        "neo-gradient-pressed": "linear-gradient(145deg, #d1d9e0, #e2e8f0)",
      },
      boxShadow: {
        // Refined neumorphism shadows
        "neo-sm": "4px 4px 8px #c8d0e0, -4px -4px 8px #ffffff",
        neo: "8px 8px 16px #c8d0e0, -8px -8px 16px #ffffff",
        "neo-lg": "12px 12px 24px #c8d0e0, -12px -12px 24px #ffffff",
        "neo-xl": "20px 20px 40px #c8d0e0, -20px -20px 40px #ffffff",

        // Inset shadows for pressed state
        "neo-inset-sm":
          "inset 4px 4px 8px #c8d0e0, inset -4px -4px 8px #ffffff",
        "neo-inset": "inset 8px 8px 16px #c8d0e0, inset -8px -8px 16px #ffffff",
        "neo-inset-lg":
          "inset 12px 12px 24px #c8d0e0, inset -12px -12px 24px #ffffff",

        // Subtle hover effects
        "neo-hover": "6px 6px 12px #c8d0e0, -6px -6px 12px #ffffff",
        "neo-focus":
          "0 0 0 3px rgba(99, 102, 241, 0.1), 8px 8px 16px #c8d0e0, -8px -8px 16px #ffffff",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        // Variantes de sombra neumórfica interna
        ".shadow-inset-neumorphic-sm": {
          boxShadow:
            "inset 2px 2px 4px rgba(255,255,255,0.6), inset -2px -2px 6px rgba(0,0,0,0.4)",
        },
        ".shadow-inset-neumorphic": {
          boxShadow:
            "inset 4px 4px 8px rgba(255,255,255,0.7), inset -4px -4px 12px rgba(0,0,0,0.5)",
        },
        ".shadow-inset-neumorphic-lg": {
          boxShadow:
            "inset 6px 6px 12px rgba(255,255,255,0.8), inset -6px -6px 18px rgba(0,0,0,0.6)",
        },

        // Variantes de sombra para campos de texto
        ".shadow-inset-field-sm": {
          boxShadow: "inset 1px 1px 1px rgba(0,0,0,0.3)",
        },
        ".shadow-inset-field": {
          boxShadow: "inset 2px 2px 2px rgba(0,0,0,0.5)",
        },
        ".shadow-inset-field-lg": {
          boxShadow: "inset 3px 3px 4px rgba(0,0,0,0.6)",
        },

        // Variantes para modo oscuro
        ".shadow-inset-neumorphic-dark": {
          boxShadow:
            "inset 4px 4px 8px rgba(255,255,255,0.1), inset -4px -4px 12px rgba(0,0,0,0.8)",
        },
        ".shadow-inset-field-dark": {
          boxShadow: "inset 2px 2px 2px rgba(0,0,0,0.8)",
        },

        // Variantes suaves para elementos delicados
        ".shadow-inset-soft": {
          boxShadow:
            "inset 2px 2px 6px rgba(255,255,255,0.5), inset -2px -2px 8px rgba(0,0,0,0.3)",
        },

        // Variante para botones presionados
        ".shadow-inset-pressed": {
          boxShadow:
            "inset 3px 3px 6px rgba(0,0,0,0.4), inset -1px -1px 3px rgba(255,255,255,0.6)",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
