import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3 text-white'>The Cart is Empty!</div>
            </div>
        )
    }
    // const handleRemove = (index)=>{
    //   console.log(index)
    //   dispatch({type:"REMOVE",index:index})
    // }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        // console.log(data,localStorage.getItem("userEmail"),new Date())
        let response = await fetch("http://localhost:3004/api/orderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });
        console.log("JSON RESPONSE:::::", response.status)
        if (response.status === 200) {
            dispatch({ type: "DROP" })
        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div>

            {console.log(data)}
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md  text-white' >
                <table className='table table-hover text-white '>
                    <thead className=' text-success fs-4'>
                        <tr>
                            <th className='text-white' scope='col' >#</th>
                            <th className='text-white' scope='col' >Name</th>
                            <th className='text-white' scope='col' >Quantity</th>
                            <th className='text-white' scope='col' >Option</th>
                            <th className='text-white' scope='col' >Amount</th>
                            <th className='text-white' scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th className='text-white' scope='row' >{index + 1}</th>
                                <td className='text-white' >{food.name}</td>
                                <td className='text-white'>{food.qty}</td>
                                <td className='text-white'>{food.size}</td>
                                <td className='text-white'>{food.price}</td>
                                <td ><button type="button" className="btn p-0 text-white"><DeleteIcon onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
                </div>
            </div>



        </div >
    )
}