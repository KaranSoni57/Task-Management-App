/**
 *
 * @description wrapper for controllers which return a given requestHandler function
 *
 * @param {import("express").RequestHandler} RequestHandler
 *
 * @returns {import("express").RequestHandler}
 */
function asyncHandler(requestHandler) {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
}

export { asyncHandler };
