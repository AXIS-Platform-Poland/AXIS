import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Функция регистрации
export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password, fullName } = req.body;

    // 1. Проверяем, есть ли такой email
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Этот Email уже занят' });
    }

    // 2. Шифруем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Создаем пользователя
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
      },
    });

    res.status(201).json({ message: 'Успешная регистрация!', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error });
  }
};// Вход в систему (Login)
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Ищем пользователя по email
    const user = await prisma.user.findUnique({ where: { email } });
    
    // Если пользователя нет — ошибка
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    // 2. Проверяем, совпадает ли пароль
    const isValid = await bcrypt.compare(password, user.password);
    
    // Если пароль не подошел — ошибка
    if (!isValid) {
      return res.status(401).json({ message: "Неверный пароль" });
    }

    // 3. Если всё ок — пускаем
    res.json({ message: "Ура! Вы успешно вошли!", user });

  } catch (error) {
    res.status(500).json({ message: "Ошибка входа" });
  }
};