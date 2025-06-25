'use client'
import { WishlistProvider } from '../context/WishlistContext'
import { CartProvider } from '../context/CartContext'
import { UserProvider } from '../context/UserContext'

export default function Providers({ children }) {
  return (
    <UserProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </CartProvider>
    </UserProvider>
  )
}