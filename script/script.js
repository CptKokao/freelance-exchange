document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const customer= document.querySelector('#customer');
    const freelancer = document.querySelector('#freelancer');
    const blockCustomer = document.querySelector('#block-customer');
    const blockFreelancer = document.querySelector('#block-freelancer');
    const blockChoice = document.querySelector('#block-choice');
    const btnExit = document.querySelector('#btn-exit');
    const formCustomer= document.querySelector('#form-customer');
    const orders = JSON.parse(localStorage.getItem('localOrders')) || [];
    const tableOrder = document.querySelector('#orders');
    let modal = document.querySelector('.modal');
    const modalRead = document.querySelector('#order_read');
    const moadlActive= document.querySelector('#order_active');

    // добавляет заказы в таблицу
    let renderOrder = () => {
        tableOrder.textContent = "";
        orders.forEach((el, index) => {
            tableOrder.innerHTML += `
            <tr class="order ${el.active ? 'new' : ''}" data-number-order=${index}>
                <td>${index + 1}</td>
                <td>${el.title}</td>
                <td class="${el.currency}"></td>
                <td>${deadline(el.deadline)}</td>
            </tr>`
        });
    };

    function deadline(date) {
        const deadDate = new Date(date);
        console.log(deadDate.parse());
        const nowDate = Date.now();
        const last = deadDate - nowDate;
        console.log(last);
    }

    function declOfNum(number, titles) {  
        cases = [2, 0, 1, 1, 1, 2];  
        return titles [(number % 100 > 4 && number % 100 < 20)
            ? 2 : cases[(number % 10 < 5) ? number % 10 : 5] ];  
    }

    const toStorage = () => {
        localStorage.setItem('localOrders', JSON.stringify(orders));
    };

    // форма, добавить все элементы из формы в объект orders
    formCustomer.addEventListener('submit', (e) => {
        e.preventDefault();
        const obj = {};

        // или Array.from(formCustomer.elements)
        [...formCustomer.elements].forEach(function (el) {
            if ((el.tagName === 'INPUT' && el.type !== 'radio') || (el.checked) || (el.tagName === 'TEXTAREA')) {
                obj[el.name] = el.value;
                
            }
        })
        obj.active = false;

        orders.push(obj);
        toStorage();
        formCustomer.reset();
    });
        
    // обработчик для модального окна
    const onClickInModal = (e) => {
        const target = e.target;
        console.log(target)
        const closeBtn = target.closest('.close');
        const getOrder= document.querySelector('.get-order');
        const capitulation = document.querySelector('#capitulation');
        const ready = document.querySelector('#ready');

        const basicAction = () => {
            modal.style.display = 'none';
            toStorage();
            renderOrder();
        }

        // если клик по кнопки закрыть или по overflow то закрыть окно
        if ((closeBtn) || (target === modal))  {
            basicAction();
        }

        // если клик на кнопку ПОЛУЧИТЬ
        if (target === getOrder) {
            orders[modal.numberOrder].active = true;
            basicAction();
        }

        // если клик на кнопку ВЫПОЛНИЛ 
        if (target === ready) {
            orders.splice(modal.numberOrder, 1);
            basicAction();
        }

        // если клик на кнопку ОТМЕНИТЬ 
        if (target === capitulation) {
            orders[modal.numberOrder].active = false;
            basicAction();
        }
    }  
    
    // открытие модального окна
    let openModal = (numberOrder) => {
        
        // выбираем из [] нужный объект по номеру массива, который мы передаем через numberOrder
        const currentOrder = orders[numberOrder];

        // добавляем все значения из объекта в переменные
        let {title, firstName, email, phone, description, amount, currency, deadline, active} = currentOrder;

        // выбираем какое модальное окно показать
        modal = active ? moadlActive : modalRead;
        console.log(modal)
        // получаем элементы модального окна
        const firstNameBlock= modal.querySelector('.firstName'); 
        const titleBlock= modal.querySelector('.modal-title'); 
        const emailBlock= modal.querySelector('.email'); 
        const descriptionBlock= modal.querySelector('.description'); 
        const deadlineBlock= modal.querySelector('.deadline'); 
        const currencyBlock= modal.querySelector('.currency_img'); 
        const countBlock= modal.querySelector('.count'); 
        const phoneBlock= modal.querySelector('.phone'); 


        // добавляем значения в верстку
        titleBlock.textContent = title;
        firstNameBlock.textContent = firstName;
        emailBlock.innerText = email;
        emailBlock.href = 'mailto:' + email;
        descriptionBlock.textContent = description;
        deadlineBlock.textContent = deadline;
        currencyBlock.classList.add(currency);
        countBlock.textContent = amount;
        // добавляем id
        modal.numberOrder = numberOrder; 
        if (modal === modalRead) {
            phoneBlock.innerText = phone;
            phoneBlock.href = 'tel:' + phone;
        }

        // открываем модальное окно
        modal.style.display = 'flex';
        modal.addEventListener('click', onClickInModal)
    };

    // определяем target на всей таблице
    tableOrder.addEventListener('click', (e) => {
        const target = e.target;
        const targetOrder = target.closest('.order');
        openModal(targetOrder.dataset.numberOrder);
    });  

    customer.addEventListener('click', () => {
        blockCustomer.style.display = 'block';
        blockChoice.style.display = 'none';
        btnExit.style.display = 'block';
    });

    freelancer.addEventListener('click', () => {
        blockFreelancer.style.display = 'block';
        renderOrder(orders);
        blockChoice.style.display = 'none';
        btnExit.style.display = 'block';
    });

    btnExit.addEventListener('click', () => {
        blockFreelancer.style.display = 'none';
        blockCustomer.style.display = 'none';
        blockChoice.style.display = 'block';
        btnExit.style.display = 'none';
    })
});