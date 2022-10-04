# Express TS Template

Шаблон для создания node сервера с помощью фреймворка [Express js](https://expressjs.com/).

## Перед началом работы

- Установить [Node.js](https://nodejs.org/en/) 16 версии или выше
- Получить доступы на все необходимые БД и сервера
- Ознакомиться с документацией [OpenAPI Specification (Swagger Specification)](https://swagger.io/docs/specification/about/) для автоматической генерации документации API

### После клонирования репозитория

1. В корневой папке репозитория создать файл `.env`
2. Объявить переменные среды по примеру из файла `.env.example`

## Команды для работы с приложением

- `npm run prepare` - иницализировать [husky](https://github.com/typicode/husky)
- `npm run start` - запуск сервера

## Автоматическая документация API

Для получения доступа к документации необходимо перейти по адресу `http://{HOST}:{PORT}/api-docs`

Документация генерируется с помощью библиотеки [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc).

Для добавления запроса в документацию нужно написать многострочный комментарии, который начинается с `@swagger` или `@openapi`

Новая строка комментария должна начинаться с звездочки `*`

Все комментарии для добавления запроса в документацию необходимо писать по пути `/src/routes/**/*.ts`

При добавлении комментария нужно использовать вложенность по синтаксису [YAML](https://www.tutorialspoint.com/yaml/yaml_indentation_and_separation.htm). Хорошей практикой будет считаться использование **2** пробелов вместо табов.

### Пример валидного комментария для добавления запроса в документацию:

```
/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - users
 *     summary: Get all users
 *     description: Returns list of user code and use name
 *     responses:
 *       '200':
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: successfully handled
 *                 package:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       '5XX':
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DefaultError'
 */
```
