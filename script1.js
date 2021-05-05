const url = "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";


var tableWrapper = document.getElementById("table-wrapper");

var tableHeaders = document.getElementById("table-headers");
tableWrapper.appendChild(tableHeaders);

var tableData = document.getElementById("table-data");
tableWrapper.appendChild(tableData);

var table = document.createElement("table");
tableData.appendChild(table);

var tableBody = document.createElement("tbody");
table.appendChild(tableBody);

console.log(tableWrapper);

var infoWrapper = document.getElementById("info-wrapper");
var detailHead = document.createElement("h1");
detailHead.innerText = "Details";
infoWrapper.appendChild(detailHead);

var clickSubHead = document.createElement("p");
clickSubHead.innerText = "Click on a Table item to get Detailed Description";
infoWrapper.appendChild(clickSubHead);

var detailsContainer = document.createElement("div");
detailsContainer.id = "details-constainer";
infoWrapper.appendChild(detailsContainer);

var selectedUser = document.createElement("div");
selectedUser.innerHTML = "<b>User Selected:</b>";
detailsContainer.appendChild(selectedUser);

var descriptionWrapper = document.createElement("div");
detailsContainer.appendChild(descriptionWrapper);

var descriptionTitle = document.createElement("b");
descriptionTitle.innerText = "Description";
descriptionWrapper.appendChild(descriptionTitle);

var descriptionTextArea = document.createElement("textarea");
descriptionTextArea.cols = "50";
descriptionTextArea.rows = "5";
descriptionTextArea.readOnly = true;
descriptionWrapper.appendChild(descriptionTextArea);

var addressContainer = document.createElement("div");
addressContainer.innerHTML = "<b>Address:</b>";
detailsContainer.appendChild(addressContainer);

var cityWrapper = document.createElement("div");
cityWrapper.innerHTML = "<b>City:</b>";
detailsContainer.appendChild(cityWrapper);

var stateWrapper = document.createElement("div");
stateWrapper.innerHTML = "<b>State:</b>";
detailsContainer.appendChild(stateWrapper);

var zipWrapper = document.createElement("div");
zipWrapper.innerHTML = "<b>Zip:</b>";
detailsContainer.appendChild(zipWrapper);

function creationOfTableHeaderRow(data, index) {
  var dataRow = document.createElement("tr");
  dataRow.className = "data-row";

  for (var i = 0; i <= 5; i++) {
    var tableData = document.createElement("td");
    tableData.className = "coloumn" + i;

    switch (i) {
      case 1:
        tableData.innerText = data.id;
        break;
      case 2:
        tableData.innerText = data.firstName;
        break;
      case 3:
        tableData.innerText = data.lastName;
        break;
      case 4:
        tableData.innerText = data.email;
        break;
      case 5:
        tableData.innerText = data.phone;
        break;
    }
    dataRow.appendChild(tableData);
  }

  dataRow.addEventListener("click", function () {
    var dataRowContiner = document.getElementsByClassName("data-row");
    selectedUser.innerHTML =
      "<b>User Selected:</b>" + data.firstName + " " + data.lastName + "</div>";
    descriptionTextArea.innerText = data.description;
    addressContainer.innerHTML = "<b>Address:</b>" + data.address.streetAddress;
    cityWrapper.innerHTML = "<b>City:</b> " + data.address.city;
    stateWrapper.innerHTML = "<b>State:</b> " + data.address.state;
    zipWrapper.innerHTML = "<b>Zip:</b> " + data.address.zip;

    for (var i = 0; i < dataRowContiner.length; i++) {
      if (i === index) {
        dataRowContiner[i].classList.add("active");
      } else {
        dataRowContiner[i].className = "data-row";
      }
    }
  });

  tableBody.appendChild(dataRow);
}

var tableData = [];
function creationOfTableRow() {
  for (var i = 0; i < tableData.length; i++) {
    creationOfTableHeaderRow(tableData[i], i);
  }

  selectedUser.innerHTML =
    "<b>User selected:</b> " +
    tableData[0].firstName +
    " " +
    tableData[0].lastName +
    "</div>";
  descriptionWrapper.innerHTML = tableData[0].description;
  addressContainer.innerHTML =
    "<b>Address:</b> " + tableData[0].address.streetAddress;
  cityWrapper.innerHTML = "<b>City:</b> " + tableData[0].address.city;
  stateWrapper.innerHTML = "<b>State:</b> " + tableData[0].address.state;
  zipWrapper.innerHTML = "<b>Zip:</b> " + tableData[0].address.zip;
  var dataRowContainerTwo = document.getElementsByClassName("data-row");
  dataRowContainerTwo[0].classList.add("acctive");
}

var xhttp = new XMLHttpRequest();
xhttp.open("GET", url, true);
xhttp.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log(JSON.parse(this.responseText));
    tableData = JSON.parse(this.responseText);
    creationOfTableRow();
  }
};
xhttp.send();

//   Search Functionality
var searchFunctionality = document.getElementById("search-box");
searchFunctionality.onkeyup = function (e) {
  var inputText = searchFunctionality.value.toUpperCase();
  var tableRow = document.getElementsByTagName("tr");
  for (i = 1; i < tableRow.length; i++) {
    var tableDataTag = tableRow[i].getElementsByTagName("tableDataTag")[1];
    if (tableDataTag) {
      var inputTextValue = tableDataTag.innerText;
      if (inputTextValue.toUpperCase().indexOf(inputText) > 1) {
        tableRow[i].style.display = "";
      } else {
        tableRow[i].style.display = "none";
      }
    }
  }
};
