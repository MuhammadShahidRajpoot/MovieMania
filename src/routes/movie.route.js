const { Router } = require("express");
const {
  addAndUpdateMovie,
  getAllMovies,
  deleteMovie,
  addAndRemoveFav,
} = require("../controllers/movie/movie.controller");
const { upload } = require("../utils/file_upload");
const ensureToken = require("../utils/ensure_token");
const router = Router();
// router.post('/', [ensureToken, upload.single('profile_picture')], addMovie);
// router.get('/', [ensureToken], getAllMovies);
// router.put('/', [ensureToken, upload.single('profile_picture')], updateMovie);
// router.delete('/', [ensureToken], deleteMovie);

router.post("/", [ensureToken, upload.single("image")], addAndUpdateMovie);
router.get("/", [ensureToken], getAllMovies);
router.put("/", [ensureToken, upload.single("image")], addAndUpdateMovie);
// router.delete("/", [ensureToken, deleteMovie]);
router.put("/update", [ensureToken, addAndRemoveFav]);
module.exports = router;
