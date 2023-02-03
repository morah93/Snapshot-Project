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
    print('form//////////', form.data)
    if form.validate_on_submit():
      new_album = Album()
      print('working/?//////////', new_album)
      form.populate_obj(new_album)
      print('newAlbum//////////', new_album)
      new_album.url = form.data['url'] if form.data['url'] else '/static/images/unknown-album-cover.jpeg'

      db.session.add(new_album)
      db.session.commit()
      return new_album.to_dict()
    else:
      return form.errors



# @album_routes.route('', methods=['POST'])
# @login_required
# def new_album():
#     form = AlbumForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#   # form.data["user_id"] = user_id
#     print('formInBackend[[[[[[[[[[', form)
#     if form.validate_on_submit():
#         new_album = Album(user_id=current_user.id, title=form.data["title"], description=form.data["description"])
#         db.session.add(new_album)
#         images = form.data['images'].split(',')
#         image_details = []
#         [image_details.append(Image.query.get(int(image))) for image in images]
#         [new_album.images.append(image) for image in image_details]
#         db.session.commit()
#         return new_album.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401



#   if form.validate_on_submit():
#     new_album = Album(
#         user_id=current_user.id,
#         title=form.data["title"],
#         description=form.data["description"],
#         url=form.data["url"]
#         )
#     db.session.add(new_album)
#     print('newAlbumInBackend[[[[[[[[[[', new_album)
#     images = form.data['images'].split(',')
#     image_details = []
#     [image_details.append(Image.query.get(int(image))) for image in images]
#     [new_album.images.append(image) for image in image_details]
#     db.session.commit()
#     print('newAlbumInBackendAfterImages[[[[[[[[[[', new_album)
#     return new_album.to_dict()
#   return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#Get all user albums
# @album_routes.route("/user/<int:id>", methods=["GET"])
# def get_users_albums(id):
#     albums = Album.query.filter_by(user_id=id).all()
#     return {album.id: album.to_dict() for album in albums}

##get all albums
@album_routes.route('/', methods=['GET'])
@login_required
def allAlbums():
    albums = Album.query.all()
    #print('getallalbums', albums)
    return {"albums":[album.to_dict() for album in albums]}


#User Albums
@album_routes.route('/users/<int:userId>', methods=["GET"])
@login_required
def userAlbums(userId):
    albums = Album.query.filter(Album.user_id == userId).all()
    #print('getallalbums', albums)
    return {"albums":[album.to_dict() for album in albums]}


##get single album by id
@album_routes.route('/<int:album_id>', methods=["GET"])
def get_one_album(album_id):
    album = Album.query.get(album_id)
    # print("album_id////////////////",album_id)
    if not album:
        return {"errors":"album not found"}, 404
    return  album.to_dict()


#update album
@album_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_album_details(id):
    # album = Album.query.filter(Album.id == album_id).all()
    album = Album.query.get((id))

    print('Album_idIIIIIIIIIIIIIII', id)
    print('AlbumAAAAAAAAAAAAAA', album)
    form = AlbumForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    print('formDataDDDDDDDDD', form.data)
    if form.validate_on_submit():
        title = form.data["title"]
        description = form.data['description']
        url = form.data['url']
        album.title = title
        album.description = description
        album.url = url

        # if(form.data['images'] != ''):
        #     images = form.data['images'].split(',')
        #     image_details = []
        #     [image_details.append(Image.query.get(int(image))) for image in images]
        #     [album.images.remove(image) for image in image_details]

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

#ADD IMAGE TO ALBUM
@album_routes.route("/<int:album_id>/images/<int:image_id>", methods=["POST"])
@login_required
def add_image_to_album(album_id, image_id):
    album = Album.query.get(album_id)
    image = Image.query.get(image_id)
    if album:
        if image:
          album.images.append(image)
          db.session.commit()
          return album.to_dict()
        else:
          return {"error": f"No image with that {image_id}"}, 404
    else:
        return {"error": f"No album with that {album_id}"}, 404
