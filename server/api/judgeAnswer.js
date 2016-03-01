function createJudgeAnswer(req,res){
    models.answers.create(req.body).then(function(result){
        res.send(result);
    })
};

function updateJudgeAnswer(req,res) {
    models.answers.upsert(req.body).then(function (result) {
        res.send(result);
    })
};


module.exports = {
    updateJudgeAnswer: updateJudgeAnswer,
    createJudgeAnswer: createJudgeAnswer
}