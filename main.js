const vkAPI = require("easyvk"); // Библиотека для работы с VK API

const cfName = "Конференция"; // Строка, которая отвечает за название беседы, которое будет выставляться
const accessToken = ""; // Строка, которая содержит ваш access_token для VK API. Он нужен с правами на messages, offline
const chatId = ""; // ID чата, где требуется контроль названия


vkAPI({
    access_token: accessToken,
}).then(async(vk) => {
	
	setInterval(function() { // Работаем фоном
	    vk.call("messages.getChat", { // Проверяем текущее название беседы
	        chat_id: chatId,
	    }).then(({ vkr: response }) => {
	        const result = response["title"];

	        if(result != cfName) { // Если текущее название беседы не такое, как нам нужно
	            vk.call("messages.editChat", { // Меняем
	                chat_id: chatId,
	                title: cfName,
	            })
	        }
	    }).catch((error) => {
	        console.log(error); // Выводим различные ошибки
	    });
	    
    }, 5000); // Самое оптимальное время для проверки названия

}).catch((error) => {
    console.log(error); // И тут тоже
});

// Можно было сделать и с использование Long Poll, но мне похуй
