export async function getUser(email: string) {
  const url = process.env.API_URL || "No api defined";
  const response = await fetch(
    `${url}/users?email=${encodeURIComponent(email)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_API_TOKEN`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
