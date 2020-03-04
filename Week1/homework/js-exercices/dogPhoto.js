//function with XMLHTTPREQUEST

function ranImg() {
  try{
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      
      let myUl=document.createElement('ul');
      let myLi=document.createElement('li');
      let myImg=document.createElement('img');
      let myDiv=document.getElementById('btn');
      myImg.src=((JSON.parse(xhttp.responseText)).message);
      myImg.style.width="200px";
      myImg.style.height="200px";
      myLi.appendChild(myImg);
      myUl.appendChild(myLi);
      myDiv.appendChild(myUl);
      
    }
    };
    xhttp.open("GET", "https://dog.ceo/api/breeds/image/random", true);
    xhttp.send();
  }catch(e){console.log("une erreur s'est produite");}
}


//function with AXIOS

async function ranImg1() {
  
     try{ 
        const response = await axios.get('https://dog.ceo/api/breeds/image/random');
        let myUl=document.createElement('ul');
        let myLi=document.createElement('li');
        let myImg=document.createElement('img');
        let myDiv=document.getElementById('btn');
        myImg.src=response.data.message;
        myImg.style.width="200px";
        myImg.style.height="200px";
        myLi.appendChild(myImg);
        myUl.appendChild(myLi);
        myDiv.appendChild(myUl); 
     }catch{
        console.log("une erreur c'est produite");
     }  
}
