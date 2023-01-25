from app.models import db, Image, environment, SCHEMA


def seed_images():
  image1 = Image(
    user_id=1,
    url='http://res.cloudinary.com/simpleview/image/upload/v1586366096/clients/traversecity/Frankfort_Lighthouse_2851be9b-d042-40fb-939f-c8391ae99073.jpg',
    title='light house',
    description='Beautiful scene of a lighthouse',
    # tags=['lighthouse', 'water']
  )
  image2 = Image(
    user_id=1,
    url='https://i.natgeofe.com/k/49f3dd21-d3b5-476e-a85e-4c5b34651cd1/Denali-mountain_3x2.jpg',
    title='snow mountain',
    description='Mountain top covered by clouds',
    # tags=['mountain', 'cloud', ['plants']]
  )
  image3 = Image(
    user_id=1,
    url='https://images.pexels.com/photos/701353/pexels-photo-701353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title='rainbow between mountains',
    description='Rainbow between tree covered mountain range',
    # tags=['trees', 'mountains', 'rainbow']
  )



  db.session.add(image1)
  db.session.add(image2)
  db.session.add(image3)
  db.session.commit()

def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM images")

    db.session.commit()
