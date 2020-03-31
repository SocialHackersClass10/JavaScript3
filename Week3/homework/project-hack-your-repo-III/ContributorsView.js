'use strict';

{
  //  DOT.NOT:JS-3:w-3:project: include additional utility functions
  const { createAndAppend , createTableRowHTML ,
          getValidValue   , createTableCellObject } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
      //  DOT.NOT:JS-3:w-3:project: additional rendering / styling elements
      const wrapper=createAndAppend('DIV',this.container
                                              ,{id:'id_wrap_contributors'});
      this.titleRef=createAndAppend('P',wrapper,{id:'id_title_contributors'});
      this.dataList=createAndAppend('TABLE',wrapper
                                              ,{id:'id_table_contributors'});
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      //  DOT.NOT:JS-3:w-3:project: implement contributors rendering
      const cntrbTitle=(cnt)=>`${cnt<1?'No':cnt} Contributor${cnt===1?'':'s'}`;
      this.titleRef.innerHTML=cntrbTitle((contributors.length||0));
      let theHTML='';
      if ((contributors) && (contributors.length>0)) {
        theHTML=contributors.reduce((tot,cur)=>tot+createTableRowHTML([
          createTableCellObject(`<img src="${getValidValue(cur.avatar_url)
                                            }" height="64" />`),
          createTableCellObject(getValidValue(cur.login),
                                getValidValue(cur.html_url),true),
          createTableCellObject(getValidValue(cur.contributions,0)),]),'');
      };
      this.dataList.innerHTML=theHTML;
    };

  }

  window.ContributorsView = ContributorsView;
}
