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
		clearPickerLog();
		pickerLog("<pre>");
		// Handle returned file object(s)
		if(files.values.length > 1 && files.link != null)
		{ // only returned for webViewLink
			pickerLog("Files Link: <a href='" + files.link + "'>" + files.link + "<a/>");
		}
		
		for(var i=0; i<files.values.length; i++) {
			pickerLog("<p>");
			var count = i+1;
			pickerLog("File #" + count + "<br />");
			pickerLog("Filename: " + files.values[i].fileName + "<br />");
			pickerLog("File Link: <a href='" + files.values[i].link "'>" + files.values[i].link + "</a><br />");
			pickerLog("Size: " + files.values[i].size + " bytes<br />");
			pickerLog("Link Type: " + files.values[i].linkType + "<br />");
			pickerLog("Thumbnail Count: " + files.values[i].thumbnails.length + "<br />");
			
			for(var j=0; j<files[i].thumbnails.length; j++) {
				var tcount = j+1;
				pickerLog("thumb #" + thcount + ": <a href='" + files.values[i].thumbnails[j] + "'>" + files.values[i].thumbnails[j] + "</a><br />");
			}
			
			pickerLog("</p>");
		}
		pickerLog("</pre>");
	},
	
	/*
	 * Optional. Called if a user cancels the picker.
	 */
	cancel: function() {
		clearPickerLog();
		pickerLog("<pre>User cancelled!</pre>");
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
		saverLog("<pre>Upload complete!</pre>");
	},
	
	/*
	 * Optional. Called at various points with a float between 0.0 and 100.0 
	 * to indicate the progress of the upload. This is will be called at least 
	 * once with 100.0
	 */
	progress: function progress(p) {
		saverLog("<pre>Uploaded " + p + "%.</pre>")
	},
	
	/* Optional. Called when the user cancels the saver. */
	cancel: function() {
		clearSaverLog();
		saverLog("<pre>User cancelled!</pre>");
	},
	
	/*
	 * Optional. Called when an error occurred on our server. Also called if the
	 * user is out of quota, or doesn't have permission to upload to the chosen location. 
	 */
	error: function error(e) {
		clearSaverLog();
		saverLog("<pre>There was an error saving your file.</pre>");
	},
	
}

function launchOneDrivePicker() {
	pickerOptions.multiSelect = document.getElementById("multiSelect").checked;
	pickerOptions.linkType = document.querySelector('input[name="linkType"]:checked').value;
	OneDrive.open(pickerOptions);
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
	OneDrive.save(saverOptions);
	clearSaverLog();
}
	
function saverLog(message) {
    document.getElementById('saverConsole').innerHTML += message;
}

function clearSaverLog()
{
    document.getElementById('saverConsole').innerHTML = "";
}