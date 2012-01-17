/*global $, JQuery, SCORM_API, SCOBOT, SCORM_Startup */
// Define JSLint global values above this line

// This will handle the Initalization (load) and Exit (unload) of the SCO
var isExit       = false, 
	lmsconnected = false,
	scorm        = new SCORM_API({debug: true}),
	SB           = new SCOBOT(); // This could be moved to a Player Object/init
	
function initSCO() {
	lmsconnected = scorm.initialize();
	scorm.debug("SCO Loaded from window.onload " + lmsconnected, 4);
	if(lmsconnected) {
		SB.Start(); // Things you'd do like getting mode, suspend data
	}
}
function exitSCO() {
	if(!isExit) {
		isExit = true;
		SB.Suspend(); // let the player know were exiting
		scorm.debug("SCO is done unloading.", 4);
	}
}
/**
* window.top used since there was a exit issue in older mozilla (FF/Safari) browsers.
* This occured in Popup windows and IFRAMEs.  window.top covers itself or a parent(s).
* This will listen when and if the learner closes the browser, and hopefully gives the 
* content time to wrap up its business.
*/
$(window.top).bind('load', initSCO);
$(window.top).bind('unload', exitSCO);