let formData = { email: '', message: '' };

const form = document.querySelector('.feedback-form');

const fillFormFields = () => {
  try {
    const formDataFromLS = JSON.parse(
      localStorage.getItem('feedback-form-data')
    );

    if (formDataFromLS === null) {
      return;
    }

    formData = formDataFromLS;

    for (const key in formDataFromLS) {
      form.elements[key].value = formDataFromLS[key];
    }
  } catch (err) {
    console.log(err);
  }
};

fillFormFields();

const onFormFieldChange = event => {
  const { target: formField } = event;

  const fieldValue = formField.value;
  const fieldName = formField.name;

  formData[fieldName] = fieldValue;

  localStorage.setItem('feedback-form-data', JSON.stringify(formData));
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted data:', formData);

  const { currentTarget: formEL } = event;

  event.currentTarget.reset();
  localStorage.removeItem('feedback-form-data');
  formData = { email: '', message: '' };
};

form.addEventListener('input', onFormFieldChange);
form.addEventListener('submit', onFeedbackFormSubmit);
