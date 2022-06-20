
// Task_1. Продолжаем реализовывать модуль корзины:
// a. Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы;
// b. Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида.


// создаем объект каталога
function Item(product, image, description, price, discount = 0) {
    this.product = product;
    this.image = `img/${image}.png`;
    this.description = description;
    this.price = price;
    this.discount = discount
}

let catalodList = []

catalodList.push(new Item('Eiffel tower in the past', 'Image1', 'Make a BIG impression', 33, 5));
catalodList.push(new Item('Eiffel tower in winter', 'Image2', 'Has a removable, fabric robe', 10));
catalodList.push(new Item('Eiffel tower in autumn', 'Image3', 'Individual sets of building', 22, 10));
catalodList.push(new Item('Eiffel tower in the clouds', 'Image4', 'Components are dropped', 45, 5));
catalodList.push(new Item('Eiffel tower in cloudy weather', 'Image5', 'Models carry brick-built', 100));
catalodList.push(new Item('Eiffel tower in pink', 'Image6', 'The perfect building toys for kids', 110, 5));

// создаем отображение каталога
function drowItems() {
    catalodList.forEach(function (item, i) {
        drowItem(item, i);
    })
}

const $catalog = document.querySelector('#catalog');
function drowItem(item, id) {
    $catalog.insertAdjacentHTML('beforeend',
        `<div id="item-${id}" class="prod_item">
        <div class="item">
            <div class="image"><img src="${item.image}"></div>
            <div class="description"><h4>${item.product}</h4>${item.description}
                <div class="price">Цена: 
                    <span>${item.price}</span> руб.
                </div>
            </div>
        </div>
        <div class="sale">
            <span class='offer ${item.discount > 0 ? 'show' : ''}'>Скидка: ${item.discount}%</span>
            <div data-id="${id}" class="button">В корзину</div>
        </div>
    </div>`);
}
drowItems(catalodList);


// создаю объект корзины
let shoppingCart = [];

// shoppingCart.push(new basketItem('product_name_1', 10, 10));
// shoppingCart.push(new basketItem('product_name_2', 5));
// shoppingCart.push(new basketItem('product_name_3', 15));

let emptyBasket = 'Ваша корзина пуста.';

function basketItem(product, price, discount = 0) {
    this.product = product;
    this.price = price;
    this.discount = discount;
    this.finalPrice = function () {
        if (this.discount != 0) {
            return this.price - this.price * this.discount / 100;
        } else {
            return this.price;
        }
    }
}

// получаю итоговую сумму
function totalSumm(shoppingCart) {
    return shoppingCart.reduce(function (acc, price) {
        return acc + price.finalPrice();
    }, 0);
}

// правильные окончания
function correctEnding() {
    let corEnd = '';
    if (shoppingCart.length == 1) {
        corEnd = '';
    } else if (shoppingCart.length > 1 && shoppingCart.length <= 4) {
        corEnd = 'а';
    } else {
        corEnd = 'ов';
    }
    return corEnd;
}

// создаю отображение корзины
function drowTotal(shoppingCart) {
    const $basket = document.querySelector('#basket');
    $basket.textContent = '';

    if (shoppingCart == 0) {
        $basket.insertAdjacentHTML('beforeend', `<div class="total">${emptyBasket}</div>`);
    } else {
        $basket.insertAdjacentHTML('beforeend',
            `<div class="total">
            <p>В корзине: ${shoppingCart.length} 
            товар${correctEnding()} на сумму ${totalSumm(shoppingCart)} рублей.</p>
            <a class="buy" href="#">Купить</a>
        </div>`);
    }
}
drowTotal(shoppingCart);

// событие - добавление объекта в корзину
$catalog.addEventListener('click', function (e) {
    if (e.target.className === 'button') {
        const id = Number(e.target.getAttribute('data-id'));
        const choice = catalodList[id];
        shoppingCart.push(new basketItem(choice.product, choice.price, choice.discount));

        drowTotal(shoppingCart);
    }
});

// работаю с #popup
const $popup = document.querySelector('#popup');

$popup.addEventListener('click', function (e) {
    $popup.style.display = 'none';
});

$catalog.addEventListener('click', function (e) {
    if (e.target.tagName === 'IMG') {
        $popup.textContent = '';
        $popup.style.display = 'flex';
        $popup.insertAdjacentHTML('beforeend',
            `<img src="${e.target.getAttribute('src')}" class="scale">`);
    }
});