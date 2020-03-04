//function with XMLHTTPREQUEST

logApiData1();
function logApiData1(){
    var xhttp;
    try{
        xhttp = new XMLHttpRequest();
    }catch(e){
        try{
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }catch(e){console.log("Erreur")}
    }
    try{
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log((JSON.parse(xhttp.responseText))[0]);
            }
        };
        xhttp.open("GET","https://jsonplaceholder.typicode.com/users", true);
        xhttp.send();
    }catch{
        console.log("une erreur c'est produite");
    }
}

//function with axios

const axios = require ('axios');
 (async function logApiData1(){
    try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        console.log(response.data[0]);
    }catch{
        console.log("une erreur c'est produite");
    }
  })()

