import DrAppointmentModel from "../models/DrAppointmentModel.js";


//to save user app. req.
export const saveRequest = async (req, res) => {
    const { drId, userId, userDetails } = req.body;

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
                { drId: drId },
                {
                    $push: {
                        appointmentDetails: {
                            userId: userId,
                            userDetails: userDetails
                        }
                    }
                }

            )
            console.log("Data updated and save:", updated);
            res.status(200).json("success");

        }
    } catch (error) {
        console.log(error);
    }
}


//to save dr accept status
export const saveAcceptStatus = async (req, res) => {
    const { drId, userId, reqAccepted } = req.body;

    if(!drId || !userId || !reqAccepted){return res.status(404).json("Request body data missing")}

    try {
        const response = await DrAppointmentModel.updateOne(
            {//criteria
                drId: drId,
                "appointmentDetails.userId": userId
            },
            //update
            { $set: { "appointmentDetails.$.reqAccepted": reqAccepted } }
        )

        if (response.matchedCount && response.modifiedCount) {
            res.status(200).json("Accept status Data updated sccessfully");
        } else if (response.matchedCount && !response.modifiedCount) {
            res.status(400).json("Accept status already true");
        } else {
            res.status(404).json("User or doctor not found");
        }
 
    } catch (error) {
        console.log(error)

    }

}




//to get user requests ha
export const getAppointmentDetails = async (req, res) => {

}
