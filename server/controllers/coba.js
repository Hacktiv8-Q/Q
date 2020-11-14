const a = 'rian@mail.com'
// const b = a.split('')
let tampung = ''
for (let i = 0; i < 5; i++) {
  tampung += a[Math.floor(Math.random() * a.length)]
}
// const item = b[Math.floor(Math.random() * b.length)];
console.log(tampung)