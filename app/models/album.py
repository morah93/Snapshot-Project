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
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    url = db.Column(db.String, nullable=False)
    images = db.relationship('Image', secondary=image_album, back_populates='albums')

    # Relationship
    images = db.relationship('Image', back_populates='albums', cascade='all, delete')
    users = db.relationship("User", back_populates='albums')


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "description": self.description,
            'url': self.url,
            "images": [image.to_dict() for image in self.images]
            # "owner": self.user.to_dict()
        }
