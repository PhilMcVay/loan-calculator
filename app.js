// UI Elements
const inputs = document.querySelectorAll('input')
const loanForm = document.querySelector('#loan-form')
const loan = document.querySelector('#loan-amount')
const interest = document.querySelector('#interest-amount')
const term = document.querySelector('#term-duration')
const calculate = document.querySelector('#calculate')
const totalMonthly = document.querySelector('#monthly-payments')
const totalPayment = document.querySelector('#total-payment')
const totalInterest = document.querySelector('#total-interest')
const results = document.querySelector('.results')

// Formats values
function formatNumber(number) {
  return `£${number.toString().split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "," )}`
}

// Generates error alert
function showError() {
  const alertContainer = document.querySelector('.error-container')
  const error = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      Ensure all fields have valid figures
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `

  alertContainer.innerHTML = error
}

// Generates results when values have been input
const generateResults = (e) => {
  e.preventDefault()

  const principle = parseFloat(loan.value)
  const interestCalculated = parseFloat(interest.value) / 100 / 12
  const paymentCalculated = parseFloat(term.value) * 12

  // Calculate monthly totals
  const x = Math.pow(1 + interestCalculated, paymentCalculated)
  const monthly = (principle * x * interestCalculated) / (x - 1)

  // If number is finite, populate and show results
  if (isFinite(monthly)) {
    totalMonthly.textContent = formatNumber(monthly.toFixed(2))
    totalPayment.textContent = formatNumber((monthly * paymentCalculated).toFixed(2))
    totalInterest.textContent = formatNumber(((monthly * paymentCalculated) - principle).toFixed(2))

    results.style.display = 'block'

    // Reset input fields
    inputs.forEach(input => input.value = '')
  } else {
    // Trigger error
    showError()
  }
}

// Event listeners
calculate.addEventListener('click', generateResults)
loanForm.addEventListener('submit', generateResults)
