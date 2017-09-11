"use strict";define("backgroundCommon/mixins/backgroundDetectionMixin",["lodash","react","utils","imageClientApi","color","santaProps"],function(e,t,i,o,a,s){function n(t){return e.get(t.compDesign,"background",e.get(t.compData,"background",{}))}function r(e,t,a){var s=e&&e.uri;if(s){var n={id:s,width:e.width,height:e.height},r={width:1,height:1},d=o.getData(o.fittingTypes.SCALE_TO_FILL,n,r).uri,y=this.props.getMediaFullStaticUrl(d);i.imageUtils.getImageMeanBrightness(y,{width:1,height:1},t,a)}else{var l=p.call(this);t(l.values.hsv[2],l.values.alpha)}}function p(){var e=n(this.props);return new a(i.colorParser.getColor(this.props.colorsMap,e.color,e.colorOpacity))}function d(e,t){var i=e&&e.uri,o=i!==this.lastBackgroundImageUrl,a=t&&t.hexString(),s=this.lastBackgroundBgColor&&this.lastBackgroundBgColor.hexString(),n=!i&&a!==s,p=t&&t.values.alpha!==this.lastAlpha;(o||n||p)&&r.call(this,e,function(e,t){this.props.updateColorInfo(this.props.id,{brightness:e,alpha:t})}.bind(this)),this.lastBackgroundImageUrl=i,this.lastBackgroundBgColor=t,this.lastAlpha=t.values.alpha}return{propTypes:{id:t.PropTypes.string,compDesign:t.PropTypes.object,compData:t.PropTypes.object,colorsMap:s.Types.Theme.colorsMap.isRequired,isMobileView:s.Types.isMobileView.isRequired,updateColorInfo:s.Types.VerticalAnchorsMenu.updateInformation.isRequired,getMediaFullStaticUrl:s.Types.ServiceTopology.getMediaFullStaticUrl.isRequired},componentDidMount:function(){if(!this.props.isMobileView){var e=p.call(this),t=this.getMediaImageData();d.call(this,t,e)}},componentDidUpdate:function(){if(!this.props.isMobileView){var e=p.call(this),t=e&&e.hexString(),i=this.lastBackgroundBgColor&&this.lastBackgroundBgColor.hexString(),o=this.getMediaImageData(),a=t!==i,s=(o&&o.uri)!==this.lastBackgroundImageUrl,n=e&&e.values.alpha!==this.lastAlpha;(a||s||n)&&d.call(this,o,e)}},getMediaImageData:function(){var e=n(this.props).mediaRef;if(e)switch(e.type){case"Image":return e;case"WixVideo":return e.posterImageRef}return null}}}),define("backgroundCommon/components/bgImage",["lodash","react","core","imageCommon","santaProps"],function(e,t,i,o,a){var s=i.compMixins,n=o.imageElements;return{displayName:"bgImage",mixins:[s.skinBasedComp],propTypes:{cssFiltersSupported:a.Types.BrowserFlags.cssFiltersSupported.isRequired,compData:t.PropTypes.object.isRequired,"data-type":t.PropTypes.string.isRequired,filterEffect:t.PropTypes.object},statics:{useSantaTypes:!0},extendWithFilterData:function(t){var i,o,a=n.getValidFilterName(this.props.filterEffect);a&&(i=this.props.id+"_"+a,o=n.getFilterComponent(i,a),this.props.cssFiltersSupported&&(t[""].addChildren=o,e.assign(t.image.style,n.getCssStyleForFilterUse(i))))},getSkinProperties:function(){var t={width:"100%"},i={position:"absolute",width:"100%"};e.isNumber(this.props.compData.opacity)&&(i.opacity=this.props.compData.opacity);var o={"":{style:t},image:{style:i,"data-type":this.props["data-type"]}};return this.extendWithFilterData(o),o}}}),define("backgroundCommon/mixins/videoPlayerMixin",["lodash","utils"],function(e,t){function i(t){return e.includes(["png"],o(t))}function o(e){return(/[.]([^.]+)$/.exec(e)&&/[.]([^.]+)$/.exec(e)[1]||"").toLowerCase()}var a=t.mediaConsts;return{externalAPI:["play","pause","stop","seek","setVolume","mute","unMute","setRate","setSrc"],mediaAPI:function(t,i){var o=this[t];o&&e.includes(this.externalAPI,t)&&o.apply(this,i)},getPosterImageComp:function(t,o,s){var n={display:o?"none":void 0};return i(t.uri)&&(n.backgroundColor="#000000"),this.createChildComponent(t,"core.components.Image",a.balataConsts.POSTER,e.assign({ref:a.balataConsts.POSTER,id:this.props.id+a.balataConsts.POSTER,imageData:t,displayMode:this.props.compData.fittingType,alignType:this.props.compData.alignType,containerWidth:0,containerHeight:0,style:n},s))}}}),define("backgroundCommon/components/html5Video",["lodash","react","santaProps","core","utils","image","backgroundCommon/mixins/videoPlayerMixin"],function(e,t,i,o,a,s,n){var r=a.mediaConsts;return{displayName:"html5Video",mixins:[n,o.compMixins.skinBasedComp],propTypes:e.defaults({compData:t.PropTypes.object.isRequired,compProp:t.PropTypes.object,playMobileVideoInline:i.Types.BrowserFlags.playMobileVideoInline.isRequired,playerInteraction:t.PropTypes.string,mediaQuality:t.PropTypes.string,notifyMediaState:t.PropTypes.func.isRequired,setMediaAPI:t.PropTypes.func.isRequired},i.santaTypesUtils.getSantaTypesByDefinition(s)),statics:{useSantaTypes:!0},getInitialState:function(){return this.playWhenReady=!1,{mediaQuality:this.props.mediaQuality,showVideo:!1}},componentDidMount:function(){this.props.setMediaAPI(this.mediaAPI),this.refs.video.addEventListener("timeupdate",this.handlePosterVisibilityOnce),this.props.notifyMediaState({type:r.eventTypes.MOUNT,playbackState:r.playbackTypes.LOADING}),this.setRate(this.props.compData.playbackSpeed||1),this.props.compProp.autoplay&&this.props.isPlayingAllowed&&this.play()},componentDidUpdate:function(){this.setRate(this.props.compData.playbackSpeed||1)},componentWillUnmount:function(){this.props.setMediaAPI(null),this.refs.video.removeEventListener("timeupdate",this.handlePosterVisibilityOnce),this.removeVideoSecurely()},handlePosterVisibilityOnce:function(){this.refs.video.currentTime>0&&(this.setState({showVideo:this.props.playMobileVideoInline}),this.refs.video.removeEventListener("timeupdate",this.handlePosterVisibilityOnce))},resetPosterState:function(){this.state.showVideo&&(this.setState({showVideo:!1}),this.refs.video.addEventListener("timeupdate",this.handlePosterVisibilityOnce))},removeVideoSecurely:function(){this.refs.video.pause(),e.forEach(this.refs.video.children,function(e){"source"===e.nodeName.toLowerCase()&&e.setAttribute("src","")}),this.refs.video.load()},canVideoPlay:function(){return this.refs.video.readyState>=this.refs.video.HAVE_CURRENT_DATA},play:function(){this.canVideoPlay()?this.refs.video.play():this.playWhenReady=!0},pause:function(){this.refs.video.pause()},stop:function(){this.pause(),this.seek(0),this.resetPosterState()},setVolume:function(e){this.refs.video.volume=Math.max(0,Math.min(1,e))},mute:function(){this.refs.video.muted=!0},unMute:function(){this.refs.video.muted=!1},seek:function(e){this.refs.video.currentTime=Math.max(0,Math.min(e,this.refs.video.duration||this.props.compData.duration))},setRate:function(e){this.refs.video.playbackRate=Math.max(0,e)},setSrc:function(e){e!==this.state.mediaQuality&&this.setState({mediaQuality:e})},onLoadStart:function(){this.props.notifyMediaState({type:r.eventTypes.LOAD,playbackState:r.playbackTypes.READY,volume:this.refs.video.volume,muted:this.refs.video.muted,looped:this.props.compProp.loop,currentTime:this.refs.video.currentTime,progress:0})},onDurationChange:function(){this.props.notifyMediaState({type:r.eventTypes.LOAD,duration:parseInt(100*this.refs.video.duration,10)/100})},onLoadedData:function(){this.playWhenReady||this.props.notifyMediaState({type:r.eventTypes.LOAD,playbackState:r.playbackTypes.IDLE})},onCanPlay:function(){this.playWhenReady&&(this.play(),this.playWhenReady=!1)},onTimeUpdate:function(){this.props.notifyMediaState({type:r.eventTypes.TIME_UPDATE,currentTime:this.refs.video.currentTime})},onPlayEnded:function(){this.props.notifyMediaState({type:r.eventTypes.PLAYSTATE,playbackState:r.playbackTypes.PLAY_ENDED})},onPlay:function(){this.props.notifyMediaState({type:r.eventTypes.PLAYSTATE,playbackState:r.playbackTypes.PLAYING})},onPause:function(){this.props.notifyMediaState({type:r.eventTypes.PLAYSTATE,playbackState:r.playbackTypes.PAUSED})},onError:function(e){e.currentTarget.networkState===e.currentTarget.NETWORK_NO_SOURCE?this.props.notifyMediaState({type:r.eventTypes.ERROR,error:r.errorTypes.NO_VIDEO_FOUND}):this.props.notifyMediaState({type:r.eventTypes.ERROR,error:r.errorTypes.VIDEO_GENERAL_ERROR})},onStalled:function(e){e.currentTarget.readyState===e.currentTarget.HAVE_NOTHING&&this.props.notifyMediaState({type:r.eventTypes.ERROR,error:r.errorTypes.NO_VIDEO_FOUND})},onProgress:function(){var e=this.refs.video.buffered;this.props.notifyMediaState({type:r.eventTypes.PROGRESS,progress:e&&e.length?e.end(e.length-1):0})},onSeekStart:function(){this.props.notifyMediaState({type:r.eventTypes.PLAYSTATE,playbackState:r.playbackTypes.SEEKING})},onSeekEnd:function(){this.props.notifyMediaState({type:r.eventTypes.PLAYSTATE,playbackState:r.playbackTypes.SEEKING_ENDED})},onVolumeChange:function(){this.props.notifyMediaState({type:r.eventTypes.VOLUME,volume:this.refs.video.volume,muted:this.refs.video.muted})},onRateChange:function(){this.props.notifyMediaState({type:r.eventTypes.RATE,playbackRate:this.refs.video.playbackRate})},onVideoClick:function(e){e.stopPropagation()},getVideo:function(){var e={preload:this.props.compData.preload||"none",onEnded:this.onPlayEnded,onError:this.onError,onLoadStart:this.onLoadStart,onLoadedData:this.onLoadedData,onCanPlay:this.onCanPlay,onDurationChange:this.onDurationChange,onPause:this.onPause,onPlay:this.onPlay,onProgress:this.onProgress,onRateChange:this.onRateChange,onSeeked:this.onSeekEnd,onSeeking:this.onSeekStart,onStalled:this.onStalled,onTimeUpdate:this.onTimeUpdate,onVolumeChange:this.onVolumeChange,onClick:this.onVideoClick,style:{visibility:this.state.showVideo?void 0:"hidden"}};return"useNative"===this.props.playerInteraction&&(e.controls=!0),(this.props.compProp.mute||!1===this.props.compData.hasAudio)&&(e.muted="muted"),e},getSkinProperties:function(){var e={width:"100%"},t=this.getPosterImageComp(this.props.compData.posterImageRef,this.state.showVideo);return{"":{"data-quality":this.state.mediaQuality,"data-player-type":"html5",style:e},video:this.getVideo(),poster:t}}}}),define("backgroundCommon/components/youtubeVideo",["lodash","core","santaProps","react","reactDOM","utils","image","backgroundCommon/mixins/videoPlayerMixin"],function(e,t,i,o,a,s,n,r){var p=s.mediaConsts;return{displayName:"YoutubeVideo",mixins:[r,t.compMixins.skinBasedComp],propTypes:e.defaults({compData:o.PropTypes.object.isRequired,compProp:o.PropTypes.object,isPlayingAllowed:o.PropTypes.bool,mediaQuality:o.PropTypes.string,notifyMediaState:o.PropTypes.func.isRequired,setMediaAPI:o.PropTypes.func.isRequired},i.santaTypesUtils.getSantaTypesByDefinition(n)),statics:{useSantaTypes:!0},getInitialState:function(){return this.ytPlayer=null,this.ytScriptReady=!1,this.setVideoPlayerWhenReady=!1,this.isPlaying=!1,this.timeUpdateTimer={type:"",id:null},{showVideo:!1}},componentDidMount:function(){this.loadYTScript(),this.props.setMediaAPI(this.mediaAPI),this.props.notifyMediaState({type:p.eventTypes.MOUNT,playbackState:p.playbackTypes.LOADING}),this.props.compProp.autoplay&&this.props.isPlayingAllowed&&this.play()},componentWillUnmount:function(){this.props.setMediaAPI(null),this.stopSimulateTimeUpdate(),this.removeVideoSecurely(),this.props.notifyMediaState({type:p.eventTypes.MOUNT,playbackState:p.playbackTypes.LOADING})},loadYTScript:function(){if("undefined"==typeof window||e.get(window,"YT"))this.onYoutubeScriptReady();else{var t=window.document.createElement("script");t.src="https://www.youtube.com/player_api";var i=window.document.getElementsByTagName("script")[0];i.parentNode.insertBefore(t,i),window.onYouTubeIframeAPIReady=this.onYoutubeScriptReady}},handlePosterVisibilityOnce:function(){this.setState({showVideo:!0})},resetPosterState:function(){this.state.showVideo&&this.setState({showVideo:!1})},onYoutubeScriptReady:function(){this.ytScriptReady=!0,this.setVideoPlayerWhenReady&&this.setVideoPlayer()},startSimulateTimeUpdate:function(){this.isPlaying?this.timeUpdateTimer={type:"requestAnimationFrame",id:window.requestAnimationFrame(this.startSimulateTimeUpdate)}:window.requestIdleCallback?this.timeUpdateTimer={type:"requestIdleCallback",id:window.requestIdleCallback(this.startSimulateTimeUpdate)}:this.timeUpdateTimer={type:"setTimeout",id:window.setTimeout(this.startSimulateTimeUpdate,100)},this.onTimeUpdate(),this.onProgress()},stopSimulateTimeUpdate:function(){switch(this.timeUpdateTimer.type){case"requestAnimationFrame":window.cancelAnimationFrame(this.timeUpdateTimer.id);break;case"requestIdleCallback":window.cancelIdleCallback(this.timeUpdateTimer.id);break;case"setTimeout":window.clearTimeout(this.timeUpdateTimer.id)}},setVideoPlayer:function(){this.ytScriptReady?this.ytPlayer=new window.YT.Player(this.refs.video,{videoId:this.props.compData.videoId,width:a.findDOMNode(this).offsetWidth,height:a.findDOMNode(this).offsetHeight,events:{onReady:this.onPlayerReady,onStateChange:this.onPlayerStateChange,onPlaybackRateChange:this.onRateChange,onError:this.onError},autoplay:1,loop:this.props.compProp.loop?1:0,rel:0}):this.setVideoPlayerWhenReady=!0},removeVideoSecurely:function(){this.ytPlayer&&this.ytPlayer.destroy()},play:function(){this.ytPlayer?this.ytPlayer.playVideo&&this.ytPlayer.playVideo():this.setVideoPlayer()},pause:function(){this.ytPlayer&&this.ytPlayer.pauseVideo()},stop:function(){this.ytPlayer&&this.ytPlayer.stopVideo()},setVolume:function(e){var t;this.ytPlayer&&(t=100*Math.max(0,Math.min(1,e)),this.ytPlayer.setVolume(t),this.onVolumeChange({volume:t}))},mute:function(){this.ytPlayer&&(this.ytPlayer.mute(),this.onVolumeChange({mute:!0}))},unMute:function(){this.ytPlayer&&(this.ytPlayer.unMute(),this.onVolumeChange({mute:!1}))},seek:function(e){this.ytPlayer&&(this.ytPlayer.seekTo(Math.max(0,Math.min(e,this.ytPlayer.getDuration())),!0),this.onSeekEnd())},setRate:function(e){this.ytPlayer&&this.ytPlayer.setPlaybackRate(Math.max(0,e))},onPlayerReady:function(){this.props.compProp.mute&&this.mute(),this.setRate(this.props.compData.playbackSpeed||1),this.handlePosterVisibilityOnce(),this.onLoadStart()},onPlayerStateChange:function(e){var t=window.YT.PlayerState;switch(e.data){case t.ENDED:this.onPlayEnded();break;case t.PLAYING:this.onPlay();break;case t.PAUSED:this.onPause();break;case t.BUFFERING:this.onProgress();break;case t.CUED:}},onLoadStart:function(){this.props.notifyMediaState({type:p.eventTypes.LOAD,playbackState:p.playbackTypes.READY,volume:this.ytPlayer.getVolume()/100,muted:this.ytPlayer.isMuted(),currentTime:this.ytPlayer.getCurrentTime(),progress:0})},onTimeUpdate:function(){this.props.notifyMediaState({type:p.eventTypes.TIME_UPDATE,currentTime:this.ytPlayer.getCurrentTime(),duration:this.ytPlayer.getDuration()})},onPlayEnded:function(){this.props.notifyMediaState({type:p.eventTypes.PLAYSTATE,playbackState:p.playbackTypes.PLAY_ENDED})},onPlay:function(){this.props.notifyMediaState({type:p.eventTypes.PLAYSTATE,playbackState:p.playbackTypes.PLAYING}),this.startSimulateTimeUpdate()},onPause:function(){this.props.notifyMediaState({type:p.eventTypes.PLAYSTATE,playbackState:p.playbackTypes.PAUSED}),this.stopSimulateTimeUpdate()},onError:function(){this.props.notifyMediaState({type:p.eventTypes.ERROR,error:p.errorTypes.VIDEO_GENERAL_ERROR}),this.stopSimulateTimeUpdate()},onProgress:function(){this.props.notifyMediaState({type:p.eventTypes.PROGRESS,progress:this.ytPlayer.getDuration()*this.ytPlayer.getVideoLoadedFraction()})},onSeekStart:function(){this.props.notifyMediaState({type:p.eventTypes.PLAYSTATE,playbackState:p.playbackTypes.SEEKING})},onSeekEnd:function(){this.props.notifyMediaState({type:p.eventTypes.PLAYSTATE,playbackState:p.playbackTypes.SEEKING_ENDED})},onVolumeChange:function(t){t=t||{};var i=(e.isNumber(t.volume)?t.volume:this.ytPlayer.getVolume())/100,o=e.isBoolean(t.mute)?t.mute:this.ytPlayer.isMuted();this.props.notifyMediaState({type:p.eventTypes.VOLUME,volume:i,muted:o})},onRateChange:function(){this.props.notifyMediaState({type:p.eventTypes.RATE,playbackRate:this.ytPlayer.getPlaybackRate()})},getSkinProperties:function(){var e={width:"100%"},t=this.props.compData.posterImage||{uri:"//img.youtube.com/vi/"+this.props.compData.videoId+"/hqdefault.jpg"},i=this.getPosterImageComp(t,this.state.showVideo);return{"":{"data-quality":this.props.mediaQuality,"data-player-type":"youtube",style:e},video:{},poster:i}}}}),define("backgroundCommon/components/bgMedia",["lodash","react","core","santaProps","image","backgroundCommon/components/bgImage","backgroundCommon/components/html5Video","backgroundCommon/components/youtubeVideo","utils"],function(e,t,i,o,a,s,n,r,p){function d(t,i,o){o=o||{};var a=m.isFilterExists(o.effectType);return e.includes(f,t)&&(!a||a&&i)?g:T}function y(e,t){var i={};return t===g.comp?i={ref:h.balataConsts.CONTENT,filterEffect:e.filterEffect,"data-type":g["data-type"]}:t===T.comp?i={ref:h.balataConsts.CONTENT,key:"img_"+e.bgEffectName,containerWidth:0,containerHeight:0,imageData:e.compData,filterEffect:e.filterEffect,displayMode:e.fittingType,fittingType:e.fittingType,alignType:e.alignType,"data-type":T["data-type"]}:t!==P.comp&&t!==v.comp&&t!==b.comp||(i={ref:h.balataConsts.CONTENT,key:"vid_"+e.compData.videoId,notifyMediaState:e.notifyMediaState,isPlayingAllowed:e.isPlayingAllowed,playerInteraction:e.playerInteraction,setMediaAPI:e.setMediaAPI,mediaQuality:e.mediaQuality,compProp:e.compProp}),i}function l(e){var t,i=e.compData,o=d(e.fittingType,e.cssFiltersSupported,e.filterEffect),a={image:{id:e.id+h.balataConsts.CONTENT,componentType:o.comp,skinPartData:{skin:o.skin,styleId:o.style},compData:i},poster:{id:e.id+h.balataConsts.CONTENT,componentType:o.comp,skinPartData:{skin:o.skin,styleId:o.style},compData:i.posterImageRef},video:{id:e.id+h.balataConsts.CONTENT,componentType:P.comp,skinPartData:{skin:P.skin,styleId:P.style},compData:i},youtube:{id:e.id+h.balataConsts.CONTENT,componentType:v.comp,skinPartData:{skin:v.skin,styleId:v.style},compData:i},iframe:{id:e.id+h.balataConsts.CONTENT,componentType:b.comp,skinPartData:{skin:b.skin,styleId:b.style},compData:i}};switch(i.type){case"Image":t=a.image;break;case"WixVideo":t=e.enableVideo?a.video:a.poster;break;case"Video":switch(i.videoType){case"YOUTUBE":t=a.youtube}}return t}var c=i.compMixins,u=p.containerBackgroundUtils,h=p.mediaConsts,m=p.svgFilters,f=[p.imageUtils.fittingTypes.TILE],g={comp:"wysiwyg.viewer.components.background.bgImage",skin:"skins.viewer.bgImage.bgImageSkin",style:"bgImage","data-type":h.balataConsts.BG_IMAGE},T={comp:"core.components.Image",skin:"skins.core.ImageNewSkinZoomable",style:"bgImage","data-type":h.balataConsts.IMAGE},P={comp:"wysiwyg.viewer.components.background.html5Video",skin:"skins.viewer.bgVideo.html5VideoSkin",style:"bgVideo"},v={comp:"wysiwyg.viewer.components.background.youtubeVideo",skin:"skins.viewer.bgVideo.youtubeVideoSkin",style:"youtubeVideo"},b={comp:"wysiwyg.viewer.components.background.iframeVideo",skin:"skins.viewer.bgVideo.iframeVideoSkin",style:"iframeVideo"};return{displayName:"bgMedia",mixins:[c.skinBasedComp],propTypes:e.defaults({id:t.PropTypes.string.isRequired,compData:t.PropTypes.object.isRequired,compProp:t.PropTypes.object,alignType:t.PropTypes.string,fittingType:t.PropTypes.string,mediaTransforms:t.PropTypes.object,filterEffect:t.PropTypes.object,bgEffectName:t.PropTypes.string,style:t.PropTypes.object.isRequired,isPlayingAllowed:t.PropTypes.bool,enableVideo:t.PropTypes.bool,mediaQuality:t.PropTypes.string,notifyMediaState:t.PropTypes.func,setMediaAPI:t.PropTypes.func,cssFiltersSupported:o.Types.BrowserFlags.cssFiltersSupported.isRequired,renderFixedPositionBackgrounds:o.Types.RenderFlags.renderFixedPositionBackgrounds},o.santaTypesUtils.getSantaTypesByDefinition(a),o.santaTypesUtils.getSantaTypesByDefinition(s),o.santaTypesUtils.getSantaTypesByDefinition(n),o.santaTypesUtils.getSantaTypesByDefinition(r)),statics:{useSantaTypes:!0},getDefaultSkinName:function(){return"skins.viewer.balata.bgMediaSkin"},getMediaComponent:function(){var t=l(this.props),i=y(this.props,t.componentType),o=e.assign({id:t.id},i);return this.createChildComponent(t.compData,t.componentType,t.skinPartData,o)},getSkinProperties:function(){var t=u.getPositionByEffect(this.props.bgEffectName,this.props.renderFixedPositionBackgrounds),i=e.assign({},this.props.style,{position:t,pointerEvents:this.props.bgEffectName?"none":"auto",top:0}),o=e.mapKeys(this.props.mediaTransforms,function(e,t){return"data-"+t});return{"":e.assign({key:["media",this.props.isPlayingAllowed?"playback":"no_playback",this.props.enableVideo?"video":"no_video"].join("_"),children:this.getMediaComponent(),style:i,"data-effect":this.props.bgEffectName||"none","data-fitting":this.props.fittingType,"data-align":this.props.alignType},o)}}}}),define("backgroundCommon/components/bgOverlay",["react","lodash","core","utils","santaProps"],function(e,t,i,o,a){function s(e,t){return"url("+o.urlUtils.joinURL(e,t.uri)+")"}function n(e){var t={};return e.colorOverlay&&(t.backgroundColor=o.colorParser.getColor(e.colorsMap,e.colorOverlay,e.colorOverlayOpacity)),e.imageOverlay&&(t.backgroundImage=s(e.staticMediaUrl,e.imageOverlay)),t}function r(e){var i={width:"100%",height:"100%",position:"absolute"},o=n(e);return t.assign(i,o)}function p(e,t,i){return t&&o.containerBackgroundUtils.isFullScreenByEffect(e,i)}function d(){var e=t.assign({position:"absolute"},this.props.style,{width:"100%",height:"100%"});return p(this.props.bgEffectName,this.props.fixedBackgroundColorBalata,this.props.renderFixedPositionBackgrounds)&&t.assign(e,{top:0,position:"fixed"}),e}return{displayName:"bgOverlay",mixins:[i.compMixins.skinBasedComp],propTypes:{style:e.PropTypes.object,colorOverlay:e.PropTypes.string,colorOverlayOpacity:e.PropTypes.number,imageOverlay:e.PropTypes.object,bgEffectName:e.PropTypes.string,colorsMap:a.Types.Theme.colorsMap.isRequired,staticMediaUrl:a.Types.ServiceTopology.staticMediaUrl,fixedBackgroundColorBalata:a.Types.BrowserFlags.fixedBackgroundColorBalata.isRequired,renderFixedPositionBackgrounds:a.Types.RenderFlags.renderFixedPositionBackgrounds},statics:{useSantaTypes:!0},getSkinProperties:function(){var e=d.call(this),t=r(this.props),i={"":{style:e}};return i[o.balataConsts.OVERLAY]={style:t},i}}}),define("backgroundCommon/components/iframeVideoFactory",["lodash","react","core","santaProps","utils","pmrpc","image","backgroundCommon/mixins/videoPlayerMixin"],function(e,t,i,o,a,s,n,r){function p(p){var y=p.url,l=p.id;return{displayName:p.displayName||"iframeVideo",mixins:[r,i.compMixins.skinBasedComp],propTypes:e.defaults({compData:t.PropTypes.object.isRequired,compProp:t.PropTypes.object,isPlayingAllowed:t.PropTypes.bool,mediaQuality:t.PropTypes.string,notifyMediaState:t.PropTypes.func.isRequired,setMediaAPI:t.PropTypes.func.isRequired,staticVideoUrl:o.Types.ServiceTopology.staticVideoUrl},o.santaTypesUtils.getSantaTypesByDefinition(n)),statics:{useSantaTypes:!0},getInitialState:function(){return this.player=null,this.eventHandlers=[],{loadVideo:!1,showVideo:!1}},componentDidMount:function(){this.props.setMediaAPI(this.mediaAPI),this.props.notifyMediaState({type:d.eventTypes.MOUNT,playbackState:d.playbackTypes.LOADING}),this.props.compProp.autoplay&&this.props.isPlayingAllowed&&this.play()},componentDidUpdate:function(){this.setRate(this.props.compData.playbackSpeed||1)},componentWillUnmount:function(){this.props.setMediaAPI(null),this.removeVideoSecurely()},getUrl:function(t,i){var o="https://video.wixstatic.com/";if(!i)return"";var s=e.find(t.qualities,{quality:i});return s.url?a.urlUtils.joinURL(o,s.url):a.urlUtils.joinURL(o,t.videoId,i,"mp4","file.mp4")},onVideoFrameReady:function(){var e=this.getUrl(this.props.compData,this.props.mediaQuality);s.api.request(l,{target:this.refs.video}).then(function(t){this.player=t,this.player.set(e,{loop:!1,mute:this.props.compProp.mute||!1===this.props.compData.hasAudio,autoplay:!0,rate:this.props.compData.playbackSpeed||1,preload:this.props.compData.preload||"none"},this.onVideoEvent),this.addVideoEventListener("timeupdate",this.handlePosterVisibilityOnce),this.addVideoEventListener("ended",this.onPlayEnded),this.addVideoEventListener("error",this.onError),this.addVideoEventListener("loadstart",this.onLoadStart),this.addVideoEventListener("durationchange",this.onDurationChange),this.addVideoEventListener("pause",this.onPause),this.addVideoEventListener("play",this.onPlay),this.addVideoEventListener("progress",this.onProgress),this.addVideoEventListener("ratechange",this.onRateChange),this.addVideoEventListener("seeked",this.onSeekEnd),this.addVideoEventListener("seeking",this.onSeekStart),this.addVideoEventListener("stalled",this.onStalled),this.addVideoEventListener("timeupdate",this.onTimeUpdate),this.addVideoEventListener("volumechange",this.onVolumeChange)}.bind(this)).catch(function(e){console.log("Video API not loaded.",e)})},addVideoEventListener:function(t,i){if(!e.find(this.eventHandlers,{eventType:t,handler:i}))return this.eventHandlers.push({eventType:t,handler:i}),!0},removeVideoEventListener:function(t,i){if(e.find(this.eventHandlers,{eventType:t,handler:i}))return this.eventHandlers=e.reject(this.eventHandlers,{eventType:t,handler:i}),!0},onVideoEvent:function(t){var i=e.filter(this.eventHandlers,{eventType:t.type});e.forEach(i,function(e){e.handler(t)})},handlePosterVisibilityOnce:function(e){e.currentTime>0&&(this.removeVideoEventListener("timeupdate",this.handlePosterVisibilityOnce),this.setState({showVideo:!0}))},resetPosterState:function(){this.state.showVideo&&(this.setState({showVideo:!1}),this.addVideoEventListener("timeupdate",this.handlePosterVisibilityOnce))},removeVideoSecurely:function(){this.player&&(this.eventHandlers=[],this.player.reset())},play:function(){this.player?this.player.play():this.setState({loadVideo:!0})},pause:function(){this.player&&this.player.pause()},stop:function(){this.player&&(this.pause(),this.seek(0),this.resetPosterState())},setVolume:function(e){this.player&&this.player.setVolume(e)},mute:function(){this.player&&this.player.setMute(!0)},unMute:function(){this.player&&this.player.setMute(!1)},seek:function(e){this.player&&this.player.seek(e)},setRate:function(e){this.player&&this.player.setRate(e)},onLoadStart:function(e){this.props.notifyMediaState({type:d.eventTypes.LOAD,playbackState:d.playbackTypes.READY,volume:e.volume,muted:e.muted,looped:this.props.compProp.loop,currentTime:e.currentTime,progress:0})},onDurationChange:function(e){this.props.notifyMediaState({type:d.eventTypes.LOAD,duration:e.duration})},onTimeUpdate:function(e){this.props.notifyMediaState({type:d.eventTypes.TIME_UPDATE,currentTime:e.currentTime})},onPlayEnded:function(){this.props.notifyMediaState({type:d.eventTypes.PLAYSTATE,playbackState:d.playbackTypes.PLAY_ENDED})},onPlay:function(){this.props.notifyMediaState({type:d.eventTypes.PLAYSTATE,playbackState:d.playbackTypes.PLAYING})},onPause:function(){this.props.notifyMediaState({type:d.eventTypes.PLAYSTATE,playbackState:d.playbackTypes.PAUSED})},onError:function(e){e.networkState===e.NETWORK_NO_SOURCE?this.props.notifyMediaState({type:d.eventTypes.ERROR,error:d.errorTypes.NO_VIDEO_FOUND}):this.props.notifyMediaState({type:d.eventTypes.ERROR,error:d.errorTypes.VIDEO_GENERAL_ERROR})},onStalled:function(e){e.readyState===e.HAVE_NOTHING&&this.props.notifyMediaState({type:d.eventTypes.ERROR,error:d.errorTypes.NO_VIDEO_FOUND})},onProgress:function(e){this.props.notifyMediaState({type:d.eventTypes.PROGRESS,progress:e.progress})},onSeekStart:function(){this.props.notifyMediaState({type:d.eventTypes.PLAYSTATE,playbackState:d.playbackTypes.SEEKING})},onSeekEnd:function(){this.props.notifyMediaState({type:d.eventTypes.PLAYSTATE,playbackState:d.playbackTypes.SEEKING_ENDED})},onVolumeChange:function(e){this.props.notifyMediaState({type:d.eventTypes.VOLUME,volume:e.volume,muted:e.muted})},onRateChange:function(e){this.props.notifyMediaState({type:d.eventTypes.RATE,playbackRate:e.playbackRate})},getVideo:function(){return t.DOM.iframe({ref:"video",id:this.props.id+"video",frameBorder:0,allowFullScreen:!0,src:this.state.loadVideo?y:"about:blank",onLoad:this.onVideoFrameReady})},getSkinProperties:function(){var e={width:"100%"},t=this.getPosterImageComp(this.props.compData.posterImageRef,this.state.showVideo);return{"":{"data-quality":this.props.mediaQuality,"data-player-type":"iframe",style:e},video:this.getVideo(),poster:t}}}}var d=a.mediaConsts;return{getIframeVideoComponent:p}}),define("backgroundCommon/components/iframeVideo",["backgroundCommon/components/iframeVideoFactory"],function(e){return e.getIframeVideoComponent({url:"https://wix-private.github.io/video-fx-player/360.html",id:"wix-video-fx-player",displayName:"iframeVideo"})}),define("backgroundCommon",["backgroundCommon/mixins/backgroundDetectionMixin","backgroundCommon/components/bgImage","backgroundCommon/components/bgMedia","backgroundCommon/components/bgOverlay","backgroundCommon/components/html5Video","backgroundCommon/components/youtubeVideo","backgroundCommon/components/iframeVideo","core"],function(e,t,i,o,a,s,n,r){var p={mixins:{backgroundDetectionMixin:e},components:{bgImage:t,bgMedia:i,bgOverlay:o,html5Video:a,youtubeVideo:s,iframeVideo:n}};return r.compRegistrar.register("wysiwyg.viewer.components.background.bgMedia",p.components.bgMedia).register("wysiwyg.viewer.components.background.bgImage",p.components.bgImage).register("wysiwyg.viewer.components.background.html5Video",p.components.html5Video).register("wysiwyg.viewer.components.background.youtubeVideo",p.components.youtubeVideo).register("wysiwyg.viewer.components.background.iframeVideo",p.components.iframeVideo).register("wysiwyg.viewer.components.background.bgOverlay",p.components.bgOverlay),p});
//# sourceMappingURL=backgroundCommon.min.js.map