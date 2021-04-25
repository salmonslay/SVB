var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const glob = require('glob');
var jimp = require("jimp");
const MP3Cutter = require('mp3-cutter');
var beatmaplist;

//Gets all beatmaps
router.post('/getmaps', (req, res) => {
    connection.query("SELECT * FROM beatmaps ORDER BY title", function (err, result) {
        if (err) throw err;
        else {
            res.send(result);
        }
    });
});

//Gets a beatmap from ID
router.post('/getmap', (req, res) => {
    var ID = req.body.ID;
    connection.query(`SELECT * FROM posts WHERE id = '${ID}'`, function (err, result) {
        if (err) throw err;
        else {
            res.send(result);
        }
    });
});

function getMaps() {
    connection.query("SELECT * FROM beatmaps", function (err, result) {
        if (err) throw err;
        beatmaplist = result;
        addBeatmaps();
    })
}

function addBeatmaps() {

    glob("catch/song/*.osu", {}, function (er, files) {
        var i = 0;
        files.forEach(beatmapPath => {
            //Add to MySQL 
            if (beatmapPath != "catch/song/debug.osu" && !beatmaplist.some(i => i.path.includes(beatmapPath.replace(".osu", "")))) {
                var beatmap = fs.readFileSync(beatmapPath, 'utf8').split('\n');
                var title;
                var artist;
                var difficulty;
                var creator;
                var foundObjects = false;
                var length = 0;
                var previewTime;

                //Set metadata
                beatmap.forEach(line => {
                    if (!foundObjects) {
                        if (line.startsWith("Title:")) title = line.substring(line.indexOf(":") + 1);
                        else if (line.startsWith("Artist:")) artist = line.substring(line.indexOf(":") + 1);
                        else if (line.startsWith("Version:")) difficulty = line.substring(line.indexOf(":") + 1);
                        else if (line.startsWith("Creator:")) creator = line.substring(line.indexOf(":") + 1);
                        else if (line.startsWith("PreviewTime:")) previewTime = line.substring(line.indexOf(":") + 1);
                        else if (line.includes("[HitObjects]")) foundObjects = true;
                    } else {
                        if (line.split(",").length > 1) length = parseInt(line.split(",")[2] / 1000);
                    }
                })

                //Create thumbnail & preview audio if needed
                createThumbnail(beatmapPath);
                createPreview(beatmapPath, previewTime);

                var data = {
                    title: title,
                    artist: artist,
                    difficulty: difficulty,
                    path: beatmapPath.replace(".osu", ""),
                    length: length,
                    creator: creator
                }
                connection.query(`INSERT INTO beatmaps SET ?`, data, function (err2, result) {
                    if (err2) throw err2;
                    console.log(`Map entry ${title} created! ${++i}/${files.length-1}`);
                });
            }

        })
    })
}

function createThumbnail(path) {
    var thumbnail = path.replace("osu", "jpg");
    var icon = thumbnail.replace("song/", "song/icon/");

    fs.access(icon, fs.F_OK, (err) => {
        if (err) {
            jimp.read(thumbnail, function (err, img) {
                if (err) throw err;
                img.resize(250, jimp.AUTO) // resize
                    .quality(85) // set JPEG quality
                    .write(icon); // save
                console.log(`Resized thumbnail at "${icon}"`)
            });
        }
    })
}

function createPreview(path, previewTime) {
    var audio = path.replace("osu", "mp3");
    var preview = audio.replace("song/", "song/preview/");

   

    fs.access(preview, fs.F_OK, (err) => {
        if (err) {
            MP3Cutter.cut({
                src: audio,
                target: preview,
                start: previewTime / 1000,
                end: previewTime / 1000 + 10
            });
            console.log(`Trying to cut "${preview}"`)
        }
    })
}


module.exports = router;
module.exports.getMaps = getMaps;