
    function requestByXHR (theURL,onSuccess,onFailure) {
        let myXHR=new XMLHttpRequest();
        myXHR.onreadystatechange=function() {
            if (myXHR.readyState===XMLHttpRequest.DONE){
                if (myXHR.status===200) {
                    //  console.log('XHR call success! ');
                    //  console.log(JSON.parse(myXHR.responseText));
                    onSuccess(JSON.parse(myXHR.responseText));
                } else {
                    //  console.log(`XHR call failed with status=[${myXHR.status}] `);
                    //  if (myXHR.statusText) {console.log(myXHR.statusText)};
                    onFailure('XHR',myXHR.status,myXHR.statusText);
                };
            };
        };
        myXHR.open("GET",theURL,true);
        myXHR.send();
    };

;

