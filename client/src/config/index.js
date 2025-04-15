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

export const addproductFormElement = [
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
    name: "categroy",
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
