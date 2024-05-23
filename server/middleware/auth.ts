export default defineEventHandler((event) => {
  event.context.auth = { email: "john@mailkmutt.ac.th" };
});
