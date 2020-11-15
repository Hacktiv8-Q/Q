const { generateToken } = require('./jwt')

function uniqueCodeGenerator(email) {
  let uniqueCode = ''
  for (let i = 0; i < 5; i++) {
    uniqueCode += email[Math.floor(Math.random() * email.length)]
  }
  uniqueCode = generateToken(uniqueCode)
  return uniqueCode
}

module.exports = uniqueCodeGenerator