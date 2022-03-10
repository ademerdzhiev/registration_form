import {serviceID} from './mailjs.js';
import {templateID} from './mailjs.js';
import {mailjsToken} from './mailjs.js';

document.getElementById("button").addEventListener('click', clickButton);

function clickButton(e) {

    const btn = document.getElementById('button');

    document.getElementById('form')


    .addEventListener('submit', function(event) {
    event.preventDefault();

    btn.value = 'Sending...';

    emailjs.sendForm(serviceID, templateID, '#form', mailjsToken)
        .then(() => {
        btn.value = 'Send Email';
        alert('Sent!');
        }, (err) => {
        btn.value = 'Send Email';
        alert(JSON.stringify(err));
        });
    });
}

function  sendMailJS() {

}

function checkboxValueInvoice() {
	var invoiceParticipation = document.getElementById("invoiceParticipation");

	invoiceParticipation.addEventListener("change", () => {
		if (invoiceParticipation.checked == false) {
			document.getElementById("invoice-table").style.visibility = "collapse";
		} else {
			document.getElementById("invoice-table").style.visibility = "visible";

		}
	});
}

function checkboxValueVisa() {

  var visa = document.getElementById("visaid");
  console.log("checked")

  visa.addEventListener("change", () => {
    if (visa.checked == false) {
      document.getElementById("visa-table").style.visibility = "collapse";
    } else {
      document.getElementById("visa-table").style.visibility = "visible";
    }
  });
}
let selectPackage;
function selectPackageF() {
  const packagesQ = document.querySelectorAll('input[name="vatParticipation"]');
  for (const packageQ of packagesQ) {
    packageQ.addEventListener('change', showSelected);
  }
}

function showSelected(e) {
    if (this.checked) {
        selectPackage = e.target.value;
        accomodationAmount();
    }

}

function accomodationAmount() {
  element = document.getElementById("accomodation-amount");
  element.innerHTML = "Registration / accommodation amount: " + parseInt(selectPackage) + " Euro";
}

function calculateNumberOfNights() {
  var arrivalDate = document.getElementById("arrival-date-id").value.split("-");
  var departureDate = document.getElementById("departure-date-id").value.split("-");
  numberOfNights = parseInt(departureDate[2]) - parseInt(arrivalDate[2]);
  document.getElementById('number-of-nights-id').setAttribute('value', numberOfNights);
}
