define(["dojo/_base/declare","./_LocatorBase","./PickListItem"],function(a,b,c){return a([b],{locatorType:"ABXDPA",resultsPickList:null,streetGrouping:["DPA_DEP_THOROUGHFARE","DPA_THOROUGHFARE","DPA_DEP_LOCALITY","DPA_LOCALITY","DPA_POST_TOWN"],premiseGrouping:["DPA_BUILDING_NAME","DPA_BUILDING_NUMBER"],streetFields:{STREET_DESCRIPTOR:"DPA_THOROUGHFARE",LOCALITY_NAME:"DPA_LOCALITY",TOWN_NAME:"DPA_POST_TOWN",ADMINISTRATIVE_AREA:"DPA_DEP_LOCALITY"},paoFields:{PAO_TEXT:"DPA_BUILDING_NAME",PAO_START_NUMBER:"DPA_BUILDING_NUMBER",PAO_START_SUFFIX:"",PAO_END_NUMBER:"",PAO_END_SUFFIX:""},saoFields:{SAO_TEXT:"DPA_SUB_BUILDING_NAME",SAO_START_NUMBER:"DPA_BUILDING_NUMBER",SAO_START_SUFFIX:"DPA_BUILDING_NAME",SAO_END_NUMBER:"",SAO_END_SUFFIX:""},_buildPicklistItem:function(a,b){return new c({SortDescription:this._getSortDescription(this._getSAOText(a,!0)),Description:this._getListLevelDescription(1,a),Addresses:[b],Level:1})}})});