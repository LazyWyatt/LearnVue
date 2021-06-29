var moduleA = (function () {
  var obj = {}

  var name = '小明'
  var age = 22

  console.log(name)

  var flag = true

  if (flag) {
    console.log(sum(10, 20))
  }

  function sum(num1, num2) {
    return num1 + num2
  }

  obj.flag = flag
  obj.sum = sum

  return obj
})()
