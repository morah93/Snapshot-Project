from flask_wtf import FlaskForm
from wtforms import StringField, TextField, SubmitField, IntegerField
from wtforms.validators import DataRequired


class AlbumForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired()])
  description = StringField('Description')
  images = StringField('Images')
  # url = StringField('Url', validators=[DataRequired()])
  # user_id = IntegerField('user_id')
  # submit = SubmitField('Submit')
