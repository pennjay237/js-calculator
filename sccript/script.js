// Récupérer l'élément d'affichage (input)
const display = document.getElementById('space')

let currentInput = ''
let previousInput = ''
let operator = null

// Fonction pour mettre à jour l'affichage
function updateDisplay () {
  display.value = currentInput || '0'
}

// Fonction pour ajouter un chiffre ou un point
function appendNumber (number) {
  if (number === '.' && currentInput.includes('.')) return
  currentInput += number
  updateDisplay()
}

function chooseOperation (op) {
  if (currentInput === '') return
  if (previousInput !== '') {
    calculateResult()
  }
  operator = op
  previousInput = currentInput
  currentInput = ''
}

function calculateResult () {
  if (operator === null || currentInput === '') return

  let result
  const prev = parseFloat(previousInput)
  const current = parseFloat(currentInput)

  switch (operator) {
    case '+':
      result = prev + current
      break
    case '-':
      result = prev - current
      break
    case '×':
      result = prev * current
      break
    case '÷':
      result = prev / current
      break
    default:
      return
  }

  currentInput = result.toString()
  operator = null
  previousInput = ''
  updateDisplay()
}

function clearAll () {
  currentInput = ''
  previousInput = ''
  operator = null
  updateDisplay()
}

function deleteLast () {
  currentInput = currentInput.slice(0, -1)
  updateDisplay()
}

function calculatePercentage () {
  if (currentInput === '') return
  currentInput = (parseFloat(currentInput) / 100)
  updateDisplay()
}

document.querySelectorAll('#main button, #select button, #nom button, #arl button').forEach(button => {
  button.addEventListener('click', () => {
    if (button.id === 'plus') {
      chooseOperation('+')
    } else if (button.id === 'minus') {
      chooseOperation('-')
    } else if (button.id === 'times') {
      chooseOperation('×')
    } else if (button.id === 'division') {
      chooseOperation('÷')
    } else if (button.id === 'erase') {
      clearAll()
    } else if (button.id === 'one-delete') {
      deleteLast()
    } else if (button.id === 'percent') {
      calculatePercentage()
    } else {
      appendNumber(button.textContent)
    }
  })
})

document.getElementById('operator').addEventListener('click', calculateResult)
document.getElementById('erase').addEventListener('click', clearAll)
document.getElementById('one-delete').addEventListener('click', deleteLast)