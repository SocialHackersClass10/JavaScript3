
'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function renderRepoDetails(repo, ul) {
    createAndAppend('li', ul, { text: repo.name });
  }

    function renderRepoData(repoData,ul) {
        const extractDateTime=(dtString)=>dtString.substr(0,10)+'  '+dtString.substr(11,8);
        const rowHTML=(aLabel,aValue,aLink)=>{
                const anStr='title="Click for transition to related page." target="_blank"';
                aValue=((aValue==undefined)||(aValue==null)||(String(aValue).trim()===''))
                    ?'-':aValue;
                aValue=((aLink==undefined)||(aLink==null)||(String(aLink).trim()===''))
                    ?aValue:`<a href=${aLink} ${anStr}>${aValue}</a>`;
                return `<tr><td><em>${aLabel}<em></td><td><strong>${aValue}<strong></td></tr>`
            };
        repoData.sort((argA,argB)=>argA.name.localeCompare(argB.name));
        for (let i=0; i<10; i++) {
            const symbolExpandCollapse=(isHidden)=>isHidden?'➕':'➖';   //  or   '⏬ ':'⏫ '
            const listItemRef=createAndAppend('LI',ul);
            const initialHidden=false;
            const itemRef=createAndAppend('DIV',listItemRef,{id:'id'+'_data_item_'+i
                                ,class:'cls_hover_highlight',text:`(${
                                        symbolExpandCollapse(initialHidden)}) `+repoData[i].name
                                ,title:'Click to expand / collapse the details'});
            itemRef.onclick=function(e) {
                                const trgtRef=document.getElementById(this.id+'_detail');
                                trgtRef.hidden=!trgtRef.hidden;
                                this.textContent='('+symbolExpandCollapse(trgtRef.hidden)
                                                    +this.textContent.substr(2);
                            }
            const detailRef=createAndAppend('DIV',listItemRef
                                                ,{id:itemRef.id+'_detail',class:'cls_alt_color'});
            detailRef.hidden=initialHidden;
            const tableRef=createAndAppend('TABLE',detailRef);
            tableRef.innerHTML= rowHTML('Name (and link):',repoData[i].name,repoData[i].html_url)
                              + rowHTML('Description:',repoData[i].description)
                              + rowHTML('Forks:',repoData[i].forks_count)
                              + rowHTML('Created:',extractDateTime(repoData[i].created_at))
                              + rowHTML('Updated:',extractDateTime(repoData[i].updated_at));
        };
    };

  function main(url) {
    const root=document.getElementById('root');
    createAndAppend('DIV',root,{class:'cls_colored_header',text:'HYF Repositories'});
    root.setAttribute('class','cls_unselectable');
    fetchJSON(url, (err, repos) => {
      if (err) {
        createAndAppend('div',root,{text:err.message,class:'alert-error'});
        return;
      }
      renderRepoData(repos,createAndAppend('UL',root));
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
};


;

