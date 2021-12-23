import app as app
from pymongo import MongoClient

client = MongoClient('mongodb://dice:dice4@15.164.214.224/', 27017)
db = client.list_number_2
## HTML 화면 보여주기
@app.route('/')
def homework():
    return render_template('index.html')
# 목록보기(Read) API
# @app.route('/search', methods=['GET'])
# def show():
#     games = list(db.getCollection('gamelist').find({},{'_id':False}))
#     return jsonify({'all_games':games})
@app.route('/search', methods=['GET'])
def view_games():
    games = list(db.newgamelist.find({}, {'_id': False}))
    return jsonify({'all_games': games})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)