import dbConnect from "@/db/connect";
import Joke from "@/db/models/Joke";

export default async function handler(request, response) {
  try {
    await dbConnect();
    const { backendId } = request.query;

    if (request.method === "GET") {
      const joke = await Joke.findById(backendId);

      if (!joke) {
        response.status(404).json({ status: "Not Found" });
        return;
      }

      response.status(200).json(joke);
      return;
    }

    if (request.method === "PUT") {
      console.log("yay! received message!");

      const updatedJoke = request.body;
      console.log(updatedJoke);

      await Joke.findByIdAndUpdate(backendId, updatedJoke);

      response.json({ status: "success" });
      return;
    }

    if (request.method === "DELETE") {
      console.log("delete joke...");

      await Joke.findByIdAndDelete(backendId);

      response.json({ status: "success" });
      return;
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ status: "Internal Server Error." });
    return;
  }

  response.status(405).json({ status: "Method not allowed." });
}
