import { useHistory, useSelector } from "react-router-dom";

const SingleImageCards = ({image}) => {
  const history = useHistory();
  console.log(image, 'image////-----------')
  // const openCard = (e) => {
  //   history.push(`/images/${image.id}`);
  // };

  return (
    <>
      <div className="single-image-container">
        <div className="image-container">
          <img
            style={{ width: 200, height: 200 }}
            src={image.url}
            // onClick={openCard}
            alt="This should be the img"
          ></img>
        </div>
        <div className="card-title">{image.title}</div>
        {image.description !== undefined && (
          <div className="card-image-description">{image.description}</div>
        )}
        {/* <div className="card-">by {maker}</div> */}
      </div>
    </>
  );
};

export default SingleImageCards;
