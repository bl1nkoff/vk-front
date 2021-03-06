# Тестовое задание для стажёра в команду фронтенд-инфраструктуры от Блинкова Сергея
Преобразователь JSON с описанием контента формы в готовую вёрстку.

## Подключение
```html
    <link rel="stylesheet" href="jsonParserToHtml.css">
    <script src="jsonParserToHtml.js"></script>
```

## Использование
```js script
    json = {...}
    document.getElementById("for-form").innerHTML = jsonParserToHtml(json) //jsonParserToHtml(json, theme="")
    setHandlersForForm()
```
## Имена пременных занятые библеотекой
```js script
jsonParserToHtml
formHandler
handlersForForm
ourInputsForForm
clearForm
setValueForForm
formHandler
```

## Формирование JSON
### Первый уровень
* title - Название - крупный первый текст
* id - id блока
* introduction - введение - текст между названием и полями
* fields - массив полей
* notes - заметки - текст после формы
* submit.text - текст главной кнопки
* submit.url - url API (при значении "test" готовая форма просто выводится в консоль)

### Поля
* id - id поля (обязательно)
* label - небольшой текст под полем
* type - тип (подробнее дальше)
* button - создание рядом с полем кнопки для назначения ему значения
* button.text - Текст кнопки
* button.value - Значение для вставки ("today" преобразует дату для поля type="date")
* forsure - У небольшого текста снизу появляется дополнительная надпись "(Обязательно)"
* help - добавляется справа от поля знак вопроса, при наведении отображается заданный текст
* width - значения CSS, преобразуется в атрибут style="width:..."
* placeholder - текст внутри поля(подсказка)

### Типы полей
Стандартные типы полей HTML(text, password, date, number, checkbox), включая select, textarea, а так же checkbox-block (о нём подробнее далее)

#### select
* option - key: value тип. Ключом записывается значение, которое должно быть отправлено, значением записываем отображаемый текст

#### checkbox
* checked - можно задать значение

#### textarea
* maxlength - максимальное количество символов

#### checkbox-block
Набор чекбоксов, если нужно составить список и зафиксировать отмеченное 
* max - максимальное число выбранных пунктов
* arr - key: value список. Ключ - значение, значение - key: value тип
```json
arr: {
    "пример": {"text": "Отображаемый текст", "img": "путь к картинке/лого" },
    "pizza": {"text": "Пицца", "img": "images/pizza.svg"},
    "burger": {"text": "Бургер", "img": "images/burger.svg"},
    "taco": {"text": "Тако", "img": "images/taco.svg"},
    "salad": {"text": "Салат", "img": "images/salad.svg"},  
}
```
Значение объекта списка - {text: "Отображаемый текст", img: "путь к картинке/лого" }

## Что ещё можно добавить
* checkbox-block -> radio-block
* Загрузка файлов
* Поработать с универсальностью submit
* Тёмная тема(не получилось подобрать хорошую цветовую палитру, не занимался дизайном тёмных тем)
* ...
(По большей части всё упирается в фантазию, потому что нет конкретной задачи у формы, и ограничения данного метода - очень нагромождённая конструкция получается)
