interface GetUserResponse {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export async function getUser(email: string): Promise<GetUserResponse> {
  const url = process.env.API_URL || "No api defined";
  const response = await fetch(
    `${url}/users?email=${encodeURIComponent(email)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }

  const data: GetUserResponse[] = await response.json();
  return data[0];
}
