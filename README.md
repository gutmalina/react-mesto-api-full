# Проект: "Место" на React (frontend & backend) на Яндекс.Облаке.

Проект `Mesto`, выполнен в рамках 39 потока курса по Веб-разработке от Яндекс.Практикума. 
Включает фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции по добавлению, редактированию и удалению данных пользователя и\или карточек.

Публичный IPv4 сервера [http://51.250.77.214](http://51.250.77.214) 
Ссылка на проект [http://gutmalina.mesto.front.nomoredomains.sbs](hhtp://gutmalina.mesto.front.nomoredomains.sbs)
Ссылка на Backend проекта: [http://gutmalina.mesto.backend.nomoredomains.sbs](http://gutmalina.mesto.backend.nomoredomains.sbs)

### Функционал приложения:
* Регистрация пользователя по email и паролю, без подтверждения email
* При регистрации по умолчанию присваиваются поля: 
    имя - Жак-Ив Кусто, 
    о себе - Исследователь океана, 
    аватар
* Авторизация пользователя по email и паролю
* Редактирование профиля пользователя: имя, о себе, аватар
* Добавление карточки - наименование места и ссылки на фотографию
* Удаление карточки
* Просмотр карточки в увеличенном формате
* Постановка или удаление лайка с карточки

### UX-функции:
* Адаптивный web-дизайн сайта
* Затемнение, уменьшение прозрачности активных кнопок и элементов
* Использование плавно всплывающих попапов для:
    редактирования данных пользователя, 
    добавления, увеличение или удаления карточки
* Валидация введенных значений в поля форм с активацией кнопок для сохранения/отправки
* Последующая отправка новых данных на сервер
* Отображение на кнопках попапов индикатора загрузки запросов
* Закрытие попапов по кнопке Esc, кликом мышки за пределами попапа, с очисткой полей

### Стэк:
* NODE.js
* REACT.js
* MONGODB
* EXPRESS.js
* NESTED БЭМ
