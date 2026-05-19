import data from './videos.json';

export interface Video {
  id: string;
  title: string;
  description?: string;
}

export const VIDEOS = data as Video[];
