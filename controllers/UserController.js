import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import UserModel from '../models/User.js';


export const register = async (req, res) => {
  try {

    // валидация данных для регистрации
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    // создание хеша пароля
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // создание документа в mongodb по схеме пользователя UserModel
    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash
    });

    // сохранение созданного документа в БД
    const user = await doc.save();

    // создание JWT токена, хранение 1 день
    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret_key',
      {
        expiresIn: '1d'
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось совершить регистрацию"
    });
  }
}

export const login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: 'Неккоректные данные'
      })
    }

    const user = await UserModel.findOne({ email: req.body.email });

    // проверка на наличие пользователя в БД временная
    // на проде так делать не надо
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден'
      });
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);
    if (!isValidPassword) {
      return res.status(400).json({
        message: 'Неверный логин или пароль'
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret_key',
      {
        expiresIn: '30d'
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось авторизоваться"
    });
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Не удалось получить доступ к данным'
      })
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить доступ"
    });
  }
}