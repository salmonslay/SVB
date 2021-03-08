var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const schedule = require('node-schedule');

//adds user stats to profile 
router.post("/update", (req, res) => {

    var id = req.body.id;
    var access_token = req.body.access_token;

    connection.query(`SELECT * FROM users WHERE id = '${mysql.escape(id)}' AND access_token = '${mysql.escape(access_token)}'`, function (err2, result) {
        if (result.length > 0) {
            var data = JSON.parse(result[0].royaleScores);
            try {
                data.gamesPlayed += 1;
                if(req.body.win) data.gamesWon++;
                else data.deaths++;
                data.kills += req.body.kills;
                data.damageDone += req.body.damageDone;
                data.damageTaken += req.body.damageTaken;
                data.healthRegenerated += req.body.healthRegenerated;
                data.shotsFired += req.body.shotsFired;
                data.shotsHit += req.body.shotsHit;
                data.emotesEmoted += req.body.emotesEmoted;
                data.itemsPickedup += req.body.itemsPickedup;
                data.lockersOpened += req.body.lockersOpened;

            } catch (error) {
                console.error(error);
            }

            data.bananasSeen += bananasSeen;
            data.bananasCatched += bananasCatched;

            connection.query(`UPDATE users SET royaleScores = '${JSON.stringify(data)}' WHERE id = '${id}'`, function (err2, result) {
                if (err2) throw err2;
                console.log(`Added SajberRoyale data to user ${id}`);
                res.send(true);
            });
        } else {
            res.send(false);
        }
    });
});

module.exports = router;