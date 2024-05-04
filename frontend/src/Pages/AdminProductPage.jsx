import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAdminProducts,
  fetchDeleteProduct,
  resetDeleteProduct,
  fetchCreateProduct,
  resetCreateProduct,
} from "@/features/AdminProductSlice";
import CustomPagination from "@/components/CustomPagination";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Pencil, Trash } from "lucide-react";
import { toast } from "react-toastify";
import CustomImage from "@/components/CustomImage";
import AdminProductLoader from "@/components/PageLoader/AdminProductLoader";

function AdminProductPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  let keyword = location.search;

  const userInfo = useSelector((state) => state.user.userInfo);
  const userDetails = useSelector((state) => state.user.userDetails);
  const adminProducts =
    useSelector((state) => state.adminProduct.adminProducts) || {};
  const createProduct =
    useSelector((state) => state.adminProduct.createProduct) || {};
  const adminProductsStatus = useSelector(
    (state) => state.adminProduct.adminProductsStatus
  );
  const deleteProductStatus = useSelector(
    (state) => state.adminProduct.deleteProductStatus
  );
  const createProductStatus = useSelector(
    (state) => state.adminProduct.createProductStatus
  );

  const products = adminProducts.products || [];
  const page = adminProducts.page || 1;
  const pages = adminProducts.pages || 1;
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    if (userInfo && userInfo.is_staff) {
      dispatch(fetchAdminProducts());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, userDetails]);

  useEffect(() => {
    dispatch(fetchAdminProducts(keyword));
  }, [dispatch, currentPage, deleteProductStatus]);

  useEffect(() => {
    if (deleteProductStatus === "succeeded") {
      toast.success("Product deleted successfully");
      dispatch(resetDeleteProduct());
    } else if (deleteProductStatus === "failed") {
      toast.error("Something went wrong");
      dispatch(resetDeleteProduct());
    }
  }, [dispatch, deleteProductStatus]);

  useEffect(() => {
    if (createProductStatus === "succeeded") {
      toast.success("Product created successfully");
      navigate(`/admin/update/product/${createProduct.id}`);
      dispatch(resetCreateProduct());
    } else if (createProductStatus === "failed") {
      toast.error("Something went wrong");
      dispatch(resetDeleteProduct());
    }
  }, [dispatch, createProductStatus]);

  const deleteHandler = (id) => {
    dispatch(fetchDeleteProduct(id));
  };
  return (
    <div className="w-[95%] min-h-[80vh] mx-auto border-2rounded-lg bg-background/70">
      {adminProductsStatus === "loading" ||
      deleteProductStatus === "loading" ||
      createProductStatus === "loading" ? (
        <AdminProductLoader />
      ) : (
        <>
          <h1 className="text-2xl font-bold text-center mt-6">Admin Product</h1>
          <Table className="mb-4">
            <TableCaption>
              <CustomPagination
                keyword="?page="
                page={currentPage}
                pages={pages}
                link="/admin/products"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32 hidden lg:table-cell">
                  Image
                </TableHead>
                <TableHead className="w-52">Name</TableHead>
                <TableHead className="w-32">Brand</TableHead>
                <TableHead className="w-32 hidden lg:table-cell">
                  Category
                </TableHead>
                <TableHead className="w-32 hidden lg:table-cell">
                  Reviews
                </TableHead>
                <TableHead className="w-32 hidden md:table-cell">
                  Rating
                </TableHead>
                <TableHead className="w-32">Price</TableHead>
                <TableHead className="w-32">Stock</TableHead>
                <TableHead className="w-32 hidden md:table-cell">
                  Edit
                </TableHead>
                <TableHead className="w-32 hidden md:table-cell">
                  Delete
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="max-h-24">
                  <TableCell className="hidden lg:table-cell">
                    <Link to={`/product/${product.id}`}>
                      <CustomImage
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-16"
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      className="w-45 line-clamp-3 hover:underline"
                      to={`/product/${product.id}`}
                    >
                      {product.name}
                    </Link>
                  </TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {product.category}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {product.numReviews}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.rating}
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Badge
                      className="text-xs"
                      variant={
                        product.countInStock >= 5
                          ? "default"
                          : product.countInStock < 5 && product.countInStock > 0
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {product.countInStock}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        navigate(`/admin/update/product/${product.id}`)
                      }
                    >
                      <Pencil />
                    </Button>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete {product.name} from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteHandler(product.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end m-4">
            <Button onClick={() => dispatch(fetchCreateProduct())}>
              Create Product
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminProductPage;
