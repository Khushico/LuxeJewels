'use client'
import { createContext, useContext, useState, useEffect } from 'react'

 export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock user data for demo
  const mockUser = {
    id: 1,
    name: 'Elena Rodriguez',
    email: 'elena@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    memberSince: '2023',
    orders: 12,
    points: 2450
  }

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('giva-user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('giva-user', JSON.stringify(user))
    } else {
      localStorage.removeItem('giva-user')
    }
  }, [user])

  const login = async (email, password) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setUser(mockUser)
    setIsLoading(false)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('giva-user')
    localStorage.removeItem('giva-cart')
    localStorage.removeItem('giva-wishlist')
  }

  const register = async (userData) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newUser = {
      ...mockUser,
      name: userData.name,
      email: userData.email
    }
    setUser(newUser)
    setIsLoading(false)
    return { success: true }
  }

  const updateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }))
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    updateProfile
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}