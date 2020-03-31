'use strict';

{
  class Util {
    /**
     * Creates an element, optionally setting its attributes, and appends
     * the element to a parent.
     * @param {string} name The tag name of the element to create.
     * @param {HTMLElement} parent The parent element.
     * @param {Object} options An object with attribute names and values.
     */
    static createAndAppend(name, parent, options = {}) {
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

    //  DOT.NOT:JS-3:w-3:project: implement utility method getValidValue()
    /**
     * accepts 2 parameters: theVal and defVal
     * returns defVal if theVal was null or undefined, else returns theVal
     * @param {any} theVal The value to validate.
     * @param {any} defVal The value to return in case theVal found invalid.
     */
    static getValidValue(theVal,defVal='') {
      return (theVal==null)||(theVal==undefined)||(!theVal)?defVal:theVal;
    };

    //  DOT.NOT:JS-3:w-3:project: implement utility method createTableCellObject()
    /**
     * accepts 4 parameters describing the data and style of a table cell
     *    returns an object that is a suitable element
     *    for the array parameter of the next method (createTableRowHTML)
     * @param {string} aText The text of the cell.
     * @param {string} aLink The link this cell points to (creates an anchor).
     * @param {boolean} doBold whether to show the text bold or not.
     * @param {boolean} doSlant whether to show the text slanted (italic) or not.
     */
    static createTableCellObject(aText='',aLink=null,doBold=false,doSlant=false) {
      return { text:aText, link:aLink, bold:doBold, slant:doSlant };
    };

    //  DOT.NOT:JS-3:w-3:project: implement utility method createTableRowHTML()
    /**
     * accepts an array of objects, each of which is describing a table cell
     * returns a string that contains HTML structured tags
     *    describing a complete table row based on the input array
     *    and that can be assigned directly to a (table)DOMelement.innerHTML
     * @param {array} rowData The array of cell dascription objects.
     */
    static createTableRowHTML(rowData=[]) {
      return rowData.reduce((tot,cur)=>
          tot+getCellHTML(cur.text,cur.link,cur.bold,cur.slant)
        ,'<tr>')+'</tr>';
      function getCellHTML(aText,aLink=null,makeBold=false,makeItalic=false) {
        let result=createAnchorHTML(aText,aLink);
        if (makeBold) {result=`<strong>${result}</strong>`};
        if (makeItalic) {result=`<em>${result}</em>`};
        return `<td>${result}</td>`;
      };
      function createAnchorHTML(txt,ref) {
        const trg='title="Tap for transition to related page." target="_blank"';
        return noValue(ref)?txt:`<a href=${ref} ${trg}>${txt}</a>`;
      };
      function noValue(val) {
        return (val==undefined)||(val==null)||(String(val).trim()==='');
      };
    };

  }

  window.Util = Util;
}

