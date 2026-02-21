// src/api/feed.ts
// Здесь позже будут реальные запросы к Supabase.
// Сейчас это мок-данные, чтобы не трогать дизайн.

export type FeedPost = {
  id: string;
  author: string;
  company: string;
  location: string;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  comments: number;
  watchers: number;
};

export async function fetchFeedMock(): Promise<FeedPost[]> {
  // имитируем запрос к серверу
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      author: "Ihor",
      company: "INGVARR",
      location: "Katowice, PL",
      title: "Запуск моста · Аванбек",
      description:
        "Запуск моста в процессе. Нужны 4 сварщика MIG/MAG (135/136) на ночную смену, окно 72 часа.",
      tags: ["MIG/MAG 135/136", "NDT · EN ISO 5817"],
      likes: 32,
      comments: 9,
      watchers: 3,
    },
  ];
}
