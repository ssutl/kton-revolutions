import axios from "axios";

export interface addGenreToBookApiProps {
  book_id: string;
  data: string[];
}

//API TO ADD GENRE TO BOOK

const addGenreToBookApi = async ({ book_id, data }: addGenreToBookApiProps) => {
  //Get token
  const authToken = localStorage.getItem("token");

  //If token is null, throw error
  if (authToken === null) throw new Error("No token found");

  //Simple request to update summaries
  try {
    const apiStatus = axios({
      method: "PUT",
      url: `${process.env.NEXT_PUBLIC_BACKENDURL}/books/${book_id}`,
      headers: {
        "x-auth-token": authToken.replace(/\"/g, ""),
      },
      data: { genre: data },
    });
  } catch (err) {
    throw new Error("Failed adding genre to book");
  }
};
export default addGenreToBookApi;
