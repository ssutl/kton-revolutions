import axios from "axios";
import exp from "constants";

//Function to check if image returns error or not
const imageValid = async (url: string) => {
  try {
    const response = await axios.head(url);
    return response.status === 200;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default imageValid;
