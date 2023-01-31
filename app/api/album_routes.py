from flask import Blueprint, jsonify, request
from app.models import db, Album, Image
from flask_login import login_required, current_user
from ..forms.album_form import AlbumForm

album_routes = Blueprint('albums', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

#Create album
@album_routes.route('/', methods=['POST'])
@login_required
def new_album():
  form = AlbumForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  # form.data["user_id"] = user_id
  if form.validate_on_submit():
    new_album = Album(user=current_user, title=form.data["title"], description=form.data["description"])
    db.session.add(new_album)
    images = form.data['images'].split(',')
    image_details = []
    [image_details.append(Image.query.get(int(image))) for image in images]
    [new_album.images.append(image) for image in image_details]
    db.session.commit()
    return new_album.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401



    #   new_album = Album()
    #   form.populate_obj(new_album)
    #   new_album.album_img_url = form.data['album_img_url'] if form.data['album_img_url'] else '/static/images/unknown-album-cover.jpeg'

    #   db.session.add(new_album)
    #   db.session.commit()
    #   return new_album.to_dict()
    # else:
    #   return form.errors

#Get all user albums
@album_routes.route("/user/<int:id>", methods=["GET"])
def get_users_albums(id):
    albums = Album.query.filter_by(user_id=id).all()
    return {album.id: album.to_dict() for album in albums}

##get all albums
@album_routes.route('/')
def albums():
    albums = Album.query.all()
    #print('getallalbums', albums)
    return {"albums":[album.to_dict() for album in albums]}


##get single album by id
@album_routes.route('/<int:album_id>', methods=["GET"])
def get_one_album(album_id):
    album = Album.query.get(album_id)
    if not album:
        return {"errors":"album not found"}, 404
    return  album.to_dict()


#update album
@album_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_album_details(id):

    album = Album.query.get((id))

    form = AlbumForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        title = form.data["title"]
        description = form.data['description']


        album.title = title
        album.description = description

        if(form.data['images'] != ''):
            images = form.data['images'].split(',')
            image_details = []
            [image_details.append(Image.query.get(int(image))) for image in images]
            [album.images.remove(image) for image in image_details]

        db.session.commit()

    return album.to_dict()




##Delete Album
@album_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_album(id):
    album = Album.query.get(id)
    if album:
        db.session.delete(album)
        db.session.commit()
        return {"message":"Album has been deleted successfully"}
    else:
        return {"message": f"No album found with id of {id}"}
