from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FieldList
from wtforms.validators import DataRequired


class AlbumForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired()])
  description = StringField('Description')
  # images = FieldList('images')
  # url = StringField('Url', validators=[DataRequired()])
  url = StringField('Url')
  user_id = IntegerField('user_id')
  # submit = SubmitField('Submit')

# products = FieldList(FormField(ProductForm), min_entries=4, max_entries=8)
