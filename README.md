Node.js & Express.js Project

Цей проект демонструє використання Node.js та Express.js для створення веб-сервера з підтримкою шаблонізаторів PUG та EJS, обробкою статичних файлів, роботою з cookies та авторизацією за допомогою JWT.

## Технічне завдання

### 1. Технології

- Node.js
- Express.js

### 2. Статичні файли

- Налаштування сервера для відображення favicon у всіх HTML-сторінках.
- Додавання `favicon.ico` до папки `public` та налаштування Express для його відправлення.
- Впровадження тегу `<link rel="icon" href="/favicon.ico">` у всі шаблони PUG і EJS.

### 3. Робота з Cookies

- Розробка функціональності для збереження налаштувань користувача через cookies.
- Створення маршруту для збереження улюбленої теми оформлення сайту користувачем.
- Використання `cookie-parser` для створення та читання cookies, що зберігають вибрану тему.

### 4. Інтеграція JWT

- Додавання функціональності авторизації користувачів через JWT.
- Створення маршрутів для реєстрації та входу, які генерують JWT.
- Впровадження мідлвару, який перевіряє JWT для захищених маршрутів.
- Збереження токенів у cookies з налаштуванням `httpOnly`.

## Встановлення та запуск

1. Клонуйте репозиторій:

    ```sh
    git clone <URL-вашого-репозиторію>
    ```

2. Встановіть залежності:

    ```sh
    cd <ім'я-вашої-текущої-папки>
    npm install
    ```

3. Запустіть сервер:

    ```sh
    node server.js
    ```

4. Відкрийте браузер і перейдіть за адресою:

    ```
    http://localhost:3000
    ```

## Файлова структура

```
- public/
  - css/
    - styles.css
  - favicon.ico
- views/
  - pug/
    - index.pug
    - users.pug
    - user.pug
  - ejs/
    - articles.ejs
    - article.ejs
- server.js
```

## Маршрути

### Основні маршрути

- `/` - Головна сторінка.
- `/users` - Список користувачів.
- `/users/:userId` - Деталі користувача.
- `/articles` - Список статей.
- `/articles/:articleId` - Деталі статті.

### Маршрути для авторизації та налаштувань теми

- `/login` - Логін користувача.
- `/register` - Реєстрація користувача.
- `/theme` - Збереження вибраної теми.

## Мідлвари

### Логування

Мідлвар для логування запитів.

```js
function logRequests(req, res, next) {
  console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
  next();
}

app.use(logRequests);
```

### Аутентифікація

Мідлвар для перевірки JWT.

```js
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

function authenticateJWT(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}