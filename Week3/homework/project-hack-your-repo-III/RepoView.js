'use strict';

{
  //  DOT.NOT:JS-3:w-3:project: include additional utility functions
  const { createAndAppend , createTableRowHTML ,
          getValidValue   , createTableCellObject } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
      //  DOT.NOT:JS-3:w-3:project: additional rendering / styling elements
      this.dataList=createAndAppend('TABLE',createAndAppend('DIV'
                                  ,this.container,{id:'id_wrap_repositories'})
                                  ,{id:'id_table_repositories'});
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
      //  DOT.NOT:JS-3:w-3:project: implement repository info rendering
      const cleanDT=(dtStr)=>getValidValue(dtStr).replace(/[TZ]/g,' ').trim();
      this.dataList.innerHTML=[
        [ createTableCellObject('Repository','',false,true),
          createTableCellObject(getValidValue(repo.name),
                                getValidValue(repo.html_url),true), ],
        [ createTableCellObject('Description','',false,true),
          createTableCellObject(getValidValue(repo.description),'',true), ],
        [ createTableCellObject('Forks','',false,true),
          createTableCellObject(getValidValue(repo.forks_count,0),'',true), ],
        [ createTableCellObject('Created','',false,true),
          createTableCellObject(cleanDT(repo.created_at),'',true), ],
        [ createTableCellObject('Updated','',false,true),
          createTableCellObject(cleanDT(repo.updated_at),'',true), ],
      ].reduce((tot,cur)=>tot+createTableRowHTML(cur),'');
    };

  }

  window.RepoView = RepoView;
}
