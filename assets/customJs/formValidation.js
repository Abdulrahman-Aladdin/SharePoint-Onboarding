function markFieldInvalid(fieldId, errorId, message) {
  $(`#${fieldId}`).removeClass("is-valid");
  $(`#${fieldId}`).addClass("is-invalid");
  $(`#${errorId}`).css("display", "block").text(message);
}

function markFieldValid(fieldId, errorId) {
  $(`#${fieldId}`).removeClass("is-invalid");
  $(`#${fieldId}`).addClass("is-valid");
  $(`#${errorId}`).css("display", "none");
}

function isEnglishText(text) {
  const englishRegex = /^[A-Za-z\s]+$/;
  return englishRegex.test(text);
}

function isArabicText(text) {
  const arabicRegex = /^[\u0600-\u06FF\s]+$/;
  return arabicRegex.test(text);
}

function isValidPhoneNumber(phone) {
  const phoneRegex = /^\+?[0-9]{7,15}$/;
  return phoneRegex.test(phone);
}

function isValidDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  return date instanceof Date && !isNaN(date) && date <= now;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isLegalAge(age) {
  return Number.isInteger(age) && age >= 18 && age <= 65;
}

function isValidSalary(salary) {
  return salary >= 3000;
}

function validateField(
  value,
  isRequired,
  fieldId,
  errorId,
  validationFn,
  errorMessage
) {
  if (!isRequired && !value) {
    markFieldValid(fieldId, errorId);
    return true;
  }

  if ((isRequired && !value) || !validationFn(value)) {
    markFieldInvalid(fieldId, errorId, errorMessage);
    return false;
  }

  markFieldValid(fieldId, errorId);
  return true;
}

function validateFormData(employee) {
  let isValid = true;

  console.log("Validating employee data:", employee);

  // Validate firstNameEn
  isValid &= validateField(
    employee.firstNameEn,
    true,
    "empFirstNameEn",
    "empFirstNameEnError",
    isEnglishText,
    "Please enter a valid first name in English."
  );

  // Validate firstNameAr
  isValid &= validateField(
    employee.firstNameAr,
    true,
    "empFirstNameAr",
    "empFirstNameArError",
    isArabicText,
    "Please enter a valid first name in Arabic."
  );

  // Validate lastNameEn
  isValid &= validateField(
    employee.lastNameEn,
    true,
    "empLastNameEn",
    "empLastNameEnError",
    isEnglishText,
    "Please enter a valid last name in English."
  );

  // Validate lastNameAr
  isValid &= validateField(
    employee.lastNameAr,
    true,
    "empLastNameAr",
    "empLastNameArError",
    isArabicText,
    "Please enter a valid last name in Arabic."
  );

  // validate email
  isValid &= validateField(
    employee.email,
    true,
    "empEmail",
    "empEmailError",
    isValidEmail,
    "Please enter a valid email address."
  );

  // validte positionEn
  isValid &= validateField(
    employee.positionEn,
    false,
    "empPositionEn",
    "empPositionEnError",
    isEnglishText,
    "Please enter a valid position in English."
  );

  // validate positionAr
  isValid &= validateField(
    employee.positionAr,
    false,
    "empPositionAr",
    "empPositionArError",
    isArabicText,
    "Please enter a valid position in Arabic."
  );

  // validate age
  isValid &= validateField(
    employee.age,
    false,
    "empAge",
    "empAgeError",
    isLegalAge,
    "Please enter a valid age between 18 and 65."
    );
    
    // validate salary
    isValid &= validateField(
      employee.salary,
      false,
      "empSalary",
      "empSalaryError",
      isValidSalary,
      "Please enter a valid salary of at least 3000."
    );

  // validate date
  isValid &= validateField(
    employee.joinDate,
    false,
    "empJoinDate",
    "empJoinDateError",
    isValidDate,
    "Please enter a valid join date."
  );

  // validate addressEn
  isValid &= validateField(
    employee.addressEn,
    false,
    "empAddressEn",
    "empAddressEnError",
    isEnglishText,
    "Please enter a valid address in English."
  );

  // validate addressAr
  isValid &= validateField(
    employee.addressAr,
    false,
    "empAddressAr",
    "empAddressArError",
    isArabicText,
    "Please enter a valid address in Arabic."
  );

  // validate phone number
  isValid &= validateField(
    employee.phoneNumber,
    false,
    "empPhoneNumber",
    "empPhoneNumberError",
    isValidPhoneNumber,
    "Please enter a valid phone number."
  );

  return isValid;
}

export { validateFormData };
