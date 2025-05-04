import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// image related logic and Icon means how to look image , skeletor , remove  and drag , drop image
import { ProductImageUpload } from "../../components/admin-view/image-upload";
// here we have a Card logic
import { AdminProductTile } from "../../components/admin-view/product-tile";
import { CommonForm } from "../../components/common/form";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import { addProductFormElement } from "../../config";
// action , reducer
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "../../store/admin/Products-slice";
// initialState for Form
const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: 0,
  salePrice: 0,
  totalStock: 0,
};

export const AdminProducts = () => {
  // For Dialog
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  // FormData
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);

  const onSubmit = (event) => {
    event.preventDefault();
    try {
      currentEditedId !== null
        ? dispatch(editProduct({ id: currentEditedId, formData })).then(
            (data) => {
              if (data?.payload?.success) {
                dispatch(fetchAllProducts());
                setFormData(initialFormData);
                setOpenCreateProductDialog(false);
                setCurrentEditedId(null);
                // toast({
                //   title: "Products edited Successfully",
                //   description: "The product details have been updated.",
                // });
              }
            }
          )
        : dispatch(
            addNewProduct({
              ...formData,
              image: uploadedImageUrl,
            })
          ).then((data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setImageFile(null);
              setFormData(initialFormData);
              setOpenCreateProductDialog(false);
              // toast({
              //   title: "Products added Successfully",
              //   description: "The product details have been updated.",
              // });
            }
          });
    } catch (error) {
      console.log(error);
    }
  };

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  return (
    <Fragment>
      <div className="flex justify-end mb-5 w-full ">
        <Button
          className="cursor-pointer"
          onClick={(isOpen) => {
            setOpenCreateProductDialog(isOpen);
          }}
        >
          Add new Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {productList && productList.length > 0
          ? productList.map((productItem) => {
              return (
                <div key={productItem._id}>
                  <AdminProductTile
                    setOpenCreateProductDialog={setOpenCreateProductDialog}
                    setCurrentEditedId={setCurrentEditedId}
                    setFormData={setFormData}
                    product={productItem}
                    handleDelete={handleDelete}
                  />
                </div>
              );
            })
          : null}
      </div>

      <Sheet
        open={openCreateProductDialog}
        onOpenChange={(isOpen) => {
          setOpenCreateProductDialog(isOpen);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          {" "}
          <SheetHeader>
            <SheetTitle>
              {currentEditedId ? "Edit Data" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <div className="p-6">
            {" "}
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              imageLoadingState={imageLoadingState}
              setImageLoadingState={setImageLoadingState}
              isEditMode={currentEditedId !== null}
            />
          </div>
          <div className="p-6">
            <CommonForm
              formControls={addProductFormElement}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              buttonText={currentEditedId ? "Edit" : "Add"}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};
