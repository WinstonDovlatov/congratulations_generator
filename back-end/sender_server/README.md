# Сервер для отправки сообщений со страниц персонажей

## Как запустить
```
$ conda create --name sendervenv python=3.10 -y
$ conda activate sendervenv
$ pip install -r requirements.txt
$ python sender_server.py
```

Сервер запустится по адресу http://localhost:12333


## Как взаимодействовать

Сервер принимает POST запросы в следующем формате:
* character_id - ID персонажа. Доступные значения:
  * 'liza'
  * 'elf'
  * 'drak'
  * 'ded'
  * 'wolf'
* id_from - VK ID отправителя(кто заказал) поздравления. 
* user_id - VK ID получателя поздравления. 
* text - Текст поздравления

Возвращает статус:
* OK - поздравление успешно отправлено
* Invalid character_id - некорректно указан character_id
* Failed to login - не удалось авторизовать аккаунт персонажа
* Failed to send msg - не удалось отправить сообщение. Возможная причина - закрытые ЛС
