//figure out whatthe website does okay... a calculator
console.log("test this thang");

//get elements by id class tag ... do query selector (all)
let buttons = Array.from(document.querySelectorAll('button'))
let screen1 = document.querySelector('[name="input"]');
let screen2 = document.querySelector('[name="result"]');


//create elements
buttons.forEach(function(x){
    x.addEventListener('click',function(){
        screen1.value += x.value
        })
    })

// make at least 1 thing spin

// class calculator {
//     constructor(operand,sign) {
        
//     }
// }