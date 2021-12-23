from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from pymongo import MongoClient
client = MongoClient('localhost', 27017)
import time

db = client.list_number_2
driver = webdriver.Chrome('/Users/suwanpark/Documents/CODE/selenium_prac/chromedriver')
driver.get('https://www.youtube.com/')
game_list = [
{'_id':1, 'title' :'다빈치 코드', 'when':'친구와 함께','catgory': '추리','img':'','num_person':'','play_time':''},
{'_id':2, 'title' :'우봉고', 'when':'친구와 함께','category': '가족'},
{'_id':3, 'title' :'로보 77', 'when':'친구와 함께','category': '전략'},
{'_id':4, 'title' :'바퀴벌레 포커', 'when':'가족과 함께','category': '카드'},
{'_id':5, 'title' :'숲속의 음악대', 'when':'아이스브레이킹','category': '역동적'},
{'_id':6, 'title' :'세트', 'when':'친구와 함께', 'category': '카드'},
{'_id':7, 'title' :'텔레스트레이션', 'when':'친구와 함께', 'category': '가족'},
{'_id':8, 'title' :'블리츠', 'when':'아이스브레이킹', 'category': '가족'},
{'_id':9, 'title' :'루미큐브', 'when':'친구와 함께', 'category': '전략'},
{'_id':10, 'title' :'로스트 시티', 'when':'연인과 함께', 'category': '전략'},
{'_id':11, 'title' :'장미의 전쟁', 'when':'친구와 함께', 'category': '전략'},
{'_id':12, 'title' :'코드 777', 'when':'친구와 함께', 'category': '추리'},
{'_id':13, 'title' :'셜록 13', 'when':'친구와 함께', 'category': '추리'},
{'_id':14, 'title' :'더마인드', 'when':'가족과 함께', 'category': '카드'},
{'_id':15, 'title' :'젝스님트', 'when':'친구와 함께', 'category': '카드'},
{'_id':16, 'title' :'라스 베가스', 'when':'가족과 함께', 'category': '전략'},
{'_id':17, 'title' :'딕싯', 'when':'가족과 함께', 'category': '추리'},
{'_id':18, 'title' :'캔트스탑', 'when':'연인과 함께', 'category': '전략'},
{'_id':19, 'title' :'스플렌더', 'when':'친구와 함께', 'category': '전략'},
{'_id':20, 'title' :'클루', 'when':'가족과 함께', 'category': '추리'},
{'_id':21, 'title' :'아임 더 보스!', 'when':'친구와 함께', 'category': '전략'},
{'_id':22, 'title' :'노 터치 크라켄', 'when':'친구와 함께', 'category': '전략'},
{'_id':23, 'title' :'다잉메시지', 'when':'가족과 함께', 'category': '추리'},
{'_id':24, 'title' :'보난자', 'when':'친구와 함께', 'category': '전략'},
{'_id':25, 'title' :'달무티', 'when':'아이스브레이킹', 'category': '카드'},
{'_id':26, 'title' :'센추리', 'when':'친구와 함께', 'category': '전략'},
{'_id':27, 'title' :'뱅!', 'when':'친구와 함께', 'category': '전략'},
{'_id':28, 'title' :'카탄의 개척자', 'when':'가족과 함께', 'category': '전략'},
{'_id':29, 'title' :'할리갈리', 'when':'친구와 함께', 'category': '역동적'},
{'_id':30, 'title' :'모두의 마블', 'when':'친구와 함께', 'category': '가족'},
{'_id':31, 'title' :'인생게임', 'when':'가족과 함께', 'category': '가족'},
{'_id':32, 'title' :'부르마블', 'when':'친구와 함께', 'category': '가족'},
{'_id':33, 'title' :'이스케이프 룸: 더 게임', 'when':'친구와 함께', 'category': '추리'},
{'_id':34, 'title' :'타코 캣 고트 치즈 피자', 'when':'아이스브레이킹', 'category': '역동적'},
{'_id':35, 'title' :'카후나', 'when':'연인과 함께', 'category': '전략'},
{'_id':36, 'title' :'쿼리도', 'when':'연인과 함께', 'category': '전략'},
{'_id':37, 'title' :'펭귄트랩', 'when':'연인과 함께', 'category': '가족'},
{'_id':38, 'title' :'폭탄돌리기', 'when':'아이스브레이킹', 'category': '역동적'},
{'_id':39, 'title' :'치킨 차차', 'when':'가족과 함께', 'category': '가족'},
{'_id':40, 'title' :'스파이폴', 'when':'친구와 함께', 'category': '가족'},
{'_id':41, 'title' :'아발론', 'when':'연인과 함께', 'category': '전략'},
{'_id':42, 'title' :'라온', 'when':'가족과 함께', 'category': '가족'},
{'_id':43, 'title' :'세븐원더스 듀얼', 'when':'연인과 함께', 'category': '전략'},
{'_id':44, 'title' :'펭귄파티', 'when':'연인과 함께', 'category': '가족'},
{'_id':45, 'title' :'시퀀스', 'when':'친구와 함께', 'category': '전략'},
{'_id':46, 'title' :'자이푸르', 'when':'연인과 함께', 'category': '전략'},
{'_id':47, 'title' :'마라케시', 'when':'친구와 함께', 'category': '전략'},
{'_id':48, 'title' :'마헤', 'when':'가족과 함께', 'category': '가족'},
{'_id':49, 'title' :'티켓 투 라이드', 'when':'가족과 함께', 'category': '전략'},
{'_id':50, 'title' :'장난꾸러기 나방', 'when':'친구와 함께', 'category': '가족'}
]
# 0부터 49
n = 17

elem = driver.find_element(By.TAG_NAME,'input')
elem.send_keys('보드게임 ',game_list[n]['title'],' 설명')
elem.send_keys(Keys.RETURN)
time.sleep(1)

youtube = driver.find_elements_by_css_selector("#contents > ytd-video-renderer")
title = youtube[0].find_element_by_css_selector('#video-title > yt-formatted-string').text
link = youtube[0].find_element_by_css_selector('#video-title').get_attribute("href")
print( n+1, title, link)

#doc = {
    # '_id' : n+1,
    # 'youtube_titlle':title,
    # 'youtube_link' : link
#}


db.gamelist.update_many({'_id': n+1},{'$set':{'youtube_titlle':title,'youtube_link':link}})

#db.gamelist.update_one({'_id': n+1},{'$set':{'youtube_titlle':title}})