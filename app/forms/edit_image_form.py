from flask_wtf import FlaskForm
from wtforms import StringField, TextField, SubmitField
from wtforms.validators import DataRequired
from app.models import Image


class EditImageForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired()])
  description = StringField('Description')
  submit = SubmitField('Submit')
