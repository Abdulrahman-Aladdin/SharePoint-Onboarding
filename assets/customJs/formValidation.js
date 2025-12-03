import { getCookie } from "./utils.js";
import translations from "./i18n.js";

function markFieldInvalid(fieldId) {
  $(`#${fieldId}`).removeClass("is-valid");
  $(`#${fieldId}`).addClass("is-invalid");
}

function markFieldValid(fieldId) {
  $(`#${fieldId}`).removeClass("is-invalid");
  $(`#${fieldId}`).addClass("is-valid");
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
  let lang = getCookie("lang") || "en";
  let isValid = true;

  console.log("Validating employee data:", employee);

  // Validate firstNameEn
  isValid &= validateField(
    employee.firstNameEn,
    true,
    "empFirstNameEn",
    "empFirstNameEnError",
    isEnglishText,
    translations[lang]["firstNameEnErrorMsg"]
  );

  // Validate firstNameAr
  isValid &= validateField(
    employee.firstNameAr,
    true,
    "empFirstNameAr",
    "empFirstNameArError",
    isArabicText,
    translations[lang]["firstNameArErrorMsg"]
  );

  // Validate lastNameEn
  isValid &= validateField(
    employee.lastNameEn,
    true,
    "empLastNameEn",
    "empLastNameEnError",
    isEnglishText,
    translations[lang]["lastNameEnErrorMsg"]
  );

  // Validate lastNameAr
  isValid &= validateField(
    employee.lastNameAr,
    true,
    "empLastNameAr",
    "empLastNameArError",
    isArabicText,
    translations[lang]["lastNameArErrorMsg"]
  );

  // validate email
  isValid &= validateField(
    employee.email,
    true,
    "empEmail",
    "empEmailError",
    isValidEmail,
    translations[lang]["emailErrorMsg"]
  );

  // validte positionEn
  isValid &= validateField(
    employee.positionEn,
    false,
    "empPositionEn",
    "empPositionEnError",
    isEnglishText,
    translations[lang]["positionEnErrorMsg"]
  );

  // validate positionAr
  isValid &= validateField(
    employee.positionAr,
    false,
    "empPositionAr",
    "empPositionArError",
    isArabicText,
    translations[lang]["positionArErrorMsg"]
  );

  // validate age
  isValid &= validateField(
    employee.age,
    false,
    "empAge",
    "empAgeError",
    isLegalAge,
    translations[lang]["ageErrorMsg"]
  );

  // validate salary
  isValid &= validateField(
    employee.salary,
    false,
    "empSalary",
    "empSalaryError",
    isValidSalary,
    translations[lang]["salaryErrorMsg"]
  );

  // validate date
  isValid &= validateField(
    employee.joinDate,
    false,
    "empJoinDate",
    "empJoinDateError",
    isValidDate,
    translations[lang]["joinDateErrorMsg"]
  );

  // validate addressEn
  isValid &= validateField(
    employee.addressEn,
    false,
    "empAddressEn",
    "empAddressEnError",
    isEnglishText,
    translations[lang]["addressEnErrorMsg"]
  );

  // validate addressAr
  isValid &= validateField(
    employee.addressAr,
    false,
    "empAddressAr",
    "empAddressArError",
    isArabicText,
    translations[lang]["addressArErrorMsg"]
  );

  // validate phone number
  isValid &= validateField(
    employee.phoneNumber,
    false,
    "empPhoneNumber",
    "empPhoneNumberError",
    isValidPhoneNumber,
    translations[lang]["phoneNumberErrorMsg"]
  );

  return isValid;
}

export { validateFormData };
