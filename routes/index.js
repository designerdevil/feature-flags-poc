var express = require('express');
var router = express.Router();

const getFeatures = (cookie) => {
  let cookieObj = {};
  if(cookie) {
    const cookies = cookie.split(',');
    cookieObj = cookies.reduce((acc, curr, index) => {
      return {
        ...acc,
        [curr]: true
      }
    }, {})
    return {
      feature1: cookieObj.FEATURE1,
      feature2: cookieObj.FEATURE2,
      feature3: cookieObj.FEATURE3,
      feature4: cookieObj.FEATURE4,
    }
  }
  return {
    feature1: process.env.FEATURE1 || false,
    feature2: process.env.FEATURE2 || false,
    feature3: process.env.FEATURE3 || false,
    feature4: process.env.FEATURE4 || false,
  }
}

router.get('/', function(req, res, next) {
  const features = {
    title: 'Feature flag showcase',
    ...getFeatures(req.cookies.envCookie)
  }
  res.render('index', { features });
});

module.exports = router;
