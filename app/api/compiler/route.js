import { NextResponse } from "next/server";
import request from "request";

export const POST = async (req) => {
  try {
    const { program } = await req.json();

    const url = "https://api.jdoodle.com/v1/execute";

    const output = fetch(url, {
      method: "POST",
      body: JSON.stringify(program), // Convert data to JSON string
      headers: { "Content-Type": "application/json" }, // Set content type
    })
      .then((response) => {
        if (!response.ok) {
          // Check for non-200 status codes
          console.error("Error:", response.statusText);
          return; // Handle non-200 codes appropriately
        }

        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        const output = data.output;
        return output;
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    const data = await output;
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error.message);
  }
};
