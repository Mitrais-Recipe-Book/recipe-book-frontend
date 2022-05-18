import Footer from "@components/Footer";
import Image from "next/image";
import Navbar from "@components/Navbar";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import Select from "react-select";

import RichTextEditor from "@components/RichTextEditor";

export default function CreateRecipe() {
  const [userInfo, setUserInfo]: any = useState({});
  const [recipeForm, setRecipeForm]: any = useState({
    draft: true,
  });
  const [ingredientList, setIngredientList]: any = useState([]);
  const [submit, setSubmit]: any = useState(false);
  const [imageFormData, setImageFormData]: any = useState({});
  const [recipeTagsData, setRecipeTagsData]: any = useState([]);
  // const [ingredientFormData, setIngredientFormData]: any = useState({
  //   ingredients: new Array(),
  // });
  const ingredientFormData: any = useRef({
    ingredients: [],
  });
  let tagOptions: any = [];
  const tagInput: any = [];
  const username = "user1";
  const ingredientListCount: any = useRef(0);

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
    console.log(ingredientListCount.current);
  }

  function onRemoveBtnClick() {
    if (ingredientListCount.current > 0) {
      setIngredientList(ingredientList.slice(0, -1));
      ingredientFormData.current.ingredients.splice(0, 1);
      ingredientListCount.current--;
    }
  }

  const IngredientInput = ({ index }: any) => {
    return (
      <div className="pb-2 flex flex-row pr-[55px]">
        <input
          type="text"
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-11/12 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          style={{ flex: "2 1" }}
          placeholder="Ingredient name"
          required
          onChange={(e) => {
            ingredientFormData.current.ingredients[index] = {
              ...ingredientFormData.current.ingredients[index],
              name: e.target.value,
            };
            console.log(index);
          }}
        />
        <input
          type="text"
          className="ml-2 px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-11/12 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          style={{ flex: "1 1" }}
          placeholder="quantity"
          required
          onChange={(e) => {
            ingredientFormData.current.ingredients[index] = {
              ...ingredientFormData.current.ingredients[index],
              qty: e.target.value,
            };
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    axios
      .get("https://recipyb-dev.herokuapp.com/api/v1/user/" + username)
      .then((res) => {
        //@ts-ignore
        setUserInfo(res.data.payload);
        console.log("User Info: ", res.data.payload);
        setRecipeForm({
          ...recipeForm,
          userId: res.data.payload.id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("https://recipyb-dev.herokuapp.com/api/v1/tag")
      .then((res) => {
        setRecipeTagsData(res.data.payload);
        console.log("Tags: ", res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleButton() {
    let ingredients: any = JSON.stringify(
      ingredientFormData.current.ingredients
    );
    setRecipeForm({
      ...recipeForm,
      userId: userInfo.id,
      draft: false,
      ingredients,
    });
    console.log(recipeForm);
    console.log("ingredient form data", ingredientFormData.current);
    console.log(ingredientListCount);
    handleSubmit();
    setSubmit(false);
  }

  tagOptions = recipeTagsData.map((tag: { id: any; name: any }) => {
    return {
      label: tag.name,
      value: tag.id,
    };
  });

  function handleSubmit() {
    axios
      .post("https://recipyb-dev.herokuapp.com/api/v1/recipe/add", recipeForm)
      .then((res) => {
        console.log("uploaded recipe, now uploading image");
        uploadImage(res.data.payload.recipeId);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function uploadImage(recipeId: any) {
    const formData = new FormData();
    formData.append(
      recipeForm.title + "-photo",
      imageFormData,
      imageFormData.name
    );
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
        // console.log(res);
        // setModalImage(false);
        setImageFormData({});
        window.alert("Successfully upload image");
        // dispatch(setUserImage());
      })
      .catch((err) => {
        console.log(err);
        window.alert("Failed to upload image");
      });
  }

  function getHtmlContent(content: any) {
    setRecipeForm({
      ...recipeForm,
      content: content,
    });
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
                  <h2 className="leading-relaxed">Create New Recipe</h2>
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
                      onChange={(e) => {
                        setRecipeForm({ ...recipeForm, title: e.target.value });
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Recipe Overview</label>
                    <input
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Recipe Overview"
                      onChange={(e) => {
                        setRecipeForm({
                          ...recipeForm,
                          overview: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Recipe Tags</label>
                    <Select
                      id="tags"
                      name="tags"
                      isMulti
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Choose Recipe Tags"
                      options={tagOptions}
                      onChange={(e) => {
                        e.map((i: any) => {
                          tagInput.push(i.value);
                        });
                        setRecipeForm({
                          ...recipeForm,
                          tagIds: tagInput,
                        });
                      }}
                    />
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
                      <input
                        type="text"
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-11/12 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        // className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-11/12 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="Ingredient name"
                        required
                        style={{ flex: "2 1" }}
                        onChange={(e) => {
                          ingredientFormData.current.ingredients[0] = {
                            ...ingredientFormData.current.ingredients[0],
                            name: e.target.value,
                          };
                        }}
                      />
                      <input
                        type="text"
                        className="ml-2 px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-11/12 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        // className="ml-2 px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-11/12 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="quantity"
                        required
                        style={{ flex: "1 1" }}
                        onChange={(e) => {
                          ingredientFormData.current.ingredients[0] = {
                            ...ingredientFormData.current.ingredients[0],
                            qty: e.target.value,
                          };
                        }}
                      />
                    </div>
                    {ingredientList}
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Upload Banner Image</label>
                    <input type="file" />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">VideoURL</label>
                    <input
                      type={"url"}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Link to Video"
                      onChange={(e) => {
                        setRecipeForm({
                          ...recipeForm,
                          videoURL: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose"> Content</label>
                    <RichTextEditor
                      className="pb-14"
                      getHtmlContent={getHtmlContent}
                    />
                  </div>
                </div>
                <div className="pt-4 flex items-center space-x-4">
                  <button className="bg-red-500 flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                    Cancel
                  </button>
                  <button className="bg-yellow-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
                    Draft
                  </button>
                  <button
                    className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                    onClick={() => handleButton()}
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
