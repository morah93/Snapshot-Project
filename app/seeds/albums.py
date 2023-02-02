from app.models import db, Image, Album, environment, SCHEMA

def seed_albums():
  test1 = Image(
    user_id=1,  url="https://images.pexels.com/photos/6348820/pexels-photo-6348820.jpeg?auto=compress&cs=tinysrgb&w=1600", title='Person on Top of a Hill.', description="Person on a hill", album_id=1
  )
  test2 = Image(
    user_id=1,  url="https://images.pexels.com/photos/5243591/pexels-photo-5243591.jpeg?auto=compress&cs=tinysrgb&w=1600", title='Stars', description="The stars in our sky", album_id=1
  )
  test3 = Image(
    user_id=1,  url="https://images.pexels.com/photos/1693095/pexels-photo-1693095.jpeg?auto=compress&cs=tinysrgb&w=1600", title='Northern Lights', description='Multi colored lights in the sky', album_id=1
  )
  test4 = Image(
    user_id=1,  url="https://images.pexels.com/photos/9184517/pexels-photo-9184517.jpeg?auto=compress&cs=tinysrgb&w=1600", title='Lightening in the sky', description='White Flashes of Lightning in the Sky', album_id=1
  )

  test5 = Image(
    user_id=2,  url="https://images.pexels.com/photos/40784/drops-of-water-water-nature-liquid-40784.jpeg?auto=compress&cs=tinysrgb&w=1600", title='Drop of water.', description="Ripples", album_id=2
  )
  test6 = Image(
    user_id=2,  url="https://images.pexels.com/photos/62307/air-bubbles-diving-underwater-blow-62307.jpeg?auto=compress&cs=tinysrgb&w=1600", title='Underwater', description="Bubbles under water", album_id=2
  )
  test7 = Image(
    user_id=2,  url="https://images.pexels.com/photos/1028600/pexels-photo-1028600.jpeg?auto=compress&cs=tinysrgb&w=1600", title='Water drops', description='Water on glass', album_id=2
  )
  test8 = Image(
    user_id=2,  url="https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1600", title='Reflection', description='Reflection on water', album_id=2
  )

  test9 = Image(
    user_id=3,  url="https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title='Single Tree.', description="Tree in the center", album_id=3
  )
  test10 = Image(
    user_id=3,  url="https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&w=1600", title='Bridge between trees', description="Rope bridge", album_id=3
  )
  test11 = Image(
    user_id=3,  url="https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=1600", title='Trees next to water', description='Riverside trees', album_id=3
  )
  test12 = Image(
    user_id=3,  url="https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=1600", title='Fall tree colors', description='Red leaves on trees', album_id=3
  )

  test13 = Image(
    user_id=1,  url="https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1600", title='City  view.', description="City structures", album_id=4
  )
  test14 = Image(
    user_id=1,  url="https://images.pexels.com/photos/1538177/pexels-photo-1538177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title='Kuala Lumpur', description="City at night", album_id=4
  )
  test15 = Image(
    user_id=1,  url="https://images.pexels.com/photos/6150459/pexels-photo-6150459.jpeg?auto=compress&cs=tinysrgb&w=1600", title='12', description='Twirling light', album_id=4
  )
  test16 = Image(
    user_id=2,  url="https://images.pexels.com/photos/4039921/pexels-photo-4039921.jpeg", title='FDR', description='FDR Drive', album_id=5
  )

  test17 = Image(
    user_id=2,  url="https://images.pexels.com/photos/561463/pexels-photo-561463.jpeg?auto=compress&cs=tinysrgb&w=1600", title='sunset on water.', description="Sunset on waves", album_id=5
  )
  test18 = Image(
    user_id=2,  url="https://images.pexels.com/photos/954929/pexels-photo-954929.jpeg?auto=compress&cs=tinysrgb&w=1600", title='waterfall sunset', description="Sunset on a waterfall", album_id=5
  )
  test19 = Image(
    user_id=3,  url="https://images.pexels.com/photos/3426870/pexels-photo-3426870.jpeg?auto=compress&cs=tinysrgb&w=1600", title='Sunset Maldives', description='Sunset with palm trees', album_id=6
  )
  test20 = Image(
    user_id=3,  url="https://images.pexels.com/photos/1144176/pexels-photo-1144176.jpeg?auto=compress&cs=tinysrgb&w=1600", title='Beach sunset', description='Sunset at on the beach', album_id=6
  )

  # db.session.add(test1)
  # db.session.add(test2)
  # db.session.add(test3)
  # db.session.add(test4)
  # db.session.add(test5)
  # db.session.add(test6)
  # db.session.add(test7)
  # db.session.add(test8)
  # db.session.add(test9)
  # db.session.add(test10)
  # db.session.add(test11)
  # db.session.add(test12)
  # db.session.add(test13)
  # db.session.add(test14)
  # db.session.add(test15)
  # db.session.add(test16)
  # db.session.add(test17)
  # db.session.add(test18)
  # db.session.add(test19)
  # db.session.add(test20)

  album1 = Album(
    user_id=1, title='sky',description='Views of the sky', url='https://images.pexels.com/photos/1154504/pexels-photo-1154504.jpeg', images=[test1,test2, test3, test4]
    )
  album2 = Album(
    user_id=2, title='water',description='Water', url='https://images.pexels.com/photos/1350197/pexels-photo-1350197.jpeg', images=[test5,test6, test7, test8]
    )
  album3 = Album(
    user_id=3, title='trees',description='Forests', url='https://images.pexels.com/photos/167698/pexels-photo-167698.jpeg', images=[test9,test10, test11, test12]
    )
  album4 = Album(
    user_id=1, title='city',description='Buildings', url='https://images.pexels.com/photos/1106476/pexels-photo-1106476.jpeg', images=[test13,test14, test15, ]
    )
  album5 = Album(
    user_id=2, title='sunset',description='Views', url='https://images.pexels.com/photos/48207/sunset-sky-sun-cloud-48207.jpeg', images=[test16, test17,test18,  ]
    )
  album6 = Album(
    user_id=3, title='sunset',description='Views', url='https://images.pexels.com/photos/48207/sunset-sky-sun-cloud-48207.jpeg', images=[ test19, test20]
    )

  db.session.add(album1)
  db.session.add(album2)
  db.session.add(album3)
  db.session.add(album4)
  db.session.add(album5)
  db.session.add(album6)
  db.session.commit()

def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM albums")

    db.session.commit()
