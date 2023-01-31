from .db import db, environment, SCHEMA, add_prefix_for_prod

image_album = db.Table(
    'image_album',
    db.Model.metadata,
    db.Column('album_id', db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')))
)

if environment == "production":
    image_album.schema =  SCHEMA

class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)

    # Relationship
    # images = db.relationship('Image', secondary=image_album, back_populates='albums')
    # user = db.relationship("User", back_populates='albums')


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "description": self.description,
            "images": [image.to_dict() for image in self.images],
            "owner": self.user.to_dict()
        }

    def __repr__(self):
        return f"{self.user_id}{self.user}"
