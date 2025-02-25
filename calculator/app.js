//get elements by id class tag ... do query selector (all)
let buttons = Array.from(document.querySelectorAll('button'))
let input_screen = document.querySelector('.input');
let result_screen = document.querySelector('.result');
let history_content = document.querySelector('.history_content')
let card = document.querySelector('.history')
let stack0
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
            if (x.name != "equals") {
                input_screen.value = stack.join("")
            }

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

    stack0 = stack.join(""); //to be used in history

    //check if last char is NaN
    if (order.includes(stack[stack_pointer])) {
        return;
    }
    // In app.js (or similar client-side file)

    async function calculateExpression(expression) {
        try {
            const response = await fetch('http://localhost:3000/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ expression }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data.result); // The calculated result from the server
            //Update UI with data.result
        } catch (error) {
            console.error('Error:', error);
            //Handle error here
        }
    }

    // Example usage:
    let testExpression = "2+2";
    calculateExpression(testExpression)
    stack = [getAnswer(stack.join(""))];
    stack_pointer = 0
    result_screen.value = stack.join("")
    history_content.innerHTML += `<p><span class="q">${stack0}</span><br><span class="a"><b>${stack}</b></span></p>`
};



function del() {
    if (stack.length != 0) {
        if (stack[stack.length - 1].toString().length <= 1) {
            stack.pop()
        } else {
            stack[stack.length - 1] = stack[stack.length - 1].substring(0, stack[stack.length - 1].length - 1)
        }
    }
    stack_pointer = stack.length > 0 ? stack.length - 1 : stack_pointer

}



function history() {
    // add the entry to unordered list
    card.style.display = "block"
}

function close() {
    card.style.display = "none"
}


function ac() {
    stack = [""]
    stack_pointer = 0
    result_screen.value = 0

}



