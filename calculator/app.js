//get elements by id class tag ... do query selector (all)
let buttons = Array.from(document.querySelectorAll('button'))
let input_screen = document.querySelector('.input');
let result_screen = document.querySelector('.result');
let running = 0
let entry = ""
let stack = []
let stack_pointer = 0 //stack pointer
let sign = {
    "/": (a, b)=> {
        if (b == 0) {
            throw new Error("dividing by zero????");
        }
        return a / b
    },
    "*": (a, b)=>{
        return a * b;
    },
    "+": (a, b)=>{
        return a + b
    },
    "-": (a, b)=>{
        return a - b
    },
}
// order of opps stated here
let order = sign.sort(function(a,b){
    let O = ["/", "*", "+", "-"] //here 
    if (O.indexOf(a)<O.indexOf(b)){
        return -1
    } else{
        return 1
    }
})





//create elements, attributes, tags
buttons.forEach(function (x) {
    x.addEventListener('click',
        function () {
            // input_screen.value = x.value
            return input_handler(x.value, x.name, x.className)
        })
})

function input_handler(x = "", y = "", z = "") { //x- value,  y-name,  z-class
    if (y == "n") {
        if (isNaN(stack[stack_pointer])) {
            if (stack_pointer === 0) {
                stack[stack_pointer] = x
            } else {
                stack_pointer++
                stack[stack_pointer] = x
            }
            // input_screen.value= "yes" //debug
        } else {
            stack[stack_pointer] = stack[stack_pointer].toString() + x
        }
    } else {
        switch (z) { //classname
            case "operator":
                //add the sign
                stack.push(x)
                stack_pointer++
                input_screen.value = stack
                break;
            case "operation":
                Calculator[y](stack) // calls the function stored in y
                break;
        }
    }
    input_screen.value = stack
}

class Calculator{
equals() {
    let entry = stack.toSpliced(stack.length, 0, "=").toString(); //to be used in history

    //check if last char is NaN
    if (isNaN(stack[stack.length - 1]) == true) {
        throw new Error("syntax error");
    }

    for (let i = 0; i < order.length; i++) {
        //get no. occurences
        let counter = stack.filter((x) => x == order[i]).length

        //loop over array looking for order[i] 
        for (let ii = 0; ii < counter; ii++) {
            let sub_op = stack.indexOf(order[i])
            // then take found[+1] and [-1] then pass them to be evaluated in the Basic class
            let a = sign[order[i]]
            console.log(a)

            stack.splice(sub_op - 1, 3)
            stack.splice(sub_op - 1, 0, Calculator[a](stack[sub_op - 1], stack[sub_op + 1]))
            console.log(stack)

        }
    }

    running = stack.toString()
    console.log("")
    console.log("")
    console.log("----------------------")
    return stack.toString()

}

del() {
    stack.splice(-1)
    screen1.value = stack.pop()
    Calculator.del()
}


}


// function clear() {
//     stack.splice(0, stack.length)
//     this.running = 0
// }


function history() {
    console.log(entry)
}


function ac() {
    stack.length = 0
    stack_pointer = 0
    running = 0

}

