document.addEventListener('DOMContentLoaded', () => {
    // Important variables
    const nameInput = document.getElementById('name');
    const numberInput = document.getElementById('number');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const cvcInput = document.getElementById('cvc');
    const form = document.getElementById('cardForm');

    // Error message elements
    const nameError = document.getElementById('nameError');
    const numberError = document.getElementById('numberError');
    const expError = document.getElementById('expError');
    const cvcError = document.getElementById('cvcError');

    // Render
    const nameRender = document.getElementById('nameRender');
    const dateRender = document.getElementById('dateRender');
    const cardNumber = document.getElementById('cardNumber');
    const cvcRender = document.getElementById('cvcRender');

    // Validation functions
    function validateName() {
        const value = nameInput.value.trim();
        if (value === "") {
            nameError.style.display = "block";
        } else {
            nameError.style.display = "none";
        }
    }

    function validateNumber() {
        const value = numberInput.value.trim().replace(/\s+/g, ''); // remove multiple spaces
        let isValid = true;

        for (let i = 0; i < value.length; i++) {
            if (isNaN(value[i])) {
                isValid = false;
                break;
            }
        }

        if (isValid && value !== "") {
            numberError.style.display = "none";
        } else {
            numberError.style.display = "block";
        }
    }

    function validateExpDate() {
        if (monthInput.value.trim() === "" || yearInput.value.trim() === "") {
            expError.style.display = "block";
        } else {
            expError.style.display = "none";
        }
    }

    function validateCVC() {
        const value = cvcInput.value.trim();
        if (value === "" || isNaN(value)) {
            cvcError.style.display = "block";
        } else {
            cvcError.style.display = "none";
        }
    }

    // Add event listeners to input fields
    nameInput.addEventListener('input', () => {
        nameRender.textContent = nameInput.value.trim();
        validateName();
    });

    numberInput.addEventListener('input', () => {
        const value = numberInput.value.trim().replace(/\s+/g, ''); // remove multiple spaces
        cardNumber.textContent = value.replace(/(.{4})/g, '$1 '); // add spaces every 4 characters
        validateNumber();
    });

    monthInput.addEventListener('input', () => {
        dateRender.textContent = `${monthInput.value.trim()} / ${yearInput.value.trim()}`;
        validateExpDate();
    });

    yearInput.addEventListener('input', () => {
        dateRender.textContent = `${monthInput.value.trim()} / ${yearInput.value.trim()}`;
        validateExpDate();
    });

    cvcInput.addEventListener('input', () => {
        cvcRender.textContent = `${cvcInput.value.trim().slice(-3)}`; // show only last 3 digits
        validateCVC();
    });
    

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        validateName(); 
        validateNumber();
        validateExpDate();
        validateCVC(); 
    
        if (nameError.style.display === "none" &&
            numberError.style.display === "none" &&
            expError.style.display === "none" &&
            cvcError.style.display === "none") {
            // Form is valid, display success message
            const successBox = document.querySelector('.successBox');
            const rightSide = document.getElementById('rightSide');
            successBox.style.display = "block";
            rightSide.style.display = "none";
    
            const button = document.getElementById('continue');
            button.addEventListener('click', (e) => {
                form.submit();
            })
        } else {
            // Form is invalid, don't display success message
            console.log("Form has errors.");
        }
    });
});