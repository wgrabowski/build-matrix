var jenkinsapi = require('jenkins-api');
var cors = require('cors');
var config = require('../config/jenkins.json');
var jobs = require('../config/jobs.json');

var jenkins = require('jenkins')({
  baseUrl: `https://${config.user}:${config.token}@${config.host}`,
  promisify: true, crumbIssuer: true
});

function lastBuildInfo(jobName) {
  return jenkins.build.get(jobName, 'lastBuild',{tree:'duration,building,result,estimatedDuration,timestamp'});
}

const express = require('express')
const app = express()
app.use(cors());

app.get('/', (req, res) => {
  res.send('nie ma')
});
app.get('/jobs', (req, res) => {
  res.json(jobs)

});
app.get('/lastBuild/:jobName', (req, res) => {
  lastBuildInfo(req.params.jobName).then(data => res.json(data)).catch((er)=>res.send(er.toString()))

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
