'use strict';

// global variable
let workHours = hoursOfOperation();

let eachHoursTotals = [];

const container = document.getElementById('sales-Table');

// global function

function getRandomNumber(minNumber, maxNumber) {
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}

function hoursOfOperation() {
  let startTime = 6;
  let endTime = 9;
  let pm = false;
  let currentTime = startTime;

  let workHours = [];

  while (pm === false || currentTime < endTime) {
    if (pm === false && currentTime < 12) {
      workHours.push(currentTime + ':00am');
      currentTime++;
    } else if (pm === false && currentTime === 12) {
      pm = true;
      workHours.push(currentTime + ':00pm');
      currentTime = 1;
    } else {
      workHours.push(currentTime + ':00pm');
      currentTime++;
    }
  }

  return workHours;
}

function calculateTotal() {
  let dailyTotal = 0;
  for (let i = 0; i < eachHoursTotals.length; i++) {
    dailyTotal += eachHoursTotals[i];
  }
  return dailyTotal;
}

// global method

for (let i = 0; i < workHours.length; i++) {
  eachHoursTotals.push(0);
}

// constructor

let Store = function (location, minNumOfCustomers, maxminNumOfCustomers, averageCookiesPerCustomer) {
  this.location = location;
  this.minNumOfCustomers = minNumOfCustomers;
  this.maxminNumOfCustomers = maxminNumOfCustomers;
  this.averageCookiesPerCustomer = averageCookiesPerCustomer;
  this.totalCookiesPerDay = 0;
  this.customersPerHour = [];
  this.cookiesPerHour = [];
  this.totalCookiesPerDay = 0;
};

// constructor methods

Store.prototype.getCustomersPerHour = function () {
  for (let i = 0; i < workHours.length; i++) {
    this.customersPerHour.push(getRandomNumber(this.minNumOfCustomers, this.maxminNumOfCustomers));
  }
};

Store.prototype.getCookiesPerHour = function () {
  for (let i = 0; i < workHours.length; i++) {
    let temp = this.customersPerHour[i] * this.averageCookiesPerCustomer;
    this.cookiesPerHour.push(Math.floor(temp));
  }
};

Store.prototype.getTotalCookiesPerDay = function () {
  for (let i = 0; i < workHours.length; i++) {
    this.totalCookiesPerDay += this.cookiesPerHour[i];
  }
};

// render table header

let renderHeader = function () {
  const trEl = document.createElement('tr');
  let thEl = document.createElement('th');
  thEl.textContent = 'Location';
  trEl.appendChild(thEl);
  for (let i = 0; i < workHours.length; i++) {
    thEl = document.createElement('th');
    thEl.textContent = workHours[i];
    trEl.appendChild(thEl);
  }
  thEl = document.createElement('th');
  thEl.textContent = 'Daily Location Total';
  trEl.appendChild(thEl);
  container.appendChild(trEl);
};

// render table content

Store.prototype.render = function () {
  const trEl = document.createElement('tr');
  let tdEl = document.createElement('td');
  tdEl.textContent = this.location;
  container.appendChild(trEl);
  tdEl.textContent = this.location;
  trEl.appendChild(tdEl);
  for (let i = 0; i < workHours.length; i++) {
    tdEl = document.createElement('td');
    tdEl.textContent = this.cookiesPerHour[i];
    trEl.appendChild(tdEl);
    eachHoursTotals[i] += this.cookiesPerHour[i];
  }
  tdEl = document.createElement('td');
  tdEl.textContent = this.totalCookiesPerDay;
  trEl.appendChild(tdEl);
};

// render table footer

let renderFooter = function () {
  const trEl = document.createElement('tr');
  trEl.id = 'tableFooter';
  let tdEl = document.createElement('td');
  tdEl.textContent = 'Totals';
  trEl.appendChild(tdEl);
  for (let i = 0; i < eachHoursTotals.length; i++) {
    tdEl = document.createElement('td');
    tdEl.textContent = eachHoursTotals[i];
    trEl.appendChild(tdEl);
  }
  tdEl = document.createElement('td');
  tdEl.textContent = calculateTotal();
  trEl.appendChild(tdEl);
  container.appendChild(trEl);
};

const seattle = new Store('Seattle', 23, 65, 6.3);
seattle.getCustomersPerHour();
seattle.getCookiesPerHour();
seattle.getTotalCookiesPerDay();

const tokyo = new Store('Tokyo', 3, 24, 1.2);
tokyo.getCustomersPerHour();
tokyo.getCookiesPerHour();
tokyo.getTotalCookiesPerDay();

const dubai = new Store('Dubai', 11, 38, 3.7);
dubai.getCustomersPerHour();
dubai.getCookiesPerHour();
dubai.getTotalCookiesPerDay();

const paris = new Store('Paris', 20, 38, 2.3);
paris.getCustomersPerHour();
paris.getCookiesPerHour();
paris.getTotalCookiesPerDay();

const lima = new Store('Lima', 2, 16, 4.6);
lima.getCustomersPerHour();
lima.getCookiesPerHour();
lima.getTotalCookiesPerDay();

renderHeader();

seattle.render();
tokyo.render();
dubai.render();
paris.render();
lima.render();

renderFooter();

//add new branch

const addBranchForm = document.getElementById('add-branch');

addBranchForm.addEventListener('submit', addNewBranch);

function addNewBranch(event) {
  event.preventDefault();
  let location = event.target.locationName.value;
  let minNumOfCustomers = Number(event.target.minCustomersPerHour.value);
  let maxminNumOfCustomers = Number(event.target.maxCustomersPerHour.value);
  let averageCookiesPerCustomer = Number(event.target.avgCookiesPurchasedPerHour.value);

  let addBranch = new Store(location, minNumOfCustomers, maxminNumOfCustomers, averageCookiesPerCustomer);
  addBranch.getCustomersPerHour();
  addBranch.getCookiesPerHour();
  addBranch.getTotalCookiesPerDay();
  addBranch.render();

  //remove old table footer & rerender it

  let footer = document.getElementById('tableFooter');
  container.removeChild(footer);
  renderFooter();

  //remove user input

  addBranchForm.reset();
}

// design challenge

const salesScheduleBtn = document.getElementById("salesScheduleBtn");
const addBranchBtn = document.getElementById("addBranchBtn");
const salesScheduleTab = document.getElementById("salesScheduleTab");
const addBranchTab = document.getElementById("addBranchTab");
const salesScheduleBox = document.getElementById("salesScheduleBox");
const addBranchBox = document.getElementById("addBranchBox");

salesScheduleBtn.addEventListener("click", () => {
  salesScheduleTab.classList.add("active");
  addBranchTab.classList.remove("active");
  salesScheduleBox.classList.remove("box-hide");
  addBranchBox.classList.add("box-hide");
});

addBranchBtn.addEventListener("click", () => {
  salesScheduleTab.classList.remove("active");
  addBranchTab.classList.add("active");
  salesScheduleBox.classList.add("box-hide");
  addBranchBox.classList.remove("box-hide");
});

