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
let stack = [0]
let i = 0


function input_handler(x, y, z) {
    if (y == "n") {
        op[i] += x;
    } else {
        switch (z) {
            case "operator":
                op.push(x)
                i += 2;
                break;
            case "operation":
                output[y]()
                break;
            case "run":
                output.result(op)
                break;
            default:
                console.log("errorrrr")
                break;
        }
    }
}


class Calculator {
    constructor() {
        this.statement = q //what is q?????????
        this.running = 0
        this.order = ["/", "*", "+", "-"]
        this.sign = {
            "/": divide,
            "*": multiply,
            "+": add,
            "-": subtract,
        }

    }
    ac() {
        op.splice(0, op.length)
        this.running = 0
    }

    del() {
        op.splice(-1)
    }

    equals() {}

    history() {
        //add entry
    }
    add(a, b) {
        return a + b
    }
    subtract(a, b) {
        return a - b
    }
    divide(a, b) {
        if (b == 0) {
            throw new Error("dividing by zero????");
        }
        return a / b
    }
    multiply(a, b) {
        return a * b
    }
}



class operator extends Calculator {

}

class output {
    result(x) {
        const calc = new Calculator(x);
        screen2.value = calc.equals()
    }
    del() {
        screen1.value = op.pop()
        Calculator.del()
    }
    ac() {
        screen1.value = ""
        screen2.value = 0
        Calculator.ac()
    }
}




//create elements, attributes, tags
buttons.forEach(function (x) {
    x.addEventListener('click',
        function () {
            screen1.value += x.value
            return input_handler(x.value, x.name, x.className)
        })
})



