import { AuthProvider } from "@/contexts/authContext"
import React from "react"

const providers = ({children}: {children: React.ReactNode}) => {
  return (
    <AuthProvider>{children}</AuthProvider>
  )
}

export default providers