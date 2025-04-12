import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
// import Carousal from '../components/Carousal';

function Home() {
    const [search, setSearch] = useState('')
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:3004/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setFoodItem(response[0]);
        setFoodCat(response[1]);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="bg-gray-900 text-white min-h-screen bg-dark">
            <div><Navbar /></div>

            <div>
                <div>
                    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                        <div className="carousel-inner" id="carousel">
                            <div className="carousel-caption" style={{ zIndex: "10" }}>
                                <div className="d-flex justify-content-center">
                                    <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                                    <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
                                </div>
                            </div>
                            <div className="carousel-item active">
                                <img src="https://picsum.photos/400/300" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="https://picsum.photos/400/300" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="https://picsum.photos/400/300" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                <div className="container">
                    {
                        foodCat.length !== 0 ? (
                            foodCat.map((data) => {
                                return (
                                    <div className='row mb-3 gap-4' key={data._id}>
                                        <div className="fs-3 m-3">
                                            {data.CategoryName}
                                        </div>
                                        <hr />
                                        {
                                            foodItem.length !== 0 ? (
                                                foodItem
                                                    .filter(item =>
                                                        item.CategoryName === data.CategoryName &&
                                                        item.name.toLowerCase().includes(search.toLowerCase())
                                                    )
                                                    .map((filterItems) => {
                                                        return (
                                                            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 p-2'>
                                                                <Card foodItem={filterItems}
                                                                    // foodName={filterItems.name}
                                                                    options={filterItems.options[0]}
                                                                // imgSrc={filterItems.img}
                                                                />
                                                            </div>
                                                        );
                                                    })
                                            ) : (
                                                <div>No Such Data</div>
                                            )
                                        }
                                    </div>
                                );
                            })
                        ) : (
                            ""
                        )
                    }
                </div>

                <div><Footer /></div>
            </div>
        </div>
    );
}

export default Home;
