const Media = require("../models/media");
const NotFoundError = require("../utils/errors/NotFoundError");
const BadRequest = require("../utils/errors/BadRequest");
const { mediaNotFoundMssg, forbiddenMssg } = require("../utils/constants");

module.exports.getMedia = (req, res, next) => {
  Media.find({ owner: req.user._id })
    .populate("owner")
    .then((media) => res.status(200).send(media))
    .catch(next);
};

module.exports.createMedia = (req, res, next) => {
  const { id, poster_path, release_date, media_type, title } = req.body;
  Media.create({
    id,
    poster_path,
    release_date,
    media_type,
    title,
    owner: req.user._id,
  })
    .then((media) => res.status(200).send(media))
    .catch(next);
};

module.exports.deleteMedia = (req, res, next) => {
  Media.findOneAndRemove({ _id: req.params.mediaId })
    .then((deletedMedia) => {
      if (!deletedMedia) {
        throw new NotFoundError(mediaNotFoundMssg);
      } else if (deletedMedia.owner._id.toString() !== req.user._id) {
        throw new BadRequest(forbiddenMssg);
      }
      res.status(200).send(deletedMedia);
    })
    .catch(next);
};
