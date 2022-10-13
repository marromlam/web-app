# Simple File Storage


## Idea

A python backend (with Flask) and a JavaScript frontend (vanilla JS) app
which stores files uploaded by registered users and allows them to after
download them. If a file was already uploaded, then the revisions are kept.


# How it works

The user must fill `User` and `Password` fields. Then one can upload a file
selection `Choose file` and then `Upload`. If the user is registered this will
print a `Uploaded!` message.

If there are files, they can be requested filling the box and pressing the
`Download` button. If a registered user asks for a file that is not present,
a list of his/her files will be displayed.



## Test the app

To run the app one needs just to create a python environment
with the required packages in `requirements.txt`.
After simply run `python app.py`

Running `bash deploy.sh` will automatically create/activate the 
environment.
