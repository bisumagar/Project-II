   export const FilterData = [
 

  {
    id: "color",
    name: "Color",
    type: "checkbox",
    options: [
      { value: "white", label: "White" },
      { value: "beige", label: "Beige" },
      { value: "blue", label: "Blue" },
      { value: "brown", label: "Brown" },
      { value: "green", label: "Green" },
      { value: "purple", label: "Purple" },
    ],
  },
  {
    id: "size",
    name: "Size",
    type: "checkbox",
    options: [
      { value: "2l", label: "2L" },
      { value: "6l", label: "6L" },
      { value: "12l", label: "12L" },
      { value: "18l", label: "18L" },
      { value: "20l", label: "20L" },
      { value: "40l", label: "40L" },
    ],
  },
  ];
  export const SingleFilterData = [
  
 

  {
    id: "price",
    name: "Price",
    type: "radio",
    options: [
      { value: "0-500", label: "UnderNpr 500" },
      { value: "500-1000", label: "Npr 500 - ₹1000" },
      { value: "1000-2000", label: "Npr 1000 - Npr 2000" },
      { value: "2000-3000", label: "Npr 2000 - Npr 3000" },
      { value: "3000+", label: "Above Npr 3000" },
    ],
  },

  {
    id: "discount",
    name: "Discount Range",
    type: "radio",
    options: [
      { value: "10", label: "10% And Above" },
      { value: "20", label: "20% And Above" },
      { value: "30", label: "30% And Above" },
      { value: "40", label: "40% And Above" },
      { value: "50", label: "50% And Above" },
      { value: "60", label: "60% And Above" },
      { value: "70", label: "70% And Above" },
      { value: "80", label: "80% And Above" },
    ],
  },

   {
    id: "availability",
    name: "Availability",
    type: "radio",
    options: [
      { value: "in_stock", label: "In Stock" },
      { value: "out_of_stock", label: "Out Of Stock" },
    ],
  },
];
// export default FilterData;
// export { SingleFilterData };



