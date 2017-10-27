var clipboard = new Clipboard('.btn');

$('.submit_btn').click(function(e){
	urlText = $('.urlText').val();
	if(urlText !=  "" ){
		console.log(location.protocol + "//" + location.host+":3000/doshort");
		$.ajax({ 
		    type: "POST",
		    dataType: "JSON",
		    data:{urlText : urlText},
		    url:location.protocol + "//" + location.host+"/doshort",
		    success: function(data){
		        var status = data.status;
		        if(status == true){
		        	var newURL = data.newURL;
		            $.alert({
		            	theme: 'modern',
		                title: 'Your little URL here.',
		                content : '<div id="urlwrap" ><span id="url">'+newURL+'</span><button class="btnicon btn" data-clipboard-action="copy" data-clipboard-target="#url" onclick="myFunction()">&nbsp;&nbsp;&nbsp;<i class="fa fa-clipboard fa-2x" fa-2xaria-hidden="true"></i></button></div>'
		            });
		        }
		        else{
		        	// alert(data.msg);
		        	$.alert({
		        		theme: 'modern',
		        	    title: 'New URL',
		        	    content: data.msg,
		        	});
		            // location.reload();
		        }
		    }
		}).fail(function (jqXHR, textStatus, errorThrown) {
		    if(jqXHR.status == 403 || jqXHR.status == 405){
		        console.log('Server error. ' + jqXHR.status + '. ' + textStatus + '. ' + errorThrown);
		    }
		    alert('Seems like server is busy. Please try again.');
		});
	}
	else{
		$.alert({
			theme: 'modern',
		    title: 'Error',
		    content: 'Please enter URL',
		});
		// alert('Please enter URL');
	}
});

function myFunction() {
    // Get the snackbar DIV
    var x = document.getElementById("toast")

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}