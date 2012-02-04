(function() {
  $(document).ready(function() {
    var CanvasXSize, CanvasYSize, clearX, clearY, draw, dx, init, rateTweet, scale, speed, tweet, tweet2, tweetList, wordArray, wordList, x, y;
    CanvasXSize = 900;
    CanvasYSize = 600;
    speed = 15;
    scale = 1.0;
    x = 800;
    y = 300;
    dx = 0.75;
    clearX = CanvasXSize;
    clearY = CanvasYSize;
    wordList = [];
    wordArray = [];
    tweet = {
      words: ["this", "is", "my", "favorite", "tweet"],
      mood: "pos"
    };
    tweet2 = {
      words: ["I", "love", "to", "tweet", "my", "favorite", "tweet", "tweet"],
      mood: "neg"
    };
    tweetList = [tweet, tweet2];
    init = function() {
      var canvas, ctx;
      canvas = document.getElementById("canvas");
      ctx = canvas.getContext('2d');
      return setInterval(draw, speed);
    };
    draw = function() {
      var ctx, word, _i, _len;
      ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, clearX, clearY);
      if (x > 0) {
        x -= 1;
      }
      for (_i = 0, _len = wordArray.length; _i < _len; _i++) {
        word = wordArray[_i];
        y = ((word.frequency * 10) * -1) + 300;
        ctx.fillRect(x, y, 5, 5);
        if (word.mood === "pos") {
          ctx.fillStyle = "green";
        } else {
          ctx.fillStyle = "red";
        }
      }
      return ctx.fillRect(x, 400, 5, 5);
    };
    rateTweet = function(tweet) {
      var arrayPos, existWord, newWord, word, _i, _len, _ref, _results;
      _ref = tweet.words;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        word = _ref[_i];
        _results.push($.inArray(word, wordList) === -1 ? (newWord = {
          name: word,
          frequency: 1,
          mood: tweet.mood
        }, wordList.push(word), wordArray.push(newWord)) : (arrayPos = $.inArray(word, wordList), existWord = wordArray[arrayPos], existWord.frequency = existWord.frequency + 1));
      }
      return _results;
    };
    init();
    rateTweet(tweet);
    rateTweet(tweet2);
    return $('button#button').click(function() {
      return rateTweet(tweet2);
    });
  });
}).call(this);
