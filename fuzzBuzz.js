function fuzzBuzz(){
  let value = []

  for(let i = 1; i <= 100; i++){
    if(i % 3 !== 0 && i %5 !== 0){
      console.log(i)
      value.push(i)
    }else if(i % 3){
      console.log("Buzz")
      value.push("Buzz")
    }else if(i % 5){
      console.log("Fizz")
      value.push("Fizz")
    }else{
      console.log("FizzBuzz")
      value.push("FizzBuzz")
    }
  }

return value
}

console.log(fuzzBuzz())