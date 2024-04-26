import Event from "../models/Event";

const getAllEvents = async () => {
  try {
    const events = await Event.find();
    return events;
  } catch (error) {}
};

const getSingleEvent = async () => {
  try {
  } catch (error) {}
};
const deleteSingleEvent = async () => {
  try {
  } catch (error) {}
};
const updateSingleEvent = async () => {
  try {
  } catch (error) {}
};
