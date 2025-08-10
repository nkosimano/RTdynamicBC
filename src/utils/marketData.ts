// Market data utility for JSE integration
export interface MarketData {
  trend: number; // -1 to 1, representing market direction
  timestamp: number;
  index: string;
}

export const fetchJSEData = async (): Promise<MarketData> => {
  try {
    // In production, this would call a real JSE API
    // For now, we'll simulate realistic market data
    const simulatedTrend = (Math.random() - 0.5) * 2;
    
    return {
      trend: simulatedTrend,
      timestamp: Date.now(),
      index: 'JSE All Share',
    };
  } catch (error) {
    console.error('Failed to fetch JSE data:', error);
    return {
      trend: 0,
      timestamp: Date.now(),
      index: 'JSE All Share',
    };
  }
};

export const getMarketTrendColor = (trend: number): string => {
  if (trend > 0.1) return '#28A745'; // Green for positive
  if (trend < -0.1) return '#DC3545'; // Red for negative
  return '#00A3A1'; // Teal for neutral
};

export const getMarketTrendIcon = (trend: number): string => {
  if (trend > 0.1) return '↗';
  if (trend < -0.1) return '↘';
  return '→';
};