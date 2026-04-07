'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthModal from '../../../Auth/AuthModal'
import { getUserRequest } from '../../../State/Auth/Action'
import NavigationData from './NavigationData'

const navigation = () => {
  const [open, setOpen] = useState(false)
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth)
  
  // Helper function to close Auth modal
  const handleClose = () => setOpenAuthModal(false)

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("jwt")
    dispatch({ type: "LOGOUT" })
    navigate("/")
  }

  // Helper function to generate product route
  const getProductRoute = (category, section, item) => {
    const categorySlug = category.name.toLowerCase()
    const sectionSlug = section.id
    const itemSlug = item.name.toLowerCase().replace(/\s+/g, '-')
    return `/${categorySlug}/${sectionSlug}/${itemSlug}`
  }

  // Fetch user profile if JWT exists
  useEffect(() => {
    const token = localStorage.getItem("jwt")
    if(token && !auth.user){
      dispatch(getUserRequest())
    }
  }, [auth.user, dispatch])

  // Close modal and redirect after successful auth
  useEffect(() => {
    if (auth.user) {
      // Close auth modal if open
      handleClose()

      // If user just logged in from /login or /register, send them home
      if (location.pathname === "/login" || location.pathname === "/register") {
        navigate("/")
      }
    }
  }, [auth.user, location.pathname, navigate])

  // Helper function to handle navigation and close popover
  const handleNavigation = (route, closePopover) => {
    if (closePopover) closePopover()
    navigate(route)
  }

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2 ">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {NavigationData.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {NavigationData.categories.map((category) => (
                  <TabPanel key={category.name} className="space-y-10 px-4 pt-10 pb-8">
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                          />
                          <a 
                            href={`/${category.name.toLowerCase()}/${item.name.toLowerCase().replace(/\s+/g, '-')}/all`}
                            onClick={(e) => {
                              e.preventDefault()
                              navigate(`/${category.name.toLowerCase()}/${item.name.toLowerCase().replace(/\s+/g, '-')}/all`)
                              setOpen(false)
                            }}
                            className="mt-6 block font-medium text-gray-900 cursor-pointer"
                          >
                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        {(section.id === 'accessories' || section.id === 'clothing') ? (
                          <a
                            href={`/${category.name.toLowerCase()}/${section.id}/all`}
                            onClick={(e) => {
                              e.preventDefault()
                              navigate(`/${category.name.toLowerCase()}/${section.id}/all`)
                              setOpen(false)
                            }}
                            id={`${category.id}-${section.id}-heading-mobile`}
                            className="font-medium text-gray-900 hover:text-indigo-600 cursor-pointer block"
                          >
                            {section.name}
                          </a>
                        ) : (
                          <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                            {section.name}
                          </p>
                        )}
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <a 
                                href={getProductRoute(category, section, item)}
                                onClick={(e) => {
                                  e.preventDefault()
                                  navigate(getProductRoute(category, section, item))
                                  setOpen(false)
                                }}
                                className="-m-2 block p-2 text-gray-500 hover:text-gray-900 cursor-pointer"
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {NavigationData.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a 
                    href="/"
                    onClick={(e) => {
                      e.preventDefault()
                      navigate('/')
                    }}
                    className="-m-2 block p-2 font-medium text-gray-900 hover:text-indigo-600 cursor-pointer"
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            {/* My Profile avatar or SIGNIN */}
            <div className="border-t border-gray-200 px-4 py-6 flex justify-center">
              {auth.user?.firstName ? (
                <Menu as="div" className="relative z-50">
                  <MenuButton className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-medium text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border-2 border-white shadow-lg ring-2 ring-indigo-500/20">
                    {auth.user.firstName[0].toUpperCase()}
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="py-1">
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            onClick={(e) => { e.preventDefault(); navigate("/profile") }}
                            className={`block px-4 py-2 text-sm text-gray-700 ${focus ? 'bg-gray-100' : ''}`}
                          >
                            Profile
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            onClick={(e) => { e.preventDefault(); navigate("/account/order") }}
                            className={`block px-4 py-2 text-sm text-gray-700 ${focus ? 'bg-gray-100' : ''}`}
                          >
                            My Orders
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            onClick={handleLogout}
                            className={`block w-full text-left px-4 py-2 text-sm text-gray-700 ${focus ? 'bg-gray-100' : ''}`}
                          >
                            Logout
                          </button>
                        )}
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              ) : (
                <button
                  onClick={() => setOpenAuthModal(true)}
                  className="text-indigo-600 font-medium text-sm uppercase hover:text-indigo-800"
                >
                  Sign in
                </button>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a 
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                  }}
                  className="cursor-pointer"
                >
                  <span className="sr-only">Your Company</span>
                  <img
                    alt="New Logo"
                    src="https://static.vecteezy.com/system/resources/thumbnails/005/033/834/small/modern-womens-clothing-shop-logo-vector.jpg"
                    className="h-8 w-auto"
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {NavigationData.categories.map((category) => (
                    <Popover 
                      key={category.name} 
                      className="flex"
                    >
                      <div className="relative flex">
                        <PopoverButton className="group relative flex items-center justify-center text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:text-indigo-600">
                          {category.name}
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out group-data-open:bg-indigo-600"
                          />
                        </PopoverButton>
                      </div>
                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full z-20 w-full bg-white text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                      >
                        {({ close }) => (
                          <>
                            <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow-sm" />
                            <div className="relative bg-white">
                              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                  <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                    {category.featured.map((item) => (
                                      <div key={item.name} className="group relative text-base sm:text-sm">
                                        <img
                                          alt={item.imageAlt}
                                          src={item.imageSrc}
                                          className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                        />
                                        <a 
                                          href={`/${category.name.toLowerCase()}/${item.name.toLowerCase().replace(/\s+/g, '-')}/all`}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleNavigation(`/${category.name.toLowerCase()}/${item.name.toLowerCase().replace(/\s+/g, '-')}/all`, close);
                                          }}
                                          className="mt-6 block font-medium text-gray-900 cursor-pointer"
                                        >
                                          <span aria-hidden="true" className="absolute inset-0 z-10" />
                                          {item.name}
                                        </a>
                                        <p aria-hidden="true" className="mt-1">
                                          Shop now
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                    {category.sections.map((section) => (
                                      <div key={section.name}>
                                        {(section.id === 'accessories' || section.id === 'clothing') ? (
                                          <a
                                            href={`/${category.name.toLowerCase()}/${section.id}/all`}
                                            onClick={(e) => {
                                              e.preventDefault();
                                              handleNavigation(`/${category.name.toLowerCase()}/${section.id}/all`, close);
                                            }}
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900 hover:text-indigo-600 cursor-pointer block"
                                          >
                                            {section.name}
                                          </a>
                                        ) : (
                                          <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                            {section.name}
                                          </p>
                                        )}
                                        <ul
                                          role="list"
                                          aria-labelledby={`${section.name}-heading`}
                                          className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          {section.items.map((item) => (
                                            <li key={item.name} className="flex">
                                              <a 
                                                href={getProductRoute(category, section, item)}
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  handleNavigation(getProductRoute(category, section, item), close);
                                                }}
                                                className="hover:text-gray-800 cursor-pointer"
                                              >
                                                {item.name}
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </PopoverPanel>
                    </Popover>
                  ))}
                  {NavigationData.pages.map((page) => (
                    <a
                      key={page.name}
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/');
                      }}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </PopoverGroup>

              {/* Right section */}
              <div className="ml-auto flex items-center space-x-4">
                {/* My Profile avatar or SIGNIN */}

                {/* My Profile avatar or SIGNIN */}
{auth.user ? (
  <Menu as="div" className="relative z-50">
    <MenuButton className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-medium text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border-2 border-white shadow-lg ring-2 ring-indigo-500/20">
      {auth.user.firstName[0].toUpperCase()}
    </MenuButton>
    <MenuItems
      transition
      className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <div className="py-1">
        <MenuItem>
          {({ focus }) => (
            <a
              onClick={(e) => { e.preventDefault(); navigate("/profile") }}
              className={`block px-4 py-2 text-sm text-gray-700 ${focus ? 'bg-gray-100' : ''}`}
            >
              Profile
            </a>
          )}
        </MenuItem>
        <MenuItem>
          {({ focus }) => (
            <a
              onClick={(e) => { e.preventDefault(); navigate("/account/order") }}
              className={`block px-4 py-2 text-sm text-gray-700 ${focus ? 'bg-gray-100' : ''}`}
            >
              My Orders
            </a>
          )}
        </MenuItem>
        <MenuItem>
          {({ focus }) => (
            <button
              onClick={handleLogout}
              className={`block w-full text-left px-4 py-2 text-sm text-gray-700 ${focus ? 'bg-gray-100' : ''}`}
            >
              Logout
            </button>
          )}
        </MenuItem>
      </div>
    </MenuItems>
  </Menu>
) : (
  <button
    onClick={() => setOpenAuthModal(true)}
    className="text-indigo-600 font-medium text-sm uppercase hover:text-indigo-800"
  >
    Sign in
  </button>
)}



                {/* Search */}
                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                </a>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-0">
                  <a 
                    href="/cart"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/cart');
                    }}
                    className="group -m-2 flex items-center p-2 cursor-pointer"
                  >
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal handleClose={handleClose} open={openAuthModal} />
    </div>
  )
}

export default navigation
