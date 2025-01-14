import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'

const AdminPanel = () => {
  // yha se user mil rha h jo hmne store bna kr store kiya tha   
  const user=useSelector((state)=>state?.user?.user)

  return (
      
       <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
           <aside
            className='bg-white min-h-full  w-full max-w-60 customShadow' >
                 <div className='h-32 flex justify-center items-center flex-col'>
                    <div className="text-5xl cursor-pointer relative flex justify-center">
                        {   
                            user?.profilePic ? (
                                <img src={user?.profilePic} alt={user?.name} className="w-20 h-20 rounded-full"/>

                            ):
                            (
                            <FaUserCircle />
                            )
                        }
                    
                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                    </div>

                    {/* navigation */}
                    <div>
                         <nav className='grid p-4'>
                             <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
                             <Link to={"all-products"} className='px-2 py-1  hover:bg-slate-100'>All Product</Link>
                             <Link to={"all-order"} className='px-2 py-1  hover:bg-slate-100'>All Order</Link>
                         </nav>
                    </div>

                   
           </aside>

           <main className='w-full h-full p-2'>
                
                {/* maine children bnaye hue h yha jo idhr aane chahiye unko chlane k liye ye use kiya h  */}
                <Outlet/>

           </main>
       </div>
  )
}

export default AdminPanel