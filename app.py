from flask import Flask, request, render_template, jsonify
from flask import send_file
from flask_cors import CORS
import os
app = Flask(__name__)
CORS(app)


@app.route('/', methods= ['GET', 'POST'])
def get_message():
    print("Got to app")
    return render_template("index.html")


@app.route('/upload_static_file', methods=['GET', 'POST'])
def upload_static_file():
    """
    Uploads the requested file from the frontend
    """
    print("Requested to upload")
    username = request.args.to_dict()['username']
    f = request.files['static_file']
    user_path = os.path.join("documents", username, os.path.dirname(f.filename))

    # create user directory if required
    if not os.path.exists(user_path):
        print("creating directory", user_path)
        os.makedirs(user_path, exist_ok=True)

    user_file_path = os.path.join(user_path, f.filename)
    exists = False
    revision_file_path = False
    if os.path.exists(user_file_path):
        exists = True
        revision_number = 0

    # if the file exists, lets store it as a revision of the current one
    while exists:
        revision = f".revision{revision_number}"
        revision_file_path = user_file_path + revision
        if not os.path.exists(revision_file_path):
            exists = False
        revision_number += 1
        print(revision_file_path)
    if revision_file_path:
        os.system(f"mv {user_file_path} {revision_file_path}")

    # save the file
    print("file", user_file_path)
    f.save(user_file_path)
    resp = {"success": True, "response": "file saved!"}
    return jsonify(resp), 200


@app.route('/download_static_file', methods=['GET'])
def download_static_file():
    """
    Downloads the requested file from the frontend
    """
    print("Requested to download")
    username = request.args.to_dict()['username']
    filename = request.args.to_dict()['filename']
    filename = " " if len(filename) < 1 else filename
    download = request.args.to_dict()['download']

    user_path = os.path.join("documents", username)
    user_file_path = os.path.join(user_path, filename)
    print(user_file_path)

    # then we already know the file exists and we just return it
    if download == 'true':
        return send_file(user_file_path, as_attachment=True)

    # check whether the file exists or return a list of availiable files for
    # the user
    if os.path.exists(user_file_path):
        ans = f"username={username}&filename={filename}&download=true" 
        return f'Ready: <a href="download_static_file?{ans}">{filename}</a>'
    else:
        all_files = [f for f in os.listdir(user_path)
                     if os.path.isfile(os.path.join(user_path, f))]
        all_files.sort()
        string_all_files = "\n".join(all_files)
        ans = f"""'{filename}' does not exist. Your documents are:
        <pre>{string_all_files}</pre>"""
        print(ans)
        return ans, 201


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
