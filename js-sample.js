/*
 * Picker options
 */
var pickerOptions = {
	/*      
	 * Required. Called when the user finishes picking files and passes
	 * an array of file objects to the provided function. Details about the file
	 * object and handling the response below.     
	 */
	success: function(files) {

		// Handle returned file object(s)
		for(var i=0; i<files.length; i++) {
			var count = i+1;
			pickerLog("File #" + count);
			pickerLog("fileName: " + files[i].fileName);
			pickerLog("link: " + files[i].link);
			pickerLog("size: " + files[i].size + " bytes");
			pickerLog("linkType: " + files[i].linkType);
			pickerLog("thumbnail count: " + files[i].thumbnails.length);
			
			for(var j=0; j<files[i].thumbnails.length; j++) {
				pickerLog(files[i].thumbnails[j]);
			}
			
			pickerLog("<br />"); // new line
		}
	
	},
	
	/*
	 * Optional. Called if a user cancels the picker.
	 */
	cancel: function() {

		pickerLog("User cancelled!");
	},
	
	/*      
	 * Optional. The default is the webViewLink which returns a URL to view the file 
	 * hosted on OneDrive. downloadLink can be used to get a URL to the file content 
	 * directly that expires in 1 hour.
	 */
	linkType: "webViewLink", // or "downloadLink"
	
	/*      
	 * Optional. The default value is false which allows the user to
	 * select a single file, while using true enables the user to select multiple
	 * files.      
	 */
	multiSelect: false // or true
}

/*
 * Saver options
 */
saverOptions = {
	
	/*
	 * Required. The id of a form input element of type file.
	 */
	file: "inputFile",
	
	/* 
	 * Optional. If not provided, the fileName will be inferred 
	 * from the name attribute of the input element.
	 */
	fileName: null,
	
	/* Optional. Called when the file has completed uploading to server. */
	success: function saverSuccess() {
		saverLog("Upload complete!");

	},
	
	/*
	 * Optional. Called at various points with a float between 0.0 and 100.0 
	 * to indicate the progress of the upload. This is will be called at least 
	 * once with 100.0
	 */
	progress: function progress(p) {
		saverLog("Uploaded " + p + "%.")
	},
	
	/* Optional. Called when the user cancels the saver. */
	cancel: function() {
		saverLog("User cancelled!");
	},
	
	/*
	 * Optional. Called when an error occurred on our server. Also called if the
	 * user is out of quota, or doesn't have permission to upload to the chosen location. 
	 */
	error: function error(e) {
		saverLog("There was an error saving your file.");
	},
	
}

function launchOneDrivePicker() {
	pickerOptions.multiSelect = document.getElementById("multiSelect").checked;
	pickerOptions.linkType = document.querySelector('input[name="linkType"]:checked').value;
	clearPickerLog();
	pickerLog("<pre>");	
	OneDrive.open(pickerOptions);
	pickerLog("</pre>");	
}

function pickerLog(message) {
    document.getElementById('pickerConsole').innerHTML += message;
}

function clearPickerLog()
{
    document.getElementById('pickerConsole').innerHTML = "";
}

function launchOneDriveSaver() {
	saverOptions.fileName = document.getElementById("fileName").value != "" ? document.getElementById("fileName").value : null;
	clearSaverLog();	
	saverLog("<pre>");		
	OneDrive.save(saverOptions);
	saverLog("</pre>");		
	
}
	
function saverLog(message) {
    document.getElementById('saverConsole').innerHTML += message;
}

function clearSaverLog()
{
    document.getElementById('saverConsole').innerHTML = "";
}