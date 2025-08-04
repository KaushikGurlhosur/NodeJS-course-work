// import React, { useState, useEffect, Fragment } from "react";
// import Backdrop from "./Backdrop";
// import Modal from "./Modal";
// import Input from "./Input";
// import FilePicker from "./FilePicker";
// import Image from "./Image";
// import { required, length } from "../util/validators";
// import { generateBase64FromImage } from "../util/image";

// const POST_FORM = {
//   title: {
//     value: "",
//     valid: false,
//     touched: false,
//     validators: [required, length({ min: 5 })],
//   },
//   image: {
//     value: "",
//     valid: false,
//     touched: false,
//     validators: [required],
//   },
//   content: {
//     value: "",
//     valid: false,
//     touched: false,
//     validators: [required, length({ min: 5 })],
//   },
// };

// const FeedEdit = (props) => {
//   const [postForm, setPostForm] = useState(POST_FORM);
//   const [formIsValid, setFormIsValid] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);

//   useEffect(() => {
//     if (props.editing && props.selectedPost) {
//       const updatedPostForm = {
//         title: {
//           ...POST_FORM.title, // Use original template instead of current state
//           value: props.selectedPost.title,
//           valid: true,
//         },
//         image: {
//           ...POST_FORM.image, // Use original template
//           value: props.selectedPost.imagePath,
//           valid: true,
//         },
//         content: {
//           ...POST_FORM.content, // Use original template
//           value: props.selectedPost.content,
//           valid: true,
//         },
//       };
//       setPostForm(updatedPostForm);
//       setFormIsValid(true);
//     }
//   }, [props.editing, props.selectedPost]);

//   const postInputChangeHandler = (input, value, files) => {
//     if (files) {
//       generateBase64FromImage(files[0])
//         .then((b64) => setImagePreview(b64))
//         .catch(() => setImagePreview(null));
//     }

//     setPostForm((prevState) => {
//       let isValid = true;
//       for (const validator of prevState[input].validators) {
//         // Changed from prevState.postForm
//         isValid = isValid && validator(value);
//       }

//       const updatedForm = {
//         ...prevState, // Changed from ...prevState.postForm
//         [input]: {
//           ...prevState[input], // Changed from ...prevState.postForm[input]
//           valid: isValid,
//           value: files ? files[0] : value,
//         },
//       };

//       let formIsValid = true;
//       for (const inputName in updatedForm) {
//         formIsValid = formIsValid && updatedForm[inputName].valid;
//       }

//       setFormIsValid(formIsValid);
//       return updatedForm;
//     });
//   };

//   const inputBlurHandler = (input) => {
//     setPostForm((prevState) => ({
//       ...prevState,
//       [input]: {
//         ...prevState[input],
//         touched: true,
//       },
//     }));
//   };

//   const cancelPostChangeHandler = () => {
//     setPostForm(POST_FORM);
//     setFormIsValid(false);
//     props.onCancelEdit();
//   };

//   const acceptPostChangeHandler = () => {
//     const post = {
//       title: postForm.title.value,
//       image: postForm.image.value,
//       content: postForm.content.value,
//     };

//     props.onFinishEdit(post);
//     setPostForm(POST_FORM);
//     setFormIsValid(false);
//     setImagePreview(null);
//   };

//   return props.editing ? (
//     <Fragment>
//       <Backdrop onClick={cancelPostChangeHandler} />
//       <Modal
//         title={props.selectedPost ? "Edit Post" : "New Post"}
//         acceptEnabled={formIsValid}
//         onCancelModal={cancelPostChangeHandler}
//         onAcceptModal={acceptPostChangeHandler}
//         isLoading={props.loading}>
//         <form>
//           <Input
//             id="title"
//             label="Title"
//             name="title"
//             control="input"
//             onChange={postInputChangeHandler}
//             onBlur={() => inputBlurHandler("title")}
//             valid={postForm.title.valid}
//             touched={postForm.title.touched}
//             value={postForm.title.value}
//           />
//           <FilePicker
//             id="image"
//             label="Image"
//             name="image"
//             control="input"
//             onChange={postInputChangeHandler}
//             onBlur={() => inputBlurHandler("image")}
//             valid={postForm.image.valid}
//             touched={postForm.image.touched}
//           />
//           <div className="new-post__preview-image">
//             {!imagePreview && <p>Please choose an image.</p>}
//             {imagePreview && <Image imageUrl={imagePreview} contain left />}
//           </div>
//           <Input
//             id="content"
//             label="Content"
//             name="content"
//             control="textarea"
//             rows="5"
//             onChange={postInputChangeHandler}
//             onBlur={() => inputBlurHandler("content")}
//             valid={postForm.content.valid}
//             touched={postForm.content.touched}
//             value={postForm.content.value}
//           />
//         </form>
//       </Modal>
//     </Fragment>
//   ) : null;
// };

// export default FeedEdit;

import React, { useState, useEffect, Fragment } from "react";
import Backdrop from "./Backdrop";
import Modal from "./Modal";
import Input from "./Input";
import FilePicker from "./FilePicker";
import Image from "./Image";
import { required, length } from "../util/validators";
import { generateBase64FromImage } from "../util/image";

const POST_FORM = {
  title: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  },
  image: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
  },
  content: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  },
};

const FeedEdit = (props) => {
  const [postForm, setPostForm] = useState(POST_FORM);
  const [formIsValid, setFormIsValid] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (props.editing && props.selectedPost) {
      setPostForm({
        title: {
          ...POST_FORM.title,
          value: props.selectedPost.title,
          valid: true,
        },
        image: {
          ...POST_FORM.image,
          value: props.selectedPost.imagePath,
          valid: true,
        },
        content: {
          ...POST_FORM.content,
          value: props.selectedPost.content,
          valid: true,
        },
      });
      setFormIsValid(true);
    }
  }, [props.editing, props.selectedPost]);

  const handleInputChange = (input, value) => {
    setPostForm((prev) => {
      const updatedField = {
        ...prev[input],
        value,
        valid: validateField(input, value),
        touched: true,
      };

      const updatedForm = {
        ...prev,
        [input]: updatedField,
      };

      updateFormValidity(updatedForm);
      return updatedForm;
    });
  };

  // const handleFileChange = (files) => {
  //   if (files && files[0]) {
  //     generateBase64FromImage(files[0])
  //       .then((b64) => setImagePreview(b64))
  //       .catch(() => setImagePreview(null));

  //     setPostForm((prev) => {
  //       const updatedField = {
  //         ...prev.image,
  //         value: files[0],
  //         valid: true,
  //         touched: true,
  //       };

  //       const updatedForm = {
  //         ...prev,
  //         image: updatedField,
  //       };

  //       updateFormValidity(updatedForm);
  //       return updatedForm;
  //     });
  //   }
  // };

  const handleFileChange = (file) => {
    if (file) {
      generateBase64FromImage(file)
        .then((b64) => setImagePreview(b64))
        .catch(() => setImagePreview(null));

      setPostForm((prev) => ({
        ...prev,
        image: {
          ...prev.image,
          value: file,
          valid: true,
          touched: true,
        },
      }));
    }
  };

  const validateField = (input, value) => {
    return POST_FORM[input].validators.every((validator) => validator(value));
  };

  const updateFormValidity = (form) => {
    setFormIsValid(Object.values(form).every((field) => field.valid));
  };

  const inputBlurHandler = (input) => {
    setPostForm((prev) => ({
      ...prev,
      [input]: {
        ...prev[input],
        touched: true,
      },
    }));
  };

  const cancelPostChangeHandler = () => {
    setPostForm(POST_FORM);
    setFormIsValid(false);
    setImagePreview(null);
    props.onCancelEdit();
  };

  const acceptPostChangeHandler = () => {
    props.onFinishEdit({
      title: postForm.title.value,
      image: postForm.image.value,
      content: postForm.content.value,
    });
    setPostForm(POST_FORM);
    setFormIsValid(false);
    setImagePreview(null);
  };

  return props.editing ? (
    <Fragment>
      <Backdrop onClick={cancelPostChangeHandler} />
      <Modal
        title={props.selectedPost ? "Edit Post" : "New Post"}
        acceptEnabled={formIsValid}
        onCancelModal={cancelPostChangeHandler}
        onAcceptModal={acceptPostChangeHandler}
        isLoading={props.loading}>
        <form>
          <Input
            id="title"
            label="Title"
            control="input"
            onChange={(e) => handleInputChange("title", e.target.value)}
            onBlur={() => inputBlurHandler("title")}
            valid={postForm.title.valid}
            touched={postForm.title.touched}
            value={postForm.title.value}
          />
          {/* <FilePicker
            id="image"
            label="Image"
            onChange={(e) => handleFileChange(e.target.files)}
            onBlur={() => inputBlurHandler("image")}
            valid={postForm.image.valid}
            touched={postForm.image.touched}
          /> */}
          <FilePicker
            id="image"
            label="Image"
            onChange={handleFileChange}
            onBlur={() => inputBlurHandler("image")}
            valid={postForm.image.valid}
            touched={postForm.image.touched}
          />
          <div className="new-post__preview-image">
            {!imagePreview && <p>Please choose an image.</p>}
            {imagePreview && <Image imageUrl={imagePreview} contain left />}
          </div>
          <Input
            id="content"
            label="Content"
            control="textarea"
            rows="5"
            onChange={(e) => handleInputChange("content", e.target.value)}
            onBlur={() => inputBlurHandler("content")}
            valid={postForm.content.valid}
            touched={postForm.content.touched}
            value={postForm.content.value}
          />
        </form>
      </Modal>
    </Fragment>
  ) : null;
};

export default FeedEdit;
