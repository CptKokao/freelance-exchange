document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const customer= document.querySelector('#customer');
    const freelancer = document.querySelector('#freelancer');
    const blockCustomer = document.querySelector('#block-customer');
    const blockFreelancer = document.querySelector('#block-freelancer');
    const blockChoice = document.querySelector('#block-choice');
    const btnExit = document.querySelector('#btn-exit');
    const formCustomer= document.querySelector('#form-customer');
    const orders = [];
    const tableOrder = document.querySelector('#orders');
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
                <td>${el.deadline}</td>
            </tr>`
        });
    };

    // форма
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
        formCustomer.reset();
        // console.log(orders) 
    });
        
    const getOrder= document.querySelector('.get-order');
    const modal = document.querySelector('.modal');

    // открытие модального окна
    let openModal = (numberOrder) => {

        // выбираем из [] нужный объект по номеру массива, который мы передаем через numberOrder
        const currentOrder = orders[numberOrder];

        // добавляем все значения из объекта в переменные
        let {title, firstName, email, phone, description, amount, currency, deadline, active} = currentOrder;

        // выбираем какое модальное окно показать
        const modal = active ? moadlActive : modalRead;
        console.log(modal);
        console.log(orders);

        // получаем элементы модального окна
        const firstNameBlock= modal.querySelector('.firstName'); 
        const titleBlock= modal.querySelector('.modal-title'); 
        const emailBlock= modal.querySelector('.email'); 
        const descriptionBlock= modal.querySelector('.description'); 
        const deadlineBlock= modal.querySelector('.deadline'); 
        const currencyBlock= modal.querySelector('.currency_img'); 
        const countBlock= modal.querySelector('.count'); 
        const phoneBlock= modal.querySelector('.phone'); 
        const capitulation= modal.querySelector('#capitulation'); 

        // добавляем значения в верстку
        titleBlock.textContent = title;
        firstNameBlock.textContent = firstName;
        emailBlock.innerText = email;
        descriptionBlock.textContent = description;
        deadlineBlock.textContent = deadline;
        currencyBlock.classList.add(currency);
        countBlock.textContent = amount;
        if (modal === modalRead) {
            phoneBlock.innerText = phone;
        }

        // открываем модальное окно
        modal.style.display = 'block';

        if (modal === moadlActive) {
            // обработчик на кнопку getOrder
            capitulation.addEventListener('click', (e) => {
                modal.style.display = "none";
                orders.splice(orders.indexOf(numberOrder), 1);
                renderOrder();
            });
        }

        
        // обработчик на кнопку getOrder
        getOrder.addEventListener('click', (e) => {
            modal.style.display = "none";
            currentOrder.active = true;
            renderOrder();
        });

        // обработчик для закрытия модального окна
        modal.addEventListener('click', (e) => {
            const target = e.target;
            const closeBtn = target.closest('.close');

            // если клик по кнопки закрыть или по overflow то закрыть окно
            if((closeBtn) || (target === modal))  {
                modal.style.display = "none";
            }
        });
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
        renderOrder();
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