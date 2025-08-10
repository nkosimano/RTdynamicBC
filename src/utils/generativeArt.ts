// src/utils/generativeArt.ts
function generateArtDecoNode(x: number, y: number): string {
  return `<path d="M ${x} ${y} l 10 20 l -20 0 Z" fill="rgba(0, 163, 161, 0.3)" />`;
}

function generateBrutalistNode(x: number, y: number): string {
  return `<rect x="${x - 10}" y="${y - 10}" width="20" height="20" fill="rgba(0, 163, 161, 0.2)" transform="rotate(45, ${x}, ${y})" />`;
}

export function generateBlueprint(theme: string = 'default'): string {
  let svg = '<svg viewBox="0 0 800 1200" class="absolute inset-0 z-0 w-full h-full" preserveAspectRatio="xMidYMid slice">';

  // Draw the grid lines
  const gridSize = 40;
  for (let i = 0; i <= 800; i += gridSize) {
    svg += `<line x1="${i + (Math.random() - 0.5) * 5}" y1="0" x2="${i + (Math.random() - 0.5) * 5}" y2="1200" stroke="rgba(255, 255, 255, 0.05)" stroke-width="${Math.random() * 0.5 + 0.2}" />`;
  }
  for (let i = 0; i <= 1200; i += gridSize) {
    svg += `<line x1="0" y1="${i + (Math.random() - 0.5) * 5}" x2="800" y2="${i + (Math.random() - 0.5) * 5}" stroke="rgba(255, 255, 255, 0.05)" stroke-width="${Math.random() * 0.5 + 0.2}" />`;
  }

  // Define themes for different sections
  const themes: { [key: string]: { nodeRatio: number } } = {
    'services': { nodeRatio: 0.75 },
    'healthCheck': { nodeRatio: 0.25 },
    'default': { nodeRatio: 0.5 }
  };
  const currentTheme = themes[theme] || themes['default'];

  // Draw random nodes on the grid
  const nodeCount = 25;
  for (let i = 0; i < nodeCount; i++) {
    const x = Math.random() * 800;
    const y = Math.random() * 1200;
    if (Math.random() > currentTheme.nodeRatio) {
      svg += generateArtDecoNode(x, y);
    } else {
      svg += generateBrutalistNode(x, y);
    }
  }

  // The growth path and tracker have been removed from this file
  // and are now handled by the AnimatedFinancialLine component.

  svg += '</svg>';
  return svg;
}

export function getUserTheme(): string {
  try {
    const trackingData = JSON.parse(localStorage.getItem('userInterest') || '{}');
    if (Object.keys(trackingData).length === 0) return 'default';
    // Determine the primary interest by finding the key with the highest value
    const primaryInterest = Object.keys(trackingData).reduce((a, b) => trackingData[a] > trackingData[b] ? a : b);
    return primaryInterest;
  } catch {
    return 'default';
  }
}