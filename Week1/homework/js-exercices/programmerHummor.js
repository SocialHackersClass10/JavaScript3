//function with XMLHTTPREQUEST

logApiHummor();
function logApiHummor(){
    var xhttp;
    var myData;
    var image = document.createElement("img");
    
    var body=document.body;
    
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
                myData=(JSON.parse(xhttp.responseText)[0]);
                image.src=myData.url;
                console.log(myData);
            }
        };
        xhttp.open("GET","https://jsonplaceholder.typicode.com/photos", true);
        xhttp.send();
    }catch{
        console.log("une erreur c'est produite");
    }
    body.appendChild(image);
}


//function with axios

 (async function logApiHummor(){
    var image = document.createElement("img");
    try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos')
        console.log(response.data[0]);
        image.src=response.data[0].url;
    }catch{
        console.log("une erreur c'est produite");
    }
    
    
    var body=document.body;
    body.appendChild(image);
  })();

