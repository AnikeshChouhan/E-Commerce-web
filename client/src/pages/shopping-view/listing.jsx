import { ProductsDetailDialog } from "@/components/shopping-view/product-details";
import { ShoppingProductTile } from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import {
  fetchAllFilteredProducts,
  fetchProductsDetails,
} from "@/store/shop/products-slice";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ProductFilter } from "../../components/shopping-view/filter";

export const ShoppingListing = () => {
  const [filters, setFilter] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailDialog, setOpenDetailDialog] = useState(false);

  const dispatch = useDispatch();
  const { productsList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  function handleSort(value) {
    setSort(value);
  }
  function createSearchParamsHelpers(filterParams) {
    const queryParams = [];
    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }

    return queryParams.join("&");
  }
  function handleGetProductsDetails(currentId) {
    dispatch(fetchProductsDetails(currentId));
  }

  function handleFilter(getSectionId, getCurrentoption) {
    let cpyFilters = { ...filters };

    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentoption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentoption);
      if (indexOfCurrentOption === -1) {
        cpyFilters[getSectionId].push(getCurrentoption);
      } else {
        cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }
    setFilter(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }
  //fetch list of Products
  useEffect(() => {
    setSort("price-lowtohigh");
    setFilter(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelpers(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters && sort) {
      dispatch(
        fetchAllFilteredProducts({
          filterParams: filters,
          sortParams: sort,
        })
      );
    }
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailDialog(true);
    }
  }, [productDetails]);
  // console.log("productsDetails", productDetails);
  return (
    <div
      onClick={() => setOpenDetailDialog(false)}
      className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6"
    >
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background rounded-lg w-full shadow-sm">
        <div className="p-4 border-b flex gap-3 items-center justify-between">
          <h2 className="text-lg font-extrabold">All Product</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productsList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  onValueChange={(value) => handleSort(value)}
                >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <ProductsDetailDialog
          open={openDetailDialog}
          setOpen={setOpenDetailDialog}
          productDetails={productDetails}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productsList && productsList.length > 0
            ? productsList.map((productItem) => (
                <ShoppingProductTile
                  handleGetProductsDetails={handleGetProductsDetails}
                  key={productItem.id}
                  product={productItem}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
