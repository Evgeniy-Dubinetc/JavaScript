// Task_1. Продумать, где можно применить замыкания для практикума из седьмого урока.
// При добавлении и удалении объектов из корзины

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

// отрисовка витрины
const $catalog = document.querySelector('#catalog');

function drowItems() {
    catalodList.forEach(function (item, id) {
        let imagesHtml = item.image.map(function (src) {
            return `<img class="small_img" src="${src}"></img>`;
        }).join('');

        let html = `<div id="item-${id}" class="prod_item">
                 <div class="item">
                     <div class="image">${imagesHtml}</div>
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
             </div>`
        $catalog.insertAdjacentHTML('beforeend', html);
    })
}
drowItems()


// создаем объект корзины 
let shoppingCart = [];
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

// получаем итоговую сумму
function totalSumm(shoppingCart) {
    return shoppingCart.reduce(function (acc, price) {
        return acc + price.finalPrice();
    }, 0);
}

// создаем отображение корзины

let $userAddr;
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
        </div>
        <div id="buy_hidden">
            <p class="buy" id="buy">Купить</p>
        </div>
        <div id="confirmHtml" class="confirmHtml">
            <p class="buy" id="confirm">Подтвердить</p>
        </div>
        <div id="messageHtml" class="confirmHtml">
            <p class="buy" id="message">Завершить</p>
        </div>
        `);

        const $buy_hidden = document.getElementById('buy_hidden');
        const $confirmHtml = document.getElementById('confirmHtml');
        const $messageHtml = document.getElementById('messageHtml');

        function showChart(id = 0) {
            for (const iterator of shoppingCart) {
                let chartHtml = `<div id="${id}" class="buy_hidden__item">${iterator.product} за ${iterator.finalPrice()} руб.`;
                $buy_hidden.insertAdjacentHTML('afterbegin', `${chartHtml}
                <span data-id="${id}" class="buy_hidden__delete"> (удалить)</span></div>`);
                id++;
            }
        }
        showChart();

        const $buy = document.getElementById('buy');
        const $confirm = document.getElementById('confirm');
        const $message = document.getElementById('message');

        $buy.addEventListener('click', function () {
            $buy_hidden.style.display = 'none';
            $confirmHtml.style.display = 'flex';
            confirmDrow();
        });
        $confirm.addEventListener('click', function () {
            $confirmHtml.style.display = 'none';
            $messageHtml.style.display = 'flex';
            messageDrow();
            let inputAddr = document.getElementById('addr');
            $userAddr = inputAddr.value;
        });
        $message.addEventListener('click', function () {
            $messageHtml.style.display = 'none';
            shoppingCart = 0;
            drowTotal(shoppingCart);
            createConfirmWindow();
        });

        function confirmDrow() {
            let confirmHtml =
                `<p class="buy_hidden__item">Адрес доставки:</p>
            <div id="yandexmap"></div>
            <input id="addr" type="text" class="buy_hidden__confirm" placeholder="Не пустышка, дальше используется">`;
            $confirmHtml.insertAdjacentHTML('afterbegin', confirmHtml);

            // отрисовка яндексКарт
            var map;
            function initMap() {
                map = new ymaps.Map("yandexmap", {
                    center: [60.000915, 30.324680],
                    zoom: 16
                });
            }
            ymaps.ready(initMap);
        }
        function messageDrow() {
            let messageHtml =
                `<p class="buy_hidden__item">Комментарий к заказу:</p>
                <form class="form" action="#">
                    <form action="#">
                        <input id="text" class="buy_hidden__confirm" type="text" placeholder="Ваше имя"><br>
                        <input id="email" class="buy_hidden__confirm" type="email" placeholder="Ваш email"><br>
                        <textarea id="message" class="buy_hidden__confirm" cols="30" rows="5" placeholder="Ваш комментарий"></textarea><br>
                    </form>
                </form>`;
            $messageHtml.insertAdjacentHTML('afterbegin', messageHtml);
        }
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


// событие - удаление объекта из корзины
const $basket = document.getElementById('basket');
$basket.addEventListener('click', function (e) {
    if (e.target.className === 'buy_hidden__delete') {
        const this_id = Number(e.target.getAttribute('data-id'));
        shoppingCart.splice(this_id, 1)
        drowTotal(shoppingCart);
    }
})


// работаем с #popup
const $popup = document.querySelector('#popup');

$popup.addEventListener('click', function (e) {
    $popup.style.display = 'none';
});

$catalog.addEventListener('click', function (e) {
    if (e.target.tagName === 'IMG') {
        $popup.textContent = '';
        $popup.style.display = 'flex';

        imgArr = e.target.parentNode;
        let imgCnt = 0;
        $popup.insertAdjacentHTML('beforeend',
            `<img src="${imgArr.children[imgCnt].getAttribute('src')}" class="scale">`);


        document.addEventListener('keydown', logKey);
        function logKey(e) {
            // if (e.keyCode == 'ArrowRight') {
            //     imgCnt++;
            //     console.log(imgCnt);
            // } else if (e.keyCode == 'ArrowLeft') {
            //     imgCnt--;
            //     console.log(imgCnt);
            // }

            switch (e.code) {
                case 'ArrowRight':
                    imgCnt++;
                    console.log(imgCnt);
                    break;
                case 'ArrowLeft':
                    imgCnt--;
                    console.log(imgCnt);
                    break;
            };
        };
    };
});

// создаем модальное окно для подверждения заказа

const $wrapper = document.getElementById('wrapper');

function createConfirmWindow() {
    let $orderDiv = document.createElement('div');
    let date = new Date().toLocaleDateString();

    $orderDiv.className = 'orderDiv';
    $orderDiv.insertAdjacentHTML('beforeend', `
    <h2>Ваш заказ от ${date}<br>на сумму ${totalSumm(shoppingCart)} руб. передан в обработку.</h2>
    <h4>Адрес доставки: ${$userAddr}</h4>
    <button id="close">Закрыть</button>`);
    $wrapper.append($orderDiv);

    $orderDiv.addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') {
            $orderDiv.style.display = 'none';
        }
    });
}

// Task_2. Не выполняя код, ответить, что выведет браузер и почему:

//  1. Оператор if проверяет условие, что в глобальной области window нет "a".
//  Переменная "а" объявлена в локальной области конструкции if, следовательно alert |==> undefind

if (!("a" in window)) {
    var a = 1;
}
alert(a);

// 2. Ошибка, переменная "а" не объявлена в глобальной области видимости, следовательно alert |==> undefind

var b = function a(x) {
    x && a(--x);
};
alert(a);

//  3.  При объявлении функции в области видимости происходит объявление переменной "а" со значением функции.
//  При создании переменной "а" мы не присваиваем ей значение, alert |==> function a(x){return x * 2;}
//  Если перемменной "а" мы присвоим значение, то присвоение будет иметь приоритет.

function a(x) {
    return x * 2;
}
var a;
alert(a);

//  4. Аргументы функции - тот же массив, второму элементу в теле функции присвоили значение 10, 
//  его и выкинул alert |==> 10.

function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2, 3);

//  5. Метод call в качестве агрумента получил null, вызываемая функция ссылается на глобальный объект 
//  window.a, в котором null |==> вывод [obgect Window]

function a() {
    alert(this);
}
a.call(null);