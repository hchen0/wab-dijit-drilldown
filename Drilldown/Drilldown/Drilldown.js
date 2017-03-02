Function.prototype.bind||(Function.prototype.bind=function(a){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var b=Array.prototype.slice.call(arguments,1),c=this,d=function(){},e=function(){return c.apply(this instanceof d?this:a,b.concat(Array.prototype.slice.call(arguments)))};return this.prototype&&(d.prototype=this.prototype),e.prototype=new d,e}),define(["dojo/_base/declare","dojo/_base/lang","dijit/_Widget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","esri/dijit/Search","dojo/dom-construct","dijit/layout/ContentPane","dijit/TitlePane","dojox/widget/TitleGroup","dojo/on","dojo/Deferred","dojo/query","dojo/dom-style","dojo/keys","dojo/NodeList-data"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var p=function(a){return void 0===a||null===a||""===a},q=function(a,c,d){var e=g.toDom("<span class='drilldownResult'>"+a+"</span>");return m(e).data("result",b.mixin(c,{sourceIndex:d})),e},r=function(a,b){return!p(a)&&a.length>0&&b?"<span class='drilldownCount'>"+a.length+"</span>":""},s=function(a,b,c,d){var e=0,f=0,g=new j,k=a.Addresses;for(e=0,f=k.length;e<f;e+=1)g.addChild(new h({content:["<span class='drilldownResultIcon'></span>",q(k[e].address,k[e],d)],tabindex:0}));b.addChild(new i({title:r(k,c)+"<span class='drilldownTitle'>"+a.Description+"</span>",content:g,open:!1,tabindex:0}))},t=function(a){return!p(a)&&a.length>1},u=function(a,b,c){var d,e,f=0,g=0,i=new j;if(t(a.Addresses)){for(d=a.Addresses,f=0,g=d.length;f<g;f++)t(d[f].Addresses)?s(d[f],i,b,c):(e=p(d[f].address)?q(d[f].Addresses[0].address,d[f].Addresses[0],c):q(d[f].address,d[f],c),i.addChild(new h({content:["<span class='drilldownResultIcon'></span>",e],tabindex:0})));i.startup()}else p(a.Addresses[0].address)?t(a.Addresses[0].Addresses)&&s(a.Addresses[0],i,b,c):i=new h({content:q(a.Addresses[0].address,a.Addresses[0],c),tabindex:0});return i},v=function(a,b){var c=0,d=0,e=new j,f=new j;for(c=0,d=a.length;c<d;c++)f.addChild(new h({content:["<span class='drilldownResultIcon'></span>",q(a[c].address,a[c],b)],tabindex:0}));return e.addChild(new i({title:"Results found: "+d,content:f,open:!0,tabindex:0})),e.startup(),e},w=function(a,b,c){this.get("contentSet")===!1&&(this.set("content",u(a,b,c)),this.set("contentSet",!0))},x=function(a){var b=!1;return 1===a.length&&1===a[0].Addresses.length&&(p(a[0].Addresses[0].Addresses)&&(b=!0),p(a[0].Addresses[0].Addresses)||1!==a[0].Addresses[0].Addresses.length||(b=!0)),b};return a([c,d,e,f],{baseClass:"drilldown",widgetsInTemplate:!0,resultsElement:null,_titleGroups:[],_tabIndex:0,showCounts:!1,flatMatch:!1,erros:null,constructor:function(b){var c=this;a.safeMixin(this,b),k(this,"search-results",function(a){p(a)||p(a.errors)||(c.errors=a.errors)})},destroy:function(){this._clearPicklist(),this.inherited(arguments)},search:function(){var a=this,b=new l;return this.errors=null,this.inherited(arguments).then(function(c){a._buildPickListUi(c),b.resolve()}),b.promise},clear:function(){this._clearPicklist(),this.inherited(arguments),this.errors=null},_hydrateResults:function(a){return a.PickListItems?a:this.flatMatch?a:this.inherited(arguments)},_formatResults:function(a,b,c){var d={activeSourceIndex:b,value:c,numResults:0,numErrors:0,errors:null,results:null},e={},f={},g=0;if(a&&!p(a[0].PickListItems)){if(b===this._allIndex){for(g=0;g<a.length;g++)p(this.sources[g].locator.locatorType)?d=this.inherited(arguments):p(a[g].PickListItems)||(f[g]=a[g],d.numResults+=a[g].PickListItems.length);return d.results=f,d.err=e,d}return p(this.activeSource.locator.locatorType)?this.inherited(arguments):(f[b]=a[0],d.numResults+=a[0].PickListItems.length,d.results=f,d.err=e,d)}return this.inherited(arguments)},_clearPicklist:function(){var a,b;if(this._titleGroups.length>0){for(a=0,b=this._titleGroups.length;a<b;a++)this._titleGroups[a].destroy();this._titleGroups=[],p(this.resultsElement)||n.set(this.resultsElement,"height",0)}},_noResults:function(a){var b,c="";if(p(this.errors)||p(this.errors[this.activeSourceIndex]))this.inherited(arguments);else{switch(this.errors[this.activeSourceIndex].details[0]){case"NoMatchTooVague":c=this.value+": No match, too vague"}b=g.create("div",{className:this.css.searchNoResultsBody}),g.create("div",{className:this.css.searchNoResultsHeader,textContent:"No Results"},b),g.create("div",{className:this.css.searchNoResultsText,textContent:c},b),g.place(b,this.noResultsMenuNode,"only")}},_showNoResults:function(){this._noResults(this.value),this._showNoResultsMenu()},_isSingleResult:function(a){var b,c,d,e=0;for(d in a)a.hasOwnProperty(d)&&(e++,c=d);return 1!==e||p(a[c].PickListItems)?!(1!==e||!this.flatMatch)&&1===a[c].length:(b=a[c].PickListItems,x(b))},_createPremise:function(a,b,c,d,e){var f=new i({title:r(a.Addresses,b)+"<span class='drilldownTitle'>"+a.Description+"</span>",open:!1,contentSet:!1});return d?(f.set("open",!0),f.set("contentSet",!0),f.set("content",u(a,b,e))):f.own(f.on("click",c.bind(f,a,b,e))),f},_createResultsContainer:function(a,b,c){var d,e,f,h;return a?(f=g.create("div",{id:b+this.sources[b].name},c,"last"),e=g.create("div",{id:b},f,"last"),h=new j(null,e),this._titleGroups.push(h),d=new j,h.addChild(new i({title:this.sources[b].name,open:!1,content:d}))):(e=g.create("div",{id:b},c,"last"),d=new j(null,e)),d},_buildPickListUi:function(a){var b,c,d,e,f=this,h=0,i=0,j=!1,n=!1,q=new l,r=function(a){e=f._hydrateResult(a.result,a.result.sourceIndex,!1),f.select(e),f._clearPicklist()};if(this._clearPicklist(),p(this.resultsElement)||g.destroy(this.resultsElement),this.resultsElement=g.create("div",{class:"arcgisSearch searchGroup picklistResults"},this.domNode,"last"),f.activeSourceIndex!==this._allIndex&&this._isSingleResult(a))e=this.flatMatch?this._hydrateResult(a[f.activeSourceIndex][0],f.activeSourceIndex,!1):this._hydrateResult(a[f.activeSourceIndex].PickListItems[0].Addresses[0],f.activeSourceIndex,!1),this.select(e);else{if(p(a))j=!0;else{for(d in a)if(a.hasOwnProperty(d))if(p(a[d])||p(a[d].PickListItems))this.flatMatch&&!p(a[d])&&a[d].length>0?(i=a[d].length,c=this._createResultsContainer("all"===this.activeSourceIndex,d,this.resultsElement),this._titleGroups.push(c),c.addChild(v(a[d],d)),j=!1):j=!(a[d].length>0&&!p(this.activeSource.locator)&&!p(this.activeSource.locator.declaredClass)&&"esri.tasks.locator"===this.activeSource.locator.declaredClass.toLowerCase());else if(b=a[d].PickListItems,i=b.length,i>0)for(c=this._createResultsContainer("all"===this.activeSourceIndex,d,this.resultsElement),this._titleGroups.push(c),n=!0,h=0;h<i;h+=1)c.addChild(this._createPremise(b[h],this.showCounts,w,1===i,d)),j=!1;else j=!0;q.resolve()}this.enableSuggestions||!j||n||this._showNoResults(),p(this.resultsElement)||this.enableSuggestions||(k(this.resultsElement,".drilldownResult:click",function(){r(m(this).data()[0])}),k(this.resultsElement,"keydown",function(a){var b,c=a.charCode||a.keyCode;switch(c){case o.ENTER:case o.NUMPAD_ENTER:b=m(".drilldownResult",a.target).data()[0],r(b);break;default:return!1}}))}return q.promise}})});