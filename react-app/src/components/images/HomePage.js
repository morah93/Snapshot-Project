import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getUserAlbumThunk } from "../../store/album";
import { loadImagesThunk, loadMyImagesThunk } from "../../store/image";
import CreateAlbum from "../albums/CreateAlbum";
import "../homepage.css";
import UploadImage from "./AddImage";

const HomePage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [isLoaded, setIsLoaded] = useState(false);
	const user = useSelector((state) => state.session.user);
	// const album = user.albums.map((album) => album)
	// console.log('user----------------', user)
	const images = useSelector((state) => state.images?.allImages);
	const myAlbums = useSelector((state) => state.albums?.myAlbums);
	const myImages = useSelector((state) => state.images?.myImages);
	// console.log('allImages----------------', images)
	const imgArr = Object.values(images);
	const randomImages = imgArr.sort(() => 0.5 - Math.random());
	const displayImages = randomImages.slice(0);
	useEffect(() => {
		dispatch(loadImagesThunk()).then(() => setIsLoaded(true));
		dispatch(getUserAlbumThunk(user?.id));
		dispatch(loadMyImagesThunk(user?.id));

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
			return history.push("/albums");
		}
	}
	function imageButton() {
		if (user !== null) {
			return history.push("/images");
		}
	}
	function addImageButton() {
		if (user !== null) {
			return history.push("/upload-image");
		}
	}

	return (
		isLoaded && (
			// <div className='homepageContainer'>

			/* {Object.values(images).length > 0 &&
				<div className="images-div">
				{Object.values(images).map((image) => (
					<ImageCards
					image = {image}
					/>
					))}
					</div>
				} */
			<div className='images-div'>
				{/* <div>Home Page</div> */}
				<div className='topImgDiv'>
					<img
						className='topImg'
						src={
							"https://images.pexels.com/photos/1144176/pexels-photo-1144176.jpeg"
						}
					></img>
				</div>
				<div className='homepageButtons'>
					{user && myAlbums?.length ? (
						<button
							className='createButton'
							onClick={myAlbum}
						>
							My Albums
						</button>
					) : (
						<p className='createButton'>{user && <CreateAlbum />}</p>
					)}
					{user && myImages?.length ? (
						<button
							className='createButton'
							onClick={imageButton}
						>
							My Images
						</button>
					) : (
						<p className='createButton'>
							{user && <button onClick={addImageButton}>Add Image</button>}
						</p>
					)}
				</div>

				<div className='display-image-main'>
					<div className='img-container'>
						{displayImages?.map((image, i) => {
							return (
								<>
									<div>
										<NavLink to={`/images/${image.id}`}>
											<div>
												<img
													src={image.url}
													className='img-item'
													alt={image.id}
												/>
											</div>
											{/* <div
												className={`display-image-img img${i}`}
												class="card"
												style={{ backgroundImage: image.url }}
												alt={image.id}
											></div> */}
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
			// </div>
		)
	);
};

export default HomePage;
