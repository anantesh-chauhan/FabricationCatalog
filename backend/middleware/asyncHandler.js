// ============================================
// Async Error Handler Middleware
// @desc    Wraps async route handlers to catch errors without try-catch blocks
// @usage  router.get('/', asyncHandler(async (req, res) => { ... }))
// ============================================

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
