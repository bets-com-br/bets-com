import React from 'react'
import MobileBottomNav from 'src/components/MobileBottomNav/MobileBottomNav'

const AccountLayout: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => {
  return (
    <>
      {children}
      {/* Placeholder component to compensate the height of mobile bottom navbar */}
      <div className="h-[80px] lg:hidden" />

      <MobileBottomNav />
    </>
  )
}

export default AccountLayout
