//uses classes
class Calculator {
    //get elements by id class tag ... do query selector (all)
    static buttons = Array.from(document.querySelectorAll('button'));
    static input_screen = document.querySelector('.input');
    static result_screen = document.querySelector('.result');
    static history_content = document.querySelector('.history_content');
    static card = document.querySelector('.history');
    static stack0;
    static stack = [""];
    static stack_pointer = 0; //stack pointer
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
                throw new Error("dividing by zero????");  // refactor this so that operation stops on error
            }
            return a / b
        },
    }


    // order of opps stated here
    static order = Object.keys(Calculator.sign).sort(function (a, b) {
        let O = ["/", "*", "+", "-"] //here 
        if (O.indexOf(a) < O.indexOf(b)) {
            return -1
        } else {
            return 1
        }
    })




    static input_handler(x = "", y = "", z = "") { //x- value,  y-name,  z-class
        x = x.toString();
        if (y == "n") { // handles numbers
            if (Calculator.order.includes(Calculator.stack[Calculator.stack_pointer])) {
                Calculator.stack_pointer++
            }
            if (Calculator.stack[Calculator.stack_pointer] == undefined) {
                Calculator.stack[Calculator.stack_pointer] = ""
            }
            Calculator.stack[Calculator.stack_pointer] += x
        } else {
            switch (z) { //classname
                case "operator":
                    //add the sign
                    if (Calculator.stack[Calculator.stack_pointer] != 0) {
                        Calculator.stack.push(x)
                        Calculator.stack_pointer++
                    }
                    break;
                case "operation":
                    eval(y + "()") // calls the function stored in y
                    break;
            }
        }
    }

    static equals() {

        Calculator.stack0 = Calculator.stack.join(""); //to be used in history

        //check if last char is NaN
        if (Calculator.order.includes(Calculator.stack[Calculator.stack_pointer])) {
            return;
        }

        for (let i = 0; i < Calculator.order.length; i++) {
            //get no. occurences
            let counter = Calculator.stack.filter((x) => x == Calculator.order[i]).length

            //loop over array looking for order[i] 
            for (let ii = 0; ii < counter; ii++) {
                let sub_op = Calculator.stack.indexOf(Calculator.order[i]) //a number eg 1
                // then take found[+1] and [-1] then pass them to be evaluated in the sign object
                //stack[sub_op] is currentOperatorSymbol= 
                Calculator.stack.splice(sub_op - 1, 3, Calculator.sign[Calculator.stack[sub_op]](+Calculator.stack[sub_op - 1], +Calculator.stack[sub_op + 1]))
            }
        }

        Calculator.stack_pointer = 0
        Calculator.result_screen.value = Calculator.stack.join("")
        Calculator.history_content.innerHTML += `<p><span class="q">${Calculator.stack0}</span><br><span class="a"><b>${Calculator.stack}</b></span></p>`
    }


    static history() {
        // add the entry to unordered list
        card.style.display = "block"
    }

    static close() {
        card.style.display = "none"
    }

    static ac() {
        Calculator.stack = [""];
        Calculator.stack_pointer = 0;
        Calculator.result_screen.value = 0;
        Calculator.input_screen.value = "";
    }

    
    static init() {
        // Add event listeners to all buttons
        Calculator.buttons.forEach(function (button) {
            button.addEventListener('click', function () {
                Calculator.input_handler(button.value, button.name, button.className);
                if (button.name !== "equals") {
                    Calculator.input_screen.value = Calculator.stack.join("");
                }
            });
        });
    }
}

// Initialize the calculator event listeners
Calculator.init();