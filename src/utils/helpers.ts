import { formatDistanceToNow } from 'date-fns';

export function timeAgo(timestamp: string): string {
  return `Created ${formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
  })}`;
}
