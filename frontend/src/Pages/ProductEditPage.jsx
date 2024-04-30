import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductDetail } from "@/features/ProductSlice";
import {
  fetchUpdateProduct,
  resetUpdateProduct,
} from "@/features/AdminProductSlice";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Loader from "@/components/Loader/Loader";
import { toast } from "react-toastify";

function ProductEditPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const userInfo = useSelector((state) => state.user.userInfo);
  const product = useSelector((state) => state.product.productDetail);
  const productDetailStatus = useSelector(
    (state) => state.product.productDetailStatus
  );
  const updateProductStatus = useSelector(
    (state) => state.adminProduct.updateProductStatus
  );

  useEffect(() => {
    if (userInfo && userInfo.is_staff) {
      dispatch(fetchProductDetail(id));
    } else {
      navigate("/");
    }
  }, [dispatch, id, userInfo, navigate]);

  useEffect(() => {
    if (updateProductStatus === "succeeded") {
      toast.success("Product updated successfully");
      dispatch(resetUpdateProduct());
    } else if (updateProductStatus === "failed") {
      toast.error("Update failed");
      dispatch(resetUpdateProduct());
    }
  }, [updateProductStatus, dispatch, navigate]);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(product ? product.name : "");
    setPrice(product ? product.price : "");
    setBrand(product ? product.brand : "");
    setCategory(product ? product.category : "");
    setCountInStock(product ? product.countInStock : "");
    setDescription(product ? product.description : "");
  }, [product]);

  const updateHandler = () => {
    if (!name || !image || !price || !brand || !category || !countInStock) {
      toast.warning("Please fill all the fields");
      return;
    } else if (countInStock < 0) {
      toast.warning("Count in stock cannot be negative");
      return;
    } else if (price < 0) {
      toast.warning("Price cannot be negative");
      return;
    } else {
      dispatch(
        fetchUpdateProduct({
          name: name,
          image: image,
          price: price,
          brand: brand,
          category: category,
          countInStock: countInStock,
          description: description,
          id: id,
        })
      );
    }
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith("image/")) {
      setImage(file);
    } else {
      toast.warning("Please select an image file");
    }
  };
  return (
    <div className="w-[95%] mx-auto border-2 rounded-lg mt-8 p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Product Edit</h1>
      {productDetailStatus === "loading" ? (
        <Loader />
      ) : productDetailStatus === "succeeded" ||
        productDetailStatus === "idle" ? (
        <div className="space-y-4 mb-4">
          <div className="grid gap-2 ">
            <Label className="md:text-base" htmlFor="name">
              Product Name
            </Label>
            <Input
              id="name"
              type="name"
              placeholder="Product Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="md:text-base"
            />
          </div>
          <div className="grid gap-2">
            <Label className="md:text-base" htmlFor="image">
              Product Image
            </Label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              label="Upload Image"
              onChange={(e) => imageHandler(e)}
              className="block w-full text-primary font-semibold file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground file:hover:cursor-pointer hover:file:bg-primary/90 file:disabled:opacity-50  file:disabled:pointer-events-none cursor-pointer"
            />
          </div>
          <div className="grid gap-2 ">
            <Label className="md:text-base" htmlFor="price">
              Product Price
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="Product Price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="md:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <div className="grid gap-2">
            <Label className="md:text-base" htmlFor="brand">
              Product Brand
            </Label>
            <Input
              id="brand"
              type="brand"
              placeholder="Product Brand"
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
              className="md:text-base"
            />
          </div>
          <div className="grid gap-2">
            <Label className="md:text-base" htmlFor="category">
              Product Category
            </Label>
            <Input
              id="category"
              type="category"
              placeholder="Product Category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="md:text-base"
            />
          </div>
          <div className="grid gap-2">
            <Label className="md:text-base" htmlFor="countInStock">
              Product Stock
            </Label>
            <Input
              id="countInStock"
              type="number"
              placeholder="Product Stock"
              onChange={(e) => setCountInStock(e.target.value)}
              value={countInStock}
              className="md:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <div className="grid gap-2">
            <Label className="md:text-base" htmlFor="description">
              Product Description
            </Label>
            <Textarea
              id="description"
              type="description"
              placeholder="Product Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="md:text-base resize-none"
              rows={12}
            />
            <Button className="w-full md:text-base" onClick={updateHandler}>
              Update
            </Button>
            <Button
              className="w-full md:text-base"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ProductEditPage;
