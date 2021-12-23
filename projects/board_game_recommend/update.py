from pymongo import MongoClient
client = MongoClient('mongodb://dice:dice4@15.164.214.224/', 27017)
db = client.list_number_2

num = 1
while num <= 50:
    print(num)
    num = num +1

    gl = db.gamelist.find_one({'_id': num-1})['title']
    crl = db.crawling_boardlife.find_one({'title': gl})['num_person']
    crl2 = db.crawling_boardlife.find_one({'title': gl})['img']

    db.gamelist.update_many({'_id': num-1},{'$set':{'num_person':crl,'img':crl2}})
    print(gl, crl, crl2)