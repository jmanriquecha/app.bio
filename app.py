from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def hello_world():
    # return "<p>¡Hola, Mundo!</p>"
    return render_template('index.html')

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/about")
def about():
    return render_template('about.html')

@app.route("/detail")
def municipio():
    return render_template('detail.html')

if __name__ == "__main__":
    app.run(debug=True)