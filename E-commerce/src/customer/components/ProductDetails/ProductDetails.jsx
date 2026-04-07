import { Box, Button, Grid, LinearProgress, Rating } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import mens_kurta from '../../../data/mens_kurta'
import { addItemToCart } from '../../../State/Cart/Action'
import { findProductsById } from '../../../State/Products/Action'
import HomeSectionCard from '../homeSectionCard/HomeSectionCard'
import ProductReviewCard from './ProductReviewCard'

const dummyProduct = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    colors: [
        { id: 'white', name: 'White', classes: 'bg-white checked:outline-gray-400' },
        { id: 'gray', name: 'Gray', classes: 'bg-gray-200 checked:outline-gray-400' },
        { id: 'black', name: 'Black', classes: 'bg-gray-900 checked:outline-gray-900' },
    ],
    sizes: [

        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },

    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
    const navigate=useNavigate();
    const params = useParams();
    const dispatch=useDispatch();
    const { product: productFromStore, loading } = useSelector((state) => state.product);
    // const {product}=useSelector(store=>store);

    // console.log("....",params.productId)

    const handleAddToCart = () => {
        const product = productFromStore || dummyProduct;
        const productId = product._id || product.id;
        if (!productId) return;

        if (sizesList.length > 0 && !selectedSize) {
            alert('Please select a size first');
            return;
        }

        dispatch(addItemToCart({ data: { productId, size: selectedSize, quantity: 1 } }));
        navigate('/cart');
    };
    useEffect(()=>{
        if (params.productId) {
            dispatch(findProductsById(params.productId));
        }
    },[dispatch,params.productId])

    const product = productFromStore || dummyProduct;
    const DEFAULT_SIZES = [{ name: 'S' }, { name: 'M' }, { name: 'L' }, { name: 'XL' }];
    // Normalize sizes from API (array of objects, array of strings, or comma-separated string)
    const rawSizes = product.sizes || product.availableSizes || product.sizeOptions || [];
    const normalizedSizes = Array.isArray(rawSizes) && rawSizes.length > 0
        ? rawSizes.map(s => typeof s === 'string' ? { name: s } : (s?.name ? s : { name: String(s) }))
        : (typeof rawSizes === 'string' && rawSizes ? rawSizes.split(',').map(s => ({ name: s.trim() })) : []);
    // Use API sizes only when we have 2+ options; otherwise show S, M, L, XL for selection
    const sizesList = normalizedSizes.length >= 2 ? normalizedSizes : DEFAULT_SIZES;

    const [selectedSize, setSelectedSize] = useState('');

    useEffect(() => {
        const list = (productFromStore || dummyProduct).sizes || [];
        if (list.length > 0) {
            const first = list[0];
            setSelectedSize(first?.name ?? first?.size ?? first ?? '');
        } else {
            setSelectedSize('S');
        }
    }, [params.productId, productFromStore]);

    const isFromApi = !!productFromStore;

    if (loading && !productFromStore) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <p className="text-gray-500">Loading product...</p>
            </div>
        );
    }

    const mainImage = isFromApi
        ? (product.imageUrl || product.image_url || (product.images?.[0]?.src ?? product.images?.[0]))
        : product.images?.[0]?.src;
    const imageList = isFromApi
        ? (product.images?.length ? product.images : (product.imageUrl || product.image_url) ? [{ src: product.imageUrl || product.image_url, alt: product.title || product.name }] : [])
        : (product.images || []);
    const title = product.title || product.name || '';
    const brand = product.brand || product.brandName || '';
    const priceVal = product.price ?? product.original_price;
    const discountedPriceVal = product.discountedPrice ?? product.discounted_price ?? priceVal;
    const discountPct = product.discountPersent ?? product.discount_percent ?? product.discountPercent ?? 0;
    const description = product.description || '';

    return (
        <div className="bg-white lg:px-20">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        {(product.breadcrumbs || []).map((breadcrumb) => (
                            <li key={breadcrumb.id ?? breadcrumb.name}>
                                <div className="flex items-center">
                                    <a href={breadcrumb.href || '#'} className="mr-2 text-sm font-medium text-gray-900">
                                        {breadcrumb.name}
                                    </a>
                                    <svg
                                        fill="currentColor"
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                        ))}
                        <li className="text-sm">
                            <span aria-current="page" className="font-medium text-gray-500">
                                {title || product.name}
                            </span>
                        </li>
                    </ol>
                </nav>

                <section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10'>

                    {/* Image gallery */}
                    <div className="flex flex-col items-center">
                        {mainImage && (
                            <>
                                <div className='overflow-hidden rounded-lg w-120 max-h-149'>
                                    <img
                                        alt={title || 'Product'}
                                        src={typeof mainImage === 'string' ? mainImage : mainImage?.src}
                                        className="row-span-2 aspect-3/12 size-full rounded-lg object-cover max-lg:hidden"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=No+Image'; }}
                                    />
                                </div>
                                {imageList.length > 0 && (
                                    <div className='flex flex-wrap space-x-5 justify-center mt-4'>
                                        {imageList.map((item, idx) => {
                                            const src = typeof item === 'string' ? item : (item.src || item);
                                            return (
                                                <div
                                                    key={src ?? idx}
                                                    className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-20 max-h-20'
                                                >
                                                    <img
                                                        alt={typeof item === 'object' ? (item.alt || title) : title}
                                                        src={src}
                                                        className="col-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden"
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        )}
                    </div>


                    {/* Product info */}
                    <div className="lg:col-span-1 mask-auto px-4 pb-16  sm:px-6 lg: max-w-7xl lg:px-8 lg:pb-24">
                        <div className="lg:col-span-2 ">
                            <h1 className="text-lg lg:text-xl font-semibold text-gray-900 ">
                                {brand}
                            </h1>

                            <h1 className='text-lg lg:text-xl text-gray-900 opacity-60 pt-1'>
                                {title}
                            </h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <div className='flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6'>
                                <p className='font-semibold'>
                                    {discountedPriceVal != null ? `Npr ${discountedPriceVal}` : ''}
                                </p>

                                <p className='opacity-50 line-through'>
                                    {priceVal != null ? `Npr ${priceVal}` : ''}
                                </p>

                                <p className='text-green-600 font-semibold'>
                                    {discountPct}% Off
                                </p>
                            </div>

                            {/* Reviews */}
                            <div className="mt-6">
                                <div className='flex items-center space-x-3'>
                                    <Rating name="read-only" value={product.ratings?.average ?? product.numRatings ?? 0} readOnly />
                                    <p className='opacity-50 text-sm'>{product.numRatings ?? 0} Ratings</p>
                                    <p className='ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-400'>{product.reviews?.length ?? 0} Reviews</p>
                                </div>
                            </div>

                            <form className="mt-10">
                                {/* Size selection - always shown */}
                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                    </div>
                                    <fieldset aria-label="Choose a size" className="mt-4">
                                        <div className="grid grid-cols-4 gap-3">
                                            {sizesList.map((size, idx) => {
                                                const sizeName = String(size.name ?? size.size ?? size);
                                                const isChecked = selectedSize === sizeName;
                                                return (
                                                    <label
                                                        key={size.id ?? sizeName ?? idx}
                                                        aria-label={sizeName}
                                                        className={`group relative flex items-center justify-center rounded-md border p-3 cursor-pointer ${isChecked ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-600' : 'border-gray-300 bg-white hover:border-gray-400'}`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="size"
                                                            value={sizeName}
                                                            checked={isChecked}
                                                            onChange={() => setSelectedSize(sizeName)}
                                                            disabled={size.inStock === false}
                                                            className="absolute inset-0 appearance-none focus:outline-none"
                                                        />
                                                        <span className="text-sm font-medium uppercase">{sizeName}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </fieldset>
                                </div>

                                <Button onClick={handleAddToCart} variant='contained' sx={{ px: "2rem", py: "1rem", bgcolor: "#9155fd" }} className="uppercase mt-6">
                                    Add To Cart
                                </Button>
                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
                            {/* Description and details */}
                            {description && (
                                <div>
                                    <h3 className="sr-only">Description</h3>
                                    <div className="space-y-6">
                                        <p className="text-base text-gray-900">{description}</p>
                                    </div>
                                </div>
                            )}

                            {(product.highlights || []).length > 0 && (
                                <div className="mt-10">
                                    <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                                    <div className="mt-4">
                                        <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                            {(product.highlights || []).map((highlight, idx) => (
                                                <li key={highlight ?? idx} className="text-gray-400">
                                                    <span className="text-gray-600">{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {product.details && (
                                <div className="mt-10">
                                    <h2 className="text-sm font-medium text-gray-900">Details</h2>
                                    <div className="mt-4 space-y-6">
                                        <p className="text-sm text-gray-600">{product.details}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </section>
                {/* Rating and Reviews */}
                <section >
                    <h1 className='font-semibold text-lg pb-4 '>
                        Recent Review & Rating
                    </h1>
                    <div className='border border-gray-200 p-5 '>

                        <Grid container spacing={7} className="flex justify-between pr-70 ">

                            <Grid item xs={7}>
                                <div className='space-y-5'>
                                    {[1, 1, 1].map((item, idx) => (
                                        <ProductReviewCard key={idx} />
                                    ))}
                                </div>

                            </Grid>

                            <div >
                                <Grid item xs={5}>
                                    <h1 className='text-xl font-semibold pb-2'>Product Rating</h1>

                                    <div className='flex items-center space-x-3'>
                                        <Rating value={4.6} precision={.5} readOnly />
                                        <p className='opacity-60'> 10567 Ratings</p>
                                    </div>
                                    <Box className="mt-5 space-y-2">
                                        <Box>
                                            <Box display="flex" alignItems="center" gap={2}>
                                                <Box minWidth={80}>
                                                    <p className="text-lg">Excellent</p>
                                                </Box>

                                                <Box sx={{ flexGrow: 1 }}>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={40}
                                                        color="success"
                                                        sx={{
                                                            // length:100,
                                                            height: 8,
                                                            borderRadius: 5,
                                                            backgroundColor: "#e5e7eb",
                                                        }}
                                                    />
                                                </Box>
                                            </Box>

                                            <Box display="flex" alignItems="center" gap={2}>
                                                <Box minWidth={80}>
                                                    <p className="text-lg">Very Good</p>
                                                </Box>

                                                <Box sx={{ flexGrow: 1 }}>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={30}
                                                        color="success"
                                                        sx={{
                                                            height: 8,
                                                            borderRadius: 5,
                                                            backgroundColor: "#e5e7eb",
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>

                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Box minWidth={80}>
                                                <p className="text-lg"></p>Good
                                            </Box>

                                            <Box sx={{ flexGrow: 1 }}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={25}
                                                    className='bg-yellow-300'
                                                    sx={{
                                                        height: 8,
                                                        borderRadius: 5,
                                                        backgroundColor: "#e5e7eb",
                                                    }}
                                                />
                                            </Box>
                                        </Box>

                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Box minWidth={80}>
                                                <p className="text-lg">Average</p>
                                            </Box>

                                            <Box sx={{ flexGrow: 1 }}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={15}
                                                    color="warning"
                                                    sx={{
                                                        height: 8,
                                                        borderRadius: 5,
                                                        backgroundColor: "#e5e7eb",
                                                    }}
                                                />
                                            </Box>
                                        </Box>

                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Box minWidth={80}>
                                                <p className="text-lg">Poor</p>
                                            </Box>

                                            <Box sx={{ flexGrow: 1 }}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={10}
                                                    color="error"
                                                    sx={{
                                                        height: 8,
                                                        borderRadius: 5,
                                                        backgroundColor: "#e5e7eb",
                                                    }}
                                                />
                                            </Box>



                                        </Box>

                                    </Box>


                                </Grid>

                            </div>


                        </Grid>



                    </div>
                </section>
                  {/* Similar Product */}
                <section className='pt-10'>
                    <h1 className='font-bold text-xl py-5 '> 
                        Similar Product
                    </h1>
                    <div className='flex flex-wrap flex-row justify-between space-y-5'>
                        {mens_kurta.map((item, idx) => (
                            <HomeSectionCard key={idx} product={item}/>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
