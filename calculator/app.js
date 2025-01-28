//get elements by id class tag ... do query selector (all)
let buttons = Array.from(document.querySelectorAll('button'))
let input_screen = document.querySelector('.input');
let result_screen = document.querySelector('.result');
let stack = []
let i = 0 //stack pointer
let order = ["/", "*", "+", "-"]
let running = 0
let sign = {
    "/": divide,
    "*": multiply,
    "+": add,
    "-": subtract,
}




//create elements, attributes, tags
buttons.forEach(function (x) {
    x.addEventListener('click',
        function () {
            // input_screen.value += x.value
            return input_handler(x.value, x.name, x.className)
        })
})

function input_handler(x, y, z) { //x- value,  y-name,  z-class
    if (y == "n") {
        if (stack[i]===NaN){
            stack.push(x)
        } else {
            stack[i]=stack[i].to
        }
        input_screen.value= stack
    } else {
        switch (z) {
            case "operator":
                //add the sign
                break;
            case "operation":
                window[y]() // calls the function stored in y
                break;
            case "run":
                equals(stack)
                break;
            default:
                input_screen.value="errorrrr"
                break;
        }
    }
}

    function divide(a, b) {
        if (b == 0) {
            throw new Error("dividing by zero????");
        }
        return a / b
    }
    function multiply(a, b) {
        return a * b
    }
    function add(a, b) {
        return a + b
    }
    function subtract(a, b) {
        return a - b
    }
    function del() {
        op.splice(-1)
    }
    function equals() {

    }
    // function clear() {
    //     op.splice(0, op.length)
    //     this.running = 0
    // }


    function history() {
        //add entry
    }

    function result(x) {
        const calc = new Calculator(x);
        screen2.value = calc.equals()
    }

    function del() {
        screen1.value = op.pop()
        Calculator.del()
    }

    function ac() {
        screen1.value = ""
        screen2.value = 0
    }

