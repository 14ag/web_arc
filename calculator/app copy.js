//uses classes
class Calculator {
    //get elements by id class tag ... do query selector (all)
    static buttons = Array.from(document.querySelectorAll('button'))
    static input_screen = document.querySelector('.input');
    static result_screen = document.querySelector('.result');
    static history_content = document.querySelector('.history_content')
    static card = document.querySelector('.history')
    static stack0
    static stack = [""]
    static stack_pointer = 0 //stack pointer
    static sign = { //property/key :value
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
    static order = Object.keys(sign).sort(function (a, b) {
        let O = ["/", "*", "+", "-"] //here 
        if (O.indexOf(a) < O.indexOf(b)) {
            return -1
        } else {
            return 1
        }
    })

//create elements, attributes, tags
buttons.forEach(function(x) {
        x.addEventListener('click',
            function () {
                // input_screen.value = x.value
                input_handler(x.value, x.name, x.className)
                if (x.name != "equals") {
                    input_screen.value = stack.join("")
                }

            })
    })







    static input_handler(x = "", y = "", z = "") { //x- value,  y-name,  z-class
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

    static equals() {

        stack0 = stack.join(""); //to be used in history

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

        stack_pointer = 0
        result_screen.value = stack.join("")
        history_content.innerHTML += `<p><span class="q">${stack0}</span><br><span class="a"><b>${stack}</b></span></p>`
    }


    static history() {
        // add the entry to unordered list
        card.style.display = "block"
    }

    static close() {
        card.style.display = "none"
    }

    static ac() {
        stack = [""]
        stack_pointer = 0
        result_screen.value = 0

    }

}