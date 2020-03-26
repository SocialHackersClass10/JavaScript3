
'use strict';

{
    const root=document.getElementById('root');
    //  root.setAttribute('class','cls_unselectable');
    //
    const hdrRef=addToDOM('DIV',root,{class:'cls_colored_header'});
    const msgRef=addToDOM('SPAN',addToDOM('DIV',hdrRef
                                        ,{class:'cls_responsive_child cls_padded_area'})
                                ,{text:'API data request in progress'});
    const dtlRef=addToDOM('DIV',root,{class:'cls_responsive_parent'});
    const contribSymbolKey=Symbol('DOT.NOT: contributor list key');
    //
    const optEmulation =document.getElementById('id_opt_emulation');
    const optForceError=document.getElementById('id_opt_force_error');
    const optForceEmpty=document.getElementById('id_opt_force_empty');
    const optKeepVisible=document.getElementById('id_opt_keep_visible');
    const optAreaRef=document.getElementById('id_options_area');
    optAreaRef.hidden=!optKeepVisible.checked;
    const optButton=document.getElementById('id_options_image');
    const optBtnTitle=()=>{return `Tap to ${optAreaRef.hidden?'show':'hide'} Options`};
    optButton.title=optBtnTitle();
    optButton.onclick=()=>{
        optAreaRef.hidden=!optAreaRef.hidden;
        optButton.title=optBtnTitle();
    };
    let repoData=[],selectRef;
    const rootURL='https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
    //
    window.onload=()=>{
        fetchWrapper('repositories',(theResponse)=>{
            repoData=clone_JSON_object(theResponse)         //  theResponse
                .map(lmnt=>{return {
                    name            :getSecureValue(lmnt.name,'- not named -'),
                    description     :getSecureValue(lmnt.description,'-'),
                    forks_count     :getSecureValue(lmnt.forks_count,'0'),
                    created_at      :getSecureValue(lmnt.created_at,'-'),
                    updated_at      :getSecureValue(lmnt.updated_at,'-'),
                    html_url        :getSecureValue(lmnt.html_url),
                    contributors_url:getSecureValue(lmnt.contributors_url),
                }})
                .sort((argA,argB)=>argA.name.localeCompare(argB.name));
            createRepoSelectionList();
        },(anError)=>{
            msgRef.textContent='API data request error.';
            addToDOM('div',root,{text:anError,class:'cls_error_alert'});
        });
    };

    function createRepoSelectionList () {
        if (repoData.length<1) { msgRef.textContent='No repositories available!';
        } else {
            msgRef.textContent='HYF Repositories';
            selectRef=addToDOM('SELECT',addToDOM('DIV',hdrRef
                                        ,{class:'cls_responsive_child cls_padded_area'}));
            selectRef.innerHTML=repoData.reduce((tot,cur,idx)=>
                                    tot+`<option value="${idx}">${cur.name}</option>`,'');
            selectRef.onchange=createRepoDetails;
            createRepoDetails();
        }
    };

    function createRepoDetails() {
        const had_onchange=(selectRef.onchange!==null);
        if (had_onchange) {selectRef.onchange=null};
        const current_repoID=Number(selectRef.value);
        removeChildrenFromDOM(dtlRef);
        const repoRef=addToDOM('TABLE',addToDOM('DIV',addToDOM('DIV',dtlRef
                ,{class:'cls_responsive_child'}),{class:'cls_alt_color cls_padded_area'}));
        const theRepo=repoData[current_repoID];
        repoRef.innerHTML= tableRowHTML('Repository:',theRepo.name,theRepo.html_url)
                         + tableRowHTML('Description:',theRepo.description)
                         + tableRowHTML('Forks:',theRepo.forks_count)
                         + tableRowHTML('Created:',extractDateTime(theRepo.created_at))
                         + tableRowHTML('Updated:',extractDateTime(theRepo.updated_at));
        const listRef=addToDOM('DIV',dtlRef
                            ,{class:'cls_responsive_child cls_alt_color cls_padded_area'});
        const titleRef=addToDOM('P',listRef,{text:'API data request in progress'});
        if (theRepo[contribSymbolKey]==undefined) {
            fetchWrapper(theRepo.contributors_url,(theResponse)=>{
                theRepo[contribSymbolKey]=clone_JSON_object(theResponse)
                    .map(lmnt=>{return {
                        html_url     :getSecureValue(lmnt.html_url),
                        avatar_url   :getSecureValue(lmnt.avatar_url),
                        login        :getSecureValue(lmnt.login,'-'),
                        contributions:getSecureValue(lmnt.contributions,'0')
                    }});
                createContribList(theRepo[contribSymbolKey]);
            },(anError)=>{
                /*
                    //  ignore any possible errors
                    //  instead act as if contrib request returned empty list
                    //
                    //  because the actual repo list contains repos
                    //  that return an error when asked for contributors
                    //
                    //      repos with error in contributor links
                    //          english-booster
                    //          hyfer-infra
                    //
                    //      repo without contributors
                    //          DataStructures
                    //
                    //
                    //  BUT: make sure to console.log the link and error
                    //
                titleRef.textContent='API data request error.';
                addToDOM('DIV',listRef,{text:anError})
                finalizeRepoDetails();
                */
                console.log('API request error for url',theRepo.contributors_url);
                console.log('Error message',anError);
                theRepo[contribSymbolKey]=[];
                createContribList(theRepo[contribSymbolKey]);
            });
        } else {
            createContribList(theRepo[contribSymbolKey]);
        };
        function createContribList(theData) {
            if (theData.length<1) {titleRef.textContent='No contributors available!'}
            else {
                titleRef.innerHTML='<strong><em>Contributions</em></strong>';
                const contRef=addToDOM('TABLE',addToDOM('DIV',listRef)
                                            ,{class:'cls_span_full_parent_width'});
                let theHTML='';
                theData.forEach(lmnt=>{
                    const theIMG=`<img src="${lmnt.avatar_url}" height="64" />`;
                    theHTML+=`<tr>${tableCellHTML(theIMG)}${
                                    tableCellHTML(lmnt.login,lmnt.html_url)}${
                                    tableCellHTML(lmnt.contributions)}</tr>`;
                });
                contRef.innerHTML=theHTML;
            };
            finalizeRepoDetails();
        };
        function finalizeRepoDetails() {
            if (current_repoID!=selectRef.value) {createRepoDetails()};
            if (had_onchange) {selectRef.onchange=createRepoDetails};
        };
        function tableRowHTML(aLabel,aValue,aLink) {
            return `<tr>${tableCellHTML(aLabel,null,false,true)}${
                                            tableCellHTML(aValue,aLink,true)}</tr>`;
        };
        function tableCellHTML(theValue,theLink=null,makeBold=false,makeItalic=false) {
            let result=getValidAnchor(theValue,theLink);
            if (makeBold) {result=`<strong>${result}</strong>`};
            if (makeItalic) {result=`<em>${result}</em>`};
            return `<td>${result}</td>`;
        };
        function getValidAnchor(aText,aLink) {
            const trg='title="Tap for transition to related page." target="_blank"';
            return isUndefinedNullEmpty(aLink)?aText:`<a href=${aLink} ${trg}>${aText}</a>`;
        };
        function extractDateTime(dtString){
            return dtString.substr(0,10)+'  '+dtString.substr(11,8);
        };
    };

    function isUndefinedNullEmpty(theData) {
        return (theData==undefined)||(theData==null)||(String(theData).trim()==='');
    };

    function getSecureValue(theData,defValue='') {
        return isUndefinedNullEmpty(theData)?defValue:theData;
    };

    function clone_JSON_object(theObject) {return JSON.parse(JSON.stringify(theObject))};

    function addToDOM(theTag,theParent,theOptions={}) {
        const lmnt=document.createElement(theTag);
        Object.entries(theOptions).forEach(([aKey,aValue])=>{
                                        if (aKey==='text') {lmnt.textContent=aValue}
                                        else {lmnt.setAttribute(aKey,aValue)};
                                    });
        theParent.appendChild(lmnt);
        return lmnt;
    };

    function removeChildrenFromDOM (theLmnt) {
        while (theLmnt.hasChildNodes()) {
            removeChildrenFromDOM(theLmnt.lastChild);
            theLmnt.removeChild(theLmnt.lastChild);
        };
    };

    function fetchWrapper (theResource,onData,onError) {
        if (optEmulation.checked) {
            if (theResource==='repositories') {
                fetchTestData(optForceError.checked,optForceEmpty.checked
                                ,theResource,onData,onError);
            } else {
                fetchTestData(optForceError.checked,optForceEmpty.checked
                                ,'contributors',onData,onError);
            };
        } else {
            if (theResource==='repositories') {
                if (optForceError.checked) {
                    const targetURL='https://api.github.com/orgs/HackYourFuture/Prepos?per_page=1';
                    fetchData(targetURL,onData,onError);
                } else if (optForceEmpty.checked) {
                    fetchTestData(false,true,theResource,onData,onError);
                } else {
                    fetchData(rootURL,onData,onError);
                };
            } else {
                if (optForceError.checked) {
                    const targetURL='https://api.github.com/orgs/HackYourFuture/Prepos?per_page=1';
                    fetchData(targetURL,onData,onError);
                } else if (optForceEmpty.checked) {
                    fetchTestData(false,true,theResource,onData,onError);
                } else {
                    fetchData(theResource,onData,onError);
                };
            };
        };
    };

    function fetchData (dataURL,dataCallback,errorCallback) {
        fetch(dataURL)
            .then((theResponse)=>{
                    if (!theResponse.ok) {
                        const errPrefix=`Request Error: status=${theResponse.status} msg=`;
                        throw errPrefix+theResponse.statusText;
                    };
                    return theResponse.json();
                })
            .then((theData)=>{dataCallback(theData)})
            .catch((anError)=>{errorCallback(anError)});
    };

    function fetchTestData (produceError,produceEmpty,dataURL,dataCallback,errorCallback) {
        function getRandomNumberBetween (minValue,maxValue){return (Math.floor(Math.pow(10,14)*
                                    Math.random()*Math.random())%(maxValue-minValue+1))+minValue};
        function delayedCallback(argDelay,argCB,argData) {setTimeout(()=>{argCB(argData)},argDelay)};
        const repositories = [
            {name:'One Thing', description:'description of 1st One Thing', forks_count:7,
                    created_at:'2005-04-24T07:20:48Z', updated_at:'2019-01-11T18:21:37Z',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
            {name:'one Thing', description:'description of 2nd one Thing', forks_count:3,
                    created_at:'2006-03-23T07:19:38Z', updated_at:'2017-09-05T15:52:37Z',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
            {name:'one thing', description:'description of 3rd one thing', forks_count:1,
                    created_at:'2008-01-21T07:17:18Z', updated_at:'2013-11-15T11:02:37Z',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
            {name:'One thing', description:'description of 4th One thing', forks_count:6,
                    created_at:'2007-02-22T07:18:28Z', updated_at:'2015-07-25T13:48:37Z',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
            {name:'another thing', description:'another thing (missing link)', forks_count:4,
                    created_at:'2017-04-03T17:26:16Z', updated_at:'2020.01.11T05:46:02Z',
                    },
            {name:'that’s the thing', description:'description of that’s the thing', forks_count:1,
                    created_at:'2016-08-07T19:17:31Z', updated_at:'2017-09-14T10:34:47Z',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
            {name:'The others', description:'description of The others', forks_count:7,
                    created_at:'2014-12-25T05:57:35Z', updated_at:'2020-02-13T21:31:47Z',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
            {name:'JustLookAtThisGargantuanRepositoryNameWithEmptyDescription', description:'   ', forks_count:9,
                    created_at:'2011-10-04T21:49:54Z', updated_at:'2013-05-10T16:01:23Z',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
            {name:'that thing again', description:'description of that thing again', forks_count:3,
                    created_at:'2017-03-14T02:20:29Z', updated_at:'2020-03-01T06:34:36Z',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
            {name:'just some more', description:'just some more (link is null)', forks_count:5,
                    created_at:'2015-10-12T00:14:52Z', updated_at:'2018-10-20T10:31:57Z',
                    html_url:null},
            {name:'everything', description:'everything (empty link)', forks_count:4,
                    created_at:'2016-03-30T01:25:17Z', updated_at:'2019-04-30T15:42:34Z',
                    html_url:' '},
            //  {name:'everything else', description:'description of everything else', forks_count:4,
            {name:'everything else (missing description and dates)', forks_count:4,
                    //created_at:'2017-09-23T21:15:20Z', updated_at:'2020-01-11T15:02:51Z',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
            //{name:'another life', description:'description of another life', forks_count:3,
            {name:'another life  (null description & dates)', description:null, forks_count:3,
                    //created_at:'2015-07-17T22:41:40Z', updated_at:'2017-05-28T19:04:24Z',
                    created_at:null, updated_at:'',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
            {name:'one more please', description:'description of one more please', forks_count:2,
                    created_at:'2014-02-28T12:54:51Z', updated_at:'2020-02-15T19:51:54Z',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
            {name:'Another brand', description:'description of another brand', forks_count:8,
                    created_at:'2013-06-21T04:36:50Z', updated_at:'2018-12-16T07:11:13Z',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
            {name:'useless things', description:'description of useless things', forks_count:6,
                    created_at:'2011-01-31T09:23:38Z', updated_at:'2017-11-28T10:34:16Z',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
            {name:'good to know', description:'description of good to know', forks_count:0,
                    created_at:'2019-02-23T06:32:43Z', updated_at:'2020-01-05T02:09:21Z',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
            {name:'turn around', description:'description of turn around', forks_count:2,
                    created_at:'2013-11-19T17:34:22Z', updated_at:'2016-07-30T16:48:14Z',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
            {name:'turn some more', description:'description of turn some more', forks_count:0,
                    created_at:'2014-05-09T15:29:00Z', updated_at:'2019-09-04T12:02:45Z',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
            {name:' ', description:'description of (empty name)', forks_count:' ',
                    created_at:'2015.06.04T17:50:07Z', updated_at:'2020-02-01T01:29:33Z',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
            {           description:'description of (missing name)',
                    created_at:'2015.06.04T17:50:07Z', updated_at:'2020-02-01T01:29:33Z',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
            {name:null, description:'description of (null name)', forks_count:null,
                    created_at:'2015.06.04T17:50:07Z', updated_at:'2020-02-01T01:29:33Z',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
            {name:'abusing power', description:'everything you ever wanted to know but where afraid to ask'
                    , forks_count:12,
                    created_at:'2011-11-22T05:05:18Z', updated_at:'2020-03-01T06:20:51Z',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
            {name:'what a name', description:'description of what a name', forks_count:6,
                    created_at:'2017-12-10T08:37:15Z', updated_at:'2017-12-30T17:32:15Z',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
            {name:'what goes there', description:'description of what goes there', forks_count:0,
                    created_at:'2012-02-14T15:01:08Z', updated_at:'2020-02-25T01:41:41Z',
                    html_url:'https://github.com/SocialHackersCodeSchool'},
        ];
        const contrib_img_url = [
            'https://avatars3.githubusercontent.com/u/8708858?v=4',
            'https://avatars3.githubusercontent.com/u/969026?v=4',
            'https://avatars3.githubusercontent.com/u/33282467?v=4',
            'https://avatars0.githubusercontent.com/u/651290?v=4',
            'https://avatars2.githubusercontent.com/u/17527017?v=4',
            'https://avatars0.githubusercontent.com/u/13186712?v=4',
            'https://avatars0.githubusercontent.com/u/15912395?v=4',
            'https://avatars0.githubusercontent.com/u/1047135?v=4',
            'https://avatars3.githubusercontent.com/u/45293?v=4',
            'https://avatars3.githubusercontent.com/u/22626039?v=4',
            'https://avatars3.githubusercontent.com/u/658656?v=4',
            'https://avatars3.githubusercontent.com/u/988347?v=4',
            'https://avatars3.githubusercontent.com/u/33317975?v=4',
            'https://avatars0.githubusercontent.com/u/25272822?v=4',
            'https://avatars0.githubusercontent.com/u/6762913?v=4',
            'https://avatars2.githubusercontent.com/u/33654086?v=4',
            'https://avatars1.githubusercontent.com/u/10981911?v=4',
            'https://avatars0.githubusercontent.com/u/43432?v=4',
            'https://avatars0.githubusercontent.com/u/32513012?v=4',
            'https://avatars2.githubusercontent.com/u/7113309?v=4',
            'https://avatars0.githubusercontent.com/u/2788771?v=4',
        ];
        if (produceError) {
            delayedCallback(567,errorCallback,'Error: status=707 msg="Example error".');
        } else if (produceEmpty) {
            delayedCallback(678,dataCallback,[]);
        } else {
            let theData=[];
            if (dataURL=='repositories') {theData=clone_JSON_object(repositories)}
            else if (dataURL=='contributors') {
                const resultLength=getRandomNumberBetween(0,20);
                for (let i=0; i<=resultLength; i++) {
                    const theLink=contrib_img_url.splice(getRandomNumberBetween(0,contrib_img_url.length-1),1);
                    theData.push({
                        html_url      : theLink,
                        avatar_url    : theLink,
                        login         : Math.random().toString(36).substring(2),
                        contributions : getRandomNumberBetween(1,99)
                    });
                }
            };
            delayedCallback(789,dataCallback,theData);
        };
    };

};


;

