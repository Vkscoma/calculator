// Calculator Variables
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = document.querySelector('#screen');

const calculate = (num1, operator, num2) => {
    let result = '';

    if (operator === 'add') {
        result = parseFloat(num1) + parseFloat(num2);
    } else if (operator === 'subtract') {
        result = parseFloat(num1) - parseFloat(num2);
    } else if (operator === 'multiply') {
        result = parseFloat(num1) * parseFloat(num2);
    } else if (operator === 'divide') {
        result = parseFloat(num1) / parseFloat(num2);
    }

    return result;
}


keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-selected'))

        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
        }

        if (action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
                display.textContent = calculate(firstValue, operator, secondValue)
            }

            key.classList.add('is-selected');
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
        }

        if (action === 'decimal' && !displayedNum.includes('.')) {
            display.textContent = displayedNum + '.';
        }

        if (action === 'clear') {
            display.textContent = '0';
            calculator.dataset.previousKeyType = 'clear';
            calculator.dataset.firstValue = '';
            calculator.dataset.operator = '';
        }

        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            display.textContent = calculate(firstValue, operator, secondValue);
        }
        if (action === 'backspace' && displayedNum.length > 1) {
            display.textContent = displayedNum.slice(0, -1);
        }
    }
});