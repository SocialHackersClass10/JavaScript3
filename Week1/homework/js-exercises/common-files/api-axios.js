
    function requestByAxios (theURL,onSuccess,onFailure) {
        axios.get(theURL)
        .then(function(aResponse) {
            //  console.log('Axios call success! ');
            //  console.log(aResponse);
            onSuccess(aResponse.data);
        })
        .catch(function(anError) {
            //  console.log('Axios call failed with following message: ');
            //  console.log(anError);
            onFailure('Axios',undefined,anError);
        });
    };

;

