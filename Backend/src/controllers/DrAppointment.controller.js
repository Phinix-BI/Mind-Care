import mongoose from "mongoose";
import DrAppointmentModel from "../models/DrAppointmentModel.js";
import jwt from "jsonwebtoken";

//to save user app. req.
export const saveRequest = async (req, res) => {

    const { drId, patientId, userDetails } = req.body;

    const userId = jwt.verify(patientId, process.env.TOKEN_SECRET).id.toString();
    

    if (!drId || !userDetails || !userId) { return res.status(400).json("req body data is missing") };

    try {

        const findResponse = await DrAppointmentModel.findOne({ drId });

        if (findResponse === null) {

            const saved = await DrAppointmentModel.insertMany(

                {
                    drId: drId,
                    appointmentDetails: {
                        userId: userId,
                        userDetails: userDetails
                    }
                }

            )

            console.log("Data saved:", saved);

            res.status(200).json("success");

        }
        else {

            const updated = await DrAppointmentModel.updateMany(

                //criteria
                { drId: drId },

                 //push
                {
                    $push: {
                        appointmentDetails: {
                            userId: userId,
                            userDetails: userDetails
                        }
                    }
                }

            )
            
            if(updated.modifiedCount){

                console.log("Data updated and saved", updated);
                
                res.status(200).json({"Data updated and saved" : updated});

            }

        }

    } catch (error) {

        console.log(error);

    }

}



//to save dr accept status
export const saveAcceptStatus = async (req, res) => {

    const { drToken, userId, reqAccepted } = req.body;

    const drId = jwt.verify(drToken, process.env.TOKEN_SECRET).id.toString();
    
    if (!drId || !userId || !reqAccepted) { return res.status(400).json("Request body data missing") }

    if(reqAccepted === "false") { return res.status(400).json("False is default. Only sent true.") }

    try {

        const response = await DrAppointmentModel.updateOne(

            {//criteria
                drId: drId, "appointmentDetails.userId": userId
            },

            //update
            { $set: { "appointmentDetails.$.reqAccepted": reqAccepted } }

        )

        if (response.matchedCount && response.modifiedCount) {

            console.log("Accept status Data updated sccessfully")

            res.status(200).json("Accept status Data updated sccessfully");

        } else if (response.matchedCount && !response.modifiedCount) {

            console.log("Accept status already true")

            res.status(400).json("Accept status already true");

        } else {
            
            console.log("User or doctor not found")

            res.status(404).json("User or doctor not found");

        }

    } catch (error) {

        console.log(error)

    }

}




//to get user requests 
export const getAppointmentDetails = async (req, res) => {

    const { userId } = req.body;
    const drToken = req.query;
    // console.log("drToken",drToken)
    const drId = jwt.verify(drToken.drToken, process.env.TOKEN_SECRET).id.toString();
    // console.log("drId",drId)

    if (!drId) { return res.status(400).json("req body data missing") }

   try {

    if(!userId) {

        const response = await DrAppointmentModel.findOne(

            //criteria
            {drId : drId},

        ) 

        if(!response){

            // console.log("No data found",response)

            return res.status(404).json({"No data found":response});
            
        } else {

            // console.log("Found data",response)

            return res.status(201).json({"Found_data":response});

        }
    }
    

    const response = await DrAppointmentModel.findOne(

        //criteria
        {drId : drId,  "appointmentDetails.userId": userId },

        //return 
        {"appointmentDetails.$" : 1}

    ) 

    if(response){

        console.log("Data recieved",response);

        res.status(201).json({"Data recieved":response});

    } else {
        
         console.log("No data found",response);

        res.status(201).json({"No data found":response});

    }

   } catch (error) {

     console.log(error);  

   }

}




//case1: dr selects unaccept  
//case1: dr chckup done 
export const deleteAppointmentDetails = async (req, res) => {

    const { drToken, patientId } = req.query;

    const userId = patientId;

    const drId = jwt.verify(drToken, process.env.TOKEN_SECRET).id.toString();

    if (!drId || !userId) { return res.status(400).json("req body data missing") }

    try {
        
        const response = await DrAppointmentModel.findOneAndUpdate(

            //filter criteria
            { drId: drId, "appointmentDetails.userId": userId },

            // update
            {
                $pull: {
                    "appointmentDetails": {
                        "userId": userId
                    }
                }
            },
             //return manual set
            { returnDocument: "after" }

        )

        if(response){

            //if array is empty afer pull delete the entire dr appointment document
            if(response.appointmentDetails.length === 0){
                
                const deleteResponse = await DrAppointmentModel.findOneAndDelete(
                    
                    {drId : drId}
                    
                    )
                    
                    console.log("Data deleted...therefore Dr appointment list got empty and deleted successfully")
                    
                    res.status(201).json("Data deleted...therefore Dr appointment list got empty and deleted successfully");

                } else {
                
                   console.log("Data deleted and data after delete:",response);
       
                   res.status(201).json({"Data deleted and data after delete: ":response});

                }

        //if array is not empty after pull simply printing the remain data after delete in DB
        } else {

            console.log("No data found to delete",response);

            res.status(500).json({"No data found to delete":response});          
             
        }
        
    } catch (error) {

        console.log(error);

    }

}
