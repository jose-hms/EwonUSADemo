var lampValue;

//verifies if the user is connecting over M2Web or eCatcher. This will change the way the camera loads as well as the PLC functions.
function IsM2Web() {
	if (window.location.host == "m2web.talk2m.com")
		return true;
	return false;

}

//SubMenu
b_menuDeployed = false;
html_menuDeployed = false;
viewon_menuDeployed = false;

$("*").click(function (event) {
	if (event.target.id == "AccessPLC_Menu" && b_menuDeployed == false) {
		$('#SubMenu').slideToggle();
		b_menuDeployed = true;
	} else if (b_menuDeployed == true) {
		$('#SubMenu').slideToggle();
		b_menuDeployed = false;
	}

	if (event.target.id == "Html_Menu" && html_menuDeployed == false) {
		$('#HtmlSubMenu').slideToggle();
		html_menuDeployed = true;
	} else if (html_menuDeployed == true) {
		$('#HtmlSubMenu').slideToggle();
		html_menuDeployed = false;
	}
});


//retrieve the lamp_status value on boot.
function SetLampValue(val) {
	lampValue = val;
	return lampValue ? 0 : 1;
}

//write the value to the ewon .
function WriteTag() {
	jQuery.ajax({
		type : 'POST',
		url : "/rcgi.bin/UpdateTagForm",
		contentType : 'text/html',
		dataType : 'text',
		data : 'TagName=Lamp_Status&TagValue=' + SetLampValue(lampValue),
	});
	
	SetLampValue(lampValue ? 0 : 1);
}

function rslinxOne() {
	bootbox.alert("<center><h4 class=\"text-body\">Step 1: Configure Your Driver</h4><img src=\"http://192.168.140.1/usr/images/RSLinx1.png\"/></center><p>1. Select Communication</p><p>2. Select Configure drivers</p>");

}

function rslinxTwo() {
	bootbox.alert("<center><h4 class=\"text-body\">Step 2: Add your eWON/PLC</h4><img style=\"width:100%\" src=\"http://192.168.140.1/usr/images/RSLinx2.png\"/></center><p>1. Open the station mapping table.</p><p>2. Add the eWON address to the station mapping table.</p>");

}

function rslinxThree() {
	bootbox.alert("<center><h4 class=\"text-body\">Step 3: RSWho to see your device</h4><img src=\"http://192.168.140.1/usr/images/RSLinx4.png\"/></center><p>1. Select RSWho</p><p>2. Browse your AB_ETH-1 driver for the PLC.</p>");

}

function changeHome() {
	if (isM2webVar) {
		document.getElementById('home').innerHTML = "<a href=\"https://m2web.talk2m.com\">M2Web Home</a>";
	} else {
		document.getElementById("home").textContent = "<a>Home</a>";
	}
}
