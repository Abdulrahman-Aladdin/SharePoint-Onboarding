import db from "./assets/customJs/db.js";
import translations from "./assets/customJs/i18n.js";
import headerHtml from "./layouts/header.js";
import footerHtml from "./layouts/footer.js";
import { validateFormData } from "./assets/customJs/formValidation.js";

function applyTranslations(lang) {
  $("[data-i18n]").each(function () {
    const key = $(this).data("i18n");
    $(this).text(translations[lang][key]);
  });

  const html = document.documentElement;
  const bootstrap = document.getElementById("bootstrap-css");

  if (lang === "ar") {
    html.setAttribute("dir", "rtl");
    html.setAttribute("lang", "ar");
    bootstrap.href = "assets/css/bootstrap.rtl.min.css";
    $("#addBtn").html(
      `<i class="bi bi-person-plus-fill m-1"></i> ${translations[lang]["addEmployee"]}`
    );
  } else {
    html.setAttribute("dir", "ltr");
    html.setAttribute("lang", "en");
    bootstrap.href = "assets/css/bootstrap.min.css";
    $("#addBtn").html(
      `<i class="bi bi-person-plus-fill m-1"></i> ${translations[lang]["addEmployee"]}`
    );
  }
}

const tableColumns = {
  en: ["firstNameEn", "lastNameEn", "email", "positionEn", "age", "addressEn"],
  ar: ["firstNameAr", "lastNameAr", "email", "positionAr", "age", "addressAr"],
};

const allColumns = [
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

function buildTable(lang) {
  if (employeeTable) {
    employeeTable.destroy();
    $("#employeesTable").html("");
  }

  employeeTable = new DataTable($("#employeesTable"), {
    data: db.getAll(),
    layout: {
      topStart: {
        buttons: [
          {
            text: translations[lang]["exportExcel"],
            action: function (e, dt, node, config) {
              // const worksheet = XLSX.utils.json_to_sheet(db.getAll());
              // const workbook = XLSX.utils.book_new();
              // XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
              // XLSX.writeFile(workbook, "employees.xlsx");
              loadColumnsSelection(lang);
              columnsSelectionModal.show();
            },
          },
        ],
      },
    },
    language: {
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
    },
    columns: [
      { data: tableColumns[lang][0], title: translations[lang]["firstName"] },
      { data: tableColumns[lang][1], title: translations[lang]["lastName"] },
      { data: tableColumns[lang][2], title: translations[lang]["email"] },
      { data: tableColumns[lang][3], title: translations[lang]["position"] },
      { data: tableColumns[lang][4], title: translations[lang]["age"] },
      {
        data: null,
        title: translations[lang]["actions"],
        render: (data) => `
          <button class="btn btn-info btn-sm view-btn" data-id="${data.id}" 
           data-bs-toggle="tooltip" data-bs-placement="top" title="${translations[lang]["view"]}"><i class="bi bi-eye-fill"></i></button>
          <button class="btn btn-warning btn-sm editBtn" data-bs-toggle="tooltip" data-bs-placement="top" title="${translations[lang]["edit"]}"><i class="bi bi-pencil-square"></i></button>
          <button class="btn btn-danger btn-sm deleteBtn" data-bs-toggle="tooltip" data-bs-placement="top" title="${translations[lang]["delete"]}"><i class="bi bi-person-x-fill"></i></button>
        `,
      },
    ],
    responsive: {
      details: {
        display: DataTable.Responsive.display.childRowImmediate,
        target: "",
        type: "none",
      },
    },
  });
}

function refreshTable() {
  console.log(db.getAll());
  employeeTable.clear().rows.add(db.getAll()).draw();
}

function getCookie(name) {
  return document.cookie
    .split(";")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

function buildBreadcrumb(lang) {
  $("#breadcrumb").html(`
        <li class="breadcrumb-item">
            <a href="index.html">${translations[lang]["home"]}</a>
        </li>
    `);
}

function loadColumnsSelection(lang) {
  const form = $("#columnsForm");
  form.html("");

  allColumns.forEach((col) => {
    const labelText = translations[lang][col];

    form.append(`
            <div class="form-check mb-2">
                <input class="form-check-input selectColsCheckBox" type="checkbox" id="col_${col}" value="${col}">
                <label class="form-check-label" for="col_${col}">
                    ${labelText}
                </label>
            </div>
        `);
  });
}

console.log(import.meta.url);

$("#header").html(headerHtml);
$("#footer").html(footerHtml);

let lang = getCookie("lang") || "en";
let operation = "";
let employeeTable = null;
const empModal = new bootstrap.Modal($("#employeeModal"));
const confirmationModal = new bootstrap.Modal($("#deleteConfirmationModal"));
const columnsSelectionModal = new bootstrap.Modal($("#exportModal"));

$("#langSelect").val(lang);

toastr.options = {
  closeButton: true,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: true,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "3000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

applyTranslations(lang);
buildTable(lang);
buildBreadcrumb(lang);

$("#langSelect").on("change", function () {
  lang = this.value;
  document.cookie = `lang=${lang};`;
  applyTranslations(lang);
  buildTable(lang);
  buildBreadcrumb(lang);
});

$("#addBtn").on("click", function () {
  $("#modalTitle").text(translations[lang]["addEmployee"]);

  operation = "add";

  $("#empFirstNameEn").val("");
  $("#empLastNameEn").val("");
  $("#empFirstNameAr").val("");
  $("#empLastNameAr").val("");
  $("#empPositionEn").val("");
  $("#empPositionAr").val("");
  $("#empAge").val("");
  $("#empEmail").val("");
  $("#empSalary").val("");
  $("#empJoinDate").val("");
  $("#empAddressEn").val("");
  $("#empAddressAr").val("");
  $("#empPhoneNumber").val("");

  empModal.show();
});

$("#employeesTable").on("click", ".editBtn", function () {
  const row = employeeTable.row($(this).closest("tr"));
  const data = row.data();

  operation = "edit";

  $("#modalTitle").text(translations[lang]["editEmployee"]);
  $("#empId").val(data.id);

  $("#empFirstNameEn").val(data.firstNameEn);
  $("#empLastNameEn").val(data.lastNameEn);
  $("#empFirstNameAr").val(data.firstNameAr);
  $("#empLastNameAr").val(data.lastNameAr);
  $("#empPositionEn").val(data.positionEn);
  $("#empPositionAr").val(data.positionAr);
  $("#empAge").val(data.age);
  $("#empEmail").val(data.email);
  $("#empSalary").val(data.salary);
  $("#empJoinDate").val(data.joinDate);
  $("#empAddressEn").val(data.addressEn);
  $("#empAddressAr").val(data.addressAr);
  $("#empPhoneNumber").val(data.phoneNumber);

  empModal.show();
});

$("#btnSave").on("click", function () {
  const form = $("#empForm")[0];
  const employee = {
    firstNameEn: $("#empFirstNameEn").val(),
    lastNameEn: $("#empLastNameEn").val(),
    firstNameAr: $("#empFirstNameAr").val(),
    lastNameAr: $("#empLastNameAr").val(),
    positionEn: $("#empPositionEn").val(),
    positionAr: $("#empPositionAr").val(),
    age: $("#empAge").val(),
    email: $("#empEmail").val(),
    salary: $("#empSalary").val(),
    joinDate: $("#empJoinDate").val(),
    addressEn: $("#empAddressEn").val(),
    addressAr: $("#empAddressAr").val(),
    phoneNumber: $("#empPhoneNumber").val(),
  };

  if (!validateFormData(employee)) {
    return;
  }

  if (operation === "edit") {
    db.update(parseInt($("#empId").val()), employee);
    toastr.success(translations[lang]["employeeUpdated"]);
  } else if (operation === "add") {
    db.create(employee);
    toastr.success(translations[lang]["employeeAdded"]);
  }

  operation = "";

  document.activeElement.blur();

  refreshTable();
  empModal.hide();
});

$("#employeesTable").on("click", ".deleteBtn", function () {
  const row = employeeTable.row($(this).closest("tr"));
  const data = row.data();

  $("#confirmationMessageTag").text(translations[lang]["deleteConfirmation"]);

  $("#btnConfirmDelete")
    .off("click")
    .on("click", function () {
      db.delete(data.id);
      refreshTable();
      toastr.success(translations[lang]["employeeDeleted"]);
      confirmationModal.hide();
    });

  confirmationModal.show();
});

$("#employeesTable").on("click", ".view-btn", function () {
  const id = $(this).data("id");
  window.location.href = `details.html?id=${id}`;
});

$("#selectAllCols").on("click", function () {
  $(".selectColsCheckBox").prop("checked", true);
});

$("#unselectAllCols").on("click", function () {
  $(".selectColsCheckBox").prop("checked", false);
});

$("#downloadExcelBtn").on("click", function () {
  const selectedCols = [];
  $(".selectColsCheckBox:checked").each(function () {
    selectedCols.push($(this).val());
  });

  console.log("Selected Columns: ", selectedCols);
  const allData = db.getAll();

  const filteredData = allData.map((emp) => {
    const filteredEmp = {};
    selectedCols.forEach((col) => {
      filteredEmp[translations[lang][col]] = emp[col];
    });
    return filteredEmp;
  });

  const worksheet = XLSX.utils.json_to_sheet(filteredData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "employees.xlsx");
});
