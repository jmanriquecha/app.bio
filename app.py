from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/about")
def about():
    return render_template('about.html')

@app.route("/detail/<int:codDepa>/<int:codMuni>")
def municipio(codDepa, codMuni):
    id = codMuni
    idDepa = codDepa
    return render_template('detail.html', id = id, idDepa = idDepa)

if __name__ == "__main__":
    app.run(debug=True)