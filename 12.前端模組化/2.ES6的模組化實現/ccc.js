//1.導入{}中定義的變量
import { flag, sum } from './aaa.js'

var name = '阿彰'
if (flag) {
  console.log(name, sum(20, 30))
}

//2.直接導入export的變量
import { num1, height } from './aaa.js'
console.log(num1, height)

//3.直接導入function
import { mul, Person } from './aaa.js'

console.log(mul(30, 50))

const user = new Person('wyatt')
user.print()

//4.import default
import func from './aaa.js'
func('argument ')

//5.統一導入
import * as aaa from './aaa.js'

console.log(aaa.sum(500, 302))
