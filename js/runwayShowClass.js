var runWayShow = function(id, data) {
	var buffer, e, host, m;
	this.id = id;
	this.Data = data;
	this.Ens = {};
	host = (typeof this.Data.wrapper == 'string') ? document.querySelector(this.Data.wrapper) : this.Data.wrapper;
	if (!this.determine() || !host) return;
	this.Ens.host = host;
	this.Ens.root = host;
	this.Ens.callBacks = [];
	this.Data.zoom = (this.Data.zoom == parseFloat(this.Data.zoom)) ? parseFloat(this.Data.zoom) : 2.2;
	this.Data.frameId = 'rs-frame-' + this.id + getRand(1, 10000);
	this.Data.lensId = 'rs-lens-' + this.id + getRand(1, 10000);
	this.Data.viewId = 'rs-view-' + this.id + getRand(1, 10000);

	//init
	buffer = mk();
	e = {};

	host.Data = { ClassID:this.id };
	if (!host.id) host.id = 'runwayShow-' + this.id + getRand(1, 10000);
	buffer = this.template.cloneNode(true);
	if (this.wc.ShadowDOM) {
		e.root = host[this.wc.ShadowDOM]();
		e.root.innerHTML = '<style>' + this.cssStr + '</style>';
		this.Ens.sheet = e.root.querySelector('style');
		e.root.appendChild(buffer);
		this.Ens.root = e.root;
	} else {
		empty(host);
		host.appendChild(mk('', {tag:'h3', att:{innerHTML:'runway-show'}}));
		host.appendChild(buffer);
		e.root = host;
	}//end if

	this.Ens.link = e.root.querySelector('.runwayShow-wrap');
	this.Ens.poster = e.root.querySelector('.poster');
	this.Ens.frame = e.root.querySelector('.frame');
	this.Ens.lens = e.root.querySelector('.lens');
	this.Ens.view = e.root.querySelector('.viewFinder');

	this.Ens.link.href = this.Data.link;
	if (this.Data.title) this.Ens.link.title = this.Data.title;
	this.Ens.link.target = this.Data.target;
	this.Ens.poster.src = this.Data.poster;
	this.Ens.frame.id = this.Data.frameId;
	this.Ens.lens.id = this.Data.lensId;
	this.Ens.lens.classList.add('maneuver');
	this.Ens.view.id = this.Data.viewId;
	this.Ens.view.classList.add('maneuver');

	//video
	e.video = mk('', {tag:'video'});
	this.Ens.video = e.video;
	e.video.Data = { ClassID:this.id };
	e.video.setAttribute('preload', 'metadata');
	if (!data.source.nodeType || data.source.nodeType != 1) {
		data.source = mk('', {tag:'source', att:{src:data.source.src, type:'video/'+data.source.type.toLowerCase()}});
	}//end if
	e.video.appendChild(data.source);
	this.Ens.link.appendChild(e.video);

	//evt
	m = this;//loadedmetadata, loadeddata
	e.video.addEventListener('loadedmetadata',
		function() {
			m.prepareStage();
		}
	, false);

	// method bundle
	if (!this.wc.CustomElements) {
		Object.defineProperties(this.Ens.host, runWayShow.prototype.properties);
		//attrChange
		if (this.observer) {
			e.config = {
				attributes: true
			};
			this.observer.observe(host, e.config);
		}//end if		
	}//end if

	//clear
	for (var i in e) e[i] = null;
	e = null;

	//aspect
	if (this.Data.aspect == 'left') this.Ens.host.setAttribute('data-aspect', 'left');

	//remove hidden
	host.removeAttribute('hidden');

	//i13n
	this.i13n('moduleView', 'runwayShow');

	//isReady
	// this.Data.isReady = true;
};

runWayShow.prototype = {
	tagName: 'runway-show',
	dependencies: [
		'createCSSClass'
	],
	determine: function() {
		if (typeof runWayShow.prototype.isSupport == 'undefined') {
			var anis = isAniSupport(), css = [], e = {};
			runWayShow.prototype.tagP = new RegExp(this.tagName, 'i');//tagName pattern
			runWayShow.prototype.anis = anis;
			runWayShow.prototype.idFirst = true;
			runWayShow.prototype.wc = supportsWebComponents();
			runWayShow.prototype.isSupport = true;
			runWayShow.prototype.observer = '';
			runWayShow.prototype.properties = {};

			//idFirst
			e.ele = mk('');
			e.sets = [];
			for (var i in e.ele) if (/^id$|^classname$/i.test(i)) e.sets.push(i.toLowerCase());
			runWayShow.prototype.idFirst = (e.sets[0] == 'id' || isCSSSupport('-moz-appearance')) ? true : false;

			//animation
			if (typeof anis != 'undefined') {
				e.animate = anis.transition + ':opacity 300ms cubic-bezier(.17,.67,.5,1.7);';
				e.aniFrame = anis.transition + ':opacity 500ms 100ms cubic-bezier(.17,.67,.5,1.7);';
			} else {
				e.animate = '';
				e.aniFrame = '';
			}//end if

			//css
			e.scope = (this.wc.ShadowDOM) ? '' : this.tagName + ' ';
			createCSSClass(this.tagName, 'position:relative;display:inline-block;user-select:none;-webkit-user-select:none;');
			createCSSClass(this.tagName + ' h3', 'display:none');

			css.push({k:e.scope+'h3', v:'display:none;'});
			css.push({k:e.scope+'.runwayShow-wrap', v:'position:relative;width:100%;display:block;'});
			css.push({k:e.scope+'.poster', v:'position:relative;width:100%;height:auto;display:block;opacity:1;z-index:2;'+e.animate});
			css.push({k:e.scope+'video', v:'position:absolute;left:0;top:0;width:100%;height:100%;display:block;z-index:1;'});
			
			css.push({k:e.scope+'.frame', v:'position:absolute;left:102%;top:0;width:0;height:0;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,.3);pointer-events:none;opacity:0;z-index:1;'+e.aniFrame});
			css.push({k:e.scope+'.frame:before', v:'content:\'\';width:100%;height:100%;position:absolute;left:0;top:0;border:1px solid #949494;z-index:3;'});
			css.push({k:e.scope+'.frame:after', v:'content:\'\';width:100%;height:100%;position:absolute;left:-2px;top:-2px;border:1px solid #949494;z-index:3;'});
			css.push({k:e.scope+'.lens', v:'position:relative;height:auto;'});
			css.push({k:e.scope+'.lens img', v:'position:relative;width:100%;height:auto;display:block;opacity:1;z-index:2;'});
			css.push({k:e.scope+'.lens video', v:'position:absolute;left:0;top:0;width:100%;height:100%;'});
			css.push({k:e.scope+'.viewFinder', v:'position:absolute;left:0%;top:0;z-index:3;display:none;pointer-events:none;background-image:radial-gradient(2px at 0px 0px, #739fe1 1px, transparent 1px);background-image:-webkit-radial-gradient(2px at 0px 0px, #739fe1 1px, transparent 1px);background-size:2px 2px;'});

			if (this.wc.ShadowDOM) {
				css.push({k:':host([active]) .poster', v:'opacity:0;'});
				css.push({k:':host([active]) .lens img', v:'opacity:0;'});
				css.push({k:':host(:hover) .viewFinder', v:'display:block;'});
				css.push({k:':host([data-aspect="left"]) .frame', v:'left:-102%;'});
			} else {
				css.push({k:this.tagName+'[active] .poster', v:'opacity:0;'});
				css.push({k:this.tagName+'[active] .lens img', v:'opacity:0;'});
				css.push({k:this.tagName+':hover .viewFinder', v:'display:block;'});
				css.push({k:this.tagName+'[data-aspect="left"] .frame', v:'left:-102%;'});
			}//end if

			//template
			e.buffer = mk();
			runWayShow.prototype.template = e.buffer;
			e.wrap = mk('runwayShow-wrap', {tag:'a'});
			e.buffer.appendChild(e.wrap);
			e.poster = mk('poster', {tag:'img'});
			e.wrap.appendChild(e.poster);
			e.frame = mk('frame');
			e.buffer.appendChild(e.frame);
			e.lens = mk('lens');
			e.frame.appendChild(e.lens);
			e.buffer.appendChild(mk('viewFinder'));

			// if (!this.wc.CustomElements && typeof MutationObserver == 'function') {
			if (!this.wc.CustomElements && typeof MutationObserver != 'undefined') {
				runWayShow.prototype.observer = new MutationObserver(
					function(mutations) {
						mutations.forEach(function(mutation) {
							runWayShow.prototype.mutate(mutation);
						});
					}
				);
			}//end if

			//properties
			runWayShow.prototype.properties = {
				set: {
					configurable: false,
					value: runWayShow.prototype.set
				},
				get: {
					configurable: false,
					value: runWayShow.prototype.get
				},
				state: {
					configurable: false,
					get: function() {
						return this.get('state');
					}
				},
				aspect: {
					configurable: false,
					get: function() {
						return this.get('aspect');
					},
					set: function(value) {
						this.set('aspect', value);
					}
				},
				active: {
					configurable: false,
					get: function() {
						return this.hasAttribute('active');
					},
					set: function(flag) {
						(flag) ? this.setAttribute('active', 'active') : this.removeAttribute('active');
					}
				},
				zoom: {
					configurable: false,
					get: function() {
						return this.get('zoom');
					},
					set: function(value) {
						this.set('zoom', value);
					}
				},
				addCallback: {
					configurable: false,
					value: runWayShow.prototype.addCallback
				},
				removeCallback: {
					configurable: false,
					value: runWayShow.prototype.removeCallback
				},
				play: {
					configurable: false,
					value: runWayShow.prototype.play
				},
				pause: {
					configurable: false,
					value: runWayShow.prototype.pause
				}
			};

			//excute css
			if (this.wc.ShadowDOM) {
				e.cssStr = 'h3,div,figure{display:block;margin:0;padding:0;}img{border:0}a{text-decoration:none}a:hover{text-decoration:underline;}';
				while (css.length) {
					var c = css.shift();
					e.cssStr += c.k + '{' + c.v + '}';
				}//end while
				runWayShow.prototype.cssStr = e.cssStr;
			} else {
				while (css.length) {
					var c = css.shift();
					createCSSClass(c.k, c.v);
				}//end while
			}//end if

			//clear
			css = null;
			for (var i in e) e[i] = null;
			e = null;

			//custom element
			this.activeCustomElement();
		}//end if
		return runWayShow.prototype.isSupport;
	},
	activeCustomElement: function() {
		if (runWayShow.prototype.activeCE) return;
		var b = ['', 'webkit', 'moz', 'o', 'ms'], api = 'registerElement', ce = '', prototype, observer;
		runWayShow.prototype.activeCE = true;
		for (var i=-1,l=b.length;++i<l;) {
			var s = b[i], cApi = api;
			cApi = (s.length) ? api.replace(/^[a-z]{1}/,function($1){return $1.toLocaleUpperCase()}) : api;
			s += cApi;
			if (document[s]) { ce = s; break; }
		}//end for

		if (typeof OrunWayShow == 'undefined') OrunWayShow = {};
		if (!ce) {
			//attachedCallback
			if (typeof MutationObserver == 'function') {
				observer = new MutationObserver(
					function(mutations) {
						mutations.forEach(function(mutation) {
							if (mutation.type != 'childList') return;
							[].slice.call(mutation.addedNodes).forEach(
								function(node) {
									if (runWayShow.prototype.tagP.test(node.tagName)) runWayShow.prototype.attachedCallback(node);
								}
							);
						});
					}
				);
				observer.observe(document.body, {childList:true, subtree:true});
			}//end if

			//none custom element support
			[].slice.call(document.querySelectorAll(this.tagName)).forEach(
				function(node) {
					runWayShow.prototype.attachedCallback(node);
				}
			);
		} else {
			prototype = Object.create(HTMLElement.prototype, runWayShow.prototype.properties);
			prototype.attachedCallback = runWayShow.prototype.attachedCallback;
			prototype.detachedCallback = function() {
				if (typeof this.id == 'undefined') return;
				OrunWayShow['runWayShow'+this.mid].terminate();
			};
			prototype.attributeChangedCallback = runWayShow.prototype.attrChange;
			document[ce](this.tagName, {prototype: prototype});
		}//end if
	},
	attachedCallback: function(node) {
		var conf, mid, tmp, target;
		if (typeof node != 'undefined') {
			//none custom element support
			if (!runWayShow.prototype.tagP.test(node.tagName) || (typeof node.Data != 'undefined' && node.Data.isReady)) return;
			target = node;
		} else {
			target = this;
		}//end if
		if (typeof target.isReady != 'undefined') return;

		mid = 'M' + getRand(1, 10000) + '-' + getRand(1, 10000);
		target.mid = mid;
		conf = {
			wrapper: target,
			aspect: 'right',
			zoom: '2.2',
			triggerByHover: false
		};

		//link
		tmp = target.querySelector('a');
		if (tmp) {
			conf.link = tmp.href;
			conf.title = tmp.title || '';
			conf.target = tmp.target || 'runway-show';
			if (tmp.hasAttribute('data-triggerByHover')) {
				conf.triggerByHover = (tmp.getAttribute('data-triggerByHover') == 'true') ? true : false;
			}//end if
		}//end if

		//video
		tmp = target.querySelector('video');
		if (tmp) {
			conf.poster = tmp.poster || '';
			conf.source = tmp.querySelector('source') || {};
			if (tmp.hasAttribute('data-posterHiRes')) conf.posterHiRes = tmp.getAttribute('data-posterHiRes');
			if (tmp.hasAttribute('data-videoHiRes')) conf.videoHiRes = tmp.getAttribute('data-videoHiRes');
			if (tmp.hasAttribute('data-zoom')) conf.zoom = tmp.getAttribute('data-zoom');
		}//end if

		if (target.hasAttribute('data-conf')) {
			try { tmp = JSON.parse(target.getAttribute('data-conf')); } catch (err) { tmp = {}; }
			for (var j in tmp) {
				conf[j] = tmp[j];
				tmp[j] = null;
			}//end ofr
			tmp = null;
			target.removeAttribute('data-conf');
		}//end if

		//runWayShow
		OrunWayShow['runWayShow'+mid] = new runWayShow(mid, conf);
	},
	attrChange: function(attrName, oldVal, newVal, target) {
		var ins;

		if (['active', 'data-aspect'].indexOf(attrName) == -1) return;
		ins = getIns(target || this, 'runWayShow');
		if (!ins) return;
		switch (attrName) {
			case 'data-aspect':
				ins.Data.aspect = (['right', 'left'].indexOf(newVal) != -1) ? newVal : 'right';
				break;
			case 'active':
				ins.toggle(newVal);
				break;
		}//end switch
	},
	mutate: function(mutation) {
		var attrName, oldVal, newVal;
		if (mutation.type != 'attributes') return;

		attrName = mutation.attributeName;
		oldVal = mutation.oldValue;
		newVal = mutation.target.getAttribute(attrName);
		runWayShow.prototype.attrChange(attrName, oldVal, newVal, mutation.target);
	},
	i13n: function(action, label) {
		var data;
		if (typeof gaExt == 'undefined') return;

		data = {
			action: action
		};
		data.label = label || 'none';
		gaExt.doEventBeacon(this.Ens.host, data);
	},
	resetMagnifier: function() {
		if (this.Data.vWidth <= this.Data.vHeight) {
			this.Data.viewFinderW = 100 / this.Data.zoom;
			this.Data.viewFinderH = this.Data.vWidth * this.Data.viewFinderW / this.Data.vHeight;
			this.Data.frameW = 100;
			this.Data.frameH = this.Data.vWidth / this.Data.vHeight * 100;
			this.Data.lensW = 100 * this.Data.zoom;
		} else {
			this.Data.viewFinderH = 100 / ratio;
			this.Data.viewFinderW = this.Data.vHeight * this.Data.viewFinderH / this.Data.vWidth;
		}//end if

		if (this.Ens.sheet) {
			createCSSClass('#' + this.Data.viewId, 'width:'+this.Data.viewFinderW+'%;height:'+this.Data.viewFinderH +'%;', this.Ens.sheet);
			createCSSClass(':host(:hover) #' + this.Data.frameId, 'width:'+this.Data.frameW+'%;height:'+this.Data.frameH+'%;opacity:1;', this.Ens.sheet);
			createCSSClass('#' + this.Data.lensId, 'width:'+this.Data.lensW+'%;', this.Ens.sheet);
		} else {
			createCSSClass('#' + this.Data.viewId, 'width:'+this.Data.viewFinderW+'%;height:'+this.Data.viewFinderH +'%;');
			createCSSClass('#' + this.Ens.host.id + ':hover #' + this.Data.frameId, 'width:'+this.Data.frameW+'%;height:'+this.Data.frameH+'%;opacity:1;');
			createCSSClass('#' + this.Data.lensId, 'width:'+this.Data.lensW+'%;');
		}//end if
	},
	prepareStage: function() {
		var evts;

		this.Data.vWidth = this.Ens.video.videoWidth;
		this.Data.vHeight = this.Ens.video.videoHeight;
		this.resetMagnifier();

		this.Ens.lens.appendChild(mk('', {tag:'img', att:{src:this.Data.posterHiRes || this.Data.poster}}));
		this.Ens.lensVideo = this.Ens.video.cloneNode(true);
		if (this.Data.videoHiRes) this.Ens.lensVideo.src = this.Data.videoHiRes;
		this.Ens.lens.appendChild(this.Ens.lensVideo);

		//evt
		evts = ['play', 'pause', 'ended'];
		for (var i=-1,l=evts.length;++i<l;) this.Ens.video.addEventListener(evts[i], this.eActG, false);
		if (!isEventSupported('touchstart')) {
			evts = ['mouseover', 'mouseout', 'mousemove'];
			for (var i=-1,l=evts.length;++i<l;) this.Ens.host.addEventListener(evts[i], this.eActG, false);
		}//end if

		//isReady
		this.Data.isReady = true;
	},
	pointer: function(e) {
		var res, docElement, body, pos;
		
		res = {};
		docElement = document.documentElement;

		//pointerX
		body = document.body || { scrollLeft: 0 };
		res.x = e.pageX || (e.clientX + (docElement.scrollLeft || body.scrollLeft) - (docElement.clientLeft || 0));

		//pointerX
		body = document.body || { scrollTop: 0 };
		res.y = e.pageY || (e.clientY + (docElement.scrollTop || body.scrollTop) - (docElement.clientTop || 0));

		pos = getPosition(this.Ens.host);
		res.x -= pos[0];
		res.y -= pos[1];

		return res;
	},
	eActG: function(e) {
		var obj, ins;
		obj  = tNa(e);
		if (!/video/i.test(obj.t.tagName)) obj = tNa(e, 'runway-show');
		ins = getIns(obj.t, 'runWayShow');
		if (ins) ins.eAct(e);
	},
	eAct: function(e) {
		var obj = tNa(e);

		if (!/^mouse/i.test(obj.a)) {
			this.i13n('runwayShowAct', obj.a);
			this.executeCallBack(obj.a);
		}//end if

		switch (obj.a) {
			case 'mousemove':
				this.executeCallBack('mousemove');

				obj.pos = this.pointer(e);
				obj.size = getSize(this.Ens.host);

				obj.x = obj.pos.x / obj.size[0] * 100 - this.Data.viewFinderW / 2;
				obj.y = obj.pos.y / obj.size[1] * 100 - this.Data.viewFinderH / 2;

				//fix
				if (obj.x < 0) obj.x = 0;
				else if (obj.x + this.Data.viewFinderW >= 100) obj.x = 100 - this.Data.viewFinderW;

				if (obj.y < 0) obj.y = 0;
				else if (obj.y + this.Data.viewFinderH >= 100) obj.y = 100 - this.Data.viewFinderH;

				obj.lX = (100 / this.Data.frameW) * obj.x * this.Data.zoom * -1;//lens x
				obj.lY = (100 / this.Data.frameH) * obj.y * this.Data.zoom * -1;//lens y

				//selector
				if (this.idFirst) {
					obj.sView = '#' + this.Data.viewId + '.maneuver';
					obj.sLens = '#' + this.Data.lensId + '.maneuver';
				} else {
					obj.sView = '.maneuver#' + this.Data.viewId;
					obj.sLens = '.maneuver#' + this.Data.lensId;
				}//end if

				//CSS
				if (this.Ens.sheet) {
					createCSSClass(obj.sView, 'left:'+obj.x+'%;top:'+obj.y+'%;', this.Ens.sheet);
					createCSSClass(obj.sLens, 'left:'+obj.lX+'%;top:'+obj.lY+'%;', this.Ens.sheet);
				} else {
					createCSSClass(obj.sView, 'left:'+obj.x+'%;top:'+obj.y+'%;');
					createCSSClass(obj.sLens, 'left:'+obj.lX+'%;top:'+obj.lY+'%;');
				}//end if
				break;
			case 'mouseover':
				if (!this.Data.triggerByHover) return;
				this.i13n('runwayShowAct', obj.a);
				this.executeCallBack('mouseover');
				if (!this.Ens.host.hasAttribute('active')) this.Ens.host.setAttribute('active', 'active');
				break;
			case 'mouseout':
				if (!this.Data.triggerByHover) return;
				this.i13n('runwayShowAct', obj.a);
				this.executeCallBack('mouseout');
				if (this.Ens.host.hasAttribute('active')) this.Ens.host.removeAttribute('active');
				break;
			case 'ended':
				this.Ens.host.removeAttribute('active');
				break;
		}//end switch
	},
	set: function(key, value) {
		var ins;
		ins = (typeof this.tagName != 'undefined') ? getIns(this, 'runWayShow') : this;
		if (!ins) return;
		switch (key) {
			case 'zoom':
				if (value == parseFloat(value)) {
					ins.Data.zoom = parseFloat(value);
					ins.resetMagnifier();
				}//end if
				break;
			case 'triggerByHover':
				if (typeof value == 'boolean') ins.Data.triggerByHover = value;
				break;
			case 'aspect':
				ins.Data.aspect = (['right', 'left'].indexOf(value) != -1) ? value : 'right';
				(value == 'right') ? ins.Ens.host.removeAttribute('data-aspect') : ins.Ens.host.setAttribute('data-aspect', value);
				break;
			default:
				if (['title', 'target', 'link'].indexOf(key) != -1) {
					//title, target, link
					ins.Data[key] = value;
					ins.Ens.link[(key == 'link') ? 'href' : key] = value;
				}//end if
		}//end switch
	},
	get: function(key) {
		var ins, res;
		ins = (typeof this.tagName != 'undefined') ? getIns(this, 'runWayShow') : this;
		if (!ins) return;

		switch (key) {
			case 'state':
				res = (ins.Ens.video.paused) ? 'pause' : 'play';
				break;
			default:
				//triggerByHover, zoom
				res = ins.Data[key];
		}//end if
		return res;
	},
	addCallback: function(fn) {
		var ins;
		ins = (typeof this.tagName != 'undefined') ? getIns(this, 'runWayShow') : this;
		if (!ins || typeof fn != 'function' || ins.Ens.callBacks.indexOf(fn) != -1) return;
		ins.Ens.callBacks.push(fn);
	},
	removeCallback: function(fn) {
		var ins;
		ins = (typeof this.tagName != 'undefined') ? getIns(this, 'runWayShow') : this;
		if (!ins || typeof fn != 'function' || ins.Ens.callBacks.indexOf(fn) == -1) return;
		ins.Ens.callBacks.splice(ins.Ens.callBacks.indexOf(fn), 1);
	},
	executeCallBack: function(action) {
		var host;
		if (!this.Ens.callBacks.length) return;

		host = this.Ens.host;
		//mouseover, mouseout, play, pause, ended
		this.Ens.callBacks.forEach(
			function(fn) {
				fn(action, host);
			}
		);
	},
	play: function(e) {
		var ins;
		ins = (typeof this.tagName != 'undefined') ? getIns(this, 'runWayShow') : this;
		if (!ins || ins.Ens.host.hasAttribute('active')) return;
		ins.Ens.host.setAttribute('active', 'active');
	},
	pause: function() {
		var ins;
		ins = (typeof this.tagName != 'undefined') ? getIns(this, 'runWayShow') : this;
		if (!ins || !ins.Ens.host.hasAttribute('active')) return;
		ins.Ens.host.removeAttribute('active');
	},
	toggle: function(flag) {
		if (flag) {
			if (!this.Ens.video.paused) return;
			try {
				this.Ens.video.currentTime = 0;//IE may error
				this.Ens.lensVideo.currentTime = 0;
			} catch(err) {}
			this.Ens.video.play();
			this.Ens.lensVideo.play();
		} else {
			if (this.Ens.video.paused) return;
			this.Ens.video.pause();
			this.Ens.lensVideo.pause();
		}//end if
	},
	terminate: function() {
		var mid, evts;

		mid = this.id;

		//events
		evts = ['play', 'pause', 'ended'];
		for (var i=-1,l=evts.length;++i<l;) this.Ens.video.removeEventListener(evts[i], this.eActG, false);
		if (!isEventSupported('touchstart')) {
			evts = ['mouseover', 'mouseout'];
			for (var i=-1,l=evts.length;++i<l;) this.Ens.host.removeEventListener(evts[i], this.eActG, false);
		}//end if

		setTimeout(function(){
			var c = OrunWayShow['runWayShow'+mid];
			purge(c.Data);
			for (var i in c.Ens) c.Ens[i] = null;
			c.id = c.Data = c.Ens = null;
			try { delete(OrunWayShow['runWayShow'+mid]); } catch(e) {}
		}, 100);
	}
};

/*auto-registration*/
(function() {
	var dependencies, c = 0, max = 10000;//10 seconds
	if (typeof navigator.oRegists == 'undefined') navigator.oRegists = {};
	dependencies = runWayShow.prototype.dependencies;
	navigator.oRegists.runWayShow = setInterval(
		function() {
			var isReady = true;
			c += 5;
			if (c >= max) {
				clearInterval(navigator.oRegists.runWayShow);
				return;
			}//end if
			for (var i=-1,l=dependencies.length;++i<l;) {
				var root = window, d = dependencies[i].split('.');
				while (d.length) {
					var prop = d.shift();
					if (!root[prop]) {
						root = null;
						break;
					} else root = root[prop];
				}//end while
				isReady &= (root != null);
			}//end for
			if (isReady && document.body) {
				clearInterval(navigator.oRegists.runWayShow);
				navigator.oRegists.runWayShow = null;
				runWayShow.prototype.determine();
			}//end if
		}
	, 5);
})();
/*programed by mei(李維翰), http://www.facebook.com/mei.studio.li*/