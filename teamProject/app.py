from pymongo import MongoClient
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)
client = MongoClient('mongodb://dice:dice4@15.164.214.224/', 27017)
db = client.list_number_2


## HTML 화면 보여주기
@app.route('/')
def homework():
    return render_template('index.html')


@app.route('/search', methods=['GET'])
def view_games():
    games = list(db.gamelist.find({}, {'_id': False}))
    return jsonify({'all_games': games})


@app.route('/member', methods=['POST'])
def input_member():
    id_receive = request.form['id_give']
    pwd_receive = request.form['pwd_give']
    doc = {
        'id': id_receive,
        'pwd': pwd_receive
    }
    db.member.insert_one(doc)
    return jsonify({'msg': '가입을 축하합니다! 로그인 창으로 이동합니다.'})


@app.route('/member', methods=['GET'])
def read_members():
    members = list(db.member.find({}, {'_id': False}))
    return jsonify({'all_members': members})


# 댓글 ,좋아요
@app.route('/comment', methods=['POST'])
def push_comment():
    comment_receive = request.form['comment_give']
    id_receive = request.form['ID_give']
    game_title_receive = request.form['game_title_give']

    # db 업데이트
    # 아이디, 댓글
    db.gamelist.update_many({'title': game_title_receive},
                            {'$push': {"COMMENT": {'ID': id_receive, 'comment': comment_receive}}})


@app.route('/like', methods=['POST'])
def push_like():
    # 좋아요
    ID_receive = request.form['id_give']  ##id 값 받아오기
    game_receive = request.form['game_give']  ## recommend 에 넣을 id 가 어디 게임인지 알려줄 게임제목
    recommend_receive = request.form['recommend_give']  ## 좋아요 제거할 때

    ##rocommend 속 id 제거/추가 기능 조건문
    if (recommend_receive == 'true'):
        db.gamelist.update_one({'title': game_receive}, {'$pull': {'RECOMMEND': ID_receive}})
        return jsonify({'msg': '추천을 취소했습니다.'})
    elif (recommend_receive == 'false'):
        db.gamelist.update_one({'title': game_receive}, {'$push': {'RECOMMEND': ID_receive}})
        return jsonify({'msg': '추천했습니다.'})

    # RECOMMEND 필드 개수 계산 -> LIKE에 입력
    count = db.gamelist.find_one({'title': game_receive}, {})['RECOMMEND']
    like = len(count)
    db.gamelist.update_one({'title': "다빈치 코드"}, {'$set': {'LIKE': like}})

    return jsonify({'msg': '작동했습니다.'})


@app.route('/comment', methods=['GET'])
def show_comment():
    comment_data = list(db.gamelist.find({}, {'_id': False}))
    return jsonify({'comment_data': comment_data})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)