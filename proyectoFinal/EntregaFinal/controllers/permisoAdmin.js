import { admin } from "../server.js";

export function administrador (req, res, next) {
  admin
    ? next()
    : res
        .status(401)
        .json({
          error: -4,
          descripcion: "Unauthorized",
          route: req.originalUrl,
        });
}
