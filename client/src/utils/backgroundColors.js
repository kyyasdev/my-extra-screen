// Background color configurations
export const backgroundColors = {
  // Solid colors (eye-friendly)
  solid: [
    {
      id: 'solid1',
      name: 'Deep Navy',
      color: '#1a1a2e',
      preview: '#1a1a2e',
    },
    {
      id: 'solid2',
      name: 'Midnight Blue',
      color: '#16213e',
      preview: '#16213e',
    },
    {
      id: 'solid3',
      name: 'Dark Slate',
      color: '#0f172a',
      preview: '#0f172a',
    },
    {
      id: 'solid4',
      name: 'Charcoal',
      color: '#1e293b',
      preview: '#1e293b',
    },
    {
      id: 'solid5',
      name: 'Deep Black',
      color: '#0a0e27',
      preview: '#0a0e27',
    },
  ],
  // Gradient colors
  gradient: [
    {
      id: 'gradient1',
      name: 'Slate Gradient',
      gradient:
        'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      preview: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    },
    {
      id: 'gradient2',
      name: 'Ocean Gradient',
      gradient:
        'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      preview: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    },
    {
      id: 'gradient3',
      name: 'Classic Gradient',
      gradient:
        'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      preview: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
    },
    {
      id: 'gradient4',
      name: 'Purple Gradient',
      gradient:
        'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e293b 100%)',
      preview: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e293b 100%)',
    },
  ],
  // Animated gradient
  animated: {
    id: 'animated',
    name: 'Animated Gradient',
    preview: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
  },
  // Default
  default: {
    id: 'default',
    name: 'Default',
    preview: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
  },
};

// Get background style classes for Tailwind
export const getBackgroundClasses = (colorId) => {
  const styles = {
    default:
      "bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_50%,rgba(99,102,241,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_50%,rgba(139,92,246,0.1)_0%,transparent_50%)] before:pointer-events-none",
    solid1: 'bg-[#1a1a2e]',
    solid2: 'bg-[#16213e]',
    solid3: 'bg-[#0f172a]',
    solid4: 'bg-[#1e293b]',
    solid5: 'bg-[#0a0e27]',
    gradient1: 'bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]',
    gradient2: 'bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]',
    gradient3: 'bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e]',
    gradient4: 'bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#1e293b]',
    animated: 'bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e]',
  };
  return styles[colorId] || styles.default;
};

// Get inline styles for animated gradient
export const getAnimatedGradientStyle = () => {
  return {
    // Initial gradient - animation handles the rest
    background:
      'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
  };
};

// Get all color options for the picker
export const getAllColorOptions = () => {
  return [
    ...backgroundColors.solid,
    ...backgroundColors.gradient,
    backgroundColors.animated,
  ];
};
