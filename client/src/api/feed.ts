// Здесь позже будут реальные запросы к Supabase

export type FeedPost = {
  id: string;
  author: string;
  company: string;
  location: string;
  text: string;
};

export async function fetchFeedMock(): Promise<FeedPost[]> {
  // временный мок, чтобы не трогать дизайн
  return [
    {
      id: "1",
      author: "Ihor",
      company: "INGVARR",
      location: "Katowice, PL",
      text: "Запуск моста в процессе. Нужны 4 сварщика MIG/MAG (135/136)...",
    },
  ];
}
