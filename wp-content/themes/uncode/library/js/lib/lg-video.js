/*!
 * lightgallery | 2.5.0 | June 13th 2022
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lgVideo = factory());
}(this, (function () { 'use strict';

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */

	var __assign = function() {
		__assign = Object.assign || function __assign(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
				s = arguments[i];
				for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
		};
		return __assign.apply(this, arguments);
	};

	var videoSettings = {
		autoplayFirstVideo: true,
		youTubePlayerParams: false,
		vimeoPlayerParams: false,
		wistiaPlayerParams: false,
		gotoNextSlideOnVideoEnd: true,
		autoplayVideoOnSlide: false,
		videojs: false,
		videojsTheme: '',
		videojsOptions: {},
	};

	/**
	 * List of lightGallery events
	 * All events should be documented here
	 * Below interfaces are used to build the website documentations
	 * */
	var lGEvents = {
		afterAppendSlide: 'lgAfterAppendSlide',
		init: 'lgInit',
		hasVideo: 'lgHasVideo',
		containerResize: 'lgContainerResize',
		updateSlides: 'lgUpdateSlides',
		afterAppendSubHtml: 'lgAfterAppendSubHtml',
		beforeOpen: 'lgBeforeOpen',
		afterOpen: 'lgAfterOpen',
		slideItemLoad: 'lgSlideItemLoad',
		beforeSlide: 'lgBeforeSlide',
		afterSlide: 'lgAfterSlide',
		posterClick: 'lgPosterClick',
		dragStart: 'lgDragStart',
		dragMove: 'lgDragMove',
		dragEnd: 'lgDragEnd',
		beforeNextSlide: 'lgBeforeNextSlide',
		beforePrevSlide: 'lgBeforePrevSlide',
		beforeClose: 'lgBeforeClose',
		afterClose: 'lgAfterClose',
		rotateLeft: 'lgRotateLeft',
		rotateRight: 'lgRotateRight',
		flipHorizontal: 'lgFlipHorizontal',
		flipVertical: 'lgFlipVertical',
		autoplay: 'lgAutoplay',
		autoplayStart: 'lgAutoplayStart',
		autoplayStop: 'lgAutoplayStop',
	};

	var param = function (obj) {
		return Object.keys(obj)
			.map(function (k) {
			return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
		})
			.join('&');
	};
	var getVimeoURLParams = function (defaultParams, videoInfo) {
		if (!videoInfo || !videoInfo.vimeo)
			return '';
		var urlParams = videoInfo.vimeo[2] || '';
		var defaultPlayerParams = defaultParams && Object.keys(defaultParams).length !== 0
			? '&' + param(defaultParams)
			: '';
		// Support private video
		var urlWithHash = videoInfo.vimeo[0].split('/').pop() || '';
		var urlWithHashWithParams = urlWithHash.split('?')[0] || '';
		var hash = urlWithHashWithParams.split('#')[0];
		var isPrivate = videoInfo.vimeo[1] !== hash;
		if (isPrivate) {
			urlParams = urlParams.replace("/" + hash, '');
		}
		urlParams =
			urlParams[0] == '?' ? '&' + urlParams.slice(1) : urlParams || '';
		// For vimeo last params gets priority if duplicates found
		// Uncode edit ##START##
		var vimeoPlayerParams = '?autoplay=0';
		if ( videoInfo.autoplay !== '' ) {
			vimeoPlayerParams = vimeoPlayerParams.replace(new RegExp('([?&])autoplay=(.*?)(&|$)'), '$1$3' );
			vimeoPlayerParams = vimeoPlayerParams.replace(new RegExp('([?&])autoplay(&|$)'), '$1$2' );
		} else {
			if ( typeof SiteParameters !== 'undefined' && typeof SiteParameters.vimeoPlayerParams !== 'undefined' && SiteParameters.vimeoPlayerParams !== '' ) {
				vimeoPlayerParams = SiteParameters.vimeoPlayerParams;
			}
		}
		if ( videoInfo.muted !== '' ) {
			vimeoPlayerParams += '&muted=' + (videoInfo.muted === 'yes');
		} else {
			if ( urlParams.indexOf('muted=') < 0 && vimeoPlayerParams.indexOf('muted=') < 0 ) {
				vimeoPlayerParams += '&muted=1';
			}
		}
		// var vimeoPlayerParams = "?autoplay=0&muted=1" + (isPrivate ? "&h=" + hash : '') + defaultPlayerParams + urlParams;
		vimeoPlayerParams += (isPrivate ? "&h=" + hash : '') + defaultPlayerParams + urlParams;
		// Uncode edit ##END##
		return vimeoPlayerParams;
	};

	/**
	 * Video module for lightGallery
	 * Supports HTML5, YouTube, Vimeo, wistia videos
	 *
	 *
	 * @ref Wistia
	 * https://wistia.com/support/integrations/wordpress(How to get url)
	 * https://wistia.com/support/developers/embed-options#using-embed-options
	 * https://wistia.com/support/developers/player-api
	 * https://wistia.com/support/developers/construct-an-embed-code
	 * http://jsfiddle.net/xvnm7xLm/
	 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
	 * https://wistia.com/support/embed-and-share/sharing-videos
	 * https://private-sharing.wistia.com/medias/mwhrulrucj
	 *
	 * @ref Youtube
	 * https://developers.google.com/youtube/player_parameters#enablejsapi
	 * https://developers.google.com/youtube/iframe_api_reference
	 * https://developer.chrome.com/blog/autoplay/#iframe-delegation
	 *
	 * @ref Vimeo
	 * https://stackoverflow.com/questions/10488943/easy-way-to-get-vimeo-id-from-a-vimeo-url
	 * https://vimeo.zendesk.com/hc/en-us/articles/360000121668-Starting-playback-at-a-specific-timecode
	 * https://vimeo.zendesk.com/hc/en-us/articles/360001494447-Using-Player-Parameters
	 */
	var Video = /** @class */ (function () {
		function Video(instance) {
			// get lightGallery core plugin instance
			this.core = instance;
			this.settings = __assign(__assign({}, videoSettings), this.core.settings);
			return this;
		}
		Video.prototype.init = function () {
			var _this = this;
			/**
			 * Event triggered when video url found without poster
			 * Append video HTML
			 * Play if autoplayFirstVideo is true
			 */
			this.core.LGel.on(lGEvents.hasVideo + ".video", this.onHasVideo.bind(this));
			this.core.LGel.on(lGEvents.posterClick + ".video", function () {
				var $el = _this.core.getSlideItem(_this.core.index);
				_this.loadVideoOnPosterClick($el);
			});
			this.core.LGel.on(lGEvents.slideItemLoad + ".video", this.onSlideItemLoad.bind(this));
			// @desc fired immediately before each slide transition.
			this.core.LGel.on(lGEvents.beforeSlide + ".video", this.onBeforeSlide.bind(this));
			// @desc fired immediately after each slide transition.
			this.core.LGel.on(lGEvents.afterSlide + ".video", this.onAfterSlide.bind(this));
		};
		/**
		 * @desc Event triggered when a slide is completely loaded
		 *
		 * @param {Event} event - lightGalley custom event
		 */
		Video.prototype.onSlideItemLoad = function (event) {
			var _this = this;
			var _a = event.detail, isFirstSlide = _a.isFirstSlide, index = _a.index;
			// Should check the active slide as well as user may have moved to different slide before the first slide is loaded
			if (this.settings.autoplayFirstVideo &&
				isFirstSlide &&
				index === this.core.index) {
				// Delay is just for the transition effect on video load
				setTimeout(function () {
					_this.loadAndPlayVideo(index);
				}, 200);
			}
			// Should not call on first slide. should check only if the slide is active
			if (!isFirstSlide &&
				this.settings.autoplayVideoOnSlide &&
				index === this.core.index) {
					setTimeout(function () {
						_this.loadAndPlayVideo(index);
					}, 500);
				}
		};
		/**
		 * @desc Event triggered when video url or poster found
		 * Append video HTML is poster is not given
		 * Play if autoplayFirstVideo is true
		 *
		 * @param {Event} event - Javascript Event object.
		 */
		Video.prototype.onHasVideo = function (event) {
			var _a = event.detail, index = _a.index, src = _a.src, html5Video = _a.html5Video, hasPoster = _a.hasPoster;
			if (!hasPoster) {
				// All functions are called separately if poster exist in loadVideoOnPosterClick function
				this.appendVideos(this.core.getSlideItem(index), {
					src: src,
					addClass: 'lg-object',
					index: index,
					html5Video: html5Video,
					// Uncode edit ##START##
					autoplay: event.target.getAttribute('data-lb-autoplay'),
					muted: event.target.getAttribute('data-lb-muted'),
					// Uncode edit ##END##
				});
				// Automatically navigate to next slide once video reaches the end.
				this.gotoNextSlideOnVideoEnd(src, index);
			}
		};
		/**
		 * @desc fired immediately before each slide transition.
		 * Pause the previous video
		 * Hide the download button if the slide contains YouTube, Vimeo, or Wistia videos.
		 *
		 * @param {Event} event - Javascript Event object.
		 * @param {number} prevIndex - Previous index of the slide.
		 * @param {number} index - Current index of the slide
		 */
		Video.prototype.onBeforeSlide = function (event) {
			if (this.core.lGalleryOn) {
				var prevIndex = event.detail.prevIndex;
				this.pauseVideo(prevIndex);
			}
			// Uncode edit ##START##
			var _a = event.detail, index = _a.index;
			var $slide = this.core.getSlideItem(index);
			
			var iframe = $slide.selector.querySelector('iframe');
			if ( iframe != null ) {

				var data_play = iframe.getAttribute('data-autoplay');
				if ( typeof data_play !== 'undefined' && data_play === '1' ) {
					this.loadAndPlayVideo(index);

					var videoInfo = this.core.galleryItems[index].__slideVideoInfo || {},
						$videoElement = this.core.getSlideItem(index).find('.lg-video-object').first();
					if (videoInfo.vimeo) {
						var vimeoPlayer = new Vimeo.Player($videoElement.get());
						vimeoPlayer.on('play', function () {
							vimeoPlayer.setCurrentTime(0);
						});
					} else if ( videoInfo.youtube ) {
						try {
							$videoElement.get().contentWindow.postMessage("{\"event\":\"command\",\"func\":\"seekTo\",\"args\":[0, true]}", '*');
						}
						catch (e) {
							console.warn(e);
						}
					}
				}
			}
			// Uncode edit ##END##
		};
		/**
		 * @desc fired immediately after each slide transition.
		 * Play video if autoplayVideoOnSlide option is enabled.
		 *
		 * @param {Event} event - Javascript Event object.
		 * @param {number} prevIndex - Previous index of the slide.
		 * @param {number} index - Current index of the slide
		 * @todo should check on onSlideLoad as well if video is not loaded on after slide
		 */
		Video.prototype.onAfterSlide = function (event) {
			var _this = this;
			var _a = event.detail, index = _a.index, prevIndex = _a.prevIndex;
			// Do not call on first slide
			var $slide = this.core.getSlideItem(index);
			if (this.settings.autoplayVideoOnSlide && index !== prevIndex) {
				if ($slide.hasClass('lg-complete')) {
					setTimeout(function () {
						_this.loadAndPlayVideo(index);
					}, 100);
				}
			}
		};
		Video.prototype.loadAndPlayVideo = function (index) {
			var $slide = this.core.getSlideItem(index);
			var currentGalleryItem = this.core.galleryItems[index];
			if (currentGalleryItem.poster) {
				this.loadVideoOnPosterClick($slide, true);
			}
			else {
				//Uncode edit ##START##
				// this.playVideo(index);
				var iframe = $slide.selector.querySelector('iframe');
				if ( iframe != null ) {
					var data_play = iframe.getAttribute('data-autoplay');
					if ( typeof data_play !== 'undefined' ) {
						if ( data_play === '1' && this.core.index == index ) {
							this.playVideo(index);
						} else {
							this.pauseVideo(index);
						}
					}
				}
				//Uncode edit ##END##
			}
		};
		/**
		 * Play HTML5, Youtube, Vimeo or Wistia videos in a particular slide.
		 * @param {number} index - Index of the slide
		 */
		Video.prototype.playVideo = function (index) {
			this.controlVideo(index, 'play');
		};
		/**
		 * Pause HTML5, Youtube, Vimeo or Wistia videos in a particular slide.
		 * @param {number} index - Index of the slide
		 */
		Video.prototype.pauseVideo = function (index) {
			this.controlVideo(index, 'pause');
		};
		// Uncode edit ##START##
		//Video.prototype.getVideoHtml = function (src, addClass, index, html5Video) {
		Video.prototype.getVideoHtml = function (src, addClass, index, html5Video, autoplay, muted) {
		// Uncode edit ##END##
			var video = '';
			var videoInfo = this.core.galleryItems[index]
				.__slideVideoInfo || {};
			var currentGalleryItem = this.core.galleryItems[index];
			var videoTitle = currentGalleryItem.title || currentGalleryItem.alt;
			videoTitle = videoTitle ? 'title="' + videoTitle + '"' : '';
			var commonIframeProps = "allowtransparency=\"true\"\n            frameborder=\"0\"\n            scrolling=\"no\"\n            allowfullscreen\n            mozallowfullscreen\n            webkitallowfullscreen\n            oallowfullscreen\n            msallowfullscreen";
			if (videoInfo.youtube) {
				var videoId = 'lg-youtube' + index;
				var slideUrlParams = videoInfo.youtube[2]
					? videoInfo.youtube[2] + '&'
					: '';
				// For youtube first parms gets priority if duplicates found
				// Uncode edit ##START##
				// var youTubePlayerParams = "?" + slideUrlParams + "wmode=opaque&autoplay=0&mute=1&enablejsapi=1";
				var youTubePlayerParams = "?" + slideUrlParams + "wmode=opaque&enablejsapi=1";
				if ( ( slideUrlParams.indexOf('autoplay=') < 0 && youTubePlayerParams.indexOf('autoplay=') < 0 ) ) {
					youTubePlayerParams += '&autoplay=0';
				}
				if ( slideUrlParams.indexOf('mute=') < 0 && youTubePlayerParams.indexOf('mute=') < 0 ) {
					youTubePlayerParams += '&mute=1';
				}
				var data_video = '';
				if ( autoplay !== '' ) {
					//youTubePlayerParams = youTubePlayerParams.replace(new RegExp('([?&])autoplay=(.*?)(&|$)'), '$1autoplay=' + (autoplay === 'yes' ? 1 : 0) + '$3' );
					youTubePlayerParams = youTubePlayerParams.replace(new RegExp('([?&])autoplay=(.*?)(&|$)'), '$1$3' );
					youTubePlayerParams = youTubePlayerParams.replace(new RegExp('([?&])autoplay'), '$1' );
					data_video = ' data-autoplay="' + (autoplay === 'yes' ? 1 : 0) + '"';
				}
				// if ( muted !== '' ) {
				// 	youTubePlayerParams = youTubePlayerParams.replace(new RegExp('([?&])mute=(.*?)(&|$)'), '$1mute=' + (muted === 'yes' ? 1 : 0) + '$3' );
				// }
				youTubePlayerParams = youTubePlayerParams.replace(new RegExp('([?&])mute=(.*?)(&|$)'), '$1$3' );

				youTubePlayerParams = youTubePlayerParams.replace('??', '?');
				// Uncode edit ##END##
				var playerParams = youTubePlayerParams +
					(this.settings.youTubePlayerParams
						? '&' + param(this.settings.youTubePlayerParams)
						: '');
				// Uncode edit ##START##
				// video = "<iframe allow=\"autoplay\" id=" + videoId + " class=\"lg-video-object lg-youtube " + addClass + "\" " + videoTitle + " src=\"//www.youtube.com/embed/" + (videoInfo.youtube[1] + playerParams) + "\" " + commonIframeProps + "></iframe>";
				var nocookie = typeof SiteParameters.uncode_nocookie !== 'undefined' ? SiteParameters.uncode_nocookie : '';
				video = "<iframe allow=\"autoplay\"" + data_video + " id=" + videoId + " class=\"lg-video-object lg-youtube " + addClass + "\" " + videoTitle + " src=\"//www.youtube" + nocookie + ".com/embed/" + (videoInfo.youtube[1] + playerParams) + "\" " + commonIframeProps + "></iframe>";
				var tag = document.createElement('script');
				tag.src = "//www.youtube.com/player_api";
				var firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

				// Replace the 'ytplayer' element with an <iframe> and
				// YouTube player after the API code downloads.
				var ytIframeplayer,
					setMute = muted === 'yes' ? 0 : 100;
				window.onYouTubePlayerAPIReady = function() {
					ytIframeplayer = new YT.Player(videoId, {
						videoId: videoInfo.youtube[1],
						events: {
							'onReady': function (event) {
								event.target.setVolume(setMute);
							}
						}
					});
				}
				// Uncode edit ##END##
			}
			else if (videoInfo.vimeo) {
				var videoId = 'lg-vimeo' + index;
				// Uncode edit ##START##
				videoInfo.autoplay = autoplay;
				videoInfo.muted = muted;
				// Uncode edit ##END##
				var playerParams = getVimeoURLParams(this.settings.vimeoPlayerParams, videoInfo);
				// Uncode edit ##START##
				// video = "<iframe allow=\"autoplay\" id=" + videoId + " class=\"lg-video-object lg-vimeo " + addClass + "\" " + videoTitle + " src=\"//player.vimeo.com/video/" + (videoInfo.vimeo[1] + playerParams) + "\" " + commonIframeProps + "></iframe>";
				var data_video = '';
				if ( autoplay !== '' ) {
					data_video = ' data-autoplay="' + (autoplay === 'yes' ? 1 : 0) + '"';
				}
				video = "<iframe allow=\"autoplay\"" + data_video + " id=" + videoId + " class=\"lg-video-object lg-vimeo " + addClass + "\" " + videoTitle + " src=\"//player.vimeo.com/video/" + (videoInfo.vimeo[1] + playerParams) + "\" " + commonIframeProps + "></iframe>";
				// Uncode edit ##END##
			}
			else if (videoInfo.wistia) {
				var wistiaId = 'lg-wistia' + index;
				var playerParams = param(this.settings.wistiaPlayerParams);
				playerParams = playerParams ? '?' + playerParams : '';
				video = "<iframe allow=\"autoplay\" id=\"" + wistiaId + "\" src=\"//fast.wistia.net/embed/iframe/" + (videoInfo.wistia[4] + playerParams) + "\" " + videoTitle + " class=\"wistia_embed lg-video-object lg-wistia " + addClass + "\" name=\"wistia_embed\" " + commonIframeProps + "></iframe>";
			}
			else if (videoInfo.html5) {
				var html5VideoMarkup = '';
				for (var i = 0; i < html5Video.source.length; i++) {
					html5VideoMarkup += "<source src=\"" + html5Video.source[i].src + "\" type=\"" + html5Video.source[i].type + "\">";
				}
				if (html5Video.tracks) {
					var _loop_1 = function (i) {
						var trackAttributes = '';
						var track = html5Video.tracks[i];
						Object.keys(track || {}).forEach(function (key) {
							trackAttributes += key + "=\"" + track[key] + "\" ";
						});
						html5VideoMarkup += "<track " + trackAttributes + ">";
					};
					for (var i = 0; i < html5Video.tracks.length; i++) {
						_loop_1(i);
					}
				}
				var html5VideoAttrs_1 = '';
				var videoAttributes_1 = html5Video.attributes || {};
				Object.keys(videoAttributes_1 || {}).forEach(function (key) {
					html5VideoAttrs_1 += key + "=\"" + videoAttributes_1[key] + "\" ";
				});
				video = "<video class=\"lg-video-object lg-html5 " + (this.settings.videojs && this.settings.videojsTheme
					? this.settings.videojsTheme + ' '
					: '') + " " + (this.settings.videojs ? ' video-js' : '') + "\" " + html5VideoAttrs_1 + ">\n                " + html5VideoMarkup + "\n                Your browser does not support HTML5 video.\n            </video>";
			}
			return video;
		};
		/**
		 * @desc - Append videos to the slide
		 *
		 * @param {HTMLElement} el - slide element
		 * @param {Object} videoParams - Video parameters, Contains src, class, index, htmlVideo
		 */
		Video.prototype.appendVideos = function (el, videoParams) {
			var _a;
			// Uncode edit ##START##
			// var videoHtml = this.getVideoHtml(videoParams.src, videoParams.addClass, videoParams.index, videoParams.html5Video);
			var videoHtml = this.getVideoHtml(videoParams.src, videoParams.addClass, videoParams.index, videoParams.html5Video, videoParams.autoplay, videoParams.muted);
			// Uncode edit ##END##
			el.find('.lg-video-cont').append(videoHtml);
			var $videoElement = el.find('.lg-video-object').first();
			if (videoParams.html5Video) {
				$videoElement.on('mousedown.lg.video', function (e) {
					e.stopPropagation();
				});
			}
			if (this.settings.videojs && ((_a = this.core.galleryItems[videoParams.index].__slideVideoInfo) === null || _a === void 0 ? void 0 : _a.html5)) {
				try {
					return videojs($videoElement.get(), this.settings.videojsOptions);
				}
				catch (e) {
					console.warn('lightGallery:- Make sure you have included videojs');
				}
			}
		};
		Video.prototype.gotoNextSlideOnVideoEnd = function (src, index) {
			var _this = this;
			var $videoElement = this.core
				.getSlideItem(index)
				.find('.lg-video-object')
				.first();
			var videoInfo = this.core.galleryItems[index].__slideVideoInfo || {};
			if (this.settings.gotoNextSlideOnVideoEnd) {
				if (videoInfo.html5) {
					$videoElement.on('ended', function () {
						_this.core.goToNextSlide();
					});
				}
				else if (videoInfo.vimeo) {
					try {
						// https://github.com/vimeo/player.js/#ended
						new Vimeo.Player($videoElement.get()).on('ended', function () {
							_this.core.goToNextSlide();
						});
					}
					catch (e) {
						console.warn('lightGallery:- Make sure you have included //github.com/vimeo/player.js');
					}
				}
				else if (videoInfo.wistia) {
					try {
						window._wq = window._wq || [];
						// @todo Event is gettign triggered multiple times
						window._wq.push({
							id: $videoElement.attr('id'),
							onReady: function (video) {
								video.bind('end', function () {
									_this.core.goToNextSlide();
								});
							},
						});
					}
					catch (e) {
						console.warn('lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js');
					}
				}
			}
		};
		Video.prototype.controlVideo = function (index, action) {
			var $videoElement = this.core
				.getSlideItem(index)
				.find('.lg-video-object')
				.first();
			var videoInfo = this.core.galleryItems[index].__slideVideoInfo || {};
			if (!$videoElement.get())
				return;
			if (videoInfo.youtube) {
				try {
					$videoElement.get().contentWindow.postMessage("{\"event\":\"command\",\"func\":\"" + action + "Video\",\"args\":\"\"}", '*');
				}
				catch (e) {
					console.warn("lightGallery:- " + e);
				}
			}
			else if (videoInfo.vimeo) {
				try {
					new Vimeo.Player($videoElement.get())[action]();
				}
				catch (e) {
					console.warn('lightGallery:- Make sure you have included //github.com/vimeo/player.js');
				}
			}
			else if (videoInfo.html5) {
				if (this.settings.videojs) {
					try {
						videojs($videoElement.get())[action]();
					}
					catch (e) {
						console.warn('lightGallery:- Make sure you have included videojs');
					}
				}
				else {
					$videoElement.get()[action]();
				}
			}
			else if (videoInfo.wistia) {
				try {
					window._wq = window._wq || [];
					// @todo Find a way to destroy wistia player instance
					window._wq.push({
						id: $videoElement.attr('id'),
						onReady: function (video) {
							video[action]();
						},
					});
				}
				catch (e) {
					console.warn('lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js');
				}
			}
		};
		Video.prototype.loadVideoOnPosterClick = function ($el, forcePlay) {
			var _this = this;
			// check slide has poster
			if (!$el.hasClass('lg-video-loaded')) {
				// check already video element present
				if (!$el.hasClass('lg-has-video')) {
					$el.addClass('lg-has-video');
					var _html = void 0;
					var _src = this.core.galleryItems[this.core.index].src;
					var video = this.core.galleryItems[this.core.index].video;
					if (video) {
						_html =
							typeof video === 'string' ? JSON.parse(video) : video;
					}
					var videoJsPlayer_1 = this.appendVideos($el, {
						src: _src,
						addClass: '',
						index: this.core.index,
						html5Video: _html,
					});
					this.gotoNextSlideOnVideoEnd(_src, this.core.index);
					var $tempImg = $el.find('.lg-object').first().get();
					// @todo make sure it is working
					$el.find('.lg-video-cont').first().append($tempImg);
					$el.addClass('lg-video-loading');
					videoJsPlayer_1 &&
						videoJsPlayer_1.ready(function () {
							videoJsPlayer_1.on('loadedmetadata', function () {
								_this.onVideoLoadAfterPosterClick($el, _this.core.index);
							});
						});
					$el.find('.lg-video-object')
						.first()
						.on('load.lg error.lg loadedmetadata.lg', function () {
						setTimeout(function () {
							_this.onVideoLoadAfterPosterClick($el, _this.core.index);
						}, 50);
					});
				}
				else {
					this.playVideo(this.core.index);
				}
			}
			else if (forcePlay) {
				this.playVideo(this.core.index);
			}
		};
		Video.prototype.onVideoLoadAfterPosterClick = function ($el, index) {
			$el.addClass('lg-video-loaded');
			this.playVideo(index);
		};
		Video.prototype.destroy = function () {
			this.core.LGel.off('.lg.video');
			this.core.LGel.off('.video');
		};
		return Video;
	}());

	return Video;

})));


/*! @vimeo/player v2.17.1 | (c) 2022 Vimeo | MIT License | https://github.com/vimeo/player.js */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):((e="undefined"!=typeof globalThis?globalThis:e||self).Vimeo=e.Vimeo||{},e.Vimeo.Player=t())}(this,function(){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var e="undefined"!=typeof global&&"[object global]"==={}.toString.call(global);function i(e,t){return 0===e.indexOf(t.toLowerCase())?e:"".concat(t.toLowerCase()).concat(e.substr(0,1).toUpperCase()).concat(e.substr(1))}function c(e){return/^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(e)}function s(e){var t,n=0<arguments.length&&void 0!==e?e:{},r=n.id,o=n.url,i=r||o;if(!i)throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");if(t=i,!isNaN(parseFloat(t))&&isFinite(t)&&Math.floor(t)==t)return"https://vimeo.com/".concat(i);if(c(i))return i.replace("http:","https:");if(r)throw new TypeError("“".concat(r,"” is not a valid video id."));throw new TypeError("“".concat(i,"” is not a vimeo.com url."))}var t=void 0!==Array.prototype.indexOf,n="undefined"!=typeof window&&void 0!==window.postMessage;if(!(e||t&&n))throw new Error("Sorry, the Vimeo Player API is not available in this browser.");var o,a,u,l,f="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function d(){if(void 0===this)throw new TypeError("Constructor WeakMap requires 'new'");if(l(this,"_id","_WeakMap_"+v()+"."+v()),0<arguments.length)throw new TypeError("WeakMap iterable is not supported")}function h(e,t){if(!m(e)||!a.call(e,"_id"))throw new TypeError(t+" method called on incompatible receiver "+typeof e)}function v(){return Math.random().toString().substring(2)}function m(e){return Object(e)===e}(o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:f).WeakMap||(a=Object.prototype.hasOwnProperty,u=Object.defineProperty&&function(){try{return 1===Object.defineProperty({},"x",{value:1}).x}catch(e){}}(),l=function(e,t,n){u?Object.defineProperty(e,t,{configurable:!0,writable:!0,value:n}):e[t]=n},o.WeakMap=(l(d.prototype,"delete",function(e){if(h(this,"delete"),!m(e))return!1;var t=e[this._id];return!(!t||t[0]!==e)&&(delete e[this._id],!0)}),l(d.prototype,"get",function(e){if(h(this,"get"),m(e)){var t=e[this._id];return t&&t[0]===e?t[1]:void 0}}),l(d.prototype,"has",function(e){if(h(this,"has"),!m(e))return!1;var t=e[this._id];return!(!t||t[0]!==e)}),l(d.prototype,"set",function(e,t){if(h(this,"set"),!m(e))throw new TypeError("Invalid value used as weak map key");var n=e[this._id];return n&&n[0]===e?n[1]=t:l(e,this._id,[e,t]),this}),l(d,"_polyfill",!0),d));var p,y=(function(e){var t,n,r;r=function(){var t,n,r,o,i,a,e=Object.prototype.toString,u="undefined"!=typeof setImmediate?function(e){return setImmediate(e)}:setTimeout;try{Object.defineProperty({},"x",{}),t=function(e,t,n,r){return Object.defineProperty(e,t,{value:n,writable:!0,configurable:!1!==r})}}catch(e){t=function(e,t,n){return e[t]=n,e}}function l(e,t){this.fn=e,this.self=t,this.next=void 0}function c(e,t){r.add(e,t),n=n||u(r.drain)}function s(e){var t,n=typeof e;return null==e||"object"!=n&&"function"!=n||(t=e.then),"function"==typeof t&&t}function f(){for(var e=0;e<this.chain.length;e++)!function(e,t,n){var r,o;try{!1===t?n.reject(e.msg):(r=!0===t?e.msg:t.call(void 0,e.msg))===n.promise?n.reject(TypeError("Promise-chain cycle")):(o=s(r))?o.call(r,n.resolve,n.reject):n.resolve(r)}catch(e){n.reject(e)}}(this,1===this.state?this.chain[e].success:this.chain[e].failure,this.chain[e]);this.chain.length=0}function d(e){var n,r=this;if(!r.triggered){r.triggered=!0,r.def&&(r=r.def);try{(n=s(e))?c(function(){var t=new m(r);try{n.call(e,function(){d.apply(t,arguments)},function(){h.apply(t,arguments)})}catch(e){h.call(t,e)}}):(r.msg=e,r.state=1,0<r.chain.length&&c(f,r))}catch(e){h.call(new m(r),e)}}}function h(e){var t=this;t.triggered||(t.triggered=!0,t.def&&(t=t.def),t.msg=e,t.state=2,0<t.chain.length&&c(f,t))}function v(e,n,r,o){for(var t=0;t<n.length;t++)!function(t){e.resolve(n[t]).then(function(e){r(t,e)},o)}(t)}function m(e){this.def=e,this.triggered=!1}function p(e){this.promise=e,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function y(e){if("function"!=typeof e)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var r=new p(this);this.then=function(e,t){var n={success:"function"!=typeof e||e,failure:"function"==typeof t&&t};return n.promise=new this.constructor(function(e,t){if("function"!=typeof e||"function"!=typeof t)throw TypeError("Not a function");n.resolve=e,n.reject=t}),r.chain.push(n),0!==r.state&&c(f,r),n.promise},this.catch=function(e){return this.then(void 0,e)};try{e.call(void 0,function(e){d.call(r,e)},function(e){h.call(r,e)})}catch(e){h.call(r,e)}}var g=t({},"constructor",y,!(r={add:function(e,t){a=new l(e,t),i?i.next=a:o=a,i=a,a=void 0},drain:function(){var e=o;for(o=i=n=void 0;e;)e.fn.call(e.self),e=e.next}}));return t(y.prototype=g,"__NPO__",0,!1),t(y,"resolve",function(n){return n&&"object"==typeof n&&1===n.__NPO__?n:new this(function(e,t){if("function"!=typeof e||"function"!=typeof t)throw TypeError("Not a function");e(n)})}),t(y,"reject",function(n){return new this(function(e,t){if("function"!=typeof e||"function"!=typeof t)throw TypeError("Not a function");t(n)})}),t(y,"all",function(t){var a=this;return"[object Array]"!=e.call(t)?a.reject(TypeError("Not an array")):0===t.length?a.resolve([]):new a(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");var r=t.length,o=Array(r),i=0;v(a,t,function(e,t){o[e]=t,++i===r&&n(o)},e)})}),t(y,"race",function(t){var r=this;return"[object Array]"!=e.call(t)?r.reject(TypeError("Not an array")):new r(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");v(r,t,function(e,t){n(t)},e)})}),y},(n=f)[t="Promise"]=n[t]||r(),e.exports&&(e.exports=n[t])}(p={exports:{}}),p.exports),g=new WeakMap;function w(e,t,n){var r=g.get(e.element)||{};t in r||(r[t]=[]),r[t].push(n),g.set(e.element,r)}function b(e,t){return(g.get(e.element)||{})[t]||[]}function k(e,t,n){var r=g.get(e.element)||{};if(!r[t])return!0;if(!n)return r[t]=[],g.set(e.element,r),!0;var o=r[t].indexOf(n);return-1!==o&&r[t].splice(o,1),g.set(e.element,r),r[t]&&0===r[t].length}function E(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){return console.warn(e),{}}return e}function T(e,t,n){var r,o;e.element.contentWindow&&e.element.contentWindow.postMessage&&(r={method:t},void 0!==n&&(r.value=n),8<=(o=parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/,"$1")))&&o<10&&(r=JSON.stringify(r)),e.element.contentWindow.postMessage(r,e.origin))}function P(n,r){var t,e,o=[];(r=E(r)).event?("error"===r.event&&b(n,r.data.method).forEach(function(e){var t=new Error(r.data.message);t.name=r.data.name,e.reject(t),k(n,r.data.method,e)}),o=b(n,"event:".concat(r.event)),t=r.data):!r.method||(e=function(e,t){var n=b(e,t);if(n.length<1)return!1;var r=n.shift();return k(e,t,r),r}(n,r.method))&&(o.push(e),t=r.value),o.forEach(function(e){try{if("function"==typeof e)return void e.call(n,t);e.resolve(t)}catch(e){}})}var M=["autopause","autoplay","background","byline","color","controls","dnt","height","id","interactive_params","keyboard","loop","maxheight","maxwidth","muted","playsinline","portrait","responsive","speed","texttrack","title","transparent","url","width"];function _(r,e){var t=1<arguments.length&&void 0!==e?e:{};return M.reduce(function(e,t){var n=r.getAttribute("data-vimeo-".concat(t));return!n&&""!==n||(e[t]=""===n?1:n),e},t)}function N(e,t){var n=e.html;if(!t)throw new TypeError("An element must be provided");if(null!==t.getAttribute("data-vimeo-initialized"))return t.querySelector("iframe");var r=document.createElement("div");return r.innerHTML=n,t.appendChild(r.firstChild),t.setAttribute("data-vimeo-initialized","true"),t.querySelector("iframe")}function F(i,e,t){var a=1<arguments.length&&void 0!==e?e:{},u=2<arguments.length?t:void 0;return new Promise(function(t,n){if(!c(i))throw new TypeError("“".concat(i,"” is not a vimeo.com url."));var e="https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(i));for(var r in a)a.hasOwnProperty(r)&&(e+="&".concat(r,"=").concat(encodeURIComponent(a[r])));var o=new("XDomainRequest"in window?XDomainRequest:XMLHttpRequest);o.open("GET",e,!0),o.onload=function(){if(404!==o.status)if(403!==o.status)try{var e=JSON.parse(o.responseText);if(403===e.domain_status_code)return N(e,u),void n(new Error("“".concat(i,"” is not embeddable.")));t(e)}catch(e){n(e)}else n(new Error("“".concat(i,"” is not embeddable.")));else n(new Error("“".concat(i,"” was not found.")))},o.onerror=function(){var e=o.status?" (".concat(o.status,")"):"";n(new Error("There was an error fetching the embed code from Vimeo".concat(e,".")))},o.send()})}var x,C,j,A=new WeakMap,S=new WeakMap,q={},Player=function(){function Player(u){var e,t,l=this,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if(!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Player),window.jQuery&&u instanceof jQuery&&(1<u.length&&window.console&&console.warn&&console.warn("A jQuery object with multiple elements was passed, using the first element."),u=u[0]),"undefined"!=typeof document&&"string"==typeof u&&(u=document.getElementById(u)),e=u,!Boolean(e&&1===e.nodeType&&"nodeName"in e&&e.ownerDocument&&e.ownerDocument.defaultView))throw new TypeError("You must pass either a valid element or a valid id.");if("IFRAME"===u.nodeName||(t=u.querySelector("iframe"))&&(u=t),"IFRAME"===u.nodeName&&!c(u.getAttribute("src")||""))throw new Error("The player element passed isn’t a Vimeo embed.");if(A.has(u))return A.get(u);this._window=u.ownerDocument.defaultView,this.element=u,this.origin="*";var r,o=new y(function(i,a){var e;l._onMessage=function(e){if(c(e.origin)&&l.element.contentWindow===e.source){"*"===l.origin&&(l.origin=e.origin);var t=E(e.data);if(t&&"error"===t.event&&t.data&&"ready"===t.data.method){var n=new Error(t.data.message);return n.name=t.data.name,void a(n)}var r=t&&"ready"===t.event,o=t&&"ping"===t.method;if(r||o)return l.element.setAttribute("data-ready","true"),void i();P(l,t)}},l._window.addEventListener("message",l._onMessage),"IFRAME"!==l.element.nodeName&&F(s(e=_(u,n)),e,u).then(function(e){var t,n,r,o=N(e,u);return l.element=o,l._originalElement=u,t=u,n=o,r=g.get(t),g.set(n,r),g.delete(t),A.set(l.element,l),e}).catch(a)});return S.set(this,o),A.set(this.element,this),"IFRAME"===this.element.nodeName&&T(this,"ping"),q.isEnabled&&(r=function(){return q.exit()},this.fullscreenchangeHandler=function(){(q.isFullscreen?w:k)(l,"event:exitFullscreen",r),l.ready().then(function(){T(l,"fullscreenchange",q.isFullscreen)})},q.on("fullscreenchange",this.fullscreenchangeHandler)),this}var e,t,n;return e=Player,(t=[{key:"callMethod",value:function(n,e){var r=this,o=1<arguments.length&&void 0!==e?e:{};return new y(function(e,t){return r.ready().then(function(){w(r,n,{resolve:e,reject:t}),T(r,n,o)}).catch(t)})}},{key:"get",value:function(n){var r=this;return new y(function(e,t){return n=i(n,"get"),r.ready().then(function(){w(r,n,{resolve:e,reject:t}),T(r,n)}).catch(t)})}},{key:"set",value:function(n,r){var o=this;return new y(function(e,t){if(n=i(n,"set"),null==r)throw new TypeError("There must be a value to set.");return o.ready().then(function(){w(o,n,{resolve:e,reject:t}),T(o,n,r)}).catch(t)})}},{key:"on",value:function(e,t){if(!e)throw new TypeError("You must pass an event name.");if(!t)throw new TypeError("You must pass a callback function.");if("function"!=typeof t)throw new TypeError("The callback must be a function.");0===b(this,"event:".concat(e)).length&&this.callMethod("addEventListener",e).catch(function(){}),w(this,"event:".concat(e),t)}},{key:"off",value:function(e,t){if(!e)throw new TypeError("You must pass an event name.");if(t&&"function"!=typeof t)throw new TypeError("The callback must be a function.");k(this,"event:".concat(e),t)&&this.callMethod("removeEventListener",e).catch(function(e){})}},{key:"loadVideo",value:function(e){return this.callMethod("loadVideo",e)}},{key:"ready",value:function(){var e=S.get(this)||new y(function(e,t){t(new Error("Unknown player. Probably unloaded."))});return y.resolve(e)}},{key:"addCuePoint",value:function(e,t){var n=1<arguments.length&&void 0!==t?t:{};return this.callMethod("addCuePoint",{time:e,data:n})}},{key:"removeCuePoint",value:function(e){return this.callMethod("removeCuePoint",e)}},{key:"enableTextTrack",value:function(e,t){if(!e)throw new TypeError("You must pass a language.");return this.callMethod("enableTextTrack",{language:e,kind:t})}},{key:"disableTextTrack",value:function(){return this.callMethod("disableTextTrack")}},{key:"pause",value:function(){return this.callMethod("pause")}},{key:"play",value:function(){return this.callMethod("play")}},{key:"requestFullscreen",value:function(){return q.isEnabled?q.request(this.element):this.callMethod("requestFullscreen")}},{key:"exitFullscreen",value:function(){return q.isEnabled?q.exit():this.callMethod("exitFullscreen")}},{key:"getFullscreen",value:function(){return q.isEnabled?y.resolve(q.isFullscreen):this.get("fullscreen")}},{key:"requestPictureInPicture",value:function(){return this.callMethod("requestPictureInPicture")}},{key:"exitPictureInPicture",value:function(){return this.callMethod("exitPictureInPicture")}},{key:"getPictureInPicture",value:function(){return this.get("pictureInPicture")}},{key:"unload",value:function(){return this.callMethod("unload")}},{key:"destroy",value:function(){var n=this;return new y(function(e){var t;S.delete(n),A.delete(n.element),n._originalElement&&(A.delete(n._originalElement),n._originalElement.removeAttribute("data-vimeo-initialized")),n.element&&"IFRAME"===n.element.nodeName&&n.element.parentNode&&(n.element.parentNode.parentNode&&n._originalElement&&n._originalElement!==n.element.parentNode?n.element.parentNode.parentNode.removeChild(n.element.parentNode):n.element.parentNode.removeChild(n.element)),n.element&&"DIV"===n.element.nodeName&&n.element.parentNode&&(n.element.removeAttribute("data-vimeo-initialized"),(t=n.element.querySelector("iframe"))&&t.parentNode&&(t.parentNode.parentNode&&n._originalElement&&n._originalElement!==t.parentNode?t.parentNode.parentNode.removeChild(t.parentNode):t.parentNode.removeChild(t))),n._window.removeEventListener("message",n._onMessage),q.isEnabled&&q.off("fullscreenchange",n.fullscreenchangeHandler),e()})}},{key:"getAutopause",value:function(){return this.get("autopause")}},{key:"setAutopause",value:function(e){return this.set("autopause",e)}},{key:"getBuffered",value:function(){return this.get("buffered")}},{key:"getCameraProps",value:function(){return this.get("cameraProps")}},{key:"setCameraProps",value:function(e){return this.set("cameraProps",e)}},{key:"getChapters",value:function(){return this.get("chapters")}},{key:"getCurrentChapter",value:function(){return this.get("currentChapter")}},{key:"getColor",value:function(){return this.get("color")}},{key:"setColor",value:function(e){return this.set("color",e)}},{key:"getCuePoints",value:function(){return this.get("cuePoints")}},{key:"getCurrentTime",value:function(){return this.get("currentTime")}},{key:"setCurrentTime",value:function(e){return this.set("currentTime",e)}},{key:"getDuration",value:function(){return this.get("duration")}},{key:"getEnded",value:function(){return this.get("ended")}},{key:"getLoop",value:function(){return this.get("loop")}},{key:"setLoop",value:function(e){return this.set("loop",e)}},{key:"setMuted",value:function(e){return this.set("muted",e)}},{key:"getMuted",value:function(){return this.get("muted")}},{key:"getPaused",value:function(){return this.get("paused")}},{key:"getPlaybackRate",value:function(){return this.get("playbackRate")}},{key:"setPlaybackRate",value:function(e){return this.set("playbackRate",e)}},{key:"getPlayed",value:function(){return this.get("played")}},{key:"getQualities",value:function(){return this.get("qualities")}},{key:"getQuality",value:function(){return this.get("quality")}},{key:"setQuality",value:function(e){return this.set("quality",e)}},{key:"getSeekable",value:function(){return this.get("seekable")}},{key:"getSeeking",value:function(){return this.get("seeking")}},{key:"getTextTracks",value:function(){return this.get("textTracks")}},{key:"getVideoEmbedCode",value:function(){return this.get("videoEmbedCode")}},{key:"getVideoId",value:function(){return this.get("videoId")}},{key:"getVideoTitle",value:function(){return this.get("videoTitle")}},{key:"getVideoWidth",value:function(){return this.get("videoWidth")}},{key:"getVideoHeight",value:function(){return this.get("videoHeight")}},{key:"getVideoUrl",value:function(){return this.get("videoUrl")}},{key:"getVolume",value:function(){return this.get("volume")}},{key:"setVolume",value:function(e){return this.set("volume",e)}}])&&r(e.prototype,t),n&&r(e,n),Player}();return e||(x=function(){for(var e,t=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],n=0,r=t.length,o={};n<r;n++)if((e=t[n])&&e[1]in document){for(n=0;n<e.length;n++)o[t[0][n]]=e[n];return o}return!1}(),C={fullscreenchange:x.fullscreenchange,fullscreenerror:x.fullscreenerror},j={request:function(o){return new Promise(function(e,t){function n(){j.off("fullscreenchange",n),e()}j.on("fullscreenchange",n);var r=(o=o||document.documentElement)[x.requestFullscreen]();r instanceof Promise&&r.then(n).catch(t)})},exit:function(){return new Promise(function(t,e){var n,r;j.isFullscreen?(n=function e(){j.off("fullscreenchange",e),t()},j.on("fullscreenchange",n),(r=document[x.exitFullscreen]())instanceof Promise&&r.then(n).catch(e)):t()})},on:function(e,t){var n=C[e];n&&document.addEventListener(n,t)},off:function(e,t){var n=C[e];n&&document.removeEventListener(n,t)}},Object.defineProperties(j,{isFullscreen:{get:function(){return Boolean(document[x.fullscreenElement])}},element:{enumerable:!0,get:function(){return document[x.fullscreenElement]}},isEnabled:{enumerable:!0,get:function(){return Boolean(document[x.fullscreenEnabled])}}}),q=j,function(e){function n(e){"console"in window&&console.error&&console.error("There was an error creating an embed: ".concat(e))}var t=0<arguments.length&&void 0!==e?e:document;[].slice.call(t.querySelectorAll("[data-vimeo-id], [data-vimeo-url]")).forEach(function(t){try{if(null!==t.getAttribute("data-vimeo-defer"))return;var e=_(t);F(s(e),e,t).then(function(e){return N(e,t)}).catch(n)}catch(e){n(e)}})}(),function(e){var r=0<arguments.length&&void 0!==e?e:document;window.VimeoPlayerResizeEmbeds_||(window.VimeoPlayerResizeEmbeds_=!0,window.addEventListener("message",function(e){if(c(e.origin)&&e.data&&"spacechange"===e.data.event)for(var t=r.querySelectorAll("iframe"),n=0;n<t.length;n++)if(t[n].contentWindow===e.source){t[n].parentElement.style.paddingBottom="".concat(e.data.data[0].bottom,"px");break}}))}(),function(e){var u=0<arguments.length&&void 0!==e?e:document;window.VimeoSeoMetadataAppended||(window.VimeoSeoMetadataAppended=!0,window.addEventListener("message",function(e){if(c(e.origin)){var t=E(e.data);if(t&&"ready"===t.event)for(var n,r=u.querySelectorAll("iframe"),o=0;o<r.length;o++){var i=r[o],a=i.contentWindow===e.source;n=i.src,/^https:\/\/player\.vimeo\.com\/video\/\d+/.test(n)&&a&&new Player(i).callMethod("appendVideoMetadata",window.location.href)}}}))}()),Player});
