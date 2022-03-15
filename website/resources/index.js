import {serviceID} from './mailjs.js';
import {templateID} from './mailjs.js';
import {mailjsToken} from './mailjs.js';

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function readFields(id) {
  if (id.value === "" || id.value === null) {
        throw new ValidationError("Empty requred field " + id.name);
      }
  }


document.getElementById("button").addEventListener('click', function (event) {
  try {
      let allID;
      allID = document.querySelectorAll('input[required][type="text"]:not([value=""])');
      for (let i = 0; i < allID.length; i ++) {
        readFields(allID[i]);
      }
      clickButton();
  } catch(err) {
    console.log(err.message);
}
});

document.getElementById("invoiceParticipation").addEventListener('click', checkboxValueInvoice);
document.getElementById('visaid').addEventListener('click', checkboxValueVisa);
document.getElementById("arrival-date-id").addEventListener('change', calculateNumberOfNights);
document.getElementById('departure-date-id').addEventListener('change', calculateNumberOfNights);

let numberOfNights = document.getElementById("number-of-nights-id");
document.getElementById('number-of-nights-id').setAttribute('value', "6");

function clickButton(e) {


  const btn = document.getElementById('button');
  const filled_form = document.getElementById('form');

  filled_form.addEventListener('submit', function(event) {
  event.preventDefault();

  const required_values = true;

  btn.value = 'Sending...';

  emailjs.sendForm(serviceID, templateID, 'form', mailjsToken)
      .then(() => {
      btn.value = 'Send Email';
      alert('Sent!');
      }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
      });
  });

}

function checkboxValueInvoice() {
	var invoiceParticipation = document.getElementById("invoiceParticipation");

	invoiceParticipation.addEventListener("change", () => {
		if (invoiceParticipation.checked == true) {
      document.getElementById("invoice-table").style.visibility = "visible";

      let institutionName = document.getElementById('institution-name');
      institutionName.setAttribute('required', '');

      let vatNumber = document.getElementById('vat-number');
      vatNumber.setAttribute('required', '');

      let accountablePerson = document.getElementById('accountable-person');
      accountablePerson.setAttribute('required', '');

      let vatAddress = document.getElementById('vat-address');
      vatAddress.setAttribute('required', '');

      let vatEmail = document.getElementById('vat-email');
      vatEmail.setAttribute('required', '');
		} else {

      document.getElementById("institution-name").required = false;
      document.getElementById("vat-number").required = false;
      document.getElementById("accountable-person").required = false;
      document.getElementById("vat-address").required = false;
      document.getElementById("vat-email").required = false;

      document.getElementById("invoice-table").style.visibility = "collapse";
		}
	});
}

function checkboxValueVisa() {

  var visa = document.getElementById("visaid");
  console.log("checked")

  visa.addEventListener("change", () => {
    if (visa.checked == true) {
      document.getElementById("visa-table").style.visibility = "visible";

      } else {
      document.getElementById("visa-table").style.visibility = "collapse";
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

selectPackageF()

function showSelected(e) {
    if (this.checked) {
        selectPackage = e.target.value;
        accomodationAmount();
    }

}

function accomodationAmount() {
  let element = document.getElementById("accomodation-amount");
  element.innerHTML = "Registration / accommodation amount: " + parseInt(selectPackage) + " Euro";
}

function calculateNumberOfNights() {
  var arrivalDate = document.getElementById("arrival-date-id").value.split("-");
  var departureDate = document.getElementById("departure-date-id").value.split("-");
  numberOfNights = parseInt(departureDate[2]) - parseInt(arrivalDate[2]);
  document.getElementById('number-of-nights-id').setAttribute('value', numberOfNights);
}

function queryID () {
  const allID = document.querySelectorAll('input[required][type="text"]:not([value=""])');
  return allID;
}
