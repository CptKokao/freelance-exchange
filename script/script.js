document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const customer= document.querySelector('#customer');
    const freelancer = document.querySelector('#freelancer');
    const blockCustomer = document.querySelector('#block-customer');
    const blockFreelancer = document.querySelector('#block-freelancer');
    const blockChoice = document.querySelector('#block-choice');
    const btnExit = document.querySelector('#btn-exit');

    customer.addEventListener('click', () => {
        blockCustomer.style.display = 'block';
        blockChoice.style.display = 'none';
        btnExit.style.display = 'block';
    });

    freelancer.addEventListener('click', () => {
        blockFreelancer.style.display = 'block';
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

    const formCustomer= document.querySelector('#form-customer');
    const orders = [];

    formCustomer.addEventListener('submit', (e) => {
        e.preventDefault();
        const obj = {};

        [...formCustomer.elements].filter(function (el) {
            if ((el.tagName === 'INPUT' && el.type !== 'radio') || (el.checked) || (el.tagName === 'TEXTAREA')) {
               return obj[el.name] = el.value;
            }
        })

        orders.push(obj);
        formCustomer.reset();
        console.log(orders) 
    });
});