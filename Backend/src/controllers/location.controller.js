import axios from "axios";

export const doctorLocation = async ( req,res) => {
    const {latitude,longitude} = req.body;
    console.log('Received data:', latitude,longitude);
    
    
    //api url setup
    const apiKey = process.env.GOOGLE_MAP_KEY;
    const location = `${latitude} , ${longitude}`;
    const radius = 2000;
    const type = ["shopping mall","cinema hall"];
    const keyword = 'mall';
    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${keyword}&location=${location}&radius=${radius}&type=${type}&key=${apiKey}`;
    
    //api request
    
        try {
            const response = await axios.get(apiUrl);
            const data = await response.data;
            console.log('Places data:', data);
            res.send(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    
    res.status(200)
}