//figure out whatthe website does okay... a calculator

let op = []
let i = 0
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
//create elements, attributes, tags
buttons.forEach(function (x) {
    x.addEventListener('click', function () {
        screen1.value += x.value
        inputHandler(x.value, x.name, x.class)
    })
})
