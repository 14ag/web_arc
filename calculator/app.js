//get elements by id class tag ... do query selector (all)
let buttons = Array.from(document.querySelectorAll('button'))
let input_screen = document.querySelector('.input');
let result_screen = document.querySelector('.result');
let entry = document.querySelector('.history').innerHTML
let stack = [""]
let stack_pointer = 0 //stack pointer
let sign = { //property/key :value
    "*": (a, b) => {
        return a * b;
    },
    "+": (a, b) => {
        return a + b
    },
    "-": (a, b) => {
        return a - b
    },
    "/": (a, b) => {
        if (b == 0) {
            throw new Error("dividing by zero????");
        }
        return a / b
    },
}
// order of opps stated here
let order = Object.keys(sign).sort(function (a, b) {
    let O = ["/", "*", "+", "-"] //here 
    if (O.indexOf(a) < O.indexOf(b)) {
        return -1
    } else {
        return 1
    }
})

//create elements, attributes, tags
buttons.forEach(function (x) {
    x.addEventListener('click',
        function () {
            // input_screen.value = x.value
            input_handler(x.value, x.name, x.className)
            input_screen.value = stack.toString()

        })
})

function input_handler(x = "", y = "", z = "") { //x- value,  y-name,  z-class
    x = x.toString()
    if (y == "n") {
        if (order.includes(stack[stack_pointer])) {
            stack_pointer++
        }
        if (stack[stack_pointer] == undefined) {
            stack[stack_pointer] = ""
        }
        stack[stack_pointer] += x
    } else {
        switch (z) { //classname
            case "operator":
                //add the sign
                if (stack[stack_pointer] != 0) {
                    stack.push(x)
                    stack_pointer++
                }
                break;
            case "operation":
                eval(y + "()") // calls the function stored in y
                break;
        }
    }
}

function equals() {
    
    // entry += stack.toSpliced(stack.length, 0, "=").toString(); //to be used in history

    //check if last char is NaN
    if (order.includes(stack[stack_pointer])) {
        return;
    }

    for (let i = 0; i < order.length; i++) {
        //get no. occurences
        let counter = stack.filter((x) => x == order[i]).length

        //loop over array looking for order[i] 
        for (let ii = 0; ii < counter; ii++) {
            let sub_op = stack.indexOf(order[i]) //a number eg 1
            // then take found[+1] and [-1] then pass them to be evaluated in the sign object
            //stack[sub_op] is currentOperatorSymbol= 
            stack.splice(sub_op - 1, 3, sign[stack[sub_op]](+stack[sub_op - 1], +stack[sub_op + 1]))
        }
    }

    stack_pointer = 1
    result_screen.value = +stack.toString()


}

function del() {
    if (stack.length != 0) {
        if (stack[stack.length-1].toString().length<=1) {
            stack.pop()
        } else {
            stack[stack.length-1] = stack[stack.length-1].substring(0, stack[stack.length-1].length - 1)
            }
        }
        stack_pointer = stack.length>0? stack.length - 1 : stack_pointer
        
    }



function history() {
    // add the entry to unordered list
    console.log(entry)
}


function ac() {
    stack = [""]
    stack_pointer = 0
    result_screen.value = 0

}
