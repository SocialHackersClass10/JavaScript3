
{
    'use strict';

    let lmntRef=document.getElementById('id_page_header');
    lmntRef.style.backgroundColor='gold';
    document.getElementById('id_page_title').innerHTML=lmntRef.innerHTML=
        `(Homework: Javascript 3 - week 1) - (Exercise 01: randomuser API with XHR & Axios)`;
    lmntRef.style.borderRadius='12px';
    document.body.style.backgroundColor='#102030';

    const symbolEuro='€';
    const symbolApostrophe='’';     /*   ’   or ´   or ‘  */

    const xhrListRef=document.getElementById('id_list_xhr_data');
    const axiosListRef=document.getElementById('id_list_axios_data');
    const targetURL='https://www.randomuser.me/api';

    apiCallThroughXHR();
    apiCallThroughAxios();

    function apiCallThroughXHR(){
        xhrListRef.innerHTML=createProgressHTML();
        requestByXHR(targetURL,(apiData)=>{xhrListRef.innerHTML=createDataHTML(apiData.results[0])}
            ,(apiMethod,errorStatus,errorMsg)=>{xhrListRef.innerHTML=createErrorHTML(errorStatus,errorMsg)});
    };

    function apiCallThroughAxios() {
        axiosListRef.innerHTML=createProgressHTML();
        requestByAxios(targetURL,(apiData)=>{axiosListRef.innerHTML=createDataHTML(apiData.results[0])}
            ,(apiMethod,errorStatus,errorMsg)=>{axiosListRef.innerHTML=createErrorHTML(errorStatus,errorMsg)});
    };

    function createDataHTML(theData) {
        return `<tr><td>Name</td><td>(${theData.name.title}) ${
                                         theData.name.first} ${theData.name.last}</td></tr> `
             + `<tr><td>Gender</td><td>${theData.gender}</td></tr> `
             + `<tr><td>Born</td><td>${theData.dob.date.substr(0,10)}</td></tr> `
             + `<tr><td>Age</td><td>${theData.dob.age}</td></tr> `
             + `<tr><td>Email</td><td>${theData.email}</td></tr> `
             + `<tr><td>Country</td><td>${theData.location.country}</td></tr> `
             + `<tr><td>City</td><td>${theData.location.city}</td></tr> `;
    }

    function createErrorHTML(theStatus,theMessage) {
        return '<tr><td>Result</td><td>Unsuccessful</td></tr> '
             + '<tr><td></td><td></td></tr> '
             + `<tr><td>Status code</td><td>${theStatus}</td></tr> `
             + '<tr><td></td><td></td></tr> '
             + `<tr><td>Message</td><td>${theMessage}</td></tr> `;
    }

    function createProgressHTML()
        {return '<tr><td>Request</td><td>Sending in progress...</td></tr> ';}

}


;

