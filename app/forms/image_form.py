from flask_wtf import FlaskForm
from wtforms import StringField, TextField, SubmitField
from wtforms.validators import DataRequired
from app.models import Image


class ImageForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired()])
  description = StringField('Description')
  url = StringField('url')
  submit = SubmitField('Submit')
