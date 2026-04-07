const NavigationData = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', value: 'top', href: '#' },
            { name: 'Dresses', value: 'women_dress', href: '#' },
            { name: 'Pants', value: 'womens_pants', href: '#' },
            { name: 'Sweaters', value: 'sweaters', href: '#' },
            { name: 'T-Shirts', value: 't-shirt', href: '#' },
            { name: 'Jackets', value: 'womens_jackets', href: '#' },
            { name: 'Activewear', value: 'activewear', href: '#' },
            { name: 'Browse All', value: 'all', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', value: 'top', href: '#' },
            { name: 'Pants', value: 'mens_pants', href: '#' },
            { name: 'Sweaters', value: 'sweaters', href: '#' },
            { name: 'T-Shirts', value: 'mens_t-shirt', href: '#' },
            { name: 'Jackets', value: 'mens_jackets', href: '#' },
            { name: 'Activewear', value: 'activewear', href: '#' },
            { name: 'Browse All', value: 'all', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
  ],
}
export default  NavigationData;