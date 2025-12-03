import db from "./assets/customJs/db.js";
import translations from "./assets/customJs/i18n.js";
import headerHtml from "./layouts/header.js";
import footerHtml from "./layouts/footer.js";
import {
  getCookie,
  applyTranslations,
  getEmployeeFullName,
} from "./assets/customJs/utils.js";

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

$("#header").html(headerHtml);
$("#footer").html(footerHtml);

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
let lang = getCookie("lang") || "en";
const employee = db.getById(id);

$("#langSelect").val(lang);
applyTranslations(lang);
buildBreadcrumb(getEmployeeFullName(employee, lang), lang);

$("#langSelect").on("change", function () {
  lang = this.value;
  document.cookie = `lang=${lang};`;
  applyTranslations(lang);
  buildBreadcrumb(getEmployeeFullName(employee, lang), lang);
  refreshData(employee, lang);
});

refreshData(employee, lang);
