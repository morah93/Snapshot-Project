import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editImageThunk, loadOneImageThunk } from "../store/image";
import './homepage.css'


const EditImageDetails = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const image = useSelector(state => state?.images?.singleImages)
  const { id } = useParams();
  const [title, setTitle] = useState("please enter title");
  const [description, setDescription] = useState("please enter discription");
  const [errors, setErrors] = useState()
  const [url, setUrl] = useState()
  const formData = new FormData();

  useEffect(async () => {
    await dispatch(loadOneImageThunk(id));
    const res = await fetch(`/api/images/${id}/edit`)
    const data = res.json()
    setTitle(data[id]?.title)
    setDescription(data[id]?.description)

  })
  useEffect(() => {
    dispatch(loadOneImageThunk(id))
  }, [dispatch, id])

  useEffect(() => {
    if (image) {
        setTitle(image.title);
        setDescription(image.description);
        setUrl(image.url)
    }
  }, [image])

  const updateTitle = (e) => {
  setTitle(e.target.value)
  }
  const updateDescription = (e) => {
    setDescription(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const updatedData = {
      // imageId: +id,
      title,
      description,
    }

    const editedData = await dispatch(editImageThunk(updatedData))

    if (editedData) {
      history.push(`/photos/${id}`)
      // dispatch(getImageByIdThunk(id))
    }
  }

  

  return (
    <>
      <div className='background-for-signup-and-login'>
      <h1>Edit Page</h1>


            <div className="update-image-form-container">
                <div className='sign-up-form'>
                    <div className="confirm-delete-message">
                        <span>What would you like to edit about this images details?</span>
                    </div>
                    <form onSubmit={onSubmit}>

                        <div className='all-sign-up-form-inputs-labels'>
                            <label>Title</label>
                            <input
                                className='sign-up-form-inputs-only'
                                placeholder="Not Required"
                                type="text"
                                onChange={updateTitle}
                                value={title}
                            />
                        </div>

                        <div className='all-sign-up-form-inputs-labels'>
                            <label>Description</label>
                            <input
                                className='sign-up-form-inputs-only'
                                placeholder="Not Required"
                                type="text"
                                onChange={updateDescription}
                                value={description}
                            />
                        </div>
                        <div className='delete-cancel-button-div'>
                            <button className='sign-up-submit-button' type='submit'>Save Changes</button>
                            {/* <button className='sign-up-submit-button' onClick={event => cancelButton(event, id)}>Cancel</button> */}
                        </div>
                    </form >
                </div>
            </div>
        </div>
    </>
  )
}
export default EditImageDetails
