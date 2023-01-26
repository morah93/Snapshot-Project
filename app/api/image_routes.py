from flask import Blueprint, request
from app.models import db, Image
from app.forms import ImageForm
from flask_login import current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

image_routes = Blueprint("images", __name__)


@image_routes.route("/", methods=["POST"])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]
    data = request.form.to_dict()

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_image = Image(
        # user=current_user,
        # url=url,
        title=data['title'],
        description=data['description'],
        img_url=data['img_url']
        )

    db.session.add(new_image)
    db.session.commit()
    return new_image.to_dict()


# Get all image
@image_routes.route('/')
def load_images():
    images = Image.query.all()
    return {'images': [image.to_dict() for image in images]}

# get one image
@image_routes.route('/<int:id>', methods=['GET'])
def load_one_image(id):
    image = Image.query.get(id)
    if not image:
        return {"errors":"image not found"}, 404
    return  image.to_dict()
    # return {image.id: image.to_dict()}

@image_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_image(id):
    image = Image.query.get(id)
    # new_title = request.json['title']
    # new_description = request.json['description']
    form = ImageForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        title = form.data['new_title']
        description = form.data['description']

        image.title = title
        image.description = description
        db.session.commit()
        return image.to_dict()

@image_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_image(id):
    image = Image.query.get(id)
    db.session.delete(image)
    db.session.commit()
    return{'message': 'Photo Deleted'}

@image_routes.route('/user/<int:id>')
def user_images(id):
    images = Image.query.filter_by(user_id=id).all()
    if len(images):
        return {
            'images': [image.to_dict() for image in images]
        }
    else:
        return {'image': {}}
