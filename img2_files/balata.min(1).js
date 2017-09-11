"use strict";define("balata",["react","lodash","santaProps","core","coreUtils","backgroundCommon"],function(e,i,t,s,a,o){function r(e,t,s){var a=t[u[e]]||{},o=i.get(s,["transforms",e],{}),r=i.merge({},a,o),n={};return r.opacity&&(n.opacity=r.opacity,r=i.omit(r,"opacity")),i.isEmpty(r)||(n.transform=i.reduce(r,function(e,i,t){return e+=t+"("+i+") "},"")),n}function n(e,i,t,s){var a={skin:v.skin,styleId:v.style},o={style:r(u.MEDIA,t,i),id:e.id+v.ref,ref:v.ref,bgEffectName:s,filterEffect:t.filterEffect,fittingType:t.fittingType,alignType:t.alignType,mediaTransforms:t.mediaTransforms,enableVideo:e.enableVideo,notifyMediaState:e.notifyMediaState,mediaQuality:e.mediaQuality,setMediaAPI:e.setMediaAPI,compProp:e.compProp,isPlayingAllowed:e.isPlayingAllowed,playerInteraction:e.playerInteraction};return this.createChildComponent(t.mediaRef,v.comp,a,o)}function p(e,i,t,s){var a={skin:b.skin,styleId:b.style},o={style:r(u.OVERLAY,t,i),colorOverlay:t.colorOverlay,colorOverlayOpacity:t.colorOverlayOpacity,imageOverlay:t.imageOverlay,bgEffectName:s,id:e.id+b.ref,ref:b.ref};return this.createChildComponent(null,b.comp,a,o)}function l(e,i,t,s){var a={skin:h.skin,styleId:h.style},o={style:r(u.UNDERLAY,t,i),colorOverlay:t.color,colorOverlayOpacity:c(t.colorOpacity,t.mediaRef),bgEffectName:s,id:e.id+h.ref,ref:h.ref};return this.createChildComponent(null,h.comp,a,o)}function c(e,i){return!i||"WixVideo"!==i.type&&"Video"!==i.type?e:0}function y(e){var i=e.mediaRef,t=e.imageOverlay||e.colorOverlay,s=e.showOverlayForMediaType||"WixVideo",a=i&&("all"===s||s===i.type);return!(!t||!a)}function d(e){return i.get(e.compDesign,"background",i.get(e.compData,"background",{}))}function g(e,t){var s=d(e);if(i.isEmpty(s))return null;var a=m.getBgEffectName(e.compBehaviors,e.isDesktopDevice,e.isMobileView),o=[];return o.push(l.call(this,e,t,s,a)),i.isEmpty(s.mediaRef)||o.push(n.call(this,e,t,s,a)),y(s)&&o.push(p.call(this,e,t,s,a)),o}var f=s.compMixins,m=a.containerBackgroundUtils,u=a.balataConsts,v={comp:"wysiwyg.viewer.components.background.bgMedia",skin:"skins.viewer.bgMedia.bgMediaSkin",style:"bgMedia",ref:u.MEDIA},b={comp:"wysiwyg.viewer.components.background.bgOverlay",skin:"skins.viewer.bgOverlay.bgOverlaySkin",style:"bgOverlay",ref:u.OVERLAY},h={comp:"wysiwyg.viewer.components.background.bgOverlay",skin:"skins.viewer.bgOverlay.bgOverlaySkin",style:"bgColor",ref:u.BG_COLOR},k={displayName:"Balata",mixins:[f.skinBasedComp,o.mixins.backgroundDetectionMixin],propTypes:i.defaults({id:e.PropTypes.string.isRequired,parentId:e.PropTypes.string.isRequired,compData:e.PropTypes.object,compDesign:e.PropTypes.object,compProp:e.PropTypes.object,compBehaviors:e.PropTypes.object,style:e.PropTypes.object,onClick:e.PropTypes.func,isDesktopDevice:t.Types.Device.isDesktopDevice.isRequired,isMobileView:t.Types.isMobileView.isRequired,designDataChangeAspect:t.Types.SiteAspects.designDataChangeAspect.isRequired,isPlayingAllowed:e.PropTypes.bool,enableVideo:e.PropTypes.bool,notifyMediaState:e.PropTypes.func,setMediaAPI:e.PropTypes.func,mediaQuality:e.PropTypes.string},t.santaTypesUtils.getSantaTypesByDefinition(o.components.bgMedia),t.santaTypesUtils.getSantaTypesByDefinition(o.components.bgOverlay)),statics:{useSantaTypes:!0},getInitialState:function(){return{transforms:{}}},componentWillReceiveProps:function(e){this.handleDesignDataBehaviors(e)},handleDesignDataBehaviors:function(e){var i=d(e),t=d(this.props);this.setState({transforms:{}}),t.id!==i.id&&this.props.designDataChangeAspect.notify(this.props.parentId,this.props.compDesign,e.compDesign)},getSkinProperties:function(){var e=m.getBgEffectName(this.props.compBehaviors,this.props.isDesktopDevice,this.props.isMobileView),t=g.call(this,this.props,this.state);return{"":{style:i.assign({position:"absolute",top:0,width:"100%",height:"100%",pointerEvents:e?"none":"auto"},this.props.style),children:t,onClick:this.props.onClick,key:"balata_"+e,"data-enable-video":this.props.enableVideo}}},getDefaultSkinName:function(){return"skins.viewer.balata.balataBaseSkin"}};return s.compRegistrar.register("wysiwyg.viewer.components.background.Balata",k),k});
//# sourceMappingURL=balata.min.js.map