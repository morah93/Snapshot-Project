from flask import Blueprint, request, jsonify
from app.models import db, Image
from app.forms import ImageForm
from flask_login import  current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

image_routes = Blueprint("images", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@image_routes.route("", methods=["POST"])
# @login_required
def upload_image():
    # if "image" not in request.files:
    #     return {"errors": "image required"}, 400
    if(request.files):
        image = request.files["image"]
    else:
        return {"errors": "No files found"}
    # data = request.form.to_dict()

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    # if upload:
    #     print(upload)


    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]

        # flask_login allows us to get the current user from the request

        # form = ImageForm()
        # form['csrf_token'].data = request.cookies['csrf_token']
        # if form.validate_on_submit():
        #     new_image = Image(
        #         user=current_user,
        #         # url=url,
        #         title=form.data['title'],
        #         description=form.data['description'],
        #         url=form.data['url']
        #     )
        # else:
        #     return render_template('image_form',form=form)
    new_image = Image(
        url=url
        )
    db.session.add(new_image)
    db.session.commit()
    return {'url': url}
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# @image_routes.route("")
# def get_all_images():
#     images = Image.query.order_by(Image.id.desc()).all()
#     return {"images": [image.to_dict() for image in images]}


# Get all images
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
    return ({image.id: image.to_dict()})
    # return {image.id: image.to_dict()}

@image_routes.route('/', methods=["POST"])
# @login_required
def post_new_image(user_id):
    data = request.get_json()
    new_image = Image(
        title = data['title'],
        description = data['description'],
        url = data['url'],
        user_id = user_id
    )

    db.session.add(new_image)
    db.session.commit()
    return new_image.to_dict()

@image_routes.route('/<int:id>', methods=["PUT"])
# @login_required
def edit_image(id):
    print('printing in backend edit route')

    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # print('data------in backend route', data)
    image = Image.query.get(id)

    # print('image------in backend route', image)
    if form.validate_on_submit() and image:
        data = form.data
        image.title = data['title']
        image.description = data['description']
        db.session.commit()
    else:
      return "error in img_route"

    return jsonify(image.to_dict())




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
