from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def hello_world():
    # return "<p>¡Hola, Mundo!</p>"
    return render_template('index.html')

@app.route("/contact")
def contact():
    return render_template("contact.html")

if __name__ == "__main__":
    app.run(debug=True)