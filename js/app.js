const App = {
  $: {
    button: document.querySelector('[data-id="button"]'),
    dayInput: document.querySelector('[data-id="day-input"]'),
    monthInput: document.querySelector('[data-id="month-input"]'),
    yearInput: document.querySelector('[data-id="year-input"]'),
    yearOutput: document.querySelector('[data-id="year-output"]'),
    monthOutput: document.querySelector('[data-id="month-output"]'),
    dayOutput: document.querySelector('[data-id="day-output"]'),
    errorMessages: document.querySelectorAll('[data-id="error-message"]'),
    inputLabels: document.querySelectorAll('.label-input'),
  },

  init() {
    App.eventHandlers();
  },

  ageCalculator(years, months, days) {
    const currentDate = new Date();
    const birthDate = new Date(years, months, days);

    const timeDifference = currentDate - birthDate;

    const ageDate = new Date(timeDifference);

    const age = Math.abs(ageDate.getFullYear() - 1970);

    // Handling speacial cases

    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const birthMonth = birthDate.getMonth() + 1;
    const birthday = birthDate.getDate();

    let adjustedAge = age;

    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthday)
    ) {
      adjustedAge--;
    }

    return ageDate;
  },

  updateDisplay(day, month, year) {
    App.$.yearOutput.textContent = year;
    App.$.monthOutput.textContent = month;
    App.$.dayOutput.textContent = day;
  },
  eventHandlers() {
    let day;
    let month;
    let year;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    App.$.dayInput.addEventListener('input', (e) => {
      day = e.target.value;
      day.trim();
    });

    App.$.monthInput.addEventListener('input', (e) => {
      month = e.target.value;
      month.trim();
    });

    App.$.yearInput.addEventListener('input', (e) => {
      year = e.target.value;
      year.trim();
    });

    App.$.button.addEventListener('click', () => {
      const age = App.ageCalculator(year, month, day);
      const intDay = parseInt(day);
      const intMonth = parseInt(month);
      const intYear = parseInt(year);
      if (day === undefined || month === undefined || year === undefined) {
        App.$.errorMessages.forEach((errorMessage) => {
          errorMessage.textContent = 'This field is required';
        });
        App.$.inputLabels.forEach((inputLabel) => {
          inputLabel.classList.add('error-state-date-input-label');
        });
      } else if (intDay > 31 || intMonth > 12 || intYear > currentYear) {
        App.$.inputLabels.forEach((inputLabel) => {
          inputLabel.classList.add('error-state-date-input-label');
        });
        App.$.errorMessages.forEach((errorMessage, index) => {
          if (index === 0) {
            errorMessage.textContent = 'Must be a valid day';
          } else if (index === 1) {
            errorMessage.textContent = 'Must be a valid month';
          } else if (index === 2) {
            errorMessage.textContent = 'Must be a valid year';
          }
        });
      } else {
        App.$.errorMessages.forEach((errorMessage) => {
          errorMessage.textContent = '';
        });
        App.$.inputLabels.forEach((inputLabel) => {
          inputLabel.classList.remove('error-state-date-input-label');
        });
        App.updateDisplay(
          age.getDate(),
          age.getMonth() + 1,
          age.getFullYear() - 1970
        );
      }
    });
  },
};

window.addEventListener('load', App.init());
