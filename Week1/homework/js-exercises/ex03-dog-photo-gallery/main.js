
{
    'use strict';

    let lmntRef=document.getElementById('id_page_header');
    document.getElementById('id_page_title').innerHTML=lmntRef.innerHTML=
        `(Homework: Javascript 3 - week 1) - (Exercise 03: Dog photo API with XHR & Axios)`;

    const symbolEuro='€';
    const symbolApostrophe='’';     /*   ’   or ´   or ‘  */

    const dataTextRef=document.getElementById('id_api_status_text');
    const dataListRef=document.getElementById('id_api_data_list');

    const targetURL='https://dog.ceo/api/breeds/image/random';

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
        dataTextRef.innerHTML=`API Request at ${targetURL} by ${theMethod}`;
    };

    function showRequestError(theMethod,theStatus,theMessage) {
        dataTextRef.innerHTML=theMethod+` Request failed with status=[${
                                    theStatus}] and message=[${theMessage}] `;
    };

    function showRequestData(theData) {
        const itemRef=document.createElement('LI');
        dataListRef.appendChild(itemRef);
        const imgRef=document.createElement('IMG');
        imgRef.setAttribute('src',theData.message);
        itemRef.appendChild(imgRef);
        dataTextRef.innerHTML='Concluded';
    };
};


;

