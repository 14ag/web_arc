//figure out whatthe website does okay... a calculator

let input=[]
if (isNaN(input[input.length-1])==true){
    throw new Error("syntax error");
}
for (let i = 0; i < input.length; i++) {
    if (isNaN(i)==false) {
        if (operatorYN){
            operand2+=i
            
        } else{ 
            operand1+=i
        }
    } else {
        if (operatorYN){
            calculator.evaluate(operand1,operator,operand2 )
        }
        operator=i
        operatorYN=true
    }
    
}
class calculator {
    constructor(parameters) {
        this.operand1=operand1
        this.operand2=operand2
        this.operator=operator
    }
    evaluate()
}

class evaluation {
    constructor(parameters) { 
        order
    }
    add(a,b){
        return a+b
    }
    subtract(a,b){
        return a-b
    }
    divide(a,b){
        return a/b
    }
    multiply(a,b){
        return a*b
    }
}

class output {
    constructor(parameters) {
        
    }
}





console.log("test this thang");



//get elements by id class tag ... do query selector (all)
let buttons = Array.from(document.querySelectorAll('button'))
let screen1 = document.querySelector('.input');
let screen2 = document.querySelector('.result');


//create elements, attributes, tags
buttons.forEach(function(x){
    x.addEventListener('click',function(){
        screen1.value += x.value
        })
    })

const x={
    
}










//classes, object, methods, queues, stacks?







// --------------pseudocode-----------------//
 // create general array arithmetics and put these inside

 // when number is pressed, add it to an string or array "operand[1]"

 // when non number is pressed, handle_sign() as follows:
    // if if number of operands is 0
        // plus, minus, add sign
        // times, divide ignore input
                
    // if number of operands is 1
        // plus, minus, times, divide add sign
        
    // if number of operands is more than 1:
        // times, divide adds sign
        // plus adds plus sign to array then makes operand[++1]
        // minus adds plus sign to array then makes operand[++1] that is negative
         
    // if equals, compute
        // if last value in array is times or divide:
            // spit error
        // if compute success:
            // set answer as operand[1]
        // add the arithmetic to history
            // if its the first entry
                // create a history button
         
    // if del, delete thing in the array
        // pop from array
        // delete last char from input screen
         
    // if ac, clear all
        // clear screen
            // clear input screen
            // reset results
        // reset operands
    

