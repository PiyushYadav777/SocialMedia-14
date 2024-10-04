import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date | string | number): string {
    if (!value) return '';

    const date = new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000); // 60 seconds * 60 minutes * 24 hours * 365 days

    if (interval > 1) return `${interval} years ago`;

    interval = Math.floor(seconds / 2592000); // 60 seconds * 60 minutes * 24 hours * 30 days

    if (interval > 1) return `${interval} months ago`;

    interval = Math.floor(seconds / 86400); // 60 seconds * 60 minutes * 24 hours

    if (interval > 1) return `${interval} days ago`;

    interval = Math.floor(seconds / 3600); // 60 seconds * 60 minutes

    if (interval > 1) return `${interval} hours ago`;

    interval = Math.floor(seconds / 60); // 60 seconds

    if (interval > 1) return `${interval} minutes ago`;

    return `${Math.floor(seconds)} seconds ago`;
  }

}
