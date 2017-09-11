"use strict";define("table",["lodash","core","react"],function(e,r,t){function o(){var r=e.times(this.props.compProp.numOfRows,function(r){var o=e.times(this.props.compProp.numOfColumns,function(e){var o=this.props.getBodyCell(e,r),s="cell_"+r+"_"+e,p={style:this.props.compData.columnsStyle[e],ref:s,key:o&&o.props.key||s};return t.DOM.td(p,o)}.bind(this));return t.DOM.tr({key:"row_"+r,ref:"row_"+r},o)}.bind(this)),o=t.DOM.tr({key:"row_spacer",ref:"row_spacer",className:this.classSet({spacer:!0})},t.DOM.td({colSpan:"100%"}));return r.push(o),r}function s(r){var o=r?"header":"footer",s=r?this.props.getHeaderCell:this.props.getFooterCell;return e.times(this.props.compProp.numOfColumns,function(e){var r=s(e),p=o+"_cell_"+e,i={ref:p,key:r&&r.props.key||p};return t.DOM.td(i,r)})}var p={displayName:"Table",mixins:[r.compMixins.skinBasedComp],propType:{getBodyCell:t.PropTypes.func.isRequired,getHeaderCell:t.PropTypes.func.isRequired,getFooterCell:t.PropTypes.func.isRequired},getSkinProperties:function(){var e={tableBody:{children:o.call(this)}};return this.props.compProp.minHeight&&(e[""]={style:{minHeight:this.props.compProp.minHeight,width:"100%"}},e.table={style:{height:this.props.compProp.minHeight}}),this.props.compProp.header&&(e.tableHeader={children:t.DOM.tr({key:"row_header"},s.call(this,!0))}),this.props.compProp.footer&&(e.tableFooter={children:t.DOM.tr({key:"row_footer"},s.call(this,!1))}),e}};return r.compRegistrar.register("wysiwyg.viewer.components.Table",p),p});
//# sourceMappingURL=table.min.js.map