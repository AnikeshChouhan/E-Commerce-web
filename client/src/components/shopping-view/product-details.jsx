import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";

export function ProductsDetailDialog({ open, setOpen, productDetails }) {
  return (
    <Dialog open={open} setOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:mx-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          {/* {console.log(productDetails)} */}
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-lg font-medium mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`${
                productDetails?.salePrice > 0 ? "line-through" : ""
              } text-3xl font-bold text-primary`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                {" "}
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="mt-5">
            <Button className="w-full">Add to Card</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
