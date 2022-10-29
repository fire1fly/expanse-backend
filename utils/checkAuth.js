import jwt from 'jsonwebtoken'

// middleware функция для парсинга и расшифровки jwt токена
// next - функция, контролирующая дальнейшее выполнение запроса
// если в miidleware её вызова не было, то даже при наличии сформированного ответа, он не будет отправлен клиенту
export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret_key');

      req.userId = decoded._id;

      next();
    } catch (error) {
      return res.status(403).json({
        message: 'Нет доступа'
      })
    }
  } else {
    return res.status(403).json({
      message: 'Не удалось проверить подлинность'
    })
  }
}