#!/usr/bin/env bash

DIRECTORY="venv"
if [[ -d "$DIRECTORY" ]]; then
	source ./venv/bin/activate
else
	python3 -m venv venv
	source ./venv/bin/activate
	pip install -r requirements.txt
fi

python app.py

# vim:foldmethod=marker
