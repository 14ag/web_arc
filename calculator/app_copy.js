//figure out whatthe website does okay... a calculator

let op=[]
let i=0
function inputHandler(x,y){
    if (y=="n"){
        console.log(x)
        // op[i]+=x
    } else { 
    switch (y) {
        case "ac":
            console.log(y)
            break;    
        default:
            console.log(y)
            break;
    }
    
    }
}

//get elements by id class tag ... do query selector (all)
let buttons = Array.from(document.querySelectorAll('button'))
let screen1 = document.querySelector('.input');
let screen2 = document.querySelector('.result');


//create elements, attributes, tags
buttons.forEach(function(x){
    x.addEventListener('click',function(){
        screen1.value += x.value
        inputHandler(x.value,x.name)
        })
    })
