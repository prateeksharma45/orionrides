import './VehicleSearch.css'

const VehicleSearch = ({ inputVal, handleInput }) => {
    return (
        <div className="vehicle-search">
            <img src="https://images.pexels.com/photos/15489298/pexels-photo-15489298/free-photo-of-white-lamborghini-urus-in-garage.jpeg" />
            <h1>Find Your Perfect Ride: Search and Book the Best Rental Vehicles</h1>
            <div className="search-input">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" value={inputVal.search} onChange={handleInput} placeholder="Search" name='search' />
            </div>
        </div>
    )
}

export default VehicleSearch
