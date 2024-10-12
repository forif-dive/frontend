const BASE = 1000;
function formatDistance(distance: number): string {
  if (distance >= BASE) {
    return `${(distance / 1000).toFixed(1)}km`;
  }
  return `${distance}m`;
}

export { formatDistance };
