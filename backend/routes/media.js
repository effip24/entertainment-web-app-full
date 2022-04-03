const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { getMedia, createMedia, deleteMedia } = require("../controllers/media");

router.get("/media", getMedia);

router.post(
  "/media",
  celebrate({
    body: Joi.object().keys({
      id: Joi.string(),
      poster_path: Joi.string(),
      release_date: Joi.string(),
      media_type: Joi.string(),
      title: Joi.string(),
    }),
  }),
  createMedia
);
router.delete(
  "/media/:mediaId",
  celebrate({
    params: Joi.object().keys({
      mediaId: Joi.string().length(24).hex(),
    }),
  }),
  deleteMedia
);
module.exports = router;
