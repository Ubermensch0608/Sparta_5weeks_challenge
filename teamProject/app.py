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
    games = list(db.newgamelist.find({}, {'_id': False}))
    return jsonify({'all_games': games})


@app.route('/member', methods=['POST'])
def input_member():
    id_receive = request.form['id_give']
    pwd_receive = request.form['pwd_give']

    doc = {
        'id': id_receive,
        'pwd': pwd_receive
    }
    db.imsi_member.insert_one(doc)

    return jsonify({'msg': '가입을 축하합니다! 로그인 창으로 이동합니다.'})


@app.route('/member', methods=['GET'])
def read_members():
    members = list(db.imsi_member.find({}, {'_id': False}))
    return jsonify({'all_members': members})


# 댓글 ,좋아요
@app.route('/comment', methods=['POST'])
def push_comment():
    comment_receive = request.form['comment_give']
    # like_receive = request.form['like_give']
    id_receive = request.form['ID_give']
    game_title_receive = request.form['game_title_give']

    # db 업데이트
    # 아이디, 댓글
    print(comment_receive, id_receive, game_title_receive)
    db.gamelist.update_many({'title': game_title_receive},
                            {'$push': {"COMMENT": {'ID': id_receive, 'comment': comment_receive}}})
    # # 좋아요
    # db.gamelist.update({'title': game_title_receive},{'$set':{"LIKE" : like_receive}})
    # return jsonify({'msg': '댓글달았다'})


@app.route('/comment', methods=['GET'])
def show_comment():
    comment_data = list(db.gamelist.find({}, {'_id': False}))
    # like_data
    return jsonify({'comment_data': comment_data})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

