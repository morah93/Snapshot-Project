import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { addImageToAlbumThunk } from "../../store/album";
// import { addSongToPlaylistThunk } from "../store/playlists";
import '../homepage.css'

const AddImageToAlbumButton = ({ image, buttonClicked }) => {
  const [buttonOn, setButtonOn] = useState(buttonClicked);
  const [albumOption, setAlbumOption] = useState(null);
  const [options, setOptions] = useState([]);
  // const albums = useSelector((state) => state.session.user.albums);
  const albums = useSelector((state) => state.albums?.myAlbums);
  const history = useHistory()
  const dispatch = useDispatch();
  useEffect(() => {
    // instantiates new options for the Select Field
    const updatedOptions = [];
    if (Object.values(albums).length) {
      // Creates datapoints and populates the options
      Object.values(albums).forEach((album) => {
        const newDataPoint = {};
        newDataPoint.value = album.id;
        newDataPoint.label = album.title;
        updatedOptions.push(newDataPoint);
      });
    }

    // Setting the options for the Select Field
    setOptions(updatedOptions);
  }, [dispatch, albums]);

  const handleChange = (option) => {
    setAlbumOption(option.value);
  };

  // const submit = (e) => {
  //   e.preventDefault();
  //   history.push(`/albums/`)
  // }

  // console.log('albumOption////////', albumOption)
  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(addImageToAlbumThunk(image.id, albumOption)).then(
      setButtonOn(false),
      history.push(`/albums/${albumOption}`)
    );
  };

  const renderForm = (e) => {
    e.preventDefault();
    setButtonOn(true);
  };

  const cancel = (e) => {
    e.preventDefault();
    setButtonOn(false);
  };
  if (!Object.values(albums).length){
    return null;
  }
  if (!buttonOn) {
    return (
      <button onClick={renderForm}  className="saveChangesButton" /*style={{color:'black'}}*/>
        Add Image to Album
      </button>
    );
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <Select options={options} onChange={handleChange} autoFocus={true}  />
        <button onClick={cancel} className="demo-btn" style={{color:'black'}}>
          Cancel
        </button>
        <button type="submit" value="Submit" className="demo-btn" >
          Add to Album
        </button>
      </form>
    );
  }
};

export default AddImageToAlbumButton;
