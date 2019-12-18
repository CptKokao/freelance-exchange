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
    let addOrder = () => {
        tableOrder.textContent = "";
        orders.forEach((el, index) => {
            tableOrder.innerHTML += `
            <tr class="order" data-number-order=${index}>
                <td>${index + 1}</td>
                <td>${el.title}</td>
                <td class="${el.currency}"></td>
                <td>${el.deadline}</td>
            </tr>`
        });
    };

    let openModal = (numberOrder) => {
        const current = orders[numberOrder];
        !current ? moadlActive.style.display = 'block' : modalRead.style.display = 'block';

        const firstNameBlock= document.querySelector('.firstName'); 
        const titleBlock= document.querySelector('.modal-title'); 
        const emailBlock= document.querySelector('.email'); 
        const descriptionBlock= document.querySelector('.description'); 
        const dedlineBlock= document.querySelector('.dedline'); 
        const currencyBlock= document.querySelector('.currency_img'); 
        const countBlock= document.querySelector('.count'); 
        const phoneBlock= document.querySelector('.phone'); 
    }

    // определяем target на всей таблице
    tableOrder.addEventListener('click', (e) => {
        const targetOrder = e.target.closest('.order');
        openModal(targetOrder.dataset.numberOrder);
    })

    customer.addEventListener('click', () => {
        blockCustomer.style.display = 'block';
        blockChoice.style.display = 'none';
        btnExit.style.display = 'block';
    });

    freelancer.addEventListener('click', () => {
        blockFreelancer.style.display = 'block';
        addOrder();
        blockChoice.style.display = 'none';
        btnExit.style.display = 'block';
    });

    btnExit.addEventListener('click', () => {
        blockFreelancer.style.display = 'none';
        blockCustomer.style.display = 'none';
        blockChoice.style.display = 'block';
        btnExit.style.display = 'none';
    })

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

        orders.push(obj);
        formCustomer.reset();
        console.log(orders) 
    });
});