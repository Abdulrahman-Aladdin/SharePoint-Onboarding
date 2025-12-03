class Constants {
  tableColumns = {
    en: [
      "firstNameEn",
      "lastNameEn",
      "email",
      "positionEn",
      "age",
      "addressEn",
    ],
    ar: [
      "firstNameAr",
      "lastNameAr",
      "email",
      "positionAr",
      "age",
      "addressAr",
    ],
  };

  allColumns = [
    "firstNameEn",
    "firstNameAr",
    "lastNameEn",
    "lastNameAr",
    "email",
    "positionEn",
    "positionAr",
    "age",
    "salary",
    "joinDate",
    "addressEn",
    "addressAr",
    "phoneNumber",
  ];
}

const constants = new Constants();
export default constants;
