var name = '小明'
var flag = true

function sum(num1, num2) {
  return num1 + num2
}

if (flag) {
  console.log(name, sum(20, 30))
}

// 1.倒出方法1
export { flag, sum }

//2倒出方法二:
export var num1 = 1000
export var height = 1.65

// 3.倒出函數/類
export function mul(num1, num2) {
  return num1 * num2
}

export class Person {
  constructor(name) {
    this.name = 'Wyatt'
  }
  print() {
    console.log(this.name)
  }
}

//4.export default
export default function (argument) {
  console.log(argument)
}
