import db from "./assets/customJs/db.js";
import translations from "./assets/customJs/i18n.js";

function applyTranslations(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[lang][key];
  });

  if (lang === "ar") {
    document.body.setAttribute("dir", "rtl");
    document.body.classList.add("rtl");
  } else {
    document.body.setAttribute("dir", "ltr");
    document.body.classList.remove("rtl");
  }
}

function getCookie(name) {
  return document.cookie
    .split(";")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

function buildBreadcrumb(employeeName, lang) {
  $("#breadcrumb").html(`
        <li class="breadcrumb-item">
            <a href="index.html">${translations[lang]["home"]}</a>
        </li>
        <li class="breadcrumb-item active">
            ${translations[lang]["details"]} : ${employeeName}
        </li>
    `);
}

function refreshData(employee, lang) {
  if (!employee) {
    $("body").html("<h3>Employee not found</h3>");
  } else {
    if (lang === "ar") {
      $("#firstName").text(employee.firstNameAr);
      $("#lastName").text(employee.lastNameAr);
      $("#email").text(employee.email);
      $("#position").text(employee.positionAr);
      $("#age").text(employee.age);
      $("#salary").text(employee.salary);
      $("#joinDate").text(employee.joinDate);
      $("#address").text(employee.addressAr);
      $("#phoneNumber").text(employee.phoneNumber);
    } else if (lang === "en") {
      $("#firstName").text(employee.firstNameEn);
      $("#lastName").text(employee.lastNameEn);
      $("#email").text(employee.email);
      $("#position").text(employee.positionEn);
      $("#age").text(employee.age);
      $("#salary").text(employee.salary);
      $("#joinDate").text(employee.joinDate);
      $("#address").text(employee.addressEn);
      $("#phoneNumber").text(employee.phoneNumber);
    }
  }
}

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
let lang = getCookie("lang") || "en";
const employee = db.getById(id);

$("#langSelect").val(lang);
applyTranslations(lang);
buildBreadcrumb(
  lang === "ar"
    ? `${employee.firstNameAr} ${employee.lastNameAr}`
    : `${employee.firstNameEn} ${employee.lastNameEn}`,
  lang
);

$("#langSelect").on("change", function () {
  lang = this.value;
  document.cookie = `lang=${lang};`;
  applyTranslations(lang);
  $("body")
    .attr("dir", lang === "ar" ? "rtl" : "ltr")
    .toggleClass("rtl", lang === "ar");
  buildBreadcrumb(
    lang === "ar"
      ? `${employee.firstNameAr} ${employee.lastNameAr}`
      : `${employee.firstNameEn} ${employee.lastNameEn}`,
    lang
  );

  refreshData(employee, lang);
});

refreshData(employee, lang);
