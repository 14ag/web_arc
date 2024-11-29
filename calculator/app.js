//figure out whatthe website does okay... a calculator



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
    




//get elements by id class tag ... do query selector (all)
let buttons = Array.from(document.querySelectorAll('button'))
let screen1 = document.querySelector('.input');
let screen2 = document.querySelector('.result');
let op=[]
let i = 0

if (isNaN(input[input.length-1])==true){
    throw new Error("syntax error");
    
}



class input {
    inputHandler(x, y, z) {
    if (y == "n") {
        op[i] += x;
    } else {
        switch (z) {
            case "operator":
                op.push(x)
                i += 2;
                break;
            case "operation":
                Calculator.y()
                break;
            case "run":
                Calculator.y(op)
                break;
            default:
                console.log("errorrrr")
                break;
        }

    }
    return op;
}
}




class Calculator {
    constructor(q) {
        this.statement = q
        this.running = 0
        // {"-","+","*","/"}={"subtract","add","multiply","divide"}
        order = ["/", "*", "+", "-"]
        sign = {
            "/": divide,
            "*": multiply,
            "+": add,
            "-": subtract,
        }

    }
    ac() { }
    del() { }
    equals() {
        let entry = op.toSpliced(op.length,0,"=").toString(); //to be used in history
        for (let i = 0; i < order.length; i++) {
            //get no. occurences
            let counter = op.filter((x) => x == order[i]).length

            //loop over array looking for order[i] 
            for (let ii = 0; ii < counter; ii++) {
                let sub_op = op.indexOf(order[i])
                // then take found[+1] and [-1] then pass them to be evaluated in the Basic class
                let a = Calculator.sign['order[i]']
                let b = Basic['a'](op[sub_op - 1], order[sub_op + 1])
                op.splice(sub_op - 1,3)
                op.splice(sub_op - 1,0,b)

            }
        }
        return op.toString
    }
    history() {
        //add entry
     }
}
    


class Basic extends Calculator {
    add(a,b){
        return a+b
    }
    subtract(a,b){
        return a-b
    }
    divide(a,b){
        if (b==0){
            throw new Error("dividing by zero????");
        }
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




//create elements, attributes, tags
buttons.forEach(function(x){
    x.addEventListener('click',function(){
        screen1.value += x.value
        parseinput(x.value)
        })
    })



