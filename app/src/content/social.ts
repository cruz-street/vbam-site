import data from './social.json';

export interface SocialPost {
  platform: 'instagram' | 'facebook';
  id: string;
  caption: string;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
}

export const SOCIAL_POSTS = data as SocialPost[];
