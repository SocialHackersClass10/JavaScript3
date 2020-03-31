
{
    'use strict';

    let lmntRef=document.getElementById('id_page_header');
    lmntRef.style.backgroundColor='gold';
    document.getElementById('id_page_title').innerHTML=lmntRef.innerHTML=
        `(Homework: Javascript 3 - week 1) - (Exercise 02: Load image given by API with XHR & Axios)`;
    lmntRef.style.borderRadius='12px';
    document.body.style.backgroundColor='#102030';
    lmntRef=document.getElementById('id_page_info');
    lmntRef.style.backgroundColor='gold';
    lmntRef.innerHTML='Using randomuser’s api for images since xkcd’s api is throwing CORB';
    lmntRef.style.borderRadius='12px';

    const symbolEuro='€';
    const symbolApostrophe='’';     /*   ’   or ´   or ‘  */

    const dataTableRef=document.getElementById('id_api_data_table');
    const dataImageRef=document.getElementById('id_api_data_image');

    const targetURL='https://www.randomuser.me/api';

    apiCallThroughXHR();

    function apiCallThroughXHR(){
        showRequestStart('XHR');
        requestByXHR(targetURL,showRequestData,showRequestError);
    };

    function apiCallThroughAxios() {
        showRequestStart('Axios');
        requestByAxios(targetURL,showRequestData,showRequestError);
    };

    function showRequestStart(theMethod) {
        resetInfo();
        dataTableRef.innerHTML=
              '<tr><td>Request</td><td>in progress...</td></tr> '
            + '<tr><td></td><td></td></tr> '
            + `<tr><td>from</td><td>${targetURL}</td></tr> `
            + '<tr><td></td><td></td></tr> '
            + `<tr><td>with</td><td>${theMethod}</td></tr> `;
    };

    function showRequestError(theMethod,theStatus,theMessage) {
        resetInfo();
        dataTableRef.innerHTML=
              `<tr><td>Request</td><td>Unsuccessful</td></tr> `
            + '<tr><td></td><td></td></tr> '
            + `<tr><td>from</td><td>${targetURL}</td></tr> `
            + '<tr><td></td><td></td></tr> '
            + `<tr><td>with</td><td>${theMethod}</td></tr> `
            + '<tr><td></td><td></td></tr> '
            + `<tr><td>Status code</td><td>${theStatus}</td></tr> `
            + '<tr><td></td><td></td></tr> '
            + `<tr><td>Message</td><td>${theMessage}</td></tr> `;
    };

    function showRequestData(theData) {
        const myData=theData.results[0];
        resetInfo();
        dataTableRef.innerHTML=
               `<tr><td>Name</td><td>(${myData.name.title}) ${
                                         myData.name.first} ${myData.name.last}</td></tr> `
             + `<tr><td>Gender</td><td>${myData.gender}</td></tr> `
             + `<tr><td>Born</td><td>${myData.dob.date.substr(0,10)}</td></tr> `
             + `<tr><td>Age</td><td>${myData.dob.age}</td></tr> `
             + `<tr><td>Email</td><td>${myData.email}</td></tr> `
             + `<tr><td>Country</td><td>${myData.location.country}</td></tr> `
             + `<tr><td>City</td><td>${myData.location.city}</td></tr> `;
        dataImageRef.setAttribute('src',myData.picture.large);
        dataImageRef.hidden=false;
    };

    function resetInfo() {
        dataTableRef.innerHTML='';
        dataImageRef.hidden=true;
    };
};


;

