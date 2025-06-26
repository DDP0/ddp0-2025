export async function GET() {
  const users = [{ id: 1, name: "Alice" }];
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const { name } = await request.json();
  const newUser = { id: Date.now(), name };
  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
