import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";
import { Item, Picker, Select, Button, Box, Image } from "native-base";
// import FormContainer from "../Shared/Form/FormContainer";
// import Input from "../Shared/Form/Input";
// import EasyButton from "../Shared/StyledComponents/EasyButton";
// import Error from "../Shared/Error";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import FormContainer from "../../components/FormContainer";
import Input from "../../components/Input";

const ProductFormScreen = (props) => {
  const [selectValue, setSelectValue] = useState();
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [images, setImages] = useState([]); //images
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [countInStock, setCountInStock] = useState();
  const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeature] = useState(false);
  const [richDescription, setRichDescription] = useState();
  const [numReviews, setNumReviews] = useState(0);
  const [item, setItem] = useState(null); // the item will come from the listItem.js inside admin after we press on each product for Edit

  // useEffect(() => {
  //   // 5 editing product procress, 5-1 check if item is exist
  //   if (!props.route.params) {
  //     setItem(null); // if there no change, then setItem stays as it is
  //   } else {
  //     //if we have change, then the form before update (when you open it for update) populates with these data below :)
  //     setItem(props.route.params.item); // itme comes from listItme.js, it means do edit for this item
  //     setBrand(props.route.params.item.brand);
  //     setName(props.route.params.item.name);
  //     setPrice(props.route.params.item.price.toString());
  //     setDiscount(props.route.params.item.discount);
  //     setDescription(props.route.params.item.description);
  //     setMainImage(props.route.params.item.image);
  //     setImage(props.route.params.item.image);
  //     // setImages(props.route.params.item.images); //images
  //     setCategory(props.route.params.item.category._id);
  //     setCountInStock(props.route.params.item.countInStock.toString());
  //   }
  //   // 4-3
  //   AsyncStorage.getItem("jwt")
  //     .then((res) => {
  //       setToken(res);
  //     })
  //     .catch((error) => console.log(error));

  //   // 1- Categories
  //   axios
  //     .get(`${baseURL}categories`)
  //     .then((res) => setCategories(res.data))
  //     .catch((error) => alert("Error to load categories"));

  //   // 2- Image Picker
  //   (async () => {
  //     if (Platform.OS !== "web") {
  //       const { status } = await ImagePicker.requestCameraPermissionsAsync();
  //       if (status !== "granted") {
  //         alert("Sorry, we need camera roll permissions to make this work!");
  //       }
  //     }
  //   })();

  //   return () => {
  //     setCategories([]);
  //   };
  // }, []);

  // 3- (2 and 3 have link together)
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setMainImage(result.assets[0].uri); //this becomes image on the mobile screen
      setImage(result.assets[0].uri); // this is sent by URL to the server and it saved there
      // setImages(result.uri);
    }
  };

  const pickImage2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImages(result.uri);
    }
  };

  // 4 uploading a new product (doesnt have link with 1,2,3)
  const addProduct = () => {
    // do validation first
    if (
      name == "" ||
      brand == "" ||
      price == "" ||
      description == "" ||
      category == "" ||
      countInStock == ""
    ) {
      setError("Please fill in the form correctly");
    }

    // 4-1 backend accepts formData, so we have to append the data via formData
    let formData = new FormData();
    const newImageUri = "file:///" + image.split("file:/").join("");

    // formData.append("name", name);

    // 4-5
    formData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(), //it cleans the image from all the extentions and only name will remain
    });
    formData.append("image", [
      {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop(), //it cleans the image from all the extentions and only name will remain
      },
    ]);

    //               key    value
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("countInStock", countInStock);
    formData.append("richDescription", richDescription);
    formData.append("rating", rating);
    formData.append("numReviews", numReviews);
    formData.append("isFeatured", isFeatured);
    // 4-2
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    console.log(formData);

    // 4-4-2 the API call using AXIOS, first we did post then put
    if (item !== null && images.length == 0) {
      // 5-2 THIS FUCKING item which comes from the listItem.js after pressing EDIT, so if this item is not null
      // API                               , data you want to upload
      axios
        .put(`${baseURL}products/${item.id}`, formData, config)
        .then((res) => {
          console.log(res);
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              // text1: "Product successfuly updated",
              // text2: "",
            });
            setTimeout(() => {
              props.navigation.navigate("Products");
            }, 500);
          }
        })
        .catch((error) => {
          console.log(error);
          Toast.show({
            topOffset: 60,
            type: "error",
            // text1: "Something went wrong",
            // text2: "Please try again",
          });
        });
    } else if (item !== null && images.length !== 0) {
      // 5-2 THIS FUCKING item which comes from the listItem.js after pressing EDIT, so if this item is not null
      // API                               , data you want to upload
      axios
        .put(`${baseURL}products/gallery-images/${item.id}`, formData, config)

        // axios
        //   .put(`${baseURL}products/${item.id}`, formData, config)
        .then((res) => {
          console.log("ressssssssssssssssssssssssss");
          console.log(res);
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              // text1: "Product successfuly updated",
              // text2: "",
            });
            setTimeout(() => {
              props.navigation.navigate("Products");
            }, 500);
          }
        })
        .catch((error) => {
          console.log(error);
          Toast.show({
            topOffset: 60,
            type: "error",
            // text1: "Something went wrong",
            // text2: "Please try again",
          });
        });
    } else {
      // 4-4-1
      axios
        .post(`${baseURL}products`, formData, config)
        .then((res) => {
          console.log("res of add produccccccccccccccccct");
          console.log(res);
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              // text1: "New Product added",
              // text2: "",
            });
            setTimeout(() => {
              props.navigation.navigate("Products");
            }, 500);
          }
        })
        .catch((error) => {
          console.log(error);
          Toast.show({
            topOffset: 60,
            type: "error",
            // text1: "Something went wrong",
            // text2: "Please try again",
          });
        });
    }
  };
  console.log("product creationnnnnnnnn");
  // console.log(setItem.id);
  // console.log(item.id);

  console.log("hi kase xare");
  console.log(images);
  console.log(images.length);
  console.log(image);
  // console.log(images.length);
  // console.log(setImages);
  // const deleteFileHandler = async (fileName) => {
  //   setImages(images.filter((x) => x !== fileName));
  //   console.log("hi");
  // };
  // the UI
  console.log("hi kase xare 22222222222222222");
  console.log(setMainImage);
  // console.log(props.route.params.item.image);

  return (
    // <Text>Hi kaka</Text>
    <FormContainer title="Add Product">
      {/* <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          // source={{ uri: mainImage }}
          source={{
            uri: props.route.params.item.image,
          }}
          resizeMode="contain"
          alt={"image"}
        />
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Icon style={{ color: "white" }} name="camera" />
        </TouchableOpacity>
      </View> */}

      {/* additinal image */}
      {/* {item !== null ? (
        <View>
          <View>
            <View style={styles.label}>
              <Text style={{ textDecorationLine: "underline" }}>
                Additional Images
              </Text>
            </View>

            <TextInput
              type="file"
              placeholder="image"
              name="image"
              id="image"
              value={images}
            />

            {images.length === 0 && <Text>No image kako</Text>}

            <TouchableOpacity onPress={pickImage2} style={styles.imagePicker}>
              <Icon style={{ color: "white" }} name="camera" />
            </TouchableOpacity>
          </View>
        </View>
      ) : null} */}

      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Brand</Text>
      </View>
      <Input
        placeholder="Brand"
        name="brand"
        id="brand"
        value={brand}
        onChangeText={(text) => setBrand(text)}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Name</Text>
      </View>
      <Input
        placeholder="Name"
        name="name"
        id="name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Price</Text>
      </View>
      <Input
        placeholder="Price"
        name="price"
        id="price"
        value={price}
        keyboardType={"numeric"}
        onChangeText={(text) => setPrice(text)}
      />

      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Discount</Text>
      </View>
      <Input
        placeholder="Discount Rate"
        name="discount"
        id="discount"
        value={discount}
        keyboardType={"numeric"}
        onChangeText={(text) => setDiscount(text)}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Count in Stock</Text>
      </View>
      <Input
        placeholder="Stock"
        name="stock"
        id="stock"
        value={countInStock}
        keyboardType={"numeric"}
        onChangeText={(text) => setCountInStock(text)}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Description</Text>
      </View>
      <Input
        placeholder="Description"
        name="description"
        id="description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Box w="3/4" maxW="300">
        <Select
          iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
          style={{ width: undefined }}
          placeholder="Select your Category"
          selectedValue={selectValue}
          placeholderStyle={{ color: "#007aff" }}
          placeholderIconColor="#007aff"
          onValueChange={(e) => [setSelectValue(e), setCategory(e)]}
        >
          {categories.map((c) => {
            return <Select.Item key={c.id} label={c.name} value={c.id} />;
          })}
        </Select>
      </Box>

      {err ? <Error message={err} /> : null}
      <View style={styles.buttonContainer}>
        {/* <EasyButton large primary onPress={() => addProduct()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </EasyButton> */}
        <Button large primary onPress={() => addProduct()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </Button>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    width: "80%",
    marginTop: 10,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 80,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#E0E0E0",
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});

// export default ProductForm;
export default ProductFormScreen;




// ///////////////////
// <Text>Hi kaka</Text>
<FormContainer title="Add Product">
{/* <View style={styles.imageContainer}>
  <Image
    style={styles.image}
    // source={{ uri: mainImage }}
    source={{
      uri: props.route.params.item.image,
    }}
    resizeMode="contain"
    alt={"image"}
  />
  <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
    <Icon style={{ color: "white" }} name="camera" />
  </TouchableOpacity>
</View> */}

{/* additinal image */}
{/* {item !== null ? (
  <View>
    <View>
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>
          Additional Images
        </Text>
      </View>

      <TextInput
        type="file"
        placeholder="image"
        name="image"
        id="image"
        value={images}
      />

      {images.length === 0 && <Text>No image kako</Text>}

      <TouchableOpacity onPress={pickImage2} style={styles.imagePicker}>
        <Icon style={{ color: "white" }} name="camera" />
      </TouchableOpacity>
    </View>
  </View>
) : null} */}

<View style={styles.label}>
  <Text style={{ textDecorationLine: "underline" }}>Brand</Text>
</View>
<Input
  placeholder="Brand"
  name="brand"
  id="brand"
  value={brand}
  onChangeText={(text) => setBrand(text)}
/>
<View style={styles.label}>
  <Text style={{ textDecorationLine: "underline" }}>Name</Text>
</View>
<Input
  placeholder="Name"
  name="name"
  id="name"
  value={name}
  onChangeText={(text) => setName(text)}
/>
<View style={styles.label}>
  <Text style={{ textDecorationLine: "underline" }}>Price</Text>
</View>
<Input
  placeholder="Price"
  name="price"
  id="price"
  value={price}
  keyboardType={"numeric"}
  onChangeText={(text) => setPrice(text)}
/>

<View style={styles.label}>
  <Text style={{ textDecorationLine: "underline" }}>Discount</Text>
</View>
<Input
  placeholder="Discount Rate"
  name="discount"
  id="discount"
  value={discount}
  keyboardType={"numeric"}
  onChangeText={(text) => setDiscount(text)}
/>
<View style={styles.label}>
  <Text style={{ textDecorationLine: "underline" }}>Count in Stock</Text>
</View>
<Input
  placeholder="Stock"
  name="stock"
  id="stock"
  value={countInStock}
  keyboardType={"numeric"}
  onChangeText={(text) => setCountInStock(text)}
/>
<View style={styles.label}>
  <Text style={{ textDecorationLine: "underline" }}>Description</Text>
</View>
<Input
  placeholder="Description"
  name="description"
  id="description"
  value={description}
  onChangeText={(text) => setDescription(text)}
/>
<Box w="3/4" maxW="300">
  <Select
    iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
    style={{ width: undefined }}
    placeholder="Select your Category"
    selectedValue={selectValue}
    placeholderStyle={{ color: "#007aff" }}
    placeholderIconColor="#007aff"
    onValueChange={(e) => [setSelectValue(e), setCategory(e)]}
  >
    {categories.map((c) => {
      return <Select.Item key={c.id} label={c.name} value={c.id} />;
    })}
  </Select>
</Box>

{err ? <Error message={err} /> : null}
<View style={styles.buttonContainer}>
  {/* <EasyButton large primary onPress={() => addProduct()}>
    <Text style={styles.buttonText}>Confirm</Text>
  </EasyButton> */}
  <Button large primary onPress={() => addProduct()}>
    <Text style={styles.buttonText}>Confirm</Text>
  </Button>
</View>
</FormContainer>
);