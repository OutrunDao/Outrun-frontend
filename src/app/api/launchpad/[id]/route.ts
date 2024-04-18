import projects from '../projects.json'
export async function GET(request: Request, { params }: { params: { id: number } }) {
  const id = params.id
  console.log(id);

  return Response.json(projects[0])
}