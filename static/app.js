var xhr = null;

// request {{{
//
getXmlHttpRequestObject = function () {
    if (!xhr) {
        // Create a new XMLHttpRequest object 
        xhr = new XMLHttpRequest();
    }
    return xhr;
};

function getDate() {
    date = new Date().toString();
    document.getElementById('time-container').textContent = date;
}

// }}}

// database of users {{{

// TODO: create an reall database!
var objPeople = [
	{
		username: "hello",
		password: "world"
	},
	{
		username: "john",
		password: "ellis"
	}
]

// }}}

// validate users {{{

function validateUser() {
  // document.getElementById("username").defaultValue = "hello";
  // document.getElementById("password").defaultValue = "world";
  // document.getElementById("dfilename").defaultValue = "foo";
  // document.getElementById("ufilename").defaultValue = "bar";
	var user = document.getElementById('username').value
	var pass = document.getElementById('password').value
  // loop over username: password
	for(var i = 0; i < objPeople.length; i++) {
		// check is user input matches username and password of a
    // current index of the objPeople array
		if(user == objPeople[i].username && pass == objPeople[i].password) {
			console.log(user + " is logged in!")
			return true;
		}
	}
	console.log("Incorrect username or password")
  return false;
}

// }}}

// download {{{

function downloadFile() {
    console.log("Get file...");
    var isValid = validateUser();
    var node = document.getElementById('result-container');
    node.innerHTML = "";

    if (isValid) {
        xhr = getXmlHttpRequestObject();
        username = document.getElementById('username').value;
        filename = document.getElementById('dfilename').value;
        userAndFile = "";
        userAndFile = userAndFile.concat(
         "?username=", username,
         "&filename=", filename,
         "&download=", "false"
        );
        xhr.open("GET", "download_static_file"+userAndFile, false);
        // Send the request over the network
        var node = document.getElementById('result-container');
        xhr.send(null);
        node.innerHTML = xhr.responseText;
    }
    else {
        node.innerHTML = "<p>User is not valid!</p>";
      return;
    }
}

// }}}

// upload file {{{

function uploadFile(form)
{
    var isValid = validateUser();
    var node = document.getElementById('result-container');
    node.innerHTML = "";

    if (isValid) {
        var formData = new FormData(form);
        xhr = getXmlHttpRequestObject();
        var username = document.getElementById('username').value;
        xhr.open("POST", "upload_static_file?username="+username, true);
        xhr.onload = function(oEvent) {
          if (xhr.status == 200) {
            node.innerHTML = "Uploaded!";
            console.log(xhr.response)
          } else {
            node.innerHTML = "Error!";
          }
        };
        node.innerHTML = "Sending file!";
        console.log("Sending file!")
        xhr.send(formData);
    }
    else {
        node.innerHTML = "<p>User is not valid!</p>";
      return;
    }
}

// }}}

// vim: fdm=marker
