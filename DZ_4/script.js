/*
// Task_1. Написать функцию, преобразующую число в объект.
// Передавая на вход число от 0 до 999, мы должны получить на выходе объект,
// в котором в соответствующих свойствах описаны единицы, десятки и сотни.
// Например для числа 245 мы должны получить следующий объект:
// {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}.
// Если число превышает 999, необходимо выдать соответствующее сообщение
// с помощью console.log и вернуть пустой объект.

function numObj(num) {
    if (isNaN(num)) {
        console.log('Ошибка: параметр не является числом');
    } else if (num > 999 || num < 0) {
        console.log('Ошибка: допустимый диапазон 0-999');
        var obj = {};
        return obj;
    } else {
        var digits = ['единицы', 'десятки', 'сотни'];
        var obj = {};
        var i = 0;
        for (var i = 0; num != 0; i++) {
            obj[digits[i]] = num % 10;
            num = (num - num % 10) / 10;
        }
    }
    return obj;
}
console.log(numObj(245));
console.log(numObj(127));
console.log(numObj(969));

*/
// Task_2. Продолжить работу с интернет-магазином:
// a. В прошлом домашнем задании вы реализовали корзину на базе массивов. 
// Какими объектами можно заменить их элементы?
// b. Реализуйте такие объекты.
// c. Перенести функционал подсчета корзины на объектно-ориентированную базу.

function Item(product, image, price, quantity, discount = 0) {
    this.product = product;
    this.image = `../img/${image}.png`;
    this.price = price;
    this.quantity = quantity;
    this.discount = discount;
    this.finalPrice = function () {
        if (this.discount != 0) {
            return this.price - this.price * this.discount / 100;
        } else {
            return this.price;
        }
    }
    this.showMyChart = function () {
        return `${this.product} (количество: ${this.quantity})`;
    }
}

let shoppingCart = []

shoppingCart.push(
    new Item('product_name_1', 'product_imge_1', 17, 1)
);
shoppingCart.push(
    new Item('product_name_2', 'product_imge_2', 49, 2, 10)
);
shoppingCart.push(
    new Item('product_name_3', 'product_imge_3', 15, 3)
);
shoppingCart.push(
    new Item('product_name_4', 'product_imge_4', 42, 1)
);
shoppingCart.push(
    new Item('product_name_5', 'product_imge_5', 11, 5, 5)
);

console.log(shoppingCart)

function finalChart(shoppingCart) {
    console.log('Ваш заказ: ')
    shoppingCart.forEach(val => {
        console.log(`${val.showMyChart()}.
    Цена со скидкой: ${val.finalPrice()}.
    Стоимость: ${val.quantity * val.finalPrice()}`);
    });
}
finalChart(shoppingCart);


function finalCost(shoppingCart) {
    return shoppingCart.reduce(function (acc, shoppingCart) {
        return acc + (shoppingCart.finalPrice() * shoppingCart.quantity)
    }, 0)
};
console.log(('Конечная стоимость заказа: ' + finalCost(shoppingCart)).toUpperCase());
