import {Request,Response,Router,WebApp,} from "https://deno.land/x/denorest@v4.2/mod.ts";
import { serve } from "https://deno.land/std/http/mod.ts";
import { delay } from "https://deno.land/std/async/mod.ts";
import * as colors from "https://deno.land/std/fmt/colors.ts";

const app = new WebApp();
const router = new Router();

//const port = 8080;

function logRequest(req: Request, resp: Response, time: number) {
  const c = resp.status >= 500
    ? colors.red
    : resp.status >= 400
    ? colors.yellow
    : colors.green;
  const u = new URL(req.url);
  const qs = u.searchParams.toString();
  console.log(
    `${c(req.method)} ${colors.gray(`(${resp.status})`)} - ${
      colors.cyan(`${u.pathname}${qs ? "?" + qs : ""}`)
    } - ${colors.bold(String(time) + "ms")}`,
  );
}

async function handleRequest(req: Request) {
  const st = Date.now();
  const path = new URL(req.url).pathname;
  let resp: Response;
  if (path === "/hello") {
    resp = new Response(req.body);
  } else {
    resp = new Response(null, { status: 404 });
  }
  await delay(Math.floor(Math.random() * 100));
  logRequest(req, resp, Date.now() - st);
  return resp;
}

app.set(router)
app.listen(8080);

/* 
const app = new WebApp();
const router = new Router();

router.get("/", (_req: Req, res: Res) => {
  res.reply = `<html>
  <h1>Hola</h1>
  </html>`
});

app.set(router)
app.listen(8080); */