/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "243d84609c119cc29011"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "https://b.yzcdn.cn/zanui/weapp";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/main.js")(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../packages/actionsheet/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Actionsheet 行动按钮</h2>\n<h3>使用指南</h3>\n<p>在 index.json 中引入组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\">{\n  <span class=\"hljs-attr\">\"usingComponents\"</span>: {\n    <span class=\"hljs-attr\">\"zan-actionsheet\"</span>: <span class=\"hljs-string\">\"path/to/zanui-weapp/dist/actionsheet/index\"</span>\n  }\n}\n</code></pre>\n<h3>使用指南</h3>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">button</span> <span class=\"hljs-attr\">bindtap</span>=<span class=\"hljs-string\">\"openActionSheet\"</span>&gt;</span>Open ActionSheet<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">button</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">view</span> <span class=\"hljs-attr\">class</span>=<span class=\"hljs-string\">\"actionsheet-container\"</span>&gt;</span>\n  <span class=\"hljs-comment\">&lt;!-- 监听自定义事件 cancel 和 actionclick，绑定回调函数 --&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-actionsheet</span>\n    <span class=\"hljs-attr\">show</span>=<span class=\"hljs-string\">\"{{ show }}\"</span>\n    <span class=\"hljs-attr\">actions</span>=<span class=\"hljs-string\">\"{{ actions }}\"</span>\n    <span class=\"hljs-attr\">cancel-text</span>=<span class=\"hljs-string\">\"{{ cancelText }}\"</span>\n    <span class=\"hljs-attr\">cancel-with-mask</span>=<span class=\"hljs-string\">\"{{ cancelWithMask }}\"</span>\n    <span class=\"hljs-attr\">bind:cancel</span>=<span class=\"hljs-string\">\"closeActionSheet\"</span>\n    <span class=\"hljs-attr\">bind:actionclick</span>=<span class=\"hljs-string\">\"handleActionClick\"</span>\n  &gt;</span>\n  <span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-actionsheet</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">view</span>&gt;</span>\n</code></pre>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\"><span class=\"hljs-comment\">// 在 Page 中混入 Actionsheet 里面声明的方法</span>\nPage({\n  <span class=\"hljs-attr\">data</span>: {\n    <span class=\"hljs-attr\">show</span>: <span class=\"hljs-literal\">false</span>,\n    <span class=\"hljs-attr\">cancelWithMask</span>: <span class=\"hljs-literal\">true</span>,\n    <span class=\"hljs-attr\">actions</span>: [{\n      <span class=\"hljs-attr\">name</span>: <span class=\"hljs-string\">'选项1'</span>,\n      <span class=\"hljs-attr\">subname</span>: <span class=\"hljs-string\">'选项描述语1'</span>,\n      <span class=\"hljs-attr\">loading</span>: <span class=\"hljs-literal\">false</span>\n    }, {\n      <span class=\"hljs-attr\">name</span>: <span class=\"hljs-string\">'选项2'</span>,\n      <span class=\"hljs-attr\">subname</span>: <span class=\"hljs-string\">'选项描述语2'</span>,\n      <span class=\"hljs-attr\">loading</span>: <span class=\"hljs-literal\">false</span>\n    }, {\n      <span class=\"hljs-attr\">name</span>: <span class=\"hljs-string\">'去分享'</span>,\n      <span class=\"hljs-attr\">openType</span>: <span class=\"hljs-string\">'share'</span>\n    }],\n    <span class=\"hljs-attr\">cancelText</span>: <span class=\"hljs-string\">'关闭 Action'</span>\n  },\n  openActionSheet() {\n    <span class=\"hljs-keyword\">this</span>.setData({\n      <span class=\"hljs-string\">'show'</span>: <span class=\"hljs-literal\">true</span>\n    });\n  },\n  closeActionSheet() {\n    <span class=\"hljs-keyword\">this</span>.setData({\n      <span class=\"hljs-string\">'show'</span>: <span class=\"hljs-literal\">false</span>\n    });\n  },\n  handleActionClick({ detail }) {\n    <span class=\"hljs-comment\">// 获取被点击的按钮 index</span>\n    <span class=\"hljs-keyword\">const</span> { index } = detail;\n  }\n});\n</code></pre>\n<h4><code v-pre=\"\">Actionsheet</code> 支持的具体参数如下（ 传入时使用分隔线写法 ）</h4>\n<table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n<th>必须</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>show</td>\n<td>用来表示是否展示行动按钮</td>\n<td>Boolean</td>\n<td>false</td>\n<td></td>\n</tr>\n<tr>\n<td>actions</td>\n<td>指定弹层里的按钮</td>\n<td>Array</td>\n<td>[]</td>\n<td></td>\n</tr>\n<tr>\n<td>cancelText</td>\n<td>行动按钮底部取消按钮的文案，不传则不显示取消按钮</td>\n<td>String</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>cancelWithMask</td>\n<td>是否在点击背景时，关闭行动按钮</td>\n<td>Boolean</td>\n<td>false</td>\n<td></td>\n</tr>\n<tr>\n<td>mask-class</td>\n<td>用于控制蒙层样式的外部类</td>\n<td>String</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>container-class</td>\n<td>用于控制容器样式的外部类</td>\n<td>String</td>\n<td></td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<p>actions 的具体数据结构</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\"><span class=\"hljs-comment\">// actions 为数组结构传入</span>\n[{\n  <span class=\"hljs-comment\">// 按钮文案</span>\n  name: <span class=\"hljs-string\">'选项1'</span>,\n  <span class=\"hljs-comment\">// 按钮描述文案，不传就不显示</span>\n  subname: <span class=\"hljs-string\">'选项描述语1'</span>,\n  <span class=\"hljs-comment\">// 按钮是否显示为 loading</span>\n  loading: <span class=\"hljs-literal\">false</span>,\n  <span class=\"hljs-comment\">// 按钮的微信开放能力</span>\n  <span class=\"hljs-comment\">// 具体支持可参考微信官方文档：https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html</span>\n  openType: <span class=\"hljs-string\">'share'</span>\n}]\n</code></pre>\n<p><wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Actionsheet 行动按钮"}

/***/ }),

/***/ "../../packages/badge/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Badge 徽章</h2>\n<h3>使用指南</h3>\n<p>在 index.json 中引入组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\">{\n  <span class=\"hljs-attr\">\"usingComponents\"</span>: {\n    <span class=\"hljs-attr\">\"zan-badge\"</span>: <span class=\"hljs-string\">\"path/to/zanui-weapp/dist/badge/index\"</span>\n  }\n}\n</code></pre>\n<h3>代码演示</h3>\n<h4>基础用法</h4>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">view</span> <span class=\"hljs-attr\">class</span>=<span class=\"hljs-string\">\"badge-container\"</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-badge</span>&gt;</span>10<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-badge</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">view</span>&gt;</span>\n</code></pre>\n<h4>自定义参数</h4>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">view</span> <span class=\"hljs-attr\">class</span>=<span class=\"hljs-string\">\"badge-container\"</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-badge</span>\n    <span class=\"hljs-attr\">color</span>=<span class=\"hljs-string\">\"{{ color }}\"</span>\n    <span class=\"hljs-attr\">background-color</span>=<span class=\"hljs-string\">\"{{ backgroundColor }}\"</span>\n    <span class=\"hljs-attr\">font-size</span>=<span class=\"hljs-string\">\"{{ fontSize }}\"</span>\n    <span class=\"hljs-attr\">box-shadow</span>=<span class=\"hljs-string\">\"{{ boxShadow }}\"</span>\n  &gt;</span>10<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-badge</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">view</span>&gt;</span>\n</code></pre>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-css\"><span class=\"hljs-selector-class\">.badge-container</span> {\n  <span class=\"hljs-attribute\">width</span>: <span class=\"hljs-number\">100px</span>;\n  <span class=\"hljs-attribute\">height</span>: <span class=\"hljs-number\">100px</span>;\n}\n</code></pre>\n<h3>API</h3>\n<table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>color</td>\n<td>字体颜色</td>\n<td>String</td>\n<td><code v-pre=\"\">#fff</code></td>\n</tr>\n<tr>\n<td>background-color</td>\n<td>背景颜色</td>\n<td>String</td>\n<td><code v-pre=\"\">#f44</code></td>\n</tr>\n<tr>\n<td>font-size</td>\n<td>字体大小</td>\n<td>Number</td>\n<td>10</td>\n</tr>\n<tr>\n<td>box-shadow</td>\n<td>为了更好的控制宽度，使用了box-shadow来实现badge的边框，可以根据box-shadow的语法自行修改颜色和宽度</td>\n<td>String</td>\n<td><code v-pre=\"\">0 0 0 2px #fff</code></td>\n</tr>\n</tbody>\n</table>\n<p><wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Badge 徽章"}

/***/ }),

/***/ "../../packages/btn/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Button 按钮</h2>\n<h3>使用指南</h3>\n<p>在 json 文件中配置button组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\"><span class=\"hljs-string\">\"usingComponents\"</span>: {\n  <span class=\"hljs-attr\">\"zan-button\"</span>: <span class=\"hljs-string\">\"/dist/btn/index\"</span>\n}\n</code></pre>\n<h3>代码演示</h3>\n<h4>基础用法</h4>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-button</span>&gt;</span>取消订单<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-button</span>&gt;</span>\n</code></pre>\n<h4>按钮类型</h4>\n<p>按钮支持额外的三种类型 primary, danger, warn</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-button</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">\"primary\"</span>&gt;</span>确认付款<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-button</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-button</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">\"danger\"</span>&gt;</span>确认付款<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-button</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-button</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">\"warn\"</span>&gt;</span>确认付款<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-button</span>&gt;</span>\n</code></pre>\n<h4>按钮大小</h4>\n<p>按钮支持额外三种大小 large, small, mini</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-button</span> <span class=\"hljs-attr\">size</span>=<span class=\"hljs-string\">\"large\"</span>&gt;</span>确认付款<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-button</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-button</span> <span class=\"hljs-attr\">size</span>=<span class=\"hljs-string\">\"small\"</span>&gt;</span>取消订单<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-button</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-button</span> <span class=\"hljs-attr\">size</span>=<span class=\"hljs-string\">\"mini\"</span>&gt;</span>确认付款<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-button</span>&gt;</span>\n</code></pre>\n<h4>其他</h4>\n<p>按钮镂空状态</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-button</span> <span class=\"hljs-attr\">plain</span>&gt;</span>确认付款<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-button</span>&gt;</span>\n</code></pre>\n<p>按钮加载状态</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-button</span> <span class=\"hljs-attr\">loading</span>&gt;</span>确认付款<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-button</span>&gt;</span>\n</code></pre>\n<p>按钮禁用状态</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-button</span> <span class=\"hljs-attr\">disabled</span>&gt;</span>确认付款<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-button</span>&gt;</span>\n</code></pre>\n<h3>配合 button-group 使用</h3>\n<p>通过配合 zan-button-group 使用，可以让按钮之间自动有合适的间距出现，使用方式如下</p>\n<p>1.在 json 文件中配置 button-group 组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\"><span class=\"hljs-string\">\"usingComponents\"</span>: {\n  <span class=\"hljs-attr\">\"zan-button\"</span>: <span class=\"hljs-string\">\"/dist/btn/index\"</span>,\n  <span class=\"hljs-attr\">\"zan-button-group\"</span>: <span class=\"hljs-string\">\"/dist/btn-group/index\"</span>\n}\n</code></pre>\n<p>2.在 wxml 中直接引入</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-button-group</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-button</span>&gt;</span>确认付款<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-button</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-button</span>&gt;</span>再考虑下<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-button</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-button-group</span>&gt;</span>\n</code></pre>\n<p><img src=\"https://img.yzcdn.cn/public_files/2017/02/08/1b1e39ed3dc6b63519a68ba1e2650cfc.png\" alt=\"\"></p>\n<h3>属性</h3>\n<table>\n<thead>\n<tr>\n<th>名称</th>\n<th>类型</th>\n<th>是否必须</th>\n<th>默认</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>type</td>\n<td>String</td>\n<td>否</td>\n<td>空</td>\n<td>按钮类型，值有primary、warn、danger</td>\n</tr>\n<tr>\n<td>size</td>\n<td>String</td>\n<td>否</td>\n<td>空</td>\n<td>按钮大小，值有large、small、mini</td>\n</tr>\n<tr>\n<td>plain</td>\n<td>Boolean</td>\n<td>否</td>\n<td>false</td>\n<td>\b按钮是否镂空，默认为false</td>\n</tr>\n<tr>\n<td>disabled</td>\n<td>Boolean</td>\n<td>否</td>\n<td>false</td>\n<td>按钮是否禁用，默认为false</td>\n</tr>\n<tr>\n<td>loading</td>\n<td>Boolean</td>\n<td>否</td>\n<td>false</td>\n<td>按钮加载状态，默认为false</td>\n</tr>\n<tr>\n<td>openType</td>\n<td>String</td>\n<td>否</td>\n<td>-</td>\n<td>微信开放能力</td>\n</tr>\n<tr>\n<td>appParameter</td>\n<td>String</td>\n<td>否</td>\n<td>-</td>\n<td>打开 APP 时，向 APP 传递的参数</td>\n</tr>\n<tr>\n<td>hoverStartTime</td>\n<td>Number</td>\n<td>否</td>\n<td>20</td>\n<td>按住后多久出现点击态，单位毫秒</td>\n</tr>\n<tr>\n<td>hoverStayTime</td>\n<td>Number</td>\n<td>否</td>\n<td>70</td>\n<td>手指松开后点击态保留时间，单位毫秒</td>\n</tr>\n<tr>\n<td>lang</td>\n<td>String</td>\n<td>否</td>\n<td>en</td>\n<td>指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文</td>\n</tr>\n<tr>\n<td>sessionFrom</td>\n<td>String</td>\n<td>否</td>\n<td>-</td>\n<td>会话来源</td>\n</tr>\n<tr>\n<td>sendMessageTitle</td>\n<td>String</td>\n<td>否</td>\n<td>当前标题</td>\n<td>会话内消息卡片标题</td>\n</tr>\n<tr>\n<td>sendMessagePath</td>\n<td>String</td>\n<td>否</td>\n<td>当前分享路径</td>\n<td>会话内消息卡片点击跳转小程序路径</td>\n</tr>\n<tr>\n<td>sendMessageImg</td>\n<td>String</td>\n<td>否</td>\n<td>截图</td>\n<td>会话内消息卡片图片</td>\n</tr>\n<tr>\n<td>showMessageCard</td>\n<td>String</td>\n<td>否</td>\n<td>false</td>\n<td>显示会话内消息卡片</td>\n</tr>\n</tbody>\n</table>\n<h3>事件</h3>\n<table>\n<thead>\n<tr>\n<th>事件名称</th>\n<th>说明</th>\n<th>回调参数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>btnclick</td>\n<td>按钮在可用状态被点击时触发</td>\n<td></td>\n</tr>\n<tr>\n<td>disabledclick</td>\n<td>在传入的 disabled 为 true 时，点击按钮会触发此事件</td>\n<td></td>\n</tr>\n<tr>\n<td>getuserinfo</td>\n<td>用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同wx.getUserInfo</td>\n<td></td>\n</tr>\n<tr>\n<td>contact</td>\n<td>客服消息回调</td>\n<td></td>\n</tr>\n<tr>\n<td>getphonenumber</td>\n<td>获取用户手机号回调</td>\n<td></td>\n</tr>\n<tr>\n<td>error</td>\n<td>当使用开放能力时，发生错误的回调</td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<p><wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Button 按钮"}

/***/ }),

/***/ "../../packages/capsule/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Capsule 胶囊</h2>\n<h3>使用指南</h3>\n<p>在 index.json 中引入组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\">{\n  <span class=\"hljs-attr\">\"usingComponents\"</span>: {\n    <span class=\"hljs-attr\">\"zan-capsule\"</span>: <span class=\"hljs-string\">\"/packages/capsule/index\"</span>\n  }\n}\n</code></pre>\n<h3>代码演示</h3>\n<p>Panel 提供了一块白色的展示区域，使用方式如下</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-capsule</span> <span class=\"hljs-attr\">color</span>=<span class=\"hljs-string\">\"#38f\"</span> <span class=\"hljs-attr\">leftText</span>=<span class=\"hljs-string\">\"1折扣\"</span> <span class=\"hljs-attr\">rightText</span>=<span class=\"hljs-string\">\"限购一份\"</span> /&gt;</span>\n</code></pre>\n<table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n<th>必须</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>type</td>\n<td>capsule的主体颜色</td>\n<td>String</td>\n<td>''（有danger这个主题色）</td>\n<td></td>\n</tr>\n<tr>\n<td>color</td>\n<td>自定义capsule颜色</td>\n<td>String</td>\n<td>-</td>\n<td></td>\n</tr>\n<tr>\n<td>leftText</td>\n<td>左侧文案</td>\n<td>String</td>\n<td>-</td>\n<td></td>\n</tr>\n<tr>\n<td>rightText</td>\n<td>右侧文案</td>\n<td>String</td>\n<td>-</td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<p><wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Capsule 胶囊"}

/***/ }),

/***/ "../../packages/card/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Card 卡片</h2>\n<h3>使用指南</h3>\n<p>在 index.json 中引入组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\">{\n  <span class=\"hljs-attr\">\"usingComponents\"</span>: {\n    <span class=\"hljs-attr\">\"zan-card\"</span>: <span class=\"hljs-string\">\"path/to/zanui-weapp/dist/card/index\"</span>\n  }\n}\n</code></pre>\n<h3>代码演示</h3>\n<h4>基础用法</h4>\n<p>卡片可以用于左侧图片，右侧描述信息的展示。默认是商品相关内容的展示，需要展示其他内容可以使用自定义slot。</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-card</span>\n  <span class=\"hljs-attr\">card-class</span>=<span class=\"hljs-string\">\"test-card\"</span>\n  <span class=\"hljs-attr\">thumb</span>=<span class=\"hljs-string\">\"https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg\"</span>\n  <span class=\"hljs-attr\">price</span>=<span class=\"hljs-string\">\"999.99\"</span>\n  <span class=\"hljs-attr\">title</span>=<span class=\"hljs-string\">\"红烧牛肉【虚拟商品】【有库存】【有sku】\"</span>\n  <span class=\"hljs-attr\">num</span>=<span class=\"hljs-string\">\"2\"</span>\n  <span class=\"hljs-attr\">desc</span>=<span class=\"hljs-string\">\"3000克 50%\"</span>\n  <span class=\"hljs-attr\">status</span>=<span class=\"hljs-string\">\"已发货\"</span>\n&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-card</span>&gt;</span>\n</code></pre>\n<h4>使用slot</h4>\n<p><code v-pre=\"\">zan-card</code> 由 <code v-pre=\"\">zan-card__thumb</code> 和 <code v-pre=\"\">zan-card__detail</code> 组成。分别负责左侧图片展示和右侧内容区域展示。两部分内容可以使用slot进行替换。</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-card</span>\n  <span class=\"hljs-attr\">card-class</span>=<span class=\"hljs-string\">\"test-card\"</span>\n  <span class=\"hljs-attr\">useDetailSlot</span>=<span class=\"hljs-string\">\"{{ true }}\"</span>\n&gt;</span>\n  <span class=\"hljs-comment\">&lt;!-- 右侧详情 --&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">view</span> <span class=\"hljs-attr\">slot</span>=<span class=\"hljs-string\">\"detail-slot\"</span> <span class=\"hljs-attr\">class</span>=<span class=\"hljs-string\">\"zan-card__detail\"</span>&gt;</span>\n    我是标题\n  <span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">view</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-card</span>&gt;</span>\n</code></pre>\n<h3>API</h3>\n<table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>card-class</td>\n<td>自定义最外层class</td>\n<td>String</td>\n<td>-</td>\n</tr>\n<tr>\n<td>thumb</td>\n<td>左侧缩略图</td>\n<td>String</td>\n<td>-</td>\n</tr>\n<tr>\n<td>price</td>\n<td>商品价格</td>\n<td>String</td>\n<td>-</td>\n</tr>\n<tr>\n<td>title</td>\n<td>商品标题</td>\n<td>String</td>\n<td>-</td>\n</tr>\n<tr>\n<td>desc</td>\n<td>商品描述</td>\n<td>String</td>\n<td>-</td>\n</tr>\n<tr>\n<td>num</td>\n<td>商品数量</td>\n<td>Number</td>\n<td>-</td>\n</tr>\n<tr>\n<td>status</td>\n<td>商品状态</td>\n<td>String</td>\n<td>-</td>\n</tr>\n<tr>\n<td>useDetailSlot</td>\n<td>是否使用detail-slot（true时需要添加对应slot）</td>\n<td>Boolean</td>\n<td><code v-pre=\"\">false</code></td>\n</tr>\n</tbody>\n</table>\n<p><wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Card 卡片"}

/***/ }),

/***/ "../../packages/cell/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Cell 单元格</h2>\n<h3>使用指南</h3>\n<h4>单个 cell 使用示例</h4>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\">  {\n    ...\n    <span class=\"hljs-attr\">\"usingComponents\"</span>: {\n      <span class=\"hljs-attr\">\"zan-cell\"</span>: <span class=\"hljs-string\">\"../../dist/cell/index\"</span>,\n    }\n    ...\n  }\n</code></pre>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-wxml\">  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-cell</span> <span class=\"hljs-attr\">title</span>=<span class=\"hljs-string\">\"单行列表\"</span> <span class=\"hljs-attr\">label</span>=<span class=\"hljs-string\">\"附加描述\"</span> <span class=\"hljs-attr\">value</span>=<span class=\"hljs-string\">\"详细信息\"</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-cell</span>&gt;</span>\n</code></pre>\n<h4>cell 组使用示例</h4>\n<p>多个 cell 组件必须作为 <code v-pre=\"\">cell-group</code> 组件的子组件，否则可能出现显示问题。</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\">  {\n    ...\n    <span class=\"hljs-attr\">\"usingComponents\"</span>: {\n      <span class=\"hljs-attr\">\"zan-cell\"</span>: <span class=\"hljs-string\">\"../../dist/cell/index\"</span>,\n      <span class=\"hljs-attr\">\"zan-cell-group\"</span>: <span class=\"hljs-string\">\"../../dist/cell-group/index\"</span>\n    }\n    ...\n  }\n</code></pre>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-wxml\">  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-cell-group</span>&gt;</span>\n    <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-cell</span> <span class=\"hljs-attr\">title</span>=<span class=\"hljs-string\">\"只显示箭头\"</span> <span class=\"hljs-attr\">is-link</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-cell</span>&gt;</span>\n    <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-cell</span> <span class=\"hljs-attr\">title</span>=<span class=\"hljs-string\">\"跳转到首页\"</span> <span class=\"hljs-attr\">is-link</span> <span class=\"hljs-attr\">url</span>=<span class=\"hljs-string\">\"/pages/dashboard/index\"</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-cell</span>&gt;</span>\n    <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-cell</span> <span class=\"hljs-attr\">title</span>=<span class=\"hljs-string\">\"单行列表\"</span> <span class=\"hljs-attr\">label</span>=<span class=\"hljs-string\">\"附加描述\"</span> <span class=\"hljs-attr\">value</span>=<span class=\"hljs-string\">\"详细信息\"</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-cell</span>&gt;</span>\n    <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-cell</span> <span class=\"hljs-attr\">title</span>=<span class=\"hljs-string\">\"表单\"</span>&gt;</span>\n      <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">input</span> <span class=\"hljs-attr\">slot</span>=<span class=\"hljs-string\">\"footer\"</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">\"digit\"</span> <span class=\"hljs-attr\">placeholder</span>=<span class=\"hljs-string\">\"带小数点的数字键盘\"</span>/&gt;</span>\n    <span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-cell</span>&gt;</span>\n    <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-cell</span> <span class=\"hljs-attr\">title</span>=<span class=\"hljs-string\">\"开关\"</span>&gt;</span>\n      <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">switch</span> <span class=\"hljs-attr\">slot</span>=<span class=\"hljs-string\">\"footer\"</span> <span class=\"hljs-attr\">checked</span>/&gt;</span>\n    <span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-cell</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-cell-group</span>&gt;</span>\n</code></pre>\n<h3>属性与事件</h3>\n<table>\n<thead>\n<tr>\n<th>名称</th>\n<th>类型</th>\n<th>是否必须</th>\n<th>默认</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>title</td>\n<td>String</td>\n<td>否</td>\n<td>无</td>\n<td>左侧标题</td>\n</tr>\n<tr>\n<td>label</td>\n<td>Boolean</td>\n<td>否</td>\n<td>false</td>\n<td>标题下方的描述信息</td>\n</tr>\n<tr>\n<td>value</td>\n<td>String</td>\n<td>否</td>\n<td>取消</td>\n<td>右侧内容</td>\n</tr>\n<tr>\n<td>isLink</td>\n<td>Boolean</td>\n<td>否</td>\n<td>false</td>\n<td>是否展示右侧箭头并开启尝试以 url 跳转</td>\n</tr>\n<tr>\n<td>url</td>\n<td>String</td>\n<td>否</td>\n<td>-</td>\n<td>当 isLink 设置为 true 时，点击 cell 会尝试跳转到该路径</td>\n</tr>\n<tr>\n<td>linkType</td>\n<td>String</td>\n<td>否</td>\n<td>navigateTo</td>\n<td>链接跳转类型，可选值为 <code v-pre=\"\">navigateTo</code>，<code v-pre=\"\">redirectTo</code>，<code v-pre=\"\">switchTab</code>，<code v-pre=\"\">reLaunch</code></td>\n</tr>\n<tr>\n<td>onlyTapFooter</td>\n<td>Boolean</td>\n<td>否</td>\n<td>false</td>\n<td>只有点击 footer 区域才触发 tab 事件</td>\n</tr>\n<tr>\n<td>bindtap</td>\n<td>EventHandle</td>\n<td>否</td>\n<td>无</td>\n<td>点击 cell 时触发，<code v-pre=\"\">onlyTapFooter</code> 为 <code v-pre=\"\">true</code> 时点击 footer 区域触发</td>\n</tr>\n</tbody>\n</table>\n<h3>可用的 slot</h3>\n<table>\n<thead>\n<tr>\n<th>名称</th>\n<th>是否必须</th>\n<th>默认</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>默认</td>\n<td>否</td>\n<td>无</td>\n<td>左侧除了 <code v-pre=\"\">title</code>，<code v-pre=\"\">label</code> 外的自定义 wxml 内容</td>\n</tr>\n<tr>\n<td>icon</td>\n<td>否</td>\n<td>无</td>\n<td>标题前自定义的 icon，可使用 <code v-pre=\"\">icon</code> 自定义组件，具体使用参考 icon 组件</td>\n</tr>\n<tr>\n<td>footer</td>\n<td>否</td>\n<td>无</td>\n<td>右侧自定义 wxml 内容，如果设置了 <code v-pre=\"\">value</code> 属性，则不生效</td>\n</tr>\n</tbody>\n</table>\n\n      </section>\n    ","label":"Cell 单元格"}

/***/ }),

/***/ "../../packages/datetime-picker/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>DatetimePicker 时间选择</h2>\n<p>使用 picker 组件开发的时间日期组件，弥补小程序 picker 自身对于快速时间选择的不支持</p>\n<h3>示例代码</h3>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\">{\n  <span class=\"hljs-attr\">\"usingComponents\"</span>: {\n    <span class=\"hljs-attr\">\"zan-date-picker\"</span>: <span class=\"hljs-string\">\"../../dist/datetime-picker/index\"</span>\n  }\n}\n</code></pre>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-wxml\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-date-picker</span>\n  <span class=\"hljs-attr\">bindchange</span>=<span class=\"hljs-string\">\"change\"</span>  \n  <span class=\"hljs-attr\">bindcancel</span>=<span class=\"hljs-string\">\"cancel\"</span>\n  <span class=\"hljs-attr\">placeholder</span>=<span class=\"hljs-string\">\"请选择一个时间\"</span>\n  <span class=\"hljs-attr\">placeholder-class</span>=<span class=\"hljs-string\">\"my-customer-class-name\"</span>\n  <span class=\"hljs-attr\">format</span>=<span class=\"hljs-string\">\"你选择了YYYY年MM月DD日HH点mm分ss秒\"</span>\n/&gt;</span>\n</code></pre>\n<h3>属性与事件</h3>\n<table>\n<thead>\n<tr>\n<th>名称</th>\n<th>类型</th>\n<th>是否必须</th>\n<th>默认</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>value</td>\n<td>null</td>\n<td><code v-pre=\"\">否</code></td>\n<td>当前时间</td>\n<td>初始化时间，传入的值会被 Date 构造函数转换为一个 Date 对象，不合法的值将抛出一个错误</td>\n</tr>\n<tr>\n<td>placeholder-class</td>\n<td><code v-pre=\"\">String</code></td>\n<td><code v-pre=\"\">否</code></td>\n<td>无</td>\n<td>自定义类，可改变 placeholder 样式，其他类无效，<code v-pre=\"\">picker-view</code> 为 true 时不支持</td>\n</tr>\n<tr>\n<td>placeholder</td>\n<td><code v-pre=\"\">String</code></td>\n<td><code v-pre=\"\">否</code></td>\n<td>请选择时间</td>\n<td>设置 picker 的 placeholder</td>\n</tr>\n<tr>\n<td>not-use</td>\n<td><code v-pre=\"\">Array</code></td>\n<td><code v-pre=\"\">否</code></td>\n<td>无</td>\n<td>不需要显示的列 可选择<code v-pre=\"\">years</code>, <code v-pre=\"\">months</code>, <code v-pre=\"\">days</code>, <code v-pre=\"\">hours</code>, <code v-pre=\"\">minutes</code>, <code v-pre=\"\">seconds</code>中的多个</td>\n</tr>\n<tr>\n<td>native</td>\n<td><code v-pre=\"\">Boolean</code></td>\n<td><code v-pre=\"\">否</code></td>\n<td>无</td>\n<td>使用原生 picker，还是自定义的 picker（自定义 picker 滚动不如原生）</td>\n</tr>\n<tr>\n<td>picker-view</td>\n<td><code v-pre=\"\">Boolean</code></td>\n<td><code v-pre=\"\">否</code></td>\n<td>无</td>\n<td>如果为 true，相当于 picker-view 组件</td>\n</tr>\n<tr>\n<td>format</td>\n<td><code v-pre=\"\">String</code></td>\n<td><code v-pre=\"\">否</code></td>\n<td>YYYY-MM-DD HH:mm:ss</td>\n<td>设置选中的时间显示的格式，支持 <em>YYYY，yyyy，YY，yy，MM，M，DD，dd，D，d，HH， hh，H，h，mm，m，ss，s</em></td>\n</tr>\n<tr>\n<td>bindchange</td>\n<td><code v-pre=\"\">String</code></td>\n<td><code v-pre=\"\">是</code></td>\n<td>无</td>\n<td>用户点击<code v-pre=\"\">确认</code>触发该事件，返回值为按“年，月，日，时，分，秒”顺序的数组，可以通过<code v-pre=\"\">detail.value</code>获取</td>\n</tr>\n<tr>\n<td>bindcancel</td>\n<td><code v-pre=\"\">String</code></td>\n<td><code v-pre=\"\">否</code></td>\n<td>无</td>\n<td>用户点击<code v-pre=\"\">取消</code>触发该事件</td>\n</tr>\n</tbody>\n</table>\n<h3>方法</h3>\n<table>\n<thead>\n<tr>\n<th>名称</th>\n<th>参数</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>getFormatStr</td>\n<td>无</td>\n<td>返回 <code v-pre=\"\">format</code> 格式的字符串，在 <code v-pre=\"\">picker-view</code> 为 true 时比较实用</td>\n</tr>\n</tbody>\n</table>\n<h3>增强优化</h3>\n<ul>\n<li>支持可选择时间区域限制</li>\n<li>滚动优化\n<wxapp-demo></wxapp-demo></li>\n</ul>\n\n      </section>\n    ","label":"DatetimePicker 时间选择"}

/***/ }),

/***/ "../../packages/dialog/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Dialog 弹出框</h2>\n<h3>使用指南</h3>\n<p>在 index.json 中引入组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\">{\n  <span class=\"hljs-attr\">\"usingComponents\"</span>: {\n    <span class=\"hljs-attr\">\"zan-dialog\"</span>: <span class=\"hljs-string\">\"path/to/zanui-weapp/dist/dialog/index\"</span>\n  }\n}\n</code></pre>\n<p>在需要使用的页面里引入组件库模板和脚本</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-dialog</span> <span class=\"hljs-attr\">id</span>=<span class=\"hljs-string\">\"zan-dialog-test\"</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-dialog</span>&gt;</span>\n</code></pre>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\"><span class=\"hljs-keyword\">const</span> Dialog = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">'path/to/zanui-weapp/dist/dialog/dialog'</span>);\n\nPage({\n  <span class=\"hljs-comment\">// ...</span>\n  <span class=\"hljs-comment\">// 可以在任意方法里直接调用，即可唤起</span>\n  handleClick() {\n    Dialog({\n      <span class=\"hljs-attr\">title</span>: <span class=\"hljs-string\">''</span>,\n      <span class=\"hljs-attr\">message</span>: <span class=\"hljs-string\">''</span>,\n      <span class=\"hljs-attr\">selector</span>: <span class=\"hljs-string\">'#zan-dialog-test'</span>\n    }).then(<span class=\"hljs-function\">(<span class=\"hljs-params\">res</span>) =&gt;</span> {\n      <span class=\"hljs-built_in\">console</span>.log(res);\n    })\n  }\n});\n</code></pre>\n<h3>代码演示</h3>\n<h4>按钮展示方式</h4>\n<p>按钮可以通过设置 buttonsShowVertical 来切换按钮纵向展示或者横向并排展示，方便各种场景下使用。</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\">Dialog({\n  <span class=\"hljs-attr\">message</span>: <span class=\"hljs-string\">'这是一个模态弹窗'</span>,\n  <span class=\"hljs-attr\">buttonsShowVertical</span>: <span class=\"hljs-literal\">true</span>,\n  <span class=\"hljs-attr\">showCancelButton</span>: <span class=\"hljs-literal\">true</span>\n});\n</code></pre>\n<h4>自定义展示按钮</h4>\n<p><code v-pre=\"\">dialog</code> 支持自定义展示按钮。设置 buttons 数组即可实现。自定义按钮的点击后，都会在 resolve 状态中监听到。</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\">Dialog({\n  <span class=\"hljs-attr\">message</span>: <span class=\"hljs-string\">'这是一个模态弹窗'</span>,\n  <span class=\"hljs-attr\">buttons</span>: [{\n    <span class=\"hljs-comment\">// 按钮文案</span>\n    text: <span class=\"hljs-string\">'现金支付'</span>,\n    <span class=\"hljs-comment\">// 按钮文字颜色</span>\n    color: <span class=\"hljs-string\">'red'</span>,\n    <span class=\"hljs-comment\">// 按钮类型，用于在 then 中接受点击事件时，判断是哪一个按钮被点击</span>\n    type: <span class=\"hljs-string\">'cash'</span>\n  }, {\n    <span class=\"hljs-attr\">text</span>: <span class=\"hljs-string\">'微信支付'</span>,\n    <span class=\"hljs-attr\">color</span>: <span class=\"hljs-string\">'#3CC51F'</span>,\n    <span class=\"hljs-attr\">type</span>: <span class=\"hljs-string\">'wechat'</span>\n  }, {\n    <span class=\"hljs-attr\">text</span>: <span class=\"hljs-string\">'取消'</span>,\n    <span class=\"hljs-attr\">type</span>: <span class=\"hljs-string\">'cancel'</span>\n  }]\n}).then(<span class=\"hljs-function\">(<span class=\"hljs-params\">{ type }</span>) =&gt;</span> {\n  <span class=\"hljs-comment\">// type 可以用于判断具体是哪一个按钮被点击</span>\n  <span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-string\">'=== dialog with custom buttons ==='</span>, <span class=\"hljs-string\">`type: <span class=\"hljs-subst\">${type}</span>`</span>);\n});\n</code></pre>\n<h3>具体参数</h3>\n<table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n<th>必须</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>message</td>\n<td>弹窗内容</td>\n<td>String</td>\n<td>-</td>\n<td>必须</td>\n</tr>\n<tr>\n<td>selector</td>\n<td>显示弹窗对应组件节点的选择器</td>\n<td>String</td>\n<td>-</td>\n<td>必须</td>\n</tr>\n<tr>\n<td>title</td>\n<td>弹窗标题</td>\n<td>String</td>\n<td>-</td>\n<td></td>\n</tr>\n<tr>\n<td>buttonsShowVertical</td>\n<td>按钮是否纵向展示</td>\n<td>Boolean</td>\n<td>false</td>\n<td></td>\n</tr>\n<tr>\n<td>showConfirmButton</td>\n<td>是否展示确认按钮</td>\n<td>Boolean</td>\n<td>true</td>\n<td></td>\n</tr>\n<tr>\n<td>confirmButtonText</td>\n<td>确认按钮文案</td>\n<td>String</td>\n<td>确定</td>\n<td></td>\n</tr>\n<tr>\n<td>confirmButtonColor</td>\n<td>确认按钮文字颜色</td>\n<td>String</td>\n<td>#3CC51F</td>\n<td></td>\n</tr>\n<tr>\n<td>showCancelButton</td>\n<td>是否展示取消按钮</td>\n<td>Boolean</td>\n<td>false</td>\n<td></td>\n</tr>\n<tr>\n<td>cancelButtonText</td>\n<td>取消按钮文案</td>\n<td>String</td>\n<td>取消</td>\n<td></td>\n</tr>\n<tr>\n<td>cancelButtonColor</td>\n<td>取消按钮文字颜色</td>\n<td>String</td>\n<td>#333</td>\n<td></td>\n</tr>\n<tr>\n<td>buttons</td>\n<td>自定义按钮列表，设置以后，以上关于 确认 和 取消 按钮的设置全部不生效。</td>\n<td>Array</td>\n<td>-</td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<p>buttons 数据格式</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\">[{\n  <span class=\"hljs-comment\">// 按钮文案</span>\n  text: <span class=\"hljs-string\">'现金支付'</span>,\n  <span class=\"hljs-comment\">// 按钮文字颜色</span>\n  color: <span class=\"hljs-string\">'red'</span>,\n  <span class=\"hljs-comment\">// 按钮类型，用于在 then 中接受点击事件时，判断是哪一个按钮被点击</span>\n  type: <span class=\"hljs-string\">'cash'</span>\n}, {\n  <span class=\"hljs-comment\">// 按钮文案</span>\n  text: <span class=\"hljs-string\">'微信支付'</span>,\n  <span class=\"hljs-comment\">// 按钮文字颜色</span>\n  color: <span class=\"hljs-string\">'#3CC51F'</span>,\n  <span class=\"hljs-comment\">// 按钮类型，用于在 then 中接受点击事件时，判断是哪一个按钮被点击</span>\n  type: <span class=\"hljs-string\">'wechat'</span>\n}, {\n  <span class=\"hljs-comment\">// 按钮文案</span>\n  text: <span class=\"hljs-string\">'取消'</span>,\n  <span class=\"hljs-comment\">// 按钮类型，用于在 then 中接受点击事件时，判断是哪一个按钮被点击</span>\n  type: <span class=\"hljs-string\">'cancel'</span>\n}]\n</code></pre>\n<p><wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Dialog 弹出框"}

/***/ }),

/***/ "../../packages/field/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Field 输入框</h2>\n<h3>使用指南</h3>\n<p>在 index.json 中引入组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\">{\n  <span class=\"hljs-attr\">\"usingComponents\"</span>: {\n    <span class=\"hljs-attr\">\"zan-field\"</span>: <span class=\"hljs-string\">\"path/to/zanui-weapp/dist/field/index\"</span>\n  }\n}\n</code></pre>\n<h3>代码演示</h3>\n<h4>基础用法</h4>\n<p>field 支持多种展示方式，在 <code v-pre=\"\">data</code> 中传入对应的设置即可。</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-field</span>\n  <span class=\"hljs-attr\">title</span>=<span class=\"hljs-string\">\"{{ field.title }}\"</span>\n  <span class=\"hljs-attr\">placeholder</span>=<span class=\"hljs-string\">\"{{ field.placeholder }}\"</span>\n  <span class=\"hljs-attr\">focus</span>=<span class=\"hljs-string\">\"{{ field.focus }}\"</span>\n  <span class=\"hljs-attr\">value</span>=<span class=\"hljs-string\">\"{{ field.value }}\"</span>\n  <span class=\"hljs-attr\">bind:change</span>=<span class=\"hljs-string\">\"handleFieldChange\"</span>\n&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-field</span>&gt;</span>\n</code></pre>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\">Page({\n  <span class=\"hljs-attr\">data</span>: {\n    <span class=\"hljs-attr\">field</span>: {\n      <span class=\"hljs-attr\">focus</span>: <span class=\"hljs-literal\">true</span>,\n      <span class=\"hljs-attr\">title</span>: <span class=\"hljs-string\">'收货人'</span>,\n      <span class=\"hljs-attr\">placeholder</span>: <span class=\"hljs-string\">'名字'</span>,\n      <span class=\"hljs-attr\">value</span>: <span class=\"hljs-string\">'test'</span>\n    }\n  }\n});\n</code></pre>\n<h4>监听事件</h4>\n<p>field会触发一些事件，当你需要监听这些事件时，可以绑定对应的事件。</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-field</span>\n  <span class=\"hljs-attr\">title</span>=<span class=\"hljs-string\">\"{{ field.title }}\"</span>\n  <span class=\"hljs-attr\">placeholder</span>=<span class=\"hljs-string\">\"{{ field.placeholder }}\"</span>\n  <span class=\"hljs-attr\">focus</span>=<span class=\"hljs-string\">\"{{ field.focus }}\"</span>\n  <span class=\"hljs-attr\">value</span>=<span class=\"hljs-string\">\"{{ field.value }}\"</span>\n  <span class=\"hljs-attr\">bind:change</span>=<span class=\"hljs-string\">\"handleFieldChange\"</span>\n  <span class=\"hljs-attr\">bind:focus</span>=<span class=\"hljs-string\">\"handleFieldFocus\"</span>\n  <span class=\"hljs-attr\">bind:blur</span>=<span class=\"hljs-string\">\"handleFieldBlur\"</span>\n&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-field</span>&gt;</span>\n</code></pre>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\">Page(extend({}, {\n  <span class=\"hljs-attr\">data</span>: {\n    <span class=\"hljs-attr\">field</span>: {\n      <span class=\"hljs-attr\">focus</span>: <span class=\"hljs-literal\">true</span>,\n      <span class=\"hljs-attr\">title</span>: <span class=\"hljs-string\">'收货人'</span>,\n      <span class=\"hljs-attr\">placeholder</span>: <span class=\"hljs-string\">'名字'</span>,\n      <span class=\"hljs-attr\">value</span>: <span class=\"hljs-string\">'test'</span>\n    }\n  },\n\n  <span class=\"hljs-attr\">methods</span>: {\n    handleFieldChange(event) {\n      <span class=\"hljs-built_in\">console</span>.log(event);\n    },\n\n    handleFieldFocus(event) {\n      <span class=\"hljs-built_in\">console</span>.log(event);\n    },\n\n    handleFieldBlur(event) {\n      <span class=\"hljs-built_in\">console</span>.log(event);\n    }\n  }\n}));\n</code></pre>\n<h3>API</h3>\n<table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n<th>必须</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>title</td>\n<td>输入框左侧标题，若传入为空，则不显示标题</td>\n<td>String</td>\n<td>-</td>\n<td></td>\n</tr>\n<tr>\n<td>name</td>\n<td>输入框的名字，作为 form 表单提交时数据的 key</td>\n<td>String</td>\n<td>componentId 指定的值</td>\n<td></td>\n</tr>\n<tr>\n<td>value</td>\n<td>输入框的内容</td>\n<td>String</td>\n<td>-</td>\n<td></td>\n</tr>\n<tr>\n<td>type</td>\n<td>输入框的类型，可选值为 input, textarea</td>\n<td>String</td>\n<td>input</td>\n<td></td>\n</tr>\n<tr>\n<td>inputType</td>\n<td>输入框为 input 情况下，输入框的类型，例如：number, text, password</td>\n<td>String</td>\n<td>text</td>\n<td></td>\n</tr>\n<tr>\n<td>placeholder</td>\n<td>输入框为空时占位符</td>\n<td>String</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>maxlength</td>\n<td>最大输入长度，设置为 -1 的时候不限制最大长度</td>\n<td>Number</td>\n<td>140</td>\n<td></td>\n</tr>\n<tr>\n<td>focus</td>\n<td>自动聚焦，拉起键盘</td>\n<td>Boolean</td>\n<td>false</td>\n<td></td>\n</tr>\n<tr>\n<td>disabled</td>\n<td>输入框是否禁用</td>\n<td>Boolean</td>\n<td>false</td>\n<td></td>\n</tr>\n<tr>\n<td>mode</td>\n<td>输入框展示样式，可选值为 wrapped, normal</td>\n<td>String</td>\n<td>normal</td>\n<td></td>\n</tr>\n<tr>\n<td>right</td>\n<td>输入框内容是否居右显示</td>\n<td>Boolean</td>\n<td>false</td>\n<td></td>\n</tr>\n<tr>\n<td>error</td>\n<td>是否显示为输入框错误情况下的样式</td>\n<td>Boolean</td>\n<td>false</td>\n<td></td>\n</tr>\n<tr>\n<td>componentId</td>\n<td>用于区分输入框之间的唯一名称</td>\n<td>String</td>\n<td>-</td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<h3>Event</h3>\n<table>\n<thead>\n<tr>\n<th>事件名称</th>\n<th>说明</th>\n<th>回调参数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>change</td>\n<td>当绑定值变化时触发的事件</td>\n<td>event对象</td>\n</tr>\n<tr>\n<td>focus</td>\n<td>输入框focus</td>\n<td>event对象</td>\n</tr>\n<tr>\n<td>blur</td>\n<td>输入框blur</td>\n<td>event对象</td>\n</tr>\n</tbody>\n</table>\n<p><wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Field 输入框"}

/***/ }),

/***/ "../../packages/helper/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Helper 基础样式</h2>\n<h3>使用指南</h3>\n<p>在 app.wxss 中引入组件库所有样式</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-css\">@<span class=\"hljs-keyword\">import</span> <span class=\"hljs-string\">\"path/to/zanui-weapp/dist/index.wxss\"</span>;\n</code></pre>\n<h3>代码演示</h3>\n<p>直接在元素上增加指定 class 即可</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">view</span> <span class=\"hljs-attr\">class</span>=<span class=\"hljs-string\">\"zan-pull-right\"</span>&gt;</span>zan-pull-right: 往右靠<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">view</span>&gt;</span>\n</code></pre>\n<p>具体可用类名如下：</p>\n<p><strong>字体大小</strong></p>\n<p><code v-pre=\"\">zan-font-8</code> 文字以8像素大小展示</p>\n<p><code v-pre=\"\">zan-font-10</code> 文字以10像素大小展示</p>\n<p><code v-pre=\"\">zan-font-12</code> 文字以12像素大小展示</p>\n<p><code v-pre=\"\">zan-font-14</code> 文字以14像素大小展示</p>\n<p><code v-pre=\"\">zan-font-16</code> 文字以16像素大小展示</p>\n<p><code v-pre=\"\">zan-font-18</code> 文字以18像素大小展示</p>\n<p><code v-pre=\"\">zan-font-20</code> 文字以20像素大小展示</p>\n<p><code v-pre=\"\">zan-font-22</code> 文字以22像素大小展示</p>\n<p><code v-pre=\"\">zan-font-24</code> 文字以24像素大小展示</p>\n<p><code v-pre=\"\">zan-font-30</code> 文字以30像素大小展示</p>\n<p><strong>字体颜色</strong></p>\n<p><code v-pre=\"\">zan-c-red</code> 文字以红色展示</p>\n<p><code v-pre=\"\">zan-c-gray</code> 文字以浅灰色展示</p>\n<p><code v-pre=\"\">zan-c-gray-dark</code> 文字以灰色展示</p>\n<p><code v-pre=\"\">zan-c-gray-darker</code> 文字以深灰色展示</p>\n<p><code v-pre=\"\">zan-c-black</code> 文字以黑色展示</p>\n<p><code v-pre=\"\">zan-c-blue</code> 文字以蓝色展示</p>\n<p><code v-pre=\"\">zan-c-green</code> 文字以绿色展示</p>\n<p><strong>字体样式</strong></p>\n<p><code v-pre=\"\">zan-pull-right</code> 文字往右靠</p>\n<p><code v-pre=\"\">zan-text-deleted</code> 文字显示删除效果</p>\n<p><code v-pre=\"\">zan-font-bold</code> 文字加粗显示</p>\n<p><strong>其他</strong></p>\n<p><code v-pre=\"\">zan-arrow</code> 展示向右侧箭头，以 absolute 布局，需要在外层加上 relative 来定位</p>\n<p><code v-pre=\"\">zan-ellipsis</code> 文字过长点点点显示</p>\n<p><code v-pre=\"\">zan-ellipsis--l2</code> 文字过长点点点显示，最多显示两行</p>\n<p><code v-pre=\"\">zan-ellipsis--l3</code> 文字过长点点点显示，最多显示三行\n<wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Helper 基础样式"}

/***/ }),

/***/ "../../packages/icon/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Icon 图标</h2>\n<h3>使用指南</h3>\n<p>在 index.json 中引入组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\">{\n  <span class=\"hljs-attr\">\"usingComponents\"</span>: {\n    <span class=\"hljs-attr\">\"zan-icon\"</span>: <span class=\"hljs-string\">\"path/to/zanui-weapp/dist/icon/index\"</span>\n  }\n}\n</code></pre>\n<h3>代码演示</h3>\n<p>可以在任意位置上使用 zan-icon 标签。通过 type 可以控制 icon 显示的图标</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-icon</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">\"success\"</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-icon</span>&gt;</span>\n</code></pre>\n<p>支持的 icon 和 名称 见下图</p>\n<p><img src=\"https://img.yzcdn.cn/public_files/2017/12/03/c582397894f57f1c72fb28118588f833.jpeg?imageView2/2/w/500/h/0/q/100\" alt=\"\">\n<img src=\"https://img.yzcdn.cn/public_files/2017/12/03/ab37f55520dfdcdf8dbe8951025e379a.jpeg?imageView2/2/w/500/h/0/q/100\" alt=\"\">\n<img src=\"https://img.yzcdn.cn/public_files/2017/12/03/ab37f55520dfdcdf8dbe8951025e379a.jpeg?imageView2/2/w/500/h/0/q/100\" alt=\"\">\n<img src=\"https://img.yzcdn.cn/public_files/2017/12/03/e862638f5cab9c0c7d2be38702c162df.jpeg?imageView2/2/w/500/h/0/q/100\" alt=\"\">\n<img src=\"https://img.yzcdn.cn/public_files/2017/12/03/dfa76b99ca1c37671628e1c7b224dbb9.jpeg?imageView2/2/w/500/h/0/q/100\" alt=\"\">\n<wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Icon 图标"}

/***/ }),

/***/ "../../packages/loading/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Loading 加载</h2>\n<h3>使用指南</h3>\n<p>在 index.json 中引入组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\">  {\n    ...\n    <span class=\"hljs-attr\">\"usingComponents\"</span>: {\n      <span class=\"hljs-attr\">\"zan-loading\"</span>: <span class=\"hljs-string\">\"../../dist/loading/index\"</span>\n    }\n    ...\n  }\n</code></pre>\n<p>在页面上直接使用 zan-loading 标签即可</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\">  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-loading</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">\"circle\"</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-loading</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-loading</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">\"spinner\"</span> <span class=\"hljs-attr\">color</span>=<span class=\"hljs-string\">\"black\"</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-loading</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-loading</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">\"dot\"</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-loading</span>&gt;</span>\n</code></pre>\n<h3>具体参数</h3>\n<table>\n<thead>\n<tr>\n<th>名称</th>\n<th>类型</th>\n<th>是否必须</th>\n<th>默认</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>type</td>\n<td>String</td>\n<td>否</td>\n<td>circle</td>\n<td>loading 类型，可支持 circle，spinner，dot</td>\n</tr>\n<tr>\n<td>color</td>\n<td>String</td>\n<td>否</td>\n<td>无</td>\n<td>可选值 black</td>\n</tr>\n<tr>\n<td>use</td>\n<td>String，Number</td>\n<td>否</td>\n<td>1</td>\n<td>选择每种 Loading 类型的样式</td>\n</tr>\n</tbody>\n</table>\n<p><wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Loading 加载"}

/***/ }),

/***/ "../../packages/loadmore/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Loadmore 加载</h2>\n<h3>使用指南</h3>\n<p>在 app.wxss 中引入组件库所有样式</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-css\">@<span class=\"hljs-keyword\">import</span> <span class=\"hljs-string\">\"path/to/zanui-weapp/dist/index.wxss\"</span>;\n</code></pre>\n<p>在需要使用的页面里引入组件库模板</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">import</span> <span class=\"hljs-attr\">src</span>=<span class=\"hljs-string\">\"path/to/zanui-weapp/dist/loadmore/index.wxml\"</span> /&gt;</span>\n\n<span class=\"hljs-comment\">&lt;!-- 直接使用 zan-loadmore 模板，并且直接传入设置值 --&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">template</span> <span class=\"hljs-attr\">is</span>=<span class=\"hljs-string\">\"zan-loadmore\"</span> <span class=\"hljs-attr\">data</span>=<span class=\"hljs-string\">\"{{ loading: true }}\"</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">template</span>&gt;</span>\n</code></pre>\n<h3>代码演示</h3>\n<p><code v-pre=\"\">loadmore</code> 支持三种状态，loading, nodata, nomore。传入指定的值即可显示</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-comment\">&lt;!-- 加载更多 --&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">template</span> <span class=\"hljs-attr\">is</span>=<span class=\"hljs-string\">\"zan-loadmore\"</span> <span class=\"hljs-attr\">data</span>=<span class=\"hljs-string\">\"{{ loading: true }}\"</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">template</span>&gt;</span>\n<span class=\"hljs-comment\">&lt;!-- 没有可以显示的数据 --&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">template</span> <span class=\"hljs-attr\">is</span>=<span class=\"hljs-string\">\"zan-loadmore\"</span> <span class=\"hljs-attr\">data</span>=<span class=\"hljs-string\">\"{{ nodata: true }}\"</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">template</span>&gt;</span>\n<span class=\"hljs-comment\">&lt;!-- 没有更多的数据了 --&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">template</span> <span class=\"hljs-attr\">is</span>=<span class=\"hljs-string\">\"zan-loadmore\"</span> <span class=\"hljs-attr\">data</span>=<span class=\"hljs-string\">\"{{ nomore: true }}\"</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">template</span>&gt;</span>\n</code></pre>\n<p><wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Loadmore 加载"}

/***/ }),

/***/ "../../packages/noticebar/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Noticebar 通告栏</h2>\n<h3>使用指南</h3>\n<p>在 index.json 中引入组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\">{\n  <span class=\"hljs-attr\">\"usingComponents\"</span>: {\n    <span class=\"hljs-attr\">\"zan-noticebar\"</span>: <span class=\"hljs-string\">\"path/to/zanui-weapp/dist/noticebar/index\"</span>\n  }\n}\n</code></pre>\n<p>在 index.js 中声明组件数据</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\"><span class=\"hljs-comment\">// 在 Page 中声明 Noticebar 依赖的展示数据</span>\nPage({\n  <span class=\"hljs-attr\">data</span>: {\n    <span class=\"hljs-attr\">text</span>: <span class=\"hljs-string\">'xxx'</span>,\n    <span class=\"hljs-attr\">scrollable</span>: <span class=\"hljs-string\">'xxx'</span>,\n    ...\n  }\n})\n</code></pre>\n<h3>代码演示</h3>\n<p><code v-pre=\"\">Noticebar</code> 组件支持滚动和静止两种展示方式，通过 text 传入展示文案</p>\n<h3>静止公告栏</h3>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-noticebar</span>\n  <span class=\"hljs-attr\">text</span>=<span class=\"hljs-string\">\"{{ text }}\"</span>\n/&gt;</span>\n</code></pre>\n<h3>滚动通告栏</h3>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-noticebar</span>\n  <span class=\"hljs-attr\">text</span>=<span class=\"hljs-string\">\"{{ text }}\"</span>\n  <span class=\"hljs-attr\">scrollable</span>=<span class=\"hljs-string\">\"true\"</span>\n/&gt;</span>\n</code></pre>\n<h3>延时滚动通告栏</h3>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-noticebar</span>\n  <span class=\"hljs-attr\">text</span>=<span class=\"hljs-string\">\"{{ text }}\"</span>\n  <span class=\"hljs-attr\">scrollable</span>=<span class=\"hljs-string\">\"true\"</span>\n  <span class=\"hljs-attr\">delay</span>=<span class=\"hljs-string\">\"{{ delay }}\"</span>\n/&gt;</span>\n</code></pre>\n<h3>\b改变滚动通告栏滚动速度</h3>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-noticebar</span>\n  <span class=\"hljs-attr\">text</span>=<span class=\"hljs-string\">\"{{ text }}\"</span>\n  <span class=\"hljs-attr\">scrollable</span>=<span class=\"hljs-string\">\"true\"</span>\n  <span class=\"hljs-attr\">speed</span>=<span class=\"hljs-string\">\"{{ speed }}\"</span>\n/&gt;</span>\n</code></pre>\n<h3>自定义通告栏字体颜色和背景色</h3>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-noticebar</span>\n  <span class=\"hljs-attr\">text</span>=<span class=\"hljs-string\">\"{{ text }}\"</span>\n  <span class=\"hljs-attr\">color</span>=<span class=\"hljs-string\">\"{{ color }}\"</span>\n  <span class=\"hljs-attr\">background-color</span>=<span class=\"hljs-string\">\"{{ backgroundColor }}\"</span>\n/&gt;</span>\n</code></pre>\n<h3>添加左侧icon通告栏</h3>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-noticebar</span>\n  <span class=\"hljs-attr\">text</span>=<span class=\"hljs-string\">\"{{ text }}\"</span>\n  <span class=\"hljs-attr\">left-icon</span>=<span class=\"hljs-string\">\"https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png\"</span>\n/&gt;</span>\n</code></pre>\n<h3>可关闭通告栏</h3>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-noticebar</span>\n  <span class=\"hljs-attr\">text</span>=<span class=\"hljs-string\">\"{{ text }}\"</span>\n  <span class=\"hljs-attr\">mode</span>=<span class=\"hljs-string\">\"closeable\"</span>\n/&gt;</span>\n</code></pre>\n<table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n<th>可选值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>text</td>\n<td>通告栏展示文案</td>\n<td>String</td>\n<td>-</td>\n<td></td>\n</tr>\n<tr>\n<td>mode</td>\n<td>通告栏模式</td>\n<td>String</td>\n<td>''</td>\n<td><code v-pre=\"\">closeable</code></td>\n</tr>\n<tr>\n<td>delay</td>\n<td>滚动延时时间</td>\n<td>Number</td>\n<td>0</td>\n<td></td>\n</tr>\n<tr>\n<td>speed</td>\n<td>滚动速度</td>\n<td>Number</td>\n<td>40</td>\n<td></td>\n</tr>\n<tr>\n<td>scrollable</td>\n<td>是否可滚动</td>\n<td>Boolean</td>\n<td>false</td>\n<td></td>\n</tr>\n<tr>\n<td>leftIcon</td>\n<td>左侧图标</td>\n<td>String</td>\n<td>-</td>\n<td></td>\n</tr>\n<tr>\n<td>color</td>\n<td>通告栏字体颜色</td>\n<td>String</td>\n<td><code v-pre=\"\">#f60</code></td>\n<td></td>\n</tr>\n<tr>\n<td>backgroundColor</td>\n<td>通告栏背景色</td>\n<td>String</td>\n<td><code v-pre=\"\">#fff7cc</code></td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<p><wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Noticebar 通告栏"}

/***/ }),

/***/ "../../packages/panel/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Panel 面板组件</h2>\n<h3>使用指南</h3>\n<p>在 index.json 中引入组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\">{\n  <span class=\"hljs-attr\">\"usingComponents\"</span>: {\n    <span class=\"hljs-attr\">\"zan-panel\"</span>: <span class=\"hljs-string\">\"/packages/panel/index\"</span>\n  }\n}\n</code></pre>\n<h3>代码演示</h3>\n<p>Panel 提供了一块白色的展示区域，使用方式如下</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-panel</span> <span class=\"hljs-attr\">title</span>=<span class=\"hljs-string\">'我是标题'</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">view</span>&gt;</span>内容<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">view</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-panel</span>&gt;</span>\n</code></pre>\n<table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n<th>必须</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>title</td>\n<td>panel的标题</td>\n<td>String</td>\n<td>-</td>\n<td></td>\n</tr>\n<tr>\n<td>hide-border</td>\n<td>内容区隐藏边框</td>\n<td>Boolean</td>\n<td>-</td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<p><wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Panel 面板组件"}

/***/ }),

/***/ "../../packages/popup/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Popup 弹出层</h2>\n<h3>使用指南</h3>\n<p>在 index.json 中引入组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\">{\n  <span class=\"hljs-attr\">\"usingComponents\"</span>: {\n    <span class=\"hljs-attr\">\"zan-popup\"</span>: <span class=\"hljs-string\">\"path/to/zanui-weapp/dist/popup/index\"</span>\n  }\n}\n</code></pre>\n<h3>代码演示</h3>\n<p>可以在页面任意位置上使用 zan-popup 标签。通过 show 可以控制弹窗是否展示</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-popup</span> <span class=\"hljs-attr\">show</span>=<span class=\"hljs-string\">\"{{ show }}\"</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-popup</span>&gt;</span>\n</code></pre>\n<h4>popup 动画</h4>\n<p>popup 额外支持了 上下左右 四种动画方式，通过增加 type 属性即可控制。使用方式如下</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-comment\">&lt;!-- 从底部弹出的弹层 --&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-popup</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">\"bottom\"</span> <span class=\"hljs-attr\">show</span>=<span class=\"hljs-string\">\"{{ show }}\"</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-popup</span>&gt;</span>\n\n<span class=\"hljs-comment\">&lt;!-- 从顶部弹出的弹层 --&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-popup</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">\"top\"</span> <span class=\"hljs-attr\">show</span>=<span class=\"hljs-string\">\"{{ show }}\"</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-popup</span>&gt;</span>\n\n<span class=\"hljs-comment\">&lt;!-- 从左侧弹出的弹层 --&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-popup</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">\"left\"</span> <span class=\"hljs-attr\">show</span>=<span class=\"hljs-string\">\"{{ show }}\"</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-popup</span>&gt;</span>\n\n<span class=\"hljs-comment\">&lt;!-- 从右侧弹出的弹层 --&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-popup</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">\"right\"</span> <span class=\"hljs-attr\">show</span>=<span class=\"hljs-string\">\"{{ show }}\"</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-popup</span>&gt;</span>\n</code></pre>\n<h3>具体参数和事件</h3>\n<h4>参数说明</h4>\n<table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n<th>必须</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>show</td>\n<td>是否显示弹出层</td>\n<td>Boolean</td>\n<td>false</td>\n<td></td>\n</tr>\n<tr>\n<td>overlay</td>\n<td>是否显示遮罩层</td>\n<td>Boolean</td>\n<td>false</td>\n<td></td>\n</tr>\n<tr>\n<td>closeOnClickOverlay</td>\n<td>遮罩层点击时，是否触发关闭事件</td>\n<td>Boolean</td>\n<td>true</td>\n<td></td>\n</tr>\n<tr>\n<td>type</td>\n<td>弹出层动画方式, 可选<code v-pre=\"\">center</code>, <code v-pre=\"\">left</code>, <code v-pre=\"\">right</code>, <code v-pre=\"\">top</code>, <code v-pre=\"\">bottom</code></td>\n<td>String</td>\n<td>center</td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<h4>事件说明</h4>\n<table>\n<thead>\n<tr>\n<th>事件名</th>\n<th>说明</th>\n<th>参数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>click-overlay</td>\n<td>遮罩层点击触发</td>\n<td></td>\n</tr>\n<tr>\n<td>close</td>\n<td>遮罩层关闭时触发</td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<p><wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Popup 弹出层"}

/***/ }),

/***/ "../../packages/row/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Layout 布局</h2>\n<h3>使用指南</h3>\n<p>在 index.json 中引入组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\">{\n  <span class=\"hljs-attr\">\"usingComponents\"</span>: {\n    <span class=\"hljs-attr\">\"zan-row\"</span>: <span class=\"hljs-string\">\"path/to/zanui-weapp/dist/row/index\"</span>,\n    <span class=\"hljs-attr\">\"zan-col\"</span>: <span class=\"hljs-string\">\"path/to/zanui-weapp/dist/col/index\"</span>\n  }\n}\n</code></pre>\n<h3>代码演示</h3>\n<p>Layout 组件提供了24列栅格，设置 col 属性可以设置元素所占宽度</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-row</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-col</span> <span class=\"hljs-attr\">col</span>=<span class=\"hljs-string\">\"8\"</span> <span class=\"hljs-attr\">col-class</span>=<span class=\"hljs-string\">\"custom-zan-col\"</span>&gt;</span>span: 8<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-col</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-col</span> <span class=\"hljs-attr\">col</span>=<span class=\"hljs-string\">\"8\"</span> <span class=\"hljs-attr\">col-class</span>=<span class=\"hljs-string\">\"custom-zan-col\"</span>&gt;</span>span: 8<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-col</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-col</span> <span class=\"hljs-attr\">col</span>=<span class=\"hljs-string\">\"8\"</span> <span class=\"hljs-attr\">col-class</span>=<span class=\"hljs-string\">\"custom-zan-col\"</span>&gt;</span>span: 8<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-col</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-row</span>&gt;</span>\n</code></pre>\n<p>Layout 提供了 offset 功能。设置 offset 属性可以设置列的偏移宽度，计算方式与 span 相同</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-row</span> <span class=\"hljs-attr\">row-class</span>=<span class=\"hljs-string\">\"custom-zan-row\"</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-col</span> <span class=\"hljs-attr\">col</span>=<span class=\"hljs-string\">\"4\"</span> <span class=\"hljs-attr\">col-class</span>=<span class=\"hljs-string\">\"custom-zan-col\"</span>&gt;</span>span: 4<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-col</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-col</span> <span class=\"hljs-attr\">col</span>=<span class=\"hljs-string\">\"10\"</span> <span class=\"hljs-attr\">offset</span>=<span class=\"hljs-string\">\"4\"</span> <span class=\"hljs-attr\">col-class</span>=<span class=\"hljs-string\">\"custom-zan-col\"</span>&gt;</span>offset: 4, span: 10<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-col</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-row</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-row</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-col</span> <span class=\"hljs-attr\">col</span>=<span class=\"hljs-string\">\"12\"</span> <span class=\"hljs-attr\">offset</span>=<span class=\"hljs-string\">\"12\"</span> <span class=\"hljs-attr\">col-class</span>=<span class=\"hljs-string\">\"custom-zan-col\"</span>&gt;</span>offset: 12, span: 12<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-col</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-row</span>&gt;</span>\n</code></pre>\n<h3>API</h3>\n<h4>Row</h4>\n<table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>row-class</td>\n<td>自定义row class</td>\n<td>String</td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n<h4>Col</h4>\n<table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>col-class</td>\n<td>自定义col class</td>\n<td>String</td>\n<td>-</td>\n</tr>\n<tr>\n<td>col</td>\n<td>元素所占宽度</td>\n<td>Number</td>\n<td><code v-pre=\"\">0</code></td>\n</tr>\n<tr>\n<td>offset</td>\n<td>元素偏移宽度</td>\n<td>Number</td>\n<td><code v-pre=\"\">0</code></td>\n</tr>\n</tbody>\n</table>\n<p><wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Layout 布局"}

/***/ }),

/***/ "../../packages/select/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Select 选择</h2>\n<h3>使用指南</h3>\n<p>在 index.json 中引入组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\">{\n  <span class=\"hljs-attr\">\"usingComponents\"</span>: {\n    <span class=\"hljs-attr\">\"zan-select\"</span>: <span class=\"hljs-string\">\"/packages/select/index\"</span>\n  }\n}\n</code></pre>\n<h3>代码演示</h3>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-select</span>\n  <span class=\"hljs-attr\">items</span>=<span class=\"hljs-string\">\"{{ items }}\"</span>\n  <span class=\"hljs-attr\">checkedValue</span>=<span class=\"hljs-string\">\"{{ checkedValue }}\"</span>\n  <span class=\"hljs-attr\">activeColor</span>=<span class=\"hljs-string\">\"{{ activeColor }}\"</span>\n  <span class=\"hljs-attr\">bind:change</span>=<span class=\"hljs-string\">\"handleSelectChange\"</span>\n/&gt;</span>\n</code></pre>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\">Page({\n  <span class=\"hljs-attr\">data</span>: {\n    <span class=\"hljs-attr\">items</span>: [\n      {\n        <span class=\"hljs-attr\">value</span>: <span class=\"hljs-string\">'1'</span>,\n        <span class=\"hljs-comment\">// 选项文案</span>\n        name: <span class=\"hljs-string\">'选项一'</span>,\n      },\n      {\n        <span class=\"hljs-attr\">value</span>: <span class=\"hljs-string\">'2'</span>,\n        <span class=\"hljs-attr\">name</span>: <span class=\"hljs-string\">'选项二'</span>,\n      },\n    ],\n    <span class=\"hljs-attr\">checkedValue</span>: <span class=\"hljs-string\">'选项一'</span>,\n    <span class=\"hljs-attr\">activeColor</span>: <span class=\"hljs-string\">'#ff4443'</span>\n  },\n\n  <span class=\"hljs-attr\">methods</span>: {\n    handleSelectChange({ detail }) {\n      <span class=\"hljs-built_in\">console</span>.log(detail);\n    }\n  }\n});\n</code></pre>\n<h4>具体参数</h4>\n<table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n<th>必须</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>items</td>\n<td>select 显示各个项的配置</td>\n<td>Array</td>\n<td>-</td>\n<td></td>\n</tr>\n<tr>\n<td>checkedValue</td>\n<td>高亮的 item 的 value 值</td>\n<td>String</td>\n<td>-</td>\n<td></td>\n</tr>\n<tr>\n<td>activeColor</td>\n<td>Select 高亮颜色</td>\n<td>String</td>\n<td>#ff4444</td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<p>items 具体格式如下</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\">{\n  <span class=\"hljs-attr\">items</span>: [\n    {\n      <span class=\"hljs-comment\">// 选项选中时，代表的选中值。会以此作为唯一值，判断是否选中</span>\n      value: <span class=\"hljs-string\">'1'</span>,\n      <span class=\"hljs-comment\">// 选项的文字描述</span>\n      name: <span class=\"hljs-string\">'选项一'</span>,\n    },\n    {\n      <span class=\"hljs-attr\">value</span>: <span class=\"hljs-string\">'2'</span>,\n      <span class=\"hljs-attr\">name</span>: <span class=\"hljs-string\">'选项二'</span>,\n    },\n  ]\n}\n</code></pre>\n<p><wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Select 选择"}

/***/ }),

/***/ "../../packages/stepper/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Stepper 计数器</h2>\n<h3>使用指南</h3>\n<p>在 index.json 中引入组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\">{\n  <span class=\"hljs-attr\">\"usingComponents\"</span>: {\n    <span class=\"hljs-attr\">\"zan-stepper\"</span>: <span class=\"hljs-string\">\"path/to/zanui-weapp/dist/stepper/index\"</span>\n  }\n}\n</code></pre>\n<h3>代码演示</h3>\n<h4>基础用法</h4>\n<p><code v-pre=\"\">Stepper</code> 组件通过传入的 stepper 对象控制，内部数据格式如下：</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\">Page({\n  <span class=\"hljs-attr\">data</span>: {\n    <span class=\"hljs-attr\">stepper</span>: {\n      <span class=\"hljs-comment\">// 当前 stepper 数字</span>\n      stepper: <span class=\"hljs-number\">1</span>,\n      <span class=\"hljs-comment\">// 最小可到的数字</span>\n      min: <span class=\"hljs-number\">1</span>,\n      <span class=\"hljs-comment\">// 最大可到的数字</span>\n      max: <span class=\"hljs-number\">1</span>,\n      <span class=\"hljs-comment\">// 小尺寸, 默认大尺寸</span>\n      size: <span class=\"hljs-string\">'small'</span>\n    }\n  },\n\n  handleZanStepperChange({\n    <span class=\"hljs-comment\">// stepper 代表操作后，应该要展示的数字，需要设置到数据对象里，才会更新页面展示</span>\n    detail: stepper\n  }) {\n    <span class=\"hljs-keyword\">this</span>.setData({\n      <span class=\"hljs-string\">'stepper.stepper'</span>: stepper\n    });\n  }\n});\n</code></pre>\n<p>当一个 <code v-pre=\"\">Stepper</code> 中，min 超过 max，就会导致组件被置灰。</p>\n<p>当 stepper 被点击时，需要监听<code v-pre=\"\">change</code>事件，处理计数器值的改变。</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\">&lt;zan-stepper\n  stepper=<span class=\"hljs-string\">\"{{ stepper.stepper }}\"</span>\n  min=<span class=\"hljs-string\">\"{{ stepper.min }}\"</span>\n  max=<span class=\"hljs-string\">\"{{ stepper.max }}\"</span>\n  bind:change=<span class=\"hljs-string\">\"handleZanStepperChange\"</span>\n&gt;\n<span class=\"xml\"><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-stepper</span>&gt;</span>\n</span></code></pre>\n<h3>API</h3>\n<table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n<th>必须</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>size</td>\n<td>计数器尺寸</td>\n<td>String</td>\n<td>-</td>\n<td></td>\n</tr>\n<tr>\n<td>stepper</td>\n<td>计数器的值</td>\n<td>Number</td>\n<td><code v-pre=\"\">1</code></td>\n<td>必须</td>\n</tr>\n<tr>\n<td>min</td>\n<td>计数器最小值</td>\n<td>Number</td>\n<td><code v-pre=\"\">1</code></td>\n<td></td>\n</tr>\n<tr>\n<td>max</td>\n<td>计数器最大值</td>\n<td>Number</td>\n<td>无穷大</td>\n<td></td>\n</tr>\n<tr>\n<td>step</td>\n<td>步数</td>\n<td>Number</td>\n<td><code v-pre=\"\">1</code></td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<h3>Event</h3>\n<table>\n<thead>\n<tr>\n<th>事件名称</th>\n<th>说明</th>\n<th>回调参数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>change</td>\n<td>当绑定值变化时触发的事件</td>\n<td><code v-pre=\"\">{ index, stepper }</code></td>\n</tr>\n<tr>\n<td>minus</td>\n<td>点击减少按钮时触发</td>\n<td>-</td>\n</tr>\n<tr>\n<td>plus</td>\n<td>点击增加按钮时触发</td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n<p><wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Stepper 计数器"}

/***/ }),

/***/ "../../packages/steps/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Steps 步骤条</h2>\n<h3>使用指南</h3>\n<p>在 app.wxss 中引入组件库所有样式</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-css\">@<span class=\"hljs-keyword\">import</span> <span class=\"hljs-string\">\"path/to/zanui-weapp/dist/index.wxss\"</span>;\n</code></pre>\n<p>在 index.json 中引入组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\">{\n  <span class=\"hljs-attr\">\"usingComponents\"</span>: {\n    <span class=\"hljs-attr\">\"zan-steps\"</span>: <span class=\"hljs-string\">\"path/to/zanui-weapp/dist/steps/index\"</span>\n  }\n}\n\n### 代码演示\n在模板中使用 zan-steps 模板，并传入相应数据\n```html\n&lt;zan-steps type=<span class=\"hljs-string\">\"horizon\"</span> steps=<span class=\"hljs-string\">\"{{steps}}\"</span>&gt;&lt;/zan-steps&gt;\n</code></pre>\n<table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n<th>必须</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>type</td>\n<td>steps 的展示状态，可选值为 'horizon', 'vertical'</td>\n<td>String</td>\n<td>horizon</td>\n<td></td>\n</tr>\n<tr>\n<td>hasDesc</td>\n<td>是否展示描述</td>\n<td>Boolean</td>\n<td>false</td>\n<td></td>\n</tr>\n<tr>\n<td>steps</td>\n<td>步骤条展示数据</td>\n<td>Array</td>\n<td></td>\n<td>必须</td>\n</tr>\n<tr>\n<td>className</td>\n<td>自定义类目，方便自定义显示</td>\n<td>String</td>\n<td></td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<p>steps 数据格式如下：</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\">[\n  {\n    <span class=\"hljs-comment\">// 此步骤是否当前完成状态</span>\n    current: <span class=\"hljs-literal\">false</span>,\n    <span class=\"hljs-comment\">// 此步骤是否已经完成</span>\n    done: <span class=\"hljs-literal\">true</span>,\n    <span class=\"hljs-comment\">// 此步骤显示文案</span>\n    text: <span class=\"hljs-string\">'步骤一'</span>,\n    <span class=\"hljs-comment\">// 此步骤描述语</span>\n    desc: <span class=\"hljs-string\">'10.01'</span>\n  },\n  {\n    <span class=\"hljs-attr\">done</span>: <span class=\"hljs-literal\">true</span>,\n    <span class=\"hljs-attr\">current</span>: <span class=\"hljs-literal\">false</span>,\n    <span class=\"hljs-attr\">text</span>: <span class=\"hljs-string\">'步骤二'</span>,\n    <span class=\"hljs-attr\">desc</span>: <span class=\"hljs-string\">'10.02'</span>\n  },\n  {\n    <span class=\"hljs-attr\">done</span>: <span class=\"hljs-literal\">true</span>,\n    <span class=\"hljs-attr\">current</span>: <span class=\"hljs-literal\">true</span>,\n    <span class=\"hljs-attr\">text</span>: <span class=\"hljs-string\">'步骤三'</span>,\n    <span class=\"hljs-attr\">desc</span>: <span class=\"hljs-string\">'10.03'</span>\n  }\n]\n</code></pre>\n<p><wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Steps 步骤条"}

/***/ }),

/***/ "../../packages/switch/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Switch 开关</h2>\n<h3>使用指南</h3>\n<p>在 index.json 中引入组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\">{\n  <span class=\"hljs-attr\">\"usingComponents\"</span>: {\n    <span class=\"hljs-attr\">\"zan-switch\"</span>: <span class=\"hljs-string\">\"/packages/switch/index\"</span>\n  }\n}\n</code></pre>\n<h3>代码演示</h3>\n<p>=======</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-switch</span>\n  <span class=\"hljs-attr\">disabled</span>=<span class=\"hljs-string\">\"{{ disabled }}\"</span>\n  <span class=\"hljs-attr\">checked</span>=<span class=\"hljs-string\">\"{{ checked }}\"</span>\n  <span class=\"hljs-attr\">loading</span>=<span class=\"hljs-string\">\"{{ loading }}\"</span>\n  <span class=\"hljs-attr\">bind:change</span>=<span class=\"hljs-string\">\"handleFieldChange\"</span>\n&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-switch</span>&gt;</span>\n</code></pre>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\">Page({\n  <span class=\"hljs-attr\">data</span>: {\n    <span class=\"hljs-attr\">disabled</span>: <span class=\"hljs-literal\">false</span>,\n    <span class=\"hljs-attr\">checked</span>: <span class=\"hljs-literal\">false</span>,\n    <span class=\"hljs-attr\">loading</span>: <span class=\"hljs-literal\">false</span>\n  },\n\n  <span class=\"hljs-attr\">methods</span>: {\n    handleFieldChange(event, data) {\n      <span class=\"hljs-built_in\">console</span>.log(event, data);\n    }\n  }\n});\n</code></pre>\n<h3>API</h3>\n<table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n<th>必须</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>loading</td>\n<td>switch 是否是 loading 状态</td>\n<td>Boolean</td>\n<td>false</td>\n<td></td>\n</tr>\n<tr>\n<td>disabled</td>\n<td>是否不可用</td>\n<td>Boolean</td>\n<td>false</td>\n<td></td>\n</tr>\n<tr>\n<td>checked</td>\n<td>是否打开状态</td>\n<td>Boolean</td>\n<td>false</td>\n<td>必须</td>\n</tr>\n</tbody>\n</table>\n<h3>Event</h3>\n<table>\n<thead>\n<tr>\n<th>事件名称</th>\n<th>说明</th>\n<th>回调参数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>change</td>\n<td>当绑定值变化时触发的事件</td>\n<td>event对象和数据对象（包含loading和checked）</td>\n</tr>\n</tbody>\n</table>\n<p><wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Switch 开关"}

/***/ }),

/***/ "../../packages/tab/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Tab 标签</h2>\n<h3>使用指南</h3>\n<p>在 index.json 中引入组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\">{\n  <span class=\"hljs-attr\">\"usingComponents\"</span>: {\n    <span class=\"hljs-attr\">\"zan-tab\"</span>: <span class=\"hljs-string\">\"path/to/zanui-weapp/dist/tab/index\"</span>\n  }\n}\n</code></pre>\n<p>在 index.js 中声明组件数据</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\"><span class=\"hljs-comment\">// 在 Page 中声明 Tab 依赖的展示数据</span>\nPage({\n  <span class=\"hljs-attr\">data</span>: {\n    <span class=\"hljs-attr\">list</span>: [{\n      <span class=\"hljs-attr\">id</span>: <span class=\"hljs-string\">'xxx'</span>,\n      <span class=\"hljs-attr\">title</span>: <span class=\"hljs-string\">'xxx'</span>\n    }],\n    <span class=\"hljs-attr\">selectedId</span>: <span class=\"hljs-string\">'xxx'</span>,\n    ...\n  }\n})\n</code></pre>\n<h3>代码演示</h3>\n<p>可以在任意位置上使用 zan-tab 标签。传入对应的数据即可。</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-tab</span>\n  <span class=\"hljs-attr\">scroll</span>=<span class=\"hljs-string\">\"{{ scroll }}\"</span>\n  <span class=\"hljs-attr\">list</span>=<span class=\"hljs-string\">\"{{ list }}\"</span>\n  <span class=\"hljs-attr\">selected-id</span>=<span class=\"hljs-string\">\"{{ selectedId }}\"</span>\n  <span class=\"hljs-attr\">height</span>=<span class=\"hljs-string\">\"{{ height }}\"</span>\n  <span class=\"hljs-attr\">fixed</span>=<span class=\"hljs-string\">\"{{ fixed }}\"</span>\n  <span class=\"hljs-attr\">bindtabchange</span>=<span class=\"hljs-string\">\"handleTabChange\"</span>\n/&gt;</span>\n</code></pre>\n<table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n<th>必须</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>scroll</td>\n<td>是否开启 tab 左右滑动模式</td>\n<td>Boolean</td>\n<td>-</td>\n<td></td>\n</tr>\n<tr>\n<td>list</td>\n<td>可选项列表</td>\n<td>Array</td>\n<td>-</td>\n<td></td>\n</tr>\n<tr>\n<td>selectedId</td>\n<td>选中id</td>\n<td>-</td>\n<td>-</td>\n<td></td>\n</tr>\n<tr>\n<td>height</td>\n<td>tab高度</td>\n<td>Number</td>\n<td>-</td>\n<td></td>\n</tr>\n<tr>\n<td>fixed</td>\n<td>是否固定位置</td>\n<td>Boolean</td>\n<td>-</td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<p>tab 组件中，list 数据格式如下</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\">[{\n  <span class=\"hljs-comment\">// tab 项 id</span>\n  id: <span class=\"hljs-string\">'all'</span>,\n  <span class=\"hljs-comment\">// tab 项展示文案</span>\n  title: <span class=\"hljs-string\">'全部'</span>\n}, {\n  <span class=\"hljs-attr\">id</span>: <span class=\"hljs-string\">'topay'</span>,\n  <span class=\"hljs-attr\">title</span>: <span class=\"hljs-string\">'待付款'</span>\n}, {\n  <span class=\"hljs-attr\">id</span>: <span class=\"hljs-string\">'tosend'</span>,\n  <span class=\"hljs-attr\">title</span>: <span class=\"hljs-string\">'待发货'</span>\n}, {\n  <span class=\"hljs-attr\">id</span>: <span class=\"hljs-string\">'send'</span>,\n  <span class=\"hljs-attr\">title</span>: <span class=\"hljs-string\">'待收货'</span>\n}, {\n  <span class=\"hljs-attr\">id</span>: <span class=\"hljs-string\">'sign'</span>,\n  <span class=\"hljs-attr\">title</span>: <span class=\"hljs-string\">'已完成'</span>\n}]\n</code></pre>\n<p>可以监听 bindtabchange 事件回调，在页面注册回调函数</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\">Page({\n  customCallback(selectedId) {\n    <span class=\"hljs-comment\">// selectId 表示被选中 tab 项的 id</span>\n  }\n}));\n</code></pre>\n<p><wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Tab 标签"}

/***/ }),

/***/ "../../packages/tag/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Tag 标签</h2>\n<h3>使用指南</h3>\n<p>在 json 文件中配置tag组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\"><span class=\"hljs-string\">\"usingComponents\"</span>: {\n  <span class=\"hljs-attr\">\"zan-tag\"</span>: <span class=\"hljs-string\">\"/dist/tag/index\"</span>\n}\n</code></pre>\n<h3>属性</h3>\n<table>\n<thead>\n<tr>\n<th>名称</th>\n<th>类型</th>\n<th>是否必须</th>\n<th>默认</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>type</td>\n<td>String</td>\n<td>否</td>\n<td>空</td>\n<td>tag类型，值有primary、warn、danger</td>\n</tr>\n<tr>\n<td>plain</td>\n<td>Boolean</td>\n<td>否</td>\n<td>false</td>\n<td>\btag是否镂空，默认为false</td>\n</tr>\n<tr>\n<td>disabled</td>\n<td>Boolean</td>\n<td>否</td>\n<td>false</td>\n<td>tag是否禁用，默认为false</td>\n</tr>\n</tbody>\n</table>\n<h3>代码演示</h3>\n<h4>基础用法</h4>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-tag</span>&gt;</span>取消订单<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-tag</span>&gt;</span>\n</code></pre>\n<h4>类型</h4>\n<p>tag支持额外的三种类型 primary, danger, warn</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-tag</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">\"primary\"</span>&gt;</span>会员折扣<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-tag</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-tag</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">\"danger\"</span>&gt;</span>返现<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-tag</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-tag</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">\"warn\"</span>&gt;</span>返现<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-tag</span>&gt;</span>\n</code></pre>\n<h4>其他</h4>\n<p>tag镂空状态</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-tag</span> <span class=\"hljs-attr\">plain</span>&gt;</span>返现<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-tag</span>&gt;</span>\n</code></pre>\n<p>tag禁用状态</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-tag</span> <span class=\"hljs-attr\">disabled</span>&gt;</span>不可用<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-tag</span>&gt;</span>\n</code></pre>\n<p><wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Tag 标签"}

/***/ }),

/***/ "../../packages/toast/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>Toast 轻提示</h2>\n<h3>使用指南</h3>\n<p>在 json 文件中配置 toast 组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\"><span class=\"hljs-string\">\"usingComponents\"</span>: {\n  <span class=\"hljs-attr\">\"zan-toast\"</span>: <span class=\"hljs-string\">\"/path/to/zanui-weapp/dist/toast/index\"</span>\n}\n</code></pre>\n<p>在需要使用的页面里引入组件库模板和脚本</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-toast</span> <span class=\"hljs-attr\">id</span>=<span class=\"hljs-string\">\"zan-toast-test\"</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">zan-toast</span>&gt;</span>\n</code></pre>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\"><span class=\"hljs-keyword\">const</span> Toast = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">'path/to/zanui-weapp/dist/toast/toast'</span>);\n\nPage({\n  <span class=\"hljs-comment\">// ...</span>\n  <span class=\"hljs-comment\">// 可以在任意方法里直接调用，即可唤起</span>\n  handleClick() {\n    Toast({\n      <span class=\"hljs-attr\">message</span>: <span class=\"hljs-string\">'toast me'</span>,\n      <span class=\"hljs-attr\">selector</span>: <span class=\"hljs-string\">'#zan-toast-test'</span>\n    });\n  }\n});\n</code></pre>\n<h4>加载提示</h4>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\">Toast.loading({\n  <span class=\"hljs-attr\">selector</span>: <span class=\"hljs-string\">'#zan-toast-test'</span>\n});\n</code></pre>\n<h3>参数说明</h3>\n<h4>方法</h4>\n<table>\n<thead>\n<tr>\n<th>方法名</th>\n<th>参数</th>\n<th>返回值</th>\n<th>介绍</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Toast</td>\n<td><code v-pre=\"\">options</code>, <code v-pre=\"\">timeout</code></td>\n<td>-</td>\n<td>展示提示</td>\n</tr>\n<tr>\n<td>Toast.loading</td>\n<td><code v-pre=\"\">options</code></td>\n<td>-</td>\n<td>展示加载提示</td>\n</tr>\n<tr>\n<td>Toast.clear</td>\n<td>-</td>\n<td>-</td>\n<td>关闭提示</td>\n</tr>\n<tr>\n<td>Toast.setDefaultOptions</td>\n<td><code v-pre=\"\">options</code> 格式同 Toast 函数可以传入的参数, <code v-pre=\"\">type</code> 可选 global/page, 分别指定对整个小程序生效/对当前页面生效</td>\n<td>-</td>\n<td>修改默认配置，对所有 Toast 生效</td>\n</tr>\n<tr>\n<td>Toast.resetDefaultOptions</td>\n<td><code v-pre=\"\">type</code> 可选 global/page</td>\n<td>-</td>\n<td>重置默认配置，对所有 Toast 生效</td>\n</tr>\n</tbody>\n</table>\n<h4>options 具体参数如下</h4>\n<table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n<th>可选值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>message</td>\n<td>toast 显示文案</td>\n<td>String</td>\n<td>-</td>\n<td></td>\n</tr>\n<tr>\n<td>type</td>\n<td>提示类型</td>\n<td>String</td>\n<td>-</td>\n<td>loading success fail</td>\n</tr>\n<tr>\n<td>icon</td>\n<td>toast 显示图标，可以用 icon 里面支持的所有图标</td>\n<td>String</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>image</td>\n<td>toast 显示图标，为图片的链接，传入此值后会覆盖 icon 值</td>\n<td>String</td>\n<td>-</td>\n<td></td>\n</tr>\n<tr>\n<td>timeout</td>\n<td>toast 显示时间，小于0则会一直显示，需要手动调用 clearZanToast 清除</td>\n<td>Number</td>\n<td>-</td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<p><wxapp-demo></wxapp-demo></p>\n\n      </section>\n    ","label":"Toast 轻提示"}

/***/ }),

/***/ "../../packages/toptips/README.md":
/***/ (function(module, exports) {

module.exports = {"template":"\n      <section>\n        <h2>TopTips 顶部提示</h2>\n<h3>使用指南</h3>\n<p>在 index.json 中引入组件</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-json\">{\n  <span class=\"hljs-attr\">\"usingComponents\"</span>: {\n    <span class=\"hljs-attr\">\"zan-toptips\"</span>: <span class=\"hljs-string\">\"path/to/zanui-weapp/dist/toptips/index\"</span>\n  }\n}\n</code></pre>\n<p>在 index.js 中声明组件数据</p>\n<p><strong>toptips提供了声明式和命令式2种调用方式，但是由于小程序本身限制，会有一定使用的要求</strong></p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\"><span class=\"hljs-comment\">// 使用声明式调用的方式， 必须在Page中声明 $zanui对象， 结构如下</span>\n<span class=\"hljs-comment\">// 同时在其他触发toptips显示的函数中，需要手动改变对应的数值</span>\nPage({\n  <span class=\"hljs-attr\">data</span>: {\n    <span class=\"hljs-attr\">duration</span>: <span class=\"hljs-number\">1000</span>,\n    <span class=\"hljs-attr\">content</span>: <span class=\"hljs-string\">'xxx'</span>,\n    <span class=\"hljs-attr\">$zanui</span>: {\n      <span class=\"hljs-attr\">toptips</span>: {\n        <span class=\"hljs-attr\">show</span>: <span class=\"hljs-literal\">false</span>\n      }\n    }\n  }\n})\n\n<span class=\"hljs-comment\">// 使用命令式调用的方式，必须在 wxml 模板中声明组件id，</span>\n<span class=\"hljs-comment\">// 默认我们使用了 zan-toptips， 如果使用者要更换，可以手动传入</span>\n\n<span class=\"hljs-keyword\">const</span> Toptips = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">'path/to/zanui-weapp/dist/toptips/index'</span>);\nPage({\n  customCallback() {\n    Toptips(<span class=\"hljs-string\">'只穿文案展示'</span>);\n  }\n})\n\n</code></pre>\n<h3>代码演示</h3>\n<h3>声明式调用</h3>\n<p>使用声明式调用</p>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\">Page({\n  <span class=\"hljs-attr\">data</span>: {\n    <span class=\"hljs-attr\">duration</span>: <span class=\"hljs-number\">1000</span>,\n    <span class=\"hljs-attr\">content</span>: <span class=\"hljs-string\">'xxx'</span>,\n    <span class=\"hljs-attr\">$zanui</span>: {\n      <span class=\"hljs-attr\">toptips</span>: {\n        <span class=\"hljs-attr\">show</span>: <span class=\"hljs-literal\">false</span>\n      }\n    }\n  },\n\n  customCallback() {\n    <span class=\"hljs-keyword\">this</span>.setData({\n      <span class=\"hljs-attr\">$zanui</span>: {\n        <span class=\"hljs-attr\">toptips</span>: {\n          <span class=\"hljs-attr\">show</span>: <span class=\"hljs-literal\">true</span>\n        }\n      }\n    });\n\n    setTimeout(<span class=\"hljs-function\"><span class=\"hljs-params\">()</span> =&gt;</span> {\n      <span class=\"hljs-keyword\">this</span>.setData({\n        <span class=\"hljs-attr\">$zanui</span>: {\n          <span class=\"hljs-attr\">toptips</span>: {\n            <span class=\"hljs-attr\">show</span>: <span class=\"hljs-literal\">false</span>\n          }\n        }\n      })\n    }, <span class=\"hljs-keyword\">this</span>.data.duration);\n  }\n})\n</code></pre>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-toptips</span>\n  <span class=\"hljs-attr\">content</span>=<span class=\"hljs-string\">\"tip内容\"</span>\n  <span class=\"hljs-attr\">duration</span>=<span class=\"hljs-string\">\"{{ duration }}\"</span>\n  <span class=\"hljs-attr\">is-show</span>=<span class=\"hljs-string\">\"{{ $zanui.toptips.show }}\"</span>\n/&gt;</span>\n</code></pre>\n<h3>命令式调用</h3>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\">Page({\n  customCallback() {\n    Toptips(<span class=\"hljs-string\">'我只改文案'</span>)\n  }\n})\n</code></pre>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-toptips</span>\n  <span class=\"hljs-attr\">id</span>=<span class=\"hljs-string\">\"zan-toptips\"</span>\n  <span class=\"hljs-attr\">contetn</span>=<span class=\"hljs-string\">\"{{ content }}\"</span>\n/&gt;</span>\n</code></pre>\n<h3>修改组件id</h3>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-js\">Page({\n  customCallback() {\n    Toptips({\n      <span class=\"hljs-attr\">content</span>: <span class=\"hljs-string\">'传入其他参数'</span>,\n      <span class=\"hljs-attr\">selector</span>: <span class=\"hljs-string\">'#other-id'</span>,\n      <span class=\"hljs-attr\">duration</span>: <span class=\"hljs-number\">5000</span>\n    })\n  }\n})\n</code></pre>\n<pre v-pre=\"\"><code v-pre=\"\" class=\"language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">zan-toptips</span>\n  <span class=\"hljs-attr\">id</span>=<span class=\"hljs-string\">\"other-id\"</span>\n  <span class=\"hljs-attr\">contetn</span>=<span class=\"hljs-string\">\"{{ content }}\"</span>\n/&gt;</span>\n</code></pre>\n<table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n<th>可选值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>content</td>\n<td>展示文案</td>\n<td>String</td>\n<td>-</td>\n<td></td>\n</tr>\n<tr>\n<td>duration</td>\n<td>弹层持续时间</td>\n<td>Number</td>\n<td>3000</td>\n<td></td>\n</tr>\n<tr>\n<td>isShow</td>\n<td>弹层是否展示</td>\n<td>Boolean</td>\n<td>false</td>\n<td></td>\n</tr>\n<tr>\n<td>color</td>\n<td>字体颜色</td>\n<td>String</td>\n<td><code v-pre=\"\">#fff</code></td>\n<td></td>\n</tr>\n<tr>\n<td>backgroundColor</td>\n<td>提示背景色</td>\n<td>String</td>\n<td><code v-pre=\"\">#e64340</code></td>\n<td><wxapp-demo></wxapp-demo></td>\n</tr>\n</tbody>\n</table>\n\n      </section>\n    ","label":"TopTips 顶部提示"}

/***/ }),

/***/ "../../website/node_modules/babel-loader/lib/index.js!../vue-loader/lib/selector.js?type=script&index=0!../../website/plugins/components/WxappPage.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  props: ['demoTypes'],
  data() {
    return {
      types: [],
      activeCodeType: ''
    };
  },
  created() {
    this.types = this.demoTypes ? this.demoTypes.split(',') : [];
    this.activeCodeType = this.types ? this.types[0] : '';
  }
});

/***/ }),

/***/ "../../website/node_modules/css-loader/index.js?{\"sourceMap\":true}!../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7a5a90c9\",\"scoped\":true,\"hasInlineConfig\":false}!../vue-loader/lib/selector.js?type=styles&index=0!../../website/plugins/components/WxappPage.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../website/node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "\ncode.language-wxml[data-v-7a5a90c9]::after {\n  content: 'WXML';\n}\ncode.language-js[data-v-7a5a90c9]::after {\n  content: 'JS';\n}\ncode.language-wxss[data-v-7a5a90c9]::after {\n  content: 'WXSS';\n}\ncode.language-json[data-v-7a5a90c9]::after {\n  content: 'JSON';\n}\n\n/* .demo {\n  margin-top: 15px;\n}\n.demo-code {\n  height: 500px;\n  overflow: auto;\n  background-color: #f5f7fa;\n}\n.code-type-tabs {\n  display: flex;\n  justify-content: center;\n  text-align: center;\n}\n.code-type-tab {\n  flex: 1;\n}\n.language-js, .language-wxml, .language-wxss, .language-json {\n  display: none;\n}\n.js .language-js {\n  display: block;\n}\n.json .language-json {\n  display: block;\n}\n.wxml .language-wxml {\n  display: block;\n}\n.wxss .language-wxss {\n  display: block;\n}\npre + pre {\n  margin-top: 0;\n} */\n", "", {"version":3,"sources":["/Users/chenyao/youzan/weapp/zanui-weapp/website/plugins/components/WxappPage.vue"],"names":[],"mappings":";AACA;EACE,gBAAgB;CACjB;AACD;EACE,cAAc;CACf;AACD;EACE,gBAAgB;CACjB;AACD;EACE,gBAAgB;CACjB;;AAED;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;IAiCI","file":"WxappPage.vue","sourcesContent":["\ncode.language-wxml[data-v-7a5a90c9]::after {\n  content: 'WXML';\n}\ncode.language-js[data-v-7a5a90c9]::after {\n  content: 'JS';\n}\ncode.language-wxss[data-v-7a5a90c9]::after {\n  content: 'WXSS';\n}\ncode.language-json[data-v-7a5a90c9]::after {\n  content: 'JSON';\n}\n\n/* .demo {\n  margin-top: 15px;\n}\n.demo-code {\n  height: 500px;\n  overflow: auto;\n  background-color: #f5f7fa;\n}\n.code-type-tabs {\n  display: flex;\n  justify-content: center;\n  text-align: center;\n}\n.code-type-tab {\n  flex: 1;\n}\n.language-js, .language-wxml, .language-wxss, .language-json {\n  display: none;\n}\n.js .language-js {\n  display: block;\n}\n.json .language-json {\n  display: block;\n}\n.wxml .language-wxml {\n  display: block;\n}\n.wxss .language-wxss {\n  display: block;\n}\npre + pre {\n  margin-top: 0;\n} */\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "../../website/node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "../../website/node_modules/vue-style-loader/index.js!../../website/node_modules/css-loader/index.js?{\"sourceMap\":true}!../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7a5a90c9\",\"scoped\":true,\"hasInlineConfig\":false}!../vue-loader/lib/selector.js?type=styles&index=0!../../website/plugins/components/WxappPage.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../../website/node_modules/css-loader/index.js?{\"sourceMap\":true}!../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7a5a90c9\",\"scoped\":true,\"hasInlineConfig\":false}!../vue-loader/lib/selector.js?type=styles&index=0!../../website/plugins/components/WxappPage.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("../../website/node_modules/vue-style-loader/lib/addStylesClient.js")("79277566", content, true, {});

/***/ }),

/***/ "../../website/node_modules/vue-style-loader/lib/addStylesClient.js":
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__("../../website/node_modules/vue-style-loader/lib/listToStyles.js")

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "../../website/node_modules/vue-style-loader/lib/listToStyles.js":
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ "../../website/plugins/components/WxappPage.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_WxappPage_vue__ = __webpack_require__("../../website/node_modules/babel-loader/lib/index.js!../vue-loader/lib/selector.js?type=script&index=0!../../website/plugins/components/WxappPage.vue");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7a5a90c9_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_WxappPage_vue__ = __webpack_require__("../vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-7a5a90c9\",\"hasScoped\":true,\"transformToRequire\":{\"video\":[\"src\",\"poster\"],\"source\":\"src\",\"img\":\"src\",\"image\":\"xlink:href\"},\"buble\":{\"transforms\":{}}}!../vue-loader/lib/selector.js?type=template&index=0!../../website/plugins/components/WxappPage.vue");
function injectStyle (ssrContext) {
  __webpack_require__("../../website/node_modules/vue-style-loader/index.js!../../website/node_modules/css-loader/index.js?{\"sourceMap\":true}!../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7a5a90c9\",\"scoped\":true,\"hasInlineConfig\":false}!../vue-loader/lib/selector.js?type=styles&index=0!../../website/plugins/components/WxappPage.vue")
}
var normalizeComponent = __webpack_require__("../vue-loader/lib/component-normalizer.js")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7a5a90c9"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_WxappPage_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7a5a90c9_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_WxappPage_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "../../website/plugins/styles/main.css":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../css-loader/index.js??ref--7-1!../postcss-loader/lib/index.js??ref--7-2!../../website/plugins/styles/main.css");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("../vue-style-loader/lib/addStylesClient.js")("772e52f6", content, true, {});

/***/ }),

/***/ "../../website/plugins/wxapp-demo.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_WxappPage__ = __webpack_require__("../../website/plugins/components/WxappPage.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_main_css__ = __webpack_require__("../../website/plugins/styles/main.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_main_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__styles_main_css__);


/* harmony default export */ __webpack_exports__["default"] = ({
  install (vue) {
    vue.component('wxapp-demo', __WEBPACK_IMPORTED_MODULE_0__components_WxappPage__["a" /* default */])
  }
});


/***/ }),

/***/ "../babel-loader/lib/index.js!../vue-loader/lib/selector.js?type=script&index=0!./src/App.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'App',
  computed: {
    config: function config() {
      return this.$root.getConfig();
    }
  },
  mounted: function mounted() {
    document.title = this.config.name || this.config.header.logo.title;
  }
});

/***/ }),

/***/ "../babel-loader/lib/index.js!../vue-loader/lib/selector.js?type=script&index=0!./src/components/Documentation.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__("../vue/dist/vue.esm.js");
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      component: null
    };
  },
  created: function created() {
    this.hasComponent('x-' + this.$route.name);
  },

  watch: {
    '$route': function $route(_ref) {
      var name = _ref.name;

      setTimeout(function () {
        window.document.scrollingElement.scrollTop = 0;
      }, 100);
      this.hasComponent('x-' + name);
    }
  },
  methods: {
    hasComponent: function hasComponent(name) {
      if (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component(name)) {
        this.component = name;
      }
    }
  }
});

/***/ }),

/***/ "../babel-loader/lib/index.js!../vue-loader/lib/selector.js?type=script&index=0!./src/components/MenuItem.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'menu-item',
  props: ['menu']
});

/***/ }),

/***/ "../babel-loader/lib/index.js!../vue-loader/lib/selector.js?type=script&index=0!./src/components/SideMenu.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MenuItem__ = __webpack_require__("./src/components/MenuItem.vue");
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'SideMneu',
  props: ['menus'],
  components: { MenuItem: __WEBPACK_IMPORTED_MODULE_0__MenuItem__["a" /* default */] }
});

/***/ }),

/***/ "../babel-runtime/core-js/array/from.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("../core-js/library/fn/array/from.js"), __esModule: true };

/***/ }),

/***/ "../babel-runtime/core-js/object/keys.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("../core-js/library/fn/object/keys.js"), __esModule: true };

/***/ }),

/***/ "../babel-runtime/core-js/promise.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("../core-js/library/fn/promise.js"), __esModule: true };

/***/ }),

/***/ "../babel-runtime/helpers/toConsumableArray.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__("../babel-runtime/core-js/array/from.js");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),

/***/ "../core-js/library/fn/array/from.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../core-js/library/modules/es6.string.iterator.js");
__webpack_require__("../core-js/library/modules/es6.array.from.js");
module.exports = __webpack_require__("../core-js/library/modules/_core.js").Array.from;


/***/ }),

/***/ "../core-js/library/fn/object/keys.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../core-js/library/modules/es6.object.keys.js");
module.exports = __webpack_require__("../core-js/library/modules/_core.js").Object.keys;


/***/ }),

/***/ "../core-js/library/fn/promise.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../core-js/library/modules/es6.object.to-string.js");
__webpack_require__("../core-js/library/modules/es6.string.iterator.js");
__webpack_require__("../core-js/library/modules/web.dom.iterable.js");
__webpack_require__("../core-js/library/modules/es6.promise.js");
__webpack_require__("../core-js/library/modules/es7.promise.finally.js");
__webpack_require__("../core-js/library/modules/es7.promise.try.js");
module.exports = __webpack_require__("../core-js/library/modules/_core.js").Promise;


/***/ }),

/***/ "../core-js/library/modules/_a-function.js":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "../core-js/library/modules/_add-to-unscopables.js":
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "../core-js/library/modules/_an-instance.js":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "../core-js/library/modules/_an-object.js":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("../core-js/library/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "../core-js/library/modules/_array-includes.js":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("../core-js/library/modules/_to-iobject.js");
var toLength = __webpack_require__("../core-js/library/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__("../core-js/library/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "../core-js/library/modules/_classof.js":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("../core-js/library/modules/_cof.js");
var TAG = __webpack_require__("../core-js/library/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "../core-js/library/modules/_cof.js":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "../core-js/library/modules/_core.js":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "../core-js/library/modules/_create-property.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("../core-js/library/modules/_object-dp.js");
var createDesc = __webpack_require__("../core-js/library/modules/_property-desc.js");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "../core-js/library/modules/_ctx.js":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("../core-js/library/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "../core-js/library/modules/_defined.js":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "../core-js/library/modules/_descriptors.js":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("../core-js/library/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "../core-js/library/modules/_dom-create.js":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("../core-js/library/modules/_is-object.js");
var document = __webpack_require__("../core-js/library/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "../core-js/library/modules/_enum-bug-keys.js":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "../core-js/library/modules/_export.js":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("../core-js/library/modules/_global.js");
var core = __webpack_require__("../core-js/library/modules/_core.js");
var ctx = __webpack_require__("../core-js/library/modules/_ctx.js");
var hide = __webpack_require__("../core-js/library/modules/_hide.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "../core-js/library/modules/_fails.js":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "../core-js/library/modules/_for-of.js":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("../core-js/library/modules/_ctx.js");
var call = __webpack_require__("../core-js/library/modules/_iter-call.js");
var isArrayIter = __webpack_require__("../core-js/library/modules/_is-array-iter.js");
var anObject = __webpack_require__("../core-js/library/modules/_an-object.js");
var toLength = __webpack_require__("../core-js/library/modules/_to-length.js");
var getIterFn = __webpack_require__("../core-js/library/modules/core.get-iterator-method.js");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "../core-js/library/modules/_global.js":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "../core-js/library/modules/_has.js":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "../core-js/library/modules/_hide.js":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("../core-js/library/modules/_object-dp.js");
var createDesc = __webpack_require__("../core-js/library/modules/_property-desc.js");
module.exports = __webpack_require__("../core-js/library/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "../core-js/library/modules/_html.js":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("../core-js/library/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "../core-js/library/modules/_ie8-dom-define.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("../core-js/library/modules/_descriptors.js") && !__webpack_require__("../core-js/library/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__("../core-js/library/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "../core-js/library/modules/_invoke.js":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "../core-js/library/modules/_iobject.js":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("../core-js/library/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "../core-js/library/modules/_is-array-iter.js":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("../core-js/library/modules/_iterators.js");
var ITERATOR = __webpack_require__("../core-js/library/modules/_wks.js")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "../core-js/library/modules/_is-object.js":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "../core-js/library/modules/_iter-call.js":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("../core-js/library/modules/_an-object.js");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "../core-js/library/modules/_iter-create.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("../core-js/library/modules/_object-create.js");
var descriptor = __webpack_require__("../core-js/library/modules/_property-desc.js");
var setToStringTag = __webpack_require__("../core-js/library/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("../core-js/library/modules/_hide.js")(IteratorPrototype, __webpack_require__("../core-js/library/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "../core-js/library/modules/_iter-define.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("../core-js/library/modules/_library.js");
var $export = __webpack_require__("../core-js/library/modules/_export.js");
var redefine = __webpack_require__("../core-js/library/modules/_redefine.js");
var hide = __webpack_require__("../core-js/library/modules/_hide.js");
var has = __webpack_require__("../core-js/library/modules/_has.js");
var Iterators = __webpack_require__("../core-js/library/modules/_iterators.js");
var $iterCreate = __webpack_require__("../core-js/library/modules/_iter-create.js");
var setToStringTag = __webpack_require__("../core-js/library/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__("../core-js/library/modules/_object-gpo.js");
var ITERATOR = __webpack_require__("../core-js/library/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "../core-js/library/modules/_iter-detect.js":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("../core-js/library/modules/_wks.js")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "../core-js/library/modules/_iter-step.js":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "../core-js/library/modules/_iterators.js":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "../core-js/library/modules/_library.js":
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "../core-js/library/modules/_microtask.js":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("../core-js/library/modules/_global.js");
var macrotask = __webpack_require__("../core-js/library/modules/_task.js").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__("../core-js/library/modules/_cof.js")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "../core-js/library/modules/_new-promise-capability.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__("../core-js/library/modules/_a-function.js");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "../core-js/library/modules/_object-create.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("../core-js/library/modules/_an-object.js");
var dPs = __webpack_require__("../core-js/library/modules/_object-dps.js");
var enumBugKeys = __webpack_require__("../core-js/library/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__("../core-js/library/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("../core-js/library/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("../core-js/library/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "../core-js/library/modules/_object-dp.js":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("../core-js/library/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__("../core-js/library/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__("../core-js/library/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__("../core-js/library/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "../core-js/library/modules/_object-dps.js":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("../core-js/library/modules/_object-dp.js");
var anObject = __webpack_require__("../core-js/library/modules/_an-object.js");
var getKeys = __webpack_require__("../core-js/library/modules/_object-keys.js");

module.exports = __webpack_require__("../core-js/library/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "../core-js/library/modules/_object-gpo.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("../core-js/library/modules/_has.js");
var toObject = __webpack_require__("../core-js/library/modules/_to-object.js");
var IE_PROTO = __webpack_require__("../core-js/library/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "../core-js/library/modules/_object-keys-internal.js":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("../core-js/library/modules/_has.js");
var toIObject = __webpack_require__("../core-js/library/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__("../core-js/library/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__("../core-js/library/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "../core-js/library/modules/_object-keys.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("../core-js/library/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__("../core-js/library/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "../core-js/library/modules/_object-sap.js":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("../core-js/library/modules/_export.js");
var core = __webpack_require__("../core-js/library/modules/_core.js");
var fails = __webpack_require__("../core-js/library/modules/_fails.js");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "../core-js/library/modules/_perform.js":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "../core-js/library/modules/_promise-resolve.js":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("../core-js/library/modules/_an-object.js");
var isObject = __webpack_require__("../core-js/library/modules/_is-object.js");
var newPromiseCapability = __webpack_require__("../core-js/library/modules/_new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "../core-js/library/modules/_property-desc.js":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "../core-js/library/modules/_redefine-all.js":
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__("../core-js/library/modules/_hide.js");
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),

/***/ "../core-js/library/modules/_redefine.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../core-js/library/modules/_hide.js");


/***/ }),

/***/ "../core-js/library/modules/_set-species.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("../core-js/library/modules/_global.js");
var core = __webpack_require__("../core-js/library/modules/_core.js");
var dP = __webpack_require__("../core-js/library/modules/_object-dp.js");
var DESCRIPTORS = __webpack_require__("../core-js/library/modules/_descriptors.js");
var SPECIES = __webpack_require__("../core-js/library/modules/_wks.js")('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "../core-js/library/modules/_set-to-string-tag.js":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("../core-js/library/modules/_object-dp.js").f;
var has = __webpack_require__("../core-js/library/modules/_has.js");
var TAG = __webpack_require__("../core-js/library/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "../core-js/library/modules/_shared-key.js":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("../core-js/library/modules/_shared.js")('keys');
var uid = __webpack_require__("../core-js/library/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "../core-js/library/modules/_shared.js":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("../core-js/library/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),

/***/ "../core-js/library/modules/_species-constructor.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("../core-js/library/modules/_an-object.js");
var aFunction = __webpack_require__("../core-js/library/modules/_a-function.js");
var SPECIES = __webpack_require__("../core-js/library/modules/_wks.js")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "../core-js/library/modules/_string-at.js":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("../core-js/library/modules/_to-integer.js");
var defined = __webpack_require__("../core-js/library/modules/_defined.js");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "../core-js/library/modules/_task.js":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("../core-js/library/modules/_ctx.js");
var invoke = __webpack_require__("../core-js/library/modules/_invoke.js");
var html = __webpack_require__("../core-js/library/modules/_html.js");
var cel = __webpack_require__("../core-js/library/modules/_dom-create.js");
var global = __webpack_require__("../core-js/library/modules/_global.js");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__("../core-js/library/modules/_cof.js")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "../core-js/library/modules/_to-absolute-index.js":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("../core-js/library/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "../core-js/library/modules/_to-integer.js":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "../core-js/library/modules/_to-iobject.js":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("../core-js/library/modules/_iobject.js");
var defined = __webpack_require__("../core-js/library/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "../core-js/library/modules/_to-length.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("../core-js/library/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "../core-js/library/modules/_to-object.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("../core-js/library/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "../core-js/library/modules/_to-primitive.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("../core-js/library/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "../core-js/library/modules/_uid.js":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "../core-js/library/modules/_wks.js":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("../core-js/library/modules/_shared.js")('wks');
var uid = __webpack_require__("../core-js/library/modules/_uid.js");
var Symbol = __webpack_require__("../core-js/library/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "../core-js/library/modules/core.get-iterator-method.js":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("../core-js/library/modules/_classof.js");
var ITERATOR = __webpack_require__("../core-js/library/modules/_wks.js")('iterator');
var Iterators = __webpack_require__("../core-js/library/modules/_iterators.js");
module.exports = __webpack_require__("../core-js/library/modules/_core.js").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "../core-js/library/modules/es6.array.from.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__("../core-js/library/modules/_ctx.js");
var $export = __webpack_require__("../core-js/library/modules/_export.js");
var toObject = __webpack_require__("../core-js/library/modules/_to-object.js");
var call = __webpack_require__("../core-js/library/modules/_iter-call.js");
var isArrayIter = __webpack_require__("../core-js/library/modules/_is-array-iter.js");
var toLength = __webpack_require__("../core-js/library/modules/_to-length.js");
var createProperty = __webpack_require__("../core-js/library/modules/_create-property.js");
var getIterFn = __webpack_require__("../core-js/library/modules/core.get-iterator-method.js");

$export($export.S + $export.F * !__webpack_require__("../core-js/library/modules/_iter-detect.js")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "../core-js/library/modules/es6.array.iterator.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("../core-js/library/modules/_add-to-unscopables.js");
var step = __webpack_require__("../core-js/library/modules/_iter-step.js");
var Iterators = __webpack_require__("../core-js/library/modules/_iterators.js");
var toIObject = __webpack_require__("../core-js/library/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("../core-js/library/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "../core-js/library/modules/es6.object.keys.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("../core-js/library/modules/_to-object.js");
var $keys = __webpack_require__("../core-js/library/modules/_object-keys.js");

__webpack_require__("../core-js/library/modules/_object-sap.js")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "../core-js/library/modules/es6.object.to-string.js":
/***/ (function(module, exports) {



/***/ }),

/***/ "../core-js/library/modules/es6.promise.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("../core-js/library/modules/_library.js");
var global = __webpack_require__("../core-js/library/modules/_global.js");
var ctx = __webpack_require__("../core-js/library/modules/_ctx.js");
var classof = __webpack_require__("../core-js/library/modules/_classof.js");
var $export = __webpack_require__("../core-js/library/modules/_export.js");
var isObject = __webpack_require__("../core-js/library/modules/_is-object.js");
var aFunction = __webpack_require__("../core-js/library/modules/_a-function.js");
var anInstance = __webpack_require__("../core-js/library/modules/_an-instance.js");
var forOf = __webpack_require__("../core-js/library/modules/_for-of.js");
var speciesConstructor = __webpack_require__("../core-js/library/modules/_species-constructor.js");
var task = __webpack_require__("../core-js/library/modules/_task.js").set;
var microtask = __webpack_require__("../core-js/library/modules/_microtask.js")();
var newPromiseCapabilityModule = __webpack_require__("../core-js/library/modules/_new-promise-capability.js");
var perform = __webpack_require__("../core-js/library/modules/_perform.js");
var promiseResolve = __webpack_require__("../core-js/library/modules/_promise-resolve.js");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__("../core-js/library/modules/_wks.js")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__("../core-js/library/modules/_redefine-all.js")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__("../core-js/library/modules/_set-to-string-tag.js")($Promise, PROMISE);
__webpack_require__("../core-js/library/modules/_set-species.js")(PROMISE);
Wrapper = __webpack_require__("../core-js/library/modules/_core.js")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("../core-js/library/modules/_iter-detect.js")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "../core-js/library/modules/es6.string.iterator.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("../core-js/library/modules/_string-at.js")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("../core-js/library/modules/_iter-define.js")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "../core-js/library/modules/es7.promise.finally.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__("../core-js/library/modules/_export.js");
var core = __webpack_require__("../core-js/library/modules/_core.js");
var global = __webpack_require__("../core-js/library/modules/_global.js");
var speciesConstructor = __webpack_require__("../core-js/library/modules/_species-constructor.js");
var promiseResolve = __webpack_require__("../core-js/library/modules/_promise-resolve.js");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ "../core-js/library/modules/es7.promise.try.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__("../core-js/library/modules/_export.js");
var newPromiseCapability = __webpack_require__("../core-js/library/modules/_new-promise-capability.js");
var perform = __webpack_require__("../core-js/library/modules/_perform.js");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ "../core-js/library/modules/web.dom.iterable.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../core-js/library/modules/es6.array.iterator.js");
var global = __webpack_require__("../core-js/library/modules/_global.js");
var hide = __webpack_require__("../core-js/library/modules/_hide.js");
var Iterators = __webpack_require__("../core-js/library/modules/_iterators.js");
var TO_STRING_TAG = __webpack_require__("../core-js/library/modules/_wks.js")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "../css-loader/index.js??ref--7-1!../postcss-loader/lib/index.js??ref--7-2!../../website/plugins/styles/main.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".van-doc-header {\n  position: fixed;\n  background: #fff;\n  top: 0;\n  z-index: 2;\n}\n.van-doc-header__top-nav-item .van-doc-header__top-nav-lang {\n  display: none;\n}\n.van-doc-footer {\n  position: relative\n}\n.doc-body {\n  margin: 60px auto !important;\n  min-height: 100vh;\n}\n.side-menus {\n  position: fixed;\n  height: calc(100vh - 120px);\n  overflow: auto;\n}\n.demo-view-qrcode {\n  position: fixed;\n  top: 80px;\n  right: 20px;\n  padding: 10px;\n  border-radius: 5px;\n  text-align: center;\n  color: #999;\n}\n.demo-view-qrcode img {\n  width: 160px;\n  height: 160px;\n  margin-bottom: 10px;\n}", "", {"version":3,"sources":["/Users/chenyao/youzan/weapp/zanui-weapp/website/plugins/styles/main.css"],"names":[],"mappings":"AAAA;EACE,gBAAgB;EAChB,iBAAiB;EACjB,OAAO;EACP,WAAW;CACZ;AACD;EACE,cAAc;CACf;AACD;EACE,kBAAkB;CACnB;AACD;EACE,6BAA6B;EAC7B,kBAAkB;CACnB;AACD;EACE,gBAAgB;EAChB,4BAA4B;EAC5B,eAAe;CAChB;AACD;EACE,gBAAgB;EAChB,UAAU;EACV,YAAY;EACZ,cAAc;EACd,mBAAmB;EACnB,mBAAmB;EACnB,YAAY;CACb;AACD;EACE,aAAa;EACb,cAAc;EACd,oBAAoB;CACrB","file":"main.css","sourcesContent":[".van-doc-header {\n  position: fixed;\n  background: #fff;\n  top: 0;\n  z-index: 2;\n}\n.van-doc-header__top-nav-item .van-doc-header__top-nav-lang {\n  display: none;\n}\n.van-doc-footer {\n  position: relative\n}\n.doc-body {\n  margin: 60px auto !important;\n  min-height: 100vh;\n}\n.side-menus {\n  position: fixed;\n  height: calc(100vh - 120px);\n  overflow: auto;\n}\n.demo-view-qrcode {\n  position: fixed;\n  top: 80px;\n  right: 20px;\n  padding: 10px;\n  border-radius: 5px;\n  text-align: center;\n  color: #999;\n}\n.demo-view-qrcode img {\n  width: 160px;\n  height: 160px;\n  margin-bottom: 10px;\n}"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "../css-loader/index.js??ref--7-1!../postcss-loader/lib/index.js??ref--7-2!./src/assets/base.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "body, ul {\n  margin: 0;\n  padding: 0;\n}\na {\n  text-decoration: none;\n}\ncode {\n  display: block;\n  font-size: 13px;\n  overflow-x: auto;\n  font-weight: 400;\n  line-height: 22px;\n  border-radius: 6px;\n  margin-bottom: 25px;\n  position: relative;\n  word-break: break-all;\n  white-space: pre-wrap;\n  background-color: #f5f7fa;\n  color: #455a64;\n  padding: 18px 10px 18px 20px;\n  font-family: \"Source Code Pro\", \"Monaco\", \"Inconsolata\", monospace;\n}\ncode::after {\n  top: 5px;\n  right: 10px;\n  position: absolute;\n  color: #ccc;\n  font-size: 12px;\n}\npre {\n  margin: 0;\n}\npre + pre {\n  margin-top: -10px;\n}\ncode.language-html::after {\n  content: 'HTML';\n}\ncode.language-javascript::after {\n  content: 'JS';\n}\ncode.language-css::after {\n  content: 'CSS';\n}\n.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n  background: #fff;\n}\n.hljs-subst {\n  color: #455a64;\n}\n.hljs-string,\n.hljs-meta,\n.hljs-symbol,\n.hljs-template-tag,\n.hljs-template-variable,\n.hljs-addition {\n  color: #756bb1;\n}\n.hljs-comment,\n.hljs-quote {\n  color: #999;\n}\n.hljs-number,\n.hljs-regexp,\n.hljs-literal,\n.hljs-bullet,\n.hljs-link {\n  color: #31a354;\n}\n.hljs-deletion,\n.hljs-variable {\n  color: #88f;\n}\n.hljs-keyword,\n.hljs-selector-tag,\n.hljs-title,\n.hljs-section,\n.hljs-built_in,\n.hljs-doctag,\n.hljs-type,\n.hljs-tag,\n.hljs-name,\n.hljs-selector-id,\n.hljs-selector-class,\n.hljs-strong {\n  color: #1976d2;\n}\n.hljs-emphasis {\n  font-style: italic;\n}\n.hljs-attribute {\n  color: #e6550d;\n}\n", "", {"version":3,"sources":["/Users/chenyao/youzan/weapp/zanui-weapp/node_modules/wedoc/src/assets/base.css"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,WAAW;CACZ;AACD;EACE,sBAAsB;CACvB;AAED;EACE,eAAe;EACf,gBAAgB;EAChB,iBAAiB;EACjB,iBAAiB;EACjB,kBAAkB;EAClB,mBAAmB;EACnB,oBAAoB;EACpB,mBAAmB;EACnB,sBAAsB;EACtB,sBAAsB;EACtB,0BAA0B;EAC1B,eAAe;EACf,6BAA6B;EAC7B,mEAAmE;CACpE;AACD;EACE,SAAS;EACT,YAAY;EACZ,mBAAmB;EACnB,YAAY;EACZ,gBAAgB;CACjB;AAED;EACE,UAAU;CACX;AACD;EACE,kBAAkB;CACnB;AACD;EACE,gBAAgB;CACjB;AAED;EACE,cAAc;CACf;AAED;EACE,eAAe;CAChB;AAED;EACE,eAAe;EACf,iBAAiB;EACjB,eAAe;EACf,iBAAiB;CAClB;AAED;EACE,eAAe;CAChB;AAED;;;;;;EAME,eAAe;CAChB;AAED;;EAEE,YAAY;CACb;AAED;;;;;EAKE,eAAe;CAChB;AAED;;EAEE,YAAY;CACb;AAED;;;;;;;;;;;;EAYE,eAAe;CAChB;AAED;EACE,mBAAmB;CACpB;AAED;EACE,eAAe;CAChB","file":"base.css","sourcesContent":["body, ul {\n  margin: 0;\n  padding: 0;\n}\na {\n  text-decoration: none;\n}\n\ncode {\n  display: block;\n  font-size: 13px;\n  overflow-x: auto;\n  font-weight: 400;\n  line-height: 22px;\n  border-radius: 6px;\n  margin-bottom: 25px;\n  position: relative;\n  word-break: break-all;\n  white-space: pre-wrap;\n  background-color: #f5f7fa;\n  color: #455a64;\n  padding: 18px 10px 18px 20px;\n  font-family: \"Source Code Pro\", \"Monaco\", \"Inconsolata\", monospace;\n}\ncode::after {\n  top: 5px;\n  right: 10px;\n  position: absolute;\n  color: #ccc;\n  font-size: 12px;\n}\n\npre {\n  margin: 0;\n}\npre + pre {\n  margin-top: -10px;\n}\ncode.language-html::after {\n  content: 'HTML';\n}\n\ncode.language-javascript::after {\n  content: 'JS';\n}\n\ncode.language-css::after {\n  content: 'CSS';\n}\n\n.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n  background: #fff;\n}\n\n.hljs-subst {\n  color: #455a64;\n}\n\n.hljs-string,\n.hljs-meta,\n.hljs-symbol,\n.hljs-template-tag,\n.hljs-template-variable,\n.hljs-addition {\n  color: #756bb1;\n}\n\n.hljs-comment,\n.hljs-quote {\n  color: #999;\n}\n\n.hljs-number,\n.hljs-regexp,\n.hljs-literal,\n.hljs-bullet,\n.hljs-link {\n  color: #31a354;\n}\n\n.hljs-deletion,\n.hljs-variable {\n  color: #88f;\n}\n\n.hljs-keyword,\n.hljs-selector-tag,\n.hljs-title,\n.hljs-section,\n.hljs-built_in,\n.hljs-doctag,\n.hljs-type,\n.hljs-tag,\n.hljs-name,\n.hljs-selector-id,\n.hljs-selector-class,\n.hljs-strong {\n  color: #1976d2;\n}\n\n.hljs-emphasis {\n  font-style: italic;\n}\n\n.hljs-attribute {\n  color: #e6550d;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "../css-loader/index.js??ref--7-1!../postcss-loader/lib/index.js??ref--7-2!./src/styles/main.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "body {\n  -webkit-font-smoothing: antialiased;\n  font-family: PingFang SC,Helvetica Neue,Arial,sans-serif;\n}\n.doc-header {\n  background: #fff;\n  top: 0;\n  z-index: 2;\n  border-bottom: 1px solid #eaeefb;\n  position: fixed;\n}\n@media (min-width: 1024px) {\n  .van-doc-header.doc-header-container {\n    width: 100%;\n    position: relative !important;\n    border: none;\n  }\n  .van-doc-header.doc-header-container .van-doc-row {\n    width: 1024px;\n    margin: 0 auto;\n  }\n}\n.van-doc-footer {\n  position: relative\n}\n.doc-body {\n  margin: 60px auto !important;\n  min-height: 100vh;\n}\n.side-menus {\n  position: fixed;\n  height: calc(100vh - 60px);\n  overflow: auto;\n}\n.demo-view-qrcode {\n  position: fixed;\n  top: 80px;\n  right: 20px;\n  padding: 10px;\n  border-radius: 5px;\n  text-align: center;\n  color: #999;\n}\n.demo-view-qrcode img {\n  width: 160px;\n  height: 160px;\n  margin-bottom: 10px;\n}", "", {"version":3,"sources":["/Users/chenyao/youzan/weapp/zanui-weapp/node_modules/wedoc/src/styles/main.css"],"names":[],"mappings":"AAAA;EACE,oCAAoC;EACpC,yDAAyD;CAC1D;AACD;EACE,iBAAiB;EACjB,OAAO;EACP,WAAW;EACX,iCAAiC;EACjC,gBAAgB;CACjB;AAED;EACE;IACE,YAAY;IACZ,8BAA8B;IAC9B,aAAa;GACd;EACD;IACE,cAAc;IACd,eAAe;GAChB;CACF;AACD;EACE,kBAAkB;CACnB;AACD;EACE,6BAA6B;EAC7B,kBAAkB;CACnB;AACD;EACE,gBAAgB;EAChB,2BAA2B;EAC3B,eAAe;CAChB;AACD;EACE,gBAAgB;EAChB,UAAU;EACV,YAAY;EACZ,cAAc;EACd,mBAAmB;EACnB,mBAAmB;EACnB,YAAY;CACb;AACD;EACE,aAAa;EACb,cAAc;EACd,oBAAoB;CACrB","file":"main.css","sourcesContent":["body {\n  -webkit-font-smoothing: antialiased;\n  font-family: PingFang SC,Helvetica Neue,Arial,sans-serif;\n}\n.doc-header {\n  background: #fff;\n  top: 0;\n  z-index: 2;\n  border-bottom: 1px solid #eaeefb;\n  position: fixed;\n}\n\n@media (min-width: 1024px) {\n  .van-doc-header.doc-header-container {\n    width: 100%;\n    position: relative !important;\n    border: none;\n  }\n  .van-doc-header.doc-header-container .van-doc-row {\n    width: 1024px;\n    margin: 0 auto;\n  }\n}\n.van-doc-footer {\n  position: relative\n}\n.doc-body {\n  margin: 60px auto !important;\n  min-height: 100vh;\n}\n.side-menus {\n  position: fixed;\n  height: calc(100vh - 60px);\n  overflow: auto;\n}\n.demo-view-qrcode {\n  position: fixed;\n  top: 80px;\n  right: 20px;\n  padding: 10px;\n  border-radius: 5px;\n  text-align: center;\n  color: #999;\n}\n.demo-view-qrcode img {\n  width: 160px;\n  height: 160px;\n  margin-bottom: 10px;\n}"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "../css-loader/index.js?{\"sourceMap\":true}!../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3a4eee14\",\"scoped\":true,\"hasInlineConfig\":false}!../vue-loader/lib/selector.js?type=styles&index=0!./src/App.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "\n.doc-body[data-v-3a4eee14] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.doc-header[data-v-3a4eee14] {\n  width: 100%;\n}\n@media (min-width: 1024px) {\n.doc-body[data-v-3a4eee14] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    width: 1024px;\n    margin: 0 auto;\n}\n.doc-header .doc-header-container[data-v-3a4eee14] {\n    width: 1024px;\n    margin: 0 auto;\n}\n}\n.doc-menus[data-v-3a4eee14] {\n  width: 244px;\n}\n.doc-content[data-v-3a4eee14] {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  padding: 15px;\n}\n", "", {"version":3,"sources":["/Users/chenyao/youzan/weapp/zanui-weapp/node_modules/wedoc/src/App.vue"],"names":[],"mappings":";AACA;EACE,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;CACf;AACD;EACE,YAAY;CACb;AACD;AACA;IACI,qBAAqB;IACrB,qBAAqB;IACrB,cAAc;IACd,cAAc;IACd,eAAe;CAClB;AACD;IACI,cAAc;IACd,eAAe;CAClB;CACA;AACD;EACE,aAAa;CACd;AACD;EACE,oBAAoB;MAChB,YAAY;UACR,QAAQ;EAChB,cAAc;CACf","file":"App.vue","sourcesContent":["\n.doc-body[data-v-3a4eee14] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.doc-header[data-v-3a4eee14] {\n  width: 100%;\n}\n@media (min-width: 1024px) {\n.doc-body[data-v-3a4eee14] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    width: 1024px;\n    margin: 0 auto;\n}\n.doc-header .doc-header-container[data-v-3a4eee14] {\n    width: 1024px;\n    margin: 0 auto;\n}\n}\n.doc-menus[data-v-3a4eee14] {\n  width: 244px;\n}\n.doc-content[data-v-3a4eee14] {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  padding: 15px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "../css-loader/index.js?{\"sourceMap\":true}!../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7eced3a1\",\"scoped\":true,\"hasInlineConfig\":false}!../vue-loader/lib/selector.js?type=styles&index=0!./src/components/MenuItem.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "\n.menu-item a[data-v-7eced3a1] {\n  margin: 0;\n  display: block;\n  color: #455a64;\n  font-size: 16px;\n  padding: 8px 40px;\n  line-height: 24px;\n  font-size: 13px;\n  -webkit-transition: all .3s;\n  transition: all .3s;\n}\n.menu-item a.no-href[data-v-7eced3a1] {\n  color: #455a64;\n  font-weight: 700;\n  font-size: 16px;\n}\n.menu-item.active[data-v-7eced3a1] {\n  color: #38f;\n  background-color: #f5f7fa;\n}\n", "", {"version":3,"sources":["/Users/chenyao/youzan/weapp/zanui-weapp/node_modules/wedoc/src/components/MenuItem.vue"],"names":[],"mappings":";AACA;EACE,UAAU;EACV,eAAe;EACf,eAAe;EACf,gBAAgB;EAChB,kBAAkB;EAClB,kBAAkB;EAClB,gBAAgB;EAChB,4BAA4B;EAC5B,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,iBAAiB;EACjB,gBAAgB;CACjB;AACD;EACE,YAAY;EACZ,0BAA0B;CAC3B","file":"MenuItem.vue","sourcesContent":["\n.menu-item a[data-v-7eced3a1] {\n  margin: 0;\n  display: block;\n  color: #455a64;\n  font-size: 16px;\n  padding: 8px 40px;\n  line-height: 24px;\n  font-size: 13px;\n  -webkit-transition: all .3s;\n  transition: all .3s;\n}\n.menu-item a.no-href[data-v-7eced3a1] {\n  color: #455a64;\n  font-weight: 700;\n  font-size: 16px;\n}\n.menu-item.active[data-v-7eced3a1] {\n  color: #38f;\n  background-color: #f5f7fa;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "../css-loader/index.js?{\"sourceMap\":true}!../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-aacbfdc6\",\"scoped\":true,\"hasInlineConfig\":false}!../vue-loader/lib/selector.js?type=styles&index=0!./src/components/SideMenu.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "\n.side-menus[data-v-aacbfdc6] {\n  padding: 15px;\n  width: 200px;\n  padding: 20px 0 100px;\n  min-width: 240px;\n  max-width: 240px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.side-menus .side-menus[data-v-aacbfdc6] {\n  padding-left: 15px;\n}\n[data-v-aacbfdc6]::-webkit-scrollbar {\n  width: 0;\n}\n", "", {"version":3,"sources":["/Users/chenyao/youzan/weapp/zanui-weapp/node_modules/wedoc/src/components/SideMenu.vue"],"names":[],"mappings":";AACA;EACE,cAAc;EACd,aAAa;EACb,sBAAsB;EACtB,iBAAiB;EACjB,iBAAiB;EACjB,+BAA+B;UACvB,uBAAuB;CAChC;AACD;EACE,mBAAmB;CACpB;AACD;EACE,SAAS;CACV","file":"SideMenu.vue","sourcesContent":["\n.side-menus[data-v-aacbfdc6] {\n  padding: 15px;\n  width: 200px;\n  padding: 20px 0 100px;\n  min-width: 240px;\n  max-width: 240px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.side-menus .side-menus[data-v-aacbfdc6] {\n  padding-left: 15px;\n}\n[data-v-aacbfdc6]::-webkit-scrollbar {\n  width: 0;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "../css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "../vant-doc/dist/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(7)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __webpack_require__("../vue/dist/vue.esm.js");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: external "vue"
var external__vue_ = __webpack_require__(3);
var external__vue__default = /*#__PURE__*/__webpack_require__.n(external__vue_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/VanDoc.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var VanDoc = ({
  name: 'van-doc',

  props: {
    config: {
      type: Object,
      required: true
    },
    currentSimulator: Number,
    simulator: String,
    simulators: {
      type: Array,
      default: function _default() {}
    },
    base: {
      type: String,
      default: '/component'
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5eae822a","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/VanDoc.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"van-doc"},[_c('van-doc-header',{attrs:{"config":_vm.config.header,"active":"移动端"}}),_vm._v(" "),_c('van-doc-nav',{attrs:{"navConfig":_vm.config.nav,"base":_vm.base}}),_vm._v(" "),_c('van-doc-container',{attrs:{"hasSimulator":!!(_vm.simulator || _vm.simulators.length)}},[_c('van-doc-content',[_vm._t("default"),_vm._v(" "),_c('van-doc-footer-nav',{attrs:{"navConfig":_vm.config.nav,"base":_vm.base}})],2)],1),_vm._v(" "),(_vm.simulator)?_c('van-doc-simulator',{attrs:{"src":_vm.simulator}}):_vm._e(),_vm._v(" "),_vm._l((_vm.simulators),function(url,index){return _c('van-doc-simulator',{directives:[{name:"show",rawName:"v-show",value:(index === _vm.currentSimulator),expression:"index === currentSimulator"}],attrs:{"src":url}})})],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var selectortype_template_index_0_src_VanDoc = (esExports);
// CONCATENATED MODULE: ./src/VanDoc.vue
function injectStyle (ssrContext) {
  __webpack_require__(5)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var VanDoc_Component = normalizeComponent(
  VanDoc,
  selectortype_template_index_0_src_VanDoc,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_VanDoc = (VanDoc_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/NavLink.vue
//
//
//
//
//
//

/* harmony default export */ var NavLink = ({
  name: 'van-doc-nav-link',
  props: ['base', 'item'],

  computed: {
    itemName: function itemName() {
      var name = (this.item.title || this.item.name).split(' - ');
      return name[0] + ' <span>' + name.slice(1).join(' - ') + '</span>';
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-489e4976","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/NavLink.vue
var NavLink_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.item.path)?_c('router-link',{attrs:{"active-class":"active","to":_vm.base + _vm.item.path},domProps:{"innerHTML":_vm._s(_vm.itemName)}}):(_vm.item.link)?_c('a',{attrs:{"href":_vm.item.link},domProps:{"innerHTML":_vm._s(_vm.itemName)}}):_c('a',{domProps:{"innerHTML":_vm._s(_vm.itemName)}})}
var NavLink_staticRenderFns = []
var NavLink_esExports = { render: NavLink_render, staticRenderFns: NavLink_staticRenderFns }
/* harmony default export */ var component_NavLink = (NavLink_esExports);
// CONCATENATED MODULE: ./src/component/NavLink.vue
var NavLink_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var NavLink___vue_template_functional__ = false
/* styles */
var NavLink___vue_styles__ = null
/* scopeId */
var NavLink___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var NavLink___vue_module_identifier__ = null
var NavLink_Component = NavLink_normalizeComponent(
  NavLink,
  component_NavLink,
  NavLink___vue_template_functional__,
  NavLink___vue_styles__,
  NavLink___vue_scopeId__,
  NavLink___vue_module_identifier__
)

/* harmony default export */ var src_component_NavLink = (NavLink_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/Nav.vue
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var Nav = ({
  name: 'van-doc-nav',

  components: _defineProperty({}, src_component_NavLink.name, src_component_NavLink),

  props: {
    navConfig: Array,
    base: {
      type: String,
      default: ''
    }
  },

  data: function data() {
    return {
      top: 60,
      bottom: 0
    };
  },


  computed: {
    style: function style() {
      return {
        top: this.top + 'px',
        bottom: this.bottom + 'px'
      };
    }
  },

  created: function created() {
    window.addEventListener('scroll', this.onScroll);
    this.onScroll();
  },


  methods: {
    onScroll: function onScroll() {
      var _window = window,
          offset = _window.pageYOffset;

      this.top = Math.max(0, 60 - offset);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-002e15ab","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/Nav.vue
var Nav_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"van-doc-nav",style:(_vm.style)},[_c('ul',_vm._l((_vm.navConfig),function(item,index){return _c('li',{key:index,staticClass:"van-doc-nav__item"},[_c('van-doc-nav-link',{attrs:{"item":item,"base":_vm.base}}),_vm._v(" "),(item.children)?_c('ul',_vm._l((item.children),function(navItem,index){return _c('li',{key:index,staticClass:"nav-item"},[_c('van-doc-nav-link',{attrs:{"item":navItem,"base":_vm.base}})],1)})):_vm._e(),_vm._v(" "),_vm._l((item.groups),function(group,index){return (item.groups)?_c('div',{key:index},[_c('div',{staticClass:"van-doc-nav__group-title"},[_vm._v(_vm._s(group.groupName))]),_vm._v(" "),_c('ul',_vm._l((group.list),function(navItem,index){return (!navItem.disabled)?_c('li',{key:index,staticClass:"van-doc-nav__subitem"},[_c('van-doc-nav-link',{attrs:{"item":navItem,"base":_vm.base}})],1):_vm._e()}))]):_vm._e()})],2)}))])}
var Nav_staticRenderFns = []
var Nav_esExports = { render: Nav_render, staticRenderFns: Nav_staticRenderFns }
/* harmony default export */ var component_Nav = (Nav_esExports);
// CONCATENATED MODULE: ./src/component/Nav.vue
function Nav_injectStyle (ssrContext) {
  __webpack_require__(8)
}
var Nav_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var Nav___vue_template_functional__ = false
/* styles */
var Nav___vue_styles__ = Nav_injectStyle
/* scopeId */
var Nav___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Nav___vue_module_identifier__ = null
var Nav_Component = Nav_normalizeComponent(
  Nav,
  component_Nav,
  Nav___vue_template_functional__,
  Nav___vue_styles__,
  Nav___vue_scopeId__,
  Nav___vue_module_identifier__
)

/* harmony default export */ var src_component_Nav = (Nav_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/Block.vue
//
//
//
//
//
//

/* harmony default export */ var Block = ({
  name: 'van-doc-block'
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-17e15015","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/Block.vue
var Block_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"van-doc-block"},[_vm._t("default")],2)}
var Block_staticRenderFns = []
var Block_esExports = { render: Block_render, staticRenderFns: Block_staticRenderFns }
/* harmony default export */ var component_Block = (Block_esExports);
// CONCATENATED MODULE: ./src/component/Block.vue
function Block_injectStyle (ssrContext) {
  __webpack_require__(10)
}
var Block_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var Block___vue_template_functional__ = false
/* styles */
var Block___vue_styles__ = Block_injectStyle
/* scopeId */
var Block___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Block___vue_module_identifier__ = null
var Block_Component = Block_normalizeComponent(
  Block,
  component_Block,
  Block___vue_template_functional__,
  Block___vue_styles__,
  Block___vue_scopeId__,
  Block___vue_module_identifier__
)

/* harmony default export */ var src_component_Block = (Block_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/Header.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Header = ({
  name: 'van-doc-header',

  props: {
    config: Object,
    active: String
  },

  methods: {
    onSwitchLang: function onSwitchLang(lang) {
      this.$router.push(this.$route.path.replace(lang.from, lang.to));
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-10188d35","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/Header.vue
var Header_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"van-doc-header"},[_c('div',{staticClass:"van-doc-row"},[_c('div',{staticClass:"van-doc-header__top"},[_c('a',{staticClass:"van-doc-header__logo",attrs:{"href":_vm.config.logo.href}},[_c('img',{attrs:{"src":_vm.config.logo.image}}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.config.logo.title))])]),_vm._v(" "),_c('ul',{staticClass:"van-doc-header__top-nav"},_vm._l((_vm.config.nav),function(value,key){return _c('li',{staticClass:"van-doc-header__top-nav-item"},[_c('a',{staticClass:"van-doc-header__top-nav-title",class:{ active: key === _vm.active },attrs:{"href":typeof value === 'string' ? value : 'javascript:;',"target":key === 'github' ? '_blank' : ''}},[(key === 'github')?_c('svg',{staticClass:"octicon octicon-mark-github",attrs:{"height":"28","width":"28","viewBox":"0 0 16 16","version":"1.1","aria-hidden":"true"}},[_c('path',{attrs:{"fill-rule":"evenodd","d":"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"}})]):(key === 'lang')?_c('span',{staticClass:"van-doc-header__top-nav-lang",on:{"click":function($event){_vm.onSwitchLang(value)}}},[_vm._v(_vm._s(value.text))]):_c('span',[_vm._v(_vm._s(key))])])])}))])])])}
var Header_staticRenderFns = []
var Header_esExports = { render: Header_render, staticRenderFns: Header_staticRenderFns }
/* harmony default export */ var component_Header = (Header_esExports);
// CONCATENATED MODULE: ./src/component/Header.vue
function Header_injectStyle (ssrContext) {
  __webpack_require__(12)
}
var Header_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var Header___vue_template_functional__ = false
/* styles */
var Header___vue_styles__ = Header_injectStyle
/* scopeId */
var Header___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Header___vue_module_identifier__ = null
var Header_Component = Header_normalizeComponent(
  Header,
  component_Header,
  Header___vue_template_functional__,
  Header___vue_styles__,
  Header___vue_scopeId__,
  Header___vue_module_identifier__
)

/* harmony default export */ var src_component_Header = (Header_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/Footer.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Footer = ({
  name: 'van-doc-footer',

  props: {
    config: Object
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2233ad7a","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/Footer.vue
var Footer_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"van-doc-footer"},[_c('ul',_vm._l((_vm.config.nav),function(value,key){return _c('li',{key:key,staticClass:"van-doc-footer__item"},[_c('a',{attrs:{"href":value,"target":"_blank"}},[_vm._v(_vm._s(key))])])})),_vm._v(" "),(_vm.config.github)?_c('a',{staticClass:"github-corner",attrs:{"href":_vm.config.github,"target":"_blank","aria-label":"View source on Github"}},[_c('svg',{attrs:{"width":"100","height":"100","viewBox":"0 0 250 250","aria-hidden":"true"}},[_c('path',{staticClass:"octo-arm",staticStyle:{"transform-origin":"130px 106px"},attrs:{"d":"M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2","fill":"currentColor"}}),_vm._v(" "),_c('path',{staticClass:"octo-body",attrs:{"d":"M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z","fill":"currentColor"}})])]):_vm._e()])}
var Footer_staticRenderFns = []
var Footer_esExports = { render: Footer_render, staticRenderFns: Footer_staticRenderFns }
/* harmony default export */ var component_Footer = (Footer_esExports);
// CONCATENATED MODULE: ./src/component/Footer.vue
function Footer_injectStyle (ssrContext) {
  __webpack_require__(14)
}
var Footer_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var Footer___vue_template_functional__ = false
/* styles */
var Footer___vue_styles__ = Footer_injectStyle
/* scopeId */
var Footer___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Footer___vue_module_identifier__ = null
var Footer_Component = Footer_normalizeComponent(
  Footer,
  component_Footer,
  Footer___vue_template_functional__,
  Footer___vue_styles__,
  Footer___vue_scopeId__,
  Footer___vue_module_identifier__
)

/* harmony default export */ var src_component_Footer = (Footer_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/Content.vue
//
//
//
//
//
//

/* harmony default export */ var Content = ({
  name: 'van-doc-content',

  computed: {
    currentPage: function currentPage() {
      var path = this.$route.path;

      if (path) {
        return path.split('/').slice(-1)[0];
      }
      return this.$route.name;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-d05a63fe","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/Content.vue
var Content_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['van-doc-content', ("van-doc-content--" + _vm.currentPage)]},[_vm._t("default")],2)}
var Content_staticRenderFns = []
var Content_esExports = { render: Content_render, staticRenderFns: Content_staticRenderFns }
/* harmony default export */ var component_Content = (Content_esExports);
// CONCATENATED MODULE: ./src/component/Content.vue
function Content_injectStyle (ssrContext) {
  __webpack_require__(16)
}
var Content_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var Content___vue_template_functional__ = false
/* styles */
var Content___vue_styles__ = Content_injectStyle
/* scopeId */
var Content___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Content___vue_module_identifier__ = null
var Content_Component = Content_normalizeComponent(
  Content,
  component_Content,
  Content___vue_template_functional__,
  Content___vue_styles__,
  Content___vue_scopeId__,
  Content___vue_module_identifier__
)

/* harmony default export */ var src_component_Content = (Content_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/Container.vue
//
//
//
//
//
//

/* harmony default export */ var Container = ({
  name: 'van-doc-container',

  props: {
    hasSimulator: Boolean
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-9406f3ee","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/Container.vue
var Container_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"van-doc-container van-doc-row",class:{ 'van-doc-container--with-simulator': _vm.hasSimulator }},[_vm._t("default")],2)}
var Container_staticRenderFns = []
var Container_esExports = { render: Container_render, staticRenderFns: Container_staticRenderFns }
/* harmony default export */ var component_Container = (Container_esExports);
// CONCATENATED MODULE: ./src/component/Container.vue
function Container_injectStyle (ssrContext) {
  __webpack_require__(18)
}
var Container_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var Container___vue_template_functional__ = false
/* styles */
var Container___vue_styles__ = Container_injectStyle
/* scopeId */
var Container___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Container___vue_module_identifier__ = null
var Container_Component = Container_normalizeComponent(
  Container,
  component_Container,
  Container___vue_template_functional__,
  Container___vue_styles__,
  Container___vue_scopeId__,
  Container___vue_module_identifier__
)

/* harmony default export */ var src_component_Container = (Container_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/FooterNav.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var FooterNav = ({
  name: 'van-doc-footer-nav',

  props: {
    base: String,
    navConfig: Array
  },

  data: function data() {
    return {
      nav: [],
      currentPath: null,
      leftNav: null,
      rightNav: null
    };
  },


  watch: {
    '$route.path': function $routePath() {
      this.setNav();
      this.updateNav();
    }
  },

  created: function created() {
    this.setNav();
    this.updateNav();
    this.keyboardHandler();
  },


  methods: {
    setNav: function setNav() {
      var nav = this.navConfig;
      for (var i = 0; i < nav.length; i++) {
        var navItem = nav[i];
        if (!navItem.groups) {
          this.nav.push(nav[i]);
        } else {
          for (var j = 0; j < navItem.groups.length; j++) {
            this.nav = this.nav.concat(navItem.groups[j].list);
          }
        }
      }
    },
    updateNav: function updateNav() {
      var currentIndex = void 0;

      this.currentPath = '/' + this.$route.path.split('/').pop();

      for (var i = 0, len = this.nav.length; i < len; i++) {
        if (this.nav[i].path === this.currentPath) {
          currentIndex = i;
          break;
        }
      }
      this.leftNav = this.nav[currentIndex - 1];
      this.rightNav = this.nav[currentIndex + 1];
    },
    handleNavClick: function handleNavClick(direction) {
      var nav = direction === 'prev' ? this.leftNav : this.rightNav;
      if (nav.path) {
        this.$router.push(this.base + nav.path);
      } else if (nav.link) {
        window.location.href = nav.link;
      }
    },
    keyboardHandler: function keyboardHandler() {
      var _this = this;

      window.addEventListener('keyup', function (event) {
        switch (event.keyCode) {
          case 37:
            // left
            _this.handleNavClick('prev');
            break;
          case 39:
            // right
            _this.handleNavClick('next');
            break;
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-6b042f90","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/FooterNav.vue
var FooterNav_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"van-doc-footer-nav"},[(_vm.leftNav)?_c('div',{staticClass:"van-doc-footer-nav__link van-doc-footer-nav__left",on:{"click":function($event){_vm.handleNavClick('prev')}}},[_c('div',{staticClass:"van-doc-footer-nav__arrow-left"}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.leftNav.title))])]):_vm._e(),_vm._v(" "),(_vm.rightNav)?_c('div',{staticClass:"van-doc-footer-nav__link van-doc-footer-nav__right",on:{"click":function($event){_vm.handleNavClick('next')}}},[_c('span',[_vm._v(_vm._s(_vm.rightNav.title))]),_vm._v(" "),_c('div',{staticClass:"van-doc-footer-nav__arrow-right"})]):_vm._e()])}
var FooterNav_staticRenderFns = []
var FooterNav_esExports = { render: FooterNav_render, staticRenderFns: FooterNav_staticRenderFns }
/* harmony default export */ var component_FooterNav = (FooterNav_esExports);
// CONCATENATED MODULE: ./src/component/FooterNav.vue
function FooterNav_injectStyle (ssrContext) {
  __webpack_require__(20)
}
var FooterNav_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var FooterNav___vue_template_functional__ = false
/* styles */
var FooterNav___vue_styles__ = FooterNav_injectStyle
/* scopeId */
var FooterNav___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var FooterNav___vue_module_identifier__ = null
var FooterNav_Component = FooterNav_normalizeComponent(
  FooterNav,
  component_FooterNav,
  FooterNav___vue_template_functional__,
  FooterNav___vue_styles__,
  FooterNav___vue_scopeId__,
  FooterNav___vue_module_identifier__
)

/* harmony default export */ var src_component_FooterNav = (FooterNav_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/Simulator.vue
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Simulator = ({
  name: 'van-doc-simulator',

  props: {
    src: String
  },

  data: function data() {
    return {
      scrollTop: window.scrollY,
      iframeHostName: '',
      windowHeight: window.innerHeight
    };
  },
  mounted: function mounted() {
    var _this = this;

    window.addEventListener('scroll', function () {
      _this.scrollTop = window.scrollY;
    });
    window.addEventListener('resize', function () {
      _this.windowHeight = window.innerHeight;
    });

    var iframe = this.$refs.iframe;

    if (iframe) {
      if (iframe.contentDocument.readyState === 'complete') {
        setTimeout(this.onSrcChanged, 0);
      } else {
        iframe.onload = function () {
          _this.onSrcChanged();
        };
      }
    }
  },


  watch: {
    src: function src() {
      this.onSrcChanged();
    }
  },

  computed: {
    srcWithTimestamp: function srcWithTimestamp() {
      var now = 'rand=' + Date.now();
      return this.src + (this.src.indexOf('?') === -1 ? '?' : '&') + now;
    },
    isFixed: function isFixed() {
      return this.scrollTop > 60;
    },
    simulatorStyle: function simulatorStyle() {
      var height = Math.min(580, this.windowHeight - 150);
      return {
        height: height + 'px'
      };
    }
  },

  methods: {
    reloadIframe: function reloadIframe() {
      var iframe = this.$refs.iframe;

      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.location.reload();
      }
    },
    onSrcChanged: function onSrcChanged() {
      var iframe = this.$refs.iframe;

      if (iframe && iframe.contentWindow) {
        if (this.src.indexOf('://') !== -1) {
          this.iframeHostName = this.src.split('://')[1].split('/')[0];
        } else {
          this.iframeHostName = iframe.contentWindow.location.host || location.host;
        }
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3dc5040c","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/Simulator.vue
var Simulator_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['van-doc-simulator', { 'van-doc-simulator-fixed': _vm.isFixed }]},[_c('div',{staticClass:"van-doc-simulator__nav"},[_c('div',{staticClass:"van-doc-simulator__url"},[_vm._v(_vm._s(_vm.iframeHostName))]),_vm._v(" "),_c('div',{staticClass:"van-doc-simulator__reload",on:{"click":_vm.reloadIframe}})]),_vm._v(" "),_c('iframe',{ref:"iframe",style:(_vm.simulatorStyle),attrs:{"src":_vm.srcWithTimestamp,"frameborder":"0"}})])}
var Simulator_staticRenderFns = []
var Simulator_esExports = { render: Simulator_render, staticRenderFns: Simulator_staticRenderFns }
/* harmony default export */ var component_Simulator = (Simulator_esExports);
// CONCATENATED MODULE: ./src/component/Simulator.vue
function Simulator_injectStyle (ssrContext) {
  __webpack_require__(22)
}
var Simulator_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var Simulator___vue_template_functional__ = false
/* styles */
var Simulator___vue_styles__ = Simulator_injectStyle
/* scopeId */
var Simulator___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Simulator___vue_module_identifier__ = null
var Simulator_Component = Simulator_normalizeComponent(
  Simulator,
  component_Simulator,
  Simulator___vue_template_functional__,
  Simulator___vue_styles__,
  Simulator___vue_scopeId__,
  Simulator___vue_module_identifier__
)

/* harmony default export */ var src_component_Simulator = (Simulator_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/DemoBlock.vue
//
//
//
//
//
//
//

/* harmony default export */ var DemoBlock = ({
  name: 'van-doc-demo-block',

  props: {
    title: String
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-71af2972","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/DemoBlock.vue
var DemoBlock_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"van-doc-demo-block"},[_c('h2',{staticClass:"van-doc-demo-block__title"},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_vm._t("default")],2)}
var DemoBlock_staticRenderFns = []
var DemoBlock_esExports = { render: DemoBlock_render, staticRenderFns: DemoBlock_staticRenderFns }
/* harmony default export */ var component_DemoBlock = (DemoBlock_esExports);
// CONCATENATED MODULE: ./src/component/DemoBlock.vue
function DemoBlock_injectStyle (ssrContext) {
  __webpack_require__(24)
}
var DemoBlock_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var DemoBlock___vue_template_functional__ = false
/* styles */
var DemoBlock___vue_styles__ = DemoBlock_injectStyle
/* scopeId */
var DemoBlock___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var DemoBlock___vue_module_identifier__ = null
var DemoBlock_Component = DemoBlock_normalizeComponent(
  DemoBlock,
  component_DemoBlock,
  DemoBlock___vue_template_functional__,
  DemoBlock___vue_styles__,
  DemoBlock___vue_scopeId__,
  DemoBlock___vue_module_identifier__
)

/* harmony default export */ var src_component_DemoBlock = (DemoBlock_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/DemoSection.vue
//
//
//
//
//
//



/* harmony default export */ var DemoSection = ({
  name: 'van-doc-demo-section',

  props: {
    name: String,
    title: String,
    background: String
  },

  computed: {
    demoName: function demoName() {
      return this.name || this.getParentName();
    },
    style: function style() {
      return {
        background: this.background
      };
    }
  },

  methods: {
    getParentName: function getParentName() {
      var $parent = this.$parent;

      if ($parent && $parent.$options.name) {
        return $parent.$options.name.replace('demo-', '');
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-21f60eec","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/DemoSection.vue
var DemoSection_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"van-doc-demo-section",class:("demo-" + _vm.demoName),style:(_vm.style)},[_vm._t("default")],2)}
var DemoSection_staticRenderFns = []
var DemoSection_esExports = { render: DemoSection_render, staticRenderFns: DemoSection_staticRenderFns }
/* harmony default export */ var component_DemoSection = (DemoSection_esExports);
// CONCATENATED MODULE: ./src/component/DemoSection.vue
function DemoSection_injectStyle (ssrContext) {
  __webpack_require__(26)
}
var DemoSection_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var DemoSection___vue_template_functional__ = false
/* styles */
var DemoSection___vue_styles__ = DemoSection_injectStyle
/* scopeId */
var DemoSection___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var DemoSection___vue_module_identifier__ = null
var DemoSection_Component = DemoSection_normalizeComponent(
  DemoSection,
  component_DemoSection,
  DemoSection___vue_template_functional__,
  DemoSection___vue_styles__,
  DemoSection___vue_scopeId__,
  DemoSection___vue_module_identifier__
)

/* harmony default export */ var src_component_DemoSection = (DemoSection_Component.exports);

// CONCATENATED MODULE: ./src/index.js
/* harmony export (immutable) */ __webpack_exports__["default"] = install;
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Nav", function() { return src_component_Nav; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Header", function() { return src_component_Header; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Footer", function() { return src_component_Footer; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "VanDoc", function() { return src_VanDoc; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Block", function() { return src_component_Block; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Content", function() { return src_component_Content; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Container", function() { return src_component_Container; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "FooterNav", function() { return src_component_FooterNav; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Simulator", function() { return src_component_Simulator; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DemoBlock", function() { return src_component_DemoBlock; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DemoSection", function() { return src_component_DemoSection; });













var components = [src_component_Nav, src_component_Header, src_component_Footer, src_VanDoc, src_component_Block, src_component_Content, src_component_Container, src_component_FooterNav, src_component_Simulator, src_component_DemoBlock, src_component_DemoSection];

function install() {
  components.map(function (Component) {
    external__vue__default.a.component(Component.name, Component);
  });
}



/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("563aaa0a", content, true);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "body{color:#333;font-size:16px;min-width:1100px;overflow-x:auto;background-color:#fff;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Helvetica Neue,Arial,sans-serif}body,p{margin:0}h1,h2,h3,h4,h5,h6{margin:0;font-size:inherit}ol,ul{margin:0;padding:0;list-style:none}a{text-decoration:none}.van-doc-row{width:100%}@media (min-width:1440px){.van-doc-row{width:1440px;margin:0 auto}}code{display:block;font-size:13px;overflow-x:auto;font-weight:400;line-height:22px;border-radius:3px;margin-bottom:25px;position:relative;word-break:break-all;white-space:pre-wrap;background-color:#f5f7fa;color:#455a64;padding:18px 10px 18px 20px;font-family:Source Code Pro,Monaco,Inconsolata,monospace}code:after{top:5px;right:10px;position:absolute;color:#ccc;font-size:12px}pre{margin:0}pre+pre{margin-top:-10px}code.language-html:after{content:\"HTML\"}code.language-javascript:after{content:\"JS\"}code.language-css:after{content:\"CSS\"}.hljs{display:block;overflow-x:auto;padding:.5em;background:#fff}.hljs-subst{color:#455a64}.hljs-addition,.hljs-meta,.hljs-string,.hljs-symbol,.hljs-template-tag,.hljs-template-variable{color:#756bb1}.hljs-comment,.hljs-quote{color:#999}.hljs-bullet,.hljs-link,.hljs-literal,.hljs-number,.hljs-regexp{color:#32a973}.hljs-deletion,.hljs-variable{color:#88f}.hljs-built_in,.hljs-doctag,.hljs-keyword,.hljs-name,.hljs-section,.hljs-selector-class,.hljs-selector-id,.hljs-selector-tag,.hljs-strong,.hljs-tag,.hljs-title,.hljs-type{color:#1976d2}.hljs-emphasis{font-style:italic}.hljs-attribute{color:#e6550d}", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles(parentId, list) {
  var styles = [];
  var newStyles = {};
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    };
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] });
    } else {
      newStyles[id].parts.push(part);
    }
  }
  return styles;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7648ded8", content, true);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".van-doc-nav{left:0;top:60px;bottom:0;z-index:1;min-width:250px;max-width:250px;position:fixed;overflow-y:scroll;padding:25px 0 75px}@media (max-width:1300px){.van-doc-nav{min-width:220px;max-width:220px}}@media (min-width:1440px){.van-doc-nav{left:50%;margin-left:-720px}}.van-doc-nav::-webkit-scrollbar{height:6px;width:6px;background-color:transparent}.van-doc-nav::-webkit-scrollbar-thumb{border-radius:6px;background-color:transparent}.van-doc-nav:hover::-webkit-scrollbar-thumb{background-color:rgba(69,90,100,.2)}.van-doc-nav__item a,.van-doc-nav__subitem a{margin:0;display:block;color:#455a64;font-size:16px;padding:10px 20px 10px 40px;line-height:24px;-webkit-transition:all .3s;transition:all .3s}.van-doc-nav__item a.active,.van-doc-nav__subitem a.active{color:#3498db;background-color:#f5f7fa}.van-doc-nav__item>a{font-weight:700}.van-doc-nav__subitem a{font-size:14px}.van-doc-nav__subitem a:hover{color:#3498db;background-color:#f5f7fa}.van-doc-nav__subitem span{opacity:.6;font-size:13px}.van-doc-nav__group-title{font-size:12px;line-height:40px;padding-left:40px;color:rgba(69,90,100,.6)}@media (max-width:1300px){.van-doc-nav{min-width:220px;max-width:220px}.van-doc-nav__item a,.van-doc-nav__subitem a{line-height:22px}.van-doc-nav__subitem a{font-size:13px}}", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("1d521c83", content, true);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".van-doc-block{display:-webkit-box;display:-ms-flexbox;display:flex;margin-bottom:20px}.van-doc-block .highlight{-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-sizing:border-box;box-sizing:border-box}.van-doc-block .highlight pre{word-break:break-all}", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("0a015d54", content, true);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".van-doc-header{width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-bottom:1px solid #eaeefb}.van-doc-header__top{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#fff;padding:0 40px;height:60px;line-height:60px}.van-doc-header__top-nav{-webkit-box-flex:1;-ms-flex:1;flex:1;text-align:right}.van-doc-header__top-nav>li{display:inline-block;position:relative;vertical-align:middle}.van-doc-header__top-nav-lang{padding:0 7px;font-size:14px;line-height:24px;display:block;border-radius:3px;text-align:center;color:#455a64;border:1px solid currentColor;font-family:Helvetica Neue,Arial,sans-serif;-webkit-transition:.3s ease-in-out;transition:.3s ease-in-out}.van-doc-header__top-nav-lang:hover{color:#3498db}.van-doc-header__top-nav-item{margin-left:20px}.van-doc-header__top-nav-title{font-size:15px;letter-spacing:1px;color:#333}.van-doc-header__top-nav-title.active,.van-doc-header__top-nav-title:hover{color:#3498db}.van-doc-header__top-nav-title svg{fill:#455a64;display:block;vertical-align:middle;-webkit-transition:.3s ease-in-out;transition:.3s ease-in-out}.van-doc-header__top-nav-title svg:hover{fill:#3498db}.van-doc-header__top-nav .van-doc-header__arrow:hover{color:#333}.van-doc-header__top-nav .van-doc-header__arrow:after{content:\"\";display:inline-block;vertical-align:middle;margin-top:-1px;margin-left:1px;margin-right:-4px;width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;border-top:5px solid #ccc;pointer-events:none}.van-doc-header__logo{display:block}.van-doc-header__logo img,.van-doc-header__logo span{display:inline-block;vertical-align:middle}.van-doc-header__logo img{width:24px;margin-right:5px}.van-doc-header__logo span{color:#333;font-size:20px;font-family:Dosis,Source Sans Pro,Helvetica Neue,Arial,sans-serif}.van-doc-header__bottom{height:50px;line-height:50px}.van-doc-header__bottom-nav{text-align:center}.van-doc-header__bottom-nav li{display:inline-block}.van-doc-header__bottom-nav a{color:#fff;opacity:.8;display:block;padding:0 20px;font-size:14px}.van-doc-header__bottom-nav a.active{background-color:hsla(0,0%,100%,.1)}.van-doc-header__bottom-nav a.active,.van-doc-header__bottom-nav a:hover{opacity:1}", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("2cd650ad", content, true);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".van-doc-footer{position:relative;background-color:#061a2a}.van-doc-footer ul{text-align:center}.van-doc-footer__item{margin-right:45px;display:inline-block}.van-doc-footer__item a{color:#b3b3b3;display:block;font-size:13px;line-height:72px;-webkit-transition:color .3s ease-in-out;transition:color .3s ease-in-out}.van-doc-footer__item a:hover{color:#fff}.github-corner{position:absolute;top:-50px;right:61px;height:50px;width:40px;overflow:hidden}.github-corner svg{fill:transparent;color:#fff;position:absolute;border:0;right:-29px;opacity:.9;-webkit-transition:.3s;transition:.3s;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.github-corner svg:hover{opacity:1;-webkit-transform:rotate(-45deg) scale(1.15)!important;transform:rotate(-45deg) scale(1.15)!important}.github-corner .octo-arm{-webkit-animation:octocat-wave 3s ease-in-out infinite;animation:octocat-wave 3s ease-in-out infinite}@-webkit-keyframes octocat-wave{0%,to{-webkit-transform:rotate(0);transform:rotate(0)}20%,60%{-webkit-transform:rotate(-25deg);transform:rotate(-25deg)}40%,80%{-webkit-transform:rotate(10deg);transform:rotate(10deg)}}@keyframes octocat-wave{0%,to{-webkit-transform:rotate(0);transform:rotate(0)}20%,60%{-webkit-transform:rotate(-25deg);transform:rotate(-25deg)}40%,80%{-webkit-transform:rotate(10deg);transform:rotate(10deg)}}", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("ed7998cc", content, true);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".van-doc-content{-webkit-box-flex:1;-ms-flex:1;flex:1;position:relative;padding:0 0 75px}.van-doc-content a{color:#3498db}.van-doc-content section{padding:10px 40px;overflow:hidden}.van-doc-content section>h1,.van-doc-content section>h2,.van-doc-content section>h3,.van-doc-content section>h4,.van-doc-content section>h5,.van-doc-content section>h6{line-height:1.5;font-weight:400;margin:20px 0 10px;color:rgba(51,51,51,.9)}.van-doc-content section>h1{font-size:36px}.van-doc-content section>h2{font-size:30px;margin-bottom:25px}.van-doc-content section>h3{font-size:20px;margin-top:45px}.van-doc-content section>h2+h3{margin-top:25px}.van-doc-content section>h4{font-size:16px;margin-bottom:15px}.van-doc-content section>h5{font-size:14px}.van-doc-content section>h6{font-size:14px;color:#666}.van-doc-content section>p{margin:15px 0;font-size:14px;line-height:20px;color:#666}.van-doc-content section>ol,.van-doc-content section>ul{padding:15px 0;background-color:#f5f7fa}.van-doc-content section>ol li,.van-doc-content section>ul li{color:#666;font-size:14px;line-height:20px;margin:5px 0 5px 20px;padding-left:15px;position:relative}.van-doc-content section>ol li:before,.van-doc-content section>ul li:before{content:\"\";position:absolute;top:0;left:0;width:6px;height:6px;margin-top:8px;border-radius:50%;-webkit-box-sizing:border-box;box-sizing:border-box;border:1px solid #666}.van-doc-content section>ol li li,.van-doc-content section>ul li li{margin-left:0}.van-doc-content section>hr{border:0 none;border-top:1px solid #eee}.van-doc-content section li>code,.van-doc-content section p>code,.van-doc-content section table code{margin:2px;padding:2px 7px;display:inline}.van-doc-content table{width:100%;font-size:13px;line-height:1.5;margin-bottom:45px;background-color:#fff;border-collapse:collapse;color:#333}.van-doc-content table th{padding:8px 10px;text-align:left;font-weight:400;background-color:#f5f7fa;border:1px solid #eaeefb}.van-doc-content table th:first-child{padding-left:10px}.van-doc-content table td{padding:8px;border:1px solid #eaeefb}.van-doc-content table code{font-size:13px;padding:0 8px;font-family:inherit;word-break:keep-all}.van-doc-content--changelog section{padding-bottom:30px}.van-doc-content--changelog section>h3+p,.van-doc-content--changelog section>h3+p code{margin:0}.van-doc-content--changelog section>h3 a{color:inherit;font-size:24px;-webkit-font-smoothing:auto}.van-doc-content--changelog section>h3:not(:first-of-type){margin-top:50px}", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(19);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("93595468", content, true);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".van-doc-container{overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#fff;padding-left:250px}.van-doc-container--with-simulator{padding-right:400px}@media (max-width:1300px){.van-doc-container--with-simulator{padding-right:360px}}", ""]);

// exports


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("63ea25d2", content, true);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".van-doc-footer-nav{left:0;right:0;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;padding:24px 45px;position:absolute}.van-doc-footer-nav__link{-webkit-box-flex:1;-ms-flex:1;flex:1;font-size:14px;line-height:1.5;cursor:pointer;opacity:.7;color:#455a64;-webkit-transition:.3s;transition:.3s}.van-doc-footer-nav__link:hover{opacity:1;color:#3498db}.van-doc-footer-nav__link .van-icon{font-size:12px;line-height:16px}.van-doc-footer-nav__link span{vertical-align:middle}.van-doc-footer-nav__left,.van-doc-footer-nav__right{padding:0 15px;position:relative}.van-doc-footer-nav__right{text-align:right}.van-doc-footer-nav__arrow-left,.van-doc-footer-nav__arrow-right{top:50%;width:8px;height:8px;margin-top:-4px;position:absolute;border:solid currentColor;border-width:0 1px 1px 0}.van-doc-footer-nav__arrow-left{left:0;-webkit-transform:rotate(135deg);transform:rotate(135deg)}.van-doc-footer-nav__arrow-right{right:0;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}", ""]);

// exports


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(23);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("e9cd3ed6", content, true);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".van-doc-simulator{z-index:1;overflow:hidden;position:absolute;border-radius:6px;background:#f2f2f4;-webkit-box-sizing:border-box;box-sizing:border-box;right:40px;width:360px;min-width:360px;top:100px;-webkit-box-shadow:rgba(0,0,0,.2) 0 1px 6px,rgba(0,0,0,.2) 0 1px 4px;box-shadow:0 1px 6px rgba(0,0,0,.2),0 1px 4px rgba(0,0,0,.2)}@media (max-width:1300px){.van-doc-simulator{width:320px;min-width:320px}}@media (max-width:1100px){.van-doc-simulator{left:750px;right:auto}}@media (min-width:1440px){.van-doc-simulator{right:50%;margin-right:-680px}}.van-doc-simulator-fixed{position:fixed;top:40px}.van-doc-simulator iframe{width:100%;display:block}.van-doc-simulator__nav{height:60px;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAB/CAMAAACHZrc3AAAA1VBMVEX39/fl5ecAAACXl5gFBQXo6OkaGhqpqan19fURERF6enodHR2dnZ0gICDY2NhdXV1WVlZLTEwvLy+5uboNDQ1lZWXx8fFtbW0VFRWJiYmurq4HBwfv7+++vr5oaGgLCws3NzdISEjBwcF9fX2CgoLZ2dmysrKwsLCioqJiYmIrKyvV1dXr6+xDQ0PHyMhPT0/c3Ny2trbOzs4yMjLf399ycnI+Pj7S0tLKysolJSWTk5OQkJDj4+Oampo6OjqsrKyHh4d1dXWMjIxSUlK0tLTExMR/f382UPnLAAALxklEQVR42uzbiVLyZhiG4YeHBBIxBAIkQNhBZUfZccOt//kfUrOBhECrtmVom2scMCrM4Nzz8RFeEAqFQqFQKBQKhUKhUCgUCoVCoVAoFAqdJ1XF14nFCCyRThQHRWZx/NvE600Jof+JWAy7lhdBSwBS8uPemAgsACg98wEH9ZjDGXqrHPAAh65whP+mpKHRohlJhA7nfsmgSwAzWqqDX0tAGpHPtjIscdkT/5Pc9evZIJFlNjGYXes4qTkPGMDxQjbwHZFGcVzCp/5vxaWOM2RQMTIWQ6GBQ55Yv5Pgku7qfEKQWC5PcZC+KOGA9oRfM2nj9IK5t5J+LSf3svHWpgrLY5qxmiXBG1gyA0/mD3O/MmR+ko0rnFAz5ZHZTW203HhlCvVdI2xNlXw+X4BP45mW6oUI13hOS751dvshUZML8BRkTTxQu9m5AwrphJBIF4C7jhnovdylpT6GZZLfugGklknhVYdNGuXb29prY3zNuHbC3pdRjyxHPUM39yj8oryEQ3Ryv8kz1QfQV7rSlzczoiHQTzBEnF6NF/BLcU8VW2lamtgVp0frw9YW6BqdW++aPMTWUNYQwA5wr9Gl3QMdwu+NXKmpBJ27WgkeMm5XsXrr8gW2F46w0V3cxPgVsZtFFyfTYsDFJvd4+lNxL/eIbD70rwCoLMLvLp0eUElbDPiVFVpqrcxUgjTNtGq0KGWcWjD3Jpl+taik8eq42N3Xdbe5T0XnMkum4sOLGJmDJZkl09fL+zxZwFkxnETFOTkXnd4N7KvfoclPTdzV4TM22ZSAUocrHVuRrHkLrLjAI/Ow/CYkItggYvyaGIg/dpWznnhyVz898ufeKjpk2b1++cw9qlhkyvbVk5e7Xio9Ui2V9MxvmK/6eo654FZwo7v3C4HkaIlPyxFJ4RKnVuNs/5XKQIelQYrwe5SpXW5ybwnm2n2Ic+92CiwqmYKlV2W2jzOSZAGWuRaPa3NYCkxizx3u6chkaLvHHXxSfIdNmvABW6+sALoQg918BBAVoYwtgl/1Z7nfZGnL3nz3KN/s6b1m/saXe8a/d2985u6Iet94udfpmgAYVtMDViQEjWkAUDT4FAXKRfgVZQpFnFqNfO/tFG1SieBI7ikKw/Ymd4UcAYiORmVY9CpNWLpkD7YK+YQzYiiwMQ7ECZtiYI8EzcsdtGmQ4NNlEY4HzrHxWLUXd8nMSkCMfSDFX/gnck9m6comv3eUL8NWzid/nntBVedcqWoTwHREswXXVWHrFmg4dSQ0+LU1Owp93enKlLudtQ6gp7VxcjWSghHBRis7xpHcr8kZtrlXyCg+3ZITWEwK0maXW8cZ0QwvPkAkbIaGfQX6cmcBfibHcNxQ6MNjsALLMz/wG7t2HnPpx7lX07c4psON3PeOmnA1cz/N3aFSBaDH0wLfr24/NlVs3QFFvh3KHZL19aRwQ3myf4DTq3FUI7OtEjxLHMm9pFDpf+aO8hhb0kfNe2pSyCsvAnZxRphxr7YXyBD70nu5p+G34nqzurMH19Q0nULLgpA2WcS4Kk/x49zJOY5JcCPxvaMeXL3EF3N/GY1GE06sy5fP3CMmqzd2BnLuN4hdfmzOy14zXbaJ9q3bAGITBETq3FWP4OS8l6pthYw9SfAJ5H5BxuHl7lfv5sm5W/+IzDkRyKSMM8IMLPQAGm1aIChf7gn4pZiGTZ+QDf/iDpQHsfkHSl2u8Vdyr+IYgRvC9450uHThi7nnFEXJM29d5j5zb+WpCE8ornWgN2Hq1gLbmm14CrwGkK8hoEBSvmiUUGpc5EkWcHJe7ihdmGR37BxXPSZZ9ThNLATWcTh3hZZKBu5JCTJ1t3yKySYFnJH93EWNpCYeCCpjwSYWv7HAmQ6IKTm/qeXWNKfYUaGBv5Q7/7nVPZn40pmZ7WZGj2awzV2M/aJaYAuA/pClIwtbjhFEZ7Cp7AGQnxGUo/oIVz/HlITT83IHFnOuSrB0GbSCpU5hcST3h5axIjmD7Rcd1UaVCZyRvdyd3jXxQFA7fxh8BG8C84PnbLWRoNdQzp93nJqOm/SkM/37V/cONzpfP/Lt3Tu7uQcEcsezUtrmnpKnVJF6lqYvMcoXhULhlV1YpFgNSHEByyoPS3aOIGmNT2sdpxPMHVK0AVv52lMg49euMoAP0sA296Cl7HWC6xVpzjMi+Ywzohl7uUNUxeDe3S+NfY2aSXlUlgSWYLsSfIv7rVxd4JKCxvz0p3v3U52ZmfnfVX09kPtvbG1yv+QvkSr60QlpzkRYUizCUuYvYCGoACIcwWIOcNhSjQkxdYkTCuYeFNy7p8iRapmTq9EMgFRsYNcracDVX5ac26dwRgzFl/thBfoVEKRfSUCPMhwd3+IuPfMSpbzQQ4uVn+VevzrNefe3WMO/dx/GXrzcS3FbhZV4vN6K953cH7OrkvuuamwejTQiANp0qza4AKAKV0Cczn0wjYPWAm3CGt9z+tzfuaMGQCXfAOTeUzpsL27eveWy73XAe5yRJAuB3IM07tICqZckOJocwdbzL+4XTAFLPgM9at/P/ZTvqh4fEYtOuevKyV2PNbyZGR24rXanKAjua4KSbOewrLAC1DkGUOI7Duo/0/bcx/ecPveZ5oqReU0FoNB5UCPy0gmhRqenmbcDGFYZK+GcuEMEW0MDB9xz1z32GN4p9VKMGdhU3+Ke4aoPlPkO9Kn8KPfTC+au3+0qObljCSd317W5SrF76/3LXuKdGFk1p2PWYYlQxWHihORExDecOPdgD03Y3kz5w93Lm531ojAhqz333AXVj8W9TL7gvARHxIL2Zmb2DckXCejPqcG2EKpTbD3GhCHgDs7csP79mZkzyf2PJiJdkXdyIG4mS8h8Kpos81XlByxLznDEY5fdR3zLeeQOsQRbhRtr/5xQ59xG3oMDwEH+icigFhnLveepLGBL0cCWVGdhM1lzqfDmvCcij+deiftV9nLXM6rJ7houaTV6G8N23+YEthnbOOZ2cIvvOZPcPdKlQlt9CFexS4v8hvOz8/GOCxyznXc/KGqnKwweYVuy+oitAusSbJEBKbyc+bz78dwDfLk/pLNk91JCQE/OLjC8f1JN5dxmv7+f+3H6eP2UmWJLGsfbZ/rhuL/hw3ulYbtcwp9IlsV/76eZ/nh1VzlpjXHIA+NAhjTrGZyrP8499N934Q8g2e7Br7dZvPT1EHi8wjFDANLt4qzmvvdctso46LbZPK8zK6FQKBQKhUKhUCgUCoVCoVAoFAqFQqFQ6Hf262glgSiKwvDslaOTYDqoQ6DehVCMIoR0YRe9/1NFTUHiEY537T3/d3Ue4OewNgAAAAAAAAAA+Deqpi0NcKZsm6q42doAp9bFbSo+djhWVtSO/ripd2qHcyW7HT2Svd8rA9zLnTONAe41RZ7WAPdaDlX0R1nkMSAAckePkDt6hNwRysvWriJ3BCPN3uwKckcwkhZP75ZE7ghGX64sGnJHHKPjbrJSJ7loyB1R3NX6a/FhF8gdMeyXA515ndsFckcI81rScHbaHPTt8WQJ5I4I9rWk6fb3VB08P1gKuSOCpXQ/7p7djkkjdwRwN5DG1ul2TBq5I4BamtqPbsekkTv8G0nDrWUgd/h3lGaWg9zh3046WQ5yh38TaWM5yB3+raSD5SB3+Efu6JH0mNlIEztH7p/t3bFuwjAUQFH7QSCtVEEGWEpXJqi6MPH//1WpSKkSZaBSF9vnfMOVFSd+MeVb3qreI655Su6Ub/lF5D7ilqfkTvkWPzOdNxHbPCV3KvA4RDC1ixjyjNypwOOI2MRrxHqVZ+RODcYDwGPtLxGHPCd3ajCOdzycdxExfOY5uVOF3+G9r4/7fhMRg1lVqjUbzV4fltZ2uVOL1RCjYZWXyJ16/PxW6f3tetvmZXKnKXKnIXKnIXKnIXKnIS6apB2da4Rpx8Ul8bTjmJ7TZyhen550ylC4U0rJZpU2dOl5vd4pWtcnvdOIsXbP71TvlP6sP14s8RSnuxz7BAAAAAAAAAAAAAAAAAAA/+0bz6+zA30YH5cAAAAASUVORK5CYII=\") no-repeat;background-size:100%}.van-doc-simulator__url{left:40px;top:23px;right:40px;font-size:14px;position:absolute;text-align:center;font-weight:700;line-height:28px;font-family:PingFang SC,Helvetica Neue,Helvetica,Arial,sans-serif}@media (max-width:1300px){.van-doc-simulator__url{top:21px;line-height:24px}}.van-doc-simulator__reload{top:25px;right:10px;width:28px;height:28px;cursor:pointer;position:absolute}", ""]);

// exports


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6af19e16", content, true);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".van-doc-demo-block__title{margin:0;font-weight:400;font-size:14px;color:rgba(69,90,100,.6);padding:40px 15px 15px}.van-doc-demo-block:first-of-type .van-doc-demo-block__title{padding-top:20px}", ""]);

// exports


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("18f512ff", content, true);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".van-doc-demo-section{height:100vh;padding-bottom:20px;-webkit-box-sizing:border-box;box-sizing:border-box}.van-doc-demo-section__title{margin:0;padding:15px;font-size:16px;line-height:1.5;font-weight:400;text-transform:capitalize}.van-doc-demo-section__title+.van-doc-demo-block .van-doc-demo-block__title{padding-top:0}", ""]);

// exports


/***/ })
/******/ ]);

/***/ }),

/***/ "../vue-loader/lib/component-normalizer.js":
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "../vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3a4eee14\",\"hasScoped\":true,\"transformToRequire\":{\"video\":[\"src\",\"poster\"],\"source\":\"src\",\"img\":\"src\",\"image\":\"xlink:href\"},\"buble\":{\"transforms\":{}}}!../vue-loader/lib/selector.js?type=template&index=0!./src/App.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('header',{staticClass:"doc-header"},[_c('doc-header',{staticClass:"doc-header-container",attrs:{"config":_vm.config.header,"active":"移动端"}})],1),_vm._v(" "),_c('section',{staticClass:"doc-body"},[_c('div',{staticClass:"doc-menus"},[_c('side-menu',{attrs:{"menus":_vm.config.routes || []}})],1),_vm._v(" "),_c('router-view',{staticClass:"doc-content"})],1),_vm._v(" "),_c('doc-footer',{attrs:{"config":_vm.config.footer}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "../vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6efd87ef\",\"hasScoped\":false,\"transformToRequire\":{\"video\":[\"src\",\"poster\"],\"source\":\"src\",\"img\":\"src\",\"image\":\"xlink:href\"},\"buble\":{\"transforms\":{}}}!../vue-loader/lib/selector.js?type=template&index=0!./src/components/Documentation.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('doc-container',[_c('doc-content',[_c(_vm.component,{tag:"component"})],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "../vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-7a5a90c9\",\"hasScoped\":true,\"transformToRequire\":{\"video\":[\"src\",\"poster\"],\"source\":\"src\",\"img\":\"src\",\"image\":\"xlink:href\"},\"buble\":{\"transforms\":{}}}!../vue-loader/lib/selector.js?type=template&index=0!../../website/plugins/components/WxappPage.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"demo",class:_vm.activeCodeType},[(_vm.types.length)?_c('h3',[_vm._v("示例代码")]):_vm._e(),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('div',{staticClass:"demo-code"},[_vm._t("default")],2)])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"demo-view-qrcode"},[_c('img',{attrs:{"src":"https://img.yzcdn.cn/public_files/2017/10/30/554dd940eb1a269d4ac9133e78ae321f.jpg?imageView2/2/w/300/h/300"}}),_vm._v(" "),_c('div',[_vm._v("微信扫一扫")])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "../vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-7eced3a1\",\"hasScoped\":true,\"transformToRequire\":{\"video\":[\"src\",\"poster\"],\"source\":\"src\",\"img\":\"src\",\"image\":\"xlink:href\"},\"buble\":{\"transforms\":{}}}!../vue-loader/lib/selector.js?type=template&index=0!./src/components/MenuItem.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"menu-item",class:{active: _vm.menu.name === _vm.$route.name}},[(!_vm.menu.children)?_c('router-link',{attrs:{"to":{path: _vm.menu.path}}},[_vm._v(_vm._s(_vm.menu.__label || _vm.menu.name))]):_vm._e(),_vm._v(" "),(_vm.menu.children)?_c('a',{staticClass:"no-href"},[_vm._v(_vm._s(_vm.menu.__label || _vm.menu.name))]):_vm._e(),_vm._v(" "),_vm._l((_vm.menu.children),function(menu){return _c('menu-item',{key:menu.path,attrs:{"menu":menu}})})],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "../vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-aacbfdc6\",\"hasScoped\":true,\"transformToRequire\":{\"video\":[\"src\",\"poster\"],\"source\":\"src\",\"img\":\"src\",\"image\":\"xlink:href\"},\"buble\":{\"transforms\":{}}}!../vue-loader/lib/selector.js?type=template&index=0!./src/components/SideMenu.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.menus.length)?_c('aside',{staticClass:"side-menus"},_vm._l((_vm.menus),function(menu){return _c('menu-item',{key:menu.path,attrs:{"menu":menu}})})):_vm._e()}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "../vue-router/dist/vue-router.esm.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
  * vue-router v3.0.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if ("development" !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (true) {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

function extend (to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    "development" !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (true) {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (true) {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(
    path,
    parent,
    pathToRegexpOptions.strict
  );

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (true) {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if ("development" !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (true) {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent, strict) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (true) {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (true) {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (true) {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (true) {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (true) {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  window.history.replaceState({ key: getStateKey() }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (true) {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition((shouldScroll), position);
      }).catch(function (err) {
        if (true) {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          "development" !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (true) {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  "development" !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.0.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = (VueRouter);


/***/ }),

/***/ "../vue-style-loader/index.js!../css-loader/index.js?{\"sourceMap\":true}!../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3a4eee14\",\"scoped\":true,\"hasInlineConfig\":false}!../vue-loader/lib/selector.js?type=styles&index=0!./src/App.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../css-loader/index.js?{\"sourceMap\":true}!../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3a4eee14\",\"scoped\":true,\"hasInlineConfig\":false}!../vue-loader/lib/selector.js?type=styles&index=0!./src/App.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("../vue-style-loader/lib/addStylesClient.js")("c8b8a534", content, true, {});

/***/ }),

/***/ "../vue-style-loader/index.js!../css-loader/index.js?{\"sourceMap\":true}!../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7eced3a1\",\"scoped\":true,\"hasInlineConfig\":false}!../vue-loader/lib/selector.js?type=styles&index=0!./src/components/MenuItem.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../css-loader/index.js?{\"sourceMap\":true}!../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7eced3a1\",\"scoped\":true,\"hasInlineConfig\":false}!../vue-loader/lib/selector.js?type=styles&index=0!./src/components/MenuItem.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("../vue-style-loader/lib/addStylesClient.js")("3772b19b", content, true, {});

/***/ }),

/***/ "../vue-style-loader/index.js!../css-loader/index.js?{\"sourceMap\":true}!../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-aacbfdc6\",\"scoped\":true,\"hasInlineConfig\":false}!../vue-loader/lib/selector.js?type=styles&index=0!./src/components/SideMenu.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../css-loader/index.js?{\"sourceMap\":true}!../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-aacbfdc6\",\"scoped\":true,\"hasInlineConfig\":false}!../vue-loader/lib/selector.js?type=styles&index=0!./src/components/SideMenu.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("../vue-style-loader/lib/addStylesClient.js")("66d2a53a", content, true, {});

/***/ }),

/***/ "../vue-style-loader/lib/addStylesClient.js":
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__("../vue-style-loader/lib/listToStyles.js")

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "../vue-style-loader/lib/listToStyles.js":
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ "../vue/dist/vue.esm.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.5.13
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */


// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned
}

function cloneVNodes (vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("development" !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ("development" !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if ("development" !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if ("development" !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias,
  eventKeyName
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    vnode.fnContext = contextVm;
    vnode.fnOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "development" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ("development" !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        // _rendered is a flag added by renderSlot, but may not be present
        // if the slot is passed from manually written render functions
        if (slot._rendered || (slot[0] && slot[0].elm)) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (true) {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ("development" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.5.13';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (true) {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (true) {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (true) {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (true) {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (true) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (
        isIE && !isIE9 &&
        el.tagName === 'TEXTAREA' &&
        key === 'placeholder' && !el.__ieph
      ) {
        var blocker = function (e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
  el.plain = false;
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  el.plain = false;
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    "development" !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = { value: value };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (true) {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (true) {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + value + "=$$a.concat([$$v]))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  if (true) {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    if (value$1) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally'
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (true) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if ("development" !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if ("development" !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (true) {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function closeElement (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        if (true) {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (true) {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      closeElement(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (true) {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var res;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("development" !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else if (true) {
      warn$2(
        ("Invalid v-for expression: " + exp)
      );
    }
  }
}

function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '');
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (true) {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if ("development" !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if ("development" !== 'production' && el.attrsMap['v-for']) {
        warn$2(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          true
        );
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (true) {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      "development" !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (map['v-model'] && (map['v-bind:type'] || map[':type'])) {
      var typeBinding = getBindingAttr(el, 'type');
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$2 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$2
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    /* istanbul ignore if */
    return ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    /* istanbul ignore if */
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var code = keyCodes[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(code)) + "," +
    "$event.key)"
  )
}

/*  */

function on (el, dir) {
  if ("development" !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if ("development" !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    /* istanbul ignore if */
    {
      res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
    }
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (
  ident,
  type,
  text,
  errors
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
    }
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (true) {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (true) {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (true) {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      if (true) {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (true) {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

/* harmony default export */ __webpack_exports__["default"] = (Vue$3);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../webpack/buildin/global.js")))

/***/ }),

/***/ "../webpack/buildin/global.js":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/App.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__("../babel-loader/lib/index.js!../vue-loader/lib/selector.js?type=script&index=0!./src/App.vue");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_3a4eee14_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__("../vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3a4eee14\",\"hasScoped\":true,\"transformToRequire\":{\"video\":[\"src\",\"poster\"],\"source\":\"src\",\"img\":\"src\",\"image\":\"xlink:href\"},\"buble\":{\"transforms\":{}}}!../vue-loader/lib/selector.js?type=template&index=0!./src/App.vue");
function injectStyle (ssrContext) {
  __webpack_require__("../vue-style-loader/index.js!../css-loader/index.js?{\"sourceMap\":true}!../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3a4eee14\",\"scoped\":true,\"hasInlineConfig\":false}!../vue-loader/lib/selector.js?type=styles&index=0!./src/App.vue")
}
var normalizeComponent = __webpack_require__("../vue-loader/lib/component-normalizer.js")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3a4eee14"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_3a4eee14_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "./src/assets/base.css":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../css-loader/index.js??ref--7-1!../postcss-loader/lib/index.js??ref--7-2!./src/assets/base.css");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("../vue-style-loader/lib/addStylesClient.js")("d1265e26", content, true, {});

/***/ }),

/***/ "./src/boot/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__("../babel-runtime/core-js/promise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__("../babel-runtime/core-js/object/keys.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__ = __webpack_require__("../babel-runtime/helpers/toConsumableArray.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue__ = __webpack_require__("../vue/dist/vue.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_router__ = __webpack_require__("../vue-router/dist/vue-router.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__doc_config__ = __webpack_require__("./src/doc.config.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__doc_config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__doc_config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_Documentation__ = __webpack_require__("./src/components/Documentation.vue");








__WEBPACK_IMPORTED_MODULE_3_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_4_vue_router__["a" /* default */]);
if (__WEBPACK_IMPORTED_MODULE_5__doc_config___default.a.plugins && Array.isArray(__WEBPACK_IMPORTED_MODULE_5__doc_config___default.a.plugins)) {
  __WEBPACK_IMPORTED_MODULE_5__doc_config___default.a.plugins.forEach(function (plugin) {
    return __WEBPACK_IMPORTED_MODULE_3_vue__["default"].use(plugin.default || plugin);
  });
}

function flatten(arr) {
  while (arr.some(function (item) {
    return Array.isArray(item);
  })) {
    var _ref;

    arr = (_ref = []).concat.apply(_ref, __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(arr));
  }
  return arr;
}

function join() {
  for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
    rest[_key] = arguments[_key];
  }

  return ('/' + rest.join('/')).replace('//', '/');
}

function genRouter(docConf) {
  var routes = [];
  var base = docConf.base || '/';

  if (docConf.category && Array.isArray(docConf.category)) {
    docConf.category.forEach(function (category) {
      var route = {};
      route.path = join(base, category.base);
      route.name = category.label;
      route.component = __WEBPACK_IMPORTED_MODULE_6__components_Documentation__["a" /* default */];
      route.children = genRouter(category).map(function (route) {
        route.path = join(base, route.path);
        return route;
      });
      routes.push(route);
    });
  }
  var keys = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(docConf.include);
  keys.forEach(function (key) {
    var route = {};
    var isPromise = !!docConf.include[key].then;
    route.path = join(base, key);
    route.name = key;
    Object.defineProperty(route, '__label', { value: isPromise ? key : docConf.include[key].label });
    route.component = __WEBPACK_IMPORTED_MODULE_6__components_Documentation__["a" /* default */];
    routes.push(route);
    __WEBPACK_IMPORTED_MODULE_3_vue__["default"].component('x-' + key, function () {
      return isPromise ? docConf.include[key] : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(docConf.include[key]);
    });
  });
  return routes;
}

var routes = [];

if (__WEBPACK_IMPORTED_MODULE_5__doc_config___default.a.lang) {
  routes = flatten(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(__WEBPACK_IMPORTED_MODULE_5__doc_config___default.a.lang).map(function (key) {
    __WEBPACK_IMPORTED_MODULE_5__doc_config___default.a.lang[key].docs.base = join(key, __WEBPACK_IMPORTED_MODULE_5__doc_config___default.a.lang[key].docs.base);
    var routes = genRouter(__WEBPACK_IMPORTED_MODULE_5__doc_config___default.a.lang[key].docs);

    if (__WEBPACK_IMPORTED_MODULE_5__doc_config___default.a.lang[key].docs.default) {
      routes.push({ path: '/', redirect: { name: __WEBPACK_IMPORTED_MODULE_5__doc_config___default.a.lang[key].docs.default } });
    }
    __WEBPACK_IMPORTED_MODULE_5__doc_config___default.a.lang[key].routes = routes;
    return routes;
  }));
} else {
  routes = genRouter(__WEBPACK_IMPORTED_MODULE_5__doc_config___default.a.docs);
  if (__WEBPACK_IMPORTED_MODULE_5__doc_config___default.a.docs.default) {
    routes.push({ path: '/', redirect: { name: __WEBPACK_IMPORTED_MODULE_5__doc_config___default.a.docs.default } });
  }
  __WEBPACK_IMPORTED_MODULE_5__doc_config___default.a.routes = routes;
}

/* harmony default export */ __webpack_exports__["a"] = ({
  config: __WEBPACK_IMPORTED_MODULE_5__doc_config___default.a,
  router: new __WEBPACK_IMPORTED_MODULE_4_vue_router__["a" /* default */]({ routes: routes })
});

/***/ }),

/***/ "./src/components/Documentation.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_Documentation_vue__ = __webpack_require__("../babel-loader/lib/index.js!../vue-loader/lib/selector.js?type=script&index=0!./src/components/Documentation.vue");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_6efd87ef_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_vue_loader_lib_selector_type_template_index_0_Documentation_vue__ = __webpack_require__("../vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6efd87ef\",\"hasScoped\":false,\"transformToRequire\":{\"video\":[\"src\",\"poster\"],\"source\":\"src\",\"img\":\"src\",\"image\":\"xlink:href\"},\"buble\":{\"transforms\":{}}}!../vue-loader/lib/selector.js?type=template&index=0!./src/components/Documentation.vue");
var normalizeComponent = __webpack_require__("../vue-loader/lib/component-normalizer.js")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_Documentation_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_6efd87ef_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_vue_loader_lib_selector_type_template_index_0_Documentation_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "./src/components/MenuItem.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_MenuItem_vue__ = __webpack_require__("../babel-loader/lib/index.js!../vue-loader/lib/selector.js?type=script&index=0!./src/components/MenuItem.vue");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_7eced3a1_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_vue_loader_lib_selector_type_template_index_0_MenuItem_vue__ = __webpack_require__("../vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-7eced3a1\",\"hasScoped\":true,\"transformToRequire\":{\"video\":[\"src\",\"poster\"],\"source\":\"src\",\"img\":\"src\",\"image\":\"xlink:href\"},\"buble\":{\"transforms\":{}}}!../vue-loader/lib/selector.js?type=template&index=0!./src/components/MenuItem.vue");
function injectStyle (ssrContext) {
  __webpack_require__("../vue-style-loader/index.js!../css-loader/index.js?{\"sourceMap\":true}!../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7eced3a1\",\"scoped\":true,\"hasInlineConfig\":false}!../vue-loader/lib/selector.js?type=styles&index=0!./src/components/MenuItem.vue")
}
var normalizeComponent = __webpack_require__("../vue-loader/lib/component-normalizer.js")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7eced3a1"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_MenuItem_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_7eced3a1_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_vue_loader_lib_selector_type_template_index_0_MenuItem_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "./src/components/SideMenu.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_SideMenu_vue__ = __webpack_require__("../babel-loader/lib/index.js!../vue-loader/lib/selector.js?type=script&index=0!./src/components/SideMenu.vue");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_aacbfdc6_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_vue_loader_lib_selector_type_template_index_0_SideMenu_vue__ = __webpack_require__("../vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-aacbfdc6\",\"hasScoped\":true,\"transformToRequire\":{\"video\":[\"src\",\"poster\"],\"source\":\"src\",\"img\":\"src\",\"image\":\"xlink:href\"},\"buble\":{\"transforms\":{}}}!../vue-loader/lib/selector.js?type=template&index=0!./src/components/SideMenu.vue");
function injectStyle (ssrContext) {
  __webpack_require__("../vue-style-loader/index.js!../css-loader/index.js?{\"sourceMap\":true}!../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-aacbfdc6\",\"scoped\":true,\"hasInlineConfig\":false}!../vue-loader/lib/selector.js?type=styles&index=0!./src/components/SideMenu.vue")
}
var normalizeComponent = __webpack_require__("../vue-loader/lib/component-normalizer.js")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-aacbfdc6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_SideMenu_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_aacbfdc6_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_vue_loader_lib_selector_type_template_index_0_SideMenu_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "./src/doc.config.js":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable */
module.exports = {
  header: {
    logo: {
      image: 'https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png',
      title: 'ZanUI 小程序',
      href: 'http://www.youzanyun.com/zanui'
    },
    nav: {
      lang: {
        text: 'En',
        from: 'zh-CN',
        to: 'en-US'
      },
      github: 'https://github.com/youzan/zanui-weapp'
    }
  },
  footer: {
    github: 'https://github.com/youzan/zanui-weapp',
    nav: {
      'React 组件库': 'https://www.youzanyun.com/zanui/zent',
      'Vue 组件库': 'https://www.youzanyun.com/zanui/vant',
      意见反馈: 'https://github.com/youzan/zanui-weapp/issues',
      开发指南: 'https://github.com/youzan/zanui-weapp/blob/dev/.github/CONTRIBUTING.zh-CN.md',
      加入我们: 'https://job.youzan.com'
    }
  },
  plugins: [__webpack_require__("../../website/plugins/wxapp-demo.js")],
  docs: {
    base: 'zanui',
    default: 'icon',
    category: [{
      base: 'base',
      label: '基础',
      include: {
        icon: __webpack_require__("../../packages/icon/README.md"),
        btn: __webpack_require__("../../packages/btn/README.md"),
        helper: __webpack_require__("../../packages/helper/README.md"),
        loading: __webpack_require__("../../packages/loading/README.md")
      }
    }, {
      base: 'layout',
      label: '布局',
      include: {
        row: __webpack_require__("../../packages/row/README.md"),
        cell: __webpack_require__("../../packages/cell/README.md"),
        card: __webpack_require__("../../packages/card/README.md"),
        panel: __webpack_require__("../../packages/panel/README.md")
      }
    }, {
      base: 'form',
      label: '表单',
      include: {
        field: __webpack_require__("../../packages/field/README.md"),
        switch: __webpack_require__("../../packages/switch/README.md"),
        select: __webpack_require__("../../packages/select/README.md"),
        stepper: __webpack_require__("../../packages/stepper/README.md")
      }
    }, {
      base: 'view',
      label: '展示',
      include: {
        tag: __webpack_require__("../../packages/tag/README.md"),
        badge: __webpack_require__("../../packages/badge/README.md"),
        capsule: __webpack_require__("../../packages/capsule/README.md"),
        noticebar: __webpack_require__("../../packages/noticebar/README.md"),
        steps: __webpack_require__("../../packages/steps/README.md")
      }
    }, {
      base: 'interactive',
      label: '交互',
      include: {
        actionsheet: __webpack_require__("../../packages/actionsheet/README.md"),
        datetime_picker: __webpack_require__("../../packages/datetime-picker/README.md"),
        dialog: __webpack_require__("../../packages/dialog/README.md"),
        popup: __webpack_require__("../../packages/popup/README.md"),
        tab: __webpack_require__("../../packages/tab/README.md"),
        toast: __webpack_require__("../../packages/toast/README.md"),
        toptips: __webpack_require__("../../packages/toptips/README.md"),
        loadmore: __webpack_require__("../../packages/loadmore/README.md")
      }
    }],
    include: {}
  }
};

/***/ }),

/***/ "./src/main.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__("../vue/dist/vue.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__("./src/App.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__boot__ = __webpack_require__("./src/boot/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_SideMenu__ = __webpack_require__("./src/components/SideMenu.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vant_doc__ = __webpack_require__("../vant-doc/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vant_doc___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vant_doc__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__styles_main_css__ = __webpack_require__("./src/styles/main.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__styles_main_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__styles_main_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_base_css__ = __webpack_require__("./src/assets/base.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_base_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__assets_base_css__);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.









var Header = __WEBPACK_IMPORTED_MODULE_4_vant_doc__["Header"],
    Footer = __WEBPACK_IMPORTED_MODULE_4_vant_doc__["Footer"],
    Content = __WEBPACK_IMPORTED_MODULE_4_vant_doc__["Content"],
    Container = __WEBPACK_IMPORTED_MODULE_4_vant_doc__["Container"];

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('side-menu', __WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('side-menu') || __WEBPACK_IMPORTED_MODULE_3__components_SideMenu__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('doc-container', __WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('doc-container') || Container);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('doc-content', __WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('doc-content') || Content);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('doc-header', __WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('doc-header') || Header);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('doc-footer', __WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('doc-footer') || Footer);

if (!__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('side-menu') && !__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('doc-container') && !__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('doc-content') && !__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('doc-header') && !__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('doc-footer')) {
  __WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_4_vant_doc__);
}
/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_2__boot__["a" /* default */].router,
  methods: {
    getConfig: function getConfig(lang) {
      if (!lang && !__WEBPACK_IMPORTED_MODULE_2__boot__["a" /* default */].config.lang) {
        return __WEBPACK_IMPORTED_MODULE_2__boot__["a" /* default */].config;
      }
      return __WEBPACK_IMPORTED_MODULE_2__boot__["a" /* default */].config.lang[lang];
    }
  },
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */] },
  template: '<App/>'
});

/***/ }),

/***/ "./src/styles/main.css":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../css-loader/index.js??ref--7-1!../postcss-loader/lib/index.js??ref--7-2!./src/styles/main.css");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("../vue-style-loader/lib/addStylesClient.js")("3e370f6e", content, true, {});

/***/ })

/******/ });