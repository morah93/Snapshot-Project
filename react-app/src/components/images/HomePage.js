import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getUserAlbumThunk } from "../../store/album";
import { loadImagesThunk } from "../../store/image";
import "../homepage.css";

const HomePage = () => {
	const dispatch = useDispatch();
	const history = useHistory()
	const [isLoaded, setIsLoaded] = useState(false);
	const user = useSelector((state) => state.session.user);
	// const album = user.albums.map((album) => album)
	// console.log('user----------------', user)
	const images = useSelector((state) => state.images?.allImages);
	// console.log('allImages----------------', images)
	const imgArr = Object.values(images);
	const randomImages = imgArr.sort(() => 0.5 - Math.random());
	const displayImages = randomImages.slice(0);
	useEffect(() => {
		dispatch(loadImagesThunk()).then(() => setIsLoaded(true));
		// dispatch(getUserAlbumThunk(user.id))
		// if (user) {
		//   dispatch(loadMyImagesThunk(user.id));
		// }
	}, [dispatch, user]);

	// if (!user) {
	//   return (
	//       <div className='splash_wrapper' id='splash_background'>
	//           <div className='splash_inside_wrapper'>
	//               <div id='text_white1'>Find your inspiration.</div>
	//               <div id='text_white2'>Join the Csárdás community.</div>
	//               <NavLink to='/sign-up' exact={true} activeClassName='active'>
	//                   <button id='start_free'>START</button>
	//               </NavLink>
	//           </div>
	//       </div>
	//   )
	// }
	function myAlbum() {
		if (user !== null) {
			return history.push("/albums")
		}
	}

	return (
		isLoaded && (
			<div className="homepageContainer">
				{/* <div></div> */}
				{/* {Object.values(images).length > 0 &&
      <div className="images-div">
      {Object.values(images).map((image) => (
        <ImageCards
        image = {image}
        />
        ))}
        </div>
      } */}
				<div className='images-div'>
					{/* <div>Home Page</div> */}
          <div>
						<img
							className='topImg'
							src={displayImages[0]?.url}
						></img>
					</div>
					{/* {user && (
              <button onClick={history.push('/albums')}>My Albums</button>
          )} */}
					<button className="createButton" onClick={myAlbum}>My Albums</button>

					<div className='display-image-main'>
						{displayImages?.map((image, i) => {
              return (
                <>
								<div className={`display-image-outer img${i}`}>
									<NavLink to={`/images/${image.id}`}>
										<div className='display-img-outer'>
											<img
												src={image.url}
												className={`display-image-img img${i}`}
												alt={image.id}
											/>
										</div>
										{/* <div className="display-product-price">
                  ${parseFloat(product.price).toFixed(2)}
                  </div> */}
									</NavLink>
                </div>
                {/* <hr></hr> */}
                </>
							);
						})}
					</div>

					{/* {displayImages?.map((image, i) => {
          return (
            <div className={`display-image-outer img${i}`}>
              <NavLink to={`/images/${image.id}`}>
                <div className="img-div">
                  <img
                    src={image.url}
                    style={{width:400, height:300}}
                    className={`display-img${i}`}
                    alt={image.id}
                  />
                </div>
              </NavLink>
            </div>
          );
        })} */}
				</div>

				{/* <div className="display-product-main">
        {displayProducts?.map((product, i) => {
          return (
            <div className={`display-product-outer img${i}`}>
              <NavLink to={`/products/${product.id}`}>
                <div className="display-img-outer">
                  <img
                    src={product.previewImage}
                    className={`display-product-img img${i}`}
                    alt={product.id}
                  />
                </div>
                <div className="display-product-price">
                  ${parseFloat(product.price).toFixed(2)}
                </div>
              </NavLink>
            </div>
          );
        })}
      </div> */}
			</div>
		)
	);
};

export default HomePage;
