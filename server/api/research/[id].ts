export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  return `Query research ID: ${id} with auth user ${event.context.auth.email}`;
});
