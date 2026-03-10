//uses classes
class Calculator {
    //get elements by id class tag ... do query selector (all)
    static buttons = Array.from(document.querySelectorAll('button'));
    static input_screen = document.querySelector('.input');
    static result_screen = document.querySelector('.result');
    static history_content = document.querySelector('.history_content');
    static card = document.querySelector('.history');
    static stack_pointer = 0; //stack pointer (underscore)
    static stack = [""];
    static answer_show;
    static history_entry;
    static lastState;

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
            if (Calculator.answer_show) {
                Calculator.answer_show = false;
                Calculator.stack = [""];
                Calculator.stack_pointer = 0;
                Calculator.input_screen.value = "";
            }
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
                    const operations = {
                        equals: Calculator.equals,
                        del: Calculator.del,
                        history: Calculator.history,
                        close: Calculator.close,
                        ac: Calculator.ac
                    };
                    if (operations[y]) {
                        operations[y]();
                    }
                    break;
            }
        }
    }

    static equals() {
        let cstack = Calculator.stack;
        let corder = Calculator.order;

        // By using the spread syntax `[...cstack]`, we create a new, independent copy of the array.
        Calculator.lastState = {
            pointer: Calculator.stack_pointer,
            stack: [...cstack],
            input_screen: Calculator.input_screen.value,
        };

        Calculator.history_entry = cstack.join(""); //to be used in history

        //check if last char is NaN
        if (corder.includes(cstack[Calculator.stack_pointer])) {
            return;  //fix
        }

        for (let i = 0; i < corder.length; i++) {
            //get no. occurences
            let counter = cstack.filter((x) => x == corder[i]).length

            //loop over array looking for order[i] 
            for (let ii = 0; ii < counter; ii++) {
                let sub_op = cstack.indexOf(corder[i]) //a number eg 1
                // then take found[+1] and [-1] then pass them to be evaluated in the sign object
                //stack[sub_op] is currentOperatorSymbol= 
                cstack.splice(sub_op - 1, 3, Calculator.sign[cstack[sub_op]](+cstack[sub_op - 1], +cstack[sub_op + 1]))
            }
        }

        Calculator.stack_pointer = 0
        Calculator.result_screen.value = cstack.join("")
        Calculator.answer_show = true;
        Calculator.history_content.innerHTML += `<p><span class="q">${Calculator.history_entry}</span><br><span class="a"><b>${cstack}</b></span></p>`
    }

    static history() {
        // add code to add the entry to unordered list
        Calculator.card.style.display = "block"
    }

    static close() {   //? ??????????????????? what does this do?
        Calculator.card.style.display = "none"
    }

    static ac() {
        Calculator.stack = [""];
        Calculator.stack_pointer = 0;
        Calculator.result_screen.value = 0;
        Calculator.input_screen.value = "";
    }

    static del() {
        let lastState = Calculator.lastState;
        
        if (Calculator.stack.length != 0) {
            
            if (Calculator.answer_show) {
                Calculator.stack = lastState.stack;
                Calculator.stack_pointer = lastState.pointer;
                Calculator.input_screen.value = lastState.input_screen;
                Calculator.answer_show = false;
            }
            
            let lastElement = Calculator.stack[Calculator.stack.length - 1].toString();

            if (lastElement.length <= 1) { //If the last item in the stack was a number like "123", it would remove just the last character
                Calculator.stack.pop()
            } else {
                Calculator.stack[Calculator.stack.length - 1] = lastElement.substring(0, lastElement.length - 1);
            }
        }
        Calculator.stack_pointer = Calculator.stack.length > 0 ? Calculator.stack.length - 1 : Calculator.stack_pointer;
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