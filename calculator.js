const display=document.getElementById('display')
    


function btn(input){
    display.value+=input;

}
function cleardisplay(){
    display.value="";
}
function calculate(){
    display.value=eval(display.value);
}
    
function backspace(){
    let input=document.getElementById("display");
    input.value=input.value.slice(0,-1)
}