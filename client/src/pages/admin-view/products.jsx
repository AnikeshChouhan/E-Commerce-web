import { Fragment, useState } from "react";
import { ProductImageUpload } from "../../components/admin-view/image-upload";
import { CommonForm } from "../../components/common/form";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import { addproductFormElement } from "../../config";
const initialFormData = {
  image: "",
  title: "",
  description: "",
  categroy: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};
export const AdminProducts = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const onSumbit = () => {};
  return (
    <Fragment>
      <div className="flex justify-end mb-5 w-full ">
        <Button
          className="cursor-pointer"
          onClick={(isOpen) => {
            setOpenCreateProductDialog(isOpen);
          }}
        >
          Add new Products
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 "></div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={(isOpen) => {
          setOpenCreateProductDialog(isOpen);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          {" "}
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <div className="p-6">
            {" "}
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
            />
          </div>
          <div className="p-6">
            <CommonForm
              formControls={addproductFormElement}
              formData={formData}
              setFormData={setFormData}
              onSumbit={onSumbit}
              buttonText={"Add"}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};
