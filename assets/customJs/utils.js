import translations from "./i18n.js";

export function getCookie(name) {
  return document.cookie
    .split(";")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

export function applyTranslations(lang) {
  $("[data-i18n]").each(function () {
    const key = $(this).data("i18n");
    $(this).text(translations[lang][key]);
  });

  if (lang === "ar") {
    $("html").attr("dir", "rtl");
    $("html").attr("lang", "ar");
    $("#bootstrap-css").attr("href", "assets/css/bootstrap.rtl.min.css");
  } else {
    $("html").attr("dir", "ltr");
    $("html").attr("lang", "en");
    $("#bootstrap-css").attr("href", "assets/css/bootstrap.min.css");
  }
}

export function getDataTableLanguageOptions(lang) {
  const dataTableLanguageOptions = {
    search: translations[lang]["search"],
    lengthMenu: translations[lang]["lengthMenu"],
    info: translations[lang]["info"],
    infoEmpty: translations[lang]["infoEmpty"],
    infoFiltered: translations[lang]["infoFiltered"],
    zeroRecords: translations[lang]["zeroRecords"],
    paginate: {
      first: translations[lang]["paginateFirst"],
      previous: translations[lang]["paginatePrevious"],
      next: translations[lang]["paginateNext"],
      last: translations[lang]["paginateLast"],
    },
  };

  return dataTableLanguageOptions;
}

export function getEmployeeFullName(employee, lang) {
  if (lang === "ar") {
    return `${employee.firstNameAr} ${employee.lastNameAr}`;
  } else {
    return `${employee.firstNameEn} ${employee.lastNameEn}`;
  }
}

export function filterDataColumns(data, selectedCols, lang) {
  return data.map((emp) => {
    const filteredEmp = {};
    selectedCols.forEach((col) => {
      filteredEmp[translations[lang][col]] = emp[col];
    });
    return filteredEmp;
  });
}

export function saveExcel(data, fileName) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, fileName);
}
