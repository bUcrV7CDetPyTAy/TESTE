export interface Anime {
  id: number;
  title: {
    romaji: string;
    english?: string;
    native: string;
  };
  description?: string;
  coverImage: {
    large: string;
    medium: string;
  };
  bannerImage?: string;
  genres: string[];
  episodes?: number;
  status: 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELLED';
  season?: 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL';
  seasonYear?: number;
  averageScore?: number;
  meanScore?: number;
  popularity?: number;
  studios: {
    nodes: Array<{
      id: number;
      name: string;
    }>;
  };
  streamingEpisodes?: Array<{
    title: string;
    thumbnail: string;
    url: string;
    site: string;
  }>;
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  description?: string;
  thumbnail: string;
  videoUrl: string;
  duration?: number;
}

export interface StreamingSource {
  url: string;
  quality: string;
  type: 'mp4' | 'hls' | 'dash';
  size?: number;
}
