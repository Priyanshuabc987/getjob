export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'Hackathon' | 'Workshop' | 'Competition';
  reward?: string;
  location: string;
  deadline: string;
  bannerUrl?: string;
};
