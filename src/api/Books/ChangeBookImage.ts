import axios from "axios";

export interface changeBookImageApiProps {
  book_id: string;
  data: string;
}

const changeBookImageApi = async ({
  book_id,
  data,
}: changeBookImageApiProps) => {
  //Get token
  const authToken = localStorage.getItem("token");

  if (authToken === null) throw new Error("No token found");

  //Simple request to update summaries
  try {
    axios({
      method: "PUT",
      url: `${process.env.NEXT_PUBLIC_BACKENDURL}/books/${book_id}`,
      headers: {
        "x-auth-token": authToken.replace(/\"/g, ""),
      },
      data: { cover_image: data },
    });
  } catch (err) {
    throw new Error("Failed changing book image");
  }
};
export default changeBookImageApi;