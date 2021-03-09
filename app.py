from flask import Flask, redirect, request,render_template, url_for,make_response,jsonify,session
from flask_login import LoginManager, login_manager, logout_user
from flask_cors import CORS

import os

os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '2'

app = Flask(__name__)
CORS = app

app.secret_key = 'lee'

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.session_protection = 'strong'

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)


@login_manager.unauthorized_handler
def unauthorized():
    return make_response(jsonify(success=False), 401)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calender')
def calender():
    return render_template('calender.html')

@app.route('/register',methods=['GET','POST'])
def register():
    if request.method == 'POST':
        userid = request.form['id']
        userpw = request.form['pw']

        conn = conn_mysqldb()
        cursor = conn.cursor()
        sql = "SELECT * FROM userinfo WHERE username = %s"
        value = userid
        cursor.execute(sql,value)
        data = (cursor.fetchall())

        if not data:
            sql = "INSERT INTO userinfo (username, password) VALUES (%s, %s)"
            value = (userid,userpw)
            cursor.execute(sql, value)
            data = cursor.fetchall()
            conn.commit()
            return render_template('registersuc.html')
        else:
            return render_template('registerfail.html')
    else:
        return render_template('register.html')


@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        username = request.form['id']
        password = request.form['pw']

        usernameinfo = request.form ['id']
        conn = conn_mysqldb()
        cursor = conn.cursor()
        sql = "SELECT * FROM userinfo WHERE username = %s AND password = %s"
        value = (username, password)
        cursor.execute(sql,value)
        data = cursor.fetchall()
        cursor.close()
        conn.close()

        for row in data:
            data = row[0]

        if data:
            session['username'] = request.form['id']
            session['password'] = request.form['pw']
            return render_template('calender.html', usernameinfo = usernameinfo)
        else:
            return render_template('loginfail.html')
    else:
        return render_template('login.html')

    


if __name__ == '__main__':
    app.run(host='localhost', port =8080)

