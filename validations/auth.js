import { body } from 'express-validator';

export const registerValidator = [
  body('email', 'Некорректный адрес почты').isEmail(),
  body('password', 'Длина пароля должна быть не менее 5 символов').isLength({ min: 5 }),
  body('fullName', 'Укажите имя').isLength({ min: 2 }),
  body('avatarUrl', 'Ошибка загрузки изображения').optional().isURL(),
];