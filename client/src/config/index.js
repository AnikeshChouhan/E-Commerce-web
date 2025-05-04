export const registerFormControl = [
  {
    name: "userName",
    label: "userName",
    placeholder: "Enter Your User Name ",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your Email Id  ",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your Password ",
    componentType: "input",
    type: "password",
  },
];
export const loginFormControl = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your Email Id  ",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your Password ",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElement = [
  {
    label: "title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title ",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      {
        id: "men",
        label: "Men",
      },
      {
        id: "women",
        label: "Women",
      },
      {
        id: "kids",
        label: "Kids",
      },
      {
        id: "accessories",
        label: "Accessories",
      },
      {
        id: "footwear",
        label: "Footwear",
      },
      {
        id: "apple-phone",
        label: "Apple Phone",
      },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      {
        id: "nike",
        label: "Nike",
      },
      {
        id: "apple",
        label: "Apple",
      },
      {
        id: "adidas",
        label: "Adidas",
      },
      {
        id: "puma",
        label: "Puma",
      },
      {
        id: "levi",
        label: "Levi",
      },
      {
        id: "zara",
        label: "Zara",
      },
      {
        id: "h&m",
        label: "H&M",
      },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price ",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter salePrice(Optional) ",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter Total Stock",
  },
];
export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/list",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/list",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/list",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/list",
  },
  {
    id: "apple",
    label: "Apple",
    path: "/shop/list",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/list",
  },
];

export const categoryOptionsMap = {
  men: "Men",

  women: "Women",

  kids: "Kids",

  accessories: "Accessories",

  "Apple Phone": "Apple Phone",

  footwear: "Footwear",
};

export const brandOptionsMap = {
  nike: "Nike",

  adidas: "Adidas",

  puma: "Puma",

  levi: "Levi",

  apple: "Apple",

  zara: "Zara",

  "h&m": "H&M",
};
export const filterOptions = {
  category: [
    {
      id: "men",
      label: "Men",
    },
    {
      id: "women",
      label: "Women",
    },
    {
      id: "kids",
      label: "Kids",
    },
    {
      id: "accessories",
      label: "Accessories",
    },
    {
      id: "apple",
      label: "Apple",
    },

    {
      id: "footwear",
      label: "Footwear",
    },
  ],
  brand: [
    {
      id: "nike",
      label: "Nike",
    },
    {
      id: "adidas",
      label: "Adidas",
    },
    {
      id: "puma",
      label: "Puma",
    },
    {
      id: "levi",
      label: "Levi",
    },
    {
      id: "zara",
      label: "Zara",
    },
    {
      id: "h&m",
      label: "H&M",
    },
  ],
};

export const sortOptions = [
  {
    id: "price-lowtohigh",
    label: "Price : Low to High",
  },
  {
    id: "price-hightolow",
    label: "Price : High to Low",
  },
  {
    id: "title-atoz",
    label: "Price : A to Z",
  },
  {
    id: "title-ztoa",
    label: "Price : Z to A",
  },
];
