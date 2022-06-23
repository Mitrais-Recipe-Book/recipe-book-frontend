import Footer from "@components/Footer";
import Image from "next/image";
import Navbar from "@components/Navbar";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import Select from "react-select";
import Swal, { SweetAlertResult } from "sweetalert2";
import { useRouter } from "next/router";
import { convertFromHTML } from "draft-convert";
import RichTextEditor from "@components/RichTextEditor";

// 1. conditional editorstate kl ada value biar keisi
// 2. conditional ingredientlist
// 3. form validation biar gk error
// 4. make banner image optional

export default function CreateRecipe() {
  const { query } = useRouter();
  const router = useRouter();
  const [userInfo, setUserInfo]: any = useState({});
  const [recipeForm, setRecipeForm]: any = useState({});
  const [ingredientList, setIngredientList]: any = useState([]);
  const [imageFormData, setImageFormData]: any = useState({});
  const [recipeTagsData, setRecipeTagsData]: any = useState([]);
  const [contentValue, setContentValue]: any = useState("");
  const [rawContentValue, setRawContentValue]: any = useState("");
  const [submitFormState, setSubmitFormState]: any = useState(false);

  // const [ingredientFormData, setIngredientFormData]: any = useState({
  //   ingredients: new Array(),
  // });
  const ingredientFormData: any = useRef({
    ingredients: [],
  });
  const [tagOptionsDefault, setTagOptionsDefault]: any = useState([]);
  const tagOptions: any = useRef([]);
  const tagInput: any = [];
  // note: use session from next to change the username
  const username = "user1";
  const ingredientListCount: any = useRef(0);

  // fetch tags from db and add it to the tag options
  // also fetch userID from username saved in localstorage

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("https://recipyb-dev.herokuapp.com/api/v1/user/" + username)
        .then((res) => {
          //@ts-ignore
          setUserInfo(res.data.payload);
          // console.log("User Info: ", res.data.payload);
          setRecipeForm({
            ...recipeForm,
            userId: res.data.payload.id,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      const tagss = await axios
        .get("https://recipyb-dev.herokuapp.com/api/v1/tag")
        .then((res) => {
          // setRecipeTagsData(res.data.payload);
          // console.log("Tags: ", res.data.payload);
          return res.data.payload
        })
        .catch((err) => {
          console.log(err);
        });
      // eslint-disable-next-line
      setRecipeTagsData(tagss)

      tagOptions.current = tagss.map((tag: { id: any; name: any }) => {
        return {
          label: tag.name,
          value: tag.id,
        };
      });

      if (query.id) {
        const editRecipe = await axios
          .get("https://recipyb-dev.herokuapp.com/api/v1/recipe/" + query.id)
          .then((res) => {
            for (const index in ingredientFormData) {
              onAddBtnClick();
            }
            return res.data.payload
          })

          setRecipeForm(editRecipe)

          const recipeTags = editRecipe.tags
          let defaultTags = []
          
          for (let i in tagOptions.current) {
            for (let j in recipeTags) {
              if (tagOptions.current[i].label == recipeTags[j].name) {
                defaultTags.push({
                  label: recipeTags[i].name,
                  value: tagOptions.current[i].value
                })
              }
            }
          }

          setTagOptionsDefault(defaultTags)
      }
    }

    fetchData()
  }, [query]);

  //add new ingredient input form
  function onAddBtnClick() {
    ingredientListCount.current++;
    setIngredientList(
      ingredientList.concat(
        <IngredientInput
          key={ingredientList.length}
          index={ingredientListCount.current}
        />
      )
    );
    console.log(ingredientFormData.current);
  }

  // remove ingredient input form
  function onRemoveBtnClick() {
    if (ingredientListCount.current > 0) {
      setIngredientList(ingredientList.slice(0, -1));
      ingredientFormData.current.ingredients.splice(0, 1);
      ingredientListCount.current--;
      console.log(ingredientFormData.current);
    }
  }

  function onCancelClick() {
    Swal.fire({
      title: "Are you sure?",
      text: "You will lose all your changes!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it!",
    }).then((result: SweetAlertResult<any>) => {
      if (result.value) {
        router.push("/");
      }
    });
  }

  function onDraftClick() {
    setRecipeForm({
      ...recipeForm,
      draft: true,
    });
    Swal.fire({
      title: "Draft your Recipe?",
      text: "You can edit and submit your recipe later.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "rgb(234 179 8)",
      cancelButtonColor: "red",
      confirmButtonText: "Yes, Draft it!",
      cancelButtonText: "Wait, I need to make changes!",
    }).then((result: SweetAlertResult<any>) => {
      if (result.value) {
        submitForm();

        router.push("/profile");
      }
    });
  }

  function onSubmitClick() {
    setRecipeForm({
      ...recipeForm,
      draft: false,
    });
    Swal.fire({
      title: "Submit your form?",
      text: "You can edit and submit your recipe later.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "rgb(59 130 246)",
      cancelButtonColor: "red",
      confirmButtonText: "Yes!",
      cancelButtonText: "Wait, I need to make changes!",
    }).then((result: SweetAlertResult<any>) => {
      if (result.value) {
        submitForm();
      }
    });
  }

  // Creates new ingredient object and adds the ingredient list
  const IngredientInput = ({ index }: any) => {
    return (
      <div className="pb-2 flex flex-row pr-[55px]">
        <input
          type="text"
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-11/12 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          style={{ flex: "2 1" }}
          placeholder="Ingredient name"
          required
          // note for Naufal: use conditional rendering if value of ingredientFormData exist from db. if theres no value or null, don't use default value
          defaultValue={
            ingredientFormData.current?.name
              ? ingredientFormData.current[index]?.name
              : ""
          }
          onChange={(e) =>
            (ingredientFormData.current.ingredients[index] = {
              ...ingredientFormData.current.ingredients[index],
              name: e.target.value,
            })
          }
        />
        <input
          type="text"
          className="ml-2 px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-11/12 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          style={{ flex: "1 1" }}
          placeholder="quantity"
          required
          // note for Naufal: use conditional rendering if value of ingredientFormData exist from db. if theres no value or null, don't use default value
          defaultValue={
            ingredientFormData.current?.qty
              ? ingredientFormData.current[index]?.qty
              : ""
          }
          onChange={(e) =>
            (ingredientFormData.current.ingredients[index] = {
              ...ingredientFormData.current.ingredients[index],
              qty: e.target.value,
            })
          }
        />
      </div>
    );
  };

  //map recipe tags into tag options
  // tagOptions.current = recipeTagsData.map((tag: { id: any; name: any }) => {
  //   return {
  //     label: tag.name,
  //     value: tag.id,
  //   };
  // });

  useEffect(() => {
    if (submitFormState) {
      uploadDatabase();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitFormState]);

  // submit form function
  function submitForm() {
    let contentValues = contentValue;
    let ingredients: any = JSON.stringify(
      ingredientFormData.current.ingredients
    );
    console.log(ingredients);
    setRecipeForm({
      ...recipeForm,
      ingredients,
      content: contentValues,
    });
    console.log(recipeForm);
    setSubmitFormState(true);
  }

  function uploadDatabase() {
    // run formValidation function
    let valid = formValidation();
    if (valid) {
      if (query.id) {
        axios
          .put(
            "https://recipyb-dev.herokuapp.com/api/v1/recipe/" +
              query.id +
              "/edit",
            recipeForm
          )
          .then((res) => {
            console.log("Recipe Updated, now uploading image");
            uploadImage(query.id);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post(
            "https://recipyb-dev.herokuapp.com/api/v1/recipe/add",
            recipeForm
          )
          .then((res) => {
            console.log("uploaded recipe, now uploading image");
            uploadImage(res.data.payload);
          })
          .catch((err) => {
            console.log(err);
          });
        setSubmitFormState(false);
      }
    }
  }
  //upload image form function
  function uploadImage(recipeId: any) {
    const formData: any = new FormData();
    console.log(imageFormData);
    formData.append("photo", imageFormData, imageFormData.name);
    console.log(formData.get(imageFormData));
    axios
      .put(
        "https://recipyb-dev.herokuapp.com/api/v1/recipe/" +
          recipeId +
          "/photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        Swal.fire({
          title: "Recipe Submitted!",
          icon: "success",
        }).then(() => router.push("/"));
      })
      .catch((err) => {
        console.log(err);
        window.alert("Failed to upload image");
      });
  }

  // translate content value to html and save it to content form
  function getHtmlContent(value: any) {
    setContentValue(value);
  }

  // note: jalan cuman sekali
  function formValidation() {
    let form = true;
    let missingFields = "There is an error with your form:";
    if (recipeForm.title === "") {
      missingFields += "<br>Title is Empty";
      form = false;
    }
    if (recipeForm?.title?.length > 140) {
      missingFields += "<br>Title has to be less than 140 characters";
      form = false;
    }
    if (recipeForm.overview === "") {
      missingFields += "<br>Overview is Empty";
      form = false;
    }
    if (recipeForm?.overview?.length > 280) {
      missingFields += "<br>Overview has to be less than 280 characters";
      form = false;
    }
    if (recipeForm.description === "") {
      missingFields += "<br>Description is Empty";
      form = false;
    }
    if (recipeForm.ingredients === "") {
      missingFields += "<br>Ingredients are Empty";
      form = false;
    }
    if (recipeForm?.tagIds?.length === 0) {
      missingFields += "<br>Tags are Empty";
      form = false;
    }
    if (recipeForm.content === "") {
      missingFields += "<br>Content is Empty";
      form = false;
    }
    // check if imageFormData uploaded is not image file
    if (
      imageFormData.type !== "image/jpeg" &&
      imageFormData.type !== "image/png"
    ) {
      missingFields += "<br>Image is not a valid image file";
      form = false;
    }
    if (imageFormData.size === 0) {
      missingFields += "<br>Image is Empty";
      form = false;
    }
    if (recipeForm.videoURL === "") {
      missingFields += "<br>Video URL is Empty";
      form = false;
    }
    // check if videoURL is a valid youtube url
    if (
      recipeForm?.videoURL?.indexOf("https://www.youtube.com/watch?v=") === -1
    ) {
      missingFields += "<br>Video URL is not a valid youtube url";
      form = false;
    }
    if (form === false) {
      Swal.fire({
        title: "Faile to Submit Recipe",
        html: missingFields,
        icon: "error",
      });
      return false;
    }
    return true;
  }

  function tagSelect(tags: any) {
    return (
      <Select
          id="tags"
          name="tags"
          isMulti
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          placeholder="Choose Recipe Tags"
          defaultValue={tags}
          options={tagOptions.current}
          onChange={(e) => (
            e.map((tag: any) => {
              tagInput.push(tag.value);
            }),
            setRecipeForm({
              ...recipeForm,
              tagIds: tagInput,
            })
          )}
        />
    )
  }

  return (
    <>
      <Navbar />
      <div
        className="py-6 bg-repeat bg-auto 
      bg-[url('https://previews.123rf.com/images/redspruce/redspruce1409/redspruce140900015/32280224-doodle-food-icons-seamless-background.jpg')]"
      >
        <div className="relative py-3 w-full mx-auto">
          <div className="relative max-w-2xl px-4 py-10 bg-white shadow-2xl rounded-2xl sm:p-10 mx-auto">
            <div className="max-w-lg mx-auto">
              <div className="flex flex-wrap items-center space-x-5">
                <Image
                  className="w-8 h-8 rounded-full"
                  src="/images/user-profile.png"
                  alt="user-profile"
                  width={50}
                  height={50}
                  objectFit="cover"
                />
                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                  <h1 className="leading-relaxed">{userInfo.fullName}</h1>
                  <h2 className="leading-relaxed">
                    {query.id
                      ? "Edit Recipe: " + recipeForm?.title
                      : "Create New Recipe"}
                  </h2>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <label className="leading-loose">Recipe Title</label>
                    <input
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Recipe Title"
                      defaultValue={recipeForm?.title}
                      onChange={(e) =>
                        setRecipeForm({ ...recipeForm, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Recipe Overview</label>
                    <input
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Recipe Overview"
                      defaultValue={recipeForm?.overview}
                      onChange={(e) =>
                        setRecipeForm({
                          ...recipeForm,
                          overview: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Recipe Tags</label>
                    {tagOptionsDefault.length == 0 ? "Loading.." : tagSelect(tagOptionsDefault)}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <label className="leading-loose">Ingredients</label>
                      <div className="ml-auto">
                        <IoIosAdd
                          size={20}
                          className="ml-2 cursor-pointer text-gray-600 hover:bg-gray-200"
                          onClick={() => onAddBtnClick()}
                        />
                      </div>
                      <div>
                        <IoIosRemove
                          size={20}
                          className="ml-2 cursor-pointer text-gray-600 hover:bg-gray-200"
                          onClick={() => onRemoveBtnClick()}
                        />
                      </div>
                    </div>

                    <div className="pb-2 flex flex-row pr-[55px]">
                      {/* 2 input dibawah kalau mau pake conditional rendering, kalau mau di jadiin component pisah biar gk kepanjangan*/}
                      <input
                        type="text"
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-11/12 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        // className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-11/12 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="Ingredient name"
                        required
                        style={{ flex: "2 1" }}
                        // note for Naufal: use conditional rendering if value of ingredientFormData exist from db. if theres no value or null, don't use default value
                        defaultValue={
                          // ingredientFormData?.current?.name
                          ingredientFormData?.current[0]?.name
                          // : ""
                        }
                        onChange={(e) =>
                          (ingredientFormData.current.ingredients[0] = {
                            ...ingredientFormData.current.ingredients[0],
                            name: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        className="ml-2 px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-11/12 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        // className="ml-2 px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-11/12 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="quantity"
                        required
                        style={{ flex: "1 1" }}
                        // note for Naufal: use conditional rendering if value of ingredientFormData exist from db. if theres no value or null, don't use default value
                        defaultValue={
                          ingredientFormData?.current?.qty
                            ? ingredientFormData?.current[0]?.qty
                            : ""
                        }
                        onChange={(e) =>
                          (ingredientFormData.current.ingredients[0] = {
                            ...ingredientFormData.current.ingredients[0],
                            qty: e.target.value,
                          })
                        }
                      />
                    </div>
                    {ingredientList}
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Upload Banner Image</label>
                    <input
                      type="file"
                      name="image-file"
                      onChange={(e) => {
                        //  @ts-ignore
                        setImageFormData(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">VideoURL</label>
                    <input
                      type={"url"}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Link to Video"
                      defaultValue={recipeForm?.videoURL}
                      onChange={(e) =>
                        setRecipeForm({
                          ...recipeForm,
                          videoURL: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose"> Content</label>
                    {/* {recipeForm.content? pake RCE pass props value: pake RCE ga pass props} */}
                    <RichTextEditor
                      // note for Naufal: dont forget to use conditional rendering if recipeForm.content value exist from database. check RichTextEditor line 29.
                      value={recipeForm?.content}
                      className="pb-14"
                      getHtmlContent={getHtmlContent}
                    />
                  </div>
                </div>
                <div className="pt-4 flex items-center space-x-4">
                  <button
                    className="bg-red-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                    onClick={onCancelClick}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-yellow-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                    onClick={onDraftClick}
                  >
                    Draft
                  </button>
                  <button
                    className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                    onClick={onSubmitClick}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <style>
        {`
          .public-DraftEditor-content * {
            font-size: revert !important;
          }
          .public-DraftStyleDefault-ol {
            list-style-type: decimal !important;
            margin-left: 20px !important;
          }
          .public-DraftStyleDefault-ul {
            list-style: inherit !important;
            margin-left: 20px !important;
          }
        `}
      </style>
    </>
  );
}
