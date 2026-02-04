import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { register, login } from './controllers/auth.controller';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Авторизация
app.post('/api/register', register);
app.post('/api/login', login);

// === ЗАКАЗЫ С ПРИВАТНОСТЬЮ ===

// 1. Получить заказы (ТОЛЬКО СВОИ)
app.get('/api/orders', async (req: Request, res: Response) => {
  const { userId } = req.query; // Получаем ID из адреса

  if (!userId) return res.json([]);

  try {
    const orders = await prisma.order.findMany({
      where: { ownerId: Number(userId) }, // <-- ФИЛЬТР: Только мои!
      orderBy: { id: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка получения' });
  }
});

// 2. Создать заказ (ПРИКРЕПИТЬ К СЕБЕ)
app.post('/api/orders', async (req: Request, res: Response) => {
  try {
    const { item, price, status, userId } = req.body; 

    const newOrder = await prisma.order.create({
      data: { 
        item, 
        price, 
        status,
        ownerId: Number(userId) // <-- ЗАПИСЫВАЕМ ВЛАДЕЛЬЦА
      },
    });
    res.json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Не удалось создать' });
  }
});

// 3. Удалить заказ
app.delete('/api/orders/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.order.delete({ where: { id: Number(id) } });
  res.json({ message: 'Удалено' });
});

// 4. Обновить статус
app.put('/api/orders/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  await prisma.order.update({ where: { id: Number(id) }, data: { status } });
  res.json({ message: 'Обновлено' });
});

app.listen(PORT, () => {
  console.log(`[server]: Сайт запущен на http://localhost:${PORT}`);
});