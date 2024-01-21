# Сервер для работы с GigaChat

## Как запустить
```
$ conda create --name gigavenv python=3.10 -y
$ conda activate gigavenv
$ pip install -r requirements.txt
$ cd giga_server
$ python giga_server.py
```

Сервер запустится по адресу http://localhost:12345


## Как взаимодействовать

Сервер принимает POST запросы в следующем формате:
* character_id - ID персонажа. Доступные значения:
  * 'liza'
  * 'elf'
  * 'drak'
  * 'ded'
  * 'wolf'
* name - строка, содержащая имя получателя
* holiday_id - ID праздника. Доступные значения:
  * 'BD' - День Рождения
  * 'NY' - Новый Год
* hobby - список хобби. Пример: ['спорт', 'рыбалка']
* sex - пол. Доступные значения:
  * 'M' - мужчина
  * 'F' - женщинаgit 
  
Возвращает сгенерированное поздравление