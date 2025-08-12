const jwt = require("jsonwebtoken");
const auth = require("../services/auth");
const { detectType } = require("./datatype");

function checkGrants(requiredGrants = []) {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        rc: 401,
        rd: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.token = token;

      const userGrants = decoded.grants || decoded.scopes || [];

      const hasAllGrants = requiredGrants.every((grant) =>
        userGrants.includes(grant)
      );

      if (!hasAllGrants) {
        return res.status(403).json({
          rc: 403,
          rd: "Forbidden - insufficient grants",
        });
      }
      let params = {
        token: token,
      };

      let getAuth = await auth.getProfileAdmin(params);
      req.username = getAuth.username;

      next();
    } catch (err) {
      return res.status(401).json({
        rc: 401,
        rd: "Invalid or expired token",
      });
    }
  };
}

function checkParams(requiredKeys = []) {
  return function (req, res, next) {
    if (!Array.isArray(requiredKeys)) {
      return res.status(500).json({
        rc: 500,
        rd: "Invalid middleware configuration: requiredKeys must be an array",
      });
    }

    try {
      const missing = [];
      const wrongType = [];

      for (const keyObj of requiredKeys) {
        const key = Object.keys(keyObj)[0];
        const allowedTypes = keyObj[key];

        const value =
          req.query?.[key] !== undefined
            ? req.query[key]
            : req.body?.[key] !== undefined
            ? req.body[key]
            : req.params?.[key];

        if (value === undefined) {
          missing.push(key);
        } else {
          const detectedType = detectType(value);
          if (!allowedTypes.includes(detectedType)) {
            wrongType.push({
              param: key,
              value,
              type: detectedType,
              allowed: allowedTypes,
            });
          }
        }
      }

      if (missing.length > 0 || wrongType.length > 0) {
        return res.status(400).json({
          rc: 400,
          rd: "Missing or invalid parameters",
          errors: {
            missing,
            wrongType,
          },
        });
      }

      next();
    } catch (err) {
      console.error("Middleware error in checkParams:", err);
      return res.status(500).json({
        rc: 500,
        rd: "Internal middleware error",
      });
    }
  };
}

async function printForwardRequestResponse(req, res, next) {
  res.set("Content-Type", "application/json");
  const { response, status } = res.locals;

  res.status(status || 200);
  res.send(response);

  next();
}

async function recordHit(req, res, next) {
  const clientIp =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  res.locals.clientIp = clientIp;

  // console.log(clientIp);
  // console.log(req.method);
  // console.log(req.originalUrl);
  // if (req.method == "GET") {
  //   console.log(req.query);
  // } else {
  //   console.log(req.body);
  // }

  // console.log(res.locals);

  // logger.http(req.originalUrl, {
  //   service: "USER API",
  //   mid,
  //   ip: clientIp || "",
  // });

  next();
}

module.exports = {
  checkGrants,
  checkParams,
  printForwardRequestResponse,
  recordHit,
};
