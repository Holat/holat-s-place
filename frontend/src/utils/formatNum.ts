export function formatNumber(value?: number) {
    if (!value) return 0;
    if (value >= 1e6) {
      return (value / 1e6).toFixed(1) + 'M';  // Format as millions
    } else if (value >= 1e3) {
      return (value / 1e3).toFixed(1) + 'K';  // Format as thousands
    } else {
      return value;  // Return the number itself if less than a thousand
    }
  }