## 시작
오늘의 기분을 사진을 통해 기록해두는 것은 어떨까? 에서 시작한 프로젝트입니다.

## 소개
한창 나와 비슷한 얼굴의 동물상 찾기가 유행이었습니다. 이것에 맞추어 오늘 찍은 얼굴 사진을 업로드하면 표정을 Teachable Machine API 에서 분석해 결과값을 노출하는 방법으로 구상을 했습니다.

## 사용했던 스택
JS, Python(Flask), Mysql
flask와 mysql를 통해 서버와 데이터베이스를 구동해보고 html, js로 동적인 작업이 가능하도록 했습니다. express.js가 아닌 flask를 고른 이유는 크롤링을 배우기 위해 python을 배웠고 배운 것을 활용하기 위해 python 라이브러리인 flask를 선택했습니다.

## 주요 기능 

### 얼굴 표정 분석
![](https://images.velog.io/images/lamda/post/8b8ce899-bb55-40e8-8f65-24669116ebb1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-01-11%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.01.12.png)

간단한 게임처럼 이미지 업로드 하는 곳을 클릭하면 어떤 사진을 업로드 할 것인지 창이 뜹니다. 그리고 자신의 얼굴 사진을 입력하게 되면 
![](https://images.velog.io/images/lamda/post/6320bc8a-6c4d-49dc-873f-f6415fe97750/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-01-11%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.03.31.png)
Teachable Machine API가 사진을 분석하고 보내준 결과값을 정리해 사용자가 읽을 수 있도록 했습니다.

### 로그인, 회원가입 기능

![](https://images.velog.io/images/lamda/post/6d4c2396-5e92-4741-be24-0ec7c2fc743b/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-01-11%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.01.22.png)
```
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

```

flask와 Mysql로 회원가입 기능, 로그인 기능을 구현했습니다.
flask에서 지원하는 flask_login을 활용해 작업을 해야했습니다. js와 python의 원리는 비슷해도 적는 방식이 달랐지만, 다르기에 각자의 언어를 작성하는데 차이점을 이해하게 되었습니다.


### 캘린더
![](https://images.velog.io/images/lamda/post/04bd1335-df75-4b5e-8ab4-7f84dcb773bc/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-01-11%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.17.50.png)

캘린더 한 줄 일기처럼 오늘 느꼈던 감정이나 기분을 적을 수 있는 캘린더입니다. Date를 활용해 오늘 날짜를 불러오고 자동으로 오늘의 날짜에 입력할 수 있도록 했습니다.


## 아쉬웠던 점
처음으로 제작한 프로젝트라 어설픈 점이 많았습니다. 구현하고 싶었던 기능(분석한 결과를 자동으로 유저 정보에 저장 등)이 많았지만, 아직 이해해야 할 부분과 어설프게 이해한 부분을 제대로 확인할 수 있었던 작업이었습니다


##개발 기간
2021.02 ~ 2021.03

