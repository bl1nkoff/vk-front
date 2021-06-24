let j = {
    title: "Отправляемся на Марс* c командой ВКонтакте",
    id: "testid",
    introduction: "Пилотируемый полёт на Марс  — запланированный полёт человека на Марс с помощью пилотируемого космического корабля. Роскосмос, НАСА и EKA объявили полёт на Марс своей целью в XXI веке, в 2045 или 2050 году.",
    fields: [
        {
            type: "text",
            label: "Имя",
            placeholder: "Иван",
            id: "name",
            button: {text: "Сергей", value: "Сергей"},
            forsure: true,
            help: "И́мя — часть речи, дающая название для человека (в этом случае это будет личное имя), продукта (торговой марки или бренда), идеи или концепции, обычно используемая для того, чтобы отличить его от других, принадлежащих к тому же классу."
        },
        {
            type: "text",
            label: "Фамилия",
            placeholder: "Смирнов",
            id: "lastname",
            forsure: true,
        },
        {
            type: "password",
            label: "Пароль для входа на корабль",
            placeholder: "******",
            id: "password"
        },
        {
            type: "date",
            width: "75%",
            label: "Дата рождения",
            id: "birthday",
            button: {text: "Сегодня", value: "today"},
        },
        {
            type: "select",
            label: "Гажданство",
            id: "citizenship",
            options: {
                null: "Выберите гражданство",
                ru: "Российская Федерация",
                ua: "Украина",
                by: "Беларусь"
            }
        },
        {
            type: "checkbox",
            label: "Я готов лететь на Марс*",
            id: "ready",
            checked: true,
            forsure: true,
        },
        {
            type: "textarea",
            maxlength: 128,
            placeholder: "Миллиардер и филантроп",
            label: "Расскажите немного о себе",
            id: "about"
        },
        {
            type: "checkbox-block",
            arr: {
                pizza: {text: "Пицца", img: "images/pizza.svg"},
                burger: {text: "Бургер", img: "images/burger.svg"},
                taco: {text: "Тако", img: "images/taco.svg"},
                salad: {text: "Салат", img: "images/salad.svg"},  
            },
            forsure: true,
            max: 3,
            label: "Что вам взять покушать?",
            id: "food",
            checked: true,
            forsure: true,
        },
    ],
    submit: {
        url: "test",
        text: "Отправить"
    },
    notes: "*Марс — четвёртая по удалённости от Солнца и седьмая по размеру планета Солнечной системы; масса планеты составляет 10,7 % массы Земли. Названа в честь Марса — древнеримского бога войны, соответствующего древнегреческому Аресу.",
    
}

document.getElementById("for-form").innerHTML = jsonParserToHtml(j)
setHandlers()