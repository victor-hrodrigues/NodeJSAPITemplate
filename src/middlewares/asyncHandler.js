const asyncHandler = (callback) => async (request, response, next) => {
  try {
    await callback(request, response, next);
  } catch (err) {
    return response.status(500).json({
      status: "error",
      message: err.message,
    });
  }
  return true;
};

export default {
  asyncHandler,
};
