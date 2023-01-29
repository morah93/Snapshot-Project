import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ImageCards = ({ image }) => {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  if (!user) {
    return (Redirect('/login'))
  }

  const imageOwner = user.id


  const openCard = (e) => {
    history.push(`/images/${image?.id}`);
  };

  return (
    <>
      <div className="single-image-container">
        <div className="image-container">
          <img
            style={{ width: 200, height: 200, zIndex:10 }}
            src={image.url}

            onClick={openCard}
            alt="This should be the img"
          ></img>
        </div>
        {/* <div className="card-title">{image.title}</div>
        {image.description !== undefined && (
          <div className="card-image-description">{image.description}</div>
        )} */}
        {/* <div className="card-">by {maker}</div> */}
      </div>
    </>
  );
};

export default ImageCards;
