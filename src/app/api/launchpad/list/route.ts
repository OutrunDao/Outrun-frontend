import projects from '../projects.json'


export async function GET(request: Request) {
  return Response.json(projects)
}