function calcular(){
    let edad = document.getElementById("edad").value;
    let mayor;
    if(edad >= 18){
        mayor = "Eres mayor de edad";
        
    }else {
        mayor = "Eres menor de edad";
        
    }
    alert(mayor);
}

